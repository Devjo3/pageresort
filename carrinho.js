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

   // Função para atualizar o conteúdo do carrinho na interface do usuário
  function atualizarConteudoCarrinho() {
    let carrinhoItensHTML = '';
    let totalCarrinho = 0;

    // Percorre os itens do carrinho e cria a estrutura HTML
    for (let item of carrinho) {
      carrinhoItensHTML += `
        <div class="row mb-2">
          <div class="col">${item.nome}</div>
          <div class="col">Quantidade: ${item.quantidade}</div>
          <div class="col">Preço: R$ ${item.preco.toFixed(2)}</div>
        </div>
      `;
      // Atualiza o total do carrinho
      totalCarrinho += item.preco * item.quantidade;
    }

    // Atualiza o conteúdo do carrinho no modal
    document.getElementById('carrinhoItens').innerHTML = carrinhoItensHTML;
    document.getElementById('totalCarrinho').innerText = totalCarrinho.toFixed(2);
  }