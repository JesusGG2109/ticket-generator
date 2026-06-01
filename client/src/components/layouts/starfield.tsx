/**
 * Starfield — TEST DIAGNÓSTICO.
 *
 * Bloque rojo OPACO 100vw × 100vw fijo al viewport.
 * Sin animación, sin blur, sin mix-blend, sin overflow.
 *
 * Si al abrir la app TODA la pantalla se ve roja:
 *   → el componente se renderiza correctamente.
 *   → el problema previo eran los estilos (opacidad/colores) tímidos.
 *
 * Si al abrir la app NO se ve rojo (sigue negra):
 *   → el componente NO se ve por un bug estructural (z-index negativo
 *     atrapado detrás del background sólido del #root).
 *   → fix: añadir `isolation: isolate` al wrapper del MainLayout o
 *     quitar el background-color sólido del #root.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "red",
      }}
    />
  );
};
