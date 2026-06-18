let contenidolista = "";
function agregaralista(platillo, id) {
    contenidolista = `<option value='${id}'>
    ${platillo.nombre}
    </option>`;
    document.getElementById('lista-platillos').innerHTML= 
    contenidolista;
}
