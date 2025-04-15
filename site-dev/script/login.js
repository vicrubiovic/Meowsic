const url = "https://go-wash-api.onrender.com/api/login"

async function login(){

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(!email || !password){
        alert('Todos os campos devem estar obrigatoriamente preenchidos')

        return
    }

    if (password.length < 8){
            alert("Senha inválida");

            return
        }

    if (!email.includes('@')) {
            alert("Email inválido")
        
            return
    }

    let api = await fetch(url,{
        method: "POST",
        body:JSON.stringify(
            {
                "email":email,
                "password":password,
                "user_type_id":1,
            }
        ),
        headers:{
            'Content-Type':'application/json'
        }
    })

    if(api.ok){
        
        let resposta = await api.json();
        localStorage.setItem("user", JSON.stringify(resposta));
        console.log(resposta)
        window.location.href = 'home.html'
        alert('Bem-vindo ao Meowsic!')

    }else{

        let erroApi = await api.json();
        let errors = erroApi.data.errors;

        alert(errors)
    }

    return
}
