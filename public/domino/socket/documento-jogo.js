import { reconhecerJogadores, desativarJogador, limparEspacoJogadores, verificarPontuacao, verificarToken, atualizarPecasDisponiveis, adicionarPonto, acionarModal, retirarUmaPecaJogador } from "./socket-front-jogo.js";
import { iniciarTempo, passarVez } from "../src/turnos/passarAVez.js";
import { distribuirPecas } from "../src/grid_pecas/posicionamento_pecas.js";
import { declararEmpate } from "../src/declaracaoFimDeJogo/declararEmpate.js";
import { declararVencedor } from "../src/declaracaoFimDeJogo/declararVitoria.js";
import { desenharPecas } from "../src/peca/peca.js";
import { adicionarPrimeiroJogador, verificandoMaiorPeca } from "../src/turnos/verificacaoMaiorPeca.js";
import { verificarJogadorAtual } from "../src/turnos/verificarJogadorAtual.js";

const socket = io('/jogo');

const parametros = new URLSearchParams(window.location.search);
const sala = parametros.get('sala');
const nomeJogador = parametros.get('nomeJogador');
const personagemJogador = parametros.get('personagem');
const pontuacao = verificarPontuacao();

socket.emit('selecionarSala', sala, nomeJogador, pontuacao, personagemJogador);

socket.on('salaCheia', () => {
    window.location.href = 'home.html';
});

socket.on('nomeExistente', () => {
    window.location.href = 'home.html';
});

socket.on('novoJogoAberto', () => {
    window.location.href = 'home.html';
});

socket.on('verificarToken', () => {
    const token = verificarToken();
    socket.emit('valorToken', token);
})

socket.on('telaDeEspera', () => {
    const titulo = 'Aguarde...';
    const mensagem = 'Deve haver 4 jogadores para iniciar a partida';
    acionarModal(titulo, mensagem);
});

socket.on('iniciarPartida', (pecasEmbaralhadas, jogadoresSalaEscolhida) => {
    document.getElementById('modal').style.display = 'none';
    distribuirPecas(pecasEmbaralhadas, jogadoresSalaEscolhida, nomeJogador);
    const jogadorMaiorPeca = verificandoMaiorPeca();
    if (jogadorMaiorPeca) {
        socket.emit('maiorPecaEncontrada', sala, jogadorMaiorPeca);
    }
});

socket.on('definirPrimeiroJogador', (jogadorMaiorPeca) => {
    adicionarPrimeiroJogador(jogadorMaiorPeca);
    iniciarTempo();
});

document.getElementById('sairEspera').addEventListener('click', () => {
    socket.emit('sairPartida', sala);
});

document.getElementById('sair').addEventListener('click', () => {
    socket.emit('sairPartida', sala);
});

socket.on('partidaEncerrada', () => {
    window.location.href = 'home.html';
});

socket.on('posicaoJogador', (jogadoresSalaEscolhida) => {
    reconhecerJogadores(jogadoresSalaEscolhida, nomeJogador);
});

socket.on('atualizarJogadores', (jogadoresSalaEscolhida) => {
    limparEspacoJogadores();
    reconhecerJogadores(jogadoresSalaEscolhida, nomeJogador);
});

socket.on('jogadorDesconectado', (jogadoresSalaEscolhida, socketId) => {
    desativarJogador(jogadoresSalaEscolhida, socketId);

    //adicionar função para redistribuir as peças
});

document.getElementById('btnPassarAVez').addEventListener('click', () => {
    if (verificarJogadorAtual()) {
        socket.emit('passarAvez', sala);
    }
});

socket.on('passarVez', () => {
    passarVez();
});

socket.on('atualizarTabuleiro', (pecasDisponiveis) => {
    const idPecaJogada = 55;
    const valorDireito = 2;
    const valorEsquerdo = 4;
    const pecasDisponiveisAtualizada = atualizarPecasDisponiveis(idPecaJogada, pecasDisponiveis);
    socket.emit('atualizarPecas', pecasDisponiveisAtualizada, sala)

    if (declararEmpate(pecasDisponiveisAtualizada, valorDireito, valorEsquerdo)) {
        socket.emit('declararEmpate', sala);
    }

});

socket.on('empateDeclarado', () => {
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 7000);
    const titulo = 'Empatou';
    const mensagem = 'O jogo acabou em empate';
    acionarModal(titulo, mensagem);
});

