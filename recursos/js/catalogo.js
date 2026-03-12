import { mostrarToastCatalogo } from './modulos.js';

let mostrarTodo = false; // estado inicial

fetch("./recursos/json/productos.json")
    .then(res => res.json())
    .then(productos => {

        const contenedor = document.getElementById("grid-productos");
        const boton = document.getElementById("toggleCatalogo");
        const campoBusqueda = document.getElementById("buscador");

        let productosFiltrados = productos;
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // 🔍 FILTRAR EN TIEMPO REAL
        campoBusqueda.addEventListener("input", function () {
            const texto = this.value.toLowerCase();

            productosFiltrados = productos.filter(prod =>
                prod.nombre.toLowerCase().includes(texto)
            );

            render();
        });

        
        function render() {
            contenedor.innerHTML = "";

            const lista = mostrarTodo
                ? productosFiltrados
                : productosFiltrados.slice(0, 4);

            if (lista.length === 1) {
                contenedor.classList.add('un-solo-producto');
            } else {
                contenedor.classList.remove('un-solo-producto');
            }

            lista.forEach(prod => {
                contenedor.innerHTML += `
                <article class="producto">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p class="caracteristicas"><strong>${prod.nicotina}</strong></p>
                    <p class="caracteristicas"><strong>${prod.puffs} puffs</strong></p>
                    <p class="descripcion">${prod.descripcion}</p>
                    <p class="precio-producto">${prod.precio}</p>

                    <button class="btn-add" data-nombre="${prod.nombre}">
                        Agregar al carrito
                    </button>
                </article>`;
            });

            boton.textContent = mostrarTodo
                ? "Mostrar menos"
                : "Mostrar catálogo completo";

            configurarBotonesAgregar();
        }

        
        function configurarBotonesAgregar() {
            const botones = document.querySelectorAll(".btn-add");

            botones.forEach(btn => {
                btn.addEventListener("click", () => {
                    const nombreProd = btn.dataset.nombre;
                    const producto = productos.find(p => p.nombre === nombreProd);
                    agregarAlCarrito(producto);
                });
            });
        }

        function agregarAlCarrito(producto) {

            // 🔥 CONVERTIR PRECIO A NÚMERO
            const precioNumero = parseFloat(
                producto.precio
                    .replace("ARS", "")
                    .replace("$", "")
                    .replace(".", "")
                    .replace(",", ".")
                    .trim()
            );

            const existe = carrito.find(item => item.nombre === producto.nombre);

            if (existe) {
                existe.cantidad++;
            } else {
                carrito.push({
                    ...producto,
                    precio: precioNumero,
                    cantidad: 1
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            // 🔔 MOSTRAR TOAST (LLAMADA CORREGIDA)
            mostrarToastCatalogo("Producto agregado al carrito");
        }

        boton.addEventListener("click", () => {
            mostrarTodo = !mostrarTodo;
            render();
        });

        render();
    });
