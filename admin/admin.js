// =============================================
//  PAINEL ADMIN — Essência
//  Usa o supabaseClient definido em config.js
// =============================================

const BUCKET_IMAGENS = 'produtos';

// ---------- Elementos ----------
const telaLogin = document.getElementById('telaLogin');
const telaPainel = document.getElementById('telaPainel');
const formLogin = document.getElementById('formLogin');
const loginErro = document.getElementById('loginErro');
const btnSair = document.getElementById('btnSair');

const corpoTabela = document.getElementById('corpoTabela');
const resumoProdutos = document.getElementById('resumoProdutos');
const btnNovoProduto = document.getElementById('btnNovoProduto');

const filtroBusca = document.getElementById('filtroBusca');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroEstoque = document.getElementById('filtroEstoque');

const modalProduto = document.getElementById('modalProduto');
const formProduto = document.getElementById('formProduto');
const modalTitulo = document.getElementById('modalTitulo');
const produtoErro = document.getElementById('produtoErro');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnCancelarModal = document.getElementById('btnCancelarModal');
const btnSalvarProduto = document.getElementById('btnSalvarProduto');

let produtosCache = [];

// ---------- Sessão ----------
verificarSessao();

async function verificarSessao() {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    mostrarPainel();
  } else {
    mostrarLogin();
  }
}

function mostrarLogin() {
  telaLogin.classList.remove('oculto');
  telaPainel.classList.add('oculto');
}

function mostrarPainel() {
  telaLogin.classList.add('oculto');
  telaPainel.classList.remove('oculto');
  carregarProdutosAdmin();
}

// ---------- Login / Logout ----------
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginErro.textContent = '';

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    loginErro.textContent = 'E-mail ou senha inválidos.';
    return;
  }

  formLogin.reset();
  mostrarPainel();
});

btnSair.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  mostrarLogin();
});

// ---------- Listagem ----------
async function carregarProdutosAdmin() {
  corpoTabela.innerHTML = '<tr><td colspan="8">Carregando...</td></tr>';

  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    corpoTabela.innerHTML = '<tr><td colspan="8">Erro ao carregar produtos.</td></tr>';
    return;
  }

  produtosCache = data;
  aplicarFiltros();
}

function aplicarFiltros() {
  const busca = filtroBusca.value.trim().toLowerCase();
  const categoria = filtroCategoria.value;
  const estoque = filtroEstoque.value;

  let lista = produtosCache.filter((p) => {
    if (busca && !p.name.toLowerCase().includes(busca)) return false;
    if (categoria && p.category !== categoria) return false;
    if (estoque === 'disponivel' && !p.in_stock) return false;
    if (estoque === 'encomenda' && p.in_stock) return false;
    return true;
  });

  resumoProdutos.textContent = `${lista.length} produto(s) — ${produtosCache.filter(p => p.in_stock).length} disponíveis, ${produtosCache.filter(p => !p.in_stock).length} sob encomenda`;

  if (lista.length === 0) {
    corpoTabela.innerHTML = '<tr><td colspan="8">Nenhum produto encontrado.</td></tr>';
    return;
  }

  corpoTabela.innerHTML = lista.map(linhaProduto).join('');

  document.querySelectorAll('[data-editar]').forEach((btn) =>
    btn.addEventListener('click', () => abrirModalEdicao(btn.dataset.editar))
  );
  document.querySelectorAll('[data-excluir]').forEach((btn) =>
    btn.addEventListener('click', () => excluirProduto(btn.dataset.excluir))
  );
}

[filtroBusca, filtroCategoria, filtroEstoque].forEach((el) =>
  el.addEventListener('input', aplicarFiltros)
);

