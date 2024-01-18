let ultimaPecaFoiNaVerticalEsquerda = false;

function movimentoVerticalPontaEsquerda(peca, pontaEsquerda, tabuleiro) {
    pontaEsquerda.classList.remove("ponta-esquerda");
    peca.classList.add("ponta-esquerda");
    peca.style.position = "absolute";

    peca.classList.remove("girada-superior", "girada-inferior", "normal");

    const lado = giroVertical(peca);
    if (lado) {
        peca.classList.add(lado);
    }
    peca.classList.add("vertical");

    let posicaoTop = parseFloat(pontaEsquerda.style.top);
    const [idParteSuperior, idParteInferior] = peca.id.split("");
    peca.style.top = `${posicaoTop - (pontaEsquerda.classList.contains("vertical") ? peca.clientHeight / tabuleiro.clientHeight * 104 : peca.clientHeight / tabuleiro.clientHeight * 75)}%`;

    const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * 70;
    let posicaoEsquerda = parseFloat(pontaEsquerda.style.left);

    if (idParteInferior !== idParteSuperior) {
        peca.style.left = `${posicaoEsquerda - (pontaEsquerda.classList.contains("vertical") ? 0 : alturaPecaPercent / 5.9)}%`;
    } else {
        peca.style.left = `${posicaoEsquerda - (pontaEsquerda.classList.contains("vertical") ? 0 : alturaPecaPercent / 5.9)}%`;
    }

    ultimaPecaFoiNaVerticalEsquerda = true;
    tabuleiro.appendChild(peca);
}

function giroVertical(peca) {
    let metadeDesejada = peca.querySelectorAll(".ponta-verdadeira");
    return !metadeDesejada[0].classList.contains("metade-superior") ? "giro-vertical" : undefined;
}
