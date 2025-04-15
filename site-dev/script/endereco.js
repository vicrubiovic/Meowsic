const url = "https://go-wash-api.onrender.com/api/auth/address"; 

async function cadastro_endereco() {
    let titulo = document.getElementById('titulo').value;
    let cep = document.getElementById('cep').value; 
    let endereco = document.getElementById('endereco').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;

    if (!titulo || !cep || !endereco || !numero) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    

    try {
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": titulo,
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
            let result = await response.json();
            console.log(result);
            alert("Endereço cadastrado com sucesso!");
            window.location.href = 'home.html';
          
        } else {
            let error = await response.json();
            console.error("Erro:", error);
            alert("Erro ao cadastrar o endereço. Verifique os dados e tente novamente.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição. Tente novamente mais tarde.");
    }
}