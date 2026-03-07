// vade.js - NÚCLEO DURO DE LEGISLAÇÃO PMDF (EXTERNO)

export const LEIS_PMDF = [
    // CONSTITUCIONAL E ADM
    { nome: "⚖️ CONSTITUIÇÃO FEDERAL", url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" },
    { nome: "🏛️ IMPROBIDADE ADM. (L. 8.429)", url: "https://www.planalto.gov.br/ccivil_03/leis/l8429.htm" },
    { nome: "📁 PROCESSO ADM. (L. 9.784)", url: "https://www.planalto.gov.br/ccivil_03/leis/l9784.htm" },

    // LEGISLAÇÃO PMDF
    { nome: "🎖️ ESTATUTO PMDF (L. 7.289)", url: "https://www.planalto.gov.br/ccivil_03/leis/l7289.htm" },
    { nome: "🚔 ORG. BÁSICA PMDF (L. 6.450)", url: "https://www.planalto.gov.br/ccivil_03/leis/l6450.htm" },
    { nome: "💰 REMUNERAÇÃO MILITAR (L. 10.486)", url: "https://www.planalto.gov.br/ccivil_03/leis/l10486.htm" },
    { nome: "📜 RDE - DISCIPLINA (D. 4.346)", url: "https://www.planalto.gov.br/ccivil_03/decreto/d4346.htm" },

    // MILITAR
    { nome: "⚔️ CÓDIGO PENAL MILITAR", url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del1001.htm" },
    { nome: "⛓️ PROC. PENAL MILITAR", url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del1002.htm" },

    // EXTRAVAGANTE
    { nome: "🚫 ABUSO DE AUTORIDADE", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13869.htm" },
    { nome: "🥊 LEI DE TORTURA (L. 9.455)", url: "https://www.planalto.gov.br/ccivil_03/leis/l9455.htm" },
    { nome: "💊 LEI DE DROGAS (L. 11.343)", url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11343.htm" },
    { nome: "🔫 DESARMAMENTO (L. 10.826)", url: "https://www.planalto.gov.br/ccivil_03/leis/2003/l10.826.htm" },
    { nome: "🏠 MARIA DA PENHA (L. 11.340)", url: "https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm" },
    { nome: "🕶️ ORG. CRIMINOSAS (L. 12.850)", url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2013/lei/l12850.htm" },
    { nome: "📢 CRIMES DE RACISMO (L. 7.716)", url: "https://www.planalto.gov.br/ccivil_03/leis/l7716.htm" },
    { nome: "⚖️ JUIZADOS ESPECIAIS (L. 9.099)", url: "https://www.planalto.gov.br/ccivil_03/leis/l9099.htm" },
    { nome: "🚨 PACOTE ANTICRIME (L. 13.964)", url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13964.htm" },
    { nome: "🚔 USO DA FORÇA (L. 13.060)", url: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l13060.htm" },
    
    // DIREITOS HUMANOS
    { nome: "🌎 PACTO SÃO JOSÉ COSTA RICA", url: "https://www.planalto.gov.br/ccivil_03/decreto/d0678.htm" },
    { nome: "📑 DIREITOS CIVIS E POLÍTICOS", url: "https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0592.htm" },
    { nome: "🤝 CONVENÇÃO CONTRA TORTURA", url: "https://www.planalto.gov.br/ccivil_03/decreto/1990-1994/d0040.htm" }
];

export function renderizarVadeHTML() {
    // Cirurgia: Adicionamos um verificador no onclick para resetar o fundo do iframe se for a lei de abuso
    const h = LEIS_PMDF.map(lei => {
        const isAbuso = lei.nome.includes("ABUSO");
        return `
            <div class="opt-btn" onclick="window.abrirLeiBlindada('${lei.url}','${lei.nome}', ${isAbuso})" 
                 style="padding:10px; margin-bottom:5px; border-left: 5px solid #fbbf24; background: #f1f5f9; font-size: 10px; font-weight: 900; color: #1e293b; display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
                <span><i class="fas fa-gavel" style="margin-right: 8px;"></i> ${lei.nome}</span>
            </div>
        `;
    }).join('');

    return `
        <div style="background:#020617; color:#fbbf24; padding:8px; border-radius:6px; font-size:9px; margin-bottom:12px; text-align:center; font-weight:bold;">
            <i class="fas fa-shield-alt"></i> LEGISLAÇÃO SECA INTEGRAL ATUALIZADA
        </div>
        <div style="display:grid; grid-template-columns: 1fr; gap: 2px; max-height: 450px; overflow-y: auto;">
            ${h}
        </div>
    `;
}

// Cirurgia Corretiva de Contraste
window.abrirLeiBlindada = (url, nome, forcarBranco) => {
    const frame = document.getElementById('pdf-frame');
    if(frame) {
        // Se for abuso de autoridade, removemos filtros de inversão de cores do iframe
        frame.style.filter = forcarBranco ? "invert(0) hue-rotate(0deg) brightness(1)" : "";
        frame.style.background = "#fff";
    }
    window.abrirPDFDireto(url, nome);
};

// Expõe para o escopo global
window.renderizarVadeHTML = renderizarVadeHTML;
