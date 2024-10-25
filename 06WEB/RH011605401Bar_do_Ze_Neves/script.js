// Adiciona um listener para o evento 'DOMContentLoaded', que garante que o código só será executado após o carregamento completo do DOM.
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o elemento que exibe o total do pedido.
    const totalPedidoElement = document.querySelector('#TOTAL-PEDIDO span');

    // Seleciona todos os elementos que têm o atributo 'data-preco' (produtos).
    const produtos = document.querySelectorAll('[data-preco]');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Seleciona o botão do WhatsApp para envio do pedido.
    const whatsappButton = document.getElementById('whatsapp-button');

    // Seleciona o botão para limpar a lista de compras.
    const limparListaButton = document.getElementById('limpar-lista');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Função que calcula o total do pedido.
    function calcularTotal() {
        let total = 0; // Inicializa a variável total como 0.

        // Itera sobre cada produto para calcular o total.
        produtos.forEach(produto => {

            // Seleciona o elemento select dentro do produto para obter a quantidade.
            const quantidadeSelect = produto.querySelector('select');

            // Obtém o preço do produto a partir do atributo 'data-preco' e o converte para um número de ponto flutuante.
            const preco = parseFloat(produto.getAttribute('data-preco'));

            // Obtém a quantidade selecionada e a converte para um número inteiro.
            const quantidade = parseInt(quantidadeSelect.value);

            // Acumula o total multiplicando o preço pela quantidade.
            total += preco * quantidade;
        });

        // Atualiza o texto do elemento totalPedidoElement com o total formatado para duas casas decimais.
        totalPedidoElement.textContent = total.toFixed(2);
    }

    // Atualiza o total sempre que a quantidade de algum produto mudar.
    produtos.forEach(produto => {
        const quantidadeSelect = produto.querySelector('select');
        // Adiciona um listener que chama a função calcularTotal quando a quantidade é alterada.
        quantidadeSelect.addEventListener('change', calcularTotal);
    });

    // Enviar pedido via WhatsApp.
    whatsappButton.addEventListener('click', () => {
        // Cria a mensagem com o total do pedido.
        const mensagem = `Meu pedido total é: R$ ${totalPedidoElement.textContent}`;
        // Cria a URL do WhatsApp com a mensagem codificada.
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
        // Abre a URL em uma nova aba.
        window.open(whatsappUrl, '_blank');
    });

    // Limpar lista de compras.
    limparListaButton.addEventListener('click', () => {
        // Itera sobre cada produto para redefinir a quantidade para 0.
        produtos.forEach(produto => {
            const quantidadeSelect = produto.querySelector('select');
            quantidadeSelect.value = 0; // Redefine a quantidade para 0.
        });
        // Recalcula o total para refletir a limpeza da lista.
        calcularTotal();
    });
});
