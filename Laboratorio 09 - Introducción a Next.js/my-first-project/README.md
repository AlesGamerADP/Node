# Buscador de Películas con Next.js y OMDb API

Este es un proyecto **Next.js** iniciado con `create-next-app`.  
Es una aplicación web que permite a los usuarios buscar películas y series utilizando la **API de OMDb**.

La aplicación demuestra características modernas de Next.js, combinando **Renderizado del Lado del Servidor (SSR)** para una carga inicial rápida y **Renderizado del Lado del Cliente (CSR)** para una experiencia de búsqueda interactiva.

---

## Características Principales

- **Página Principal Renderizada en el Servidor (SSR):**  
  La lista inicial de películas populares se genera en el servidor para mayor velocidad y mejor SEO.

- **Búsqueda Interactiva en el Cliente (CSR):**  
  Resultados de búsqueda en tiempo real sin recargar la página.

- **Doble Modalidad de Búsqueda:**  
  - Búsqueda General: Por un único término.  
  - Búsqueda Específica: Por título y año.

- **Vista Detallada en Modal:**  
  La información completa de la película (director, trama, ratings) se muestra en una ventana modal.

- **Diseño Responsivo:**  
  Construido con **Tailwind CSS**.

- **Manejo de Estados Robusto:**  
  Gestiona los estados de carga y error para una experiencia de usuario fluida.

---

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el entorno de desarrollo.

### 1. Prerrequisitos

- **Node.js** (v18 o superior)
- **Una clave de API de OMDb**

### 2. Configuración

Primero, clona el repositorio e instala las dependencias:

```
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
npm install
```
Luego, configura tu clave de API.
Genera una clave gratuita desde [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx )
y crea un archivo .env en la raíz del proyecto con el siguiente contenido:
```
NEXT_PUBLIC_OMDB_API_KEY=tu_clave_aqui
```
### 3. Ejecuta el Servidor de Desarrollo
```
npm run dev
```

Abre http://localhost:3000
 en tu navegador para ver el resultado.

- Search : http://localhost:3000/omdb/search 
- Pagina Principal : http://localhost:3000/omdb

Puedes comenzar a editar la página principal modificando app/omdb/page.tsx.
La página se actualiza automáticamente a medida que editas el archivo.

---

## Arquitectura: SSR vs. CSR

Este proyecto fue diseñado para mostrar el poder del renderizado híbrido de Next.js.

### Renderizado del Lado del Servidor (SSR)

¿Por qué?
La lista inicial de películas populares se renderiza en el servidor para lograr una carga de página inicial más rápida y mejorar el SEO al servir una página HTML completamente renderizada a los motores de búsqueda.

### Renderizado del Lado del Cliente (CSR)

¿Por qué?
La funcionalidad de búsqueda es altamente interactiva.
Usando la directiva 'use client', aprovechamos los hooks de React (useState, useEffect) para crear una experiencia fluida y dinámica, similar a una aplicación, con retroalimentación en tiempo real sin recargas completas.
