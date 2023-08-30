const form = document.getElementById('form');
const lista = document.getElementById('lista');
let valorDoinput = document.getElementById('nome');

/* Caminho para a pasta imagens */
const iconeSvgFeito = './assets/';
const iconeSvgNaoFeito = './assets/'

// Inicializa as tarefas do Local Storage
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Renderiza as tarefas armazenadas
tarefas.forEach((elemento => {
    criaElemento(elemento);
}))

form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    let input = valorDoinput.value;

    const existe = tarefas.find(elemento => elemento === input.value);
    const itemAtual = {
        'tarefa': input
    }

    if (existe) {
        itemAtual.id = existe.id;
    } else {

        itemAtual.id = tarefas.length;
        criaElemento(itemAtual)
        tarefas.push(itemAtual);
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Armazena o array no Local Storage
    valorDoinput.value = "";

})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    novoItem.textContent = item.tarefa;
    novoItem.dataset.id = item.id;
    lista.appendChild(novoItem);

    // Anexa os ícones ao novoItem, passando o id
    novoItem.appendChild(taskFeita(item.id));
    novoItem.appendChild(taskNaoFeito(item.id));



}

function taskFeita(id) {
    const imagemElement = document.createElement('img');
    imagemElement.src = iconeSvgFeito + 'feito-desktop.svg'
    imagemElement.innerHTML = iconeSvgFeito;

    imagemElement.addEventListener('click', (evento) => {
        alert('task concluída');
        taskCompleta(id);

    })
    return imagemElement
}


function taskNaoFeito(id) {
    const imagemElement = document.createElement('img');
    imagemElement.src = iconeSvgNaoFeito + 'nao-feito-desktop.svg'
    imagemElement.innerHTML = iconeSvgNaoFeito;

    imagemElement.addEventListener('click', (evento) => {
        alert('task removida');
        deleta(id);
    })
    return imagemElement
}

function taskCompleta(id) {
    const tag = document.querySelector(`[data-id="${id}"]`); // retorna o data-id do item na lista
    tag.remove();

    tarefas = tarefas.filter(elemento => elemento.id !== id);

    atualizarLocalStorage();
}

function deleta(id) {
    const tag = document.querySelector(`[data-id="${id}"]`);
    tag.remove();

    tarefas = tarefas.filter(elemento => elemento.id !== id);

    atualizarLocalStorage();
}

function atualizarLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}