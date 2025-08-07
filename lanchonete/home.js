window.addEventListener("DOMContentLoaded", carregarSite);

function carregarSite() {
  carregarDestaque();
}

function carregarDestaque() {
  const destaque = cardapio.filter((produto) => produto.isDestaque == true);

  const carouselCards = document.getElementById("carouselCards");
  const carouselIndicators = document.getElementById("carouselIndicators");

  let htmlDestaque = "";
  let htmlBtnsCarousel = "";
  destaque.forEach((produto, index) => {
    htmlDestaque += `
     <div class="carousel-item ${index === 0 ? "active" : ""} ">
            <img
              src="${produto.img}"
              class="d-block w-100"
              alt="${produto.nome}"
            />
            <div class="carousel-caption d-none d-md-block">
            <p class="text-black">${produto.valor} R$</p>  
            <p class="text-black">${produto.des}</p>
            </div>
          </div>
    `;
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
    valor: 25.9,
    isDestaque: true,
    img: "https://img77.uenicdn.com/image/upload/v1582164126/business/99def3c9-86a1-4c19-9317-d5376c18c298/hamburguer-shutterstockjpg.jpg",
    des: "Pão de hambúrguer, carne suculenta, queijo, alface, tomate e maionese especial.",
  },
  {
    id: 2,
    nome: "Pizza Margherita (Fatia)",
    valor: 12.5,
    isDestaque: true,
    img: "",
    des: "Massa fina, molho de tomate, queijo muçarela fresco e manjericão.",
  },
  {
    id: 3,
    nome: "Hot Dog Especial",
    valor: 18.0,
    isDestaque: false,
    img: "",
    des: "Salsicha de alta qualidade, pão macio, purê de batata, milho, vinagrete e batata palha.",
  },
  {
    id: 4,
    nome: "Porção de Batata Frita",
    valor: 15.0,
    isDestaque: false,
    img: "",
    des: "Batatas fritas crocantes, com uma pitada de sal. Acompanha maionese temperada.",
  },
  {
    id: 5,
    nome: "Sanduíche Natural",
    valor: 21.0,
    isDestaque: true,
    img: "http://googleusercontent.com/image_collection/image_retrieval/8108445673629063824_0",
    des: "Pão integral, peito de peru, queijo branco, alface, tomate e um toque de azeite.",
  },
  {
    id: 6,
    nome: "Refrigerante em Lata",
    valor: 7.0,
    isDestaque: false,
    img: "",
    des: "Diversos sabores disponíveis (coca-cola, guaraná, etc.).",
  },
  {
    id: 7,
    nome: "Suco Natural",
    valor: 8.5,
    isDestaque: false,
    img: "",
    des: "Sabores frescos do dia: laranja, abacaxi, morango ou limão.",
  },
  {
    id: 8,
    nome: "Água Mineral",
    valor: 5.0,
    isDestaque: false,
    img: "",
    des: "Água mineral sem gás.",
  },
  {
    id: 9,
    nome: "Cerveja Long Neck",
    valor: 11.0,
    isDestaque: false,
    img: "",
    des: "Diversas marcas de cerveja long neck gelada.",
  },
  {
    id: 10,
    nome: "Taco Mexicano",
    valor: 19.9,
    isDestaque: true,
    img: "http://googleusercontent.com/image_collection/image_retrieval/6318216088495087322_0",
    des: "Tortilla de milho crocante recheada com carne moída, queijo, alface e molho apimentado.",
  },
  {
    id: 11,
    nome: "Burrito",
    valor: 22.5,
    isDestaque: false,
    img: "",
    des: "Tortilla de trigo macia recheada com feijão, arroz, queijo, carne e molho de pimenta.",
  },
  {
    id: 12,
    nome: "Nuggets de Frango",
    valor: 16.0,
    isDestaque: false,
    img: "http://googleusercontent.com/image_collection/image_retrieval/15214005770354077383_0",
    des: "Deliciosos pedaços de frango empanados e fritos. Acompanha molho barbecue.",
  },
  {
    id: 13,
    nome: "Pão de Queijo",
    valor: 8.0,
    isDestaque: false,
    img: "http://googleusercontent.com/image_collection/image_retrieval/18115383205368307645_0",
    des: "Porção de pães de queijo frescos e quentinhos. Ideal para um lanche rápido.",
  },
  {
    id: 14,
    nome: "Açaí na Tigela",
    valor: 24.0,
    isDestaque: false,
    img: "http://googleusercontent.com/image_collection/image_retrieval/7688815896908026849_0",
    des: "Açaí cremoso servido com granola, banana e morango. Opção de mel e leite condensado.",
  },
  {
    id: 15,
    nome: "Milkshake de Chocolate",
    valor: 15.0,
    isDestaque: false,
    img: "http://googleusercontent.com/image_collection/image_retrieval/12451145538207099458_0",
    des: "Milkshake cremoso de chocolate com sorvete de baunilha e calda de chocolate.",
  },
  {
    id: 16,
    nome: "Café Expresso",
    valor: 6.0,
    isDestaque: false,
    img: "",
    des: "Café expresso de alta qualidade, servido quente e encorpado.",
  },
  {
    id: 17,
    nome: "Chá Gelado",
    valor: 9.0,
    isDestaque: false,
    img: "",
    des: "Chá gelado de limão e hortelã, perfeito para refrescar.",
  },
  {
    id: 18,
    nome: "Limonada Suíça",
    valor: 10.0,
    isDestaque: false,
    img: "",
    des: "Limonada cremosa e refrescante, batida com limão, gelo e leite condensado.",
  },
];
