// FolhaEngine.js - VERSÃO DEFINITIVA [PROJETO PM 2026]
export const FolhaEngine = {
    montar: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";
        
        const styleId = 'style-folha-pm-elite';
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
                    height: 35px;
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
                    line-height: 35px !important;
                    padding: 0 20px !important;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    min-height: 5250px;
                    background-image: linear-gradient(to bottom, transparent 34px, #e2e8f0 34px);
                    background-size: 100% 35px;
                    background-repeat: repeat-y;
                    background-position: 0 -1px;
                    text-align: justify;
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
        editor.innerText += (editor.innerText.trim() === "" ? "" : "\n\n") + limpo;
        editor.focus();
    },

    renderizarFolhaEstatica: (dadosBrutos, missao) => {
        let textoFinal = String(dadosBrutos || "");
        const linhas = textoFinal.split('\n');
        let html = `<div style="text-align:center; border-bottom:3px solid #000; padding:20px; font-family:Arial;">
                        <h2>CADERNO DE RESPOSTAS PM 2026 - ${missao}</h2>
                    </div>`;
        for(let i=1; i<=150; i++) {
            const txt = linhas[i-1] || "";
            html += `<div style="display:flex; height:35px; border-bottom:1px solid #eee;">
                        <span style="width:40px; border-right:2px solid #000; text-align:center; font-weight:bold;">${i}</span>
                        <span style="flex:1; padding-left:15px; font-family:'Courier New'; font-size:18px;">${txt}</span>
                    </div>`;
        }
        return html;
    }
};
