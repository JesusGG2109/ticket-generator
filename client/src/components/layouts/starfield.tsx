/**
 * Starfield — Fondo aurora con movimiento continuo y orgánico.
 *
 * Filosofía de animación:
 *  - Toda capa visible está SIEMPRE en movimiento (sin estados estáticos).
 *  - Animaciones `linear infinite` con keyframes que cierran en 0%==100% para
 *    wraparound seamless (sin pausa al reiniciar).
 *  - Duraciones primas/coprimas (17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 61, 71, 89)
 *    para que las capas nunca resincronicen visualmente.
 *  - Composición vía wrappers anidados: cada blob usa 2–3 animaciones en
 *    elementos hermanos (translate / scale / rotate), permitiendo trayectorias
 *    complejas sin colisión de la propiedad `transform`.
 *  - El blur pesado vive en un elemento interno estático → el navegador
 *    cachea el render borroso y solo recompone con `transform` en los
 *    wrappers (GPU-friendly).
 *
 * Capas:
 *  1. Base radial estática (color de fondo).
 *  2. Aurora ambiental con oscilación de opacidad continua.
 *  3. 5 blobs animados con keyframes únicos.
 *     - Blob 1: deriva lateral + breathe
 *     - Blob 2: diagonal ascendente + breathe vertical + spin lento
 *     - Blob 3: diagonal descendente + pulso + morphing de border-radius
 *     - Blob 4: órbita elíptica + morphing
 *     - Blob 5: pulso puntual + drift + spin
 *  4. Dos capas de estrellas con drift diagonal opuesto.
 *  5. Vignette para foco central.
 *
 * Accesibilidad: respeta `prefers-reduced-motion`.
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

      {/* 2. Aurora ambiental con oscilación de opacidad */}
      <div className="aurora-ambient" />

      {/* 3. Blobs animados */}

      {/* Blob 1 — deriva lateral + breathe */}
      <div className="blob-wrap blob-wrap-1">
        <div className="blob-breathe blob-breathe-1">
          <div className="blob blob-1" />
        </div>
      </div>

      {/* Blob 2 — diagonal ascendente + breathe vertical + spin */}
      <div className="blob-wrap blob-wrap-2">
        <div className="blob-breathe blob-breathe-2">
          <div className="blob-spin blob-spin-2">
            <div className="blob blob-2" />
          </div>
        </div>
      </div>

      {/* Blob 3 — diagonal descendente + pulso + morphing */}
      <div className="blob-wrap blob-wrap-3">
        <div className="blob-breathe blob-breathe-3">
          <div className="blob blob-3 blob-morph-a" />
        </div>
      </div>

      {/* Blob 4 — órbita + morphing */}
      <div className="blob-wrap blob-wrap-4">
        <div className="blob-breathe blob-breathe-4">
          <div className="blob blob-4 blob-morph-b" />
        </div>
      </div>

      {/* Blob 5 — pulso + drift + spin */}
      <div className="blob-wrap blob-wrap-5">
        <div className="blob-breathe blob-breathe-5">
          <div className="blob-spin blob-spin-5">
            <div className="blob blob-5" />
          </div>
        </div>
      </div>

      {/* 4a. Estrellas lejanas con drift NE → SW */}
      <div className="stars-drift-far">
        <div className="absolute inset-0 starfield-far" />
      </div>

      {/* 4b. Estrellas cercanas con drift SW → NE (dirección opuesta) */}
      <div className="stars-drift-near">
        <div className="absolute inset-0 starfield-near" />
      </div>

      {/* 5. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5, 8, 22, 0.55) 0%, transparent 18%, transparent 82%, rgba(5, 8, 22, 0.85) 100%)",
        }}
      />

      <style>{`
        /* ---------- AURORA AMBIENTAL ---------- */
        .aurora-ambient {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          background:
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(124, 58, 237, 0.18) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 80% 70%, rgba(34, 211, 238, 0.14) 0%, transparent 60%);
          animation: aurora-pulse 13s linear infinite;
          will-change: opacity;
        }

        @keyframes aurora-pulse {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 0.65; }
        }

        /* ---------- BLOBS ---------- */

        /* Estructura comun a todos los blobs */
        .blob-wrap {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }
        .blob-breathe,
        .blob-spin {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          mix-blend-mode: screen;
          will-change: transform;
        }

        /* ---------- BLOB 1: deriva lateral + breathe ---------- */
        .blob-wrap-1 {
          top: 18%;
          left: 0;
          animation: drift-lateral 37s linear infinite;
        }
        .blob-breathe-1 {
          animation: breathe-iso 23s linear infinite;
        }
        .blob-1 {
          width: 700px;
          height: 700px;
          margin-left: -350px;
          margin-top: -350px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.85) 0%, rgba(124, 58, 237, 0.35) 40%, transparent 70%);
          opacity: 0.34;
        }

        @keyframes drift-lateral {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(35vw, 4vh, 0); }
          50%  { transform: translate3d(70vw, 0, 0); }
          75%  { transform: translate3d(35vw, -4vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes breathe-iso {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.08); }
          50%  { transform: scale(1.14); }
          75%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        /* ---------- BLOB 2: diagonal ascendente + breathe vertical + spin ---------- */
        .blob-wrap-2 {
          bottom: 0;
          left: 10%;
          animation: drift-diag-up 53s linear infinite;
        }
        .blob-breathe-2 {
          animation: breathe-vertical 31s linear infinite;
        }
        .blob-spin-2 {
          animation: spin-slow 89s linear infinite;
        }
        .blob-2 {
          width: 760px;
          height: 760px;
          margin-left: -380px;
          margin-top: -380px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.7) 0%, rgba(96, 165, 250, 0.3) 45%, transparent 75%);
          opacity: 0.30;
        }

        @keyframes drift-diag-up {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(20vw, -25vh, 0); }
          50%  { transform: translate3d(55vw, -55vh, 0); }
          75%  { transform: translate3d(40vw, -28vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes breathe-vertical {
          0%   { transform: scale(1, 1); }
          25%  { transform: scale(0.95, 1.1); }
          50%  { transform: scale(1.05, 0.92); }
          75%  { transform: scale(0.97, 1.08); }
          100% { transform: scale(1, 1); }
        }

        @keyframes spin-slow {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* ---------- BLOB 3: diagonal descendente + pulso + morphing ---------- */
        .blob-wrap-3 {
          top: 0;
          right: 5%;
          animation: drift-diag-down 41s linear infinite;
        }
        .blob-breathe-3 {
          animation: pulse-iso 19s linear infinite;
        }
        .blob-3 {
          width: 600px;
          height: 600px;
          margin-left: -300px;
          margin-top: -300px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%);
          opacity: 0.26;
          animation: morph-a 47s linear infinite;
        }

        @keyframes drift-diag-down {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-18vw, 30vh, 0); }
          50%  { transform: translate3d(-45vw, 60vh, 0); }
          75%  { transform: translate3d(-25vw, 32vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes pulse-iso {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.22); }
          100% { transform: scale(1); }
        }

        @keyframes morph-a {
          0%   { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
          20%  { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          40%  { border-radius: 40% 60% 70% 30% / 30% 70% 40% 60%; }
          60%  { border-radius: 70% 30% 50% 50% / 40% 60% 30% 70%; }
          80%  { border-radius: 30% 70% 40% 60% / 70% 40% 60% 30%; }
          100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
        }

        /* ---------- BLOB 4: orbita + morphing ---------- */
        .blob-wrap-4 {
          top: 50%;
          left: 50%;
          animation: orbit-ellipse 47s linear infinite;
        }
        .blob-breathe-4 {
          animation: breathe-soft 29s linear infinite;
        }
        .blob-4 {
          width: 540px;
          height: 540px;
          margin-left: -270px;
          margin-top: -270px;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.6) 0%, rgba(34, 211, 238, 0.2) 50%, transparent 75%);
          opacity: 0.28;
          animation: morph-b 43s linear infinite;
        }

        @keyframes orbit-ellipse {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(22vw, -15vh, 0); }
          50%  { transform: translate3d(0, -28vh, 0); }
          75%  { transform: translate3d(-22vw, -15vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes breathe-soft {
          0%   { transform: scale(1, 1); }
          33%  { transform: scale(1.07, 0.93); }
          66%  { transform: scale(0.93, 1.07); }
          100% { transform: scale(1, 1); }
        }

        @keyframes morph-b {
          0%   { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
          25%  { border-radius: 40% 60% 60% 40% / 50% 40% 60% 50%; }
          50%  { border-radius: 65% 35% 45% 55% / 35% 65% 50% 50%; }
          75%  { border-radius: 35% 65% 55% 45% / 60% 30% 50% 50%; }
          100% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
        }

        /* ---------- BLOB 5: pulso puntual + drift + spin ---------- */
        .blob-wrap-5 {
          top: 15%;
          right: 20%;
          animation: drift-soft 61s linear infinite;
        }
        .blob-breathe-5 {
          animation: pulse-sharp 17s linear infinite;
        }
        .blob-spin-5 {
          animation: spin-rev 71s linear infinite;
        }
        .blob-5 {
          width: 620px;
          height: 620px;
          margin-left: -310px;
          margin-top: -310px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%);
          opacity: 0.22;
        }

        @keyframes drift-soft {
          0%   { transform: translate3d(0, 0, 0); }
          20%  { transform: translate3d(-12vw, 18vh, 0); }
          50%  { transform: translate3d(15vw, 8vh, 0); }
          80%  { transform: translate3d(8vw, -14vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes pulse-sharp {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.15); }
          40%  { transform: scale(0.92); }
          60%  { transform: scale(1.18); }
          80%  { transform: scale(0.95); }
          100% { transform: scale(1); }
        }

        @keyframes spin-rev {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* ---------- STARS ---------- */

        .stars-drift-far {
          position: absolute;
          inset: -10%;
          animation: stars-drift-1 121s linear infinite;
          will-change: transform;
        }
        .stars-drift-near {
          position: absolute;
          inset: -10%;
          animation: stars-drift-2 97s linear infinite;
          will-change: transform;
        }

        @keyframes stars-drift-1 {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-3%, 4%, 0); }
        }

        @keyframes stars-drift-2 {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(4%, -3%, 0); }
        }

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
          opacity: 0.75;
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

        /* ---------- ACCESIBILIDAD ---------- */
        @media (prefers-reduced-motion: reduce) {
          .blob-wrap,
          .blob-breathe,
          .blob-spin,
          .blob,
          .aurora-ambient,
          .stars-drift-far,
          .stars-drift-near {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
