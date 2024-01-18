import { adicionarEventoDeMovimento } from "../movimento-pecas/movimento-por-click/movimento.js";
import { criarPecas } from "../peca/peca.js";

function posicionarPecas(dados) {
    const jogador = dados.jogador;
    const divJogador = document.getElementById(`${jogador}`);

    const quantidadePecas = dados.pecas.length;
    const posicaoDasPecas = divJogador.querySelector('.conjuntoPecas');
    dados.pecas.forEach(peca => {
        posicaoDasPecas.appendChild(peca);
    });

    if (divJogador.classList.contains('espacoPrimeiroJogador') || divJogador.classList.contains('espacoTerceiroJogador')) {
        posicaoDasPecas.style.gridTemplateColumns = `repeat(${quantidadePecas}, 1fr)`;
    }

    const pecas = divJogador.querySelector('.quantidadePecas');
    pecas.textContent = `(${quantidadePecas} peças)`;
}

function criarPecasOponentes(quantidadePecas){
    const pecas = [];
    while (pecas.length  < quantidadePecas){
        const elementoPeca = document.createElement('div');
        elementoPeca.className = `peca-vazia`;
        pecas.push(elementoPeca);
    }
    return pecas;
}


function distribuirPecas(pecasEmbaralhadas, jogadoresSalaEscolhida, nomeJogador) {
    const jogador = jogadoresSalaEscolhida.find(jogador => jogador.nomeJogador == nomeJogador);
    const numeroJogadorPrincipal = jogador.posicaoJogador;
    const todasPecas = criarPecas(pecasEmbaralhadas);
    let pecasVazias;

    switch (numeroJogadorPrincipal) {
        case 1:
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: todasPecas.slice(0, 7), jogador: "primeiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "segundoJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "terceiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "quartoJogador" });
            break;
        case 2:
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: todasPecas.slice(7, 14), jogador: "segundoJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "primeiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "terceiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "quartoJogador" });
            break;
        case 3:
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: todasPecas.slice(14, 21), jogador: "terceiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "primeiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "segundoJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "quartoJogador" });
            break;
        case 4:
            posicionarPecas({ pecas: todasPecas.slice(21, 28), jogador: "quartoJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "primeiroJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "segundoJogador" });
            pecasVazias = criarPecasOponentes(7);
            posicionarPecas({ pecas: pecasVazias, jogador: "terceiroJogador" });
            break;
    }
    adicionarEventoDeMovimento();
}

export { distribuirPecas };