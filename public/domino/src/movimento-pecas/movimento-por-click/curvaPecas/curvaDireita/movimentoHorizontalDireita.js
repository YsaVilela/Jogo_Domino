function posicionarPontaDireitaAposVertical(peca, pontaDireita, tabuleiro) {
    pontaDireita.classList.remove("pontaoDireita");
    peca.classList.add("pontaoDireita");
    peca.style.position = "absolute";
    peca.classList.remove("giro-vertical");

    const [idParteSuperior, idParteInferior] = peca.id.split("");
    peca.classList.remove("girada-superior", "girada-inferior");

    peca.classList.remove("vertical");
    if (pontaDireita.classList.contains("vertical")) {
        const lado = defineLadoDeGiroDaPeca(peca, true);
        peca.classList.add(lado, "primeira-direita");
    } else {
        const lado = defineLadoDeGiroDaPeca(peca, true);
        peca.classList.add(lado);
    }


    const lado = defineLadoDeGiroDaPeca(peca, true);
    peca.classList.add(lado);

    if (idParteSuperior === idParteInferior && peca.classList.contains("primeira-direita")) {
        peca.classList.remove("normal");
        peca.classList.add("girada-superior");
    }

    let posicaoTop = parseFloat(pontaDireita.style.top);
    peca.style.top = `${posicaoTop + (peca.classList.contains("primeira-direita") ? peca.clientHeight / 14.5 : 0)}%`;

    const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * (peca.classList.contains("primeira-direita") ? 35 : 70);
    let posicaoDireita = parseFloat(pontaDireita.style.left);

    if (idParteInferior !== idParteSuperior) {
        peca.style.left = `${posicaoDireita - (peca.classList.contains("primeira-direita") ? alturaPecaPercent : alturaPecaPercent / 2)}%`;

        if (pontaDireita.classList.contains("girada-inferior") || pontaDireita.classList.contains("girada-superior")) {
            peca.style.left = `${posicaoDireita - alturaPecaPercent / 1.50}%`;
        }
    } else {
        peca.style.left = `${posicaoDireita - (peca.classList.contains("primeira-direita") ? alturaPecaPercent : alturaPecaPercent / 2)}%`;
    }

    tabuleiro.appendChild(peca);
}
