const form = document.querySelector('#form');
const lista = document.querySelector('#lista');

// pegando itens do local storage
const itens = JSON.parse(localStorage.getItem('itens')) || [];
itens.forEach((elemento => {
    criaElemento(elemento);
}));

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const existe = itens.find(elemento => elemento === nome.value);

    const itemAtual = {
        'nome' : nome.value
    }

    if(existe){
        itemAtual.id = existe.id;
    }else{
        
        itemAtual.id = itens.length;
        criaElemento(itemAtual)
        itens.push(itemAtual);
    }
    
    localStorage.setItem('itens', JSON.stringify(itens));
    nome.value = '';
});

function criaElemento(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    novoItem.innerHTML = item.nome;
    novoItem.dataset.id = item.id;
    novoItem.style.marginBottom = '30px';
    lista.appendChild(novoItem);
    novoItem.appendChild(deletaElemento(item.id));
    novoItem.appendChild(feito(item.id));
   
}

function deletaElemento(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';
    elementoBotao.style = 'margin-left: 20px; background-color: red; color: white; width: 20px; height: 20px; border: 1px solid red' ;
    elementoBotao.addEventListener('click', function(){
        deleta(this.parentNode, id);
    });

    return elementoBotao;
}

function deleta(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));
}


function feito(id){
    const elementoBotaoFeito = document.createElement('button');
    elementoBotaoFeito.innerText = '✔';
    elementoBotaoFeito.style = 'margin-left: 15px; background-color: green; color: white; width: 20px; height: 20px; border: 1px solid green' ;
    elementoBotaoFeito.addEventListener('click', function(){
        taskCompleta(this.parentNode, id);
    });

    return elementoBotaoFeito;
}

function taskCompleta(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));
}   