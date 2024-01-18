function fixaPecaEmPosicao(pecaSelecionada, pecas) {
  let posicaoFixacao = verificarFixacao(pecaSelecionada, pecas);
  console.log(posicaoFixacao);
  if (pecaSelecionada.classList.contains("colocavel") && 
  (pecaSelecionada.classList.contains("girada-superior") || pecaSelecionada.classList.contains("girada-inferior"))) {

    let pecaDupla = posicaoFixacao[3];
    
    

    if (pecaDupla) {
      console.log("ccccccccccccccccccccccccc");
      let PosicaoParaFixacaoTop = (posicaoFixacao[0] - pecaSelecionada.clientWidth / 4.1) / divDoTabuleiro.clientHeight * 69;
      if (posicaoFixacao[2] == "esquerda") {
        let PosicaoParaFixacaoLeft = (posicaoFixacao[1] - pecaSelecionada.clientHeight * 0.81) / divDoTabuleiro.clientWidth * 70;
        pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
        pecaSelecionada.style.left = PosicaoParaFixacaoLeft + "%";
        pecaSelecionada.classList.add("encaixavel");
        pecaSelecionada.classList.add("fixa")

      } else if (posicaoFixacao[2] == "direita") {
        let PosicaoParaFixacaoRight = (posicaoFixacao[1] + pecaSelecionada.clientHeight * 0.85 - 15) / divDoTabuleiro.clientWidth * 70;
        pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
        pecaSelecionada.style.left = PosicaoParaFixacaoRight + "%";
        pecaSelecionada.classList.add("encaixavel");
        pecaSelecionada.classList.add("fixa")
      }
    } else { //desenvolvimento

      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      let PosicaoParaFixacaoTop = (posicaoFixacao[0] - pecaSelecionada.clientWidth / 1.1) / divDoTabuleiro.clientHeight * 69;
      if (posicaoFixacao[2] == "esquerda") {
        let PosicaoParaFixacaoLeft = (posicaoFixacao[1] - pecaSelecionada.clientHeight * 0.81) / divDoTabuleiro.clientWidth * 70;
        pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
        pecaSelecionada.style.left = PosicaoParaFixacaoLeft + "%";
        pecaSelecionada.classList.add("encaixavel");
        pecaSelecionada.classList.add("fixa")
      } else if (posicaoFixacao[2] == "direita") {
        let PosicaoParaFixacaoRight = (posicaoFixacao[1] + pecaSelecionada.clientHeight - 15) / divDoTabuleiro.clientWidth * 74;
        pecaSelecionada.style.top = PosicaoParaFixacaoTop + "%";
        pecaSelecionada.style.left = PosicaoParaFixacaoRight + "%";
        pecaSelecionada.classList.add("encaixavel");
        pecaSelecionada.classList.add("fixa")
      }
    }

  }
}
