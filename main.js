import { renderizarCatalogo } from './src/cartaoProduto';
import { inicializarFiltros } from './src/filtrosCatalogo';
import {
  inicializarCarrinho,
  atualizarPrecoCarrinho,
  renderizarProdutosCarrinho,
} from './src/menuCarrinho';

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
