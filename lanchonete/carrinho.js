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
}

function showCarrinho() {
  const carrinho = document.querySelector("#container-carrinho");
  carrinho.classList.toggle("closed");
  loadCardsCarrinho();
}

function clearCarrinho() {
  localStorage.clear();
  loadCardsCarrinho();
}

function loadCardsCarrinho() {
  const cardDeckCarrinho = document.querySelector("#card-deck-carrinho");
  const arrayCarrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (arrayCarrinho.length === 0) {
    cardDeckCarrinho.innerHTML = "<h1>Sem produtos adicionados</h1>";
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
           <input type="number" name="quantidade" value="${prodCar.quantidade}" class="form-control" min="1" max="10" step="1" value="1" />
          </div>
        </div>
        </div>
`;
  });
  cardDeckCarrinho.innerHTML = listCardsCarrinho;
}
