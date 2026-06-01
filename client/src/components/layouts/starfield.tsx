/**
 * Starfield — "Lava Lamps Premium".
 *
 * Dirección artística: tema LUMINOSO. Fondo casi blanco con ligero
 * azulado, sobre el cual flotan 7 masas de lava cálida (naranja, ámbar,
 * coral, magenta, rosa) con un toque de cyan. Las masas usan
 * `mix-blend-mode: multiply` para que sobre el fondo claro se vean como
 * tinta o acuarela real, y donde se solapan generan mezclas cromáticas
 * orgánicas (naranja + magenta = magenta-rojo profundo).
 *
 * Capas:
 *   1. Base luminosa (F8FAFF → EDF2FF arriba, leve azulado).
 *   2. Glow atmosférico cálido (capa permanente naranja muy diluida).
 *   3. 7 lavas con `border-radius` asimétrico animado, blur 80–110px,
 *      `mix-blend-mode: multiply`, drift muy lento.
 *   4. Vignette superior suave (no compite con navbar).
 *
 * Sin partículas brillantes (la dirección es limpia, no estrellada).
 * Sin spotlight ni horizonte (la dirección es flotante, no escénica).
 *
 * Performance:
 *   - Solo `transform`, `opacity`, `border-radius` animados.
 *   - Blur estático cacheado por GPU.
 *   - `will-change: transform` selectivo.
 *   - `prefers-reduced-motion` pausa todo.
 */
