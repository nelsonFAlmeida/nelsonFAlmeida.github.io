const mainSection = document.querySelector('main section');
const asideSection = document.querySelector('aside section');
const totalCarrinho = document.querySelector('aside p span');
let lista = [];

if (!localStorage.getItem('lista')) {
    localStorage.setItem('lista',  JSON.stringify(lista));
}

lista = JSON.parse(localStorage.getItem('lista'));

console.log(lista)

function atualizarTotal() {
    let total = 0;
    let array = JSON.parse(localStorage.getItem('lista'))
    array.forEach((produto) => {
        total += produto.price;
    })
    totalCarrinho.textContent = total;
}

function adicionarProdutos(produto) {
    const article = document.createElement('article');

    const title = document.createElement('h3');
    title.textContent = produto.title;
    article.append(title);

    const image = document.createElement('img');
    image.src = produto.image;
    article.append(image);

    const price = document.createElement('p');
    price.textContent = "Custo Total: " + produto.price + " €";
    article.append(price);

    const description = document.createElement('p');
    description.textContent = produto.description;
    article.append(description);

    const button = document.createElement('button');
    button.textContent = "- Remover do carrinho";
    button.addEventListener('click', () => {
        article.remove()
        //remove do local storage
        let array = JSON.parse(localStorage.getItem('lista'))
        const obj = array.findIndex((p) => p.id === produto.id)
        array.splice(obj, 1);
        localStorage.setItem('lista', JSON.stringify(array));
        atualizarTotal()
    });
    article.append(button);

    asideSection.append(article);
}

function carregarProdutos() {
    produtos.forEach(produto => {
        const article = document.createElement('article');

        const title = document.createElement('h3');
        title.textContent = produto.title;
        article.append(title);

        const image = document.createElement('img');
        image.src = produto.image;
        article.append(image);

        const price = document.createElement('p');
        price.textContent = "Custo Total: " + produto.price + " €";
        article.append(price);

        const description = document.createElement('p');
        description.textContent = produto.description;
        article.append(description);

        const button = document.createElement('button');
        button.textContent = "+ Adicionar ao carrinho";
        button.addEventListener('click', () => {
            adicionarProdutos(produto)
            //adiciona no local storage
            let  arr = JSON.parse(localStorage.getItem('lista'))
            arr.push(produto)
            localStorage.setItem('lista', JSON.stringify(arr));
            atualizarTotal()

        });
        article.append(button);

        mainSection.append(article);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    lista.forEach((produto) => {
        adicionarProdutos(produto)
    })
    atualizarTotal()
    
});
