function trocarTema() {
  const allWarningColor = document.querySelectorAll(".bg-warning, .bg-black");

  allWarningColor.forEach((elemento) => {
    elemento.classList.toggle("bg-warning");
    elemento.classList.toggle("bg-black");
  });

  const allLightColor = document.querySelectorAll(".bg-light, .bg-dark");
  allLightColor.forEach((elemento) => {
    elemento.classList.toggle("bg-light");
    elemento.classList.toggle("bg-dark");
    elemento.classList.toggle("text-light");

    if (elemento.classList.contains("card")) {
      elemento.classList.toggle("border-warning");
    }
  });
  const btnTheme = document.querySelector("#btnTheme");
  const iconBtn = document.querySelector("#icon");
  const btnPerfil = document.querySelector("#btnPerfil");

  btnPerfil.classList.toggle("btn-outline-dark");
  btnPerfil.classList.toggle("btn-outline-light");

  btnTheme.classList.toggle("dark_theme");
  btnTheme.classList.toggle("light_theme");

  iconBtn.classList.toggle("bi-moon");
  iconBtn.classList.toggle("bi-brightness-high");

  if (btnTheme.classList.contains("dark_theme")) {
    localStorage.setItem("tema", "light_theme");
    btnTheme.classList.add("btn-outline-dark");
    btnTheme.classList.remove("btn-outline-light");
  } else {
    //tema escuro
    localStorage.setItem("tema", "dark_theme");
    btnTheme.classList.remove("btn-outline-dark");
    btnTheme.classList.add("btn-outline-light");
  }

  const carrinho = document.querySelector(".btn-outline-success,.btn-light");

  carrinho.classList.toggle("btn-outline-success");
  carrinho.classList.toggle("btn-light");
}
