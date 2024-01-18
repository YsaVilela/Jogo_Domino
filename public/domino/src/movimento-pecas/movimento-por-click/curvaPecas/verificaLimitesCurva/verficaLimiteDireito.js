  function verificaLimiteDireito(peca) {
  
    const limiteDireito = 853;
    const posicaoDireitaPeca = peca.offsetLeft + peca.offsetWidth;

    return posicaoDireitaPeca >= limiteDireito;
  }
  
  