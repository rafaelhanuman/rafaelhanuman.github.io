document.addEventListener('DOMContentLoaded', () => {
    function atualizarTotal() {
        const produtos = document.querySelectorAll('.produto');
        let total = 0;

        produtos.forEach(produto => {
            const quantidade = parseInt(produto.querySelector('.produto-quantidade').value, 10);
            const preco = parseFloat(produto.getAttribute('data-preco'));
            const valorTotalProduto = preco * quantidade;
            
            // Atualizar o valor exibido do produto
            produto.querySelector('.produto-valor').textContent = `Valor: R$ ${valorTotalProduto.toFixed(2).replace('.', ',')}`;

            // Atualizar o total do pedido
            total += valorTotalProduto;
        });

        // Atualizar o valor total do pedido
        document.querySelector('#TOTAL-PEDIDO span').textContent = total.toFixed(2).replace('.', ',');
    }

    // Adicionar eventos de mudança para todos os seletores de quantidade
    document.querySelectorAll('.produto-quantidade').forEach(select => {
        select.addEventListener('change', atualizarTotal);
    });

    // Evento de clique para enviar o pedido por WhatsApp
    document.getElementById('whatsapp-button').addEventListener('click', () => {
        const produtos = document.querySelectorAll('.produto');
        let mensagem = 'Pedido:\n';

        produtos.forEach(produto => {
            const nome = produto.querySelector('h2').textContent;
            const quantidade = produto.querySelector('.produto-quantidade').value;
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
        document.querySelectorAll('.produto-quantidade').forEach(select => select.value = 0);
        atualizarTotal();
    });

    // Inicializar total ao carregar a página
    atualizarTotal();
});
