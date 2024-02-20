'use strict';

async function pegarTarefas() {
    const endPoint = 'http://localhost:5080/tarefas';
    const response = await fetch(endPoint);
    const tarefas = await response.json();
    return tarefas;
}

function criarTarefas(tarefas) {
    const botaoAdicionarTarefa = document.getElementById('adicionar');
    const userName = document.getElementById('user')
    userName.textContent = localStorage.getItem('nomeUsuario')
    let contagem = 0
    let adicionarTarefa = document.getElementById('desc_tarefas')


    const lista_tarefas = document.getElementById('lista_tarefas')

    for(let i = 0; i < tarefas.length; i++) {
        const id = tarefas[i].idUsuario
        if(id == localStorage.getItem('IdUsuario')){

            console.log('ssssssssssssssssssssssssssssss')
            
            contagem += 1

            const tarefaCard = document.createElement('div')
            tarefaCard.classList.add('tarefa')

            const tarefaId = document.createElement('div')
            tarefaId.classList.add('tarefa_id')

            const tarefaIdSpan = document.createElement('span')
            tarefaIdSpan.textContent = contagem

            const imagemLixeira = document.createElement('img')
            imagemLixeira.src = '../img/lixo.png'
            imagemLixeira.classList.add('lixeira')

            const info = document.createElement('div')
            info.classList.add('info')

            const descricao = document.createElement('span')
            descricao.textContent = tarefas[i].descrição

            const dataConclusao =  document.createElement('span')
            dataConclusao.textContent = tarefas[i].dataConclusão

            info.replaceChildren(descricao, dataConclusao)
            tarefaId.replaceChildren(tarefaIdSpan, imagemLixeira)
            tarefaCard.replaceChildren(tarefaId, info)
            lista_tarefas.appendChild(tarefaCard)

            imagemLixeira.addEventListener('click', function(){
                const idLixeira = tarefas[i].id

                excluirTarefaPorId(idLixeira)

                carregarTarefas()
            })

        }
    }

    const dica_adicionar = document.createElement('p')
    dica_adicionar.textContent = 'Clique no icone para adicionar mais uma tarefa'

    adicionarTarefa.appendChild( dica_adicionar)
    console.log('tarefas: ' + tarefas.length)
    

    botaoAdicionarTarefa.addEventListener('click', async function() {

        adicionarTarefa.innerHTML = ''

        adicionarTarefa.classList.remove('desc_tarefas_diminuir')
        adicionarTarefa.classList.add('desc_tarefas_aumentar')
        adicionarTarefa.classList.add('desc_tarefas_adicionar')

        const div_desc = document.createElement('div')
        div_desc.classList.add('div_desc')

        const sair = document.createElement('a')
        sair.classList.add('sair')
        sair.textContent = 'sair'

        const h4 = document.createElement('h4')
        h4.textContent = 'Adicionar nova tarefa'

        const descricao = document.createElement('div')
        descricao.classList.add('descricao')

        const h5_descricao = document.createElement('h5')
        h5_descricao.textContent = '- Descrição -'

        const textareaDescricao = document.createElement('textarea')
        textareaDescricao.rows = 1
        textareaDescricao.maxLength = 70

        const h6 = document.createElement('h6')
        h6.textContent = '0 / 70'

        const data = document.createElement('div')
        data.classList.add('data')

        const h5_data = document.createElement('h5')
        h5_data.textContent = '- Data limite -'

        const textareaData = document.createElement('textarea')
        textareaData.rows = 1
        textareaData.maxLength = 70

        const botao = document.createElement('button')
        botao.textContent = 'criar tarefa'

        data.replaceChildren(h5_data, textareaData)
        descricao.replaceChildren(h5_descricao, textareaDescricao, h6)
        div_desc.replaceChildren(sair, h4)
        adicionarTarefa.replaceChildren(div_desc, descricao, data, botao)

        const limiteCaracteres = textareaDescricao.getAttribute('maxlength'); // Obtendo o limite de caracteres do HTML

        textareaData.addEventListener('input', ajustarAltura);
        textareaDescricao.addEventListener('input', ajustarAltura);

        function ajustarAltura() {
            textareaData.style.height = 'auto';
            textareaData.style.height = textareaData.scrollHeight + 'px';
            textareaDescricao.style.height = 'auto';
            textareaDescricao.style.height = textareaDescricao.scrollHeight + 'px';
        }

        textareaDescricao.addEventListener('input', function() {
            const texto = textareaDescricao.value;
            const numCaracteres = texto.length;

            h6.textContent = numCaracteres + ' / ' + limiteCaracteres;
        });

        sair.addEventListener('click', function(){

            adicionarTarefa.innerHTML = ''

            const dica_adicionar = document.createElement('p')
            dica_adicionar.textContent = 'Clique no icone para adicionar mais uma tarefa'

            adicionarTarefa.classList.remove('desc_tarefas_aumentar')
            adicionarTarefa.classList.add('desc_tarefas_diminuir')
            // adicionarTarefa.innerHTML = ''

            adicionarTarefa.replaceChildren(dica_adicionar)
        })

        botao.addEventListener('click', function(){

            const novaTarefa = {
                id: tarefas.length+1,
                descrição: textareaDescricao.value,
                dataConclusão: textareaData.value,
                idUsuario: localStorage.getItem('IdUsuario')
            }

            console.log(textareaDescricao)

            enviarTarefa(novaTarefa);

            carregarTarefas()
        })
    });  
}

async function carregarTarefas() {
    const tarefas = await pegarTarefas();
    if (tarefas !== undefined) {
        criarTarefas(tarefas);
    } else {
        console.log('ERRRRROOOOO');
    }
}

async function enviarTarefa(tarefa) {
    const endPoint = 'http://localhost:5080/tarefas';
    await fetch(endPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    });
}

async function excluirTarefaPorId(id) {
    const endPoint = `http://localhost:5080/tarefas/${id}`;
    await fetch(endPoint, {
        method: 'DELETE'
    });
}


carregarTarefas();
