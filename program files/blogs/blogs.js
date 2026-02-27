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

    // 2. Datos de los blogs (añádelos manualmente aquí)
    // Cada entrada debe tener:
    //  - titulo: cómo quieres que se vea el nombre
    //  - resumen: pequeño texto descriptivo
    //  - imagen: ruta a la imagen (por ejemplo media/blogs/Irati.jpg)
    //  - url: ruta al html del blog (por ejemplo blogs/Irati.html)
    const blogs = [
        {
            titulo: 'Irati',
            resumen: 'Un paseo por la selva de Irati.',
            imagen: 'media/blogs/Irati.jpg',
            url: 'blogs/Irati.html'
        },
        {
            titulo: 'Fotografía',
            resumen: 'Consejos sobre la fotografía.',
            imagen: 'media/blogs/Fotografia.jpg',
            url: 'blogs/Fotografia.html'
        },
        {
            titulo: 'Zumaia',
            resumen: 'Un paseo por Zumaia.',
            imagen: 'media/blogs/Zumaia.jpg',
            url: 'blogs/Zumaia.html'
        }
        // Añade aquí más blogs con el mismo formato
        // {
        //     titulo: 'Otro blog',
        //     resumen: 'Descripción corta del blog.',
        //     imagen: 'media/blogs/Otro blog.jpg',
        //     url: 'blogs/Otro blog.html'
        // }
    ];

    // 3. Pintar la lista alternando texto/foto
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;

    blogs.forEach((blog, index) => {
        const item = document.createElement('article');
        item.className = 'blog-item' + (index % 2 === 1 ? ' reverse' : '');

        item.innerHTML = `
            <div class="blog-text">
                <h2>${blog.titulo}</h2>
                <p>${blog.resumen}</p>
                <a href="${blog.url}">Leer más</a>
            </div>
            <div class="blog-image">
                <img src="${blog.imagen}" alt="${blog.titulo}">
            </div>
        `;

        blogList.appendChild(item);
    });
});
