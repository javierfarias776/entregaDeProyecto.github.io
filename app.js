const stockProductos = [
    {
    id:1,
    nombre:"God Of War Ragnarok", 
    cantidad: 1,
    desc: "Fantasia, Accion, Mundo Abierto.",
    precio: 25600,
    img:"img/gow.jpeg",
     },
     
     {
        id:2,
        nombre:"Mortal kombat 11", 
        cantidad: 1,
        desc: "Violecia, Accion, Fantasia.",
        precio: 16300,
        img:"img/mK2.jpg",
    },

    {
        id:3,
        nombre:"The Last of us 2", 
        cantidad: 1,
        desc: "Survival, Suspense, Terror.",
        precio: 22100,
        img:"img/theLastOfUs.jpg",
    },

    {
        id:4,
        nombre:"Call Of Duty", 
        cantidad: 1,
        desc: "juego de guerra, Accion, Aventura.",
        precio: 15700,
        img:"img/cod.jpg",
    },

    {
        id:5,
        nombre:"Spiderman", 
        cantidad: 1,
        desc: "Accion, aventura, Mundo libre.",
        precio: 15700,
        img:"img/3.jpg",
    },

    {
        id:6,
        nombre:"Until Dawn", 
        cantidad: 1,
        desc: "Terror, Suspense, Eleccion libre.",
        precio: 10600,
        img:"img/untilDawn.jpg",
    },
    {
        id:7,
        nombre:"Fifa 2022", 
        cantidad: 1,
        desc: "Juego deportivo, futbol.",
        precio: 13200,
        img:"img/fifa.jpg",
    },
    {
        id:8,
        nombre:"Forza 2022", 
        cantidad: 1,
        desc: "Juego de autos, Aventura, Mundo libre.",
        precio: 18000,
        img:"img/forza.jpg",
    },
    {
        id:9,
        nombre:"Resident Evil 2 (Remake)", 
        cantidad: 1,
        desc: "Survival, Suspense, Accion.",
        precio: 20600,
        img:"img/residentEvil.jpg",
    },
    {
        id:10,
        nombre:"Batman-Arkham Asylum", 
        cantidad: 1,
        desc: "Accion, Aventura, Mundo libre.",
        precio: 19000,
        img:"img/batman2.jpg",
    },
    {
        id:11,
        nombre:"Gta", 
        cantidad: 1,
        desc: "Mundo libre, Accion, Aventura.",
        precio: 25600,
        img:"img/gta2.jpg",
    },
    {
        id:12,
        nombre:"Uncharted", 
        cantidad: 1,
        desc: "Accion, Fantasia, Aventura.",
        precio: 22600,
        img:"img/uncharted.jpeg",
    },
  
];

let carrito=[]

// seleccionamos id del html para agregarle funcion

const contenedor= document.querySelector('#contenedor')
const carritoContenedor= document.querySelector('#carritoContenedor')
const vaciarCarrito = document.querySelector('#vaciarCarrito')
const precioTotal= document.querySelector('#precioTotal')

document.addEventListener('DOMContentLoaded',() => {
    carrito= JSON.parse(localStorage.getItem('carrito'))|| []
    mostrarCarrito()
})

// Destructuramos e inyectamos al html

   stockProductos.forEach((prod) => { 
      const {id, nombre, precio, desc, img, cantidad}= prod
   contenedor.innerHTML += `
    
    <div class="card" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}"  alt="card image cap"></img>
    <div class="card-body">
      <h5 class="card-title"> ${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      
      
      <button onclick="agregarProducto (${id})" class= "btn btn-primary">Agregar a Carrito </button>
      </div>
    </div>
    
      `
    })

    

    
    vaciarCarrito.addEventListener('click', () => {
        carrito.length =[]
        mostrarCarrito()
    })
      //definendo la funcion para agregar productos al carrito  y que no se repita el mismo producto

      function agregarProducto(id){
       
        const existe= carrito.some(prod => prod.id === id)
        if (existe){
            const prod = carrito.map(prod =>{
                if(prod.id== id){
                    prod.cantidad ++
                }

            })

        }

            else{
                const item =stockProductos.find((prod) =>prod.id === id)
                carrito.push(item);

            }
            mostrarCarrito();
        }
        

      


// trabajamos en la estructura del modal e inyectamos html

const mostrarCarrito=() =>{
    const modalBody= document.querySelector('.modal .modal-body')
    modalBody.innerHTML= ''

    carrito.forEach((prod)=>{
     const {id, nombre, img, desc, cantidad, precio}= prod
     modalBody.innerHTML += `
     <div class="modal-contenedor">
     <div>
     <img class="img-fluid img-carrito" src="${img}"/>
     </div>

     <div>
     <p>Producto: ${nombre}</p>
     <p>Precio: ${precio}</p>
     <p>Cantidad: ${cantidad}</p>
       
     <button onclick="eliminarProducto(${id})"class= "btn btn-danger">Eliminar Producto</button>
     </div>
     </div>
     `
    })

    // agregamos condicional que muestre mensaje si carrito esta vacio
    
    if (carrito.length=== 0){
        modalBody.innerHTML=
        `
        <p class=" text-center text-primary parrafo">Agrega algun producto a tu carrito</p>
        `

    }
    else{
        console.log("hay algo");

    }
    
    carritoContenedor.textContent = carrito.length

    // trabajamos en el id precioTotal para darle funcionalidad al carrito y sume el  precio del producto

    precioTotal.innerText = carrito.reduce((acc, prod)=> acc + prod.cantidad * prod.precio, 0)
    guardarStorage()
}

// creamos funcion para eliminar producto segun su id

function eliminarProducto(id){
    const juegoId= id
    carrito = carrito.filter((juego) =>juego.id !== juegoId)
    mostrarCarrito()
}

// creamos funcion que guarde localStorage

function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}



