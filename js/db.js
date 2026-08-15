db.collection("platillos").onSnapshot((datos) => {
datos.docChanges().forEach((registro) => {


        if (registro.type === "added"){ 
            mostrarplatillo(registro.doc.data(), registro.doc.id);
           
          
        }
        if (registro.type ==="modified") {
            actualizarPlatillo (registro.doc.data(),registro.doc.id);
        }
    });
});

const formularioAgregar = document.querySelector("form.add-recipe");
formularioAgregar.addEventListener("submit", (e) => {
  e.preventDefault();
  const foto = document.getElementById("foto");
  const platillonuevo = {
    nombre: formularioAgregar.title.value,
    ingredientes: formularioAgregar.ingredients.value,
    precio: formularioAgregar.precio.value,
    foto: foto ? foto.getAttribute("src") : ""
  };
  db.collection("platillos").add(platillonuevo).catch((error) => {
    console.error("Error al agregar el platillo:", error);
  });

formularioAgregar.title.value = "";
formularioAgregar.ingredients.value = "";
formularioAgregar.precio.value = "";
if (foto) {
  foto.setAttribute("src", "");
  foto.style.display = "none";
}

});

