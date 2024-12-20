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

// cadastro.html
document.getElementById('registerButton').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o envio normal do formulário
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const workplace = document.getElementById('workplace').value;
    
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Validação de força da senha
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('A senha deve ter pelo menos 8 caracteres, incluindo uma letra, um número e um caractere especial.');
        return;
    }

    // Coleta os tipos de usuário selecionados
    const userType = [];
    if (document.getElementById('professor').checked) userType.push('professor');
    if (document.getElementById('aluno').checked) userType.push('aluno');
    if (document.getElementById('servidor').checked) userType.push('servidor');
    if (document.getElementById('outros').checked) userType.push('outros');

    // Criação do corpo da requisição
    const data = {
        fullname: fullname,
        email: email,
        password: password,
        user_type: userType,
        workplace: workplace
    };

    // Envia a requisição POST para a API de cadastro
    fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cadastro bem-sucedido!');
            window.location.href = '/login.html';  // Redireciona para a tela de login
        } else {
            alert('Erro ao cadastrar, verifique os dados!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao fazer cadastro.');
    });
});
