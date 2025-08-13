document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin'); 

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            const usuariosSalvos = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];

            const usuarioEncontrado = usuariosSalvos.find(user => user.email === email && user.senha === senha);

            if (usuarioEncontrado) {
                alert('Login bem-sucedido!');
                // Salva o ID do usuário logado para uso futuro (opcional)
                localStorage.setItem('usuarioLogadoId', usuarioEncontrado.id);

                window.location.href = 'pgPrincipalTarefas.html'; 
            } else {
                alert('E-mail ou senha incorretos.');
            }
        });
    }
});