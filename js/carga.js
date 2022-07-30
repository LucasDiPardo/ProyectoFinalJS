const botonCrear= document.querySelector("#btnCrear");
botonCrear.addEventListener("click", crearProducto);

function crearProducto(){ //evento onclick llama aca
    event.preventDefault();
    let nombreProducto= document.querySelector("#nombreProducto").value;
    let talleProducto= document.querySelector("#talleProducto").value;
    let descripcionProducto= document.querySelector("#descripcionProducto").value;
    let precioProducto= document.querySelector("#precioProducto").value;
    let cantidadProducto= document.querySelector("#cantidadProducto").value;
    let codigoProducto=document.querySelector("#codigoProducto").value;
    let linkProducto=document.querySelector("#linkProducto").value;

    
    //validar Campos

    let productoCreado = validarFormulario(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto);

    productoCreado ? camposValidos(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto) : avisoError();
    
}


function avisoError(){
    Toastify({
        text: "COMPLETE LOS CAMPOS",            
        duration: 2000,
        style: {
            background: "linear-gradient(to right, #FFA17F, #141414)",
          }     
    }).showToast();
}


function camposValidos(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto){    
    //agrego producto 
    agregarProductoNuevo(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto); 
    
}

function validarFormulario(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto){

    return ((!!nombreProducto) && (!!talleProducto)&&(!!descripcionProducto)&&(!!precioProducto)&&(!!cantidadProducto)&&(!!codigoProducto)&&(!!linkProducto));    
}



function agregarProductoNuevo(nombre,talle,descripcion,precio,cantidad,codigo,link){
    //en esta funcion estaban los procesos en donde el producto era guardado en el LS, se modifico ya que los productos se encuentran en el json
    Swal.fire({
        title: nombre,
        text: "Descripcion: " + descripcion + ".Talle: "+ talle + ".Precio",
        imageUrl: link,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Imagen Producto',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
    })    
}




