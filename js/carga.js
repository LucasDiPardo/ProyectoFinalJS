import './main'

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
        duration: 2000        
    }).showToast();
}


function camposValidos(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto){
    
    //creo producto 
    const prod= new Producto(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto);
    
    //agrego producto al LocalStorage
    agregarProductoNuevo(prod);
    desestructuracion(prod);    
    
}

function validarFormulario(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto){

    return ((!!nombreProducto) && (!!talleProducto)&&(!!descripcionProducto)&&(!!precioProducto)&&(!!cantidadProducto)&&(!!codigoProducto)&&(!!linkProducto));    
}



function agregarProductoNuevo(unProductoNuevo){
    //en esta funcion estaban los procesos en donde el producto era guardado en el LS, se modifico ya que los productos se encuentran en el json
    Swal.fire({
        title: unProductoNuevo.nombre,
        text: unProductoNuevo.descripcion,
        imageUrl: unProductoNuevo.link,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Imagen Producto',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
    })    
}



function desestructuracion(unProducto){ //desestructuracion y aplicacion de alias 
    const { nombre:nombreDelProducto , talle:talleDelProducto, descripcion:descripcionDelProducto,precio:precioDelProducto,cantidad:cantidadDeProductos,codigo:codigoDelProducto,link:linkImagenProducto} = unProducto ;

    console.log("----Ulltimo Producto Agregado---");
    console.log(nombreDelProducto);
    console.log(talleDelProducto);
    console.log(descripcionDelProducto);
    console.log(precioDelProducto);
    console.log(codigoDelProducto);
    console.log(linkImagenProducto);
}





