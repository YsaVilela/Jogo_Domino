# 🁢 Jogo de Dominó Online

Este projeto é um **jogo de dominó online multiplayer**, desenvolvido para ser jogado por **4 pessoas simultaneamente**. O jogo roda localmente e é acessado via navegador.

## 🎮 Regras Básicas do Jogo

- É necessário ter **4 jogadores** para iniciar uma partida.  
- Cada jogador recebe **7 peças**.  
- O jogador com a peça [6|6] começa o jogo (ou a peça mais alta disponível).  
- Os jogadores jogam em **sentido horário**, colocando peças compatíveis com as pontas abertas da mesa.  
- Cada jogador tem **30 segundos para jogar** em sua vez. Se o tempo expirar, a vez é automaticamente passada.  
- Caso um jogador não tenha peças válidas para jogar, ele **passa a vez**.  
- O jogo termina quando um jogador ficar sem peças ou quando nenhum dos jogadores puder mais jogar (tranca).  
- O vencedor é o jogador com **menos pontos nas mãos** no caso de tranca, ou quem zerar suas peças.

## 🕹️ Como Jogar

Ao acessar o jogo pela URL abaixo, você poderá:  
- **Criar uma sala personalizada**, escolhendo um nome único.  
- **Entrar em uma sala existente** digitando o nome dela na busca.  
- Assim que **4 jogadores entrarem na mesma sala**, a partida será iniciada automaticamente.

## 🚀 Execução do Projeto

### Pré-requisitos

- Ter o **Node.js** instalado na máquina.

### Instalação e execução

1. Clone o repositório ou baixe os arquivos do projeto.  
2. No terminal, acesse o diretório do projeto e execute:

    ```bash
   npm install
   
4. Em seguida, execute o servidor com:

    ```bash
   npm run dev
   
6. Acesse o jogo pelo navegador no seguinte endereço:

   ```bash
   http://localhost:3000/home.html
   
## 🛠️ Tecnologias Utilizadas

- **JavaScript (JS)**  
- **Express.js**  
- **Socket.IO**
