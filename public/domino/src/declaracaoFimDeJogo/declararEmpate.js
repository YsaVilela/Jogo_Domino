function declararEmpate(pecasDisponiveis, valorDireito, valorEsquerdo) {
    const pecaEncontrada = pecasDisponiveis.filter((peca) => {
        return peca[0] == valorDireito || peca[0] == valorEsquerdo
            || peca[1] == valorDireito || peca[1] == valorEsquerdo;
    });

    return pecaEncontrada.length === 0;
}

export { declararEmpate }