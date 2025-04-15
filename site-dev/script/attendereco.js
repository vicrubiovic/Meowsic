async function atualizarEndereco() {
   
    const id = pegarid('id');

    let title = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let endereco = document.getElementById('address').value;
    let numero = document.getElementById('number').value;
    let complemento = document.getElementById('complement').value;

   
    if (!title || !cep || !endereco || !numero) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const response = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: "POST",
            body: JSON.stringify({
                "title": title,
                "cep": cep,
                "address": endereco,
                "number": numero,
                "complement": complemento,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).access_token
            }
        });

        if (response.ok) {
            alert("Endereço atualizado com sucesso");
            window.location.href = 'home.html';
        } else {
            const errorData = await response.json();
            console.error("Erro ao atualizar endereço", errorData);
            alert(`Erro ao atualizar endereço: ${errorData.message}`);
        }
    } catch (error) {
        alert("Ocorreu um erro ao tentar atualizar o endereço.");
        console.error("Erro:", error);
    }
}

function pegarid(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
    
})