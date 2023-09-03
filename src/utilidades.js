import { catalogo } from './produtos';

export function salvarLocalStorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

export function apagarLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(
  idProduto,
  idContainerHtml,
  quantidadeProduto
) {
  const produto = catalogo.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById(idContainerHtml);

  const elementoArticle = document.createElement('article');
  const articleClasses = [
    'flex',
    'bg-slate-200',
    'rounded-sm',
    'p-1',
    'mb-2',
    'relative',
    'w-96',
  ];
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `
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
      <p id="quantidade-${produto.id}" class="text-slate-700">
        ${quantidadeProduto}
      </p>
    </div>
  `;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);
}
