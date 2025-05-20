# Notas de la Parte 2a: Ejercicios Courseinfo (Continuación)

Este archivo contiene mi solución y código para los ejercicios 2.1 al 2.5 de la Parte 2 del curso Full Stack Open, que son una continuación del set "Courseinfo".

## Sobre esta Sección (Ejercicios 2.1 - 2.5)

Esta sección de la Parte 2 retoma el proyecto "Información del Curso" de la Parte 1 y lo extiende para cubrir conceptos cruciales como el **renderizado de colecciones** (listas de datos) y la **modularización** de componentes. Los ejercicios te guían para hacer la aplicación más robusta y escalable.

## Ejercicios Realizados y Conceptos Clave

A continuación, se detalla cada ejercicio y los conceptos clave que se han aplicado:

* **2.1: Información del curso paso 6**
    * **Objetivo:** Refactorizar el componente `App` para delegar la renderización de un solo curso a un nuevo componente `Course`. Este componente `Course` debe ser capaz de renderizar un curso completo (su nombre y sus partes) de manera independiente.
    * **Conceptos Clave:**
        * Creación de componentes funcionales (`Course`).
        * Paso de datos complejos (objetos de curso) mediante **props**.
        * Composición de componentes (cómo `App` contiene `Course`, y `Course` contiene `Header` y `Content`, que a su vez contiene `Part`).
        * Asegurar que la aplicación funcione con un número arbitrario de partes dentro de un curso.

* **2.2: Información del curso paso 7**
    * **Objetivo:** Añadir la funcionalidad para mostrar la suma total de ejercicios para cada curso.
    * **Conceptos Clave:**
        * Cálculo de valores derivados a partir de los datos existentes en las props.
        * Renderizado de texto dinámico en la UI.

* **2.3*: Información del curso paso 8**
    * **Objetivo:** Calcular la suma de los ejercicios utilizando el método de array `reduce`.
    * **Conceptos Clave:**
        * Dominio del método `Array.prototype.reduce()` para agregación de datos en arrays de objetos.
        * Depuración de funciones de flecha (`console.log` en el cuerpo de la función).

* **2.4: Información del curso paso 9**
    * **Objetivo:** Ampliar la aplicación para manejar y renderizar un **número arbitrario de cursos**. El componente `App` ahora recibe un array de objetos de curso.
    * **Conceptos Clave:**
        * Renderizado de colecciones (arrays de cursos) en React.
        * Uso del método `map()` de los arrays para transformar un array de datos en un array de componentes React.
        * Importancia de la prop `key` al renderizar listas para la eficiencia y el correcto seguimiento de los elementos por parte de React.

* **2.5: Módulo separado paso 10**
    * **Objetivo:** Modularizar la aplicación extrayendo el componente `Course` (y sus subcomponentes relacionados: `Header`, `Content`, `Part`) a un archivo de módulo separado, que luego se importa en el componente `App`.
    * **Conceptos Clave:**
        * Modularización de código en JavaScript/React.
        * Uso de `export default` e `import` para organizar el código en archivos separados.
        * Mejores prácticas para la estructura de proyectos React, mejorando la mantenibilidad y legibilidad.

## Estructura de Ejercicios en este Directorio (`part02/courseinfo/`)

Se recomienda crear una subcarpeta específica para estos ejercicios. Por ejemplo, dentro de tu directorio `part02/`, podrías tener:

```
fullstack-open\part02\courseinfo
```

Aquí es donde residirá el código de los ejercicios 2.1-2.5.

## Cómo Poner en Marcha este Proyecto

Sigue estos pasos para configurar y trabajar en los ejercicios 2.1-2.5:

1.  **Clonar tu Repositorio Existente:**
    * Si aún no lo has hecho, clona tu repositorio principal `fullstack-open` en tu máquina local:
        ```bash
        git clone [https://github.com/pedralcg/fullstack-open.git](https://github.com/pedralcg/fullstack-open.git)
        ```
    * Navega al directorio clonado:
        ```bash
        cd fullstack-open
        ```

2.  **Crear y Navegar al Directorio del Ejercicio:**
    * Asegúrate de que el directorio `part02` exista. Si no, créalo: `mkdir -p part02`.
    * Crea el directorio específico para estos ejercicios:
        ```bash
        mkdir -p part02/courseinfo
        ```
    * Navega a este nuevo directorio:
        ```bash
        cd part02/courseinfo
        ```

3.  **Copiar la Solución de la Parte 1 (`courseinfo`):**
    * Necesitarás los archivos de configuración de un proyecto Vite/React, así como el código base de tu solución de `courseinfo` de la Parte 1. La forma más sencilla es copiar los contenidos:
        * **Opción A (Recomendada):** Copiar todo el contenido de tu solución `part01/courseinfo` (incluyendo `public`, `src`, `index.html`, `package.json`, `vite.config.js`, etc.) a `part02/courseinfo`. Esto asegurará que tengas una configuración de proyecto Vite/React funcional.
            ```bash
            # Asegúrate de estar en el directorio `fullstack-open/part02/courseinfo`
            cp -r ../../part01/courseinfo/* .
            # O si estás en `fullstack-open/`
            # cp -r part01/courseinfo/* part02/courseinfo/
            ```
            **¡Importante!** Después de copiar, **elimina** el directorio `node_modules` si se copió: `rm -rf node_modules`.
        * **Opción B (Si ya tienes una plantilla Vite vacía en `courseinfo`):** Si ya tienes una plantilla Vite vacía en `part02/courseinfo`, solo necesitarías copiar el contenido de la carpeta `src` de tu solución de `part01/courseinfo` y adaptar `index.html` o `main.jsx` si es necesario.
            ```bash
            # Asegúrate de estar en el directorio `fullstack-open/part02/courseinfo`
            cp -r ../../part01/courseinfo/src/* src/
            ```

4.  **Instalar las Dependencias del Proyecto:**
    * Desde dentro del directorio `part02/courseinfo/`, instala las dependencias necesarias:
        ```bash
        npm install
        ```
        Debes hacer esto la primera vez que configures el proyecto o después de copiar los archivos `package.json` de otro lugar.

5.  **Iniciar el Servidor de Desarrollo de Vite:**
    * Desde dentro del directorio `part02/courseinfo/`, inicia la aplicación:
        ```bash
        npm run dev
        ```
    * Este comando compila el proyecto y abre un servidor local (normalmente en `http://localhost:5173/`). Abre tu navegador y visita esta dirección.

---

Este `README.md` se encuentra en la raíz de tu proyecto `part02/courseinfo/` y proporciona las instrucciones necesarias para configurarlo y ejecutarlo.