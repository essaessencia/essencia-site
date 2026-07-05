// =============================================
//  ESSÊNCIA — app.js
//  WhatsApp: 61995135676
//  Endereço: QNN 19 CNJ N Lote 20 Casa 1
// =============================================

const WHATSAPP_NUMBER = '5561995135676';
const STORE_ADDRESS   = 'QNN 19 CNJ N Lote 20 Casa 1';

// ── CATÁLOGO DE PRODUTOS (agora vem do Supabase) ──
// Antes era uma lista fixa aqui no código. Agora os produtos
// ficam salvos no banco de dados e são carregados dinamicamente.
let products = [];

async function carregarProdutos() {
  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Erro ao carregar produtos:', error);
    document.getElementById('productsGrid').innerHTML =
      '<p style="padding:40px;text-align:center;">Não foi possível carregar os produtos agora. Tente novamente em instantes.</p>';
    return;
  }

  // Converte os nomes de coluna do banco (snake_case) para o formato
  // que o resto do código já espera (camelCase), sem precisar mexer
  // em mais nada abaixo.
  products = data.map(p => ({
    id: p.id,
    name: p.name,
    color: p.color,
    category: p.category,
    sub: p.sub,
    price: Number(p.price),
    imgF: p.img_f,
    imgT: p.img_t,
    sizes: p.sizes || [],
    inStock: p.in_stock,
    stock: p.stock,
  }));
}


// ── ESTADO ─────────────────────────────────────
let cart = [];
let currentProduct = null;
let currentQty = 1;
let selectedSize = null;

// ── UTILITÁRIOS ─────────────────────────────────
const fmt = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const subLabels = {
  sutias: 'Sutiãs',
  calcinhas: 'Calcinhas',
  conjuntos: 'Conjuntos',
  fitness: 'Moda Fitness',
  diaadia: 'Moda do Dia a Dia',
  cuecas: 'Cuecas'
};

// ── RENDER PRODUTOS ──────────────────────────────
function getFilteredProducts(cat, sub) {
  if (cat === 'todos') return products.filter(p => p.inStock);
  if (cat === 'encomenda') return products.filter(p => !p.inStock);
  if (cat === 'feminino' && sub) return products.filter(p => p.category === 'feminino' && p.sub === sub && p.inStock);
  if (cat === 'feminino') return products.filter(p => p.category === 'feminino' && p.inStock);
  if (cat === 'masculino') return products.filter(p => p.category === 'masculino' && p.inStock);
  return products;
}

