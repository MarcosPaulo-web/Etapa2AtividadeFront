document.addEventListener("DOMContentLoaded", function () {
    const botoesAdicionar = document.querySelectorAll(".adicionar-estante");

    // Recupera ou cria arrays no localStorage
    let livros = JSON.parse(localStorage.getItem("livros")) || [];
    let estante = JSON.parse(localStorage.getItem("estante")) || [];

    botoesAdicionar.forEach(botao => {
        botao.addEventListener("click", function () {
            const id = parseInt(this.dataset.id);
            const titulo = this.dataset.titulo;
            const autor = this.dataset.autor;
            const genero = this.dataset.genero;

            // Verifica se o livro já está na estante
            const jaExiste = estante.some(item => item.idLivro === id);
            if (jaExiste) {
                alert(`📚 O livro "${titulo}" já está na sua estante.`);
                return;
            }

            // Cria o objeto Livro
            const novoLivro = {
                id: id,
                titulo: titulo,
                autor: autor,
                isEstante: true,
                genero: genero
            };

            // Cria o objeto Estante
            const novoEstante = {
                idLivro: id,
                isLido: false
            };

            // Adiciona nos arrays
            livros.push(novoLivro);
            estante.push(novoEstante);

            // Salva no localStorage
            localStorage.setItem("livros", JSON.stringify(livros));
            localStorage.setItem("estante", JSON.stringify(estante));

            alert(`✅ "${titulo}" foi adicionado à sua estante!`);
        });
    });
});