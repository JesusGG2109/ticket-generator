/**
 * Starfield — Fondo espacial 100% CSS (sin imágenes).
 *
 * Capas (de fondo a frente):
 *  1. Gradiente base (deep-950 → deep-900 con un toque violáceo en el centro).
 *  2. Dos nebulosas radiales suaves (violeta + cyan) con mezcla screen.
 *  3. Dos capas de estrellas usando box-shadow multipunto (estática + ligero parallax visual).
 *  4. Vignette superior e inferior para foco central.
 *
 * Inspiración: NASA, Interstellar, Apple Vision Pro.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1. Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #121A3A 0%, #0B1026 45%, #050816 100%)",
        }}
      />

      {/* 2a. Nebulosa violeta */}
      <div
        className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-40 mix-blend-screen blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, rgba(124, 58, 237, 0.18) 40%, transparent 70%)",
        }}
      />

      {/* 2b. Nebulosa cyan */}
      <div
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full opacity-30 mix-blend-screen blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.45) 0%, rgba(96, 165, 250, 0.15) 45%, transparent 75%)",
        }}
      />

      {/* 2c. Nebulosa central tenue */}
      <div
        className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 mix-blend-screen blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* 3a. Estrellas pequeñas (capa lejana) */}
      <div className="absolute inset-0 starfield-far" />

      {/* 3b. Estrellas medianas (capa cercana) */}
      <div className="absolute inset-0 starfield-near" />

      {/* 4. Vignette superior e inferior */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5, 8, 22, 0.6) 0%, transparent 15%, transparent 85%, rgba(5, 8, 22, 0.85) 100%)",
        }}
      />

      <style>{`
        .starfield-far {
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 23% 47%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 34% 8%,  rgba(255,255,255,0.6), transparent 50%),
            radial-gradient(1px 1px at 41% 71%, rgba(255,255,255,0.45), transparent 50%),
            radial-gradient(1px 1px at 56% 32%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 63% 89%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 71% 22%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 78% 64%, rgba(255,255,255,0.65), transparent 50%),
            radial-gradient(1px 1px at 84% 14%, rgba(255,255,255,0.4),  transparent 50%),
            radial-gradient(1px 1px at 92% 53%, rgba(255,255,255,0.5),  transparent 50%),
            radial-gradient(1px 1px at 7%  82%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 17% 95%, rgba(255,255,255,0.4),  transparent 50%),
            radial-gradient(1px 1px at 49% 50%, rgba(255,255,255,0.6),  transparent 50%);
          background-size: 100% 100%;
          opacity: 0.85;
        }
        .starfield-near {
          background-image:
            radial-gradient(1.5px 1.5px at 19% 28%, rgba(255,255,255,0.95), transparent 60%),
            radial-gradient(1.5px 1.5px at 38% 62%, rgba(255,255,255,0.85), transparent 60%),
            radial-gradient(1.5px 1.5px at 61% 12%, rgba(255,255,255,0.9),  transparent 60%),
            radial-gradient(1.5px 1.5px at 73% 78%, rgba(255,255,255,0.8),  transparent 60%),
            radial-gradient(2px 2px   at 86% 38%, rgba(200,220,255,0.95),   transparent 60%),
            radial-gradient(2px 2px   at 28% 88%, rgba(220,210,255,0.9),    transparent 60%),
            radial-gradient(1.5px 1.5px at 52% 22%, rgba(255,255,255,0.85), transparent 60%);
          background-size: 100% 100%;
        }
      `}</style>
    </div>
  );
};
