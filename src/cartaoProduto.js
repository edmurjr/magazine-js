import { adicionarAoCarrinho } from './menuCarrinho';
import { catalogo } from './produtos';

export function renderizarCatalogo() {
  for (const produto of catalogo) {
    const cartaoProduto = `
            <div
                class="flex justify-start bg-slate-50 shadow-xl shadow-slate-400 rounded-lg w-[305px] p-1.5 group
                ${produto.feminino ? 'feminino' : 'masculino'}"
                id="card-produto-${produto.id}"
            >
                <img 
                    class="rounded rounded-tl-lg rounded-tr-lg h-[190px] group-hover:scale-[109%] duration-200"
                    src="./assets/img/${produto.imagem}" 
                    alt="Produto ${produto.nome} do Magazine" 
                />
                <div class="flex flex-col justify-between p-3">
                    <div class="flex flex-col justify-between">
                        <p class="text-lg font-bold">${produto.marca}</p>
                        <p class="text-[15px]">${produto.nome}</p>
                        <p class="text-[12px] pt-2">Tamanhos: ${tamanhos(
                          produto.tamanho
                        )} </p>
                    </div>
                    <div class="flex flex-col justify-between w-[155px]">
                        <p class="text-lg font-bold">R$ ${produto.preco}</p>
                        <button
                            id="adicionar-${produto.id}"
                            class="border-solid border-2 bg-slate-700 text-slate-100 hover:text-slate-300 hover:bg-slate-500 rounded-md"
                        >
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
          `;
    document.getElementById('container-produto').innerHTML += cartaoProduto;
  }

  for (const produto of catalogo) {
    document
      .getElementById(`adicionar-${produto.id}`)
      .addEventListener('click', () => adicionarAoCarrinho(produto.id));
  }
}

function tamanhos(tamanhos) {
  let textoTamanhos = '';
  for (let i = 0; i < tamanhos.length; i++) {
    textoTamanhos += tamanhos[i] + (i + 1 < tamanhos.length ? ' | ' : '');
  }
  return textoTamanhos;
}
