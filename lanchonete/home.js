window.addEventListener("DOMContentLoaded", carregarSite);

function carregarSite() {
  carregarDestaque();
  listCardapio();
  if (localStorage.getItem("tema") == "dark_theme") {
    trocarTema();
  }
}

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

  btnTheme.classList.toggle("dark_theme");
  btnTheme.classList.toggle("light_theme");

  if (btnTheme.classList.contains("dark_theme")) {
    localStorage.setItem("tema", "light_theme");
    btnTheme.classList.add("btn-outline-dark");
    btnTheme.classList.remove("btn-outline-light");
    btnTheme.textContent = "Modo Escuro";
  } else {
    //tema escuro
    localStorage.setItem("tema", "dark_theme");
    btnTheme.classList.remove("btn-outline-dark");
    btnTheme.classList.add("btn-outline-light");
    btnTheme.textContent = "Modo Claro";
  }

  const carrinho = document.querySelector(".btn-outline-success,.btn-light");

  carrinho.classList.toggle("btn-outline-success");
  carrinho.classList.toggle("btn-light");
}

function mostrarToast(text) {
  const toast = new bootstrap.Toast(document.getElementById("meuToast"));
  document.querySelector(".toast-body").innerHTML = text;
  toast.show();
}

function listCardapio() {
  const cardDeck = document.querySelector("#card-deck-cardapio");
  let listCards = "";
  cardapio.forEach((produto) => {
    listCards += `
    <div class="col-12 col-md-5">
      <div class="card bg-light d-flex flex-row" id="card"">
          <img
            src="${produto.img}"
            alt="${produto.nome}"
          style="max-width: 100px; height: auto; object-fit: cover;"
          />
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">
              <strong>R$${produto.valor}</strong>
            </p>
            <button class="btn btn-warning" onclick="addCarrinho(${produto.id})">adicionar ao pedido</button>
          </div>
        </div>
        </div>
`;
  });
  cardDeck.innerHTML = listCards;
}

function carregarDestaque() {
  const destaque = cardapio.filter((produto) => produto.isDestaque == true);

  const carouselCards = document.getElementById("carouselCards");
  const carouselIndicators = document.getElementById("carouselIndicators");

  let htmlDestaque = "";
  let htmlBtnsCarousel = "";
  destaque.forEach((produto, index) => {
    // a parte dos cards das imagens
    htmlDestaque += `
     <div " id="cardCarousel" class="carousel-item ${
       index === 0 ? "active" : ""
     } ">
            <img
              src="${produto.img}"
              class="d-block w-100"
              alt="${produto.nome}"
            />
            <div id="CardText" class="carousel-caption d-block">
            <p class="text-white">${produto.valor.toFixed(2)} R$</p>  
            <p class="text-white">${produto.des}</p>
            </div>
          </div>
    `;
    // btns que ficam em baixo para mostrar em qual posição de todos os destaques estamos
    htmlBtnsCarousel += `
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="${index}"
        ${index === 0 ? 'class="active" aria-current="true"' : ""}
        aria-label="Slide ${index + 1}"
      ></button>
    `;
  });
  carouselCards.innerHTML = htmlDestaque || "<h1>sem destaque</h1>";
  carouselIndicators.innerHTML = htmlBtnsCarousel;
}

