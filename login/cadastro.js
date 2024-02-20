'use strict'


const botao = document.getElementById('botao')


botao.addEventListener('click', async function(){


    const nome = document.getElementById('nome').value
const email = document.getElementById('email').value
const senha = document.getElementById('senha').value
const confirmar_senha = document.getElementById('confirmar_senha').value


console.log(nome)






    if(email === '' || senha === '' || nome === '' || confirmar_senha === ''){
        alert('Preencha os campos corretamente !!!')
    } else if (senha !== confirmar_senha) {
        alert('erro em confirmar a senha')
    } else {
        try {
            const responseApi = await fetch('http://localhost:5080/usuario')
        const listUSers = await responseApi.json()
    
    
        const novoUser = {
            id: listUSers.length+1,
            nome: nome,
            email: email,
            senha: senha
        }
    
    
        enviarNovoUser(novoUser)
    
    
        async function enviarNovoUser(user){
            const endPoint = 'http://localhost:5080/usuario';
            await fetch(endPoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            alert('Usuario cadastrado com sucesso')
            window.location.href = '/Target_front/index.html'
        }
    
    
        } catch (error){
            console.error(error)
        }   
    }
})

async function excluirUsuarioPorId(id) {
    const endPoint = `http://localhost:5080/usuario/${id}`;
    await fetch(endPoint, {
        method: 'DELETE'
    });
}

//excluirUsuarioPorId(4);

