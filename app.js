const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());

// Função para ler o arquivo tarefas.json
function lerTarefas() {
    const path = './module/tarefas.json';
    const rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
}

// Endpoint para obter todas as tarefas
app.get('/v1/acmeTarefas/todasAsTarefas', (req, res) => {
    const tarefas = lerTarefas().tarefas;
    res.json(tarefas);
});

// Endpoint para obter uma tarefa pelo ID
app.get('/v1/acmeTarefas/tarefa/:id', (req, res) => {
    const idTarefa = parseInt(req.params.id);
    const tarefas = lerTarefas().tarefas;
    
    const tarefaEncontrada = tarefas.find(tarefa => tarefa.id === idTarefa);
    
    if (tarefaEncontrada) {
        res.json(tarefaEncontrada);
    } else {
        res.status(404).json({ erro: 'Nenhuma tarefa com esse ID foi encontrada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
