/**
 * Starfield — PASO 3 del diagnóstico.
 *
 * CSS inline puro, z-index: 999999, sin Tailwind, sin mix-blend, sin filter.
 * Si TODA la pantalla se ve roja: el componente se renderiza correctamente,
 * el problema previo era el z-index negativo + background opaco del #root.
 * Si NO se ve roja: hay un bug estructural más profundo (render bloqueado,
 * overlay, cache del navegador, service worker, etc).
 */
export const Starfield = () => {
  console.log("STARFIELD RENDER");

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "red",
        zIndex: 999999,
      }}
    />
  );
};