function linhaProduto(p) {
  const precoFormatado = Number(p.price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return `
    <tr>
      <td><img class="thumb" src="${p.img_f || ''}" alt="${p.name}" /></td>
      <td>${p.name}</td>
      <td>${p.color || '-'}</td>
      <td>${p.category}${p.sub ? ' / ' + p.sub : ''}</td>
      <td>${precoFormatado}</td>
      <td>${p.stock}</td>
      <td><span class="badge ${p.in_stock ? 'disponivel' : 'encomenda'}">${p.in_stock ? 'Disponível' : 'Sob encomenda'}</span></td>
      <td class="acoes-linha">
        <button class="btn-secundario" data-editar="${p.id}">Editar</button>
        <button class="btn-excluir" data-excluir="${p.id}">Excluir</button>
      </td>
    </tr>
  `;
}

// ---------- Modal: abrir / fechar ----------
document.getElementById('btnAdicionarTamanho').addEventListener('click', () => {
  const div = document.createElement('div');
  div.className = 'tamanho-linha';
  div.innerHTML = '<input type="text" placeholder="Tamanho (ex: P/S)" class="tamanho-nome" /><input type="number" placeholder="Qtd" min="0" class="tamanho-qtd" /><button type="button" class="btn-remover-tamanho">✕</button>';
  div.querySelector('.btn-remover-tamanho').addEventListener('click', () => div.remove());
  document.getElementById('tamanhosList').appendChild(div);
});
btnNovoProduto.addEventListener('click', abrirModalNovo);
btnFecharModal.addEventListener('click', fecharModal);
btnCancelarModal.addEventListener('click', fecharModal);

function abrirModalNovo() {
  formProduto.reset();
  document.getElementById('tamanhosList').innerHTML = '<div class="tamanho-linha"><input type="text" placeholder="Tamanho (ex: P/S)" class="tamanho-nome" /><input type="number" placeholder="Qtd" min="0" class="tamanho-qtd" /><button type="button" class="btn-remover-tamanho">✕</button></div>';
document.querySelectorAll('.btn-remover-tamanho').forEach(btn => btn.addEventListener('click', () => btn.closest('.tamanho-linha').remove()));
  document.getElementById('produtoId').value = '';
  document.getElementById('produtoDisponivel').checked = true;
  document.getElementById('previewImgF').classList.add('oculto');
  document.getElementById('previewImgT').classList.add('oculto');
  modalTitulo.textContent = 'Novo produto';
  produtoErro.textContent = '';
  modalProduto.classList.remove('oculto');
}

function abrirModalEdicao(id) {
  const p = produtosCache.find((x) => String(x.id) === String(id));
  if (!p) return;

  document.getElementById('produtoId').value = p.id;
  document.getElementById('produtoNome').value = p.name;
  document.getElementById('produtoCor').value = p.color || '';
  document.getElementById('produtoCategoria').value = p.category;
  document.getElementById('produtoSub').value = p.sub || '';
  document.getElementById('produtoPreco').value = p.price;
  document.getElementById('produtoEstoque').value = p.stock;
  carregarTamanhosEdicao(p.id);
  document.getElementById('produtoDisponivel').checked = !!p.in_stock;
  document.getElementById('produtoImgF').value = '';
  document.getElementById('produtoImgT').value = '';

  const previewF = document.getElementById('previewImgF');
  const previewT = document.getElementById('previewImgT');
  if (p.img_f) { previewF.src = p.img_f; previewF.classList.remove('oculto'); } else { previewF.classList.add('oculto'); }
  if (p.img_t) { previewT.src = p.img_t; previewT.classList.remove('oculto'); } else { previewT.classList.add('oculto'); }

  modalTitulo.textContent = 'Editar produto';
  produtoErro.textContent = '';
  modalProduto.classList.remove('oculto');
}
async function carregarTamanhosEdicao(produtoId) {
  const lista = document.getElementById('tamanhosList');
  lista.innerHTML = '';

  const { data, error } = await supabaseClient
    .from('estoque')
    .select('*')
    .eq('produto_id', produtoId);

  if (error || !data || data.length === 0) {
    lista.innerHTML = '<div class="tamanho-linha"><input type="text" placeholder="Tamanho (ex: P/S)" class="tamanho-nome" /><input type="number" placeholder="Qtd" min="0" class="tamanho-qtd" /><button type="button" class="btn-remover-tamanho">✕</button></div>';
    return;
  }

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'tamanho-linha';
    div.innerHTML = `<input type="text" value="${item.tamanho}" class="tamanho-nome" /><input type="number" value="${item.quantidade}" min="0" class="tamanho-qtd" /><button type="button" class="btn-remover-tamanho">✕</button>`;
    div.querySelector('.btn-remover-tamanho').addEventListener('click', () => div.remove());
    lista.appendChild(div);
  });
}

