let ultimaPecaFoiNaVertical = false;

function movimentoVerticalPontaDireita(peca, pontaDireita, tabuleiro) {
    pontaDireita.classList.remove("ponta-direita");
    peca.classList.add("ponta-direita");
    peca.style.position = "absolute";

    peca.classList.remove("girada-superior", "girada-inferior", "normal");

    const lado = giroVerticalDireita(peca);
    if (lado) {
        peca.classList.add(lado);
    }
    peca.classList.add("vertical");

    let posicaoTop = parseFloat(pontaDireita.style.top);
    const [idParteSuperior, idParteInferior] = peca.id.split("");
    peca.style.top = `${posicaoTop + (pontaDireita.classList.contains("vertical") ? peca.clientHeight / tabuleiro.clientHeight * 104 : peca.clientHeight / tabuleiro.clientHeight * 75)}%`;

    
    const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * 70;
    let posicaoDireita = parseFloat(pontaDireita.style.left);
  
    console.log(pontaDireita.classList.contains("vertical"));
    console.log(pontaDireita.classList.contains("vertical") ? 0 : alturaPecaPercent / 5.9);

    if (idParteInferior !== idParteSuperior) {
        peca.style.left = `${posicaoDireita + (pontaDireita.classList.contains("vertical") ? 0 : alturaPecaPercent / 5.9)}%`;
    } else {
        peca.style.left = `${posicaoDireita + (pontaDireita.classList.contains("vertical") ? 0 : alturaPecaPercent / 5.9)}%`;
    }

    ultimaPecaFoiNaVertical = true;
    tabuleiro.appendChild(peca);
}

function giroVerticalDireita(peca) {
    let metadeDesejada = peca.querySelectorAll(".ponta-verdadeira");
    return !metadeDesejada[0].classList.contains("metade-inferior") ? "giro-vertical" : undefined;
}
