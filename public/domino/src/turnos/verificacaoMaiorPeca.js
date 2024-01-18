function verificandoMaiorPeca() {
    const maiorPeca = document.getElementById('66');
    if (maiorPeca) {
        const jogadorComMaiorPeca = maiorPeca.parentElement.parentElement.parentElement.id;
        return jogadorComMaiorPeca;
    }
}

function adicionarPrimeiroJogador(jogadorComMaiorPeca) {
    const espacoJogador = document.getElementById(jogadorComMaiorPeca);
    espacoJogador.classList.add('jogadorAtual');
}

export { verificandoMaiorPeca, adicionarPrimeiroJogador }