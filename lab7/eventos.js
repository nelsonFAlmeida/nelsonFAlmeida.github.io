const gogh = document.querySelector('.description-gogh')
const munch = document.querySelector('description-munch')

function goghShow() {
    gogh.textContent = "A Noite Estrelada é uma das pinturas mais icônicas de Vincent van Gogh, criada em 1889. A obra retrata um céu noturno turbulento e expressivo, iluminado por estrelas brilhantes e uma lua crescente, com uma vila pacata ao fundo e um grande cipreste ao lado, simbolizando paz e inquietação num único cenário."
}

function munchShow() {
    munch.textContent = "sim"
}



gogh
addEventListener('click',goghShow)

munch
addEventListener('ondbclick',munchShow)