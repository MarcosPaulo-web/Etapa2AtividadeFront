document.addEventListener("DOMContentLoaded", function () {

    const btnTema = document.getElementById("btnTema");

    if (localStorage.getItem("modoEscuro") === "true") {
        document.body.classList.add("modo-escuro");
        if (btnTema) btnTema.textContent = "Modo Claro";
    }

    if (btnTema) {
        btnTema.addEventListener("click", function () {
            document.body.classList.toggle("modo-escuro");

            const isEscuro = document.body.classList.contains("modo-escuro");
            localStorage.setItem("modoEscuro", isEscuro);

            this.textContent = isEscuro ? "Modo Claro" : "Modo Escuro";
        });
    }
});
