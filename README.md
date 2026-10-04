# Portfolio — Pablo Muñoz Cabrerizo

Portfolio personal hecho con **React + Vite + Tailwind CSS + GSAP**. Solo interfaz, sin backend.
La documentación del ejercicio (animaciones, diseño y tecnologías) está en [`DOCUMENTACION.md`](./DOCUMENTACION.md).

---

## 1. Instalar lo necesario (solo la primera vez)

1. Instala **Node.js** (versión LTS) desde https://nodejs.org. Con Node se instala también **npm**, que es lo que descarga las librerías.
2. Instala **Git** desde https://git-scm.com (en Mac ya suele venir instalado).
3. Comprueba que todo está bien abriendo una terminal (en Windows, PowerShell; en Mac, Terminal):

```bash
node -v
npm -v
git --version
```

Si salen números de versión, está todo listo. Node tiene que ser la versión **20.19 o superior**.

## 2. Ver la web en tu ordenador

Descomprime el zip, abre una terminal **dentro de la carpeta del proyecto** (en VS Code: menú *Terminal → New Terminal*) y ejecuta:

```bash
npm install
npm run dev
```

- `npm install` descarga React, GSAP, Tailwind y el resto de librerías en la carpeta `node_modules`. Solo hace falta la primera vez.
- `npm run dev` arranca la web. Abre en el navegador la dirección que aparece (normalmente http://localhost:5173). Cada cambio que guardes se ve al momento.
- Para pararla: `Ctrl + C` en la terminal.

Otros comandos:

```bash
npm run build     # crea la versión final de la web en la carpeta dist/
npm run preview   # enseña esa versión final en local para revisarla
```

## 3. Subirla a tu repositorio de GitHub

El proyecto ya trae un archivo (`.github/workflows/deploy.yml`) que hace que **GitHub compile y publique la web solo** cada vez que subes cambios. Tú subes el código y GitHub se encarga del resto.

### Paso 1 — Copiar el proyecto dentro de tu repositorio

En la terminal, en la carpeta donde quieras trabajar (cambia `NOMBRE-DEL-REPO` por el nombre de tu repositorio):

```bash
git clone https://github.com/PabloM2005/NOMBRE-DEL-REPO.git
```

Se crea una carpeta con lo que tienes ahora en GitHub. **Borra lo que haya dentro del portfolio anterior** (menos la carpeta oculta `.git`) y **copia dentro todo el contenido de este proyecto**, incluida la carpeta `.github`.

> No copies `node_modules` ni `dist`: no se suben (ya están en el `.gitignore`).
> En Mac las carpetas que empiezan por punto están ocultas: pulsa `Cmd + Shift + .` en Finder para verlas.

### Paso 2 — Subir los cambios

```bash
cd NOMBRE-DEL-REPO
git add -A
git commit -m "Nuevo portfolio con React, Tailwind y GSAP"
git push
```

La primera vez que hagas `git push`, Git te pedirá iniciar sesión en GitHub (se abre el navegador).

### Paso 3 — Activar la publicación automática (solo una vez)

1. En GitHub, entra en tu repositorio → **Settings** → **Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Ve a la pestaña **Actions**: verás el proceso «Publicar en GitHub Pages». Cuando salga en verde (1–2 minutos), la web ya está actualizada en el mismo enlace que tenías.

A partir de aquí, para actualizar la web solo tienes que repetir el **Paso 2**.

### Alternativa sin terminal para subir

En GitHub: **Add file → Upload files** y arrastra el contenido del proyecto (sin `node_modules` ni `dist`). Comprueba que se sube también la carpeta `.github`; si no aparece, créala a mano con **Add file → Create new file** escribiendo como nombre `.github/workflows/deploy.yml` y pegando el contenido de ese archivo.

---

## Estructura del proyecto

```
├── .github/workflows/deploy.yml   Publicación automática en GitHub Pages
├── public/                        Archivos que se copian tal cual (CV, favicon)
├── src/
│   ├── assets/                    Logo y capturas de Tracki
│   ├── components/                Piezas reutilizables (Header, cursor, botones...)
│   ├── sections/                  Secciones de la página (Hero, Proyectos, Sobre mí, Contacto)
│   ├── hooks/useReveal.js         Animaciones de entrada al hacer scroll
│   ├── lib/                       Configuración de GSAP y del scroll suave (Lenis)
│   ├── i18n/                      Textos en español e inglés
│   ├── data/site.js               Enlaces, correo, tecnologías y datos de proyectos
│   ├── App.jsx                    Une todas las secciones
│   └── index.css                  Colores, fuentes y estilos generales (Tailwind)
├── index.html
├── package.json                   Lista de librerías y comandos
└── vite.config.js
```

**Para cambiar textos:** `src/i18n/translations.js` (en los dos idiomas).
**Para cambiar enlaces o el correo:** `src/data/site.js`.
**Para cambiar el CV:** sustituye `public/cv-pablo-munoz-cabrerizo.pdf` por el tuyo con el mismo nombre.
