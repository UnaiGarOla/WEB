// Toda la lógica y estilos del menú viven aquí
document.addEventListener('DOMContentLoaded', function () {
    // 1. Crear e inyectar los estilos del menú (tipo "drawer" que empuja el contenido)
    var style = document.createElement('style');
    style.textContent = `
        /* Animación para desplazar el contenido cuando el menú está abierto */
        body {
            transition: margin-left 0.3s ease;
        }

        body.menu-open {
            margin-left: 250px; /* el contenido se desplaza a la derecha */
        }

        .menu-toggle {
            position: fixed;
            top: 10px;
            left: 10px;
            width: 40px;
            height: 40px;
            background-color: #333;
            color: white;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-family: Arial, sans-serif;
            z-index: 1001;
        }

       .site-logo {
            position: fixed;    
            top: 20px;          /* Un poco más de margen en PC queda más elegante */
            right: 20px;
            height: 80px;       /* Tamaño grande para PC */
            width: auto;
            z-index: 0;
            transition: all 0.3s ease; /* Para que el cambio de tamaño sea suave */
        }

        /* AJUSTES PARA MÓVIL (Pantallas de menos de 768px) */
        @media (max-width: 768px) {
            .site-logo {
                position: absolute;
                top: 10px;      /* Más pegado al borde en móvil */
                right: 10px;
                height: 50px;   /* Más pequeño para que no tape el texto o el slider */
                /* Opcional: si quieres que sea un poco transparente en móvil */
                opacity: 0.9;
            }
        }   

        /* Menú lateral que entra desde la izquierda */
        .menu {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 250px;
            background-color: #f2f2f2;
            border-right: 1px solid #ccc;
            padding: 60px 10px 10px 10px; /* deja espacio arriba para el botón */
            box-sizing: border-box;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .menu.open {
            transform: translateX(0);
        }

        .menu a, .menu button, .menu select {
            display: block;
            margin: 5px 0;
            text-decoration: none;
            color: black;
            font-family: Arial, sans-serif;
        }

        .menu a:hover, .menu button:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    // 2. Crear los elementos HTML del menú
    var toggleButton = document.createElement('div');
    toggleButton.id = 'menu-toggle';
    toggleButton.className = 'menu-toggle';
    toggleButton.textContent = '☰';

    var menu = document.createElement('div');
    menu.id = 'menu';
    menu.className = 'menu';

    // Logo arriba a la derecha (se muestra en TODAS las páginas que cargan este menú)
    var logo = document.createElement('img');
    logo.src = (function () {
        var path = window.location.pathname.replace(/\\/g, '/');
        var inBlogsDir = path.indexOf('/blogs/') !== -1;
        return inBlogsDir ? '../media/logo.jpg' : 'media/logo.jpg';
    })();
    logo.alt = 'GARUNA SITE logo';
    logo.className = 'site-logo';

    // Prefijo según dónde estemos (raíz o carpeta blogs/)
    var currentPath = window.location.pathname.replace(/\\/g, '/');
    var inBlogsDir = currentPath.indexOf('/blogs/') !== -1;
    var basePrefix = inBlogsDir ? '../' : '';

    // Enlaces de menú con IDs lógicos para poder traducirlos
    var items = [
        { id: 'home', href: basePrefix + 'index.html' },
        { id: 'blogs', href: basePrefix + 'blogs.html' },
        { id: 'galeria', href: basePrefix + 'galeria.html' }
    ];

    var menuLinks = {};

    items.forEach(function (item) {
        var link = document.createElement('a');
        link.href = item.href;
        menu.appendChild(link);
        menuLinks[item.id] = link;
    });

    // Selector de idioma (desplegable)
    var langSelect = document.createElement('select');
    langSelect.id = 'language-select';
    langSelect.style.marginTop = '15px';

    var langs = [
        { code: 'eu', label: 'Euskara' },
        { code: 'es', label: 'Español' },
        { code: 'en', label: 'English' }
    ];

    langs.forEach(function (l) {
        var opt = document.createElement('option');
        opt.value = l.code;
        opt.textContent = l.label;
        langSelect.appendChild(opt);
    });

    menu.appendChild(langSelect);

    // Insertar en el body al principio
    document.body.insertBefore(toggleButton, document.body.firstChild);
    document.body.insertBefore(logo, toggleButton.nextSibling);
    document.body.insertBefore(menu, logo.nextSibling);

    // 3. Traducciones de los textos comunes (menú + textos intro)
    var translations = {
        eu: {
            menu: {
                home: 'Hasiera',
                blogs: 'Blogak',
                galeria: 'Galeria',
                language: 'Hizkuntza'
            },
        },
        es: {
            menu: {
                home: 'Inicio',
                blogs: 'Blogs',
                galeria: 'Galeria',
                language: 'Idioma'
            },
        },
        en: {
            menu: {
                home: 'Home',
                blogs: 'Blogs',
                galeria: 'Gallery',
                language: 'Language'
            },
        }
    };

    // Idioma actual: por defecto euskera, pero se respeta lo guardado
    var currentLang = 'eu';

    var storedLang = null;
    try {
        storedLang = window.localStorage.getItem('garuna_lang');
    } catch (e) { }
    if (storedLang && translations[storedLang]) {
        currentLang = storedLang;
    }

    function applyTranslations(lang) {
        var t = translations[lang] || translations.es;

        if (menuLinks.home) menuLinks.home.textContent = t.menu.home;
        if (menuLinks.blogs) menuLinks.blogs.textContent = t.menu.blogs;
        if (menuLinks.galeria) menuLinks.galeria.textContent = t.menu.galeria;

        // Actualizar valor seleccionado en el desplegable
        if (langSelect && langSelect.value !== lang) {
            langSelect.value = lang;
        }
        /*en Index.html traduce el idioma de la página*/
        var path = window.location.pathname;

        if (path.endsWith('index.html') || path === '/') {
            var introP = document.querySelector('.contenido p');
            if (introP && t.indexIntro) {
                introP.textContent = t.indexIntro;
            }
        }

    }

    // 4. Comportamiento del menú
    function openMenu() {
        document.body.classList.add('menu-open');
        menu.classList.add('open');
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        menu.classList.remove('open');
    }

    function toggleMenu() {
        if (document.body.classList.contains('menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Abrir/cerrar al pulsar el botón
    toggleButton.addEventListener('click', toggleMenu);

    // Cerrar el menú al pulsar en cualquier enlace del menú
    var links = menu.querySelectorAll('a');
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Función para navegar a la versión de idioma del archivo actual
    function navigateToLanguageVersion(lang) {
        // Mapear eu/es/en -> sufijos de archivo
        var suffixMap = { eu: 'eus', es: 'es', en: 'eng' };
        var suf = suffixMap[lang] || 'es';

        var path = window.location.pathname;          // /.../blogs.html
        var parts = path.split('/');
        var file = parts.pop() || 'index.html';

        // Separar base, sufijo actual y extensión
        var match = file.match(/^(.+?)(?:_(eus|es|eng))?(\.html)?$/i);
        if (!match) return;

        var base = match[1];
        var ext = match[3] || '.html';

        // Si es index o galeria, NO cambiamos de archivo
        if (base.toLowerCase() === 'index' || base.toLowerCase() === 'galeria' || base.toLowerCase() === 'blogs') {
            return;
        }

        // Construir el nuevo nombre de archivo con sufijo del idioma
        var newFile = base + '_' + suf + ext;

        // Evitar recargar si ya estamos en el archivo correcto
        if (file.toLowerCase() !== newFile.toLowerCase()) {
            parts.push(newFile);
            var newPath = parts.join('/');
            window.location.href = newPath;
        }
    }
    // 5. Comportamiento del selector de idioma
    langSelect.addEventListener('change', function () {
        currentLang = langSelect.value;
        try {
            window.localStorage.setItem('garuna_lang', currentLang);
        } catch (e) { }
        applyTranslations(currentLang);
        navigateToLanguageVersion(currentLang);
    });

    // Aplicar idioma inicial
    applyTranslations(currentLang);
});
