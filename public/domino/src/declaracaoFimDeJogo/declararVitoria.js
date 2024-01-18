function declararVencedor() {
    const espacoJogador = document.querySelector('.espacoPrimeiroJogador');
    const espacoPecas = espacoJogador.querySelector('.conjuntoPecas');

    if (espacoPecas.querySelector('.peca-domino')) {
        return false;
    }else{
        return true;
    }
}

export { declararVencedor }