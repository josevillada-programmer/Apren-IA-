# Resumen de Cambios y Tecnologías Utilizadas

## Cambios Realizados

Se han implementado las siguientes mejoras y correcciones en el proyecto:

1.  **Navegación Responsiva y Barra Lateral (Sidebar):**
    *   Se corrigió la navegación principal para que sea completamente responsiva, adaptándose a dispositivos móviles y de escritorio.
    *   Se implementó una barra lateral (sidebar) dedicada para dispositivos móviles, que incluye los mismos elementos de menú que la navegación de escritorio.
    *   Se estilizó el botón de hamburguesa para una mejor apariencia y se aseguró su funcionalidad para abrir y cerrar la barra lateral.
    *   Se añadió una separación visual clara entre los elementos del menú de la barra lateral para mejorar la legibilidad.
    *   Se aseguró la compatibilidad de la barra lateral y el botón de hamburguesa con el tema oscuro.

2.  **Funcionalidad de Racha (Streak):**
    *   Se añadió una columna `streak` a la tabla `progress` en la base de datos para registrar la racha de inicio de sesión de los usuarios.
    *   Se modificó la lógica de inicio de sesión en el backend para calcular y actualizar la racha del usuario en cada inicio de sesión.
    *   Se incluyó la información de la racha en el payload del JWT (JSON Web Token) para que esté disponible en el frontend.
    *   Se añadió la visualización de la racha (con un icono de libro y el número de días) en el menú desplegable del perfil de usuario en el frontend.

3.  **Correcciones de Errores:**
    *   Se resolvió un error 404 relacionado con la imagen `image_f499c3.png` al reemplazar su referencia con un valor vacío en el CSS.
    *   Se corrigió un problema que impedía la apertura del menú desplegable del perfil de usuario, optimizando la lógica de los event listeners en JavaScript.
    *   Se aseguró que la navegación en `profile.html` sea idéntica y funcional a la de `index.html`.

## Tecnologías Utilizadas

El proyecto utiliza las siguientes tecnologías:

*   **Frontend:**
    *   HTML5
    *   CSS3 (con estilos responsivos y tema oscuro)
    *   JavaScript (para interactividad, manejo de eventos y lógica de la interfaz de usuario)
    *   Font Awesome (para iconos)

*   **Backend:**
    *   Node.js
    *   Express.js (para la creación de la API REST)
    *   MySQL (como sistema de gestión de bases de datos)
    *   bcryptjs (para el hash de contraseñas)
    *   jsonwebtoken (para la autenticación basada en tokens)

*   **Base de Datos:**
    *   MariaDB (a través de MySQL)

*   **Herramientas de Desarrollo:**
    *   Git (para control de versiones)
