/**
 * Starfield — Fondo aurora/nebulosa 100% CSS.
 *
 * Capas (de fondo a frente):
 *  1. Gradiente base (deep-950 → deep-900 con violeta en el centro).
 *  2. Aurora tenue de fondo (3 capas radiales largas que crean profundidad).
 *  3. 5 blobs gigantes con keyframes lentas (45s — 75s) que orbitan suavemente
 *     dando sensación "lava lamp + Apple Vision Pro".
 *  4. Dos capas de estrellas (lejana + cercana) con box-shadow radial-gradient.
 *  5. Vignette superior e inferior para foco.
 *
 * Reglas de rendimiento:
 *  - Solo `transform` y `opacity` (GPU compositor).
 *  - `will-change: transform` solo en los blobs animados.
 *  - Sin Canvas, sin WebGL, sin librerías externas.
 *  - Animaciones lentas para no distraer (45s — 75s).
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

      {/* 2. Aurora ambiental (tenue, no animada) */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 30%, rgba(124, 58, 237, 0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(34, 211, 238, 0.14) 0%, transparent 60%)",
        }}
      />

      {/* 3. Blobs gigantes animados (lava lamp) */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-blob aurora-blob-5" />

      {/* 4a. Estrellas lejanas */}
      <div className="absolute inset-0 starfield-far" />

      {/* 4b. Estrellas cercanas */}
      <div className="absolute inset-0 starfield-near" />

      {/* 5. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5, 8, 22, 0.55) 0%, transparent 18%, transparent 82%, rgba(5, 8, 22, 0.85) 100%)",
        }}
      />

      <style>{`
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          opacity: 0.32;
          mix-blend-mode: screen;
          will-change: transform;
          pointer-events: none;
        }

        .aurora-blob-1 {
          width: 720px;
          height: 720px;
          top: -180px;
          left: -180px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.85) 0%, rgba(124, 58, 237, 0.35) 40%, transparent 70%);
          animation: blob-orbit-1 65s ease-in-out infinite;
        }

        .aurora-blob-2 {
          width: 760px;
          height: 760px;
          bottom: -220px;
          right: -200px;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.7) 0%, rgba(96, 165, 250, 0.3) 45%, transparent 75%);
          animation: blob-orbit-2 75s ease-in-out infinite;
          opacity: 0.28;
        }

        .aurora-blob-3 {
          width: 560px;
          height: 560px;
          top: 35%;
          left: 60%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%);
          animation: blob-orbit-3 55s ease-in-out infinite;
          opacity: 0.22;
        }

        .aurora-blob-4 {
          width: 480px;
          height: 480px;
          top: 65%;
          left: 15%;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.55) 0%, rgba(34, 211, 238, 0.2) 50%, transparent 75%);
          animation: blob-orbit-4 45s ease-in-out infinite;
          opacity: 0.25;
        }

        .aurora-blob-5 {
          width: 640px;
          height: 640px;
          top: 10%;
          right: 25%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%);
          animation: blob-orbit-5 60s ease-in-out infinite;
          opacity: 0.18;
        }

        @keyframes blob-orbit-1 {
          0%   { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          33%  { transform: translate3d(180px, 120px, 0) scale(1.12) rotate(40deg); }
          66%  { transform: translate3d(80px, 280px, 0) scale(0.92) rotate(-25deg); }
          100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
        }

        @keyframes blob-orbit-2 {
          0%   { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          25%  { transform: translate3d(-220px, -140px, 0) scale(0.88) rotate(-30deg); }
          55%  { transform: translate3d(-90px, -300px, 0) scale(1.15) rotate(35deg); }
          80%  { transform: translate3d(-200px, -60px, 0) scale(1) rotate(15deg); }
          100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
        }

        @keyframes blob-orbit-3 {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          40%  { transform: translate3d(-260px, 180px, 0) scale(1.18); }
          70%  { transform: translate3d(-120px, 80px, 0) scale(0.85); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blob-orbit-4 {
          0%   { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50%  { transform: translate3d(300px, -160px, 0) scale(1.2) rotate(50deg); }
          100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
        }

        @keyframes blob-orbit-5 {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          30%  { transform: translate3d(-180px, 220px, 0) scale(0.9); }
          60%  { transform: translate3d(220px, 100px, 0) scale(1.15); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
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

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
