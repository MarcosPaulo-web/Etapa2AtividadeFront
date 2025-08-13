document.addEventListener("DOMContentLoaded", function () {
    const listaEstante = document.getElementById("lista-estante");
    const contador = document.getElementById("contador-livros");
    const searchInput = document.getElementById("searchInput");
    const btnTema = document.getElementById("btnTema");

    let livros = JSON.parse(localStorage.getItem("livros")) || [];
    let estante = JSON.parse(localStorage.getItem("estante")) || [];

    // Modo Escuro
    if (localStorage.getItem("modoEscuro") === "true") {
        document.body.classList.add("modo-escuro");
        btnTema.textContent = "Modo Claro";
    }

    btnTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-escuro");
        const isEscuro = document.body.classList.contains("modo-escuro");
        localStorage.setItem("modoEscuro", isEscuro);
        this.textContent = isEscuro ? "Modo Claro" : "Modo Escuro";
    });

    function atualizarContador() {
        contador.textContent = estante.length;
    }

    function renderizarEstante(filtro = "") {
        listaEstante.innerHTML = "";

        const estanteFiltrada = estante.filter(itemEstante => {
            const livro = livros.find(l => l.id === itemEstante.idLivro);
            if (!livro) return false;

            const termo = filtro.toLowerCase();
            return (
                livro.titulo.toLowerCase().includes(termo) ||
                livro.genero.toLowerCase().includes(termo)
            );
        });

        estanteFiltrada.forEach(itemEstante => {
            const livro = livros.find(l => l.id === itemEstante.idLivro);
            if (!livro) return;

            const col = document.createElement("div");
            col.classList.add("col-md-3", "mb-4");

            col.innerHTML = `
                <div class="card h-100">
                    <img src="${livro.imagem}" 
                         alt="${livro.titulo}" class="card-img-top" style="object-fit: contain; height: 250px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${livro.titulo}</h5>
                        <p class="card-text">${livro.autor}</p>
                        <p class="text-secondary"><small>Gênero: ${livro.genero}</small></p>

                        <div class="form-check mb-2">
                            <input class="form-check-input marcar-lido" type="checkbox" data-id="${livro.id}" id="lido-${livro.id}" ${itemEstante.isLido ? "checked" : ""}>
                            <label class="form-check-label" for="lido-${livro.id}">Lido</label>
                        </div>

                        <button class="btn btn-sm btn-outline-danger mt-auto w-100 remover-estante" data-id="${livro.id}">
                            ❌ Remover
                        </button>
                    </div>
                </div>
            `;
            listaEstante.appendChild(col);
        });

        atualizarContador();
    }

    // Remover livro
    listaEstante.addEventListener("click", function (e) {
        if (e.target.classList.contains("remover-estante")) {
            const id = parseInt(e.target.dataset.id);
            estante = estante.filter(e => e.idLivro !== id);
            livros = livros.filter(l => l.id !== id);

            localStorage.setItem("livros", JSON.stringify(livros));
            localStorage.setItem("estante", JSON.stringify(estante));

            renderizarEstante(searchInput.value);
        }
    });

    // Marcar como lido
    listaEstante.addEventListener("change", function (e) {
        if (e.target.classList.contains("marcar-lido")) {
            const id = parseInt(e.target.dataset.id);
            const livroEstante = estante.find(e => e.idLivro === id);

            if (livroEstante) {
                livroEstante.isLido = e.target.checked;
                localStorage.setItem("estante", JSON.stringify(estante));
            }
        }
    });

    // Filtro
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            renderizarEstante(this.value);
        });
    }

    renderizarEstante();
});
