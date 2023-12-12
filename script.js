// Criando uma constante para capturar o input
const input = document.getElementById("input");
// Criando uma constante para capturar o button
const button = document.getElementById("button");
// Criando uma constante para capturar a 'ul/lista'
const listaTarefasCompleta = document.getElementById('list')


// Criação de um array para armazenar as tarefas digitadas no input (vai começar vazia e sendo preenchida conforme as tarefas forem sendo criadas)
let tarefas = [];
// Função que captura o valor digitado no input

function adicionarTarefa() {
  // Adicionando as tarefas a lista (tarefa: input.value) e definindo essas tarefas como concluidas ou não (concluida: false) (por padrão quando ela é criada ainda não esta concluida, por isso ta false) tudo isso por meio de um objeto.
  tarefas.push({
    tarefa: input.value,
    concluida: false,

    excluida: false
});
  
  //Para limpar o input todas vez que uma nova tarefa for adicionada
  input.value = ''   

  // Chamando a função exibir tarefas
  exibirTarefas();
}

// Para exibir as tarefas criadas, e que foram inseridas na lista, na tela para que o usuario possa ver.
function exibirTarefas() {
  let listaTarefas = '';

  tarefas.forEach((item, index) => {
    listaTarefas = listaTarefas + `
        <li class="itens-list ${item.concluida && "concluida" || item.excluida && "excluida"}">
            <img
                src="./images/icon-check.png"
                alt="imagem de check"
                onclick="concluirTarefa(${index})"
            />
            <p>${item.tarefa}</p>
            <img src="./images/icon-trash.png" alt="imagem lixeira" onclick="deletarItem(${index})"/>
        </li>
        
        `; // O 'index' se refere a posição que o botão foi clicado.
  });

    // Adicionar as tarrefas criadas ao arquivo html
    listaTarefasCompleta.innerHTML = listaTarefas


    // Para não resetar a lista apos atualizar o navegador
    localStorage.setItem('lista', JSON.stringify(tarefas)) //JSON.stringify transformara o objeto em string



}
// Para alterar a cor depois de a tarefa ser marcada como concluida
function concluirTarefa(index) {
    // Alterando o valor do item concluido de dentro do objeto da funcão 'adicionarTarefa()' (o novo valor será ele mesmo invertivo - !(sinal de negação))
    tarefas[index].concluida = !tarefas[index].concluida

    // Chamando a função exibir tarefas mais uma vez (para poder deletar o item certo da lista de tarefas existentes)
    exibirTarefas()
}


// Para deletar um item da lista (ela sera chamada na segunda img)
function deletarItem(index) {

    // Alterando o valor do item concluido de dentro do objeto da funcão 'adicionarTarefa()' (o novo valor será ele mesmo invertivo - !(sinal de negação))
    tarefas[index].excluida = !tarefas[index].excluida

    // Chamando a função exibir tarefas mais uma vez (para poder deletar o item certo da lista de tarefas existentes)
    exibirTarefas()
}


// Para não resetar a lista apos atualizar o navegador
function recarregarTarefas() {
    const tarefasLocalStorag = localStorage.getItem('lista')

    if(tarefasLocalStorag){
        tarefas = JSON.parse(tarefasLocalStorag)//JSON.stringify transformara a string em um objeto.ßß
    }

    // Chamando a função exibir tarefas mais uma vez (para poder deletar o item certo da lista de tarefas existentes)
    exibirTarefas()
}

recarregarTarefas()
button.addEventListener("click", adicionarTarefa);


