document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});

let contenidoLista = '';

db.collection("platillos").onSnapshot((datos) => {
  datos.docChanges().forEach((registro) => {
    if (registro.type === "added"){
      agregarALista(registro.doc.data(), registro.doc.id)
    }
  });
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems, {});
})

function agregarALista(platillo, id){
  contenidoLista += `<option value='${id}'>${platillo.nombre}</option>`;
  document.getElementById('listaPlatillos').innerHTML = contenidoLista;
}

M.AutoInit();

document.getElementById('btnUbicacion').addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exito, error); 
      
    ;
  }
});


function exito(posicion) {
  let latitud = posicion.coords.latitude;
  let longitud = posicion.coords.longitude;
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud} `, {
    headers: {
      'User-Agent': 'UberEatscudeceliseo/1.0 (eliseogamer64@gmail.com)'
    }
  })
  .then(respuesta => respuesta.json())
  .then(data => alert(data.display_name))
  .catch(error =>  console.error(error));
  
}
function error() {
  M.toast({html: 'No se pudo obtener la ubicación'});
}
document.getElementById('btnGuardar').addEventListener('click', async () => {
  const select = document.getElementById('listaPlatillos');
  const platilloId = select.value;
  const direccion = document.getElementById('title').value.trim();

  if (!platilloId) {
    M.toast({html: 'Selecciona un platillo'});
    return;
  }
  if (!direccion) {
    M.toast({html: 'Ingresa una dirección'});
    return;
  }

  try {
    await db.collection('pedidos').add({
      platilloId: platilloId,
      direccion: direccion,
    
     
    });

    M.toast({html: 'Pedido guardado correctamente'});
    window.location.href = '/';
  } catch (error) {
    console.error('Error al guardar el pedido:', error);
    M.toast({html: 'Ocurrió un error al guardar'});
  }
});

document.getElementById('btnCancelar').addEventListener('click', () => {
  window.location.href = '/';
});