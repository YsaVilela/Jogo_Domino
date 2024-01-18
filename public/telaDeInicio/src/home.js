function redirecionar(botaoClicado) {
    let sala = botaoClicado.parentNode.id;
    const nome = document.getElementById('nome').value;
    const personagem = document.querySelector('.active').querySelector('img').alt;
    if (nome && sala) {
        window.location.href = `jogo.html?sala=${sala}&nomeJogador=${nome}&personagem=${personagem}`;
    } else {
        if (!nome) {
            avisoInserirNomeJogador();
        }else
        if (!sala) {
            var valorSalaPersonalizada = document.getElementById("nomeSalaPersonalizada").value;
            sala = valorSalaPersonalizada;
            if (sala) {
                window.location.href = `jogo.html?sala=${sala}&nomeJogador=${nome}&personagem=${personagem}`;
            } else {
                avisoInserirNomeSala();
            }
        }
    }
}

function abrirModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <label for="nomeSalaPersonalizada">Digite o nome da sala procurada OU crie sua própria sala</label>
                <input type="text" id="nomeSalaPersonalizada" class="nomeSalaPersonalizada" placeholder="Digite o nome...">

                <div class="botoes">
                    <button onclick="redirecionar(this)" class="btnEntrar" id="entrarSala">Entrar</button>
                    <button onclick="fecharModal()" class="btnSair">Fechar</button>
                </div>
            </div>
        </div>
    `;
    modal.classList.add('modal');
    modal.id = 'modal';

    document.body.appendChild(modal);
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function avisoInserirNomeJogador() {
    const avisoAnterior = document.querySelector('.inserirNome').querySelector('.aviso');
    if (!avisoAnterior) {
        document.getElementById('nome').classList.add('invalido');
        const aviso = document.createElement('p');
        aviso.textContent = '*Nome de usuário é obrigatório';
        aviso.classList.add('aviso');
        document.querySelector('.inserirNome').appendChild(aviso);
    }
}

function avisoInserirNomeSala() {
    const avisoAnterior = document.querySelector('.modal-content').querySelector('.aviso');
    if (!avisoAnterior) {
        document.getElementById('nomeSalaPersonalizada').classList.add('invalido');
        const aviso = document.createElement('p');
        aviso.textContent = '*Nome da sala é obrigatório';
        aviso.classList.add('aviso');
        document.querySelector('.modal-content').appendChild(aviso);
    }
}