socket.on('vitoriaDeclarada', (jogador) => {
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 7000);
    const titulo = `${jogador} venceu a partida`;
    const mensagem = `O jogo acabou em vitória para ${jogador}`;
    acionarModal(titulo, mensagem);
});

socket.on('aviso', (msg) => {
    console.log(msg);
});


// Adicione esta função no escopo do seu código
function enviarEstadoTabuleiro(tabuleiro) {
    // Inicialize o array para armazenar os valores das peças
    const valoresPecas = [];

    // Convertendo as informações das childNodes do tabuleiro
    const informacoesPecas = Array.from(tabuleiro.children).map(peca => {
        const posicaoPeca = peca.getBoundingClientRect();
        const posicaoRelativa = {
            top: posicaoPeca.top - tabuleiro.getBoundingClientRect().top,
            left: posicaoPeca.left - tabuleiro.getBoundingClientRect().left,
        };

        // Adicionando o valor da peça ao array valoresPecas
        const valorPeca = peca.id.split('').map(Number);
        valoresPecas.push(valorPeca);

        // Obtendo informações das childNodes da peça
        const childNodesInfo = Array.from(peca.childNodes).map(childNode => {
            return {
                id: childNode.id,
                tagName: childNode.tagName,
                classes: Array.from(childNode.classList),
            };
        });
        const pontaEsquerda = peca.classList.contains("ponta-esquerda");
        const pontaDireita = peca.classList.contains("ponta-direita");

        return {
            id: peca.id,
            tagName: peca.tagName,
            classes: Array.from(peca.classList),
            pontaEsquerda: pontaEsquerda,
            pontaDireita: pontaDireita,
            posicao: posicaoRelativa,
            left: peca.style.left, // Adicionando a propriedade left
            top: peca.style.top,   // Adicionando a propriedade top
            childNodesInfo: childNodesInfo,
            // Adicione mais propriedades, se necessário
        };
    });

    // Criando o objeto estadoTabuleiro com informacoesPecas e valoresPecas
    const estadoTabuleiro = {
        informacoesPecas: informacoesPecas,
        valoresPecas: valoresPecas,
    };

    // Enviar o estado do tabuleiro para o socket
    socket.emit('enviarEstadoTabuleiro', sala, estadoTabuleiro);

    socket.emit('atualizarQuantidadeDePecas', sala, nomeJogador)

    if (declararVencedor()) {
        socket.emit('declararVitoria', sala, nomeJogador);
        adicionarPonto();
    }
}

socket.on('atualizarPecasOponente', (nomeJogador, jogadoresSalaEscolhida) => {
    retirarUmaPecaJogador(nomeJogador, jogadoresSalaEscolhida)
})


//aqui
socket.on('atualizarEstadoTabuleiro', (estadoTabuleiro) => {

    // Remova as peças antigas do tabuleiro local, se necessário
    const tabuleiroLocal = document.querySelector('.tabuleiro');
    tabuleiroLocal.innerHTML = '';

    // Crie as novas peças com base nas informações recebidas
    const novasPecas = desenharPecas(estadoTabuleiro.valoresPecas);

    // Adicione as novas peças ao tabuleiro local
    novasPecas.forEach((novaPeca, index) => {
        const informacoesPeca = estadoTabuleiro.informacoesPecas[index];

        // Aplique as propriedades left e top da informação da peça
        novaPeca.style.position = "absolute";
        novaPeca.style.left = informacoesPeca.left;
        novaPeca.style.top = informacoesPeca.top;


        // Obtenha os childNodes da novaPeca
        const childNodes = Array.from(novaPeca.children);

        // Aplique as classes e IDs dos childNodes conforme as informações recebidas
        informacoesPeca.childNodesInfo.forEach((childNodeInfo, childIndex) => {
            const childNode = childNodes[childIndex];

            // Aplique as propriedades do childNode
            childNode.id = childNodeInfo.id;
            childNode.classList.add(...childNodeInfo.classes);
        });

        // Aplique as classes da informação da peça à novaPeca
        novaPeca.classList.add(...informacoesPeca.classes);

        novaPeca.classList.remove("colocavel")
        tabuleiroLocal.appendChild(novaPeca);
    });



    // Adicione a novaPeca ao tabuleiro local

    // Execute outras funções necessárias
    //verificaPecasEncaixaveis(tabuleiroLocal);

    passarVez();
    // Chame a função para passar a vez depois de adicionar todas as novas peças

});


export { enviarEstadoTabuleiro }

