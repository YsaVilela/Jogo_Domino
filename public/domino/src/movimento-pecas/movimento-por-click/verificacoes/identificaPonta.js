function identificaPonta(peca, pontaEsquerda, pontaDireita) {
  const [idParteSuperiorPeca, idParteInferiorPeca] = peca.id.split("");

  
  
  if (pontaEsquerda) {
    //const [idPontaSuperiorPontaEsquerda, idPontaInferiorPontaEsquerda] = pontaEsquerda.id.split("");
    let idVerdadeiraPonta = null;
    
    pontaEsquerda
    .childNodes.forEach((childNode) => {
      if (childNode.classList.contains("ponta-verdadeira")) {
        idVerdadeiraPonta = childNode.id;
      }
    });

    if ((idParteInferiorPeca === idVerdadeiraPonta) || (idParteSuperiorPeca === idVerdadeiraPonta)) {
      return pontaEsquerda;
    }
  }

  // Se não encontrou compatibilidade com a ponta esquerda, verifica com a ponta direita
  if (pontaDireita) {
    //const [idPontaSuperiorPontaDireita, idPontaInferiorPontaDireita] = pontaDireita.id.split("");
    let idVerdadeiraPonta = null;
    
    pontaDireita
    .childNodes.forEach((childNode) => {
      if (childNode.classList.contains("ponta-verdadeira")) {
        idVerdadeiraPonta = childNode.id;
      }
    });


    if ((idParteSuperiorPeca === idVerdadeiraPonta) || (idParteInferiorPeca === idVerdadeiraPonta)) {
      return pontaDireita;
    }
  }

  // Retorna null se não houver compatibilidade com nenhuma ponta
  return null;
}
