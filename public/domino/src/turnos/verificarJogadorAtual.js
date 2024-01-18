function verificarJogadorAtual(){
    const espacoJogador = document.querySelector('.espacoPrimeiroJogador');
    if (espacoJogador.classList.contains('jogadorAtual')){
        return true;
    }else{
        return false;
    }
}

export {verificarJogadorAtual}