function defineLadoDeGiroDaPeca(peca, invertido = false) {
  const [parteSuperior, parteInferior] = peca.id.split("");
  const pontaEsquerda = document.querySelector(".ponta-esquerda");
  const pontaDireita = document.querySelector(".ponta-direita");

  const metadeSuperiorPeca = peca.querySelector(".metade-superior");
  const metadeInferiorPEca = peca.querySelector(".metade-inferior");


  if (parteSuperior === "6" && parteInferior === "6") {
    return ""; // Peça "66", não precisa de lado

  } else if (parteSuperior === parteInferior) {
    metadeSuperiorPeca.classList.add("ponta-verdadeira");
    metadeInferiorPEca.classList.add("ponta-verdadeira");
    metadeSuperiorPeca.id = parteSuperior;
    metadeInferiorPEca.id = parteInferior;
    return "normal"; // IDs superior e inferior iguais, não girar

  } else if (verificaEncaixe(parteInferior, pontaEsquerda)) {
    metadeSuperiorPeca.classList.remove("ponta-verdadeira");
    metadeInferiorPEca.classList.remove("ponta-verdadeira");
    if (invertido) {
      metadeInferiorPEca.classList.add("ponta-verdadeira");
      metadeInferiorPEca.id = parteInferior;

      return "girada-inferior";
    }

    metadeSuperiorPeca.classList.add("ponta-verdadeira");
    metadeSuperiorPeca.id = parteSuperior;
    return "girada-inferior"; // IDs inferiores iguais, girar para a direita


  } else if (verificaEncaixe(parteSuperior, pontaEsquerda)) {
    metadeSuperiorPeca.classList.remove("ponta-verdadeira");
    metadeInferiorPEca.classList.remove("ponta-verdadeira");
    if (invertido) {
      metadeSuperiorPeca.classList.add("ponta-verdadeira");
      metadeSuperiorPeca.id = parteSuperior;

      return "girada-superior";
    }

    metadeInferiorPEca.classList.add("ponta-verdadeira");
    metadeInferiorPEca.id = parteInferior;

    return "girada-superior"; // IDs inferiores iguais, girar para a direita


  } else if (verificaEncaixe(parteSuperior, pontaDireita)) {
    metadeSuperiorPeca.classList.remove("ponta-verdadeira");
    metadeInferiorPEca.classList.remove("ponta-verdadeira");
    if (invertido) {
      metadeSuperiorPeca.classList.add("ponta-verdadeira");
      metadeSuperiorPeca.id = parteSuperior;

      return "girada-inferior";
    }

    metadeInferiorPEca.classList.add("ponta-verdadeira");
    metadeInferiorPEca.id = parteInferior;

    return "girada-inferior"; // IDs superiores iguais, girar para a esquerda


  } else if (verificaEncaixe(parteInferior, pontaDireita)) {

    metadeSuperiorPeca.classList.remove("ponta-verdadeira");
    metadeInferiorPEca.classList.remove("ponta-verdadeira");
    if (invertido) {
      metadeInferiorPEca.classList.add("ponta-verdadeira");
      metadeInferiorPEca.id = parteInferior;

      return "girada-superior";
    }

    metadeSuperiorPeca.classList.add("ponta-verdadeira");
    metadeSuperiorPeca.id = parteSuperior;

    return "girada-superior"; // IDs superiores iguais, girar para a esquerda

  } else {
    metadeSuperiorPeca.classList.remove("ponta-verdadeira");
    metadeInferiorPEca.classList.remove("ponta-verdadeira");
    return "normal"; // Outros casos (deverá ajustar conforme necessário)
  }
}
