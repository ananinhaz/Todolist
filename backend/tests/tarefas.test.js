const request = require('supertest');
const express = require('express');
const tarefasRouter = require('../routes/tarefas');

const app = express();
app.use(express.json());
app.use('/api/tarefas', tarefasRouter);

describe('Testes para criação de tarefas', () => {
  it('Deve criar uma nova tarefa com sucesso', async () => {
    const novaTarefa = { titulo: 'Nova tarefa' };

    const response = await request(app)
      .post('/api/tarefas')
      .send(novaTarefa)
      .expect(201);

    expect(response.body.titulo).toBe(novaTarefa.titulo);
    expect(response.body.concluida).toBe(false);
  });

  it('Deve retornar um erro ao tentar criar uma tarefa sem título', async () => {
    const novaTarefa = { titulo: '' };

    const response = await request(app)
      .post('/api/tarefas')
      .send(novaTarefa)
      .expect(400);

    expect(response.body.message).toBe('Título inválido'); // Adapte isso com a mensagem real que você retorna
  });
});
test('Teste simples', () => {
  expect(true).toBe(true);
});
