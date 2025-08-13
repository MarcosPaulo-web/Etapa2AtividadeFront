const contLogin = document.querySelector("#login");
const contCadastro = document.querySelector("#cadastro");

window.addEventListener("DOMContentLoaded", carregarLogin());

function carregarLogin() {
  if (localStorage.getItem("tema") == "dark_theme") {
    trocarTema();
  }
  localStorage.removeItem("carrinho");
  console.log(JSON.parse(localStorage.getItem("usuario")) || []);
}

document
  .querySelector("#btnParaCadastro")
  .addEventListener("click", function (event) {
    event.preventDefault();
    contLogin.classList.add("d-none");
    contLogin.classList.remove("d-flex");
    contCadastro.classList.add("d-flex");
    contCadastro.classList.remove("d-none");
  });
document
  .querySelector("#btnParaLogin")
  .addEventListener("click", function (event) {
    event.preventDefault();
    contLogin.classList.add("d-flex");
    contLogin.classList.remove("d-none");
    contCadastro.classList.add("d-none");
    contCadastro.classList.remove("d-flex");
  });

document.querySelector("#btnCadastrar").addEventListener("click", function () {
  const email = document.querySelector("#emailCadastro").value;
  const senha = document.querySelector("#senhaCadastro").value;
  const endereco = document.querySelector("#endereco").value;

  let usuarios = JSON.parse(localStorage.getItem("usuario")) || [];
  if (usuarios.find((user) => user.email == email)) {
    mostrarToast("Usuario já cadastrado");
  } else {
    const usuario = { email, senha, endereco };
    usuarios.push(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuarios));
    mostrarToast("Usuario cadastrado");
  }
});

document.querySelector("#btnLogin").addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;

  let usuarios = JSON.parse(localStorage.getItem("usuario"));

  if (usuarios.find((user) => user.email === email && user.senha === senha)) {
    window.location.href = "../html/home.html";
  } else {
    mostrarToast("Credenciais erradas");
  }
});
