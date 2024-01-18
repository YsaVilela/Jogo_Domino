function reconhecerJogadores(jogadoresSalaEscolhida, nomeJogador) {
    const jogador = jogadoresSalaEscolhida.find(jogador => jogador.nomeJogador == nomeJogador);
    const numeroJogadorPrincipal = jogador.posicaoJogador;
    posicionarOponentes(jogador, jogadoresSalaEscolhida, numeroJogadorPrincipal)
}

function posicionarOponentes(jogador, jogadoresSalaEscolhida, numeroJogador) {
    switch (numeroJogador) {
        case 1:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2);
                const idJogador = verificarIdJogador(jogador.posicaoJogador);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3);
                const idJogador = verificarIdJogador(jogador.posicaoJogador);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4);
                const idJogador = verificarIdJogador(jogador.posicaoJogador);
                posicionarJogadores(idJogador, jogador);
            }
            break;
        case 2:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1);
                const idJogador = verificarIdJogador(4);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3);
                const idJogador = verificarIdJogador(2);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4);
                const idJogador = verificarIdJogador(3);
                posicionarJogadores(idJogador, jogador);
            }
            break;
        case 3:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1);
                const idJogador = verificarIdJogador(3);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2);
                const idJogador = verificarIdJogador(4);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 4);
                const idJogador = verificarIdJogador(2);
                posicionarJogadores(idJogador, jogador);
            }
            break;
        case 4:
            posicionarJogadorPrincipal(jogador);
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 1);
                const idJogador = verificarIdJogador(2);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 2);
                const idJogador = verificarIdJogador(3);
                posicionarJogadores(idJogador, jogador);
            }
            if (jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3)) {
                const jogador = jogadoresSalaEscolhida.find(jogador => jogador.posicaoJogador == 3);
                const idJogador = verificarIdJogador(4);
                posicionarJogadores(idJogador, jogador);
            }
            break;
    }
}

function verificarIdJogador(numeroJogador) {
    switch (numeroJogador) {
        case 1:
            return 'primeiroJogador';

        case 2:
            return 'segundoJogador';

        case 3:
            return 'terceiroJogador';

        case 4:
            return 'quartoJogador';
    }
}

function posicionarJogadores(idPosicaoJogador, jogador) {
    const espacoJogador = document.querySelector(`.${idPosicaoJogador}`);
    espacoJogador.querySelector('.nome').textContent = jogador.nomeJogador;
    espacoJogador.querySelector('.pontosJogador').textContent = jogador.pontuacao;
    espacoJogador.querySelector('.fotoJogador').src = `../telaDeInicio/public/img/personagens/${jogador.personagem}.svg`
    const idJogador = verificarIdJogador(jogador.posicaoJogador);
    const posicaoJogador = espacoJogador.querySelector('.jogador');
    posicaoJogador.id = idJogador;
}

function posicionarJogadorPrincipal(jogador) {
    const espacoJogador = document.querySelector('.primeiroJogador');
    espacoJogador.querySelector('.nome').textContent = jogador.nomeJogador;
    espacoJogador.querySelector('.pontosJogador').textContent = jogador.pontuacao;
    espacoJogador.querySelector('.fotoJogador').src = `../telaDeInicio/public/img/personagens/${jogador.personagem}.svg`
    const idJogador = verificarIdJogador(jogador.posicaoJogador);
    const posicaoJogador = espacoJogador.querySelector('.jogador');
    posicaoJogador.id = idJogador;
}

function desativarJogador(jogadoresSalaEscolhida, socketId) {
    const jogador = jogadoresSalaEscolhida.find(jogador => jogador.socketId == socketId);
    const idJogador = verificarIdJogador(jogador.posicaoJogador);
    console.log(idJogador);
    document.getElementById(idJogador).classList.add('jogadorDesativado');
}

function limparEspacoJogadores() {
    const nomes = document.querySelectorAll('.nome');
    nomes.forEach(nome => {
        nome.textContent = '';
    })
}

function verificarPontuacao() {
    let pontos = localStorage.getItem('pontuacao')
    if (!pontos) {
        localStorage.setItem('pontuacao', 0);
        pontos = 0;
    }
    return pontos;
}

function adicionarPonto() {
    let valor = localStorage.getItem('pontuacao');

    if (valor !== null) {
        valor = parseInt(valor);
        valor++;
        localStorage.setItem('pontuacao', valor);
    } else {
        localStorage.setItem('pontuacao', 0);
    }
}

function verificarToken() {
    let token = localStorage.getItem('token');

    if (token == null) {
        token = gerarToken();
        localStorage.setItem('token', token);
    }
    return token;
}

function gerarToken() {
    length = 7;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

function atualizarPecasDisponiveis(idPecaJogada, pecasDisponiveis) {
    const valorPeca = Array.from(String(idPecaJogada), Number);
    const pecasDisponiveisAtualizada = pecasDisponiveis.filter((peca) => {
        return !(peca[0] === valorPeca[0] && peca[1] === valorPeca[1]);
    });
    return pecasDisponiveisAtualizada;
}

function acionarModal(titulo, mensagem) {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.querySelector('.tituloModal').textContent = titulo;
    modal.querySelector('.messagemModal').textContent = mensagem;
}

function retirarUmaPecaJogador(nomeJogador, jogadoresSalaEscolhida) {
    const jogador = jogadoresSalaEscolhida.find(jogador => jogador.nomeJogador == nomeJogador);
    const numeroJogadorPrincipal = jogador.posicaoJogador;
    const idJogador = verificarIdJogador(numeroJogadorPrincipal);

    const espacoJogador = document.getElementById(idJogador);
    const espacoPecas = espacoJogador.querySelector('.conjuntoPecas');

    let pecaExcluida = espacoPecas.querySelector('.peca-vazia');
    if(pecaExcluida){
        espacoPecas.removeChild(pecaExcluida);
    }
    
    atualizarQuantidadeDePecas(espacoJogador);
}

function atualizarQuantidadeDePecas(espacoJogador) {
    const espacoQuantidadePecas = espacoJogador.querySelector('.quantidadePecas');
    const quantidadePecas = espacoQuantidadePecas.textContent;
    let numeroDePecas = parseInt(quantidadePecas.match(/\d+/)[0], 10);
    const numeroDePecasAtual = --numeroDePecas;
    const quantidadePecasAtual = `(${numeroDePecasAtual} peças)`;
    espacoQuantidadePecas.textContent = quantidadePecasAtual;
}


export { reconhecerJogadores, desativarJogador, limparEspacoJogadores, verificarPontuacao, adicionarPonto, verificarToken, atualizarPecasDisponiveis, acionarModal, verificarIdJogador, retirarUmaPecaJogador }