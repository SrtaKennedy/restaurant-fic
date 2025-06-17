// Lista de pratos fictícios
const pratos = [
  {
    id: 1,
    nome: "Parmegiana",
    preco: 45.00,
    imagem: "/assets/imagens/parmegiana.jpg"
  },
  {
    id: 2,
    nome: "Coca-Cola",
    preco: 9.80,
    imagem: "/assets/imagens/coca.jpg"
  },
  {
    id: 3,
    nome: "Petit Gâteau",
    preco: 20.00,
    imagem: "/assets/imagens/petit-gateau.jpg"
  },
  {
    id: 4,
    nome: "Cheesecake",
    preco: 50.00,
    imagem: "/assets/imagens/cheesecake.jpg"
  },
  {
    id: 5,
    nome: "Suco de Laranja",
    preco: 7.00,
    imagem: "/assets/imagens/suco-de-laranja.jpg"
  },
  {
    id: 6,
    nome: "Torta de Cereja",
    preco: 30.00,
    imagem: "/assets/imagens/torta-de-cereja.png"
  }
];

// Carrinho
let carrinho = {};

// Popula o cardápio
function gerarCardapio() {
  const container = document.getElementById('menu-items');
  pratos.forEach(prato => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${prato.imagem}" class="card-img-top img-fluid" alt="${prato.nome}">
        <div class="card-body">
          <h5 class="card-title">${prato.nome}</h5>
          <p class="card-text">R$ ${prato.preco.toFixed(2)}</p>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm me-2" onclick="decrementar(${prato.id})">-</button>
            <span id="qtd-${prato.id}">0</span>
            <button class="btn btn-outline-secondary btn-sm ms-2" onclick="incrementar(${prato.id})">+</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Incrementa item no carrinho
function incrementar(id) {
  carrinho[id] = (carrinho[id] || 0) + 1;
  atualizarCarrinho();
}

// Decrementa item no carrinho
function decrementar(id) {
  if (carrinho[id]) {
    carrinho[id]--;
    if (carrinho[id] === 0) delete carrinho[id];
    atualizarCarrinho();
  }
}

// Atualiza carrinho visualmente
function atualizarCarrinho() {
  // Atualiza quantidades no cardápio
  pratos.forEach(prato => {
    document.getElementById(`qtd-${prato.id}`).innerText = carrinho[prato.id] || 0;
  });

  // Atualiza lista no carrinho
  const lista = document.getElementById('carrinho-itens');
  lista.innerHTML = '';
  let total = 0;

  Object.keys(carrinho).forEach(id => {
    const prato = pratos.find(p => p.id == id);
    const qtd = carrinho[id];
    const subtotal = prato.preco * qtd;
    total += subtotal;
    
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <div>
            ${prato.nome} (x${qtd})
            <button class="btn btn-sm btn-danger ms-2" onclick="removerItem(${prato.id})">Remover</button>
        </div>
        <span>R$ ${subtotal.toFixed(2)}</span>
`;
lista.appendChild(li);

});

  document.getElementById('total').innerText = total.toFixed(2);
  document.getElementById('btn-finalizar').disabled = total === 0;
}

// Botão de remoção de prato no carrinho
function removerItem(id) {
  delete carrinho[id];
  atualizarCarrinho();
}

// Exibe modal com resumo
function exibirResumo() {
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = '';
  Object.keys(carrinho).forEach(id => {
    const prato = pratos.find(p => p.id == id);
    const qtd = carrinho[id];
    const subtotal = prato.preco * qtd;
    const p = document.createElement('p');
    p.innerText = `${prato.nome} x${qtd} - R$ ${subtotal.toFixed(2)}`;
    modalBody.appendChild(p);
  });
  const total = Object.keys(carrinho).reduce((acc, id) => {
    const prato = pratos.find(p => p.id == id);
    return acc + prato.preco * carrinho[id];
  }, 0);
  const pTotal = document.createElement('p');
  pTotal.className = 'fw-bold';
  pTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
  modalBody.appendChild(pTotal);

  // Mostra o modal
  const modal = new bootstrap.Modal(document.getElementById('resumoModal'));
  modal.show();
}



// Inicialização
gerarCardapio();
