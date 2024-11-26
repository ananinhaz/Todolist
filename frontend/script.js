const API_URL = 'http://localhost:5001/api/tarefas'; // API de tarefas

// listar tarefas
function listarTarefas() {
    fetch(API_URL)
        .then(response => response.json())
        .then(tarefas => {
            const tarefasLista = document.getElementById('tarefas-lista');
            tarefasLista.innerHTML = ''; // Limpa a lista atual de tarefas

            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('tarefa-adicionada'); // Animação de adicionar tarefa

                // Cria a estrutura para cada tarefa
                const div = document.createElement('div');
                div.classList.add('tarefa-item');
                
                // Título da tarefa
                const titulo = document.createElement('span');
                titulo.classList.add('tarefa-titulo');
                if (tarefa.concluida) {
                    titulo.classList.add('concluida'); // Marca tarefa como concluída
                }
                titulo.textContent = tarefa.titulo;

                // Checkbox para marcar tarefa como concluída
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = tarefa.concluida;
                checkbox.addEventListener('change', function () {
                    alterarStatusTarefa(tarefa.id, checkbox.checked); // Altera o status da tarefa
                });

                // Botão de deletar tarefa
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    deletarTarefa(tarefa.id);
                });

                // Adiciona os elementos ao li
                div.appendChild(checkbox);
                div.appendChild(titulo);
                div.appendChild(deleteButton);
                li.appendChild(div);

                tarefasLista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao listar tarefas:', error));
}

// adicionar nova tarefa
document.getElementById('adicionar').addEventListener('click', function () {
    const titulo = document.getElementById('titulo').value;

    if (titulo) {
        const tarefaLista = document.getElementById('tarefas-lista');
        const loadingElement = document.createElement('li');
        loadingElement.textContent = "Adicionando tarefa...";
        tarefaLista.appendChild(loadingElement);

        // Adiciona a nova tarefa pela API
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo: titulo })
        })
            .then(response => response.json())
            .then(novaTarefa => {
                loadingElement.remove(); // Remove o elemento de carregamento
                listarTarefas(); // Atualiza a lista
            })
            .catch(error => console.error('Erro ao adicionar tarefa:', error));
    }
});

// alterar o status de uma tarefa, concluída ou não
function alterarStatusTarefa(id, concluida) {
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ concluida: concluida })
    })
        .then(response => response.json())
        .then(updatedTarefa => {
            listarTarefas(); // Atualiza a lista após alteração
        })
        .catch(error => console.error('Erro ao atualizar tarefa:', error));
}

// deletar tarefa
function deletarTarefa(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                listarTarefas(); // Atualiza a lista após deleção
            }
        })
        .catch(error => console.error('Erro ao deletar tarefa:', error));
}

// Carrega as tarefas ao iniciar a página
listarTarefas();
