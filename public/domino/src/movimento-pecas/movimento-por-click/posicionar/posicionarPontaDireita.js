let ultimaPecaFOiColocadaDeLadoDireita = false

function posicionarPontaDireita(peca, pontaDireita, tabuleiro) {
  pontaDireita.classList.remove("ponta-direita");
  peca.classList.add("ponta-direita");
  peca.style.position = "absolute";

  let posicaoTop = parseFloat(pontaDireita.style.top);
  const [idParteSuperior, idParteInferior] = peca.id.split("");
  peca.style.top = `${posicaoTop}%`;

  const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * 70;
  let posicaoDireita = parseFloat(pontaDireita.style.left);

  if (idParteInferior !== idParteSuperior) {
    peca.style.left = `${posicaoDireita + alturaPecaPercent / 2}%`;
    if (pontaDireita.classList.contains("girada-inferior") || pontaDireita.classList.contains("girada-superior")) {
      peca.style.left = `${posicaoDireita + alturaPecaPercent / 1.50}%`;
    }
    ultimaPecaFOiColocadaDeLadoDireita = true;
  } else {
    peca.style.left = `${posicaoDireita + alturaPecaPercent / 2}%`;
    ultimaPecaFOiColocadaDeLadoDireita = false;
  }

  tabuleiro.appendChild(peca);
}
