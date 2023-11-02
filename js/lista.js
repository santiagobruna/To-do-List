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

    // Cria uma div para os ícones e adiciona ao novoItem
    const divIcones = document.createElement('div');
    divIcones.classList.add('icones');
    novoItem.appendChild(divIcones);

    // Adiciona os ícones às divs correspondentes
    divIcones.appendChild(criarElementoTask(item.id, iconeSvgFeito + 'feito-desktop.svg', 'concluir'));
    divIcones.appendChild(criarElementoTask(item.id, iconeSvgNaoFeito + 'nao-feito-desktop.svg', 'remover'));


}
function criarElementoTask(id, iconeSrc, acao) {
    const imagemElement = document.createElement('img');
    imagemElement.src = iconeSrc;
    
    imagemElement.addEventListener('click', () => {
        if (acao === 'concluir') {
            alert('task concluída');
            taskCompleta(id);
        } else if (acao === 'remover') {
            alert('task removida');
            deleta(id);
        }
    });

    return imagemElement;
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