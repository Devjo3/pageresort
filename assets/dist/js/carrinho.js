// Estrutura de dados para o carrinho
let carrinho = [];

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(event, idProduto) {

  event.preventDefault();

  // Encontre o produto pelo ID
  let produto = {
    id: idProduto,
    nome: document.getElementById(`nome-${idProduto}`).innerText,
    preco: parseFloat(document.getElementById(`preco-${idProduto}`).innerText.replace('R$', '').trim()),
    quantidade: 1
  };

  // Verifique se o produto já está no carrinho
  let produtoExistente = carrinho.find(item => item.id === idProduto);

  if (produtoExistente) {
    // Se o produto já estiver no carrinho, aumente a quantidade
    produtoExistente.quantidade++;
  } else {
    // Se o produto ainda não estiver no carrinho, adicione-o
    carrinho.push(produto);
  }

  // Atualize o conteúdo do carrinho na interface do usuário
  atualizarConteudoCarrinho();
}

function atualizarConteudoCarrinho() {
  let carrinhoItensHTML = '';
  let totalCarrinho = 0;

  // Percorre os itens do carrinho e cria a estrutura HTML
  for (let index in carrinho) {
    const item = carrinho[index];
    carrinhoItensHTML += `
              <div class="row mb-2">
                  <div class="col">${item.nome}</div>
                  <div class="col">
                      <!-- Seletor de quantidade -->
                      <select class="form-select form-select-sm" onchange="atualizarQuantidade(${index}, this.value)">
                          ${criarOpcoesDeQuantidade(item.quantidade)}
                      </select>
                  </div>
                  <div class="col">Preço: R$ ${item.preco.toFixed(2)}</div>
                  <div class="col">
                      <!-- Botão de exclusão -->
                      <button class="btn btn-danger btn-excluir-item" onclick="removerDoCarrinho(${index})">Excluir</button>
                  </div>
              </div>
          `;
    // Atualiza o total do carrinho
    totalCarrinho += item.preco * item.quantidade;
  }

  // Atualiza o conteúdo do carrinho no modal
  document.getElementById('carrinhoItens').innerHTML = carrinhoItensHTML;
  document.getElementById('totalCarrinho').innerText = totalCarrinho.toFixed(2);

  // Se o carrinho estiver vazio, exibir a mensagem de carrinho vazio
  if (carrinho.length === 0) {
    document.getElementById('carrinhoVazioMsg').style.display = 'block';
    document.getElementById('btnFinalizarCompra').style.display = 'none';
  } else {
    document.getElementById('carrinhoVazioMsg').style.display = 'none';
    document.getElementById('btnFinalizarCompra').style.display = 'block';
  }
}

function criarOpcoesDeQuantidade(quantidadeSelecionada) {
  let opcoesHTML = '';
  for (let i = 1; i <= 10; i++) {
    if (i === quantidadeSelecionada) {
      opcoesHTML += `<option value="${i}" selected>${i}</option>`;
    } else {
      opcoesHTML += `<option value="${i}">${i}</option>`;
    }
  }
  return opcoesHTML;
}

function atualizarQuantidade(index, novaQuantidade) {
  carrinho[index].quantidade = parseInt(novaQuantidade);
  atualizarConteudoCarrinho();
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1); // Remove o item do array
  atualizarConteudoCarrinho(); // Atualiza o conteúdo do carrinho na interface do usuário
}
