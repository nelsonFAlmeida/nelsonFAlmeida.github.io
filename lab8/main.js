const passar = document.querySelector('h1');
const escrever = document.querySelector('#input-bg-color');
const contador = document.querySelector('#contador')
let nome = document.querySelector('#nome').value;
let idade = document.querySelector('#idade').value;

if (!localStorage.getItem('counter')) {
    localStorage.setItem('counter', 0);
}

function naoPassaAqui() {
    passar.textContent = '1. Passa por aqui!';
}

function passaAqui() {
    passar.textContent = 'Obrigado por passares!';
}

function escreverCor() {

    if (escrever.value.length === 0) {
        escrever.style.backgroundColor = 'white';
    } else {
        if (escrever.value.length % 4 === 0) {
            escrever.style.backgroundColor = 'grey';

        }

        if (escrever.value.length % 4 === 1) {
            escrever.style.backgroundColor = 'red';
        }

        if (escrever.value.length % 4 === 2) {
            escrever.style.backgroundColor = 'yellow';

        }

        if (escrever.value.length % 4 === 3) {
            escrever.style.backgroundColor = 'blue';
        }
    }


}

function iterar() {
    let counter = localStorage.getItem('counter');
    counter++;
    document.querySelector('#contador').textContent = counter;
    localStorage.setItem('counter', counter);

}

document.querySelector('h1')
    .addEventListener('mouseout', naoPassaAqui);

document.querySelector('h1')
    .addEventListener('mouseover', passaAqui);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#pintar').forEach(function (button) {
        button.onclick = function () {
            document.querySelector("#pinta-me").style.color = button.dataset.color;
        }
    });
});

escrever
    .addEventListener('input', escreverCor);

document.querySelector('#color-options').onchange = function () {
    document.querySelector('body').style.backgroundColor = this.value;
}

document.querySelector('section.contar button')
    .addEventListener('click', iterar)

document.querySelector('#contador').textContent = localStorage.getItem('counter');

document.querySelector('#form-comentario').onsubmit = (e) => {

    e.preventDefault()
    nome = document.querySelector('#nome').value;
    idade = document.querySelector('#idade').value;
    document.querySelector('#adiciona-aqui').textContent = `Ola, o ${nome} tem ${idade}!`
};

function count() {
    document.querySelector('#contador-auto').textContent++;
}
setInterval(count, 1000);
