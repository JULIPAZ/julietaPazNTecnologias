const menu =document.querySelector('.hamburguesa');
const overlay =document.querySelector('.overlay');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnArticulados= document.querySelector('.articulado');
const btnOrganizador = document.querySelector('.organizador');
const btnSoportes = document.querySelector('.soportes');
const contenedorProductos= document.querySelector('.productos');



document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    productos();
});
     
const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}


const botonCerrar=()=>{
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const  body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0)return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);

}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.observe(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    
    observer.observe(imagen)
})

const cerrarMenu =(boton,overlay)=>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const productos = ()=>{
    let productoArreglo = [];
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto=> productoArreglo =[...productoArreglo,producto]);

    const articulados = productoArreglo.filter(articulado=> articulado.getAttribute('data-producto') ==='articulado');
    const organizador = productoArreglo.filter(organizador=> organizador.getAttribute('data-producto') ==='organizador');
    const soportes = productoArreglo.filter(soportes=>soportes.getAttribute('data-producto') ==='soportes');

    mostrarProducto(articulados, organizador, soportes, productoArreglo);

}
const mostrarProducto =(articulados, organizadores, soportes, todos)=>{
    btnArticulados.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        articulados.forEach(articulado => contenedorProductos.appendChild(articulado))
    });

    btnOrganizador.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        organizadores.forEach(organizador => contenedorProductos.appendChild(organizador))
    });

    btnSoportes.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        soportes.forEach(soportes =>contenedorProductos.appendChild(soportes))
    });

    btnTodos.addEventListener('click', () => {
        limpiarHtml(contenedorProductos);
        todos.forEach(producto => contenedorProductos.appendChild(producto));
    });
}


const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}
