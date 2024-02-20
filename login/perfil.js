'use strict'

const olho = document.getElementById('olho')
const inputSenha = document.getElementById('password')
const inputFoto = document.getElementById('foto-perfil')
const imagemLabel = document.getElementById('imagem')
const botaoVoltar = document.getElementById('voltar')
let boolean = false 

olho.addEventListener('click', () => {

    if(boolean == true){
        olho.src = '../img/svg/olho.svg'
        boolean = false
        inputSenha.type = 'password'
    }
    else {
        olho.src = '../img/svg/olho-fechado.svg'
        boolean = true
        inputSenha.type = 'text'
    }


})

inputFoto.addEventListener('change', () => {

    let file = inputFoto.files[0]
    
    if (file) {

        const reader = new FileReader();
    
        reader.addEventListener('load', (e) => {
            const readerTarget = e.target
            // localStorage.setItem('imagem', readerTarget.result)
            imagemLabel.style.backgroundImage = `url(${readerTarget.result})`
            
            if(imagemLabel.children[0].classList.contains('hidden') == false)
            imagemLabel.children[0].classList.add('hidden')
            
        })
    
    reader.readAsDataURL(file);

    }

})

botaoVoltar.addEventListener('click', () => {

    window.location.href = './tarefas.html'

})