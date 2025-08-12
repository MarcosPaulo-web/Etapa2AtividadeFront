document.addEventListener("DOMContentLoaded", function () {
    const botoesAdicionar = document.querySelectorAll(".adicionar-estante");

    // Recupera arrays existentes no localStorage ou cria vazios
    let livros = JSON.parse(localStorage.getItem("livros")) || [];
    let estante = JSON.parse(localStorage.getItem("estante")) || [];

    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            const titulo = this.dataset.titulo;
            const autor = this.dataset.autor;
            const genero = this.dataset.genero;
            const imagem = this.dataset.imagem;

            // Verifica se o livro já está na estante
            const jaExiste = estante.some(item => item.idLivro === id);
            if (jaExiste) {
                alert(`📚 O livro "${titulo}" já está na sua estante.`);
                return;
            }

            // Objetos
            const novoLivro = {
                id: id,
                titulo: titulo,
                autor: autor,
                genero: genero,
                imagem: imagem
            };

            const novoEstante = {
                idLivro: id,
                isLido: false
            };

            // Adiciona no array
            livros.push(novoLivro);
            estante.push(novoEstante);

            // Salva no localStorage
            localStorage.setItem("livros", JSON.stringify(livros));
            localStorage.setItem("estante", JSON.stringify(estante));

            alert(`✅ "${titulo}" foi adicionado à sua estante!`);
        });
    });

    // Filtro de pesquisa
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const term = this.value.toLowerCase();
            cards.forEach(card => {
                const title = card.querySelector(".card-title").textContent.toLowerCase();
                const genre = card.querySelector(".text-secondary").textContent.toLowerCase();

                if (title.includes(term) || genre.includes(term)) {
                    card.parentElement.classList.remove("d-none"); // mostra mantendo layout
                } else {
                    card.parentElement.classList.add("d-none"); // esconde sem quebrar layout
                }
            });
        });
    }
});