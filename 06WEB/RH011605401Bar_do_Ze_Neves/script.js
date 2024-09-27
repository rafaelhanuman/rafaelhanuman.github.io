document.addEventListener('DOMContentLoaded', () => {
    function atualizarTotal() {
        const produtos = document.querySelectorAll('.produto, .produto1, .produto2, .produto3');
        let total = 0;

        produtos.forEach(produto => {
            const quantidade = parseInt(produto.querySelector('.produto-quantidade, .produto1-quantidade, .produto2-quantidade, .produto3-quantidade').value, 10);
            const preco = parseFloat(produto.getAttribute('data-preco'));
            const valorTotalProduto = preco * quantidade;

            // Atualizar o valor exibido do produto
            const valorElemento = produto.querySelector('.produto-valor, .produto1-valor, .produto2-valor, .produto3-valor');
            valorElemento.textContent = `Valor: R$ ${valorTotalProduto.toFixed(2).replace('.', ',')}`;

            // Atualizar o total do pedido
            total += valorTotalProduto;
        });

        // Atualizar o valor total do pedido
        document.querySelector('#TOTAL-PEDIDO span').textContent = total.toFixed(2).replace('.', ',');
    }

    // Adicionar eventos de mudança para todos os seletores de quantidade
    const quantidadeSelectors = [
        ...document.querySelectorAll('.produto-quantidade'),
        ...document.querySelectorAll('.produto1-quantidade'),
        ...document.querySelectorAll('.produto2-quantidade'),
        ...document.querySelectorAll('.produto3-quantidade'),
    ];

    quantidadeSelectors.forEach(select => {
        select.addEventListener('change', atualizarTotal);
    });

    // Evento de clique para enviar o pedido por WhatsApp
    document.getElementById('whatsapp-button').addEventListener('click', () => {
        const produtos = document.querySelectorAll('.produto, .produto1, .produto2, .produto3');
        let mensagem = 'Pedido:\n';

        produtos.forEach(produto => {
            const nome = produto.querySelector('img[id^="NOME"]').alt; // Use o atributo alt para pegar o nome
            const quantidade = produto.querySelector('.produto-quantidade, .produto1-quantidade, .produto2-quantidade, .produto3-quantidade').value;
            if (quantidade > 0) {
                mensagem += `${nome}: ${quantidade} unidade(s)\n`;
            }
        });

        mensagem += `\nTotal: R$ ${document.querySelector('#TOTAL-PEDIDO span').textContent}`;

        const url = `https://api.whatsapp.com/send?phone=+5535910012943&text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });

    // Evento de clique para limpar a lista
    document.getElementById('limpar-lista').addEventListener('click', () => {
        quantidadeSelectors.forEach(select => select.value = 0);
        atualizarTotal();
    });

    // Inicializar total ao carregar a página
    atualizarTotal();
});
