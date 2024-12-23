document.addEventListener("DOMContentLoaded", function () {
    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio normal do formulário
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Criação do corpo da requisição
            const data = { email, password };
            
            // Envia a requisição POST para a API de login
            fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('auth_token', data.token); // Armazena o token
                        alert('Login bem-sucedido!');
                        window.location.href = '/pagina-inicial'; // Substitua pela URL desejada
                    } else {
                        alert('Erro no login, verifique suas credenciais.');
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao fazer login.');
                });
        });
    }

    // Formulário de Cadastro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
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
                fullname,
                email,
                password,
                user_type: userType,
                workplace,
            };

            // Envia a requisição POST para a API de cadastro
            fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(({ status, body }) => {
                    if (status === 201) {
                        alert('Cadastro bem-sucedido!');
                        window.location.href = '/login.html';
                    } else {
                        console.error('Erro no backend:', body);
                        if (body.email) {
                            alert(`Erro no cadastro: ${body.email[0]}`);
                        } else {
                            alert('Erro ao cadastrar, verifique os dados!');
                        }
                    }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao fazer cadastro.');
                });
            
        });
    }
});
