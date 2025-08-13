document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nomeCliente').value;
            const email = document.getElementById('emailCliente').value;
            const senha = document.getElementById('senhaCliente').value;
            
            const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];

            const usuarioExistente = usuariosCadastrados.find(user => user.email === email);
            if (usuarioExistente) {
                alert('Este e-mail já está cadastrado. Tente novamente.');
                return;
            }

            const novoUsuario = {
                id: Date.now(),
                nome: nome,
                email: email,
                senha: senha
            };

            usuariosCadastrados.push(novoUsuario);
            localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));

            alert('Cadastro realizado com sucesso!');
            window.location.href = 'loginPgTarefas.html'; 
        });
    }
});