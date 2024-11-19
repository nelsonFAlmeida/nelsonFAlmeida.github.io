const mainSection = document.querySelector('main section');
const asideSection = document.querySelector('aside section');

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
    button.addEventListener('click', () => article.remove());
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
        button.addEventListener('click', () => adicionarProdutos(produto));
        article.append(button);

        mainSection.append(article);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
});