const cardapio = [
  {
    id: 1,
    nome: "Hambúrguer Clássico",
    valor: 25.99,
    isDestaque: true,
    img: "https://img77.uenicdn.com/image/upload/v1582164126/business/99def3c9-86a1-4c19-9317-d5376c18c298/hamburguer-shutterstockjpg.jpg",
    des: "Pão de hambúrguer, carne suculenta, queijo, alface, tomate e maionese especial.",
  },
  {
    id: 2,
    nome: "Pizza Margherita (Fatia)",
    valor: 12.5,
    isDestaque: true,
    img: "https://thumbs.dreamstime.com/b/fatia-de-pizza-de-margherita-italian-com-manjeric%C3%A3o-77555059.jpg",
    des: "Massa fina, molho de tomate, queijo muçarela fresco e manjericão.",
  },
  {
    id: 3,
    nome: "Hot Dog Especial",
    valor: 18.0,
    isDestaque: false,
    img: "https://www.minhareceita.com.br/app/uploads/2023/03/cachorro-quente-maneiras-de-preparar.jpg",
    des: "Salsicha de alta qualidade, pão macio, purê de batata, milho, vinagrete e batata palha.",
  },
  {
    id: 4,
    nome: "Porção de Batata Frita",
    valor: 15.0,
    isDestaque: false,
    img: "https://static.wixstatic.com/media/a037bb_95c9809d8f2a466784365ba9acfa698e~mv2.jpg/v1/fill/w_480,h_406,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a037bb_95c9809d8f2a466784365ba9acfa698e~mv2.jpg",
    des: "Batatas fritas crocantes, com uma pitada de sal. Acompanha maionese temperada.",
  },
  {
    id: 5,
    nome: "Sanduíche Natural",
    valor: 21.0,
    isDestaque: true,
    img: "https://compactaprint.com.br/wp-content/uploads/2024/11/Sanduiche-Natural-para-Vender.jpg",
    des: "Pão integral, peito de peru, queijo branco, alface, tomate e um toque de azeite.",
  },
  {
    id: 6,
    nome: "Refrigerante em Lata",
    valor: 7.0,
    isDestaque: false,
    img: "https://static-images.ifood.com.br/pratos/777cb163-48d6-475e-877e-6af0b551cb49/202101131343_cZgm_.jpeg",
    des: "Diversos sabores disponíveis (coca-cola, guaraná, etc.).",
  },
  {
    id: 7,
    nome: "Suco Natural",
    valor: 8.5,
    isDestaque: false,
    img: "https://agristar.com.br/upload/blog/original/dicas-de-sucos-naturais-para-refrescar-os-dias-mais-quentes-do-ano--17-12-2024-10-30-00-9726.jpg",
    des: "Sabores frescos do dia: laranja, abacaxi, morango ou limão.",
  },
  {
    id: 8,
    nome: "Água Mineral",
    valor: 5.0,
    isDestaque: false,
    img: "https://fontagua.com.br/wp-content/uploads/2019/02/splash_15l.jpg",
    des: "Água mineral sem gás.",
  },
  {
    id: 9,
    nome: "Cerveja Long Neck",
    valor: 11.0,
    isDestaque: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR5ypXiq2t1t4puEOUvv-OoQwOupsNKmbLXg&s",
    des: "Diversas marcas de cerveja long neck gelada.",
  },
  {
    id: 10,
    nome: "Taco Mexicano",
    valor: 19.99,
    isDestaque: false,
    img: "https://www.restodonte.com.br/recipePics/9900837.jpg?vn124",
    des: "Tortilla de milho crocante recheada com carne moída, queijo, alface e molho apimentado.",
  },
  {
    id: 11,
    nome: "Burrito",
    valor: 22.5,
    isDestaque: false,
    img: "https://sabores-new.s3.amazonaws.com/public/2024/11/burrito-de-frango.jpg",
    des: "Tortilla de trigo macia recheada com feijão, arroz, queijo, carne e molho de pimenta.",
  },
  {
    id: 12,
    nome: "Nuggets de Frango",
    valor: 16.0,
    isDestaque: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaFVbpVALqfgNUCsQQ9L0OekXMzX54l1NGoQ&s",
    des: "Deliciosos pedaços de frango empanados e fritos. Acompanha molho barbecue.",
  },
  {
    id: 13,
    nome: "Pão de Queijo",
    valor: 8.0,
    isDestaque: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMtl4VgO0dAXk_0dNvaud7li5u5Hy0AWrfg&s",
    des: "Porção de pães de queijo frescos e quentinhos. Ideal para um lanche rápido.",
  },
  {
    id: 14,
    nome: "Açaí na Tigela",
    valor: 24.0,
    isDestaque: false,
    img: "https://www.receitas-sem-fronteiras.com/media/4c4929j4tqnyjiayrx9lw6kb6_crop.jpg/rh/acai-na-tigela.jpg",
    des: "Açaí cremoso servido com granola, banana e morango. Opção de mel e leite condensado.",
  },
  {
    id: 15,
    nome: "Milkshake de Chocolate",
    valor: 15.0,
    isDestaque: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdp9k3erwyJfriBoxoRfMbzMlNmI1ln9FClA&s",
    des: "Milkshake cremoso de chocolate com sorvete de baunilha e calda de chocolate.",
  },
  {
    id: 16,
    nome: "Café Expresso",
    valor: 6.0,
    isDestaque: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhDzPyid6zu6iA5Kp-jsdGhQQQDZgJ0Zy2g&s",
    des: "Café expresso de alta qualidade, servido quente e encorpado.",
  },
  {
    id: 17,
    nome: "Chá Gelado",
    valor: 9.0,
    isDestaque: false,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThe6-rfjfI816C0mfiatT_OIlNRXFMflmKjQ&s",
    des: "Chá gelado de limão e hortelã, perfeito para refrescar.",
  },
  {
    id: 18,
    nome: "Limonada Suíça",
    valor: 10.0,
    isDestaque: false,
    img: "https://guiadacozinha.com.br/wp-content/uploads/2018/04/limonada-suica-768x619.jpg",
    des: "Limonada cremosa e refrescante, batida com limão, gelo e leite condensado.",
  },
];
