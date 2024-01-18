setTimeout(achaPecaMaisAlta, 100);


function verificaPecas() {
    pecas = document.querySelectorAll(".peca-domino");
    console.log(pecas);
}

function achaPecaMaisAlta() {
    let pecaMaisAlta = document.getElementById("66");
    //let pecaComSeis = document.getElementById("46");
    pecaMaisAlta.classList.add("colocavel");
    //pecaComSeis.classList.add("colocavel")
    // pecaMaisAlta.style.position = "fixed";
    // pecaMaisAlta.style.top = "50%";
    // pecaMaisAlta.style.left = "50%";
    // pecaMaisAlta.style.transform = "translate(-50%, -50%)";
    //console.log(pecaMaisAlta)
}


