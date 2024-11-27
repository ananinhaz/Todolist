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

it('Deve retornar uma lista de tarefas com status 200', async () => {
  const response = await request(app)
    .get('/api/tarefas')
    .expect(200);

  expect(response.body).toBeInstanceOf(Array); // Verifica se é um array
  expect(response.body.length).toBeGreaterThan(0); // Verifica que há tarefas na lista
  expect(response.body[0]).toHaveProperty('id'); // Verifica se cada tarefa tem um id
  expect(response.body[0]).toHaveProperty('titulo'); // Verifica se cada tarefa tem um título
  expect(response.body[0]).toHaveProperty('concluida'); // Verifica se cada tarefa tem o status de conclusão
});

it('Deve atualizar o status de uma tarefa com sucesso', async () => {
  const tarefa = { titulo: 'Tarefa para atualizar' };
  
  // Cria a tarefa primeiro
  const createResponse = await request(app)
    .post('/api/tarefas')
    .send(tarefa)
    .expect(201);
  
  const id = createResponse.body.id;

  // Atualiza a tarefa
  const response = await request(app)
    .put(`/api/tarefas/${id}`)
    .send({ concluida: true })
    .expect(200);

  expect(response.body.id).toBe(id);
  expect(response.body.concluida).toBe(true); // Verifica se o status foi atualizado
});

it('Deve deletar uma tarefa com sucesso', async () => {
  const tarefa = { titulo: 'Tarefa a ser deletada' };
  
  // Cria a tarefa primeiro
  const createResponse = await request(app)
    .post('/api/tarefas')
    .send(tarefa)
    .expect(201);
  
  const id = createResponse.body.id;

  // Deleta a tarefa
  const deleteResponse = await request(app)
    .delete(`/api/tarefas/${id}`)
    .expect(200);

  expect(deleteResponse.body.message).toBe('Tarefa deletada com sucesso');
  
  // Verifica se a tarefa foi realmente deletada
  const listResponse = await request(app)
    .get('/api/tarefas')
    .expect(200);

  expect(listResponse.body).not.toContainEqual(expect.objectContaining({ id }));
});

it('Deve retornar erro ao tentar atualizar uma tarefa inexistente', async () => {
  const response = await request(app)
    .put('/api/tarefas/999') // ID que não existe
    .send({ concluida: true })
    .expect(404);

  expect(response.body.message).toBe('Tarefa não encontrada');
});

it('Deve retornar erro ao tentar deletar uma tarefa inexistente', async () => {
  const response = await request(app)
    .delete('/api/tarefas/999') // ID que não existe
    .expect(404);

  expect(response.body.message).toBe('Tarefa não encontrada');
});

it('Deve retornar erro ao tentar criar uma tarefa sem título', async () => {
  const novaTarefa = { titulo: '' };

  const response = await request(app)
    .post('/api/tarefas')
    .send(novaTarefa)
    .expect(400);

  expect(response.body.message).toBe('Título inválido');
});
