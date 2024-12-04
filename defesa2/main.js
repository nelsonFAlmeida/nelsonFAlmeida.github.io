const mainSection = document.querySelector('main section');
const asideSection = document.querySelector('#cesto');
const totalCarrinho = document.querySelector('#custo-total');
const search = document.querySelector('#search');
const sort = document.querySelector('#sort');
const filtrar = document.querySelector('#filtrar');
const adicionarTodosAoCarrinhoButton = document.querySelector('#adicionarTodosAoCarrinho');
const carregarProdutosSemDescButton = document.querySelector('#carregarProdutosSemDesc');

let listaProdutos = [];
let listaCategories = [];
let lista = [];

if (!localStorage.getItem('lista')) {
    localStorage.setItem('lista', JSON.stringify(lista));
}
lista = JSON.parse(localStorage.getItem('lista'));

function atualizarTotal() {
    let total = 0;
    const array = JSON.parse(localStorage.getItem('lista'));
    array.forEach((produto) => {
        total += produto.price;
    });
    totalCarrinho.textContent = "Custo Total: " + total.toFixed(2) + " €";
}

function carregarProduto(produto, container, buttonText, buttonCallback) {
    const article = document.createElement('article');

    const title = document.createElement('h3');
    title.textContent = produto.title;
    article.append(title);

    const image = document.createElement('img');
    image.src = produto.image;
    article.append(image);

    const price = document.createElement('p');
    price.textContent = "Preço: " + produto.price + " €";
    article.append(price);

    const description = document.createElement('p');
    description.textContent = produto.description;
    article.append(description);

    const rating = document.createElement('p');
    price.textContent = "Rating: " + produto.rating.rate;
    article.append(rating);

    const button = document.createElement('button');
    button.textContent = buttonText;
    button.addEventListener('click', () => buttonCallback(produto, article));
    article.append(button);

    container.append(article);
}


function carregarProdutoSemDesc(produto, container, buttonText, buttonCallback) {
    const article = document.createElement('article');

    const title = document.createElement('h3');
    title.textContent = produto.title;
    article.append(title);

    const image = document.createElement('img');
    image.src = produto.image;
    article.append(image);

    const price = document.createElement('p');
    price.textContent = "Preço: " + produto.price + " €";
    article.append(price);

    const rating = document.createElement('p');
    price.textContent = "Rating: " + produto.rating.rate;
    article.append(rating);

    const button = document.createElement('button');
    button.textContent = buttonText;
    button.addEventListener('click', () => buttonCallback(produto, article));
    article.append(button);

    container.append(article);
}

function adicionarAoCarrinho(produto) {
    let arr = JSON.parse(localStorage.getItem('lista'));
    arr.push(produto);
    localStorage.setItem('lista', JSON.stringify(arr));
    carregarProduto(produto, asideSection, "- Remover do carrinho", removerDoCarrinho);
    atualizarTotal();
}

function adicionarTodosAoCarrinho() {
    listaProdutos.forEach((produto) =>
        adicionarAoCarrinho(produto)
    );

}

function removerDoCarrinho(produto, article) {
    article.remove();
    let array = JSON.parse(localStorage.getItem('lista'));
    const index = array.findIndex((p) => p.id === produto.id);
    array.splice(index, 1);
    localStorage.setItem('lista', JSON.stringify(array));
    atualizarTotal();
}

function carregarProdutos(lista = listaProdutos) {
    mainSection.innerHTML = "";
    lista.forEach((produto) =>
        carregarProduto(produto, mainSection, "+ Adicionar ao carrinho", adicionarAoCarrinho)
    );
}

function carregarProdutosSemDesc(lista = listaProdutos) {
    mainSection.innerHTML = "";
    listaProdutos.forEach((produto) =>
        carregarProdutoSemDesc(produto, mainSection, "+ Adicionar ao carrinho", adicionarAoCarrinho)
    );
}

function pedirProdutos() {
    fetch('https://deisishop.pythonanywhere.com/products/')
        .then((response) => response.json())
        .then((produtos) => {
            listaProdutos = produtos;
            carregarProdutos();
        })
        .catch((error) => console.error('Erro ao buscar produtos:', error));
}

function pedirCategories() {
    fetch('https://deisishop.pythonanywhere.com/categories/')
        .then((response) => response.json())
        .then((categories) => {
            listaCategories = categories;
            carregarCategorias();
        })
        .catch((error) => console.error('Erro ao buscar categorias:', error));
}

function carregarCategorias() {
    const defaultOption = document.createElement('option');
    defaultOption.value = "all";
    defaultOption.textContent = "Todas as Categorias";
    filtrar.append(defaultOption);

    listaCategories.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtrar.append(option);
    });
}

function filtrarProdutos() {
    const categoriaSelecionada = filtrar.value;
    if (categoriaSelecionada === "all") {
        carregarProdutos(listaProdutos);
    } else {
        const produtosFiltrados = listaProdutos.filter(
            (produto) => produto.category.toString() === categoriaSelecionada
        );
        carregarProdutos(produtosFiltrados);
    }
}

function procurar() {
    const termo = search.value.toLowerCase();
    const listaFiltrada = listaProdutos.filter((produto) =>
        (produto.title.toLowerCase().includes(termo) || produto.description.toLowerCase().includes(termo) )

    );
    carregarProdutos(listaFiltrada);
}

function Ordenar() {
    const valor = sort.value;

    let listaCopia = [...listaProdutos];

    if (valor === "crescente") {
        listaCopia.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (valor === "decrescente") {
        listaCopia.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    carregarProdutos(listaCopia);
}

document.addEventListener('DOMContentLoaded', () => {
    pedirProdutos();
    pedirCategories();
    lista.forEach((produto) =>
        carregarProduto(produto, asideSection, "- Remover do carrinho", removerDoCarrinho)
    );
    atualizarTotal();
});

search.addEventListener('input', procurar);
sort.addEventListener('change', Ordenar);
filtrar.addEventListener('change', filtrarProdutos);
adicionarTodosAoCarrinhoButton.addEventListener('click', adicionarTodosAoCarrinho);
carregarProdutosSemDescButton.addEventListener('click', carregarProdutosSemDesc);

document.querySelector('#comprar').addEventListener('click', () => {
    const total = parseFloat(totalCarrinho.textContent.replace('Custo Total: ', '').replace(' €', ''));
    const descontoEstudante = document.querySelector('#desconto-estudante').checked;

    const cupao = document.querySelector('input[type="text"]').value;
    const name = document.querySelector('input[type="name"]').value;

    const listaProdutos = JSON.parse(localStorage.getItem('lista'));

    if (listaProdutos.length === 0) {
        document.querySelector('#valor-final').textContent = "O carrinho está vazio.";
        document.querySelector('#referencia-pagamento').textContent = "";
        return;
    }

    const body = {
        products: listaProdutos.map((produto) => produto.id),
        student: descontoEstudante,
        coupon: cupao || null,
        name: name || null,
    };

    fetch('https://deisishop.pythonanywhere.com/buy/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao processar a compra');
            }
            return response.json();
        })
        .then((data) => {
            document.querySelector('#valor-final').textContent = `Valor Final: ${data.totalCost} €`;
            document.querySelector('#referencia-pagamento').textContent = `Referência de Pagamento: ${data.reference}`;
            document.querySelector('#message').textContent = `Message: ${data.message}`;
            
        })
        .catch((error) => {
            console.error('Erro:', error);
            document.querySelector('#valor-final').textContent = "Ocorreu um erro ao processar a compra.";
            document.querySelector('#referencia-pagamento').textContent = "";
        });
});
