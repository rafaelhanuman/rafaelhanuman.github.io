let page = 1;
const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');

function loadItems() {
    loader.style.display = 'block';

    // Simula uma chamada de API com um delay
    setTimeout(() => {
        for (let i = 1; i <= 10; i++) {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerText = `Item ${((page - 1) * 10) + i}`;
            itemsContainer.appendChild(item);
        }

        loader.style.display = 'none';
        page++;
    }, 1000);
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadItems();
    }
});

// Carrega os primeiros itens ao iniciar
loadItems();
