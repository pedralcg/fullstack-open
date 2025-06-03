# Fullstack Open - Parte 4: Estructura de la Aplicación Backend e Introducción a las Pruebas

Este archivo contiene mis notas, comandos de interés y estructura de ejercicios para la Parte 4 del curso Full Stack Open.

## Sobre la Parte 4

La Parte 4 del curso Fullstack Open marca un cambio en el proyecto principal. Nos centraremos en construir y refactorizar una **nueva aplicación backend de lista de blogs**. Esta parte se enfoca en mejorar la calidad, mantenibilidad y capacidad de prueba del código Node.js, y en implementar pruebas automatizadas para asegurar su correcto funcionamiento.

## Conceptos Clave Cubiertos

Durante esta parte, se explorarán y practicarán los siguientes conceptos esenciales relacionados con el desarrollo de backend avanzado:

* **Creación de una nueva aplicación Backend de Blogs:**
    * Configuración inicial de un proyecto Express.
    * Definición de modelos de datos para blogs (título, autor, URL, likes).
* **Refactorización y Modularización del Backend:**
    * Separar la lógica de la aplicación Express y la configuración del servidor en módulos distintos (`app.js`, `index.js`).
    * Mover los controladores de ruta (route handlers) a un directorio y módulos dedicados (`controllers/`).
    * Centralizar middlewares y utilidades en un directorio específico (`utils/`).
* **Gestión de Entorno y Configuración:**
    * Uso de variables de entorno (con librerías como `dotenv`) para manejar diferentes configuraciones (desarrollo, pruebas, producción).
    * Creación de módulos de configuración (`config.js`) para una gestión de variables de entorno más limpia.
* **Introducción a las Pruebas Automatizadas:**
    * Entender la importancia de las pruebas unitarias y de integración en el desarrollo de software.
    * Uso de frameworks de pruebas (como Jest) para escribir y ejecutar tests.
    * Conceptos de aserciones y expectativas.
    * Configuración de la base de datos para entornos de prueba.
* **Bases de Datos para Pruebas:**
    * Manejo de bases de datos separadas para desarrollo y pruebas para evitar la contaminación de datos.
    * Configuración de Mongoose para conectarse a diferentes bases de datos según el entorno.
* **Mejora de la Calidad del Código:**
    * Aplicación de principios de diseño como la separación de responsabilidades (SoC).
    * Escritura de código más robusto y fácil de entender.

## Aplicación Principal y Estructura de Carpetas

En esta parte, se trabaja en una **nueva aplicación backend: la lista de blogs**.

### Estructura de Proyecto Sugerida:

Deberás crear un nuevo directorio para esta aplicación dentro de tu estructura de carpetas de `part4`.

```bash
fullstack-open/
└── part4/
    └── blogs-backend/ # <--- ¡Tu nueva aplicación de blogs!
        ├── controllers/    # Módulos para los controladores de ruta (ej. blogs.js)
        ├── models/         # Modelos de Mongoose (ej. blog.js)
        ├── utils/          # Módulos de utilidades (ej. config.js, middleware.js, logger.js)
        ├── tests/          # Directorio para los archivos de pruebas (ej. blog_api.test.js)
        ├── app.js          # Archivo con la configuración principal de la aplicación Express
        ├── index.js        # Punto de entrada del servidor (arranca la aplicación Express)
        ├── package.json    # Dependencias y scripts del proyecto
        ├── .env            # Variables de entorno para desarrollo
        ├── .env.test       # Variables de entorno para pruebas
        ├── .gitignore
        └── ...otros archivos del proyecto
```

## Cómo Ejecutar el Código Localmente y Realizar Pruebas

Para ejecutar y probar tu nuevo backend de blogs:

1.  **Configuración del Proyecto Backend:**
    * Navega al directorio de tu nuevo proyecto backend (ej. `./fullstack-open/part4/blogs-backend/`).
    * Inicializa un nuevo proyecto Node.js: `npm init -y`
    * Instala las dependencias necesarias para Express, Mongoose, Jest, Supertest, etc.: `npm install express mongoose dotenv` y `npm install --save-dev jest supertest`.
    * Configura tus variables de entorno:
        * Crea un archivo `.env` para el entorno de desarrollo (ej. `PORT=3003`, `MONGODB_URI=tu_uri_de_mongodb_dev_blogs`).
        * Crea un archivo `.env.test` para el entorno de pruebas, apuntando a una base de datos de prueba separada (ej. `MONGODB_URI=tu_uri_de_mongodb_test_blogs`).
        * **Recuerda añadir `.env` y `.env.test` a tu `.gitignore`**.

2.  **Inicia el Servidor Backend (Desarrollo):**
    * `npm start` (después de configurar el script `start` en `package.json`).
    * Para desarrollo, es común usar `nodemon`: `npm install --save-dev nodemon` y luego un script `dev`: `"dev": "nodemon index.js"`.

3.  **Ejecuta las Pruebas:**
    * Añade un script `test` a tu `package.json` (ej., `"test": "jest"`).
    * Luego, ejecuta las pruebas: `npm test`.

---

Gracias por tu paciencia y por corregirme. Tu precisión me ayuda a mejorar. ¡Ahora sí estás listo para empezar con la Parte 4 y construir esa aplicación de blogs!