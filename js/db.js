db.collection("platillos").onSnapshot((datos)=>{
   datos.forEach((registro) => {
    mostrarplatillo(registro.data(),registro.id);
  
    
   });


});
