document.addEventListener('DOMContentLoaded', function () {
    // 1. Inyectar estilos específicos de la lista de blogs
    var style = document.createElement('style');
    style.textContent = `
        .blog-list {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        .blog-item {
            display: flex;
            align-items: center;
            gap: 20px;
            text-align: left;
            background-color: #e0e0e0; /* fondo gris */
            padding: 15px;
            border-radius: 8px;
        }

        /* Alternar orden texto / foto */
        .blog-item.reverse {
            flex-direction: row-reverse;
        }

        .blog-text h2 {
            margin: 0 0 10px 0;
        }

        .blog-text p {
            margin: 0 0 10px 0;
        }

        .blog-text a {
            color: #0066cc;
            text-decoration: none;
            font-weight: bold;
        }

        .blog-text a:hover {
            text-decoration: underline;
        }

        .blog-image img {
            height: 200px;      /* altura fija */
            width: auto;        /* ancho automático según proporción */
            object-fit: cover;
            border-radius: 8px;
        }
    `;
    document.head.appendChild(style);

    // 2. Datos de los blogs (independientes del idioma)
    //  - base: nombre base del fichero (Irati -> Irati_es.html, Irati_eus.html, ...)
    //  - titulo: cómo quieres que se vea el nombre
    //  - resumen: pequeño texto descriptivo (puedes traducirlo si quieres)
    //  - imagen: ruta a la imagen (por ejemplo media/blogs/Irati.jpg)
    const blogs = [
        {
            base: 'Fotografia',
            titulo: 'Fotografía',
            resumen: {
                eu: 'Argazkigintzari buruzko aholkuak.',
                es: 'Consejos sobre la fotografía.',
                en: 'Tips about photography.'
            },
            imagen: 'media/reseñas/Fotografia.jpg'
        }
        // Añade aquí más blogs con el mismo formato
        // {
        //     base: 'Otro',
        //     titulo: 'Otro blog',
        //     resumen: {
        //         eu: 'Deskribapen laburra euskaraz.',
        //         es: 'Descripción corta en español.',
        //         en: 'Short description in English.'
        //     },
        //     imagen: 'media/blogs/Otro.jpg'
        // }
    ];

    // Sufijo de fichero según idioma actual (eu/es/en) guardado por menu.js
    var lang = 'eu';
    try {
        var storedLang = window.localStorage.getItem('garuna_lang');
        if (storedLang) lang = storedLang;
    } catch (e) { }

    var suffixMap = { eu: 'eus', es: 'es', en: 'eng' };
    var langSuffix = suffixMap[lang] || 'es';

    // 3. Pintar la lista alternando texto/foto, con URL dependiente del idioma
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    blogs.forEach((blog, index) => {
        const item = document.createElement('article');
        item.className = 'blog-item' + (index % 2 === 1 ? ' reverse' : '');

        const url = 'blogs/' + blog.base + '_' + langSuffix + '.html';
        const resumenTexto = (blog.resumen && blog.resumen[lang]) || blog.resumen?.es || '';

        item.innerHTML = `
            <div class="blog-text">
                <h2>${blog.titulo}</h2>
                <p>${resumenTexto}</p>
                <a href="${url}">Leer más</a>
            </div>
            <div class="blog-image">
                <img src="${blog.imagen}" alt="${blog.titulo}">
            </div>
        `;

        blogList.appendChild(item);
    });
});
