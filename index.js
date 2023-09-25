// Referencia a tabela de produtos
const table = document.getElementById("produtosAdicionados");
const frm = document.querySelector("form");

// Referencia os elementos de output do carrinho
const spanValorSubtotal = document.getElementById("valorSubtotal");
const spanValorDesconto = document.getElementById("valorDesconto");
const spanValorTotal = document.getElementById("valorTotal");

// Cria um array universal para os objetos dos produtos
let todosOsProdutos = [];

function aparecerResultados(){
  // Esconde a parte com os itens e os valores caso não tenha nenhum item adicionado
  if(todosOsProdutos.length !== 0 ){ 
    document.getElementById('carrinho').classList.remove('hidden');
    document.getElementById('produtosAdicionados').classList.remove('hidden');
  } else {
    document.getElementById('carrinho').classList.add('hidden');
    document.getElementById('produtosAdicionados').classList.add('hidden');
  }
}

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Pega os valores dos inputs
  const nomeProduto = document.getElementById("nomeProduto").value;
  const quantidadeProduto = document.getElementById("quantidadeProduto").value;
  const valorProduto = document.getElementById("valorProduto").value;

  //  Verifica se já existe um item com o mesmo nome

  if(todosOsProdutos.find(item => item.nome === nomeProduto) !== undefined){
    alert('Produto já adicionado');
    document.getElementById("nomeProduto").focus();
    return
  }

  // Amarzena em uma variavel o subtotal calculado do produto

  const subtotalProduto = calcularSubtotalProduto( quantidadeProduto, valorProduto );

  // Objeto contendo as informações do produto
  const objProduto = {
    nome: nomeProduto,
    valor: valorProduto,
    quantidade: quantidadeProduto,
    subtotal: subtotalProduto
  };

  // Adiciona o objeto no array
  todosOsProdutos.push(objProduto);

  // Chama a função de adicionar o objeto à tabela HTML
  adicionarObjetoATabela(objProduto);
  aparecerResultados();

  // Limpa os inputs
  document.getElementById("formulario").reset();
  document.getElementById("nomeProduto").focus();
});

function adicionarObjetoATabela(obj) {
  // Adiciona o objeto a uma linha da tabela
  // Cria uma linha para o produto
  const tr = document.createElement("tr");
  tr.className = "table-row";

  // Adiciona as células à linha
  tr.innerHTML = `
    <td class="table-row-column">${obj.nome}</td>
    <td class="table-row-column">${obj.valor}</td>
    <td class="table-row-column">${obj.quantidade}</td>
    <td class="table-row-column">${obj.subtotal}</td>
  `;

  // Adiciona o botão de remover a linha
  const buttonToRemove = document.createElement("button");
  buttonToRemove.className = "button-remove";
  buttonToRemove.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  // buttonToRemove.textContent = `Remover`;
  buttonToRemove.addEventListener("click", () => {
    // Remove a linha da tabela
    table.querySelector("tbody").removeChild(tr);

    // Remove o produto do array
    todosOsProdutos.splice(todosOsProdutos.findIndex(item => item.nome === obj.nome), 1);
    exibirResultados();
    aparecerResultados();
  });

  // Adiciona o botão a linha da tabela
  tr.appendChild(buttonToRemove);

  // Adiciona a linha à tabela
  table.querySelector("tbody").appendChild(tr);

  // Chama a função para exibir os valores finais
  exibirResultados();

  // Chama a função pra exibir o carrinho e a tabela
  aparecerResultados();
  
}

// Função para calcular o valor subtotal de todos os produtos
function calcularSubtotalProdutos() {
  let subtotalProdutos = 0;

  // Percorre o array de produtos e soma o valor subtotal dos produtos
  for (let i = 0; i < calcularQuantidadeProdutos(); i++) {
    subtotalProdutos += todosOsProdutos[i].subtotal;
  }

  return subtotalProdutos;
}

function calcularNivelDesconto(subtotal) {
  let nivelDesconto = 0;

  if (subtotal >= 300) {
    nivelDesconto = 3;
  } else if (subtotal >= 200) {
    nivelDesconto = 2;
  } else if (subtotal >= 100) {
    nivelDesconto = 1;
  }

  return nivelDesconto;
}

function calcularPorcentagemDesconto(nivelDesconto) {
  let porcentagemDeDesconto = 0;

  switch (nivelDesconto) {
    case 1:
      porcentagemDeDesconto = 0.05; // 5%
      break;
    case 2:
      porcentagemDeDesconto = 0.1; // 10%
      break;
    case 3:
      porcentagemDeDesconto = 0.15; // 15%
      break;
    default:
      break;
  }

  return porcentagemDeDesconto;
}

// Função para calcular o desconto a ser aplicado
function calcularDesconto(subtotal, nivelDesconto) {
  let valorDesconto = (subtotal * calcularPorcentagemDesconto(nivelDesconto));

  return valorDesconto;
}

// Calcula o subtotal de um produto com base na quantidade e no valor
function calcularSubtotalProduto(quantidade, valor) {
  return quantidade * valor;
}

// Função executada quando alguma linha é adicionada ou removida na tabela
function exibirResultados() {
  // Obtém os valores do subtotal, desconto e total
  let valorSubtotal = calcularSubtotalProdutos().toFixed(2);

  let nivelDesconto = calcularNivelDesconto(valorSubtotal);

  let valorDesconto = calcularDesconto(valorSubtotal, nivelDesconto).toFixed(2);
  let valorTotal = (valorSubtotal - valorDesconto).toFixed(2);

  // Exibe os valores nos spans correspondentes
  document.getElementById("valorSubtotal").textContent = `R$ ${valorSubtotal}`;
  document.getElementById("valorDesconto").textContent = `(${calcularPorcentagemDesconto(nivelDesconto)*100}%) R$ ${valorDesconto}`;
  document.getElementById("valorTotal").textContent = `R$ ${valorTotal}`;
}

function calcularQuantidadeProdutos() {
  let contador = 0;
  while (todosOsProdutos[contador] !== undefined) {
    contador++;
  }
  
  return contador;
}