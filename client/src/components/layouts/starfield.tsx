/**
 * Starfield — Aurora viva, premium y continuamente en movimiento.
 *
 * Composición:
 *  1. Base color: #070b24 (azul-violeta muy profundo, NUNCA negro puro).
 *  2. Wash permanente: gradientes violeta + cyan + azul a todo el viewport,
 *     siempre visibles aunque las masas estén del otro lado. Sin animar:
 *     garantiza que la pantalla nunca se perciba neutra/negra.
 *  3. 5 masas de aurora gigantes (75vw–110vw), con `border-radius` asimétrico
 *     animado para silueta orgánica + gradiente radial intenso + blur
 *     cinematográfico (120–180px) + `mix-blend-mode: screen` para que las
 *     superposiciones sumen color en lugar de oscurecer.
 *  4. Estrellas en dos capas con drift suave (secundarias).
 *  5. Vignette superior/inferior para foco central.
 *
 * Filosofía de animación:
 *  - 100% `linear infinite` con `0% == 100%` → wraparound seamless, sin pausa.
 *  - Composición vía wrappers anidados (translate / scale / rotate) sin
 *    colisión de la propiedad `transform`.
 *  - Duraciones primas/coprimas (17, 23, 29, 31, 37, 41, 43, 47, 53, 61, 67,
 *    71, 89, 97, 121) → las capas nunca resincronizan visualmente.
 *  - Cada masa además anima `border-radius` (silueta líquida) y un wrapper
 *    de gradiente que rota lentamente (corrientes internas de color).
 *
 * Performance:
 *  - El blur pesado vive en el elemento visible; los wrappers solo aplican
 *    `transform` → GPU composita sin recomputar blur.
 *  - `will-change: transform` en wrappers animados.
 *  - `prefers-reduced-motion` pausa todo.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: "#070b24" }}
    >
      {/* 1. Wash permanente — pantalla nunca negra */}
      <div className="aurora-wash" />

      {/* 2. Pulso de aurora ambiental (oscila opacidad) */}
      <div className="aurora-pulse" />

      {/* 3. Masas de aurora ----------------------------------------- */}

      {/* Masa 1 — VIOLETA PROFUNDA (gigante, deriva lateral) */}
      <div className="mass-translate mass-1-translate">
        <div className="mass-scale mass-1-scale">
          <div className="mass mass-1" />
        </div>
      </div>

      {/* Masa 2 — AZUL ELÉCTRICA (gigante, diagonal ascendente + spin) */}
      <div className="mass-translate mass-2-translate">
        <div className="mass-scale mass-2-scale">
          <div className="mass-spin mass-2-spin">
            <div className="mass mass-2" />
          </div>
        </div>
      </div>

      {/* Masa 3 — CYAN (organica, diagonal descendente + pulso) */}
      <div className="mass-translate mass-3-translate">
        <div className="mass-scale mass-3-scale">
          <div className="mass mass-3" />
        </div>
      </div>

      {/* Masa 4 — MAGENTA MIX (organica, orbita elíptica) */}
      <div className="mass-translate mass-4-translate">
        <div className="mass-scale mass-4-scale">
          <div className="mass-spin mass-4-spin">
            <div className="mass mass-4" />
          </div>
        </div>
      </div>

      {/* Masa 5 — NIEBLA ENERGÉTICA (ultra-diffusa, lentísima) */}
      <div className="mass-translate mass-5-translate">
        <div className="mass-scale mass-5-scale">
          <div className="mass mass-5" />
        </div>
      </div>

      {/* 4. Estrellas (secundarias) */}
      <div className="stars-drift-far">
        <div className="absolute inset-0 starfield-far" />
      </div>
      <div className="stars-drift-near">
        <div className="absolute inset-0 starfield-near" />
      </div>

      {/* 5. Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7, 11, 36, 0.4) 0%, transparent 18%, transparent 82%, rgba(7, 11, 36, 0.65) 100%)",
        }}
      />

      <style>{`
        /* ============================================================
           WASH PERMANENTE — sin animación, pantalla siempre con color
           ============================================================ */
        .aurora-wash {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          background:
            radial-gradient(ellipse 70% 60% at 22% 28%, rgba(124, 58, 237, 0.45) 0%, rgba(124, 58, 237, 0.15) 35%, transparent 65%),
            radial-gradient(ellipse 60% 55% at 78% 75%, rgba(34, 211, 238, 0.32) 0%, rgba(34, 211, 238, 0.10) 40%, transparent 65%),
            radial-gradient(ellipse 80% 50% at 55% 50%, rgba(96, 165, 250, 0.22) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 15% 80%, rgba(139, 92, 246, 0.28) 0%, transparent 55%);
        }

        /* Pulso lento de aurora ambiental (siempre algo respirando) */
        .aurora-pulse {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          background:
            radial-gradient(ellipse 90% 60% at 50% 35%, rgba(139, 92, 246, 0.25) 0%, transparent 60%);
          animation: aurora-pulse-anim 17s linear infinite;
          will-change: opacity;
        }

        @keyframes aurora-pulse-anim {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 0.85; }
        }

        /* ============================================================
           MASAS DE AURORA
           ============================================================ */

        /* Wrappers (no visuales, solo aplican transform) */
        .mass-translate, .mass-scale, .mass-spin {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }

        /* Elemento visible */
        .mass {
          position: absolute;
          mix-blend-mode: screen;
          filter: blur(140px);
          will-change: transform, border-radius;
        }

        /* ---------- MASA 1 — VIOLETA PROFUNDA ---------- */
        .mass-1-translate {
          top: 15%;
          left: 0;
          animation: drift-lateral-wide 53s linear infinite;
        }
        .mass-1-scale {
          animation: breathe-soft 29s linear infinite;
        }
        .mass-1 {
          width: 100vw;
          height: 100vw;
          margin-left: -50vw;
          margin-top: -50vw;
          background: radial-gradient(circle, rgba(139, 92, 246, 1) 0%, rgba(124, 58, 237, 0.55) 35%, rgba(124, 58, 237, 0.15) 60%, transparent 75%);
          opacity: 0.72;
          filter: blur(160px);
          border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%;
          animation: morph-a 43s linear infinite;
        }

        /* ---------- MASA 2 — AZUL ELÉCTRICA ---------- */
        .mass-2-translate {
          bottom: 0;
          right: 5%;
          animation: drift-diag-up-wide 67s linear infinite;
        }
        .mass-2-scale {
          animation: breathe-vertical 31s linear infinite;
        }
        .mass-2-spin {
          animation: spin-slow 97s linear infinite;
        }
        .mass-2 {
          width: 110vw;
          height: 110vw;
          margin-left: -55vw;
          margin-top: -55vw;
          background: radial-gradient(circle, rgba(96, 165, 250, 0.95) 0%, rgba(96, 165, 250, 0.45) 30%, rgba(59, 130, 246, 0.15) 55%, transparent 70%);
          opacity: 0.68;
          filter: blur(180px);
          border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%;
          animation: morph-b 47s linear infinite;
        }

        /* ---------- MASA 3 — CYAN ---------- */
        .mass-3-translate {
          top: 5%;
          right: 10%;
          animation: drift-diag-down-wide 41s linear infinite;
        }
        .mass-3-scale {
          animation: pulse-strong 23s linear infinite;
        }
        .mass-3 {
          width: 75vw;
          height: 75vw;
          margin-left: -37.5vw;
          margin-top: -37.5vw;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.9) 0%, rgba(34, 211, 238, 0.4) 35%, transparent 65%);
          opacity: 0.62;
          filter: blur(120px);
          border-radius: 70% 30% 50% 50% / 40% 65% 35% 60%;
          animation: morph-c 37s linear infinite;
        }

        /* ---------- MASA 4 — MAGENTA / VIOLETA MIX ---------- */
        .mass-4-translate {
          top: 50%;
          left: 50%;
          animation: orbit-ellipse-wide 61s linear infinite;
        }
        .mass-4-scale {
          animation: breathe-anisotropic 19s linear infinite;
        }
        .mass-4-spin {
          animation: spin-rev 89s linear infinite;
        }
        .mass-4 {
          width: 80vw;
          height: 80vw;
          margin-left: -40vw;
          margin-top: -40vw;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.85) 0%, rgba(139, 92, 246, 0.4) 35%, rgba(124, 58, 237, 0.15) 60%, transparent 75%);
          opacity: 0.58;
          filter: blur(130px);
          border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%;
          animation: morph-d 71s linear infinite;
        }

        /* ---------- MASA 5 — NIEBLA ENERGÉTICA ---------- */
        .mass-5-translate {
          bottom: 10%;
          left: 30%;
          animation: drift-soft-wide 89s linear infinite;
        }
        .mass-5-scale {
          animation: breathe-grand 43s linear infinite;
        }
        .mass-5 {
          width: 120vw;
          height: 120vw;
          margin-left: -60vw;
          margin-top: -60vw;
          background: radial-gradient(circle, rgba(196, 181, 253, 0.45) 0%, rgba(167, 139, 250, 0.20) 30%, rgba(124, 58, 237, 0.08) 55%, transparent 70%);
          opacity: 0.55;
          filter: blur(180px);
          border-radius: 55% 45% 50% 50% / 45% 55% 50% 50%;
          animation: morph-e 121s linear infinite;
        }

        /* ============================================================
           KEYFRAMES — TRASLACIONES
           ============================================================ */

        @keyframes drift-lateral-wide {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(40vw, 6vh, 0); }
          50%  { transform: translate3d(80vw, 0, 0); }
          75%  { transform: translate3d(40vw, -6vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes drift-diag-up-wide {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-25vw, -30vh, 0); }
          50%  { transform: translate3d(-60vw, -65vh, 0); }
          75%  { transform: translate3d(-35vw, -32vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes drift-diag-down-wide {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-20vw, 35vh, 0); }
          50%  { transform: translate3d(-50vw, 65vh, 0); }
          75%  { transform: translate3d(-25vw, 38vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes orbit-ellipse-wide {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(25vw, -18vh, 0); }
          50%  { transform: translate3d(0, -32vh, 0); }
          75%  { transform: translate3d(-25vw, -18vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes drift-soft-wide {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-15vw, 12vh, 0); }
          50%  { transform: translate3d(20vw, 18vh, 0); }
          75%  { transform: translate3d(12vw, -10vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* ============================================================
           KEYFRAMES — ESCALAS Y RESPIRACIÓN
           ============================================================ */

        @keyframes breathe-soft {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.10); }
          50%  { transform: scale(1.18); }
          75%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        @keyframes breathe-vertical {
          0%   { transform: scale(1, 1); }
          25%  { transform: scale(0.92, 1.12); }
          50%  { transform: scale(1.08, 0.90); }
          75%  { transform: scale(0.94, 1.10); }
          100% { transform: scale(1, 1); }
        }

        @keyframes breathe-anisotropic {
          0%   { transform: scale(1, 1); }
          33%  { transform: scale(1.10, 0.92); }
          66%  { transform: scale(0.92, 1.10); }
          100% { transform: scale(1, 1); }
        }

        @keyframes breathe-grand {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }

        @keyframes pulse-strong {
          0%   { transform: scale(1); }
          20%  { transform: scale(1.16); }
          40%  { transform: scale(0.94); }
          60%  { transform: scale(1.20); }
          80%  { transform: scale(0.96); }
          100% { transform: scale(1); }
        }

        /* ============================================================
           KEYFRAMES — ROTACIONES
           ============================================================ */

        @keyframes spin-slow {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-rev {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        /* ============================================================
           KEYFRAMES — MORPHING DE FORMA (siluetas líquidas)
           ============================================================ */

        @keyframes morph-a {
          0%, 100% { border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%; }
          25%      { border-radius: 35% 65% 70% 30% / 40% 60% 50% 50%; }
          50%      { border-radius: 50% 50% 30% 70% / 65% 35% 45% 55%; }
          75%      { border-radius: 70% 30% 55% 45% / 35% 65% 60% 40%; }
        }

        @keyframes morph-b {
          0%, 100% { border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%; }
          25%      { border-radius: 65% 35% 40% 60% / 35% 50% 55% 65%; }
          50%      { border-radius: 30% 70% 55% 45% / 60% 40% 50% 50%; }
          75%      { border-radius: 55% 45% 35% 65% / 45% 55% 65% 35%; }
        }

        @keyframes morph-c {
          0%, 100% { border-radius: 70% 30% 50% 50% / 40% 65% 35% 60%; }
          33%      { border-radius: 35% 65% 60% 40% / 55% 45% 65% 35%; }
          66%      { border-radius: 55% 45% 30% 70% / 65% 35% 50% 50%; }
        }

        @keyframes morph-d {
          0%, 100% { border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%; }
          20%      { border-radius: 65% 35% 55% 45% / 35% 65% 40% 60%; }
          40%      { border-radius: 30% 70% 45% 55% / 55% 45% 60% 40%; }
          60%      { border-radius: 60% 40% 65% 35% / 45% 55% 35% 65%; }
          80%      { border-radius: 45% 55% 30% 70% / 65% 35% 50% 50%; }
        }

        @keyframes morph-e {
          0%, 100% { border-radius: 55% 45% 50% 50% / 45% 55% 50% 50%; }
          25%      { border-radius: 40% 60% 55% 45% / 60% 40% 55% 45%; }
          50%      { border-radius: 50% 50% 40% 60% / 50% 50% 45% 55%; }
          75%      { border-radius: 60% 40% 50% 50% / 40% 60% 50% 50%; }
        }

        /* ============================================================
           ESTRELLAS (secundarias)
           ============================================================ */

        .stars-drift-far {
          position: absolute;
          inset: -10%;
          animation: stars-drift-1 121s linear infinite;
          will-change: transform;
          opacity: 0.55;
        }
        .stars-drift-near {
          position: absolute;
          inset: -10%;
          animation: stars-drift-2 97s linear infinite;
          will-change: transform;
          opacity: 0.7;
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

        /* ============================================================
           ACCESIBILIDAD
           ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .mass-translate,
          .mass-scale,
          .mass-spin,
          .mass,
          .aurora-pulse,
          .stars-drift-far,
          .stars-drift-near {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
