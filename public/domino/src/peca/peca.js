import { adicionarNumeracaoDasPecas } from "./numeracaoValor.js";

function renderizarDivPeca(numeros) {
    const elementoPeca = document.createElement('div');
    elementoPeca.className = `peca-domino ${numeros[0]}${numeros[1]}`;
    elementoPeca.id = `${numeros[0]}${numeros[1]}`

    const metadeSuperior = document.createElement('div');
    metadeSuperior.className = 'metade-superior';

    const metadeInferior = document.createElement('div');
    metadeInferior.className = 'metade-inferior';

    elementoPeca.appendChild(metadeSuperior);
    elementoPeca.appendChild(metadeInferior);

    return elementoPeca;
}

function criarPecas(pecasEmbaralhadas) {
    const pecas = desenharPecas(pecasEmbaralhadas);
    return pecas;
}

function desenharPecas(pecasEmbaralhadas) {
    const pecasCompletas = pecasEmbaralhadas.map(pontos => {
        const divPeca = renderizarDivPeca([pontos[0], pontos[1]]);
        const pecaCompleta = adicionarNumeracaoDasPecas({
            peca: divPeca,
            numeroSuperior: pontos[0],
            numeroInferior: pontos[1]
        });
        return pecaCompleta;
    });

    return pecasCompletas;
}

export { criarPecas, desenharPecas };
