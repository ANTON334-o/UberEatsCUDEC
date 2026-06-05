let contenido = "";
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

function mostrarplatillo(platillo,  id) {
   contenido += 
   `<div class="card-panel recipe white row" data-id="${id}">
   <div class="recipe-details">
   <div class="recipe-title">
   ${platillo.nombre}
   </div>
  <div class="recipe-ingredients">
     ${platillo.ingredientes}
  </div>
  
   <div class="recipe-title">
   Precio: $${platillo.precio}
  </div>
  </div>
  <div class="recipe-delete">
  <i class="material-icons" data-id="${id}"
  >delete_outline</i>
  </div>
  </div>`;


  document.querySelector('.recipes').innerHTML = contenido;
}

