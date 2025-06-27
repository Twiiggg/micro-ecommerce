// func pra criar e retornar um elemento HTML representando um produto
function newBook(book) {
    //cria uma div para o livro e adiciona a slasse de colia
    const div = document.createElement('div');
    div.className = 'column is-4';

    // Define o conteudo HTML interno da div com os dados do livro
    div.innerHTML = `
        <div class="card is-shady">
            <div class="card-image">
                <figure class="image is 4by3">
                <img
                    src="${book.photo}" // imagem do produto
                    alt="${book.name}" // texto alt do produto
                    class="modal-button"
                    />
                    </figure>
            </div>
            <div class="card-content">
                <div class="content book" data-id"${book.id}"> //armazena o id do livro
                    <div class="book-meta">
                        <p class="is-size-4" R$${book.price.toFixed(2)} </p> //Preço formatado
                        <p class="is-size-6"> Disponível em estoque: 5</p> //Quantia ficticia
                        <h4 class="is-size-3 title>${book.name}</h4> //nome do produto
                        <p class="subtitle">${book.author} </p> //autor
                    </div>
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input" type="text" placeholder="Digite o CEP" />
                        </div>
                        <div class="control">
                        <a class="button button-shipping is-info" data-id="${book.id}>      Calcular o frete </a>
                        </div>
                    </div>
                <button class="button button-buy is-success is-fullwidth">Comprar</button>
                </div>
            </div>
        </div>`;

        //retorna o elemento montado
        return div;     
}

// func para calcular o frete com base no id do livro e do CEP
function calculateShipping(id, cep) {
    fetch('http://localhost:3000/shipping' +cep) // Faz requst para a API de Frete
    .then((data) => {
        if(data.ok) {
            return data.json(); //converte a resposta para JSON se estiver ok
        }
        throw data.statusText; // caso contrario, lança erro
    })
    .then((data) => {
        // mostra o valor do frete
        sawl('Frete', `O frete é: R$${data.value.toFixed(2)}`, "success");
    })
    .catch((err) => {
        //Mostra erro se o resquest falhar
        sawl('Erro', 'Erro ao calcular o frete', 'error');
        console.error(err);
    })
}

//Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    const books = document.querySelector('.books'); // seleciona o container onde os livros serão exibidos

    // busca os produtos (livros) doservidor 
    fetch('http://localhost:3000/products')
    .then((data) => {
        if (data.ok) {
            return data.json(); // converte a resposta para JSON se estiver ok
        }
        throw data.statusText;
    })
    .then((data) => {
        if (data) {
            // para cada livro, cria e add o element ao container
            data.forEach((book) => {
                books.appendChild(newBook(book))
            });

            // add evento de clique aos botoes de calcular frete
            document.querySelectorAll('.button-shipping').forEach((btn) => {
                btn.addEventListener('click' , (e) => {
                    const id = e.target.getAttribute('data-id'); //pega a id do livro
                    const cep = document.querySelector(`book[data-id="${id}"] input`).value;// pega o cep digitado
                    calculateShipping(id, cep); //chama a função de frete
                });
            });

            // adiciona evento de clique aos botões de compra
            document.querySelectorAll('.button-buy').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    swal('Compra de livro', 'sua compra foi realizda com suesso', 'success');
                })
            });
        }
    })
    .catch((err) => {
        // em caso de erro ao careggar os produtos
        sawl('Erro', 'Erro ao listar os produtos', 'error');
        console.error(err);
    });
});