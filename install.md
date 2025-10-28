# Guía de Instalación

Esta guía te ayudará a instalar y configurar el proyecto AprendIA en tu entorno de desarrollo local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

*   **Node.js:** Puedes descargarlo desde [nodejs.org](https://nodejs.org/). Se recomienda la versión LTS.
*   **MySQL o MariaDB:** Necesitarás un servidor de base de datos MySQL o MariaDB. Puedes usar herramientas como [XAMPP](https://www.apachefriends.org/index.html) o [Laragon](https://laragon.org/) que incluyen un servidor de base de datos.

## Pasos de Instalación

Sigue estos pasos para instalar y configurar el proyecto:

### 1. Clonar el Repositorio

Abre tu terminal o línea de comandos y clona el repositorio del proyecto:

```bash
git clone https://github.com/tu-usuario/aprendia.git
cd aprendia
```

### 2. Configurar el Backend

1.  **Navega al directorio del backend:**

    ```bash
    cd Backend
    ```

2.  **Instala las dependencias de Node.js:**

    ```bash
    npm install
    ```

3.  **Configura la base de datos:**
    *   Asegúrate de que tu servidor de MySQL o MariaDB esté en funcionamiento.
    *   Abre tu cliente de base de datos (como phpMyAdmin, DBeaver, etc.) y ejecuta el script `aprenda_ia_db.sql` que se encuentra en el directorio `Backend`. Esto creará la base de datos `aprenda_ia_db` y todas las tablas necesarias.

4.  **Configura las variables de entorno:**
    *   En el directorio `Backend`, crea un archivo `.env`.
    *   Añade las siguientes variables de entorno al archivo `.env`, reemplazando los valores de ejemplo con tus propias credenciales:

    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_de_base_de_datos
    DB_NAME=aprenda_ia_db
    JWT_SECRET=tu_secreto_jwt
    ```

5.  **Inicia el servidor del backend:**

    ```bash
    npm start
    ```

    El servidor del backend debería estar corriendo en `http://localhost:5000`.

### 3. Ejecutar el Frontend

El frontend de este proyecto consiste en archivos HTML, CSS y JavaScript estáticos. No requiere un proceso de compilación.

1.  **Abre los archivos HTML en tu navegador:**
    *   Navega al directorio raíz del proyecto.
    *   Abre los archivos `index.html`, `login.html`, `register.html` y `profile.html` directamente en tu navegador web.

¡Y eso es todo! Ahora deberías tener el proyecto AprendIA funcionando en tu entorno de desarrollo local.
