const form = document.getElementById("meu-formulario");
const status = document.getElementById("status-envio");
const emailInput = document.getElementById("iemail");
const btnEnviar = document.getElementById("btn-enviar");

// Função para validar o formato do e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const emailValor = emailInput.value.trim();

    // 1. Caso o e-mail seja inválido
    if (!validarEmail(emailValor)) {
        status.innerHTML = "Por favor, digite um e-mail válido (ex: seu@email.com).";
        status.style.color = "#e74c3c"; // Vermelho
        emailInput.focus();
        return;
    }

    const data = new FormData(event.target);

    // Estado visual de envio
    status.innerHTML = "Enviando sua mensagem...";
    status.style.color = "#888";
    if (btnEnviar) btnEnviar.disabled = true;

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Mensagem de sucesso
            status.innerHTML = "Mensagem enviada com sucesso! Em breve entrarei em contato.";
            status.style.color = "#2ecc71"; // Verde
            form.reset();

            setTimeout(() => {
                status.innerHTML = "";
            }, 10000);
        } else {
            // Mensagem caso o servidor recuse
            status.innerHTML = "Ops! Não foi possível enviar sua mensagem. Tente novamente mais tarde.";
            status.style.color = "#e74c3c";
        }
    } catch (error) {
        // Mensagem caso haja falha de internet/conexão
        status.innerHTML = "Sem conexão com a internet. Verifique sua rede e tente novamente.";
        status.style.color = "#e74c3c";
    } finally {
        if (btnEnviar) btnEnviar.disabled = false;
    }
});