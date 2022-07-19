
const botonCrear= document.querySelector("#btnCrear");
const botonImprimir= document.querySelector("#btnImprimir");
/*
const btnAgregarCarrito= document.querySelector("#btnAgregarCarrito");
btnAgregarCarrito.addEventListener("click",agregarCarrito);
*/
botonImprimir.addEventListener("click", imprimirTodoElArray);

botonCrear.addEventListener("click", crearProducto);




function crearProducto(){ //evento onclick llama aca
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
    
    //reseteo los campos
    
    let formulario = document.querySelector("#formularioCarga");
    formulario.addEventListener('submit', function() {
    formulario.reset();
    });

    
    
}


function validarFormulario(nombreProducto, talleProducto, descripcionProducto, precioProducto,cantidadProducto,codigoProducto,linkProducto){

    return ((!!nombreProducto) && (!!talleProducto)&&(!!descripcionProducto)&&(!!precioProducto)&&(!!cantidadProducto)&&(!!codigoProducto)&&(!!linkProducto));    
}



function agregarProductoNuevo(unProductoNuevo){  
    
    let arrayStock = JSON.parse(localStorage.getItem('totalStock')) || [];
    
    arrayStock.push(unProductoNuevo);
    let arrayJSON= JSON.stringify(arrayStock);

    
    localStorage.setItem('totalStock', arrayJSON); //agrego al ls la cadena json
      
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

function imprimirTodoElArray(){
    let arrayStock = JSON.parse(localStorage.getItem('totalStock')) || [];
    console.log("---Imprimir Array del LS---");
    console.log(...arrayStock);
}




