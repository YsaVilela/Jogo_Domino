// let divDoTabuleiro = document.querySelector(".tabuleiro");
// let conjuntoPecas = document.querySelector(".conjuntoPecas");

// document.addEventListener("DOMContentLoaded", function () {
//   var pecas = document.querySelectorAll(".peca-domino");
//   var pecaSelecionada = null;
//   var pecaInicialPos = { left: 0, top: 0 }; // Armazena a posição inicial da peça
//   pecas.forEach(function (peca) {
//     peca.addEventListener("mousedown", function (event) {
//       event.preventDefault();


//       pecaSelecionada = peca;
//       pecaInicialPos = peca.getBoundingClientRect();

//       EncaixePrimeiraPeca(pecaSelecionada);



//       var offsetX = event.clientX - pecaInicialPos.left;
//       var offsetY = event.clientY - pecaInicialPos.top;


//       function movePeca(event) {


//         if (pecaSelecionada && !pecaSelecionada.classList.contains("fixa") && pecaSelecionada.classList.contains("colocavel")) {
//           console.log("teste de movimento permitido")

//           if (pecaSelecionada.style.position !== "absolute") {
//             pecaSelecionada.style.position = "absolute";
//           }

//           // Nova posição da peça em porcentagem
//           let novaPosicaoLeft = (event.clientX - offsetX) / divDoTabuleiro.clientWidth * 70;
//           let novaPosicaoTop = (event.clientY - offsetY) / divDoTabuleiro.clientHeight * 69;

//           // Limites da div que contém o tabuleiro (em porcentagem)
//           let limiteEsquerdo = 15;
//           let limiteSuperior = 15;
//           let limiteDireito = 86 - (pecaSelecionada.clientWidth / divDoTabuleiro.clientWidth * 100);
//           let limiteInferior = 89 - (pecaSelecionada.clientHeight / divDoTabuleiro.clientHeight * 100);

//           // Garante que a posição da peça não ultrapasse os limites
//           novaPosicaoLeft = Math.max(limiteEsquerdo, Math.min(novaPosicaoLeft, limiteDireito));
//           novaPosicaoTop = Math.max(limiteSuperior, Math.min(novaPosicaoTop, limiteInferior));


//           if (!colidiu && !pecaSelecionada.classList.contains("fixar")) {

//             pecaSelecionada.style.left = novaPosicaoLeft + "%";
//             pecaSelecionada.style.top = novaPosicaoTop + "%";

//           }

//           if (pecaSelecionada.classList.contains("girada") && colidiu === true) {
//             pecaSelecionada.classList.add("fixa");
//           }


//           aplicaGiroDeAcordoComNumero(pecaSelecionada, pecas, divDoTabuleiro);
//           // Verifique a colisão enquanto move
//         }
//       }



//       document.addEventListener("mousemove", movePeca);

//       document.addEventListener("mouseup", function () {
//         console.log("Peça solta:", pecaSelecionada.textContent);


//         //trava peça 66 no meio do tabuleiro
//         if (!pecaSelecionada.classList.contains("fixa")) {
//           //remover quando terminar logica de pulo
//           if (verificarColisao(pecaSelecionada)) {
//             if (pecaSelecionada.classList.contains("girada")) {
//               pecaSelecionada.classList.add("fixa");
//             } else {


//               let limiteInferior = 89 - (pecaSelecionada.clientHeight / divDoTabuleiro.clientHeight * 100);

//               pecaSelecionada.style.left = 50 + "%";
//               pecaSelecionada.style.top = limiteInferior * 0.95 + "%";
//               colidiu = false;
//             }
//           }



//           if (pecaSelecionada.id == "66") {
//             pecaSelecionada.style.left = tabuleiro.clientWidth / tabuleiro.clientHeight * 31.15 + "%";
//             pecaSelecionada.style.top = tabuleiro.clientHeight / tabuleiro.clientWidth * 68.6 + "%";
//             pecaSelecionada.classList.add("fixa");
//             pecaSelecionada.classList.add("ponta");
//             //pecaSelecionada.classList.remove("colocavel");
//             pecaSelecionada.classList.remove("fixar");

//             tabuleiro.firstChild.remove();
//           }

//           let conjuntoPecasOrigem = peca.parentNode;
//           if (pecaSelecionada.classList.contains("colocavel")) {
//             conjuntoPecasOrigem.removeChild(pecaSelecionada);
//             tabuleiro.appendChild(pecaSelecionada);
//           }

//           if (tabuleiro.childNodes.length > 1) {

//             fixaPecaEmPosicao(pecaSelecionada, pecas);
//             if (!(pecaSelecionada.classList.contains("girada-superior") || pecaSelecionada.classList.contains("girada-inferior"))){
//               tabuleiro.removeChild(pecaSelecionada);
//               conjuntoPecasOrigem.appendChild(pecaSelecionada);
//               pecaSelecionada.style.top = "";
//               pecaSelecionada.style.left = "";
//               pecaSelecionada.style.position = "";
//               pecaSelecionada.classList.remove("ponta");
//               pecaSelecionada.classList.remove("fixar");
//             } else if ((pecaSelecionada.classList.contains("girada-superior") || pecaSelecionada.classList.contains("girada-inferior"))) {
//               pecaSelecionada.classList.add("ponta");
//             }
//           }
//           //console.clear();


//           //definir de forma separada a aproximação e com isso determinar corretamente qual peça vai ser a considerada para o encaixe 
//           //provavelmente usar classes para determinar quais lados a aproximação deve considerar como encaixavel
//           //em caso de dificuldade definir lugar de encaixe desconsiderando a aproximação para isso usar dblclick
//           //e chamar função que posicione a peça em seu lugar com clique na peça e no lugar de destino
//           //inconsistencias no giro de algumas peças
//           verificaPecasEncaixaveis(divDoTabuleiro);


//           //pecaSelecionada.classList.remove("colocavel");

//           document.removeEventListener("mousemove", movePeca);
//           document.removeEventListener("mouseup", arguments.callee);
//           pecaSelecionada = null;

//         }


//       });
//     });
//   });

//   let tabuleiro = document.querySelector(".tabuleiro");


//   let colidiu = false;
//   function verificarColisao(pecaMovida) {

//     // Obtém a posição da peça movida
//     var posicaoMovida = pecaMovida.getBoundingClientRect();

//     // Verifica a colisão com outras peças
//     pecas.forEach(function (outraPeca) {
//       if (outraPeca !== pecaMovida) {
//         var posicaoOutraPeca = outraPeca.getBoundingClientRect();

//         // Verificar colisão de retângulos sem margem e sem considerar "encaixável"
//         if (
//           posicaoMovida.right >= posicaoOutraPeca.left &&
//           posicaoMovida.left <= posicaoOutraPeca.right &&
//           posicaoMovida.bottom >= posicaoOutraPeca.top &&
//           posicaoMovida.top <= posicaoOutraPeca.bottom
//         ) {
//           colidiu = true;

//         }
//       }
//     });


//     return colidiu;
//   }


// });