export const Starfield = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #EDF2FF 0%, #F8FAFF 45%, #FFF5EC 100%)",
      }}
    >
      {/* Glow atmosférico cálido (siempre presente, sin animar) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 25%, rgba(255, 122, 0, 0.08) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 75% 70%, rgba(255, 79, 216, 0.08) 0%, transparent 65%)",
        }}
      />

      {/* === LAVAS === */}

      {/* Lava 1 — Naranja gigante (top-left) */}
      <div className="lava-translate lava-1-translate">
        <div className="lava-scale lava-1-scale">
          <div className="lava lava-1" />
        </div>
      </div>

      {/* Lava 2 — Magenta gigante (top-right) */}
      <div className="lava-translate lava-2-translate">
        <div className="lava-scale lava-2-scale">
          <div className="lava lava-2" />
        </div>
      </div>

      {/* Lava 3 — Ámbar grande (center-left) */}
      <div className="lava-translate lava-3-translate">
        <div className="lava-scale lava-3-scale">
          <div className="lava lava-3" />
        </div>
      </div>

      {/* Lava 4 — Coral mediana (bottom-center) */}
      <div className="lava-translate lava-4-translate">
        <div className="lava-scale lava-4-scale">
          <div className="lava lava-4" />
        </div>
      </div>

      {/* Lava 5 — Rosa mediana (mid-right) */}
      <div className="lava-translate lava-5-translate">
        <div className="lava-scale lava-5-scale">
          <div className="lava lava-5" />
        </div>
      </div>

      {/* Lava 6 — Cyan acento pequeña (top-center, único toque azul) */}
      <div className="lava-translate lava-6-translate">
        <div className="lava-scale lava-6-scale">
          <div className="lava lava-6" />
        </div>
      </div>

      {/* Lava 7 — Magenta brillante pequeña (bottom-left) */}
      <div className="lava-translate lava-7-translate">
        <div className="lava-scale lava-7-scale">
          <div className="lava lava-7" />
        </div>
      </div>

      {/* Vignette superior tenue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(248,250,255,0.55) 0%, transparent 15%, transparent 88%, rgba(248,250,255,0.45) 100%)",
        }}
      />

      <style>{`
        /* ============================================================
           ESTRUCTURA COMÚN
           ============================================================ */
        .lava-translate, .lava-scale {
          position: absolute;
          width: 0;
          height: 0;
          will-change: transform;
        }
        .lava {
          position: absolute;
          mix-blend-mode: multiply;
          will-change: transform, border-radius;
        }

        /* ============================================================
           LAVAS — colores cálidos sobre fondo claro
           ============================================================ */

        /* LAVA 1 — NARANJA (gigante, top-left) */
        .lava-1-translate {
          top: 18%;
          left: 12%;
          animation: drift-1 89s linear infinite;
        }
        .lava-1-scale {
          animation: breathe-iso 47s linear infinite;
        }
        .lava-1 {
          width: 75vw;
          height: 75vw;
          max-width: 1000px;
          max-height: 1000px;
          margin-left: -37.5vw;
          margin-top: -37.5vw;
          background: radial-gradient(
            ellipse 60% 55% at 50% 50%,
            rgba(255, 122, 0, 0.85) 0%,
            rgba(255, 122, 0, 0.45) 30%,
            rgba(255, 122, 0, 0.18) 55%,
            transparent 75%
          );
          filter: blur(100px);
          opacity: 0.85;
          border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%;
          animation: morph-a 53s linear infinite;
        }

        /* LAVA 2 — MAGENTA (gigante, top-right) */
        .lava-2-translate {
          top: 12%;
          right: 8%;
          animation: drift-2 113s linear infinite;
        }
        .lava-2-scale {
          animation: breathe-vertical 43s linear infinite;
        }
        .lava-2 {
          width: 80vw;
          height: 80vw;
          max-width: 1100px;
          max-height: 1100px;
          margin-left: -40vw;
          margin-top: -40vw;
          background: radial-gradient(
            ellipse 58% 55% at 50% 50%,
            rgba(255, 79, 216, 0.75) 0%,
            rgba(255, 79, 216, 0.38) 30%,
            rgba(255, 79, 216, 0.15) 55%,
            transparent 75%
          );
          filter: blur(110px);
          opacity: 0.80;
          border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%;
          animation: morph-b 67s linear infinite;
        }

        /* LAVA 3 — ÁMBAR (grande, center-left) */
        .lava-3-translate {
          top: 55%;
          left: 22%;
          animation: drift-3 97s linear infinite;
        }
        .lava-3-scale {
          animation: breathe-iso 37s linear infinite;
        }
        .lava-3 {
          width: 55vw;
          height: 55vw;
          max-width: 750px;
          max-height: 750px;
          margin-left: -27.5vw;
          margin-top: -27.5vw;
          background: radial-gradient(
            ellipse 60% 55% at 50% 50%,
            rgba(255, 179, 71, 0.80) 0%,
            rgba(255, 179, 71, 0.40) 30%,
            transparent 65%
          );
          filter: blur(90px);
          opacity: 0.75;
          border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%;
          animation: morph-c 61s linear infinite;
        }

        /* LAVA 4 — CORAL (mediana, bottom-center) */
        .lava-4-translate {
          top: 75%;
          left: 45%;
          animation: drift-4 71s linear infinite;
        }
        .lava-4-scale {
          animation: breathe-anisotropic 31s linear infinite;
        }
        .lava-4 {
          width: 50vw;
          height: 50vw;
          max-width: 680px;
          max-height: 680px;
          margin-left: -25vw;
          margin-top: -25vw;
          background: radial-gradient(
            ellipse 55% 55% at 50% 50%,
            rgba(255, 107, 107, 0.75) 0%,
            rgba(255, 107, 107, 0.35) 32%,
            transparent 65%
          );
          filter: blur(85px);
          opacity: 0.72;
          border-radius: 65% 35% 50% 50% / 45% 55% 50% 50%;
          animation: morph-d 53s linear infinite;
        }

        /* LAVA 5 — ROSA (mediana, mid-right) */
        .lava-5-translate {
          top: 48%;
          right: 18%;
          animation: drift-5 83s linear infinite;
        }
        .lava-5-scale {
          animation: breathe-iso 41s linear infinite;
        }
        .lava-5 {
          width: 45vw;
          height: 45vw;
          max-width: 620px;
          max-height: 620px;
          margin-left: -22.5vw;
          margin-top: -22.5vw;
          background: radial-gradient(
            ellipse 60% 55% at 50% 50%,
            rgba(255, 137, 198, 0.70) 0%,
            rgba(255, 137, 198, 0.32) 32%,
            transparent 65%
          );
          filter: blur(85px);
          opacity: 0.68;
          border-radius: 50% 50% 60% 40% / 55% 45% 50% 50%;
          animation: morph-e 47s linear infinite;
        }

        /* LAVA 6 — CYAN ACENTO (pequeña, top-center) */
        .lava-6-translate {
          top: 28%;
          left: 52%;
          animation: drift-6 73s linear infinite;
        }
        .lava-6-scale {
          animation: breathe-soft 29s linear infinite;
        }
        .lava-6 {
          width: 32vw;
          height: 32vw;
          max-width: 450px;
          max-height: 450px;
          margin-left: -16vw;
          margin-top: -16vw;
          background: radial-gradient(
            ellipse 55% 55% at 50% 50%,
            rgba(85, 214, 255, 0.60) 0%,
            rgba(85, 214, 255, 0.25) 32%,
            transparent 65%
          );
          filter: blur(70px);
          opacity: 0.62;
          border-radius: 60% 40% 50% 50% / 50% 55% 45% 50%;
          animation: morph-f 41s linear infinite;
        }

        /* LAVA 7 — MAGENTA brillante (pequeña, bottom-left) */
        .lava-7-translate {
          top: 82%;
          left: 15%;
          animation: drift-7 67s linear infinite;
        }
        .lava-7-scale {
          animation: breathe-soft 23s linear infinite;
        }
        .lava-7 {
          width: 35vw;
          height: 35vw;
          max-width: 480px;
          max-height: 480px;
          margin-left: -17.5vw;
          margin-top: -17.5vw;
          background: radial-gradient(
            ellipse 55% 55% at 50% 50%,
            rgba(255, 79, 216, 0.65) 0%,
            rgba(255, 79, 216, 0.28) 32%,
            transparent 65%
          );
          filter: blur(70px);
          opacity: 0.65;
          border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%;
          animation: morph-g 37s linear infinite;
        }

        /* ============================================================
           KEYFRAMES — drift muy lento (todas distintas)
           ============================================================ */
        @keyframes drift-1 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(6vw, 4vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-2 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-7vw, 5vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-3 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(8vw, -5vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-4 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-6vw, -4vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-5 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(5vw, 6vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-6 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-4vw, 5vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes drift-7 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(7vw, -3vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* ============================================================
           KEYFRAMES — escalas (breathing)
           ============================================================ */
        @keyframes breathe-iso {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.10); }
        }
        @keyframes breathe-soft {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        @keyframes breathe-vertical {
          0%   { transform: scale(1, 1); }
          50%  { transform: scale(1.06, 0.94); }
          100% { transform: scale(1, 1); }
        }
        @keyframes breathe-anisotropic {
          0%   { transform: scale(1, 1); }
          50%  { transform: scale(1.08, 0.94); }
          100% { transform: scale(1, 1); }
        }

        /* ============================================================
           KEYFRAMES — morphing (siluetas líquidas)
           ============================================================ */
        @keyframes morph-a {
          0%, 100% { border-radius: 60% 40% 35% 65% / 55% 45% 60% 40%; }
          25%      { border-radius: 35% 65% 70% 30% / 40% 60% 50% 50%; }
          50%      { border-radius: 50% 50% 30% 70% / 65% 35% 45% 55%; }
          75%      { border-radius: 70% 30% 55% 45% / 35% 65% 60% 40%; }
        }
        @keyframes morph-b {
          0%, 100% { border-radius: 45% 55% 60% 40% / 50% 60% 40% 50%; }
          33%      { border-radius: 60% 40% 50% 50% / 45% 55% 60% 40%; }
          66%      { border-radius: 50% 50% 40% 60% / 60% 40% 50% 50%; }
        }
        @keyframes morph-c {
          0%, 100% { border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%; }
          50%      { border-radius: 65% 35% 50% 50% / 40% 60% 45% 55%; }
        }
        @keyframes morph-d {
          0%, 100% { border-radius: 65% 35% 50% 50% / 45% 55% 50% 50%; }
          50%      { border-radius: 35% 65% 50% 50% / 55% 45% 50% 50%; }
        }
        @keyframes morph-e {
          0%, 100% { border-radius: 50% 50% 60% 40% / 55% 45% 50% 50%; }
          50%      { border-radius: 60% 40% 40% 60% / 45% 55% 60% 40%; }
        }
        @keyframes morph-f {
          0%, 100% { border-radius: 60% 40% 50% 50% / 50% 55% 45% 50%; }
          50%      { border-radius: 40% 60% 50% 50% / 55% 45% 55% 45%; }
        }
        @keyframes morph-g {
          0%, 100% { border-radius: 50% 50% 35% 65% / 60% 40% 55% 45%; }
          50%      { border-radius: 60% 40% 65% 35% / 40% 60% 45% 55%; }
        }

        /* ============================================================
           ACCESIBILIDAD
           ============================================================ */
        @media (prefers-reduced-motion: reduce) {
          .lava-translate,
          .lava-scale,
          .lava {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
