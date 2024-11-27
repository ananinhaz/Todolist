const API_URL = 'http://localhost:5001/api/tarefas'; // API de tarefas

// listar tarefas
function listarTarefas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tarefas => {
            const tarefasLista = document.getElementById('tarefas-lista');
            tarefasLista.innerHTML = '';

            tarefas.forEach(tarefa => {
                const li = document.createElement('li');

                const div = document.createElement('div');
                div.classList.add('tarefa-item');
                
                const titulo = document.createElement('span');
                titulo.classList.add('tarefa-titulo');
                if (tarefa.concluida) {
                    titulo.classList.add('concluida');
                }
                titulo.textContent = tarefa.titulo;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = tarefa.concluida;
                checkbox.addEventListener('change', () => {
                    alterarStatusTarefa(tarefa.id, checkbox.checked);
                });

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    deletarTarefa(tarefa.id);
                });

                div.appendChild(checkbox);
                div.appendChild(titulo);
                div.appendChild(deleteButton);
                li.appendChild(div);

                tarefasLista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao listar tarefas:', error));
}

// Adicionar tarefa
document.getElementById('adicionar').addEventListener('click', () => {
    const titulo = document.getElementById('titulo').value;

    if (titulo) {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo }),
        })
            .then(() => listarTarefas())
            .catch(error => console.error('Erro ao adicionar tarefa:', error));
    }
});

// Alterar status
function alterarStatusTarefa(id, concluida) {
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida }),
    })
        .then(() => listarTarefas())
        .catch(error => console.error('Erro ao alterar status:', error));
}

// Deletar tarefa
function deletarTarefa(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => listarTarefas())
        .catch(error => console.error('Erro ao deletar tarefa:', error));
}

// Carregar tarefas ao iniciar
listarTarefas();
