/**
 * Starfield — "Horizonte Digital".
 *
 * Escena: punto de vista desde órbita baja sobre un planeta tecnológico.
 *  - Arriba: profundidad espacial con estrellas.
 *  - Centro (~35% vertical): spotlight detrás del hero (garantiza contraste).
 *  - Bajo (~75% vertical): línea de horizonte luminoso indigo + cyan.
 *  - Por encima del horizonte: atmósfera, light shafts emergentes, neblina.
 *
 * Capas (de fondo a frente):
 *   1. Base navy con gradiente vertical (top profundo → horizonte cálido).
 *   2. Spotlight del hero (radial elíptico 50% horiz, 35% vert).
 *   3. Neblina volumétrica violeta (top-left).
 *   4. Neblina volumétrica cyan (mid-right).
 *   5. Light shafts ×3 (rayos verticales emergiendo del horizonte).
 *   6. Glow del horizonte (banda indigo+cyan a ~75% vert).
 *   7. Base del planeta (banda navy oscuro bajo el horizonte).
 *   8. Atmósfera frontal con pulso de opacidad muy sutil.
 *   9. Estrellas curadas + vignette superior.
 *
 * Sin `mix-blend-mode`. Solo opacity sobre la base.
 *
 * Movimiento casi imperceptible (el usuario debe sentir vida, no notar
 * animación). Solo `transform` + `opacity` animados. Duraciones largas
 * (29s, 47s, 73s, 89s, 113s, 191s, 223s) y primas/coprimas.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050816 0%, #070b1f 50%, #0a1028 100%)",
      }}
    >
      {/* CAPA 2 — Spotlight del hero */}
      <div className="hero-spotlight" />

      {/* CAPA 3 — Neblina volumétrica violeta (top-left) */}
      <div className="haze-translate haze-1-translate">
        <div className="haze haze-1" />
      </div>

      {/* CAPA 4 — Neblina volumétrica cyan (mid-right) */}
      <div className="haze-translate haze-2-translate">
        <div className="haze haze-2" />
      </div>

      {/* CAPA 5 — Light shafts (rayos verticales sutiles) */}
      <div className="shafts">
        <div className="shaft shaft-1" />
        <div className="shaft shaft-2" />
        <div className="shaft shaft-3" />
      </div>

      {/* CAPA 6 — Glow del horizonte */}
      <div className="horizon-glow" />

      {/* CAPA 7 — Base del planeta (banda más oscura) */}
      <div className="planet-base" />

      {/* CAPA 8 — Atmósfera frontal (unifica, pulso muy sutil) */}
      <div className="atmo-front" />

      {/* CAPA 9 — Campo estelar curado */}
      <div className="stars-far-wrap">
        <div className="absolute inset-0 stars-far" />
      </div>
      <div className="stars-near-wrap">
        <div className="absolute inset-0 stars-near" />
      </div>

      {/* Vignette superior (no competir con navbar) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,22,0.55) 0%, transparent 14%, transparent 92%, rgba(5,8,22,0.4) 100%)",
        }}
      />

      <style>{`
        /* ============================================================
           CAPA 2 — SPOTLIGHT DEL HERO
           Elíptico, centrado en 50% horiz / 35% vert.
           Garantiza contraste detrás del título/CTA.
           ============================================================ */
        .hero-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 75% 55% at 50% 35%,
            rgba(139, 92, 246, 0.32) 0%,
            rgba(99, 102, 241, 0.18) 25%,
            rgba(59, 130, 246, 0.08) 50%,
            transparent 75%
          );
          animation: spotlight-breathe 47s linear infinite;
          will-change: opacity;
        }

        @keyframes spotlight-breathe {
          0%, 100% { opacity: 0.9; }
          50%      { opacity: 1; }
        }

        /* ============================================================
           CAPAS 3-4 — NEBLINA VOLUMÉTRICA
           Wrappers que driftean muy lentamente; elemento interno
           solo aplica filter blur estático.
           ============================================================ */
        .haze-translate {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }
        .haze {
          position: absolute;
          will-change: transform;
        }

        /* Niebla violeta — top-left */
        .haze-1-translate {
          top: 20%;
          left: 15%;
          animation: haze-drift-1 113s linear infinite;
        }
        .haze-1 {
          width: 80vw;
          height: 60vw;
          max-width: 1100px;
          max-height: 800px;
          margin-left: -40vw;
          margin-top: -30vw;
          background: radial-gradient(
            ellipse 60% 50% at 50% 50%,
            rgba(139, 92, 246, 0.42) 0%,
            rgba(124, 58, 237, 0.18) 35%,
            transparent 65%
          );
          filter: blur(110px);
          opacity: 0.65;
        }

        /* Niebla cyan — mid-right */
        .haze-2-translate {
          top: 55%;
          left: 78%;
          animation: haze-drift-2 89s linear infinite;
        }
        .haze-2 {
          width: 70vw;
          height: 50vw;
          max-width: 950px;
          max-height: 700px;
          margin-left: -35vw;
          margin-top: -25vw;
          background: radial-gradient(
            ellipse 55% 45% at 50% 50%,
            rgba(34, 211, 238, 0.32) 0%,
            rgba(96, 165, 250, 0.15) 35%,
            transparent 65%
          );
          filter: blur(120px);
          opacity: 0.58;
        }

        @keyframes haze-drift-1 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(8vw, -4vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes haze-drift-2 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-7vw, 3vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* ============================================================
           CAPA 5 — LIGHT SHAFTS
           Rayos verticales muy sutiles emergiendo del horizonte.
           Opacidad baja, drift vertical extremadamente lento.
           ============================================================ */
        .shafts {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .shaft {
          position: absolute;
          bottom: 25%;
          height: 70vh;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(167, 139, 250, 0.16) 50%,
            rgba(99, 102, 241, 0.10) 90%,
            transparent 100%
          );
          filter: blur(22px);
          will-change: opacity, transform;
        }
        .shaft-1 {
          left: 22%;
          width: 8vw;
          opacity: 0.55;
          animation: shaft-pulse-1 73s linear infinite;
        }
        .shaft-2 {
          left: 48%;
          width: 6vw;
          opacity: 0.4;
          animation: shaft-pulse-2 89s linear infinite;
        }
        .shaft-3 {
          left: 71%;
          width: 9vw;
          opacity: 0.5;
          animation: shaft-pulse-3 113s linear infinite;
        }

        @keyframes shaft-pulse-1 {
          0%, 100% { opacity: 0.40; transform: translate3d(0, 0, 0); }
          50%      { opacity: 0.65; transform: translate3d(-1.5vw, -2vh, 0); }
        }
        @keyframes shaft-pulse-2 {
          0%, 100% { opacity: 0.30; transform: translate3d(0, 0, 0); }
          50%      { opacity: 0.50; transform: translate3d(1vw, -1.5vh, 0); }
        }
        @keyframes shaft-pulse-3 {
          0%, 100% { opacity: 0.35; transform: translate3d(0, 0, 0); }
          50%      { opacity: 0.55; transform: translate3d(-1vw, -2.5vh, 0); }
        }

        /* ============================================================
           CAPA 6 — GLOW DEL HORIZONTE
           Banda horizontal a ~75% vert. con curvatura sutil.
           ============================================================ */
        .horizon-glow {
          position: absolute;
          left: -10%;
          right: -10%;
          top: 65%;
          height: 25vh;
          background: radial-gradient(
            ellipse 60% 100% at 50% 100%,
            rgba(99, 102, 241, 0.55) 0%,
            rgba(34, 211, 238, 0.35) 25%,
            rgba(59, 130, 246, 0.15) 50%,
            transparent 80%
          );
          filter: blur(30px);
          opacity: 0.8;
          animation: horizon-breathe 47s linear infinite;
          will-change: opacity;
        }

        @keyframes horizon-breathe {
          0%, 100% { opacity: 0.75; }
          50%      { opacity: 0.95; }
        }

        /* ============================================================
           CAPA 7 — BASE DEL PLANETA (banda más oscura bajo el horizonte)
           ============================================================ */
        .planet-base {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 28vh;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(5, 8, 22, 0.35) 30%,
            rgba(5, 8, 22, 0.7) 70%,
            rgba(3, 5, 14, 0.9) 100%
          );
        }

        /* ============================================================
           CAPA 8 — ATMÓSFERA FRONTAL (tinte unificador, pulso sutil)
           ============================================================ */
        .atmo-front {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 100% 80% at 50% 40%,
            rgba(99, 102, 241, 0.06) 0%,
            transparent 70%
          );
          animation: atmo-pulse 29s linear infinite;
          will-change: opacity;
        }

        @keyframes atmo-pulse {
          0%, 100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }

        /* ============================================================
           CAPA 9 — ESTRELLAS CURADAS (drift muy lento)
           ============================================================ */
        .stars-far-wrap {
          position: absolute;
          inset: -10%;
          opacity: 0.45;
          animation: stars-drift-far 191s linear infinite;
          will-change: transform;
        }
        .stars-near-wrap {
          position: absolute;
          inset: -10%;
          top: -10%;
          bottom: 25%;
          opacity: 0.7;
          animation: stars-drift-near 223s linear infinite;
          will-change: transform;
        }

        @keyframes stars-drift-far {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-2%, 2.5%, 0); }
        }
        @keyframes stars-drift-near {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(2.5%, -2%, 0); }
        }

        .stars-far {
          background-image:
            radial-gradient(1px 1px at 11% 13%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 23% 28%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 33% 8%,  rgba(255,255,255,0.6), transparent 50%),
            radial-gradient(1px 1px at 44% 35%, rgba(255,255,255,0.45), transparent 50%),
            radial-gradient(1px 1px at 54% 18%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 65% 42%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 73% 12%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 81% 32%, rgba(255,255,255,0.65), transparent 50%),
            radial-gradient(1px 1px at 89% 6%,  rgba(255,255,255,0.4),  transparent 50%),
            radial-gradient(1px 1px at 6%  44%, rgba(255,255,255,0.55), transparent 50%);
          background-size: 100% 100%;
        }

        .stars-near {
          background-image:
            radial-gradient(1.5px 1.5px at 19% 17%, rgba(255,255,255,0.95), transparent 60%),
            radial-gradient(1.5px 1.5px at 38% 41%, rgba(255,255,255,0.85), transparent 60%),
            radial-gradient(1.5px 1.5px at 60% 8%, rgba(255,255,255,0.9),  transparent 60%),
            radial-gradient(2px 2px   at 74% 26%, rgba(200,220,255,0.95),   transparent 60%),
            radial-gradient(2px 2px   at 86% 14%, rgba(220,210,255,0.9),    transparent 60%),
            radial-gradient(1.5px 1.5px at 26% 38%, rgba(255,255,255,0.85), transparent 60%);
          background-size: 100% 100%;
        }

        /* ============================================================
           ACCESIBILIDAD
           ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .hero-spotlight,
          .haze-translate,
          .haze,
          .shaft,
          .horizon-glow,
          .atmo-front,
          .stars-far-wrap,
          .stars-near-wrap {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
