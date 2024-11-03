// Seletores de elementos
const titulo = document.getElementById('titulo');
const imagemArte = document.getElementById('imagem-arte');
const instrucao = document.getElementById('instrucao');
const formComentario = document.getElementById('form-comentario');
const comentarioInput = document.getElementById('comentario');
const respostaFormulario = document.getElementById('resposta-formulario');
const contadorTeclas = document.getElementById('contador-teclas');

let contagemTeclas = 0;

// Eventos de Rato

// Click - altera o texto do título
titulo.addEventListener('click', () => {
    titulo.textContent = 'Você clicou no título da galeria!';
});

// Double Click - altera a cor de fundo da imagem
imagemArte.addEventListener('dblclick', () => {
    imagemArte.style.backgroundColor = imagemArte.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
});

// Mouseover - altera o texto da instrução
imagemArte.addEventListener('mouseover', () => {
    instrucao.textContent = 'Ótima escolha! Clique para ver algo especial.';
});

// Mouseout - retorna o texto original da instrução
imagemArte.addEventListener('mouseout', () => {
    instrucao.textContent = 'Passe o mouse sobre a imagem ou clique para interagir';
});

// Mousemove - exibe a posição do mouse sobre a imagem
imagemArte.addEventListener('mousemove', (event) => {
    instrucao.textContent = `Posição do mouse: X=${event.offsetX}, Y=${event.offsetY}`;
});

// Eventos de Teclado

// Keydown - incrementa a contagem de teclas pressionadas
document.addEventListener('keydown', () => {
    contagemTeclas++;
    contadorTeclas.textContent = contagemTeclas;
});

// Keyup - exibe uma mensagem ao soltar uma tecla específica
document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        instrucao.textContent = 'Soltou a tecla Enter!';
    }
});

// Eventos de Formulário

// Change - altera a cor do fundo do input ao começar a escrever
comentarioInput.addEventListener('change', () => {
    comentarioInput.style.backgroundColor = 'lightyellow';
});

// Submit - exibe uma mensagem de agradecimento ao submeter o formulário
formComentario.addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o envio do formulário
    respostaFormulario.innerHTML = `<strong>Obrigado pelo seu comentário!</strong>`;
});