function renderProducts(cat = 'todos', sub = null) {
  const grid = document.getElementById('productsGrid');
  const title = document.getElementById('sectionTitle');
  const avisoExistente = document.getElementById('encomendaAvisoGeral');
  if (avisoExistente) avisoExistente.remove();
  let list = getFilteredProducts(cat, sub);

  // For "todos" show all in-stock + encomenda at end
  if (cat === 'todos') {
    list = products.filter(p => p.inStock);
   
   
    title.textContent = 'Todos os Produtos';
} else if (cat === 'encomenda') {
    title.textContent = 'Sob Encomenda';
    setTimeout(() => {
      const bar = document.querySelector('.section-title-bar');
      if (bar && !document.getElementById('encomendaAvisoGeral')) {
        const aviso = document.createElement('p');
        aviso.id = 'encomendaAvisoGeral';
        aviso.className = 'encomenda-aviso-geral';
        aviso.textContent = 'Os itens desta categoria serão verificados com o fornecedor antes da confirmação. O prazo de retorno é de até 7 dias, e a disponibilidade não é garantida.';
        bar.after(aviso);
      }
    }, 0);
  } else if (cat === 'feminino' && sub) {
    title.textContent = subLabels[sub] || 'Feminino';
  } else if (cat === 'feminino') {
    title.textContent = 'Feminino';
  } else if (cat === 'masculino') {
    title.textContent = 'Masculino';
  }

  const groups = [];
list.forEach(p => {
  const g = groups.find(x => x.name === p.name);
  if (g) { g.variants.push(p); }
  else { groups.push({ name: p.name, variants: [p] }); }
});
 grid.innerHTML = groups.map(g => {
  const first = g.variants[0];
  const isEncomenda = !first.inStock;
  const badge = isEncomenda ? '<span class="card-badge encomenda">Sob Encomenda</span>' : '';
  
const totalSlides = g.variants.reduce((acc, v) => acc + (v.imgT ? 2 : 1), 0);
const dots = totalSlides > 1
  ? `<div class="slide-dots">${Array.from({length: totalSlides}).map((_, i) =>
      `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('')}</div>`
  : '';

const imgs = g.variants.flatMap((v, i) => {
  const arr = [`<div class="slide" style="display:${i===0?'block':'none'}"><img class="card-img" src="${v.imgF}" data-id="${v.id}" /><span class="slide-color">${v.color}</span></div>`];
  if (v.imgT) arr.push(`<div class="slide" style="display:none"><img class="card-img" src="${v.imgT}" data-id="${v.id}" /><span class="slide-color">${v.color} </span></div>`);
  return arr;
}).join('');
  return `
    <div class="product-card" data-id="${first.id}">
      <div class="card-img-wrap">
        ${totalSlides > 1 ? '<button class="slide-prev">&#8249;</button>' : ''}
        ${imgs}
        ${totalSlides > 1 ? '<button class="slide-next">&#8250;</button>' : ''}
        ${dots}
        ${badge}
      </div>
     <div class="card-body">
  <p class="card-name">${first.name}</p>
  <p class="card-price">${fmt(first.price)}</p>
  <p class="card-color-label">${first.color}</p>
  ${!isEncomenda ? `<div class="card-sizes">${first.sizes.map(s => '<span class="size-tag">'+s+'</span>').join('')}</div>` : ''}
       ${isEncomenda ? `
  <div class="encomenda-form">
    <div class="encomenda-row">
      <div class="encomenda-field">
        <label>Cor desejada</label>
        <input type="text" class="encomenda-cor" />
      </div>
      <div class="encomenda-field">
        <label>Cor indesejada</label>
        <input type="text" class="encomenda-cor-nao" />
      </div>
    </div>
    <div class="encomenda-row">
      <div class="encomenda-field">
        <label>Tamanho</label>
        <input type="text" class="encomenda-tamanho" placeholder="ex: M/M" />
      </div>
      <div class="encomenda-field encomenda-field-qty">
        <label>Quantidade</label>
        <input type="number" class="encomenda-qty" min="1" value="1" />
      </div>
    </div>
   <button class="btn-encomenda" data-id="${first.id}" data-name="${first.name}">Consultar disponibilidade <i class="fas fa-arrow-right"></i></button>
  </div>
` : `<button class="btn-add" data-id="${first.id}">Adicionar ao Carrinho</button>`}
        </div>
        </div>
    
  `;
}).join('');

  // Events nos botões
  grid.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openSizeModal(parseInt(btn.dataset.id));
    });
  });
grid.querySelectorAll('.btn-encomenda').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const card = btn.closest('.product-card');
    const tamanho = card.querySelector('.encomenda-tamanho').value.trim();
    const cor = card.querySelector('.encomenda-cor').value.trim();
    const corNao = card.querySelector('.encomenda-cor-nao').value.trim();
    const qty = parseInt(card.querySelector('.encomenda-qty').value) || 1;
    if (!tamanho || !cor) {
      alert('Por favor, preencha o tamanho e a cor desejada.');
      return;
    }
    const p = products.find(x => x.id === parseInt(btn.dataset.id));
    addToCart(p, tamanho, qty, { cor, corNao });
  });
});
  grid.querySelectorAll('.product-card').forEach(card => {
  const slides = card.querySelectorAll('.slide');
  let current = 0;
  const variants = [];
  slides.forEach(s => variants.push(s));
  const dotEls = card.querySelectorAll('.slide-dots .dot');
  function syncDots() {
    dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  card.querySelector('.slide-prev')?.addEventListener('click', e => {
    e.stopPropagation();
    slides[current].style.display = 'none';
    current = (current - 1 + slides.length) % slides.length;
    slides[current].style.display = 'block';
const btnAdd = card.querySelector('.btn-add'); if (btnAdd) btnAdd.dataset.id = slides[current].querySelector('img').dataset.id;   card.querySelector('.card-color-label').textContent = slides[current].querySelector('.slide-color').textContent;
syncDots();
   });
  card.querySelector('.slide-next')?.addEventListener('click', e => {
    e.stopPropagation();
    slides[current].style.display = 'none';
    current = (current + 1) % slides.length;
    slides[current].style.display = 'block';
    card.querySelector('.card-color-label').textContent = slides[current].querySelector('.slide-color').textContent;
  const btnAdd = card.querySelector('.btn-add'); if (btnAdd) btnAdd.dataset.id = parseInt(slides[current].querySelector('img').dataset.id || slides[current].querySelector('img').alt);
  syncDots();
});
if (slides.length > 1) {
  card.querySelector('.card-img-wrap').addEventListener('mouseenter', () => {
    slides[current].style.display = 'none';
    current = (current + 1) % slides.length;
    slides[current].style.display = 'block';
    card.querySelector('.card-color-label').textContent = slides[current].querySelector('.slide-color').textContent;
    const btnAdd = card.querySelector('.btn-add'); if (btnAdd) btnAdd.dataset.id = slides[current].querySelector('img').dataset.id;
    syncDots();
  });
}let touchStartX = 0;
card.querySelector('.card-img-wrap').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
card.querySelector('.card-img-wrap').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) < 30) return;
  slides[current].style.display = 'none';
  current = diff > 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length;
  slides[current].style.display = 'block';
  card.querySelector('.card-color-label').textContent = slides[current].querySelector('.slide-color').textContent;
  const btnAdd = card.querySelector('.btn-add'); if (btnAdd) btnAdd.dataset.id = slides[current].querySelector('img').dataset.id;
  syncDots();
});
});

}

async function openSizeModal(id) {
  const p = products.find(x => x.id === id);
  const { data: estoqueData } = await supabaseClient
  .from('estoque')
  .select('*')
  .eq('produto_id', p.id);
  if (!p) return;
  currentProduct = p;
  currentQty = 1;
  selectedSize = null;

  // Cores candidatas: mesmo nome do produto e marcadas como disponíveis
  const candidatas = products.filter(x => x.name === p.name && x.inStock);

  // Busca o estoque de TODAS as candidatas de uma vez só
  const idsCandidatas = candidatas.map(v => v.id);
  const { data: estoqueTodasCores } = await supabaseClient
    .from('estoque')
    .select('*')
    .in('produto_id', idsCandidatas);

  // Só entra na lista de cores quem tem pelo menos 1 unidade em algum tamanho
  const irmaos = candidatas.filter(v => {
    const itensDoProduto = (estoqueTodasCores || []).filter(e => e.produto_id === v.id);
    const totalUnidades = itensDoProduto.reduce((acc, e) => acc + (e.quantidade || 0), 0);
    return totalUnidades > 0;
  });

  const colorOpts = document.getElementById('colorOptions');
  colorOpts.innerHTML = irmaos.map(v => `
    <button class="color-opt ${v.id === p.id ? 'selected' : ''}" data-id="${v.id}">${v.color}</button>
  `).join('');
  colorOpts.querySelectorAll('.color-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      openSizeModal(parseInt(btn.dataset.id));
    });
  });
  document.getElementById('modalImg').src = p.imgF;
  document.getElementById('modalImg').alt = p.name;
  document.getElementById('modalName').textContent = `${p.name} — ${p.color}`;
  document.getElementById('modalPrice').textContent = fmt(p.price);
  document.getElementById('qtyValue').textContent = 1;

  const opts = document.getElementById('sizeOptions');
opts.innerHTML = p.sizes.map(s => {
  const estoqueItem = estoqueData ? estoqueData.find(e => e.tamanho === s) : null;
  const qtd = estoqueItem ? estoqueItem.quantidade : 0;
  const semEstoque = qtd <= 0;
  return `<button class="size-opt ${semEstoque ? 'disabled' : ''}" data-size="${s}" ${semEstoque ? 'disabled' : ''}>${s} <span class="size-stock">(${qtd} un.)</span></button>`;
}).join('');

  opts.querySelectorAll('.size-opt:not(.disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      opts.querySelectorAll('.size-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;

      supabaseClient
  .from('estoque')
  .select('quantidade')
  .eq('produto_id', currentProduct.id)
  .eq('tamanho', selectedSize)
  .single()
  .then(({ data }) => {
    currentProduct.stock = data ? data.quantidade : 0;
    currentQty = 1;
    document.getElementById('qtyValue').textContent = 1;
  });
    });
  });

  document.getElementById('sizeModalOverlay').classList.add('open');
}

document.getElementById('sizeModalClose').addEventListener('click', () => {
  document.getElementById('sizeModalOverlay').classList.remove('open');
});

document.getElementById('sizeModalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (currentQty > 1) { currentQty--; document.getElementById('qtyValue').textContent = currentQty; }
});

document.getElementById('qtyPlus').addEventListener('click', () => {
  if (currentQty < currentProduct.stock){ currentQty++; }
  document.getElementById('qtyValue').textContent = currentQty;
});

document.getElementById('btnAddCart').addEventListener('click', () => {
  if (!selectedSize) {
    document.getElementById('sizeOptions').querySelectorAll('.size-opt').forEach(b => {
      b.style.animation = 'none';
      b.offsetHeight;
      b.style.animation = 'shake 0.3s ease';
    });
    alert('Por favor, selecione um tamanho antes de adicionar ao carrinho.');
    return;
  }
  addToCart(currentProduct, selectedSize, currentQty);
  document.getElementById('sizeModalOverlay').classList.remove('open');
});

// ── CARRINHO ─────────────────────────────────────
function addToCart(product, size, qty, encomenda = null) {
  const key = `${product.id}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
  if (encomenda) {
  existing.qty += qty;
} else {
  existing.qty = Math.min(existing.qty + qty, existing.product.stock);
}
  } else {
    cart.push({ key, product, size, qty, encomenda });
  }
  updateCart();
  openCart();
}



 function updateCart() {
  const count = cart.reduce((a, i) => a + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <img class="cart-item-img" src="${item.product.imgF}" alt="${item.product.name}" />
      <div class="cart-item-info">
        <p class="cart-item-name">${item.product.name}</p>
        <p class="cart-item-detail">${item.product.color} • Tam: ${item.size}</p>
        <p class="cart-item-price">${fmt(item.product.price * item.qty)}</p>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-sm" data-action="minus" data-key="${item.key}"><i class="fas fa-minus"></i></button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-sm" data-action="plus" data-key="${item.key}"><i class="fas fa-plus"></i></button>
          </div>
          <button class="btn-remove-item" data-key="${item.key}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  `).join('');


  const total = cart.reduce((a, i) => a + i.product.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = fmt(total);

  // eventos
itemsEl.querySelectorAll('.qty-sm').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = cart.find(i => i.key === btn.dataset.key);
      if (!item) return;
      if (btn.dataset.action === 'minus') { item.qty = Math.max(1, item.qty - 1); }
      else if (item.encomenda || item.qty < item.product.stock) { item.qty++; }
      updateCart();
    });
  });
  itemsEl.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      cart = cart.filter(i => i.key !== btn.dataset.key);
      updateCart();
    });
  });
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// ── CHECKOUT ─────────────────────────────────────
document.getElementById('btnCheckout').addEventListener('click', () => {
  closeCart();
  // reset form
  document.querySelectorAll('input[name="payment"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="delivery"]').forEach(r => r.checked = false);
  document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('storeAddressBox').style.display = 'none';
  document.getElementById('deliveryAddressBox').style.display = 'none';
  document.getElementById('deliveryAddress').value = '';
  document.getElementById('checkoutError').style.display = 'none';

  // Mostra o aviso de encomenda só se tiver item de encomenda no carrinho
  const temEncomenda = cart.some(i => i.encomenda);
  document.getElementById('checkoutEncomendaSection').style.display = temEncomenda ? 'flex' : 'none';
  document.getElementById('checkoutEncomendaConfirm').checked = false;

  document.getElementById('checkoutModalOverlay').classList.add('open');
});

