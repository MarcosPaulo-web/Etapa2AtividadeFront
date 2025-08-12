document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const btnTheme = document.getElementById("btnTema");
  const botoesCor = document.querySelectorAll('input[name="cor_tema"]');

  const THEME_KEY = "tema";
  const COLOR_KEY = "corTema";
  //temas padrão caso não tenha nenhum salvo no LS
  const DEFAULT_THEME = "light";
  const DEFAULT_COLOR = "azul";

  function atualizarBotaoTema(tema) {
    if (!btnTheme) return;
    if (tema === "light") {
      btnTheme.classList.remove("btn-light");
      btnTheme.classList.add("btn-dark");
      btnTheme.textContent = "Alterar tema 🌙";
    } else {
      btnTheme.classList.remove("btn-dark");
      btnTheme.classList.add("btn-light");
      btnTheme.textContent = "Alterar tema ☀️";
    }
  }

  const temaSalvo = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  html.setAttribute("data-bs-theme", temaSalvo);
  atualizarBotaoTema(temaSalvo);

  const corSalva = localStorage.getItem(COLOR_KEY) || DEFAULT_COLOR;
  html.setAttribute("data-btn-color", corSalva);
  const radioPadrao = document.getElementById(corSalva);
  if (radioPadrao) {
    radioPadrao.checked = true;
  }

  if (btnTheme) {
    btnTheme.addEventListener("click", () => {
      const temaAtual = html.getAttribute("data-bs-theme") || DEFAULT_THEME;
      const novoTema = temaAtual === "light" ? "dark" : "light";
      html.setAttribute("data-bs-theme", novoTema);
      localStorage.setItem(THEME_KEY, novoTema);
      atualizarBotaoTema(novoTema);
    });
  }

  botoesCor.forEach((botao) => {
    botao.addEventListener("change", () => {
      if (botao.checked) {
        html.setAttribute("data-btn-color", botao.id);
        localStorage.setItem(COLOR_KEY, botao.id);
      }
    });
  });
});
