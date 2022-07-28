const produCarrito = document.querySelector("#productosCarrito");
const padre= document.querySelector("#cardDinamica");
const btnConfirmarCompra = document.querySelector("#confirmarCompra");

//const totalCarrito = document.querySelector("#totalCarrito");

if (btnConfirmarCompra){
    btnConfirmarCompra.disabled=true;
    btnConfirmarCompra.addEventListener("click", confirmarCompra)
}

const clickCarro= document.querySelector("#clickCarrito");
if (clickCarro){
    clickCarro.addEventListener("click",mostrarCarrito);
}

window.onload = crearCard();

AOS.init();


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

function confirmarCompra(){    

    Swal.fire({
        title: '¿Desea confirmar Compra?',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {        
        crearChat();
        limpiarLS();
        }
      })
    
}

function crearChat(){
    const carrito= (JSON.parse(localStorage.getItem('carroCompras'))) || [];
    let telefono='5492346408404';
    let pedidos='';
    let total=0;

    pedidos+='Gracias por realizar su compra en ZetaIndumentaria. Hemos recibido su pedido, a continuación le dejamos un resumen de los productos comprados. \n';
    pedidos+='*———————PEDIDO——————* \n';

    carrito.forEach(producto =>{
        total+=parseInt(producto.precio);
        pedidos+= '*'+ producto.nombre + '*, Talle: '+ producto.talle + ', Precio: $'+ producto.precio + '. \n';
    });

    pedidos+='----------------------------- \n';
    pedidos+= '*Total: $' + total + '*\n';

    
    console.log(pedidos);

    let url= "https://api.whatsapp.com/send?phone="+telefono+"&text="+ encodeURIComponent(pedidos);

    window.location=url;
}


function limpiarLS(){
    

    localStorage.clear();

    let timerInterval
    Swal.fire({
    title: '¡PEDIDO CONFIRMADO!',
    html: 'Aguarde, lo estamos redirigiendo.',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        //console.log(window.location.href = 'index.html');        
    })
}

function agregarCarrito(unCodigoProducto){
    btnConfirmarCompra.disabled=false;
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
    avisoProductoAgregado();
    
}

function eliminarProductoCarrito(unCodigoProducto){    
    
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

    if (carrito.length==0){
        btnConfirmarCompra.disabled=true;
    }
    
    mostrarCarrito(); //para que recargue y actualice el div que muestra los productos
}

function mostrarCarrito(){
    const carrito= (JSON.parse(localStorage.getItem('carroCompras'))) || [];
    const tot=0;

    if (carrito.length!=0){
        btnConfirmarCompra.disabled=false;
    }else{
        btnConfirmarCompra.disabled=true;
    }
    produCarrito.innerHTML=``;
    
    for (const arrayProd of carrito) {    
        
        produCarrito.innerHTML+= `
        <div>
            <hr>          
            <div class="d-flex justify-content-between">
                <h4 class="text-primary ">
                    ${arrayProd.nombre} 
                </h4>     
                <button class="eliminarProducto bg-transparent rounded-3" data-id="(${arrayProd.codigo})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
            
            <h6 class="text-secondary ">
                Descripcion: ${arrayProd.descripcion}
            </h6>
            <h6 class="text-secondary ">
                Codigo: ${arrayProd.codigo}
            </h6>
            <h6 class="text-secondary ">
                Precio:$ ${arrayProd.precio}
            </h6>
        </div>
        `        
    }


    const [...btns1] = document.getElementsByClassName('eliminarProducto'); //convierte en array
    
    btns1.forEach((elm) => {
        elm.addEventListener("click", (e)=>{
            eliminarProductoCarrito(e.target.getAttribute('data-id'));
        })
    })
    /*
    carrito.foreach(producto=>{
        tot+=parseInt(producto.precio); 
    });

    totalCarrito.innerHTML=``;
    totalCarrito.innerHTML= `
    <div>
        <h6 class="text-secondary ">
            Total:$ ${tot}
        </h6>
    </div>                
    `;
    */
}


function crearCard(){       
    let html="";
    padre.innerHTML= html;
    
    const prodcutosJson = '../js/productos.json';
    
    const importarProductos = async () => {
        const respuesta= await fetch(prodcutosJson)
        const productos = await respuesta.json() //convierte la respuesta como un json

        for (const arrayProd of productos) { //recorro el array y voy creando div            
            
            html = `
            <div class="col-sm-12 card p-2 m-1" style="width: 18rem;">
                <img src="${arrayProd?.link}" class="card-img-top img-fluid h-50" alt="...">
                <div class="card-body">
                
                    <h5 class="card-title">
                        ${arrayProd?.nombre}
                    </h5>

                    <p class="card-text">
                        ${arrayProd?.descripcion}
                    </p>

                    <p class="card-text">
                        Precio:$ ${arrayProd?.precio}
                    </p>

                    <div class="d-flex justify-content-center mt-2">

                        <button class="btnAgregarCarrito btn btn-dark m-1" data-id="${arrayProd.codigo}" >
                            AGREGAR AL CARRITO
                        </button>
                    </div>           
                </div>
            </div>`;        
            padre.innerHTML+= html;
        }

        const [...btns] = document.getElementsByClassName('btnAgregarCarrito'); //convierte en array

        btns.forEach((elm) => {
        elm.addEventListener("click", (e)=>{
            agregarCarrito(e.target.getAttribute('data-id'));
        })
    })
    }

    importarProductos();
}


function avisoProductoAgregado(){
    Toastify({
        text: "Agregado al Carrito",
        position: 'left',
        style: {
          background: "linear-gradient(to right, #00ff33, #141414)",
        }
      }).showToast();
}
