// 📦 IMPORTAR MÓDULOS
import { mostrarToastPago } from './modulos.js';


document.querySelector(".formulario-tarjeta").addEventListener("submit", function (e) {
    const numeroTarjeta = document.getElementById("numero-tarjeta").value.trim();
    const nombre = document.getElementById("nombre-titular").value.trim();
    const fecha = document.getElementById("fecha-vencimiento").value.trim();
    const cvv = document.getElementById("codigo-seguridad").value.trim();

    // VALIDACIÓN → Número de tarjeta (solo dígitos, 16 exactos)
    const regexTarjeta = /^\d{16}$/;
    if (!regexTarjeta.test(numeroTarjeta)) {
        alert("El número de tarjeta debe tener exactamente 16 números.");
        e.preventDefault();
        return;
    }

    // VALIDACIÓN → Nombre (solo letras y espacios)
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    if (!regexNombre.test(nombre)) {
        alert("El nombre solo puede contener letras.");
        e.preventDefault();
        return;
    }

    // VALIDACIÓN → Fecha DD/MM/AA
    const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regexFecha.test(fecha)) {
        alert("La fecha debe tener el formato DD/MM/AA.");
        e.preventDefault();
        return;
    }

    // VALIDACIÓN → CVV (3 o 4 números)
    const regexCVV = /^\d{3,4}$/;
    if (!regexCVV.test(cvv)) {
        alert("El código de seguridad debe tener 3 o 4 dígitos.");
        e.preventDefault();
        return;
    }

    e.preventDefault(); 
    
    // 🔔 LLAMADA A LA FUNCIÓN MODULARIZADA
    mostrarToastPago(); // Llamamos a la función importada

    setTimeout(() => {
        document.querySelector(".formulario-tarjeta").reset();
    }, 2000);

});

// BLOQUEAR LETRAS EN NUMERO DE TARJETA Y CVV
document.getElementById("numero-tarjeta").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ""); // solo números
});

document.getElementById("codigo-seguridad").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ""); // solo números
});

// BLOQUEAR NÚMEROS EN NOMBRE
document.getElementById("nombre-titular").addEventListener("input", function (e) {
    this.value = this.value.replace(/[0-9]/g, ""); // elimina números
});





