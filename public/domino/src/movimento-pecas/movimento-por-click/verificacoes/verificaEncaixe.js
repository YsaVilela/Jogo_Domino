function verificaEncaixe(idPeca, ponta) {
  if (!ponta) {
    return false;
  }

  const [idPecaSuperior, idPecaInferior] = idPeca.split("");
  const [idPontaSuperior, idPontaInferior] = ponta.id.split("");

  let idVerdadeiraPonta = null;

  ponta.childNodes.forEach((childNode) => {
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
