import { actualizarTotal, actualizarEstadoBotonPagar } from './modulos.js';

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnPagar = document.getElementById("btnPagar");

function renderCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="mensaje-vacio">Tu carrito está vacío.</p>
        `;
        totalCarrito.textContent = "ARS $ 0";
        
        // 🔔 LLAMADA A FUNCIÓN MODULARIZADA
        actualizarEstadoBotonPagar(btnPagar, true); 
        return;
    }

    carrito.forEach((prod, index) => {
        contenedor.innerHTML += `
            <div class="item-carrito">
                <img src="${prod.imagen}" class="carrito-img">

                <div class="carrito-info">
                    <h3>${prod.nombre}</h3>
                    <p>Precio: ARS $ ${prod.precio.toLocaleString()}</p>
                    <p>Cantidad: ${prod.cantidad}</p>
                    <p class="subtotal">Subtotal: ARS $ ${(prod.precio * prod.cantidad).toLocaleString()}</p>
                </div>

                <button class="btn-eliminar" data-index="${index}">
                    🗑
                </button>
            </div>
        `;
    });

    // 🔔 LLAMADAS A FUNCIONES MODULARIZADAS
    actualizarTotal(carrito, totalCarrito);
    actualizarEstadoBotonPagar(btnPagar, false);
}


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = e.target.dataset.index;

        carrito.splice(index, 1);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        renderCarrito();
    }
});

renderCarrito();
