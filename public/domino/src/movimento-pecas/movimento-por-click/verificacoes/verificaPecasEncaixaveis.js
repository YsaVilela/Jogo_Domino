function verificaPecasEncaixaveis(tabuleiro) {
  const pecasNaMao = document.querySelectorAll(".peca-domino");
  const pontaEsquerdaTabuleiro = tabuleiro.querySelector(".ponta-esquerda");
  const pontaDireitaTabuleiro = tabuleiro.querySelector(".ponta-direita");

  if (!pontaEsquerdaTabuleiro && !pontaDireitaTabuleiro) {
    console.warn("Não foi possível encontrar peças na ponta do tabuleiro.", pontaEsquerdaTabuleiro, pontaDireitaTabuleiro);
    return;
  }

  pecasNaMao.forEach(function (peca) {
    if (peca.parentNode !== tabuleiro) {

      const podeSerColocada =
        idPartePodeSerColocada(peca, pontaEsquerdaTabuleiro) ||
        idPartePodeSerColocada(peca, pontaDireitaTabuleiro);

      // Adiciona ou remove a classe "colocavel" com base na condição
      if (podeSerColocada) {
        peca.classList.add("colocavel");
      } else {
        peca.classList.remove("colocavel");
      }
    }
  });
}

function idPartePodeSerColocada(peca, pontaTabuleiro) {
  if (!pontaTabuleiro) {
    return false;
  }

  const [idPecaSuperior, idPecaInferior] = peca.id.split("");
  const [idPontaSuperior, idPontaInferior] = pontaTabuleiro.id.split("");


  let idVerdadeiraPonta = null;

  pontaTabuleiro.childNodes.forEach((childNode) => {
    if (childNode.classList.contains("ponta-verdadeira")) {
      idVerdadeiraPonta = childNode.id;
    }
  });

  if (idVerdadeiraPonta) {
    return idPecaSuperior === idVerdadeiraPonta || idPecaInferior === idVerdadeiraPonta;
  } else if (idPecaInferior == idPecaSuperior) {
    return true;
  } else {
    return false;
  }
}



function verificaPonta(peca, pontaTabuleiro) {
  if (!pontaTabuleiro) {
    return false;
  }

  const [idPecaSuperior, idPecaInferior] = peca.id.split("");
  const [idPontaSuperior, idPontaInferior] = pontaTabuleiro.id.split("");


  let idVerdadeiraPonta = null;

  pontaTabuleiro.childNodes.forEach((childNode) => {
    if (childNode.classList.contains("ponta-verdadeira")) {
      idVerdadeiraPonta = childNode.id;
    }
  });

  if (idVerdadeiraPonta) {
    return idPecaSuperior === idVerdadeiraPonta || idPecaInferior === idVerdadeiraPonta;
  } else {
    return true;
  }
}
