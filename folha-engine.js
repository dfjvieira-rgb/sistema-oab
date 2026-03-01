// FolhaEngine.js - LÓGICA VALIDADA OAB/PM
export const FolhaEngine = {
    montar: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";
        
        const styleId = 'style-folha-mecanica-v3';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                .folha-container {
                    display: grid;
                    grid-template-columns: 50px 1fr;
                    background: #fff;
                    font-family: 'Courier New', Courier, monospace;
                    border: 2px solid #000;
                    position: relative;
                }
                .numeracao {
                    background: #f1f5f9;
                    border-right: 2px solid #000;
                    user-select: none;
                }
                .num-mecanico {
                    height: 35px; /* Altura exata da linha */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 900;
                    border-bottom: 1px solid #cbd5e1;
                    color: #1e293b;
                    box-sizing: border-box;
                }
                .area-editor {
                    outline: none;
                    font-size: 19px !important;
                    font-weight: 700 !important;
                    color: #000 !important;
                    line-height: 35px !important; /* Trava o texto na linha */
                    padding: 0 20px !important;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    min-height: 5250px; /* 150 linhas * 35px */
                    background-image: linear-gradient(to bottom, transparent 34px, #e2e8f0 34px);
                    background-size: 100% 35px;
                    background-repeat: repeat-y;
                    background-position: 0 -1px;
                    text-align: justify;
                }
                @media (max-width: 768px) {
                    .folha-container { grid-template-columns: 40px 1fr; }
                    .area-editor { font-size: 17px !important; padding: 0 10px !important; }
                }
            `;
            document.head.appendChild(style);
        }

        const folha = document.createElement('div');
        folha.className = 'folha-container';

        const numCol = document.createElement('div');
        numCol.className = 'numeracao';
        for(let i=1; i<=150; i++) {
            const n = document.createElement('div');
            n.className = 'num-mecanico';
            n.innerText = i;
            numCol.appendChild(n);
        }

        const editor = document.createElement('div');
        editor.className = 'area-editor';
        editor.id = 'editor-principal';
        editor.contentEditable = "true";
        editor.spellcheck = false;

        folha.appendChild(numCol);
        folha.appendChild(editor);
        container.appendChild(folha);

        // Bloqueio de formatação externa (Mantém texto puro)
        editor.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
        });
    },

    injetarTextoMultilinhas: (textoBruto) => {
        const editor = document.getElementById('editor-principal');
        if (!editor) return;
        const limpo = textoBruto.replace(/<[^>]*>?/gm, '').trim();
        if (editor.innerText.trim() === "") {
            editor.innerText = limpo;
        } else {
            editor.innerText += "\n\n" + limpo;
        }
        editor.focus();
    },

    renderizarFolhaEstatica: (dadosBrutos, identificador) => {
        let textoFinal = String(dadosBrutos || "");
        const linhas = textoFinal.split('\n');
        
        let html = `
            <div style="text-align:center; border-bottom:3px solid #000; padding:20px; font-family:Arial,sans-serif; color:black;">
                <h2 style="margin:0; font-size:18px;">CADERNO DE RESPOSTAS - MISSÃO: ${identificador}</h2>
            </div>
        `;

        for(let i=1; i<=150; i++) {
            const txt = linhas[i-1] || "";
            html += `
                <div style="display:flex; height:35px; border-bottom:1px solid #eee; align-items:center;">
                    <span style="width:40px; border-right:2px solid #000; font-size:11px; font-weight:bold; text-align:center;">${i}</span>
                    <span style="flex:1; padding-left:15px; font-family:'Courier New', monospace; font-size:18px; font-weight:bold;">${txt}</span>
                </div>`;
        }
        return html;
    }
};
