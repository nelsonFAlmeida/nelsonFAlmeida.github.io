var contar = 0;
const passar = document.querySelector('h1');
const pintar = document.querySelector('section.pintar p');
const escrever = document.querySelector('#input-bg-color');
const corpo = document.querySelector('Body');
const bgcor = document.querySelector('#bg-color');
const contador = document.querySelector('#contador')

function naoPassaAqui() {
    passar.textContent = '1. Passa por aqui!';
}

function passaAqui() {
    passar.textContent = 'Obrigado por passares!';
}

function pintarRed() {
    pintar.style.color = 'red';
}

function pintarGreen() {
    pintar.style.color = 'green';
}

function pintarBlue() {
    pintar.style.color = 'blue';
}

function escreverCor() {

    if (escrever.value.length === 0) {
        escrever.style.backgroundColor= 'white';
    } else {
        if (escrever.value.length % 4 === 0) {
            escrever.style.backgroundColor= 'grey';
    
        } 
    
        if (escrever.value.length % 4 === 1) {
            escrever.style.backgroundColor= 'red';
        } 
    
        if (escrever.value.length % 4 === 2) {
            escrever.style.backgroundColor= 'yellow';
    
        } 
    
        if (escrever.value.length % 4 === 3) {
            escrever.style.backgroundColor= 'blue';
        }     
    }
    

}

function backgroundCor() {
    let a = bgcor.value
    corpo.style.backgroundColor = a
}

function iterar() {
    contar ++
    contador.textContent = contar;


}



document.querySelector('h1')
.addEventListener('mouseout',naoPassaAqui);

document.querySelector('h1')
.addEventListener('mouseover',passaAqui);

document.querySelector('#red')
.addEventListener('click',pintarRed);

document.querySelector('#green')
.addEventListener('click',pintarGreen);

document.querySelector('#blue')
.addEventListener('click',pintarBlue);

escrever
.addEventListener('input',escreverCor);

document.querySelector('section.cor button')
.addEventListener('click',backgroundCor)

document.querySelector('section.contar button')
.addEventListener('click',iterar)

