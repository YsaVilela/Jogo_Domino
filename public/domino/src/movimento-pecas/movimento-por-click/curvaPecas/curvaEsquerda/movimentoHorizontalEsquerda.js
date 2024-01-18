let primeiraChamadaDaFuncao = true;
let ultimaPecaFOiColocadaDeLadoEsquerdaVertical = false;
function movimentoHorizontalEsquerda(peca, pontaEsquerda, tabuleiro) {
    pontaEsquerda.classList.remove("ponta-esquerda");
    peca.classList.add("ponta-esquerda");
    peca.style.position = "absolute";

    peca.classList.remove("giro-vertical");

    const [idParteSuperior, idParteInferior] = peca.id.split("");

    peca.classList.remove("girada-superior");
    peca.classList.remove("girada-inferior");

    peca.classList.remove("vertical");
    if(pontaEsquerda.classList.contains("vertical")){
        const lado = defineLadoDeGiroDaPeca(peca,true);
        peca.classList.add(lado, "primeira-esquerda");  
    } else {
        const lado = defineLadoDeGiroDaPeca(peca, true);
        peca.classList.add(lado);
    }

    if ((idParteSuperior === idParteInferior) && peca.classList.contains("primeira-esquerda")) {
        peca.classList.remove("normal");
        peca.classList.add("girada-superior");
    }


    if (peca.classList.contains("primeira-esquerda")) {
        let posicaoTop = parseFloat(pontaEsquerda.style.top);
        peca.style.top = `${posicaoTop - peca.clientHeight / 14.5}%`;

        const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * 35;
        let posicaoEsquerda = parseFloat(pontaEsquerda.style.left);

        if (idParteInferior !== idParteSuperior) {
            peca.style.left = `${posicaoEsquerda + alturaPecaPercent}%`;
            if (ultimaPecaFOiColocadaDeLadoEsquerdaVertical) {
                peca.style.left = `${posicaoEsquerda + alturaPecaPercent / 1.50}%`;
            }
            ultimaPecaFOiColocadaDeLadoEsquerdaVertical = true;
        } else {
            peca.style.left = `${posicaoEsquerda + alturaPecaPercent}%`;
            ultimaPecaFOiColocadaDeLadoEsquerdaVertical = false;
        }
    } else {
        let posicaoTop = parseFloat(pontaEsquerda.style.top);
        const [idParteSuperior, idParteInferior] = peca.id.split("");
        peca.style.top = `${posicaoTop}%`;

        const alturaPecaPercent = (peca.clientHeight / tabuleiro.clientHeight) * 70;
        let posicaoEsquerda = parseFloat(pontaEsquerda.style.left);

        if (idParteInferior !== idParteSuperior) {
            peca.style.left = `${posicaoEsquerda + alturaPecaPercent / 2}%`;
            if (pontaEsquerda.classList.contains("girada-inferior") || pontaEsquerda.classList.contains("girada-superior")) {
                peca.style.left = `${posicaoEsquerda + alturaPecaPercent / 1.50}%`;
            }
            ultimaPecaFOiColocadaDeLadoEsquerdaVertical = true;
        } else {
            peca.style.left = `${posicaoEsquerda + alturaPecaPercent / 2}%`;
            ultimaPecaFOiColocadaDeLadoEsquerdaVertical = false;
        }
    }


    primeiraChamadaDaFuncao = false;
    tabuleiro.appendChild(peca);
}