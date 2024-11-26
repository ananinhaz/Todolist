const express = require('express');
const cors = require('cors'); // Importando o cors
const app = express();
const tarefasRouter = require('./routes/tarefas'); // Importando o arquivo routes

const PORT = process.env.PORT || 5001;

// Middleware para habilitar CORS
app.use(cors()); // Habilita CORS

// Middleware para tratar JSON no corpo das requisições
app.use(express.json());

// Usa a rota /api/tarefas para todas as operações relacionadas a tarefas
app.use('/api/tarefas', tarefasRouter);

// Rota raiz para teste
app.get('/', (req, res) => {
    res.send('API de Lista de Tarefas funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
