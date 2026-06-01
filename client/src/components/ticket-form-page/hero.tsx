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
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(15,23,42,0.06)',
        }}
      >
        <span className='h-1.5 w-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_8px_rgba(255,122,0,0.8)]' />
        <span className='text-[10px] font-medium tracking-[0.22em] text-[#475569] uppercase'>
          Edicion 2026 · TECNM
        </span>
      </div>

      {/* TÍTULO */}
      <h1 className='mt-8 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl md:text-7xl'>
        <span className='block text-[#0F172A]'>
          Tu acceso a
        </span>
        <span
          className='block bg-clip-text text-transparent'
          style={{
            backgroundImage:
              'linear-gradient(90deg, #FF7A00 0%, #FF4FD8 100%)',
          }}
        >
          Coding Conf
        </span>
      </h1>

      {/* DESCRIPCIÓN */}
      <p className='mx-auto mt-6 max-w-[650px] text-base leading-relaxed text-[#475569] sm:text-lg'>
        Plataforma oficial de eventos académicos del TECNM.
        Genera tu ticket personalizado, descubre la agenda
        y conecta con la comunidad de tecnología más activa del país.
      </p>

      {/* METADATA */}
      <div className='mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs font-medium text-[#64748B] sm:text-sm'>
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#FF7A00]' />
          <span>15 — 17 Septiembre, 2026</span>
        </div>
        <div className='h-3 w-px bg-[rgba(15,23,42,0.12)]' />
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#FF4FD8]' />
          <span>TECNM Celaya</span>
        </div>
        <div className='h-3 w-px bg-[rgba(15,23,42,0.12)]' />
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#55D6FF]' />
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
              'linear-gradient(90deg, #FF7A00 0%, #FF4FD8 100%)',
            boxShadow:
              '0 10px 36px -10px rgba(255,122,0,0.55), 0 1px 0 0 rgba(255,255,255,0.32) inset',
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
          className='inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium text-[#475569] transition-all hover:border-[rgba(15,23,42,0.12)] hover:text-[#0F172A]'
          style={{
            background: 'rgba(255,255,255,0.55)',
            borderColor: 'rgba(15,23,42,0.06)',
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
