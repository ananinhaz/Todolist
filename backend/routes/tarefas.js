const express = require('express');
const router = express.Router();

// Simulação de dados de tarefas (para testar)
let tarefas = [
    { id: 1, titulo: 'Tarefa 1', concluida: false },
    { id: 2, titulo: 'Tarefa 2', concluida: true }
];

// Rota para listar todas as tarefas
router.get('/', (req, res) => {
    res.json(tarefas);
});

// Rota para adicionar uma nova tarefa
router.post('/', (req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo,
        concluida: false
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

// Atualizar tarefa por ID
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return res.status(404).json({ message: 'Tarefa não encontrada' });

    tarefa.titulo = req.body.titulo || tarefa.titulo;
    tarefa.concluida = req.body.concluida !== undefined ? req.body.concluida : tarefa.concluida;

    res.json(tarefa);
});

// Deletar tarefa por ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tarefas = tarefas.filter(t => t.id !== id);
    res.json({ message: 'Tarefa deletada com sucesso' });
});


// Exportando o router
module.exports = router;
