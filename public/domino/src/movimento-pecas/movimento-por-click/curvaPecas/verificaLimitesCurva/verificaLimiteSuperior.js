function verificaLimiteSuperior(peca) {

  const limiteSuperior = 16;
  const posicaoSuperiorPeca = peca.offsetTop;

  return posicaoSuperiorPeca <= limiteSuperior;
}