document.getElementById('checkoutModalClose').addEventListener('click', () => {
  document.getElementById('checkoutModalOverlay').classList.remove('open');
});

document.getElementById('checkoutModalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
});

// Opção cards interativos
document.querySelectorAll('.option-card').forEach(card => {
  card.addEventListener('click', () => {
    const radio = card.querySelector('input[type="radio"]');
    const name = radio.name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
      r.closest('.option-card').classList.remove('selected');
    });
    radio.checked = true;
    card.classList.add('selected');

    if (name === 'delivery') {
      const val = radio.value;
      document.getElementById('storeAddressBox').style.display = val === 'Retirada' ? 'flex' : 'none';
      document.getElementById('deliveryAddressBox').style.display = val === 'Entrega' ? 'block' : 'none';
    }
  });
});

// ── ENVIO WHATSAPP ────────────────────────────────
document.getElementById('btnSendWhatsapp').addEventListener('click', () => {
  const payment = document.querySelector('input[name="payment"]:checked');
  const delivery = document.querySelector('input[name="delivery"]:checked');
  const errorEl = document.getElementById('checkoutError');

  errorEl.style.display = 'none';

  if (!payment) { showError('Por favor, selecione a forma de pagamento.'); return; }
  if (!delivery) { showError('Por favor, selecione retirada ou entrega.'); return; }

  const temEncomenda = cart.some(i => i.encomenda);
  const confirmouEncomenda = document.getElementById('checkoutEncomendaConfirm').checked;
  if (temEncomenda && !confirmouEncomenda) {
    showError('Por favor, confirme que está ciente das condições do item sob encomenda.');
    return;
  }

  let address = '';
  if (delivery.value === 'Entrega') {
    address = document.getElementById('deliveryAddress').value.trim();
    if (!address) { showError('Por favor, informe seu endereço de entrega.'); return; }
  }

  const itensNormais = cart.filter(i => !i.encomenda);
const itensEncomenda = cart.filter(i => i.encomenda);

const itemLines = itensNormais.map(i =>
  `  • ${i.product.name} (${i.product.color}) — Tam: ${i.size} × ${i.qty} = ${fmt(i.product.price * i.qty)}`
).join('\n');

const total = itensNormais.reduce((a, i) => a + i.product.price * i.qty, 0);

let msg = `🛍️ *Novo Pedido – Essência*\n\n`;

if (itensNormais.length > 0) {
  msg += `*Itens do Pedido:*\n${itemLines}\n\n`;
  msg += `*Total:* ${fmt(total)}\n\n`;
}

msg += `💳 *Pagamento:* ${payment.value}\n`;

if (delivery.value === 'Retirada') {
  msg += `🏪 *Modalidade:* Retirada na Loja\n`;
  msg += `📍 *Endereço da Loja:* ${STORE_ADDRESS}\n`;
} else {
  msg += `🚚 *Modalidade:* Entrega\n`;
  msg += `📍 *Endereço de Entrega:* ${address}\n`;
}

if (itensEncomenda.length > 0) {
  msg += `\n\n📋 *Itens sob Encomenda:*\n`;
  itensEncomenda.forEach(i => {
    msg += `  • ${i.product.name} — Tam: ${i.size} | Qtd: ${i.qty} | Cor: ${i.encomenda.cor}`;
    if (i.encomenda.corNao) msg += ` | Cor indesejada: ${i.encomenda.corNao}`;
    msg += '\n';
  });
  msg += `\n⚠️ _A cliente está ciente de que os itens de encomenda ainda serão verificados com o fornecedor. Em até 7 dias retornaremos com a disponibilidade._`;
}

msg += '\n\n_Pedido realizado pelo site Essência_';

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
  document.getElementById('checkoutModalOverlay').classList.remove('open');
});

function showError(msg) {
  const el = document.getElementById('checkoutError');
  el.textContent = msg;
  el.style.display = 'block';
}

// ── NAVEGAÇÃO CATEGORIAS ──────────────────────────
document.querySelectorAll('.cat-btn[data-cat]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.cat);
  });
});

document.querySelectorAll('.subcat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    renderProducts(btn.dataset.cat, btn.dataset.sub);
  });
});


// ── INIT ──────────────────────────────────────────
carregarProdutos().then(() => {
  renderProducts('todos');
  updateCart();
});
