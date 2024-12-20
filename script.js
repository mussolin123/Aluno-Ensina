document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio normal do formulário
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Criação do corpo da requisição
    const data = {
        email: email,
        password: password
    };
    
    // Envia a requisição POST para a API de login
    fetch('http://localhost:8000/api/login/', {  // Substitua pela URL correta da sua API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Armazene o token recebido
            localStorage.setItem('auth_token', data.token);
            alert('Login bem-sucedido!');
            // Redirecionar para a página principal ou para onde for necessário
            window.location.href = '/pagina-inicial';  // Substitua pela URL desejada
        } else {
            alert('Erro no login, verifique suas credenciais.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao fazer login.');
    });
});
