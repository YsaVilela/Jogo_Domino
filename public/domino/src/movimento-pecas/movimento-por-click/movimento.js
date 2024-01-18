import { enviarEstadoTabuleiro } from "../../../socket/documento-jogo.js";
import { passarVez } from "../../turnos/passarAVez.js";

const tabuleiro = document.querySelector(".tabuleiro");

function adicionarEventoDeMovimento() {
  const pecasNaMao = document.querySelectorAll(".peca-domino");
  pecasNaMao.forEach(function (peca) {
    peca.addEventListener("click", function () {

      const donoDaPecaSelecionada = peca.parentElement.parentElement.parentElement;
      if (donoDaPecaSelecionada.classList.contains("jogadorAtual")) {
        verificaPecasEncaixaveis(tabuleiro);

        moverPecaParaPosicaoEspecifica(peca);
        if(peca.classList.contains("colocavel") || peca.id == "66") {
          enviarEstadoTabuleiro(tabuleiro);
        }
        peca.classList.remove("colocavel");
      } else {
        console.warn("turno errado");
      }

      

    });
  });
}


// Função para mover a peça para uma posição específica no tabuleiro
// ...

function moverPecaParaPosicaoEspecifica(peca) {
  // Verifica se há alguma peça no tabuleiro
  const pecasNoTabuleiro = tabuleiro.querySelectorAll(".peca-domino");
  if (pecasNoTabuleiro.length === 0) {
    // Se não houver peças no tabuleiro, verifica se a peça que está sendo movida é a peça "66"
    if (peca.id !== "66") {
      return;
    }
    posicionarPecaMaisAltaNoCentro(peca);
    passarVez();
  }

  if (peca.classList.contains("colocavel")) {
    const lado = defineLadoDeGiroDaPeca(peca);
    peca.classList.add(lado);
    posicionaPecaNoTabuleiro(peca, pecasNoTabuleiro);
    tabuleiro.appendChild(peca);
    passarVez();
  }
}

function posicionaPecaNoTabuleiro(peca) {
  const tabuleiro = document.querySelector(".tabuleiro");
  const pontaEsquerda = document.querySelector(".ponta-esquerda");
  const pontaDireita = document.querySelector(".ponta-direita");

  let pontaSelecionada = identificaPonta(peca, pontaEsquerda, pontaDireita);


  if (!pontaSelecionada) {
    console.error("Não foi possível encontrar uma ponta compatível para a peça.");
    return;
  }
  if (pontaSelecionada.classList.contains("ponta-esquerda")) {
    posicionarPontaEsquerda(peca, pontaEsquerda, tabuleiro);
    if (verificaLimiteEsquerdo(peca)) {
      movimentoVerticalPontaEsquerda(peca, pontaEsquerda, tabuleiro);
    }
    if (verificaLimiteSuperior(peca)) {
      movimentoHorizontalEsquerda(peca, pontaEsquerda, tabuleiro);
    }


  } else if (pontaSelecionada.classList.contains("ponta-direita")) {
    posicionarPontaDireita(peca, pontaDireita, tabuleiro);
    if (verificaLimiteDireito(peca)) {
      movimentoVerticalPontaDireita(peca, pontaDireita, tabuleiro);
    }
    if (verificaLimiteInferior(peca)) {

      posicionarPontaDireitaAposVertical(peca, pontaDireita, tabuleiro);
    }
  }
}
export { adicionarEventoDeMovimento }