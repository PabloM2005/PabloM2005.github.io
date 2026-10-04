import { useEffect, useState } from 'react';

/** Hora actual en Zaragoza (zona horaria Europe/Madrid), se actualiza sola */
const formatter = new Intl.DateTimeFormat('es-ES', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Madrid',
});

export default function Clock({ className = '' }) {
  const [time, setTime] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatter.format(new Date())), 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={`tabular-nums ${className}`} dateTime={time}>
      {time}
    </time>
  );
}
