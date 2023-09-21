// Referencia a tabela de produtos 
const table = document.getElementById("produtosAdicionados");

// Referencia os elementos de output do carrinho
const spanValorSubtotal = document.getElementById("valorSubtotal"); 
const spanValorDesconto = document.getElementById("valorDesconto"); 
const spanValorTotal = document.getElementById("valorTotal"); 

// Cria um array universal para os objetos dos produtos
let todosOsProdutos = [];

function adicionarProduto() {
  // Pega os valores dos inputs
  const nomeProduto = document.getElementById("nomeProduto").value;
  const quantidadeProduto = document.getElementById("quantidadeProduto").value;
  const valorProduto = document.getElementById("valorProduto").value;

  // Amarzena em uma variavel o subtotal do produto
  const subtotalProduto = calcularSubtotalProduto(quantidadeProduto, valorProduto);

  // Objeto contendo as informações do produto
  const objProduto = {
    nome: nomeProduto,
    valor: valorProduto,
    quantidade: quantidadeProduto,
    subtotal: subtotalProduto
  };

  // Mostra o objeto no console
  console.log(objProduto);

  // Adiciona o objeto no array
  todosOsProdutos.push(objProduto);

  // Chama a função de adicionar o objeto à tabela HTML
  adicionarObjetoATabela(objProduto);
}

function adicionarObjetoATabela(obj) {
  // Adiciona o objeto a uma linha da tabela
  // Cria uma linha para o produto
  const tr = document.createElement("tr");

  // Adiciona as células à linha
  tr.innerHTML = `
    <td>${obj.nome}</td>
    <td>${obj.quantidade}</td>
    <td>${obj.subtotal}</td>
  `;

  // Adiciona o botão de remover a linha
  const buttonToRemove = document.createElement("button");
  buttonToRemove.className = "buttons-remove";
  buttonToRemove.textContent = "Remover produto";
  buttonToRemove.addEventListener("click", () => {
    // Remove a linha da tabela
    table.querySelector("tbody").removeChild(tr);

    // Remove o produto do array
    todosOsProdutos.splice(tr.rowIndex, 1);

    exibirResultados();
  });

  // Adiciona o botão a linha da tabela
  tr.appendChild(buttonToRemove);

  // Adiciona a linha à tabela
  table.querySelector("tbody").appendChild(tr);

  // Chama a função para exibir os valores finais
  exibirResultados();
}

// Função para calcular o valor subtotal de todos os produtos
function calcularSubtotalProdutos() {
  let subtotalProdutos = 0;

  // Percorre o array de produtos e soma o valor subtotal dos produtos
  for (let i = 0; i < todosOsProdutos.length; i++) {
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

// Função para calcular o desconto a ser aplicado
function calcularDesconto(subtotal, nivelDesconto) {
  //Mostra o subtotal no console
  console.log(`Subtotal: ${subtotal}`);
  
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

  let valorDesconto = (subtotal * porcentagemDeDesconto).toFixed(2);

  // Mostra o desconto aplicado no console
  console.log(`Desconto aplicado: ${valorDesconto}`);

  return valorDesconto;
}

// Calcula o subtotal de um produto com base na quantidade e no valor
function calcularSubtotalProduto(quantidade, valor) {
  return quantidade * valor;
}

// Função executada quando alguma linha é adicionada ou removida na tabela 
function exibirResultados() {
  // Obtém os valores do subtotal, desconto e total
  let valorSubtotal = calcularSubtotalProdutos();
  let valorDesconto = calcularDesconto(valorSubtotal, calcularNivelDesconto(valorSubtotal));
  let valorTotal = valorSubtotal - valorDesconto;

  // Exibe os valores nos spans correspondentes
  document.getElementById("valorSubtotal").textContent = `R$ ${valorSubtotal}`;
  document.getElementById("valorDesconto").textContent = `R$ ${valorDesconto}`;
  document.getElementById("valorTotal").textContent = `R$ ${valorTotal}`;
};