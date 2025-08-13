function cadastro() {
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.find(user => user.email === email);

    if (usuarioExistente) {
        alert("Este email já está em uso. Tente outro.");
        return;
    }

    const novoUsuario = {
        email: email,
        senha: senha 
    };

    usuarios.push(novoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = '/biblioteca/pages/login.html';
}


function logar() {

    const email = document.getElementById('logEmail').value;
    const senha = document.getElementById('logSenha').value;

    if (!email || !senha) {
        alert("Por favor, preencha os campos necessários.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuarioEncontrado) {
        alert(`Login bem-sucedido! Bem-vindo(a)!`);
        window.location.href = '/biblioteca/pages/index.html'; 
    } else {
        alert("Email ou senha incorretos. Tente novamente.");
    }
}