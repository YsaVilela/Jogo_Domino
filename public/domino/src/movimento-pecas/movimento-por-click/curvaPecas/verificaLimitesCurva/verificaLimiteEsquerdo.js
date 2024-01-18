function verificaLimiteEsquerdo(peca) {

  const limiteEsquerdo = 10;
  const posicaoEsquerdaPeca = peca.offsetLeft;

  return posicaoEsquerdaPeca <= limiteEsquerdo;
}
