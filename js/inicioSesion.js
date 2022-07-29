const btnInicio = document.getElementById("btnInicio");

btnInicio.addEventListener("click", iniciarSesion);




function iniciarSesion(){
    event.preventDefault();
    let nomUser= document.querySelector("#nombreUsuario").value;
    let contraUser= document.querySelector("#contraUsuario").value;

    
    let chequear = valido(nomUser, contraUser);

    chequear ? datosValidos(nomUser, contraUser) : avisoError();
}

function mensaje(undato){
    Toastify({
        text: "undato",            
        duration: 2000        
    }).showToast();
}

function valido(nombreUser, contraUSer){
    return ((!!nombreUser) && (!!contraUSer));    
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

function avisoError2(){
    Toastify({
        text: "Usuario o Contraseña no coincide",            
        duration: 2000,style: {
            background: "linear-gradient(to right, #FFA17F, #141414)",
          }     
    }).showToast();
}



function datosValidos(unNombre, unaContra){

    const usuariosJson = '../js/usuarios.json';

    const importarUsuarios = async () => {
        const respuesta= await fetch(usuariosJson)
        const usuarios = await respuesta.json()

        const usuarioValido = usuarios.find((elemento)=> (elemento.usuario == unNombre) && (elemento.contra == unaContra));

        usuarioValido ? redirigirPagina() : avisoError2();
    }

    importarUsuarios();

}



function redirigirPagina(){

    let timerInterval
    Swal.fire({
    title: '¡Excelente!',
    html: 'Aguarde, lo estamos redirigiendo.',
    timer: 2000,
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
        console.log(window.location.href = '/pages/carga.html');        
    })

    
}