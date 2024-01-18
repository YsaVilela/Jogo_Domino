// ...
function posicionarPecaMaisAltaNoCentro(peca) {
  const tabuleiro = document.querySelector(".tabuleiro");
  const centroTabuleiroX = tabuleiro.clientWidth / 2;
  const centroTabuleiroY = tabuleiro.clientHeight / 2;

  // Verifica se a peça é "66"
  if (peca.id === "66") {
    // Move a peça para o centro do tabuleiro
    peca.style.position = "absolute";

    // Calcula as posições em porcentagem
    const leftPercentage = (centroTabuleiroX - peca.clientWidth / 2) / tabuleiro.clientWidth * 100;
    const topPercentage = (centroTabuleiroY - peca.clientHeight / 2) / tabuleiro.clientHeight * 100;

    peca.style.left = `${leftPercentage}%`;
    peca.style.top = `${topPercentage}%`;

    peca.classList.add("ponta-esquerda");
    peca.classList.add("ponta-direita");

    const metadeSuperiorPeca = peca.querySelector(".metade-superior");
    const metadeInferiorPEca = peca.querySelector(".metade-inferior");

    metadeSuperiorPeca.classList.add("ponta-verdadeira");
    metadeInferiorPEca.classList.add("ponta-verdadeira");
    metadeInferiorPEca.id = 6;
    metadeSuperiorPeca.id = 6;

    tabuleiro.appendChild(peca);
    // Adicione outras ações ou lógicas conforme necessário
  }
}
