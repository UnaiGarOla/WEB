document.addEventListener('DOMContentLoaded', function () {
    // 1. Inyectar estilos del slideshow
    var style = document.createElement('style');
    style.textContent = `
        .slideshow {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        .slide {
            height: 400px;          /* misma altura visible para todas */
            overflow: hidden;       /* recorta lo que sobresale al escalar */
            border-radius: 8px;
        }

        /* Todas las fotos mantienen su proporción:
           misma altura, ancho automático según la imagen */
        .slide img {
            height: 100%;
            width: auto;
            display: block;
            transition: transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease;
        }

        /* Foto central: un poco más grande y nítida */
        .slide.center {
            filter: none;
            opacity: 1;
        }

        .slide.center img {
            transform: scale(1.1);
        }

        /* Fotos laterales: algo más pequeñas y borrosas */
        .slide.side {
            filter: blur(2px);
            opacity: 0.6;
        }

        .slide.side img {
            transform: scale(0.9);
        }
    `;
    document.head.appendChild(style);

    // 2. Crear estructura HTML del slideshow dentro de .contenido
    var contenido = document.querySelector('.contenido');
    if (!contenido) return;

    var slideshow = document.createElement('div');
    slideshow.className = 'slideshow';

    var slideIzquierda = document.createElement('div');
    slideIzquierda.className = 'slide side';
    var imgIzquierda = document.createElement('img');
    imgIzquierda.id = 'foto-izquierda';
    imgIzquierda.alt = 'Foto izquierda';
    slideIzquierda.appendChild(imgIzquierda);

    var slideCentro = document.createElement('div');
    slideCentro.className = 'slide center';
    var imgCentro = document.createElement('img');
    imgCentro.id = 'foto-centro';
    imgCentro.alt = 'Foto centro';
    slideCentro.appendChild(imgCentro);

    var slideDerecha = document.createElement('div');
    slideDerecha.className = 'slide side';
    var imgDerecha = document.createElement('img');
    imgDerecha.id = 'foto-derecha';
    imgDerecha.alt = 'Foto derecha';
    slideDerecha.appendChild(imgDerecha);

    slideshow.appendChild(slideIzquierda);
    slideshow.appendChild(slideCentro);
    slideshow.appendChild(slideDerecha);

    contenido.appendChild(slideshow);

    // 3. Lógica de rotación de imágenes
    var fotos = ['media/index/foto1.jpg', 'media/index/foto2.jpg', 'media/index/foto3.jpg'];
    var indiceCentro = 0; // índice de la foto que está en el centro

    function actualizarSlides() {
        var izquierda = document.getElementById('foto-izquierda');
        var centro = document.getElementById('foto-centro');
        var derecha = document.getElementById('foto-derecha');

        var indiceIzquierda = (indiceCentro - 1 + fotos.length) % fotos.length;
        var indiceDerecha = (indiceCentro + 1) % fotos.length;

        centro.src = fotos[indiceCentro];
        izquierda.src = fotos[indiceIzquierda];
        derecha.src = fotos[indiceDerecha];
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