function fecharModal() {
  modalProduto.classList.add('oculto');
}

// ---------- Upload de imagem ----------
async function enviarImagem(arquivo) {
  const extensao = arquivo.name.split('.').pop();
  const nomeArquivo = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extensao}`;

  const { error } = await supabaseClient.storage
    .from(BUCKET_IMAGENS)
    .upload(nomeArquivo, arquivo);

  if (error) throw new Error('Falha ao enviar imagem: ' + error.message);

  const { data } = supabaseClient.storage.from(BUCKET_IMAGENS).getPublicUrl(nomeArquivo);
  return data.publicUrl;
}

// ---------- Salvar (criar ou editar) ----------
formProduto.addEventListener('submit', async (e) => {
  e.preventDefault();
  produtoErro.textContent = '';
  btnSalvarProduto.disabled = true;
  btnSalvarProduto.textContent = 'Salvando...';

  try {
    const id = document.getElementById('produtoId').value;


   // Soma a quantidade de todos os tamanhos preenchidos no formulário
    const somaTamanhos = Array.from(document.querySelectorAll('.tamanho-linha'))
      .reduce((total, linha) => {
        const qtd = parseInt(linha.querySelector('.tamanho-qtd').value) || 0;
        return total + qtd;
      }, 0);

    const payload = {
      name: document.getElementById('produtoNome').value.trim(),
      color: document.getElementById('produtoCor').value.trim(),
      category: document.getElementById('produtoCategoria').value,
      sub: document.getElementById('produtoSub').value || null,
      price: parseFloat(document.getElementById('produtoPreco').value),
      stock: parseInt(document.getElementById('produtoEstoque').value, 10),

      // Só fica "Disponível" se o checkbox estiver marcado E existir estoque de verdade
      in_stock: document.getElementById('produtoDisponivel').checked && somaTamanhos > 0,
    };

    const arquivoF = document.getElementById('produtoImgF').files[0];
    const arquivoT = document.getElementById('produtoImgT').files[0];

    if (arquivoF) payload.img_f = await enviarImagem(arquivoF);
    if (arquivoT) payload.img_t = await enviarImagem(arquivoT);

    let resultado;
    if (id) {
      resultado = await supabaseClient.from('products').update(payload).eq('id', id);
    } else {
      resultado = await supabaseClient.from('products').insert(payload);
    }

    if (resultado.error) throw new Error(resultado.error.message);
    const produtoIdFinal = id || resultado.data?.[0]?.id;
const tamanhoLinhas = document.querySelectorAll('.tamanho-linha');
await supabaseClient.from('estoque').delete().eq('produto_id', produtoIdFinal);
for (const linha of tamanhoLinhas) {
  const tam = linha.querySelector('.tamanho-nome').value.trim();
  const qtd = parseInt(linha.querySelector('.tamanho-qtd').value) || 0;
  if (tam) {
    await supabaseClient.from('estoque').insert({
      produto_id: produtoIdFinal,
      tamanho: tam,
      quantidade: qtd
    });
  }
}

    fecharModal();
    carregarProdutosAdmin();
  } catch (erro) {
    produtoErro.textContent = erro.message || 'Erro ao salvar produto.';
  } finally {
    btnSalvarProduto.disabled = false;
    btnSalvarProduto.textContent = 'Salvar produto';
  }
});

// ---------- Excluir ----------
async function excluirProduto(id) {
  const produto = produtosCache.find((p) => String(p.id) === String(id));
  const confirmar = confirm(`Excluir o produto "${produto?.name}" (${produto?.color})? Essa ação não pode ser desfeita.`);
  if (!confirmar) return;

  const { error } = await supabaseClient.from('products').delete().eq('id', id);
  if (error) {
    alert('Erro ao excluir produto: ' + error.message);
    return;
  }
  carregarProdutosAdmin();
}
