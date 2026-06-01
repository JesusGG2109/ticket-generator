/**
 * Starfield — "El Reactor".
 *
 * Concepto: fuente única de energía centrada. Toda la luz emana del mismo
 * punto y se difunde hacia los bordes con caída radial. El centro coincide
 * con donde naturalmente va el contenido (50% horiz, ~35% vert) → la luz
 * dirige la mirada hacia el hero/CTA antes de leer una palabra.
 *
 * Capas (de fondo a frente):
 *   1. Base navy con gradiente vertical sutil.
 *   2. Atmósfera lejana (150vw) — garantiza que el área baja no pierda
 *      iluminación cuando el usuario hace scroll al formulario.
 *   3. Aurora exterior (anillo indigo + cyan, gira lentamente).
 *   4. Halo medio (violeta + azul).
 *   5. Núcleo (blanco-rosado → violeta cálido, respira).
 *   6. Banda horizontal de aurora cruzando el reactor (rota antihorario).
 *   7. Bandas oblicuas ×2 atravesando el reactor (corrientes de energía).
 *   8. Sparks orbitales ×3 (cyan, violeta brillante, índigo).
 *   9. Atmósfera frontal de tinte + vignette radial + estrellas curadas.
 *
 * Sin `mix-blend-mode`. Solo opacity directa sobre base navy.
 *
 * Performance:
 *   - Solo transform / opacity / border-radius animados.
 *   - Blur estático cacheado.
 *   - will-change: transform en wrappers animados.
 *   - prefers-reduced-motion pausa todo.
 *
 * Duraciones primas/coprimas (13, 19, 23, 31, 37, 53, 67, 71, 89, 113,
 * 127, 191, 223) → nunca resincronizan.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0c0e22 0%, #0a0d1f 50%, #08091a 100%)",
      }}
    >
      {/* CAPA 2 — Atmósfera lejana (extiende luz hasta el footer) */}
      <div className="atmo-far" />

      {/* CAPA 3 — Aurora exterior (anillo grande, rota horario) */}
      <div className="reactor-translate">
        <div className="aurora-outer-spin">
          <div className="aurora-outer" />
        </div>
      </div>

      {/* CAPA 4 — Halo medio */}
      <div className="reactor-translate">
        <div className="halo-mid-scale">
          <div className="halo-mid" />
        </div>
      </div>

      {/* CAPA 5 — Núcleo (respira) */}
      <div className="reactor-translate">
        <div className="core-scale">
          <div className="core" />
        </div>
      </div>

      {/* CAPA 6 — Banda horizontal cruzando el reactor (rota antihorario) */}
      <div className="reactor-translate">
        <div className="band-h-spin">
          <div className="band-h" />
        </div>
      </div>

      {/* CAPA 7 — Bandas oblicuas */}
      <div className="reactor-translate">
        <div className="band-d1-drift">
          <div className="band-d1" />
        </div>
      </div>
      <div className="reactor-translate">
        <div className="band-d2-drift">
          <div className="band-d2" />
        </div>
      </div>

      {/* CAPA 8 — Sparks orbitales (3 radios distintos) */}
      <div className="reactor-translate">
        <div className="spark-1-orbit">
          <div className="spark spark-1" />
        </div>
      </div>
      <div className="reactor-translate">
        <div className="spark-2-orbit">
          <div className="spark spark-2" />
        </div>
      </div>
      <div className="reactor-translate">
        <div className="spark-3-orbit">
          <div className="spark spark-3" />
        </div>
      </div>

      {/* CAPA 9 — Estrellas curadas + atmósfera frontal + vignette */}
      <div className="stars-far-wrap">
        <div className="absolute inset-0 stars-far" />
      </div>
      <div className="stars-near-wrap">
        <div className="absolute inset-0 stars-near" />
      </div>

      {/* Atmósfera frontal (pulso de opacidad) */}
      <div className="atmo-front" />

      {/* Vignette radial — refuerza foco central */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 50% 38%, transparent 30%, rgba(8,9,26,0.35) 75%, rgba(8,9,26,0.7) 100%)",
        }}
      />

      <style>{`
        /* ============================================================
           Centro del reactor: 50% horizontal, 35% vertical
           Todos los elementos del reactor heredan esta translación común.
           ============================================================ */
        .reactor-translate {
          position: absolute;
          top: 35%;
          left: 50%;
          width: 0;
          height: 0;
          will-change: transform;
        }

        /* Wrappers vacíos para componer transforms */
        .aurora-outer-spin,
        .halo-mid-scale,
        .core-scale,
        .band-h-spin,
        .band-d1-drift,
        .band-d2-drift,
        .spark-1-orbit,
        .spark-2-orbit,
        .spark-3-orbit {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }

        .aurora-outer,
        .halo-mid,
        .core,
        .band-h,
        .band-d1,
        .band-d2,
        .spark {
          position: absolute;
          will-change: transform, border-radius;
        }

        /* ============================================================
           CAPA 2 — ATMÓSFERA LEJANA (cubre todo, extiende a footer)
           ============================================================ */
        .atmo-far {
          position: absolute;
          left: 50%;
          top: 45%;
          width: 150vw;
          height: 150vw;
          margin-left: -75vw;
          margin-top: -75vw;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.42) 0%, rgba(124, 58, 237, 0.18) 30%, rgba(99, 102, 241, 0.08) 55%, transparent 75%);
          filter: blur(160px);
        }

        /* ============================================================
           CAPA 3 — AURORA EXTERIOR (anillo indigo + cyan, rota horario)
           ============================================================ */
        .aurora-outer-spin {
          animation: spin-cw 89s linear infinite;
        }
        .aurora-outer {
          width: 95vw;
          height: 95vw;
          max-width: 1300px;
          max-height: 1300px;
          margin-left: -47.5vw;
          margin-top: -47.5vw;
          background:
            radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.75) 0%, transparent 40%),
            radial-gradient(circle at 70% 50%, rgba(34, 211, 238, 0.60) 0%, transparent 38%),
            radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.55) 0%, transparent 40%);
          filter: blur(110px);
          opacity: 0.62;
          border-radius: 50%;
        }

        /* ============================================================
           CAPA 4 — HALO MEDIO (violeta + azul)
           ============================================================ */
        .halo-mid-scale {
          animation: breathe-anisotropic 31s linear infinite;
        }
        .halo-mid {
          width: 65vw;
          height: 65vw;
          max-width: 850px;
          max-height: 850px;
          margin-left: -32.5vw;
          margin-top: -32.5vw;
          background:
            radial-gradient(circle at 40% 45%, rgba(139, 92, 246, 0.88) 0%, rgba(124, 58, 237, 0.4) 35%, transparent 65%),
            radial-gradient(circle at 65% 60%, rgba(59, 130, 246, 0.70) 0%, transparent 45%);
          filter: blur(90px);
          opacity: 0.78;
          border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%;
          animation: morph-halo 53s linear infinite;
        }

        /* ============================================================
           CAPA 5 — NÚCLEO (blanco-rosa → violeta, respira)
           ============================================================ */
        .core-scale {
          animation: core-breathe 13s linear infinite;
        }
        .core {
          width: 30vw;
          height: 30vw;
          max-width: 400px;
          max-height: 400px;
          margin-left: -15vw;
          margin-top: -15vw;
          background: radial-gradient(circle, rgba(220, 210, 255, 0.92) 0%, rgba(196, 181, 253, 0.75) 18%, rgba(167, 139, 250, 0.55) 38%, rgba(139, 92, 246, 0.25) 60%, transparent 80%);
          filter: blur(50px);
          opacity: 0.95;
          border-radius: 50%;
        }

        /* ============================================================
           CAPA 6 — BANDA HORIZONTAL (cruza el reactor, rota antihorario)
           ============================================================ */
        .band-h-spin {
          animation: spin-ccw 71s linear infinite;
        }
        .band-h {
          width: 120vw;
          height: 25vh;
          max-width: 1600px;
          margin-left: -60vw;
          margin-top: -12.5vh;
          background: linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.4) 25%, rgba(34, 211, 238, 0.55) 50%, rgba(99, 102, 241, 0.4) 75%, transparent 100%);
          filter: blur(60px);
          opacity: 0.55;
          border-radius: 50%;
        }

        /* ============================================================
           CAPA 7 — BANDAS OBLICUAS (corrientes de energía)
           ============================================================ */
        .band-d1-drift {
          animation: band-drift-1 113s linear infinite;
        }
        .band-d1 {
          width: 80vw;
          height: 12vh;
          max-width: 1100px;
          margin-left: -40vw;
          margin-top: -6vh;
          background: linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.55) 50%, transparent 100%);
          filter: blur(40px);
          opacity: 0.45;
          transform: rotate(-15deg);
          border-radius: 50%;
        }

        .band-d2-drift {
          animation: band-drift-2 127s linear infinite;
        }
        .band-d2 {
          width: 90vw;
          height: 10vh;
          max-width: 1200px;
          margin-left: -45vw;
          margin-top: -5vh;
          background: linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.50) 50%, transparent 100%);
          filter: blur(35px);
          opacity: 0.40;
          transform: rotate(18deg);
          border-radius: 50%;
        }

        /* ============================================================
           CAPA 8 — SPARKS ORBITALES (3 radios distintos)
           ============================================================ */

        .spark { border-radius: 50%; }

        /* Spark 1 — Cyan, radio cercano, horario */
        .spark-1-orbit {
          animation: orbit-1 23s linear infinite;
        }
        .spark-1 {
          width: 10vw;
          height: 10vw;
          max-width: 140px;
          max-height: 140px;
          margin-left: -5vw;
          margin-top: -5vw;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.85) 0%, transparent 65%);
          filter: blur(28px);
          opacity: 0.65;
        }

        /* Spark 2 — Violeta brillante, radio medio, horario */
        .spark-2-orbit {
          animation: orbit-2 37s linear infinite;
        }
        .spark-2 {
          width: 12vw;
          height: 12vw;
          max-width: 170px;
          max-height: 170px;
          margin-left: -6vw;
          margin-top: -6vw;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.80) 0%, transparent 65%);
          filter: blur(32px);
          opacity: 0.60;
        }

        /* Spark 3 — Indigo, radio lejos, antihorario */
        .spark-3-orbit {
          animation: orbit-3 53s linear infinite;
        }
        .spark-3 {
          width: 8vw;
          height: 8vw;
          max-width: 110px;
          max-height: 110px;
          margin-left: -4vw;
          margin-top: -4vw;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.75) 0%, transparent 65%);
          filter: blur(24px);
          opacity: 0.55;
        }

        /* ============================================================
           ATMÓSFERA FRONTAL (pulso de opacidad sutil)
           ============================================================ */
        .atmo-front {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 35%, rgba(139, 92, 246, 0.10) 0%, transparent 70%);
          animation: atmo-front-pulse 19s linear infinite;
          will-change: opacity;
        }

        @keyframes atmo-front-pulse {
          0%, 100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }

        /* ============================================================
           KEYFRAMES — BREATHING / ROTATIONS / ORBITS / DRIFTS
           ============================================================ */

        @keyframes core-breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }

        @keyframes breathe-anisotropic {
          0%   { transform: scale(1, 1); }
          33%  { transform: scale(1.08, 0.94); }
          66%  { transform: scale(0.94, 1.08); }
          100% { transform: scale(1, 1); }
        }

        @keyframes spin-cw {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-ccw {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes morph-halo {
          0%, 100% { border-radius: 55% 45% 50% 50% / 50% 55% 45% 50%; }
          25%      { border-radius: 40% 60% 55% 45% / 60% 40% 55% 45%; }
          50%      { border-radius: 50% 50% 40% 60% / 45% 55% 50% 50%; }
          75%      { border-radius: 60% 40% 50% 50% / 55% 45% 60% 40%; }
        }

        /*
         * Órbitas: el elemento orbita alrededor de (0,0) a un radio dado.
         * Combinación de rotate inversa + translate + rotate compensatoria
         * mantiene el spark "mirando hacia adelante".
         */
        @keyframes orbit-1 {
          0%   { transform: rotate(0deg)   translate(18vw, 0) rotate(0deg); }
          100% { transform: rotate(360deg) translate(18vw, 0) rotate(-360deg); }
        }
        @keyframes orbit-2 {
          0%   { transform: rotate(0deg)   translate(28vw, 0) rotate(0deg); }
          100% { transform: rotate(360deg) translate(28vw, 0) rotate(-360deg); }
        }
        @keyframes orbit-3 {
          0%   { transform: rotate(0deg)   translate(38vw, 0) rotate(0deg); }
          100% { transform: rotate(-360deg) translate(38vw, 0) rotate(360deg); }
        }

        @keyframes band-drift-1 {
          0%   { transform: translate3d(-12vw, 0, 0); }
          50%  { transform: translate3d(12vw, 0, 0); }
          100% { transform: translate3d(-12vw, 0, 0); }
        }

        @keyframes band-drift-2 {
          0%   { transform: translate3d(10vw, 0, 0); }
          50%  { transform: translate3d(-10vw, 0, 0); }
          100% { transform: translate3d(10vw, 0, 0); }
        }

        /* ============================================================
           ESTRELLAS — drift muy lento direcciones opuestas
           ============================================================ */

        .stars-far-wrap {
          position: absolute;
          inset: -10%;
          opacity: 0.55;
          animation: stars-drift-far 191s linear infinite;
          will-change: transform;
        }
        .stars-near-wrap {
          position: absolute;
          inset: -10%;
          opacity: 0.75;
          animation: stars-drift-near 223s linear infinite;
          will-change: transform;
        }

        @keyframes stars-drift-far {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-2%, 3%, 0); }
        }

        @keyframes stars-drift-near {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(3%, -2%, 0); }
        }

        .stars-far {
          background-image:
            radial-gradient(1px 1px at 11% 16%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 23% 41%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 32% 8%,  rgba(255,255,255,0.6), transparent 50%),
            radial-gradient(1px 1px at 44% 72%, rgba(255,255,255,0.45), transparent 50%),
            radial-gradient(1px 1px at 54% 28%, rgba(255,255,255,0.7), transparent 50%),
            radial-gradient(1px 1px at 65% 86%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 73% 20%, rgba(255,255,255,0.5), transparent 50%),
            radial-gradient(1px 1px at 80% 63%, rgba(255,255,255,0.65), transparent 50%),
            radial-gradient(1px 1px at 88% 13%, rgba(255,255,255,0.4),  transparent 50%),
            radial-gradient(1px 1px at 93% 51%, rgba(255,255,255,0.55), transparent 50%),
            radial-gradient(1px 1px at 7%  82%, rgba(255,255,255,0.55), transparent 50%);
          background-size: 100% 100%;
        }

        .stars-near {
          background-image:
            radial-gradient(1.5px 1.5px at 18% 27%, rgba(255,255,255,0.95), transparent 60%),
            radial-gradient(1.5px 1.5px at 38% 61%, rgba(255,255,255,0.85), transparent 60%),
            radial-gradient(1.5px 1.5px at 60% 14%, rgba(255,255,255,0.9),  transparent 60%),
            radial-gradient(2px 2px   at 74% 78%, rgba(200,220,255,0.95),   transparent 60%),
            radial-gradient(2px 2px   at 87% 36%, rgba(220,210,255,0.9),    transparent 60%),
            radial-gradient(2px 2px   at 27% 86%, rgba(255,255,255,0.95),   transparent 60%),
            radial-gradient(1.5px 1.5px at 52% 22%, rgba(200,220,255,0.85), transparent 60%);
          background-size: 100% 100%;
        }

        /* ============================================================
           ACCESIBILIDAD
           ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .reactor-translate,
          .aurora-outer-spin,
          .halo-mid-scale,
          .core-scale,
          .band-h-spin,
          .band-d1-drift,
          .band-d2-drift,
          .spark-1-orbit,
          .spark-2-orbit,
          .spark-3-orbit,
          .halo-mid,
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
