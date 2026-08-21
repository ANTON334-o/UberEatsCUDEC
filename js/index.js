let contenido = "";
document.addEventListener('DOMContentLoaded', function() {

  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });


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
   ${platillo.foto ? `<img src="${platillo.foto}" alt="${platillo.nombre}" class="recipe-photo">` : ""}
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
  let tarjeta = document.querySelector('[data-id="' + id + '"]');
  if (!tarjeta) return;
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
      const tarjeta = document.querySelector('[data-id="' + id + '"]');
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
const btnCapturar = document.getElementById('btnCapturar');
const btnVoltear = document.getElementById('btnVoltear');
let facingMode = "environment";
let currentDeviceId = null;
let camaraIniciada = false;

function pararCamara(){
  if (video.srcObject) {
    video.srcObject.getTracks().forEach(function(track){ track.stop(); });
    video.srcObject = null;
    video.load();
  }
}

function abrirStream(constraints){
  streaming = false;
  height = 0;
  video.style.display = "";
  return navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    video.srcObject = stream;
    const intentoReproducir = video.play();
    if (intentoReproducir && intentoReproducir.catch) {
      intentoReproducir.catch(function(){
        setTimeout(function(){ video.play().catch(function(err){ console.log(err); }); }, 150);
      });
    }
    camaraIniciada = true;
    const track = stream.getVideoTracks()[0];
    if (track && track.getSettings) {
      currentDeviceId = track.getSettings().deviceId || currentDeviceId;
    }
  });
}

function iniciarCamara(){
  pararCamara();
  abrirStream({ video: { facingMode: { ideal: facingMode }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false })
    .catch((error) => {
      console.log(error);
    });
}

function voltearCamara(){
  pararCamara();
  navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      const camaras = devices.filter((d) => d.kind === "videoinput");
      if (camaras.length > 1) {
        const indiceActual = camaras.findIndex((d) => d.deviceId === currentDeviceId);
        const siguiente = camaras[(indiceActual + 1) % camaras.length];
        return abrirStream({ video: { deviceId: { exact: siguiente.deviceId }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      }
      
      facingMode = facingMode === "environment" ? "user" : "environment";
      return abrirStream({ video: { facingMode: { exact: facingMode }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false })
        .catch(() => abrirStream({ video: { facingMode: { ideal: facingMode }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false }));
    })
    .catch((error) => {
      console.log(error);
    });
}

btnFoto.addEventListener("click", function(e){
  e.preventDefault();
  foto.setAttribute("src", "");
  foto.style.display = "none";
  iniciarCamara();
});

btnVoltear.addEventListener("click", function(e){
  e.preventDefault();
  if (camaraIniciada) {
    voltearCamara();
  } else {
    facingMode = facingMode === "environment" ? "user" : "environment";
  }
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
  const contexto = canvas.getContext("2d");
  const w = video.videoWidth || width;
  const h = video.videoHeight ? (video.videoHeight / (video.videoWidth / width)) : height;
  if (video.readyState >= 2 && w && h){
    canvas.width = width;
    canvas.height = h;
    contexto.drawImage(video, 0, 0, width, h);
    const fotoFinal = canvas.toDataURL("image/png");
    foto.setAttribute("src", fotoFinal);
    foto.style.display = "block";
    video.style.display = "none";
    if (video.srcObject) {
      video.srcObject.getTracks().forEach(function(track){ track.stop(); });
    }
  } else {
    limpiarFoto();
  }
}

btnCapturar.addEventListener("click", function(e){
  e.preventDefault();
  capturarFoto();
});