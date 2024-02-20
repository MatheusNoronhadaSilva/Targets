const botao = document.getElementById('botao')

botao.addEventListener('click', async function(){

        const senha = document.getElementById('senha').value
        const email = document.getElementById('email').value
        
    
        if(email === '' || senha === ''){
            alert('Preencha os campos corretamente !!!')
        }
    
        try {
            const responseApi = await fetch('http://localhost:5080/usuario')
        const listUSers = await responseApi.json()
    
        listUSers.forEach((user) => {
            if(email === user.email && senha === user.senha){
                localStorage.setItem('IdUsuario', user.id)
                localStorage.setItem('nomeUsuario', user.nome)
                alert('Usuario Logado com Sucesso !!')
                window.location.href = '/Target_front/tarefas/tarefas.html'
            }
        })
    
        } catch (error){
            console.error(error)
        }
    // await fetch('http://127.0.0.1:8080/cadastrarContato', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    
    //     },
    //     body: JSON.stringify(user),
    // })

    console.log(listUSers)
})