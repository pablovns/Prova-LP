function calcularDesconto() {
    let valorCompra; // Somar o valor total de todos os produtos (valor de cada produto * quantidade dele)
    // o desconto é dado com base no valor total da compra, não em cada produto
    let nivelDesconto = 0;
    
    if (valorCompra > 300) {
        nivelDesconto = 3;
    } else if (valorCompra > 200) {
        nivelDesconto = 2;
    } else if (valorCompra > 100) {
        nivelDesconto = 1;
    } else {
        // aqui já pode encerrar a função e exibir o desconto igual a 0 no segundo label
    }
    
    let desconto = 0;
    
    switch (nivelDesconto) {
        case 1:
            desconto = 0.05;
            break;
        case 2:
            desconto = 0.1;
            break;
        case 3:
            desconto = 0.15;
            break;
        default:
            break;
    }
    
    const valorDesconto = valorCompra * desconto;
    const valorFinal = valorCompra - valorDesconto;
    

    // Alterar nos labels no html os valores do Subtotal (preco total dos produtos sem desconto), do Desconto e o Total (preço total - desconto)
}

function adicionarProduto() {

}


function removerProduto() {
    
}