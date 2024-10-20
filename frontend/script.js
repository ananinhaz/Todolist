const API_URL = 'http://localhost:5001/api/tarefas'; // Alterar a URL da API se necessário

// Função para listar tarefas
function listarTarefas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tarefas => {
            const tarefasLista = document.getElementById('tarefas-lista');
            tarefasLista.innerHTML = ''; // Limpa a lista atual de tarefas

            // Adiciona as tarefas na lista
            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                li.textContent = tarefa.titulo + (tarefa.concluida ? " (Concluída)" : "");
                tarefasLista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao listar tarefas:', error));
}

// Função para adicionar nova tarefa
document.getElementById('adicionar').addEventListener('click', function() {
    const titulo = document.getElementById('titulo').value;
    
    if (titulo) {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo: titulo }) // Envia o título como JSON
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao adicionar tarefa');
        })
        .then(novaTarefa => {
            console.log('Tarefa adicionada:', novaTarefa);
            document.getElementById('titulo').value = ''; // Limpa o campo de entrada
            listarTarefas(); // Atualiza a lista de tarefas
        })
        .catch(error => console.error('Erro ao adicionar tarefa:', error));
    }
});

// Carrega as tarefas ao iniciar a página
listarTarefas();
