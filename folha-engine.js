<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>QG JOAQUIM - SISTEMA OPERACIONAL PM</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --primary: #001f3f; /* Azul Marinho PM */
            --gold: #fbbf24; 
            --bg-paper: #cbd5e1; 
            --mentoria: #16a34a;
            --sidebar-w: 70px;
        }

        body.dark-mode { --bg-paper: #020617; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { 
            font-family: 'Inter', sans-serif; 
            background: var(--primary); 
            height: 100vh; display: flex; flex-direction: column; overflow: hidden; color: white;
        }

        header { 
            background: var(--primary); height: 60px; padding: 0 20px; 
            display: flex; justify-content: space-between; align-items: center; 
            border-bottom: 2px solid var(--gold); z-index: 5000;
        }

        main { display: flex; flex: 1; overflow: hidden; position: relative; }
        
        .sidebar { 
            width: var(--sidebar-w); background: #001529; display: flex; 
            flex-direction: column; align-items: center; gap: 12px; padding: 15px 0; 
            border-right: 1px solid rgba(255,255,255,0.1);
        }

        .btn-side { 
            width: 50px; min-height: 50px; border: none; border-radius: 12px; 
            display: flex; align-items: center; justify-content: center; color: white; 
            cursor: pointer; transition: 0.3s; background: rgba(255,255,255,0.05);
        }

        .editor-container { 
            flex: 1; display: flex; flex-direction: column; 
            background: var(--bg-paper); overflow-y: auto; align-items: center; padding: 20px 10px;
        }

        /* Estilização da Folha vinda da Engine */
        .sticky-tools { 
            position: sticky; top: -20px; z-index: 1000; background: white; 
            width: 100%; max-width: 850px; border-radius: 0 0 12px 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-bottom: 10px;
        }

        #identificador-peca { 
            padding: 12px; background: #f8fafc; text-align: center; 
            font-weight: 900; color: #0f172a; border-bottom: 3px solid var(--gold);
        }
        
        .toolbar-liberdade { display: flex; background: #fff; }
        .btn-lib { 
            flex: 1; padding: 12px; border: none; background: transparent; 
            cursor: pointer; font-weight: 800; font-size: 0.7rem; color: #64748b;
        }

        /* Onde a Engine vai "Montar" a folha */
        .paper-target { width: 100%; max-width: 850px; }

        #pdf-viewer { width: 0; background: #1e293b; transition: 0.4s; overflow: hidden; display: flex; flex-direction: column; }
        #pdf-viewer.active { width: 45%; border-left: 4px solid var(--gold); }
        
        iframe { width: 100%; flex: 1; border: none; }

        @media (max-width: 768px) { .sidebar { display: none; } #pdf-viewer.active { width: 100%; position: absolute; inset: 0; z-index: 10000; } }
    </style>
</head>
<body>

<header>
    <div class="logo">QG <span>JOAQUIM</span></div>
    <div style="font-size: 11px; font-weight: bold; color: var(--gold);">C:\SISTEMA-OAB</div>
</header>

<main>
    <aside class="sidebar">
        <button class="btn-side" style="background:var(--gold); color:#000" onclick="window.abrirBibliotecaPDF()"><i class="fas fa-file-pdf"></i></button>
        <button class="btn-side" style="background:var(--mentoria)" onclick="window.abrirSistemaLeis('TESES')"><i class="fas fa-gavel"></i></button>
        <button class="btn-side" style="background:#2563eb" onclick="window.abrirSistemaLeis('QUESTOES')"><i class="fas fa-list-check"></i></button>
        <button class="btn-side" style="background:#10b981" onclick="window.finalizarPeca()"><i class="fas fa-save"></i></button>
    </aside>

    <section class="editor-container">
        <div class="sticky-tools">
            <div id="identificador-peca">MISSÃO: RASCUNHO OPERACIONAL</div>
            <div class="toolbar-liberdade">
                <button class="btn-lib" onclick="window.limparFolha()"><i class="fas fa-eraser"></i> LIMPAR</button>
                <button class="btn-lib" onclick="window.togglePDF()"><i class="fas fa-book-open"></i> VER PDF</button>
                <button class="btn-lib" style="background:#22c55e; color:white" onclick="window.salvarPDF()"><i class="fas fa-download"></i> EXPORTAR</button>
            </div>
        </div>
        
        <div id="folha-total" class="paper-target"></div>
    </section>

    <section id="pdf-viewer">
        <div style="background:#0f172a; padding:10px; display:flex; justify-content:space-between;">
            <span id="pdf-title" style="font-size:12px; font-weight:bold;">PDF</span>
            <button onclick="window.togglePDF()" style="color:white; background:none; border:none; cursor:pointer;">X</button>
        </div>
        <iframe id="pdf-frame"></iframe>
    </section>
</main>

<script type="module">
    import { FolhaEngine } from './FolhaEngine.js';
    import { db } from './firebase-config.js';
    import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

    // Iniciar Engine
    window.onload = async () => {
        FolhaEngine.montar('folha-total');
        
        // Carregar Rascunho do Firebase (Blindado)
        const snap = await get(ref(db, "ESTUDO_PM_JOAQUIM/MASTER_RASCUNHO"));
        if(snap.exists()) {
            const editor = document.getElementById('editor-principal');
            editor.innerText = snap.val().conteudo || "";
        }
    };

    // Salvar Automático
    setInterval(async () => {
        const editor = document.getElementById('editor-principal');
        if(editor) {
            await set(ref(db, "ESTUDO_PM_JOAQUIM/MASTER_RASCUNHO"), {
                conteudo: editor.innerText,
                data: new Date().toLocaleString()
            });
        }
    }, 30000);

    // Funções Globais
    window.togglePDF = () => document.getElementById('pdf-viewer').classList.toggle('active');
    
    window.limparFolha = () => {
        if(confirm("Deseja apagar todo o rascunho?")) {
            document.getElementById('editor-principal').innerText = "";
        }
    };

    window.salvarPDF = () => {
        const editor = document.getElementById('editor-principal');
        // Usando a renderização estática da sua Engine para o PDF
        const htmlFinal = FolhaEngine.renderizarFolhaEstatica(editor.innerText, "PM-2026");
        const win = window.open('', '_blank');
        win.document.write(`<html><body>${htmlFinal}</body></html>`);
        win.print();
    };
</script>
</body>
</html>
