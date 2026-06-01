/**
 * Starfield — Núcleo de energía tecnológica.
 *
 * 5 capas premium con movimiento orgánico continuo:
 *  1. Base profunda (#0a0b1a) con gradiente vertical sutil.
 *  2. Aurora principal: 3 masas gigantes (violeta, azul eléctrico, indigo)
 *     con overlap parcial para mezcla orgánica de color.
 *  3. Energía secundaria: 2 sparks (cyan, violeta brillante) más rápidos.
 *  4. Campo estelar curado (2 capas, drift muy lento opuesto).
 *  5. Glow atmosférico + vignette.
 *
 * Diseño:
 *  - NO usa `mix-blend-mode: screen` (lección del intento anterior — sobre
 *    fondo casi opaco mata la saturación). Solo opacity directa sobre la base.
 *  - Wrapper `isolation: isolate` en MainLayout permite `z-index: -10` sin
 *    quedar atrapado tras el background del #root.
 *
 * Performance:
 *  - Solo `transform` y `opacity` animados (GPU compositor).
 *  - Blur estático en elemento visible → cacheado, los wrappers solo
 *    transforman.
 *  - 5 masas + 2 capas de estrellas + 1 glow = 8 elementos animados.
 *  - `will-change: transform` en wrappers.
 *  - `prefers-reduced-motion` pausa todo.
 *
 * Duraciones primas/coprimas (19, 23, 31, 37, 41, 43, 47, 53, 61, 67, 71,
 * 89, 113, 187, 211) → nunca resincronizan visualmente.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0d0f24 0%, #0a0b1a 50%, #08091a 100%)",
      }}
    >
      {/* CAPA 5 — Glow atmosférico de fondo (radial central sutil) */}
      <div className="atmo-glow" />

      {/* CAPA 2 — Aurora principal: 3 masas gigantes */}

      {/* Aurora 1 — Violeta profunda */}
      <div className="mass-translate mass-1-translate">
        <div className="mass-scale mass-1-scale">
          <div className="mass mass-1" />
        </div>
      </div>

      {/* Aurora 2 — Azul eléctrico */}
      <div className="mass-translate mass-2-translate">
        <div className="mass-scale mass-2-scale">
          <div className="mass-spin mass-2-spin">
            <div className="mass mass-2" />
          </div>
        </div>
      </div>

      {/* Aurora 3 — Indigo */}
      <div className="mass-translate mass-3-translate">
        <div className="mass-scale mass-3-scale">
          <div className="mass mass-3" />
        </div>
      </div>

      {/* CAPA 3 — Energía secundaria */}

      {/* Energy 1 — Cyan (pulso-órbita) */}
      <div className="mass-translate energy-1-translate">
        <div className="mass-scale energy-1-scale">
          <div className="energy energy-1" />
        </div>
      </div>

      {/* Energy 2 — Violeta brillante (drift + spin) */}
      <div className="mass-translate energy-2-translate">
        <div className="mass-spin energy-2-spin">
          <div className="energy energy-2" />
        </div>
      </div>

      {/* CAPA 4 — Campo estelar curado */}
      <div className="stars-far-wrap">
        <div className="absolute inset-0 stars-far" />
      </div>
      <div className="stars-near-wrap">
        <div className="absolute inset-0 stars-near" />
      </div>

      {/* CAPA 5 — Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,11,26,0.35) 0%, transparent 18%, transparent 82%, rgba(10,11,26,0.6) 100%)",
        }}
      />

      <style>{`
        /* ============================================================
           GLOW ATMOSFÉRICO — radial central con pulso de opacidad
           ============================================================ */
        .atmo-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 50% 40%, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0.06) 35%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(139, 92, 246, 0.10) 0%, transparent 60%);
          animation: atmo-pulse 23s linear infinite;
          will-change: opacity;
        }

        @keyframes atmo-pulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.85; }
        }

        /* ============================================================
           ESTRUCTURA COMÚN — wrappers vacíos para componer transforms
           ============================================================ */
        .mass-translate, .mass-scale, .mass-spin {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }

        .mass, .energy {
          position: absolute;
          will-change: transform, border-radius;
        }

        /* ============================================================
           AURORA PRINCIPAL — 3 masas gigantes
           ============================================================ */

        /* MASA 1 — VIOLETA PROFUNDA (top-left, drift lateral + morph) */
        .mass-1-translate {
          top: 28%;
          left: 18%;
          animation: drift-lateral 71s linear infinite;
        }
        .mass-1-scale {
          animation: breathe-iso 47s linear infinite;
        }
        .mass-1 {
          width: 90vw;
          height: 90vw;
          max-width: 1100px;
          max-height: 1100px;
          margin-left: -45vw;
          margin-top: -45vw;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.45) 35%, rgba(124, 58, 237, 0.12) 60%, transparent 75%);
          filter: blur(120px);
          opacity: 0.78;
          border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%;
          animation: morph-a 53s linear infinite;
        }

        /* MASA 2 — AZUL ELÉCTRICO (bottom-right, diagonal + spin lento) */
        .mass-2-translate {
          top: 70%;
          left: 78%;
          animation: drift-diag 89s linear infinite;
        }
        .mass-2-scale {
          animation: breathe-vertical 37s linear infinite;
        }
        .mass-2-spin {
          animation: spin-cw 113s linear infinite;
        }
        .mass-2 {
          width: 100vw;
          height: 100vw;
          max-width: 1300px;
          max-height: 1300px;
          margin-left: -50vw;
          margin-top: -50vw;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.92) 0%, rgba(59, 130, 246, 0.4) 32%, rgba(37, 99, 235, 0.12) 58%, transparent 72%);
          filter: blur(140px);
          opacity: 0.70;
          border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%;
          animation: morph-b 41s linear infinite;
        }

        /* MASA 3 — INDIGO (centro-derecha, orbita) */
        .mass-3-translate {
          top: 50%;
          left: 62%;
          animation: orbit-ellipse 61s linear infinite;
        }
        .mass-3-scale {
          animation: breathe-anisotropic 43s linear infinite;
        }
        .mass-3 {
          width: 80vw;
          height: 80vw;
          max-width: 1000px;
          max-height: 1000px;
          margin-left: -40vw;
          margin-top: -40vw;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.88) 0%, rgba(79, 70, 229, 0.4) 35%, transparent 65%);
          filter: blur(110px);
          opacity: 0.65;
          border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%;
          animation: morph-c 67s linear infinite;
        }

        /* ============================================================
           ENERGÍA SECUNDARIA — 2 sparks más rápidos
           ============================================================ */

        /* ENERGY 1 — CYAN (pulso-órbita) */
        .energy-1-translate {
          top: 25%;
          left: 78%;
          animation: spark-orbit 31s linear infinite;
        }
        .energy-1-scale {
          animation: pulse-strong 19s linear infinite;
        }
        .energy-1 {
          width: 40vw;
          height: 40vw;
          max-width: 500px;
          max-height: 500px;
          margin-left: -20vw;
          margin-top: -20vw;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.85) 0%, rgba(34, 211, 238, 0.35) 35%, transparent 65%);
          filter: blur(80px);
          opacity: 0.55;
          border-radius: 70% 30% 50% 50% / 40% 65% 35% 60%;
          animation: morph-d 37s linear infinite;
        }

        /* ENERGY 2 — VIOLETA BRILLANTE (drift + spin) */
        .energy-2-translate {
          top: 78%;
          left: 22%;
          animation: spark-drift 19s linear infinite;
        }
        .energy-2-spin {
          animation: spin-ccw 67s linear infinite;
        }
        .energy-2 {
          width: 35vw;
          height: 35vw;
          max-width: 450px;
          max-height: 450px;
          margin-left: -17.5vw;
          margin-top: -17.5vw;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.82) 0%, rgba(168, 85, 247, 0.3) 38%, transparent 65%);
          filter: blur(70px);
          opacity: 0.50;
        }

        /* ============================================================
           KEYFRAMES — TRASLACIONES
           ============================================================ */

        @keyframes drift-lateral {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(15vw, 3vh, 0); }
          50%  { transform: translate3d(30vw, 0, 0); }
          75%  { transform: translate3d(15vw, -3vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes drift-diag {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-12vw, -8vh, 0); }
          50%  { transform: translate3d(-22vw, -18vh, 0); }
          75%  { transform: translate3d(-10vw, -8vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes orbit-ellipse {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(8vw, -10vh, 0); }
          50%  { transform: translate3d(0, -18vh, 0); }
          75%  { transform: translate3d(-8vw, -10vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes spark-orbit {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-10vw, 8vh, 0); }
          50%  { transform: translate3d(-18vw, 0, 0); }
          75%  { transform: translate3d(-10vw, -8vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes spark-drift {
          0%   { transform: translate3d(0, 0, 0); }
          33%  { transform: translate3d(12vw, -6vh, 0); }
          66%  { transform: translate3d(6vw, 10vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* ============================================================
           KEYFRAMES — ESCALAS Y RESPIRACIÓN
           ============================================================ */

        @keyframes breathe-iso {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.08); }
          50%  { transform: scale(1.14); }
          75%  { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes breathe-vertical {
          0%   { transform: scale(1, 1); }
          25%  { transform: scale(0.94, 1.10); }
          50%  { transform: scale(1.08, 0.92); }
          75%  { transform: scale(0.96, 1.08); }
          100% { transform: scale(1, 1); }
        }

        @keyframes breathe-anisotropic {
          0%   { transform: scale(1, 1); }
          33%  { transform: scale(1.08, 0.93); }
          66%  { transform: scale(0.93, 1.08); }
          100% { transform: scale(1, 1); }
        }

        @keyframes pulse-strong {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.18); }
          40%  { transform: scale(0.92); }
          60%  { transform: scale(1.20); }
          80%  { transform: scale(0.96); }
          100% { transform: scale(1); }
        }

        /* ============================================================
           KEYFRAMES — ROTACIONES
           ============================================================ */

        @keyframes spin-cw {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-ccw {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* ============================================================
           KEYFRAMES — MORPH (siluetas líquidas)
           ============================================================ */

        @keyframes morph-a {
          0%, 100% { border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%; }
          25%      { border-radius: 35% 65% 70% 30% / 40% 60% 50% 50%; }
          50%      { border-radius: 50% 50% 30% 70% / 65% 35% 45% 55%; }
          75%      { border-radius: 70% 30% 55% 45% / 35% 65% 60% 40%; }
        }

        @keyframes morph-b {
          0%, 100% { border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%; }
          33%      { border-radius: 65% 35% 40% 60% / 35% 50% 55% 65%; }
          66%      { border-radius: 30% 70% 55% 45% / 60% 40% 50% 50%; }
        }

        @keyframes morph-c {
          0%, 100% { border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%; }
          25%      { border-radius: 65% 35% 55% 45% / 35% 65% 40% 60%; }
          50%      { border-radius: 30% 70% 45% 55% / 55% 45% 60% 40%; }
          75%      { border-radius: 60% 40% 65% 35% / 45% 55% 35% 65%; }
        }

        @keyframes morph-d {
          0%, 100% { border-radius: 70% 30% 50% 50% / 40% 65% 35% 60%; }
          50%      { border-radius: 40% 60% 35% 65% / 55% 45% 65% 35%; }
        }

        /* ============================================================
           CAMPO ESTELAR — 2 capas con drift muy lento opuesto
           ============================================================ */

        .stars-far-wrap {
          position: absolute;
          inset: -10%;
          opacity: 0.55;
          animation: stars-drift-far 187s linear infinite;
          will-change: transform;
        }
        .stars-near-wrap {
          position: absolute;
          inset: -10%;
          opacity: 0.75;
          animation: stars-drift-near 211s linear infinite;
          will-change: transform;
        }

        @keyframes stars-drift-far {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-2.5%, 3.5%, 0); }
        }

        @keyframes stars-drift-near {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(3.5%, -2.5%, 0); }
        }

        .stars-far {
          background-image:
            radial-gradient(1px 1px at 9% 14%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 21% 38%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 31% 7%,  rgba(255,255,255,0.6), transparent 50%),
            radial-gradient(1px 1px at 44% 68%, rgba(255,255,255,0.45), transparent 50%),
            radial-gradient(1px 1px at 53% 28%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 64% 84%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 71% 19%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 79% 61%, rgba(255,255,255,0.65), transparent 50%),
            radial-gradient(1px 1px at 87% 12%, rgba(255,255,255,0.4),  transparent 50%),
            radial-gradient(1px 1px at 93% 49%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 6%  79%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 16% 92%, rgba(255,255,255,0.45), transparent 50%),
            radial-gradient(1px 1px at 48% 46%, rgba(255,255,255,0.6),  transparent 50%);
          background-size: 100% 100%;
        }

        .stars-near {
          background-image:
            radial-gradient(1.5px 1.5px at 17% 26%, rgba(255,255,255,0.95), transparent 60%),
            radial-gradient(1.5px 1.5px at 37% 59%, rgba(255,255,255,0.85), transparent 60%),
            radial-gradient(1.5px 1.5px at 59% 13%, rgba(255,255,255,0.9),  transparent 60%),
            radial-gradient(2px 2px   at 73% 76%, rgba(200,220,255,0.95),   transparent 60%),
            radial-gradient(2px 2px   at 86% 35%, rgba(220,210,255,0.9),    transparent 60%),
            radial-gradient(2px 2px   at 26% 84%, rgba(255,255,255,0.95),   transparent 60%),
            radial-gradient(1.5px 1.5px at 51% 21%, rgba(200,220,255,0.85), transparent 60%);
          background-size: 100% 100%;
        }

        /* ============================================================
           ACCESIBILIDAD
           ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .mass-translate,
          .mass-scale,
          .mass-spin,
          .mass,
          .energy,
          .atmo-glow,
          .stars-far-wrap,
          .stars-near-wrap {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
