function addCarrinho(id) {
  const arrayCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const itemExistente = arrayCarrinho.find((prod) => prod.id === id);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    arrayCarrinho.push({
      ...cardapio.find((prod) => prod.id === id),
      quantidade: 1,
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(arrayCarrinho));
  loadCardsCarrinho();
  loadPrecoFinal();
  mostrarToast("Produto adicionado ao carrinho");
}

function showCarrinho() {
  const carrinho = document.querySelector("#container-carrinho");
  carrinho.classList.toggle("closed");
  loadCardsCarrinho();
  loadPrecoFinal();
}

function clearCarrinho() {
  localStorage.clear();
  loadPrecoFinal();
  loadCardsCarrinho();
  mostrarToast("Compra finalizada com sucesso");
}

function loadPrecoFinal() {
  const arrayCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const containerPrecoFinal = document.querySelector(".precoFinal");
  let precoFinal = 0;
  arrayCarrinho.forEach((prod) => (precoFinal += prod.quantidade * prod.valor));
  containerPrecoFinal.innerHTML = `<h2>Valor da compra : ${precoFinal.toFixed(
    2
  )}</h2>`;
}

function loadCardsCarrinho() {
  const cardDeckCarrinho = document.querySelector("#card-deck-carrinho");
  const arrayCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (arrayCarrinho.length === 0) {
    cardDeckCarrinho.innerHTML = "<h1>Sem produtos adicionados</h1>";
    loadPrecoFinal();
    return;
  }
  let listCardsCarrinho = "";
  arrayCarrinho.forEach((prodCar) => {
    listCardsCarrinho += `
    <div class="col-12">
      <div class="card d-flex flex-row" id="card"">
          <img
            src="${prodCar.img}"
            alt="${prodCar.nome}"
          style="max-width: 100px; height: auto; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">${prodCar.nome}</h5>
            <p class="card-text">
              <strong>R$${prodCar.valor}</strong>
            </p>
           <div class="input-group" style="width:130px;">
          <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${prodCar.id}, -1)">-</button>
          
          <input 
            type="number" 
            id="quantidade-${prodCar.id}" 
            value="${prodCar.quantidade}" 
            class="form-control text-center" 
            min="0" 
            max="10" 
            step="1" 
            onchange="atualizarQuantidadeCarrinho(${prodCar.id}, this.value)"
          >
          
          <button class="btn btn-outline-secondary" type="button" onclick="alterarQuantidade(${prodCar.id}, 1)">+</button>
        </div>
          </div>
        </div>
        </div>
`;
  });
  loadPrecoFinal();
  cardDeckCarrinho.innerHTML = listCardsCarrinho;
}
function alterarQuantidade(id, quantidade) {
  const arrayCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const item = arrayCarrinho.find((prod) => prod.id === id);
  const novaQtd = item.quantidade + quantidade;

  if (novaQtd === 0) {
    const index = arrayCarrinho.findIndex((prod) => prod.id === id);
    arrayCarrinho.splice(index, 1);
  }

  if (novaQtd > 10) {
    novaQtd = 10;
  }
  if (novaQtd < 0) {
    novaQtd = 1;
  }

  item.quantidade = novaQtd;

  localStorage.setItem("carrinho", JSON.stringify(arrayCarrinho));
  loadCardsCarrinho();
}
