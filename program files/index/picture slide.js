document.addEventListener('DOMContentLoaded', function () {
    // 1. Inyectar estilos del slideshow
    var style = document.createElement('style');
    style.textContent = `
        .slideshow {
            margin-top: 60px;        /* pequeña separación fija debajo del texto */
            display: flex;
            justify-content: center;
            align-items: stretch;    /* todas las columnas usan la misma altura */
            gap: 0px;
        }

        .slide {
            height: 400px;          /* misma altura base para todas */
            overflow: hidden;
            border-radius: 8px;
            flex: 0 0 auto;         /* el ancho depende de la foto (no % fijo) */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Todas las fotos mantienen su proporción dentro de su recuadro */
        .slide img {
            height: 100%;
            width: auto;
            object-fit: contain;    /* NO recorta: mantiene proporción original */
            display: block;
            transition: transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease;
        }

        /* Foto central: nítida y ampliada (x1.2) */
        .slide.center {
            filter: none;
            opacity: 1;
            overflow: visible;      /* permite que el scale no se recorte */
            z-index: 2;
        }

        .slide.center img {
            transform: scale(1.2);
            transform-origin: center center; /* el centro de todas las fotos queda a la misma altura */
        }

        /* Fotos laterales: borrosas (misma altura, sin recorte) */
        .slide.side {
            filter: blur(2px);
            opacity: 0.6;
        }
    `;
    document.head.appendChild(style);

    // 2. Crear estructura HTML del slideshow dentro de .contenido
    var contenido = document.querySelector('.contenido');
    if (!contenido) return;

    var slideshow = document.createElement('div');
    slideshow.className = 'slideshow';

    // Crear 5 contenedores: 2 izquierda, 1 centro, 2 derecha
    var slideFarLeft = document.createElement('div');
    slideFarLeft.className = 'slide side';
    var imgFarLeft = document.createElement('img');
    imgFarLeft.id = 'foto-izquierda-lejos';
    imgFarLeft.alt = 'Foto izquierda lejos';
    slideFarLeft.appendChild(imgFarLeft);

    var slideLeft = document.createElement('div');
    slideLeft.className = 'slide side';
    var imgLeft = document.createElement('img');
    imgLeft.id = 'foto-izquierda';
    imgLeft.alt = 'Foto izquierda';
    slideLeft.appendChild(imgLeft);

    var slideCenter = document.createElement('div');
    slideCenter.className = 'slide center';
    var imgCenter = document.createElement('img');
    imgCenter.id = 'foto-centro';
    imgCenter.alt = 'Foto centro';
    slideCenter.appendChild(imgCenter);

    var slideRight = document.createElement('div');
    slideRight.className = 'slide side';
    var imgRight = document.createElement('img');
    imgRight.id = 'foto-derecha';
    imgRight.alt = 'Foto derecha';
    slideRight.appendChild(imgRight);

    var slideFarRight = document.createElement('div');
    slideFarRight.className = 'slide side';
    var imgFarRight = document.createElement('img');
    imgFarRight.id = 'foto-derecha-lejos';
    imgFarRight.alt = 'Foto derecha lejos';
    slideFarRight.appendChild(imgFarRight);

    slideshow.appendChild(slideFarLeft);
    slideshow.appendChild(slideLeft);
    slideshow.appendChild(slideCenter);
    slideshow.appendChild(slideRight);
    slideshow.appendChild(slideFarRight);

    contenido.appendChild(slideshow);

    // 3. Lógica de rotación de imágenes (con 5 visibles)
    var fotos = [
        'media/index/foto1.jpg',
        'media/index/foto2.jpg',
        'media/index/foto3.jpg',
        'media/index/foto4.jpg',
        'media/index/foto5.jpg'
    ];
    var indiceCentro = 0; // índice de la foto que está en el centro

    function actualizarSlides() {
        var farLeft = document.getElementById('foto-izquierda-lejos');
        var izquierda = document.getElementById('foto-izquierda');
        var centro = document.getElementById('foto-centro');
        var derecha = document.getElementById('foto-derecha');
        var farRight = document.getElementById('foto-derecha-lejos');

        var idxFarLeft = (indiceCentro - 2 + fotos.length) % fotos.length;
        var idxLeft = (indiceCentro - 1 + fotos.length) % fotos.length;
        var idxRight = (indiceCentro + 1) % fotos.length;
        var idxFarRight = (indiceCentro + 2) % fotos.length;

        centro.src = fotos[indiceCentro];
        izquierda.src = fotos[idxLeft];
        derecha.src = fotos[idxRight];
        farLeft.src = fotos[idxFarLeft];
        farRight.src = fotos[idxFarRight];
    }

    function cambiarFoto() {
        indiceCentro = (indiceCentro + 1) % fotos.length;
        actualizarSlides();
    }

    // Inicializa las fotos al cargar la página
    actualizarSlides();

    // Cambia de foto cada 3 segundos (3000 milisegundos)
    setInterval(cambiarFoto, 3000);
});
