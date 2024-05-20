// Criando os elementos HTML de forma dinânmica via JavaScript.
// Criando o elemento div com id "container"
let container = document.createElement("div");
container.id = "container";

// Criando o elemento h2 com texto "To Do List"
let h2 = document.createElement("h2");
h2.textContent = "To Do List";
container.appendChild(h2);

// Criando o elemento input com id "input" e tipo "text"
let input = document.createElement("input");
input.id = "input";
input.type = "text";
input.placeholder = "Adicionar item a lista";
container.appendChild(input);

// Criando o elemento button com id "button" e texto "Adicionar Tarefa"
let button = document.createElement("button");
button.id = "button";
button.textContent = "Adicionar Tarefa";
button.addEventListener("click", adicionarTarefa);
container.appendChild(button);

// Criando o elemento ul com id "list"
let ul = document.createElement("ul");
ul.id = "list";
container.appendChild(ul);

// Criando o elemento button com id "limpar-lista", texto "Limpar Lista" e atributo onclick para chamar a função limparListaTarefas()
let limparListaBtn = document.createElement("button");
limparListaBtn.id = "limpar-lista";
limparListaBtn.textContent = "Limpar Lista";
limparListaBtn.addEventListener("click", limparListaTarefas);
container.appendChild(limparListaBtn);

// Adicionando o container diretamente ao corpo da página
document.body.appendChild(container);

// Criando uma constante para capturar a 'ul/lista'
const listaTarefasCompleta = document.getElementById("list");
// Criando uma constante para capturar o botão limpar lista'
const limparLista = document.getElementById("limpar-lista");

// Criação de um array para armazenar as tarefas digitadas no input (vai começar vazia e sendo preenchida conforme as tarefas forem sendo criadas)
let tarefas = [];
// Função que captura o valor digitado no input

function adicionarTarefa() {
  // Adicionando as tarefas a lista (tarefa: input.value) e definindo essas tarefas como concluidas ou não (concluida: false) (por padrão quando ela é criada ainda não esta concluida, por isso ta false) tudo isso por meio de um objeto.
  tarefas.push({
    tarefa: input.value,
    concluida: false,
    excluida: false,
  });

  //Para limpar o input todas vez que uma nova tarefa for adicionada
  input.value = "";

  // Chamando a função exibir tarefas
  exibirTarefas();
}

// Para exibir as tarefas criadas, e que foram inseridas na lista, na tela para que o usuario possa ver.
function exibirTarefas() {
  let listaTarefas = "";

  tarefas.forEach((item, index) => {
    listaTarefas =
      listaTarefas +
      `
        <li class="itens-list ${
          (item.concluida && "concluida") || (item.excluida && "excluida")
        }">
            <p class="texto-tarefa">${item.tarefa}</p>
            <input type="checkbox" class="checkbox-tarefa" ${
              item.concluida ? "checked" : ""
            } onchange="concluirTarefa(${index})"/>
            <img src="./images/icon-trash.png" alt="imagem lixeira" onclick="deletarItem(${index})"/>
        </li>

        `; // O 'index' se refere a posição que o botão foi clicado.
  });

  // Adicionar as tarrefas criadas ao arquivo html
  listaTarefasCompleta.innerHTML = listaTarefas;

  // Para não resetar a lista apos atualizar o navegador
  localStorage.setItem("lista", JSON.stringify(tarefas)); //JSON.stringify transformara o objeto em string
}
// Para alterar a cor depois de a tarefa ser marcada como concluida
function concluirTarefa(index) {
  // Alterando o valor do item concluido de dentro do objeto da funcão 'adicionarTarefa()' (o novo valor será ele mesmo invertivo - !(sinal de negação))
  tarefas[index].concluida = !tarefas[index].concluida;

  // Chamando a função exibir tarefas mais uma vez (para poder deletar o item certo da lista de tarefas existentes)
  exibirTarefas();
}

// Para deletar um item da lista (ela sera chamada na segunda img)
function deletarItem(index) {
  // Alterando o valor do item concluido de dentro do objeto da funcão 'adicionarTarefa()' (o novo valor será ele mesmo invertivo - !(sinal de negação))
  tarefas[index].excluida = !tarefas[index].excluida;

  // Chamando a função exibir tarefas mais uma vez (para poder deletar o item certo da lista de tarefas existentes)
  exibirTarefas();
}

// Função para limpar a lista de tarefas
function limparListaTarefas() {
  tarefas = [];
  exibirTarefas();
}
limparLista.addEventListener("click", limparListaTarefas);

// Para não resetar a lista apos atualizar o navegador
function recarregarTarefas() {
  const tarefasLocalStorag = localStorage.getItem("lista");

  if (tarefasLocalStorag) {
    tarefas = JSON.parse(tarefasLocalStorag); //JSON.stringify transformara a string em um objeto.ßß
  }

  // Chamando a função exibir tarefas mais uma vez (para poder deletar o item certo da lista de tarefas existentes)
  exibirTarefas();
}

recarregarTarefas();
button.addEventListener("click", adicionarTarefa);

// // Adicionando o footer via JS

// Criando os elementos do footer
const footer = document.createElement("footer");

// Criando o contêiner interno
const footerContainer = document.createElement("div");
footerContainer.classList.add("footer"); // Adicionando classe para estilização

// Criando logo
const logo = document.createElement("a");
logo.classList.add("logo-footer");
logo.href = ""; // Definir href se necessário

// Criando spans separados para JH e Developer
const spanJH = document.createElement("span");
spanJH.classList.add("logo-footer");
spanJH.innerText = "JH";

const spanDeveloper = document.createElement("span");
spanDeveloper.classList.add("logo-footer");
spanDeveloper.innerText = "Developer";

// Adicionando spans ao âncora do logo
logo.appendChild(spanJH);
logo.appendChild(spanDeveloper);

// Criando seção de direitos reservados
const reserved = document.createElement("div");
reserved.classList.add("reserved");
const reservedText = document.createElement("p");
reservedText.innerText = "© 2024 JHDeveloper. Todos os direitos reservados.";
reserved.appendChild(reservedText);

// Criando contêiner de links sociais
const link = document.createElement("div");
link.classList.add("links-footer");

// Criando link do Linkedin
const linkedinLink = document.createElement("a");
linkedinLink.href = "https://www.linkedin.com/in/jhonatan-silva-834773292";
const linkedinImg = document.createElement("img");
linkedinImg.src = "./images/linkedin.png";
linkedinImg.alt = "LinkedIn";
linkedinLink.appendChild(linkedinImg);

// Criando link do Github
const githubLink = document.createElement("a");
githubLink.href = "https://github.com/JhonatanSilva90";
const githubImg = document.createElement("img");
githubImg.src = "./images/github.png";
githubImg.alt = "GitHub";
githubLink.appendChild(githubImg);

// Adicionando elementos aos seus contêineres
link.appendChild(linkedinLink);
link.appendChild(githubLink);
footerContainer.appendChild(logo);
footerContainer.appendChild(reserved);
footerContainer.appendChild(link);

// Adicionando contêiner ao footer
footer.appendChild(footerContainer);

// Adicionando footer ao corpo
document.body.appendChild(footer);
