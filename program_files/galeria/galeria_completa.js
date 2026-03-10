
// galeria_completa.js

function renderizarGaleria() {
    // Buscamos el contenedor
    const contenedor = document.querySelector('.pinterest-gallery');

    // Si NO lo encuentra, avisa por consola y detente
    if (!contenedor) {
        console.error("ERROR: No se encontró el elemento con la clase '.pinterest-gallery' en el HTML.");
        return;
    }

    // Si la variable de fotos no existe
    if (typeof misFotosDelSlider === 'undefined') {
        console.error("ERROR: No se encuentra la variable 'misFotosDelSlider'. Revisa que lista_fotos.js cargue antes.");
        return;
    }

    // Limpiamos y pintamos
    contenedor.innerHTML = '';

    misFotosDelSlider.forEach(ruta => {
        const pin = document.createElement('div');
        pin.className = 'pin';
        pin.innerHTML = `<img src="${ruta}" alt="Foto" loading="lazy">`;
        contenedor.appendChild(pin);
    });

    console.log("Galería cargada con éxito: " + misFotosDelSlider.length + " fotos.");
}

// Esta es la forma más segura de ejecutarlo
if (document.readyState === 'complete') {
    renderizarGaleria();
} else {
    window.addEventListener('load', renderizarGaleria);
}