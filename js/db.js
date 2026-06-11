db.collection("platillos").onSnapshot((datos)=>{
   datos.forEach((registro) => {
    mostrarplatillo(registro.data(),registro.id);
  
    
   });



});

const formularioAgregar = document.querySelector("form");
formularioAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  const platillonuevo = {
  nombre: formularioAgregar.title.value,
  ingredientes: formularioAgregar.ingredients.value,
  precio: formularioAgregar.precio.value

}
db.collection("platillos").add(platillonuevo).catch((error) => {
  console.error("Error al agregar el platillo: ");
});

formularioAgregar.title.value = "";
formularioAgregar.ingredients.value = "";
formularioAgregar.precio.value = "";


});