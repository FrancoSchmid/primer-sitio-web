// FUNCIONES DE TOAST (MOSTRAR MENSAJES)

// Toast del Catálogo (Esquina)
export function mostrarToastCatalogo(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 1100);
}

// Toast de Pago Exitoso (Centrado)
export function mostrarToastPago() {
    const toast = document.getElementById("toast-compra");
    if (!toast) return;

    toast.classList.remove("oculto");
    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
        setTimeout(() => toast.classList.add("oculto"), 500);
    }, 3000);
}



// FUNCIONES DEL CARRITO (LÓGICA)


export function actualizarTotal(carrito, totalCarritoElement) {
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalCarritoElement.textContent = `TOTAL DEL CARRITO: ARS $ ${total.toLocaleString()}`;
    return total;
}

export function actualizarEstadoBotonPagar(btnPagar, carritoVacio) {
    if (!btnPagar) return;

    if (carritoVacio) {
        btnPagar.removeAttribute('href');
        btnPagar.classList.add('btn-desactivado');

        btnPagar.onclick = function(event) {
            event.preventDefault();
            console.log('El carrito está vacío. Agrega productos para pagar.');
        };

    } else {
        btnPagar.setAttribute('href', 'pagos.html');
        btnPagar.classList.remove('btn-desactivado');
        btnPagar.onclick = null;
    }
}