function aplicaGiroDeAcordoComNumero(pecaSelecionada, pecas, divDoTabuleiro) {
  //tabuleiro
  let pecaNoTabuleiro = divDoTabuleiro.querySelector(".colocavel");
  if (pecaNoTabuleiro) {
    let idPecaNoTabuleiro = pecaNoTabuleiro.id;
    let idSeparadoPecaNotabueiro = idPecaNoTabuleiro.split("");
    let idParteSuperiorDaPecaNoTabuleiro = idSeparadoPecaNotabueiro[0];
    let idParteInferiorDaPecaNoTabuleiro = idSeparadoPecaNotabueiro[1];
    
    // o id da peça 06 o zero pertence a div parte superior e o 6 a parte inferior
    let idPecaSelecionada= pecaSelecionada.id;
    
    if (idPecaSelecionada.includes(idParteSuperiorDaPecaNoTabuleiro) || idPecaSelecionada.includes(idParteInferiorDaPecaNoTabuleiro)) {
      verificarEncaixe(pecaSelecionada, pecas);
    }
  }
  

}
