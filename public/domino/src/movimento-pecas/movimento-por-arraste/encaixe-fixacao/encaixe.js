let ladoDoGiro;

function verificarEncaixe(pecaMovida, pecas) {
    var encaixou = verificarColisaoComMargem(pecaMovida, pecas);
    if (encaixou) {
        // Se houver colisão, adicione a classe girada
            pecaMovida.classList.add(`girada-${ladoDoGiro}`);
    } else if (!encaixou) {
        //pecaMovida.classList.add(`desgirada-${ladoDoGiro}`);
        //pecaMovida.classList.remove(`girada-${ladoDoGiro}`);

    }
}

function verificarColisaoComMargem(pecaMovida, pecas) {
    var colidiu = false;

    var posicaoMovida = pecaMovida.getBoundingClientRect();

    pecasNoTabuleiro = tabuleiro.querySelectorAll(".peca-domino");

    pecasNoTabuleiro.forEach(function (outraPeca) {
        if (outraPeca !== pecaMovida && outraPeca.classList.contains("colocavel")) {
            var posicaoOutraPeca = outraPeca.getBoundingClientRect();

            var colisaoVertical =
                posicaoMovida.bottom >= posicaoOutraPeca.top - 15 &&
                posicaoMovida.top <= posicaoOutraPeca.bottom + 15;

            var colisaoDireita =
                posicaoMovida.right - 5 <= posicaoOutraPeca.left &&
                posicaoMovida.right + 70 >= posicaoOutraPeca.left;

            var colisaoEsquerda =
                posicaoMovida.left + 5 >= posicaoOutraPeca.right &&
                posicaoMovida.left - 70 <= posicaoOutraPeca.right;

            if (colisaoVertical && (colisaoDireita || colisaoEsquerda)) {
                ladoDoGiro = colisaoDireita ? "inferior" : "superior";
                const resultado = ladoDoGiro === "inferior" ? "superior" : "inferior";

                pecaMovida.classList.remove(`girada-${resultado}`);
                colidiu = true;

                console.log("Colisão vertical com", outraPeca);
            }

            var colisaoHorizontal =
                posicaoMovida.right + 70 <= posicaoOutraPeca.left ||
                posicaoMovida.left - 70 >= posicaoOutraPeca.right ||
                (posicaoMovida.bottom <= posicaoOutraPeca.top + 8 &&
                    posicaoMovida.top >= posicaoOutraPeca.bottom - 8);

            if (colisaoHorizontal) {
                colidiu = false;

                pecaMovida.classList.remove("girada-superior");
                pecaMovida.classList.remove("girada-inferior");

            }
        }
    });


    return colidiu;
}



let tabuleiro = document.querySelector(".tabuleiro")

function EncaixePrimeiraPeca(pecaMovida) {
    if (pecaMovida.classList.contains("colocavel") && tabuleiro.childNodes.length == 0 ) {
        let divDeEncaixe = document.createElement("div");
        tabuleiro.appendChild(divDeEncaixe);
        divDeEncaixe.classList.add("lugar-encaixe");
        pecaMovida.classList.add("encaixavel");
    }
}
