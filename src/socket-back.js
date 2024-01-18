import io from "./servidor.js";

const home = io.of('/home');
const jogo = io.of('/jogo');

const salas = {
    "Sala1": { status: 'emAberto', pecas: [] },
    "Sala2": { status: 'emAberto', pecas: [] },
    "Sala3": { status: 'emAberto', pecas: [] },
    "Sala4": { status: 'emAberto', pecas: [] }
};

const valoresPecas = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 2],
[2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5],
[3, 6], [4, 4], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6]];

let jogadores = [];


home.on("connection", (socket) => {
    console.log("Um cliente se conectou. ID da conexão:", socket.id);

    verificarTodasAsSalas();

    // Quando a conexão é encerrada
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

jogo.on("connection", (socket) => {
    console.log("Um cliente se conectou no jogo. ID da conexão:", socket.id);

    socket.on('selecionarSala', (nomeSala, nomeJogador, pontuacao, personagemJogador) => {
        if (!verificarExistenciaDaSala(nomeSala, socket)) {
            const novaSala = nomeSala;
            salas[novaSala] = { status: 'emAberto', pecas: [] };
        }
        const quantidadeJogadores = verificarQuantidadeDeJogadores(nomeSala);
        const limiteSala = 4;
        let tokenJogador;
        let jogador;

        jogo.to(socket.id).emit('verificarToken');
        socket.on('valorToken', (token) => {
            tokenJogador = token;
            // verificarExistenciaDeTokenAtivo(token);
            verificarExistenciaDeNomeDoJogadorNaSala(nomeJogador, socket.id, nomeSala);

            verificarSePartidadeEmAndamento(socket, nomeSala);

            if (quantidadeJogadores < limiteSala) {
                jogador = adicionarJogadorNaSala(socket, nomeSala, nomeJogador, pontuacao, tokenJogador, personagemJogador);
                if (jogador.posicaoJogador == limiteSala) {
                    iniciarPartida(nomeSala);
                }
            }
        });
    });

    socket.on('maiorPecaEncontrada', (nomeSala, jogadorMaiorPeca) => {
        jogo.to(nomeSala).emit('definirPrimeiroJogador', jogadorMaiorPeca);
    })

    socket.on('passarAvez', (nomeSala) => {
        jogo.to(nomeSala).emit('passarVez');
    });

    socket.on('atualizarPecas', (pecasAtualizadas, nomeSala) => {
        salas[nomeSala].pecas = pecasAtualizadas;
    });

    socket.on('atualizarQuantidadeDePecas', (nomeSala, nomeJogador) => {
        const jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
        jogo.to(nomeSala).emit('atualizarPecasOponente', nomeJogador, jogadoresSalaEscolhida);
    });

    socket.on('declararEmpate', (nomeSala) => {
        jogo.to(nomeSala).emit('empateDeclarado');
    });

    socket.on('declararVitoria', (nomeSala, nomeJogador) => {
        jogo.to(nomeSala).emit('vitoriaDeclarada', nomeJogador);
    });

    socket.on('sairPartida', (nomeSala) => {
        jogo.to(socket.id).emit('partidaEncerrada', salas);

        verificarPossibilidadeDeContinuacaoDaPartida(nomeSala);
        desconectarJogadorPartidaEmAndamento(nomeSala, socket);
        removerObjetoPorSocketId(socket.id);
    });

    // Quando a conexão é encerrada
    socket.on('disconnect', () => {
        console.log('Usuário desconectado');

        const referer = socket.handshake.headers.referer;
        const parametros = new URLSearchParams(new URL(referer).search);
        const nomeSala = parametros.get('sala');

        verificarPossibilidadeDeContinuacaoDaPartida(nomeSala);

        desconectarJogadorPartidaEmAndamento(nomeSala, socket);

        removerObjetoPorSocketId(socket.id);

        desconectarJogadorPartidaEmAberto(nomeSala);

        verificarQuantidadeDeJogadores(nomeSala);
    });

    //aqui
    socket.on('enviarEstadoTabuleiro', (nomeSala, estadoTabuleiro) => {
        socket.broadcast.to(nomeSala).emit('atualizarEstadoTabuleiro', estadoTabuleiro);

    });
});

function verificarTodasAsSalas() {
    verificarQuantidadeDeJogadores('Sala1');
    verificarQuantidadeDeJogadores('Sala2');
    verificarQuantidadeDeJogadores('Sala3');
    verificarQuantidadeDeJogadores('Sala4');
}

function verificarQuantidadeDeJogadores(nomeSala) {
    const sala = jogo.adapter.rooms.get(nomeSala);
    const quantidadeConexoes = sala ? sala.size : 0;
    home.emit("atualizaQuantidadeJogadores", nomeSala, quantidadeConexoes, salas);
    return quantidadeConexoes;
}

function removerObjetoPorSocketId(socketId) {
    const index = jogadores.findIndex(jogador => jogador.socketId === socketId);
    if (index !== -1) {
        jogadores.splice(index, 1);
        for (let i = index; i < jogadores.length; i++) {
            jogadores[i].posicaoJogador = i + 1;
        }
    }
}

function verificarPossibilidadeDeContinuacaoDaPartida(nomeSala) {
    const sala = jogo.adapter.rooms.get(nomeSala);
    const quantidadeConexoes = sala ? sala.size : 0;

    const estadoSala = salas[nomeSala].status;

    if (estadoSala == 'partidaEmAndamento' && quantidadeConexoes < 3) {
        salas[nomeSala].status = 'emAberto';
        jogo.to(nomeSala).emit('partidaEncerrada');
    }
}

function embaralharPecas(valoresPecas) {
    for (let i = valoresPecas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [valoresPecas[i], valoresPecas[j]] = [valoresPecas[j], valoresPecas[i]];
    }
    return valoresPecas;
}

function verificarExistenciaDeTokenAtivo(token) {
    const jogadorComTokenProcurado = jogadores.find(jogador => jogador.tokenJogador == token);
    if (jogadorComTokenProcurado) {
        jogo.to(jogadorComTokenProcurado.socketId).emit('novoJogoAberto');
        removerObjetoPorSocketId(jogadorComTokenProcurado.socketId);
    }
}

function verificarExistenciaDeNomeDoJogadorNaSala(nomeJogador, socketId, nomeSala) {
    const jogadorComNomeProcurado = jogadores.find(jogador => jogador.nomeJogador == nomeJogador && jogador.nomeSala == nomeSala);
    if (jogadorComNomeProcurado) {
        jogo.to(socketId).emit('nomeExistente');
        removerObjetoPorSocketId(socketId);
    }
}

function adicionarJogadorNaSala(socket, nomeSala, nomeJogador, pontuacao, tokenJogador, personagemJogador) {
    socket.join(nomeSala);
    jogo.to(nomeSala).emit('telaDeEspera');
    const numeroJogador = verificarQuantidadeDeJogadores(nomeSala);
    const novojogador = { socketId: socket.id, nomeSala: nomeSala, posicaoJogador: numeroJogador, nomeJogador: nomeJogador, pontuacao: pontuacao, tokenJogador: tokenJogador, personagem: personagemJogador };
    jogadores.push(novojogador);
    const jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
    jogo.to(nomeSala).emit('posicaoJogador', jogadoresSalaEscolhida);
    return novojogador;
}

function verificarSePartidadeEmAndamento(socket, nomeSala) {
    const estadoSala = salas[nomeSala].status;
    if (estadoSala == 'partidaEmAndamento') {
        jogo.to(socket.id).emit('salaCheia');
    }
}

function iniciarPartida(nomeSala) {
    const pecasEmbaralhadas = embaralharPecas(valoresPecas);
    const jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);

    jogo.to(nomeSala).emit('iniciarPartida', pecasEmbaralhadas, jogadoresSalaEscolhida);
    salas[nomeSala].status = 'partidaEmAndamento';
    salas[nomeSala].pecas = pecasEmbaralhadas;
    home.emit('partidaIniciada', salas, nomeSala);
}

function desconectarJogadorPartidaEmAndamento(nomeSala, socket) {
    const estadoSala = salas[nomeSala].status;
    const jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
    if (estadoSala == 'partidaEmAndamento') {
        jogo.to(nomeSala).emit('jogadorDesconectado', jogadoresSalaEscolhida, socket.id);
    }
}

function desconectarJogadorPartidaEmAberto(nomeSala) {
    const estadoSala = salas[nomeSala].status;
    if (estadoSala == 'emAberto') {
        const jogadoresSalaEscolhida = jogadores.filter(jogador => jogador.nomeSala == nomeSala);
        jogo.to(nomeSala).emit('atualizarJogadores', jogadoresSalaEscolhida);
    }
}

function verificarExistenciaDaSala(nomeSala, socket) {
    if (!nomeSala) {
        jogo.to(socket.id).emit('nomeExistente');
    } else {
        const sala = salas[nomeSala]
        return !!sala;
    }
}