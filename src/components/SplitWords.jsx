/**
 * Parte un texto en palabras, cada una dentro de una "máscara"
 * (overflow: hidden). Así GSAP puede subir cada palabra desde abajo y
 * parece que el texto "sale" de una ranura.
 *
 * Se hace con JSX (y no manipulando el DOM a mano) para que React siga
 * controlando el texto cuando se cambia de idioma.
 */
export default function SplitWords({ text, className = '', wordClassName = '' }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {/* Lectores de pantalla: leen la frase completa, no palabra a palabra */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <span className={`split-inner inline-block will-change-transform ${wordClassName}`}>{word}</span>
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </span>
  );
}
