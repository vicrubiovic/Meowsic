const url = "https://go-wash-api.onrender.com/api/user"

async function cadastro(){

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let terms = document.getElementById('terms').checked;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let password = document.getElementById('password').value;

    if(!name || !email || !cpf_cnpj || !birthday || !password || !terms){
        alert('Todos os campos devem estar obrigatoriamente preenchidos')

        return
    }

    if (password.length < 8){
            alert("A senha deve ter no mínimo 8 caracteres");

            return
        }
    
    if (cpf_cnpj.length !== 11) {
            alert("CPF ou CPNJ inválido");

            return
        }

    if (!email.includes('@')) {
            alert("Email inválido")
    }
        
      

    let api = await fetch(url,{
        method: "POST",
        body:JSON.stringify(
            {
                "name":name,
                "email":email,
                "user_type_id":1,
                "password":password,
                "cpf_cnpj":cpf_cnpj,
                "terms": 1,
                "birthday":birthday,   
            }
        ),
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(api.ok){
        let resposta = await api.json();
        console.log(resposta)
        alert('Cadastro realizado! Ative a sua conta')
        window.location.href = 'login.html'
    
    } else {

        let erroApi = await api.json();
        let errors = erroApi.data.errors;

        for(let erro in errors){
            if(errors[erro].length > 0)
                alert(errors[erro][0]);
        }
    }
}