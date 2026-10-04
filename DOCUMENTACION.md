# Documentación del portfolio — Pablo Muñoz Cabrerizo

Portfolio personal hecho con ayuda de la IA. Es **solo interfaz**: no hay backend ni base de datos. Los textos están en el propio proyecto, el contacto abre el correo con un enlace `mailto:` y las capturas de Tracki van incluidas como imágenes.

---

## 1. Tecnologías utilizadas y por qué

| Tecnología | Para qué sirve | Por qué la hemos usado |
|---|---|---|
| **React 19** | Librería de JavaScript para construir la interfaz por **componentes** (Header, Hero, Proyectos...). | Cada parte de la web es una pieza independiente y reutilizable. Además permite cambiar todo el texto entre español e inglés sin recargar la página. |
| **Vite 8** | Herramienta que arranca el proyecto en local (`npm run dev`) y lo prepara para publicarlo (`npm run build`). | Es la forma actual y más rápida de crear un proyecto de React. Al guardar un archivo, el cambio se ve al instante. |
| **Tailwind CSS 4** | Framework de CSS: los estilos se escriben con clases directamente en el HTML/JSX. | Permite diseñar rápido y de forma coherente: los colores, fuentes y espacios se definen una vez y se usan en toda la web. También facilita que sea responsive. |
| **GSAP 3** (+ ScrollTrigger) | Librería de animaciones. | Es la librería de animación más usada en webs profesionales. Explicada en el punto 2. |
| **Lenis** | Scroll suave. | Hace que la rueda del ratón se deslice con suavidad en lugar de ir a saltos, y encaja perfectamente con GSAP. |
| **Fontsource** | Instala las tipografías con npm (Geist, Geist Mono e Instrument Serif). | Las fuentes van dentro del proyecto, así que no dependen de un servidor externo como Google Fonts. |
| **GitHub Pages + GitHub Actions** | Publican la web en internet de forma gratuita. | Cada vez que subo cambios a GitHub, la web se vuelve a publicar sola. |

---

## 2. Animaciones

### ¿Qué tecnología se ha usado?

**GSAP** (GreenSock Animation Platform) con su plugin **ScrollTrigger**, más **Lenis** para el scroll suave.

### ¿Cómo funciona?

- **Tweens:** una animación básica. Le dices a GSAP *qué* elemento mover, *hasta dónde* y *cuánto tiempo*. Por ejemplo: «sube este texto 50 píxeles y hazlo visible en 1 segundo».
- **Timelines (líneas de tiempo):** varias animaciones encadenadas, como las pistas de un editor de vídeo. Se usan en la pantalla de carga, en la entrada del inicio y en el menú del móvil (que se cierra reproduciendo la misma timeline al revés).
- **Stagger:** hace que varios elementos se animen uno detrás de otro (las letras del nombre o los enlaces del menú).
- **ScrollTrigger:** conecta las animaciones con el scroll. Puede lanzar una animación cuando un elemento aparece en pantalla, o atarla a la rueda del ratón (**scrub**), de forma que avanza al bajar y retrocede al subir. También puede **fijar** (pin) una sección mientras haces scroll.
- **Lenis:** suaviza el scroll y va sincronizado con el reloj de GSAP para que todo se mueva a la vez.
- En React se usa el hook **`useGSAP`**, que crea las animaciones cuando aparece el componente y las limpia solo cuando desaparece.

### Animaciones del portfolio

| Dónde | Qué hace | Cómo |
|---|---|---|
| Pantalla de carga | El contador sube de 000 a 100, se llena la barra y el panel sube como una persiana. | Timeline |
| Inicio | Las letras de «Pablo Muñoz» suben una a una y después aparecen el logo y los textos. | Timeline + stagger |
| Logo | Flota sin parar, el anillo de texto gira, un punto da vueltas en órbita y, con ratón, se inclina en 3D hacia el cursor. | Tweens infinitos + `quickTo` |
| Inicio al hacer scroll | «Pablo» se va a la izquierda, «Muñoz» a la derecha y el logo gira. | ScrollTrigger con scrub |
| Cinta de tecnologías | Se mueve sin parar; acelera si haces scroll rápido y cambia de sentido si subes. | Tween infinito + velocidad del scroll |
| Galería de Tracki (ordenador) | La sección se queda fija y las capturas pasan en horizontal mientras bajas. Cada captura crece al entrar y hay una barra de progreso. | ScrollTrigger con pin + scrub |
| Galería de Tracki (móvil) | Carrusel que se desliza con el dedo. | CSS (scroll-snap) |
| Títulos | Las palabras salen desde abajo de una «ranura». | ScrollTrigger + stagger |
| Frase de «Sobre mí» | Se ilumina palabra a palabra según bajas. | ScrollTrigger con scrub |
| Botones | Efecto magnético: se acercan al ratón y vuelven con un rebote. | `quickTo` + ease elástico |
| Cursor | Un punto y un anillo siguen al ratón; sobre «Ver demo» el anillo crece y muestra el texto. | `quickTo` |
| Barra superior | Se esconde al bajar y reaparece al subir. | ScrollTrigger (dirección del scroll) |
| Botón ES / EN | La píldora azul se desliza y el botón hace un pequeño rebote. | Transición CSS + GSAP |

