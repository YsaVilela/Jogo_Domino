let ultimaPecaFOiColocadaDeLadoEsquerda = false;

function posicionarPontaEsquerda(peca, pontaEsquerda, tabuleiro) {
  pontaEsquerda.classList.remove("ponta-esquerda");
  peca.classList.add("ponta-esquerda");
  peca.style.position = "absolute";

  let posicaoTop = parseFloat(pontaEsquerda.style.top);
  const [idParteSuperior, idParteInferior] = peca.id.split("");
  peca.style.top = `${posicaoTop}%`;

  const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * 70;
  let posicaoEsquerda = parseFloat(pontaEsquerda.style.left);

  if (idParteInferior !== idParteSuperior) {
    peca.style.left = `${posicaoEsquerda - alturaPecaPercent / 2}%`;
    if (pontaEsquerda.classList.contains("girada-inferior") || pontaEsquerda.classList.contains("girada-superior")) {
      peca.style.left = `${posicaoEsquerda - alturaPecaPercent / 1.50}%`;
    }
    ultimaPecaFOiColocadaDeLadoEsquerda = true;
  } else {
    peca.style.left = `${posicaoEsquerda - alturaPecaPercent / 2}%`;
    ultimaPecaFOiColocadaDeLadoEsquerda = false;
  }

  tabuleiro.appendChild(peca);
}
