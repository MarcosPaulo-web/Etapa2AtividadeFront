const STORAGE_KEY = "tarefas_v1";
let tarefas = [];
let filtroAtual = "todas";

document.addEventListener("DOMContentLoaded", () => {
  tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  renderizar(filtroAtual);
});

document.getElementById("formTarefa").addEventListener("submit", function (e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const prazo = document.getElementById("data").value;

  const nova = {
    id: Date.now(),
    descricao: descricao,
    prazo: prazo,
    concluida: false,
  };

  tarefas.push(nova);
  salvarTarefas();
  this.reset();
  renderizar(filtroAtual);
});

function salvarTarefas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

// Alterna o estado de conclusão de uma tarefa
function alternarConclusao(id) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
  );
  salvarTarefas();
  renderizar(filtroAtual);
}

// determina se a tarefa está atrasada
function estaAtrasada(tarefa) {
  const hoje = new Date().setHours(0, 0, 0, 0);
  const dataPrazo = new Date(tarefa.prazo + "T00:00:00").getTime();
  return !tarefa.concluida && dataPrazo < hoje;
}
function filtrarTarefas(filtro) {
  let tarefasFiltradas = [];

  if (filtro === "pendentes") {
    tarefasFiltradas = tarefas.filter((t) => !t.concluida);
  } else if (filtro === "atrasadas") {
    tarefasFiltradas = tarefas.filter((t) => estaAtrasada(t));
  } else if (filtro === "concluidas") {
    tarefasFiltradas = tarefas.filter((t) => t.concluida);
  } else {
    tarefasFiltradas = tarefas;
  }

  return tarefasFiltradas.sort((a, b) => {
    if (a.concluida !== b.concluida) {
      return a.concluida ? 1 : -1;
    }
    return new Date(a.prazo) - new Date(b.prazo);
  });
}

function renderizar(filtro) {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  const tarefasFiltradas = filtrarTarefas(filtro);

  if (tarefasFiltradas.length === 0) {
    lista.innerHTML = `<p class="text-center text-muted mt-5">Nenhuma tarefa encontrada.</p>`;
    return;
  }

  tarefasFiltradas.forEach((tarefa) => {
    const cardHtml = criarCardTarefa(tarefa);
    lista.innerHTML += cardHtml;
  });

  adicionarEventListeners();
}

function criarCardTarefa(tarefa) {
  const classeCard = "card mb-3";
  const statusAtrasada = estaAtrasada(tarefa)
    ? `<span class="badge bg-danger">Atrasada</span>`
    : "";
  const statusConcluida = tarefa.concluida
    ? `<span class="badge bg-success">Concluída</span>`
    : "";
  const textoConcluido = tarefa.concluida
    ? "text-decoration: line-through;"
    : "";

  return `
        <div class="${classeCard}" data-id="${tarefa.id}">
            <div class="card-body d-flex flex-column">
                <div class="d-flex align-items-center">
                    <input type="checkbox" class="form-check-input me-2" data-acao="concluir" ${
                      tarefa.concluida ? "checked" : ""
                    }>
                    <span style="${textoConcluido}">${tarefa.descricao}</span>
                </div>
                <div class="mt-2 ms-3 d-flex align-items-center gap-3">
                    <span class="text-muted">${formatarData(
                      tarefa.prazo
                    )}</span>
                    ${statusAtrasada}
                    ${statusConcluida}
                </div>
            </div>
        </div>
    `;
}

function adicionarEventListeners() {
  document.querySelectorAll('[data-acao="concluir"]').forEach((btn) => {
    btn.addEventListener("change", (e) => {
      const card = e.target.closest("[data-id]");
      const id = parseInt(card.getAttribute("data-id"));
      alternarConclusao(id);
    });
  });

  document.getElementById("btnTodas").addEventListener("click", () => {
    filtroAtual = "todas";
    renderizar(filtroAtual);
  });
  document.getElementById("btnPendentes").addEventListener("click", () => {
    filtroAtual = "pendentes";
    renderizar(filtroAtual);
  });
  document.getElementById("btnConcluidas").addEventListener("click", () => {
    filtroAtual = "concluidas";
    renderizar(filtroAtual);
  });
  document.getElementById("btnAtrasadas").addEventListener("click", () => {
    filtroAtual = "atrasadas";
    renderizar(filtroAtual);
  });
}

// Formata a data para o padrão brasileiro
function formatarData(dataStr) {
  const data = new Date(dataStr + "T00:00:00");
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}