### ¿Por qué GSAP?

- Es **el estándar en webs profesionales y de portfolio**, sobre todo para animaciones ligadas al scroll.
- **ScrollTrigger** permite efectos que serían muy difíciles solo con CSS, como fijar una sección y mover la galería en horizontal.
- Es **muy fluido**, porque anima propiedades que la tarjeta gráfica mueve sin esfuerzo (posición, escala, rotación y opacidad).
- Es **gratuito** (incluidos todos sus plugins) y funciona con React gracias a `@gsap/react`.

### Accesibilidad

Si el usuario tiene activado **«reducir movimiento»** en su sistema, no se crea ninguna animación ni la pantalla de carga, se desactiva el scroll suave y la web se ve completa y estática. El cursor personalizado y el efecto magnético solo se activan en ordenadores con ratón.

---

## 3. Diseño

### Idea general

Un portfolio **oscuro, limpio y tipográfico**: el nombre en grande como protagonista, mucho espacio libre y un solo color de acento. La identidad sale del **logo PM**: sus tres tonos de azul son los colores de toda la web.

### Paleta de colores

| Uso | Color | Código |
|---|---|---|
| Fondo | Negro azulado | `#06070B` |
| Tarjetas / superficies | Gris muy oscuro | `#0B0D13` · `#11141C` |
| Texto principal | Blanco roto | `#EEF1F7` |
| Texto secundario | Gris | `#8B91A1` |
| Acento principal (botones, números) | Azul eléctrico | `#1F7BFF` |
| Degradado (palabras destacadas) | Azul oscuro → azul → cian | `#0C3DFF` → `#1F7BFF` → `#2BC1FF` |

**Por qué:** el fondo casi negro hace que las capturas de Tracki (que son verdes) y el logo destaquen sin chocar. Usar un solo color de acento da un aspecto más profesional que llenar la web de colores.

### Tipografía

- **Geist**: para títulos y textos. Moderna y muy legible; en tamaño gigante (el nombre) le da personalidad a la web.
- **Instrument Serif (cursiva)**: solo en palabras destacadas («*software*», «*seleccionado*»). El contraste entre una letra recta y otra elegante es un recurso muy usado en diseño editorial.
- **Geist Mono**: etiquetas pequeñas en mayúsculas (números de sección, datos). Le da un toque de «programador».

### Estructura de la página

1. **Pantalla de carga** con el logo y un contador.
2. **Inicio:** fila de datos (año, estudios, ciudad, «Buscando prácticas»), nombre gigante, logo animado, frase, introducción y botones (Ver proyectos y Descargar CV).
3. **Cinta** con las tecnologías que uso.
4. **01 · Proyectos:** ficha de Tracki (año, tipo, descripción, tecnologías y botón **Ver demo**, que abre `tracki-seven.vercel.app`), galería de capturas en marcos de navegador y una tarjeta «Más en camino» que lleva a mi GitHub.
5. **02 · Sobre mí:** frase que se ilumina, datos, bio, tecnologías agrupadas, «Cómo trabajo» en 4 pasos y una cita final.
6. **03 · Contacto:** título grande, correo, GitHub y CV.
7. **Pie** tipo barra de estado: autor, tecnologías, hora en Zaragoza y «Volver arriba».

### Detalles de interfaz

- **Numeración de secciones** (00, 01, 02, 03) en el menú y en cada sección, para que se entienda dónde estás.
- **Marcos de navegador** alrededor de las capturas, para que se vea claro que es una aplicación web.
- **Textura de grano** muy suave por encima de todo, para que el fondo no se vea plano.
- **Cuadrícula de fondo** en el inicio que se difumina hacia los bordes.
- **Reloj con la hora de Zaragoza** en la barra superior.
- **Idioma ES / EN** en la esquina superior derecha. El navegador recuerda el idioma elegido.

### Responsive

Se ha probado en móvil (320 y 375 px), tablet (768 px) y ordenador (1024, 1280, 1440 y 1920 px) sin scroll horizontal:

- En móvil y tablet el menú pasa a un **menú a pantalla completa**.
- El nombre y los títulos cambian de tamaño solos según el ancho de la pantalla.
- El logo se coloca arriba a la derecha en móvil y a un lado del nombre en ordenador.
- La galería horizontal fija se convierte en un **carrusel táctil**.

### Referencias

Antes de diseñar se revisaron tres portfolios de ejemplo para sacar ideas, sin copiar ninguno: el uso de letra monoespaciada para los datos, el selector de idioma y la barra de estado en el pie vienen de esa revisión.
