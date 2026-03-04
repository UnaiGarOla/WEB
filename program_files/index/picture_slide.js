document.addEventListener('DOMContentLoaded', function () {

    var slideshows = document.querySelectorAll('.slideshow');
    
    // 1. Inyectar estilos actualizados
    if (!document.getElementById('slideshow-styles')) {
        var style = document.createElement('style');
        style.id = 'slideshow-styles';
        style.textContent = `
            .slideshow { 
                margin: 20px auto; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                gap: 10px; 
                width: 100%; 
                min-height: 300px; /* Reducido para móvil */
                overflow: hidden;
            }
            .slide { 
                height: 250px; /* Altura base para móvil */
                flex: 0 0 15%; 
                transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .slide img { 
                height: 100%; 
                width: 100%; 
                object-fit: cover; 
                border-radius: 12px; 
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            .slide.center { 
                flex: 0 0 60%; /* En móvil, la central ocupa casi todo */
                z-index: 10; 
                transform: scale(1.05);
            }
            .slide.side { 
                filter: grayscale(0.8) blur(2px); 
                opacity: 0.4; 
                transform: scale(0.8); 
            }

            /* AJUSTES PARA PC (Escritorio) */
            @media (min-width: 768px) {
                .slideshow { 
                    min-height: 500px; 
                    gap: 15px;
                }
                .slide { 
                    height: 380px; 
                    flex: 0 0 18%; 
                }
                .slide.center { 
                    flex: 0 0 25%; 
                    transform: scale(1.15);
                }
            }
        `;
        document.head.appendChild(style);
    }

    slideshows.forEach(function (slideshow) {
        var base = slideshow.getAttribute('data-base');
        var ext = slideshow.getAttribute('data-ext') || ".jpg";
        var total = parseInt(slideshow.getAttribute('data-total'));

        if (!base || isNaN(total)) return;

        // Generar lista de rutas con el bucle for
        var fotos = [];
        for (var i = 1; i <= total; i++) {
            fotos.push(base + i + ext);
        }

        // Crear los 5 slots visuales
        var slides = [];
        for (var j = 0; j < 5; j++) {
            var slide = document.createElement('div');
            slide.className = 'slide';
            var img = document.createElement('img');
            slide.appendChild(img);
            slideshow.appendChild(slide);
            slides.push(slide);
        }

        var indiceCentro = 0;

        function actualizar() {
            var offsets = [-2, -1, 0, 1, 2];
            offsets.forEach(function (offset, i) {
                var index = (indiceCentro + offset) % fotos.length;
                if (index < 0) index += fotos.length;

                var img = slides[i].querySelector('img');
                
                // Efecto de suavizado al cambiar la fuente
                if (img.src !== window.location.origin + "/" + fotos[index]) {
                    img.src = fotos[index];
                }

                // Asignar clases para CSS
                slides[i].className = 'slide ' + (offset === 0 ? 'center' : 'side');
            });
        }

        actualizar();
        
        // Rotación automática cada 3.5 segundos
        setInterval(function() {
            indiceCentro = (indiceCentro + 1) % fotos.length;
            actualizar();
        }, 3500);
    });
});