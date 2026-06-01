/**
 * Starfield — Fondo SaaS premium.
 *
 * Inspiración: Linear, Stripe, Arc Browser, Raycast.
 *
 * Solo 4 capas (estrictas):
 *  1. Base navy (#060B1F).
 *  2. Dos masas de energía orgánica en esquinas superiores.
 *     - Top-left: violeta brillante, forma líquida (border-radius asimétrico
 *       animado), blur grande.
 *     - Top-right: cyan + azul eléctrico, misma técnica.
 *     Posicionadas en esquinas → la zona central queda oscura → el texto
 *     del hero conserva contraste sin overlays.
 *  3. Partículas muy pocas, distribución manual.
 *  4. Líneas curvas sutiles tipo órbitas (SVG, stroke rgba blanco al 5%).
 *
 * Sin mix-blend-mode. Sin spotlight central. Sin horizonte. Sin niebla
 * volumétrica. Sin light shafts.
 *
 * Movimiento: drift muy lento (89-127s) y breathing casi imperceptible
 * (53-67s). Sin rotaciones rápidas.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "#060B1F" }}
    >
      {/* CAPA 2 — Masa de energía violeta (top-left) */}
      <div className="mass-translate mass-left-translate">
        <div className="mass-scale mass-left-scale">
          <div className="mass mass-left" />
        </div>
      </div>

      {/* CAPA 2 — Masa de energía cyan+azul (top-right) */}
      <div className="mass-translate mass-right-translate">
        <div className="mass-scale mass-right-scale">
          <div className="mass mass-right" />
        </div>
      </div>

      {/* CAPA 4 — Líneas curvas sutiles tipo órbitas */}
      <svg
        className="absolute left-1/2 top-[20%] -translate-x-1/2 opacity-100"
        width="1400"
        height="900"
        viewBox="0 0 1400 900"
        fill="none"
        style={{ maxWidth: "120vw" }}
      >
        {/* Órbita exterior */}
        <ellipse
          cx="700"
          cy="450"
          rx="650"
          ry="220"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
        />
        {/* Órbita media */}
        <ellipse
          cx="700"
          cy="450"
          rx="500"
          ry="160"
          stroke="rgba(255,255,255,0.035)"
          strokeWidth="1"
        />
        {/* Órbita inclinada */}
        <ellipse
          cx="700"
          cy="450"
          rx="780"
          ry="180"
          stroke="rgba(255,255,255,0.025)"
          strokeWidth="1"
          transform="rotate(-12 700 450)"
        />
        {/* Curva de trayectoria sutil */}
        <path
          d="M -100 600 Q 350 200 700 380 T 1500 350"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* CAPA 3 — Partículas curadas (distribución manual) */}
      <div className="particles-wrap">
        <span className="particle" style={{ top: "12%", left: "8%", width: "2px", height: "2px", opacity: 0.7 }} />
        <span className="particle" style={{ top: "22%", left: "18%", width: "1px", height: "1px", opacity: 0.45 }} />
        <span className="particle" style={{ top: "8%", left: "34%", width: "1.5px", height: "1.5px", opacity: 0.55 }} />
        <span className="particle" style={{ top: "28%", left: "47%", width: "1px", height: "1px", opacity: 0.4 }} />
        <span className="particle" style={{ top: "14%", left: "62%", width: "2px", height: "2px", opacity: 0.65 }} />
        <span className="particle" style={{ top: "30%", left: "76%", width: "1.5px", height: "1.5px", opacity: 0.5 }} />
        <span className="particle" style={{ top: "6%", left: "88%", width: "1px", height: "1px", opacity: 0.4 }} />
        <span className="particle" style={{ top: "54%", left: "11%", width: "1.5px", height: "1.5px", opacity: 0.5 }} />
        <span className="particle" style={{ top: "72%", left: "23%", width: "1px", height: "1px", opacity: 0.35 }} />
        <span className="particle" style={{ top: "62%", left: "70%", width: "1.5px", height: "1.5px", opacity: 0.5 }} />
        <span className="particle" style={{ top: "82%", left: "82%", width: "1px", height: "1px", opacity: 0.4 }} />
        <span className="particle" style={{ top: "44%", left: "92%", width: "2px", height: "2px", opacity: 0.6 }} />
      </div>

      <style>{`
        /* ============================================================
           MASAS DE ENERGÍA ORGÁNICA
           Posición: esquinas superiores → centro queda oscuro.
           ============================================================ */
        .mass-translate, .mass-scale {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }
        .mass {
          position: absolute;
          will-change: transform, border-radius;
        }

        /* Masa izquierda — VIOLETA */
        .mass-left-translate {
          top: -10%;
          left: -5%;
          animation: drift-left 113s linear infinite;
        }
        .mass-left-scale {
          animation: breathe-soft 53s linear infinite;
        }
        .mass-left {
          width: 60vw;
          height: 60vw;
          max-width: 850px;
          max-height: 850px;
          margin-left: -30vw;
          margin-top: -30vw;
          background: radial-gradient(
            ellipse 55% 50% at 50% 50%,
            rgba(168, 85, 247, 0.55) 0%,
            rgba(139, 92, 246, 0.28) 30%,
            rgba(124, 58, 237, 0.10) 55%,
            transparent 75%
          );
          filter: blur(80px);
          opacity: 0.85;
          border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%;
          animation: morph-organic-a 67s linear infinite;
        }

        /* Masa derecha — CYAN + AZUL */
        .mass-right-translate {
          top: -8%;
          right: -10%;
          animation: drift-right 127s linear infinite;
        }
        .mass-right-scale {
          animation: breathe-soft 61s linear infinite;
        }
        .mass-right {
          width: 55vw;
          height: 55vw;
          max-width: 800px;
          max-height: 800px;
          margin-left: -27.5vw;
          margin-top: -27.5vw;
          background: radial-gradient(
            ellipse 55% 50% at 50% 50%,
            rgba(34, 211, 238, 0.42) 0%,
            rgba(59, 130, 246, 0.28) 30%,
            rgba(37, 99, 235, 0.10) 55%,
            transparent 75%
          );
          filter: blur(80px);
          opacity: 0.78;
          border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%;
          animation: morph-organic-b 71s linear infinite;
        }

        /* ============================================================
           ANIMACIONES — drift lento + breathing + morph líquido
           ============================================================ */
        @keyframes drift-left {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(4vw, 3vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-right {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-4vw, 3vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes breathe-soft {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes morph-organic-a {
          0%, 100% { border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%; }
          25%      { border-radius: 40% 60% 55% 45% / 60% 40% 50% 50%; }
          50%      { border-radius: 50% 50% 60% 40% / 45% 55% 50% 50%; }
          75%      { border-radius: 65% 35% 40% 60% / 50% 50% 55% 45%; }
        }
        @keyframes morph-organic-b {
          0%, 100% { border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%; }
          33%      { border-radius: 60% 40% 50% 50% / 55% 45% 60% 40%; }
          66%      { border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%; }
        }

        /* ============================================================
           PARTÍCULAS
           ============================================================ */
        .particles-wrap {
          position: absolute;
          inset: 0;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
        }

        /* ============================================================
           ACCESIBILIDAD
           ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .mass-translate,
          .mass-scale,
          .mass {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
