import { catalogo } from './produtos';
import { lerLocalStorage, salvarLocalStorage } from './utilidades';

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho() {
  document.getElementById('carrinho').classList.remove('right-[-360px]');
  document.getElementById('carrinho').classList.add('right-[0px]');
}

function fecharCarrinho() {
  document.getElementById('carrinho').classList.remove('right-[0px]');
  document.getElementById('carrinho').classList.add('right-[-360px]');
}

function irParaCheckout() {
  if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href = './checkout.html';
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById('fechar-carrinho');
  const botaoAbrirCarrinho = document.getElementById('abrir-carrinho');
  const botaoIrParaCheckout = document.getElementById('finalizar-compra');

  botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
  botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
  botaoIrParaCheckout.addEventListener('click', irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  atualizarPrecoCarrinho();
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  atualizarPrecoCarrinho();
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  atualizarPrecoCarrinho();
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById('produtos-carrinho');

  const elementoArticle = document.createElement('article');
  const articleClasses = [
    'flex',
    'bg-slate-100',
    'rounded-sm',
    'p-1',
    'relative',
  ];
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `
    <button id="remover-item-${produto.id}" class="absolute top-1 right-2">
      <i class="text-slate-950 fa-solid fa-circle-xmark"></i>
    </button>
    <img
      src="./assets/img/${produto.imagem}"
      alt="Carrinho: Imagem do produto ${produto.nome}"
      class="h-24 rounded-l-lg"
    />
    <div class="flex flex-col justify-between p-3">
      <p class="text-sm font-bold text-slate-600 hover:text-slate-900">
        ${produto.nome}
      </p>
      <p class="text-sm text-slate-400">Tamanho: ${produto.tamanho.medio}</p>
      <p class="text-slate-700 font-bold">R$ ${produto.preco}</p>
    </div>
    <div class="flex text-slate-500 text-lg items-end gap-2 absolute bottom-1 right-2">
    <button id='decrementar-produto-${produto.id}'>
      <i class="fa-solid fa-circle-minus"></i>
    </button>
    <p id="quantidade-${produto.id}" class="text-slate-700">
      ${idsProdutoCarrinhoComQuantidade[produto.id]}
    </p>
    <button id='incrementar-produto-${produto.id}'>
      <i class="fa-solid fa-circle-plus"></i>
    </button>
    </div>
  `;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById('produtos-carrinho');
  containerProdutosCarrinho.innerHTML = '';

  for (const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    return;
  }

  idsProdutoCarrinhoComQuantidade[idProduto] = 1;
  atualizarPrecoCarrinho();
  salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById('preco-total');
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Valor Total: R$ ${precoTotalCarrinho}`;
}
