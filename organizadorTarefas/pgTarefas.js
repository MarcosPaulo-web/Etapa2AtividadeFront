const STORAGE_KEY = "tarefas_v1";
let tarefas = [];

// Ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  tarefas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  renderizar();
});

// Adiciona tarefa
document.getElementById("formTarefa").addEventListener("submit", function (e) {
  e.preventDefault();
  const descricao = document.getElementById("descricao").value;
  const prazo = document.getElementById("data").value;


  const nova = {
    id: Date.now(), 
    descricao: descricao,
    prazo: prazo,
    concluida: false
  };

  tarefas.push(nova);
  salvarTarefas();
  renderizar();
  this.reset();
});

// Salva no localStorage
function salvarTarefas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

// Alterna se está concluída
function alternarConclusao(id) {
  tarefas = tarefas.map(tarefa =>
    tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
  );
  salvarTarefas();
  renderizar();
}

// Filtra as tarefas
function filtrarTarefas(filtro) {
  const hoje = new Date();
  if (filtro === "concluidas") {
    return tarefas.filter(t => t.concluida);
  } else if (filtro === "pendentes") {
    return tarefas.filter(t => !t.concluida && new Date(t.prazo) >= hoje);
  } else if (filtro === "atrasadas") {
    return tarefas.filter(t => !t.concluida && new Date(t.prazo) < hoje);
  }
  return tarefas;
}

// Renderiza a lista
function renderizar(filtro = "todas") {
  const lista = document.getElementById("lista-tarefas");
  lista.innerHTML = "";

  let tarefasFiltradas = filtrarTarefas(filtro).sort((a, b) => {
    return new Date(a.prazo) - new Date(b.prazo);
  });

  tarefasFiltradas.forEach(tarefa => {
    const card = document.createElement("div");
    card.className = "card shadow-sm mb-3";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column";

    // Linha com checkbox e descrição
    const linha = document.createElement("div");
    linha.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => alternarConclusao(tarefa.id));

    const descricao = document.createElement("span");
    descricao.textContent = tarefa.descricao;
    if (tarefa.concluida) {
      descricao.style.textDecoration = "line-through";
    }

    linha.appendChild(checkbox);
    linha.appendChild(descricao);

    // Data e status
    const info = document.createElement("div");
    info.className = "mt-2 ms-3 d-flex align-items-center gap-3";

    const prazo = document.createElement("span");
    prazo.textContent = formatarData(tarefa.prazo);
    prazo.className = "text-muted";

    info.appendChild(prazo);

    if (!tarefa.concluida && new Date(tarefa.prazo) < new Date()) {
      const status = document.createElement("span");
      status.textContent = "Atrasada";
      status.className = "badge bg-danger";
      info.appendChild(status);
    } else if (tarefa.concluida) {
      const status = document.createElement("span");
      status.textContent = "Concluída";
      status.className = "badge bg-success";
      info.appendChild(status);
    }

    cardBody.appendChild(linha);
    cardBody.appendChild(info);
    card.appendChild(cardBody);
    lista.appendChild(card);
  });
}

function formatarData(dataStr) {
  const data = new Date(dataStr + "T00:00:00");
  return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

// Eventos dos filtros
document.getElementById("btnTodas").addEventListener("click", () => renderizar("todas"));
document.getElementById("btnPendentes").addEventListener("click", () => renderizar("pendentes"));
document.getElementById("btnConcluidas").addEventListener("click", () => renderizar("concluidas"));
document.getElementById("btnAtrasadas").addEventListener("click", () => renderizar("atrasadas"));
