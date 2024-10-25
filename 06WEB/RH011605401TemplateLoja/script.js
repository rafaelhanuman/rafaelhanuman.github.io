document.addEventListener('DOMContentLoaded', () => {
    const produtoList = document.querySelectorAll('.produto, .produto1, .produto2, .produto3');
    const totalSpan = document.querySelector('#TOTAL-PEDIDO span');
    const whatsappButton = document.querySelector('#whatsapp-button');
    const limparListaButton = document.querySelector('#limpar-lista');

    function atualizarTotal() {
        let total = 0;

        produtoList.forEach(produto => {
            const quantidadeSelect = produto.querySelector('select');
            const preco = parseFloat(produto.getAttribute('data-preco'));
            const quantidade = parseInt(quantidadeSelect.value);
            total += preco * quantidade;
        });

        totalSpan.textContent = total.toFixed(2);
    }

    produtoList.forEach(produto => {
        const quantidadeSelect = produto.querySelector('select');
        quantidadeSelect.addEventListener('change', atualizarTotal);
    });

    whatsappButton.addEventListener('click', () => {
        const total = totalSpan.textContent;
        const mensagem = `Seu pedido total é: R$ ${total}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
        window.open(url, '_blank');
    });

    limparListaButton.addEventListener('click', () => {
        produtoList.forEach(produto => {
            const quantidadeSelect = produto.querySelector('select');
            quantidadeSelect.value = 0;
        });
        atualizarTotal();
    });

    // Atualiza o total ao carregar a página
    atualizarTotal();
});
