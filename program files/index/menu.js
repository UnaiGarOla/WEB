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

        .menu a {
            display: block;
            margin: 5px 0;
            text-decoration: none;
            color: black;
            font-family: Arial, sans-serif;
        }

        .menu a:hover {
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

    var items = [
        { href: 'index.html', text: 'Inicio' },
        { href: '#sobre-mi', text: 'Sobre mí' },
        { href: 'blogs.html', text: 'Blogs' }
    ];

    items.forEach(function (item) {
        var link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        menu.appendChild(link);
    });

    // Insertar en el body al principio
    document.body.insertBefore(toggleButton, document.body.firstChild);
    document.body.insertBefore(menu, toggleButton.nextSibling);

    // 3. Comportamiento del menú
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
});
