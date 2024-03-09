function closeNavbar() {
  // Fecha a barra de navegação quando um item é clicado
  document.getElementById('navbarSideCollapse').click();
}
function openCartModal() {
  // Fecha a barra de navegação
  closeNavbar();

  // Abre o modal do carrinho
  $('#carrinhoModal').modal('show');
}
