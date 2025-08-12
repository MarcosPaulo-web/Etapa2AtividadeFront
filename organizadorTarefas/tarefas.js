document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "tarefas_v1";
  const form = document.getElementById("formTarefa");
  const inputDescricao = document.getElementById("descricao");
  const inputPrazo = document.getElementById("data");
  const lista = document.getElementById("lista-tarefas");
  const btnFiltroTudo = document.getElementById("filtro-todas");
  const btnFiltroPendente = document.getElementById("filtro-pendentes");
  const btnFiltroAtrasadas = document.getElementById("filtro-atrasadas");
  const btnFiltroconcluida = document.getElementById("filtro-concluidas");

  let tarefas = [];
  let filtroAtual = "todas";

  function carregarTarefas() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Erro ao parsear tarefas do localStorage:", e);
      return [];
    }
  }

  function salvarTarefas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  }

  function gerarId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function formatarData(isoDate) {
    if (!isoDate) return "";
    const d = new Date(isoDate + "T00:00:00");
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const estaAtrasada = (t) =>
    !t.concluida &&
    t.prazo &&
    new Date(t.prazo) < new Date().setHours(0, 0, 0, 0);

  function adicionarTarefa(descricao, prazo) {
    const nova = {
      id: gerarId(),
      descricao: descricao,
      prazo: prazo,
      concluida: false,
    };
    tarefas.push(nova);
    salvarTarefas();
    renderizar();
  }

  function removerTarefa(id) {
    tarefas = tarefas.filter((t) => t.id !== id);
    salvarTarefas();
    renderizar();
  }

  function alternarConclusao(id) {
    const item = tarefas.find((t) => t.id === id);
    if (!item) return;
    item.concluida = !item.concluida;
    salvarTarefas();
    renderizar();
  }

  function ordenarTarefas(arr, filtro) {
    arr.sort((a, b) => {
      if (filtro === "todas" && a.concluida !== b.concluida) {
        return a.concluida ? 1 : -1;
      }
      const da = new Date(a.prazo + "T00:00:00");
      const db = new Date(b.prazo + "T00:00:00");
      return da - db;
    });
  }

  function filtrarTarefas(filtro) {
    if (filtro === "todas") {
      return tarefas.slice();
    } else if (filtro === "pendentes") {
      return tarefas.filter((t) => !t.concluida);
    } else if (filtro === "concluidas") {
      return tarefas.filter((t) => t.concluida);
    } else if (filtro === "atrasadas") {
      return tarefas.filter((t) => estaAtrasada(t));
    }
    return tarefas.slice();
  }

  function svgCalendar() {
    return `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-1">
        <path d="M3 2.5h1v1h8v-1h1A1.5 1.5 0 0 1 15.5 4v9A1.5 1.5 0 0 1 14 14.5H2A1.5 1.5 0 0 1 .5 13V4A1.5 1.5 0 0 1 2 2.5h1z" stroke="currentColor" stroke-width="0.9" fill="none"/>
      </svg>`;
  }

  function svgCheckCircle() {
    return `
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.2" fill="none" />
        <path d="M5.2 8.1l1.2 1 3-3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

  function svgTrash() {
    return `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ms-2">
        <path d="M3 6h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M10 3h4l1 3H9l1-3z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }

  function renderizar() {
    lista.innerHTML = "";

    const arr = filtrarTarefas(filtroAtual);
    ordenarTarefas(arr, filtroAtual);

    arr.forEach((t) => {
      const card = document.createElement("div");
      card.className = "tarefa-card mb-3";
      if (t.concluida) card.classList.add("tarefa-concluida");

      const row = document.createElement("div");
      row.className = "d-flex align-items-center justify-content-between";

      const left = document.createElement("div");
      left.className = "d-flex align-items-start";

      const btnCheck = document.createElement("button");
      btnCheck.type = "button";
      btnCheck.className = "btn btn-outline-secondary btn-check-tarefa me-3";
      btnCheck.innerHTML = svgCheckCircle();
      btnCheck.setAttribute(
        "aria-label",
        t.concluida ? "Marcar como pendente" : "Marcar como concluída"
      );
      btnCheck.addEventListener("click", () => alternarConclusao(t.id));

      const content = document.createElement("div");
      content.style.minWidth = "0";

      const desc = document.createElement("div");
      desc.className = "descricao";
      desc.textContent = t.descricao;

      const meta = document.createElement("div");
      meta.className = "mt-2 d-flex align-items-center";

      const dataSpan = document.createElement("div");
      dataSpan.className = "data-prazo text-muted d-flex align-items-center";
      dataSpan.innerHTML =
        svgCalendar() + `<small>${formatarData(t.prazo)}</small>`;
      meta.appendChild(dataSpan);

      if (estaAtrasada(t)) {
        const badge = document.createElement("span");
        badge.className = "badge bg-danger ms-3 badge-atrasada";
        badge.textContent = "Atrasado";
        meta.appendChild(badge);
      }

      content.appendChild(desc);
      content.appendChild(meta);
      left.appendChild(btnCheck);
      left.appendChild(content);

      const right = document.createElement("div");
      right.className = "tarefa-actions d-flex align-items-center";

      const btnDelete = document.createElement("button");
      btnDelete.type = "button";
      btnDelete.className = "btn btn-link text-danger";
      btnDelete.title = "Excluir tarefa";
      btnDelete.innerHTML = svgTrash();
      btnDelete.addEventListener("click", () => {
        if (confirm("Excluir esta tarefa?")) {
          removerTarefa(t.id);
        }
      });

      right.appendChild(btnDelete);

      row.appendChild(left);
      row.appendChild(right);
      card.appendChild(row);

      lista.appendChild(card);
    });

    atualizarBotoesFiltro();
  }

  function atualizarBotoesFiltro() {
    [
      btnFiltroTudo,
      btnFiltroPendente,
      btnFiltroconcluida,
      btnFiltroAtrasadas,
    ].forEach((btn) => {
      if (!btn) return;
      btn.classList.remove("active");
    });

    if (filtroAtual === "todas" && btnFiltroTudo)
      btnFiltroTudo.classList.add("active");
    if (filtroAtual === "pendentes" && btnFiltroPendente)
      btnFiltroPendente.classList.add("active");
    if (filtroAtual === "concluidas" && btnFiltroconcluida)
      btnFiltroconcluida.classList.add("active");
    if (filtroAtual === "atrasadas" && btnFiltroAtrasadas)
      btnFiltroAtrasadas.classList.add("active");
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const desc = inputDescricao.value || "";
      const prazo = inputPrazo.value || "";
      if (!desc.trim()) {
        alert("Digite a descrição da tarefa.");
        return;
      }
      if (!prazo) {
        alert("Escolha a data de prazo.");
        return;
      }
      adicionarTarefa(desc, prazo);
      inputDescricao.value = "";
      inputPrazo.value = "";
      inputDescricao.focus();
    });
  }

  if (btnFiltroTudo) {
    btnFiltroTudo.addEventListener("click", () => {
      filtroAtual = "todas";
      renderizar();
    });
  }
  if (btnFiltroPendente) {
    btnFiltroPendente.addEventListener("click", () => {
      filtroAtual = "pendentes";
      renderizar();
    });
  }
  if (btnFiltroconcluida) {
    btnFiltroconcluida.addEventListener("click", () => {
      filtroAtual = "concluidas";
      renderizar();
    });
  }
  if (btnFiltroAtrasadas) {
    btnFiltroAtrasadas.addEventListener("click", () => {
      filtroAtual = "atrasadas";
      renderizar();
    });
  }

  tarefas = carregarTarefas();
  renderizar();
});
