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

function actualizarplatillo(platillo, id) {
  let tarjeta = document.getElementById(`${id}`);
  tarjeta.querySelector('.recipe-title').innerHTML = platillo.nombre;
  tarjeta.querySelector('.recipe-ingredients').innerHTML = platillo.ingredientes;
  tarjeta.querySelector('.recipe-title:last-child').innerHTML = `Precio: $${platillo.precio}`;
}



document.querySelector('.recipes').addEventListener('click', function(e) {
  const icono = e.target.closest('.recipe-delete .material-icons');
  if (!icono) return;

  const id = icono.dataset.id;

  db.collection("platillos").doc(id).delete()
    .then(() => {
      const tarjeta = document.getElementById(id);
      if (tarjeta) tarjeta.remove();
      alert('Platillo eliminado');
    })
    .catch((error) => {
      console.log(error);
      alert('Error al eliminar el platillo');
    });
});

let streaming = false;
const width = 100;
let height = 0;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const foto = document.getElementById("foto");
const btnFoto = document.getElementById('btnFoto');
const btnCapturar = document.getElementById('tomarFoto');

btnFoto.addEventListener("click", function(e){
  e.preventDefault();
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: "environment" }
      },
      audio: false
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.log(error);
    });
});

video.addEventListener("canplay", function(){
  if (!streaming){
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute("width", width);
    video.setAttribute("height", height);
    streaming = true;
  }
});

function limpiarFoto(){
  const contexto = canvas.getContext("2d");
  contexto.fillStyle = "#AAA";
  contexto.fillRect(0, 0, canvas.width, canvas.height);
  foto.setAttribute("src", "");
}

function capturarFoto(){
  const contexto = canvas.getContmext("2d");
  if (width && height){
    canvas.width = width;
    canvas.height = height;
    contexto.drawImage(video, 0, 0, width, height);
    const fotoFinal = canvas.toDataURL("image/png");
    foto.setAttribute("src", fotoFinal);
  } else {
    limpiarFoto();
  }
}

btnCapturar.addEventListener("click", function(e){
  e.preventDefault();
  capturarFoto();
});