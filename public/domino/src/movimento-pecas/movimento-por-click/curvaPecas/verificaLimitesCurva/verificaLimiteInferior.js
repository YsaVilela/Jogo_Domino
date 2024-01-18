function verificaLimiteInferior(peca) {

  const limiteInferior = 388;
  const posicaoInferiorPeca = peca.offsetTop + peca.offsetHeight;

  return posicaoInferiorPeca >= limiteInferior;
}
