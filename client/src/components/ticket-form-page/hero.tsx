export const Hero = () => {
  const scrollToForm = () => {
    const el = document.getElementById('generate-ticket')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className='relative mx-auto max-w-3xl py-20 text-center sm:py-28'>
      {/* BADGE */}
      <div
        className='inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5'
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <span className='h-1.5 w-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.8)]' />
        <span className='text-[10px] font-medium tracking-[0.22em] text-white/70 uppercase'>
          Edicion 2026 · TECNM
        </span>
      </div>

      {/* TÍTULO */}
      <h1 className='mt-8 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl md:text-7xl'>
        <span className='block text-white'>
          Tu acceso a
        </span>
        <span
          className='block bg-clip-text text-transparent'
          style={{
            backgroundImage:
              'linear-gradient(90deg, #A855F7 0%, #22D3EE 100%)',
          }}
        >
          Coding Conf
        </span>
      </h1>

      {/* DESCRIPCIÓN */}
      <p
        className='mx-auto mt-6 max-w-[650px] text-base leading-relaxed sm:text-lg'
        style={{ color: 'rgba(255,255,255,0.78)' }}
      >
        Plataforma oficial de eventos académicos del TECNM.
        Genera tu ticket personalizado, descubre la agenda
        y conecta con la comunidad de tecnología más activa del país.
      </p>

      {/* METADATA */}
      <div
        className='mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-medium sm:text-sm'
        style={{ color: 'rgba(255,255,255,0.58)' }}
      >
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#A855F7]' />
          <span>15 — 17 Septiembre, 2026</span>
        </div>
        <div className='h-3 w-px bg-white/10' />
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#3B82F6]' />
          <span>TECNM Celaya</span>
        </div>
        <div className='h-3 w-px bg-white/10' />
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#22D3EE]' />
          <span>Presencial + Streaming</span>
        </div>
      </div>

      {/* CTA */}
      <div className='mt-10 flex items-center justify-center gap-3'>
        <button
          onClick={scrollToForm}
          className='group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5'
          style={{
            background:
              'linear-gradient(90deg, #8B5CF6 0%, #22D3EE 100%)',
            boxShadow:
              '0 10px 36px -10px rgba(139,92,246,0.55), 0 1px 0 0 rgba(255,255,255,0.2) inset',
          }}
        >
          Generar mi ticket
          <svg
            className='h-4 w-4 transition-transform group-hover:translate-x-0.5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <line x1='5' y1='12' x2='19' y2='12' />
            <polyline points='12 5 19 12 12 19' />
          </svg>
        </button>

        <a
          href='https://github.com/JesusGG2109/ticket-generator'
          target='_blank'
          rel='noreferrer'
          className='inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium text-white/85 transition-all hover:border-white/20 hover:text-white'
          style={{
            background: 'rgba(255,255,255,0.03)',
            borderColor: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          Ver agenda
        </a>
      </div>
    </section>
  )
}
