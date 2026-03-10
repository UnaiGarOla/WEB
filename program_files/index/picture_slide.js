document.addEventListener('DOMContentLoaded', function () {
    var slideshows = document.querySelectorAll('.slideshow');

    // 1. Inyectar estilos (Mantenemos tu CSS original)
    if (!document.getElementById('slideshow-styles')) {
        var style = document.createElement('style');
        style.id = 'slideshow-styles';
        style.textContent = `
            .slideshow { margin: 20px auto; display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%; min-height: 300px; overflow: hidden; }
            .slide { height: 250px; flex: 0 0 15%; transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center; }
            .slide img { height: 100%; width: 100%; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
            .slide.center { flex: 0 0 60%; z-index: 10; transform: scale(1.05); }
            .slide.side { filter: grayscale(0.8) blur(2px); opacity: 0.4; transform: scale(0.8); }
            @media (min-width: 768px) {
                .slideshow { min-height: 500px; gap: 15px; }
                .slide { height: 380px; flex: 0 0 18%; }
                .slide.center { flex: 0 0 25%; transform: scale(1.15); }
            }
        `;
        document.head.appendChild(style);
    }

    slideshows.forEach(function (slideshow) {
        // Usamos la variable global definida en lista_fotos.js
        var fotos = window.misFotosDelSlider;

        if (!fotos || fotos.length === 0) {
            console.error("No se encontraron fotos en 'misFotosDelSlider'");
            return;
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
                if (img.src !== window.location.origin + "/" + fotos[index]) {
                    img.src = fotos[index];
                }
                slides[i].className = 'slide ' + (offset === 0 ? 'center' : 'side');
            });
        }

        actualizar();

        setInterval(function () {
            indiceCentro = (indiceCentro + 1) % fotos.length;
            actualizar();
        }, 3500);
    });
});