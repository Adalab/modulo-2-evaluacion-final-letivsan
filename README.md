# Buscador de series

Aplicación web desarrollada con **HTML, SCSS y JavaScript** que permite buscar series usando la
API de TVMaze, marcarlas como favoritas y guardarlas en `localStorage`.

Este proyecto forma parte de la evaluación individual final del módulo 2 de **JavaScript**.

---

## Demo

_(aquí va el enlace)_

---

## Funcionalidades

- Buscar series por título o palabra
- Mostrar resultados con imagen y nombre
- Mostrar imagen placeholder cuando no hay imagen disponible
- Añadir y eliminar series de favoritos
- Mostrar favoritas en una columna independiente a la izquierda
- Mantener favoritas al hacer nuevas búsquedas
- Guardar favoritas en `localStorage`
- Recuperar favoritas al recargar la página
- Resaltar en resultados las series ya favoritas
- Eliminar favoritas individualmente
- Borrar todas las favoritas

---

## Tecnologías utilizadas

- HTML5
- SCSS
- JavaScript
- API TVMaze
- localStorage
- Git y GitHub

---

## Estructura del proyecto

Se ha empleado el Adalab Web Starter Kit siguiendo una estructura similar:

```bash
src/
 ├─ js/
 │   └─ main.js
 ├─ scss/
 │   ├─ core/
 │   │   ├─ _reset.scss
 │   │   └─ _variables.scss
 │   ├─ layout/
 │   │   └─ _page.scss
 │   ├─ pages/
 │   │   └─ _index.scss
 │   └─ main.scss
 └─ index.html

public/
 └─ images/
```
