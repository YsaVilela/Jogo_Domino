function verificarFixacao(pecaMovida, pecas) {

    verificarColisaoComMargemParaEncaixeAtomatico(pecaMovida, pecas);

    if (vaiFixar) {
        console.log(pecaMovidaAltura, pecaMovidaLado, ladoDeAproximacao, tipoPeca);
        // Se houver colisão, adicione a classe girada
        pecaMovida.classList.add("fixar");
        if (ladoDeAproximacao == "esquerda") {
            return [pecaMovidaAltura, pecaMovidaLado, ladoDeAproximacao, tipoPeca];
        } else if (ladoDeAproximacao == "direita") {
            return [pecaMovidaAltura, pecaMovidaLado, ladoDeAproximacao, tipoPeca];
        }

    } else {
        pecaMovida.classList.remove("teste-fixar");
    }
}

let pecaMovidaAltura;
let pecaMovidaLado;

let ladoDeAproximacao;
let tipoPeca;

let vaiFixar = false;
function verificarColisaoComMargemParaEncaixeAtomatico(pecaMovida, pecas) {

    // Obtém a posição da peça movida com margem
    var posicaoMovida = pecaMovida.getBoundingClientRect();

    let pecasNoTabuleiro = tabuleiro.querySelectorAll(".peca-domino");


    // Verifica a colisão com outras peças
    pecasNoTabuleiro.forEach(function (outraPeca) {


        if (outraPeca !== pecaMovida && outraPeca.classList.contains("colocavel")) {
            var posicaoOutraPeca = outraPeca.getBoundingClientRect();
            // Verificar colisão de retângulos
            console.log("teste")

            tipoPeca = outraPeca.classList.contains("colocavel");

            var colisaoHorizontal =
                posicaoMovida.right + 15 >= posicaoOutraPeca.left ||
                posicaoMovida.left - 15 <= posicaoOutraPeca.right ||
                (posicaoMovida.bottom >= posicaoOutraPeca.top + 8 &&
                    posicaoMovida.top <= posicaoOutraPeca.bottom - 8);

            console.log(colisaoHorizontal)
            if (colisaoHorizontal) {

                
                vaiFixar = true;
                
                
                // Verifica se a aproximação é pela esquerda ou pela direita
                pecaMovidaAltura = posicaoOutraPeca.top;
                if (posicaoMovida.left <= posicaoOutraPeca.left) {
                    // Aproximação pela esquerda
                    ladoDeAproximacao = "esquerda";
                    pecaMovidaLado = posicaoOutraPeca.left;
                    
                    
                    
                    outraPeca.classList.add("esquerda")
                    if (outraPeca.classList.contains("ponta") && outraPeca.classList.contains("esquerda") && outraPeca.classList.contains("direita")) {
                        outraPeca.classList.remove("colocavel")
                    }

                } else if (!outraPeca.classList.contains("direita")) {
                    // Aproximação pela direita
                    ladoDeAproximacao = "direita";
                    pecaMovidaLado = posicaoOutraPeca.left;



                    outraPeca.classList.add("direita");
                    if (outraPeca.classList.contains("ponta") && outraPeca.classList.contains("esquerda") && outraPeca.classList.contains("direita")) {
                        outraPeca.classList.remove("colocavel")
                    }
                    if (!outraPeca.classList.contains("ponta") && (outraPeca.classList.contains("esquerda") || outraPeca.classList.contains("direita"))) {
                        outraPeca.classList.remove("colocavel");
                    }
                }







                //pecaNaPonta = document.querySelector(".ponta");

            } else if (posicaoMovida.right <= posicaoOutraPeca.left - 50 &&
                posicaoMovida.left >= posicaoOutraPeca.right + 50 &&
                posicaoMovida.bottom <= posicaoOutraPeca.top + 8 &&
                posicaoMovida.top >= posicaoOutraPeca.bottom - 8) {

                vaiFixar = false;
            }
        }
    });

    //console.log("Colidiu:", colidiu);

    return vaiFixar;
}
