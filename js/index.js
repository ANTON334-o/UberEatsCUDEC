document.addEventListener('DOMContentLoaded', function() {

  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });

  // formulario
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });

  const btnAgregarPlatillo =
    document.getElementById('btnAgregarplatillo');

  btnAgregarPlatillo.addEventListener('click', function() {
    alert('Platillo agregado');
  });

});