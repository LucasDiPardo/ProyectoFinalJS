const produCarrito = document.querySelector("#productosCarrito");
const padre= document.querySelector("#cardDinamica");


const clickCarro= document.querySelector("#clickCarrito");

clickCarro.addEventListener("click",mostrarCarrito);


//Clases
class Producto {
    constructor (unNombre, unTalle, unaDescripcion, unPrecio,unStock, unCodigo,unLink){
        this.nombre=unNombre;
        this.talle=unTalle;
        this.descripcion= unaDescripcion;
        this.precio=unPrecio;
        this.stock= unStock;
        this.codigo=unCodigo;
        this.link=unLink;
    }
    //funciones
    toString(){
        let frase= "Producto: " + this.nombre +
            "\nID: "+ this.id +
            "\nTalle: " + this.talle +
            "\nDescripcion: " + this.descripcion +
            "\nPrecio: " + this.precio +  
            "\nStock Disponible: " + this.stock;        
        return frase;
    }
}
//Funciones


function agregarCarrito(unCodigoProducto){
    //traigo carrito o creo
    const carrito= (JSON.parse(localStorage.getItem('carroCompras'))) || [];
    console.log(carrito);
    //traigo productos del .json
    const prodcutosJson = '../js/productos.json';

    //importo, cargo carrito y muestro dinamicamente
    const importarProductos = async () => {
        const respuesta= await fetch(prodcutosJson)
        const productos = await respuesta.json()
        
        let productoEncontrado = productos.find((elemento)=> (elemento.codigo == unCodigoProducto));

        console.log(carrito);
        console.log(productos);
        console.log(productoEncontrado);
        carrito.push(productoEncontrado);
        console.log(carrito);
        
        localStorage.setItem('carroCompras', JSON.stringify(carrito));
    }
    importarProductos();

}

function eliminarCarrito(unCodigoProducto){


    console.log("Entra a la funcion");
    //traigo carrito o creo
    const carrito= (JSON.parse(localStorage.getItem('carroCompras'))) || [];
    //console.log(carrito);

    let posiEncontrado = carrito.indexOf(carrito.find((elemento)=> (elemento.codigo == unCodigoProducto)))

    console.log(carrito);
    console.log(posiEncontrado);
    carrito.splice(posiEncontrado, 1)
    console.log(carrito);
        
    localStorage.setItem('carroCompras', JSON.stringify(carrito));

    mostrarCarrito(); //para que recargue y actualice el div que muestra los productos
}

function mostrarCarrito(){
    const carrito= (JSON.parse(localStorage.getItem('carroCompras'))) || [];

    produCarrito.innerHTML=``;

        for (const arrayProd of carrito) {            
            produCarrito.innerHTML+= `
            <div>
                <hr>          
                <h4 class="text-primary d-flex justify-content-between">
                    ${arrayProd.nombre} 
                    <button id="eliminarProducto" type="button" class="btn-close" onclick="eliminarCarrito(${arrayProd.codigo})">
                    </button>
                </h4>     
                <h6 class="text-secondary ">Descripcion: ${arrayProd.descripcion}</h6>
                <h6 class="text-secondary ">Codigo: ${arrayProd.codigo}</h6>
                <h6 class="text-secondary ">Precio:$ ${arrayProd.precio}</h6>
            </div>
`
        }
}

function crearCard(){


    let html="";

    const prodcutosJson = '../js/productos.json';

    //let arrayStock = JSON.parse(localStorage.getItem('totalStock')) || [];

    const importarProductos = async () => {
        const respuesta= await fetch(prodcutosJson)
        const productos = await respuesta.json() //convierte la respuesta como un json

        for (const arrayProd of productos) { //recorro el array y voy creando div            
                
                html = `
                    <div class="card p-2 m-1" style="width: 18rem;">
                        <img src="${arrayProd?.link}" class="card-img-top img-fluid h-50" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${arrayProd?.nombre}
                            </h5>
                            <p class="card-text">${arrayProd?.descripcion}
                            </p>
                            <p class="card-text">Precio:$ ${arrayProd?.precio}
                            </p>
                            <div class="d-flex justify-content-center mt-2">
                                <button id="btnAgregarCarrito" class="btn btn-dark m-1" onclick="agregarCarrito(${arrayProd.codigo})">
                                AGREGAR AL CARRITO
                                </button>
                            </div>                    
                            
                        </div>
                    </div>`;            
                padre.innerHTML+= html;
        }  
    }

    importarProductos();
}





