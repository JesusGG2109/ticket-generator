export const Hero = () => {
  return (
    <section className='relative mx-auto max-w-3xl py-16 text-center sm:py-24'>
      <div className='inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-[rgba(12,16,36,0.55)] px-4 py-1.5 backdrop-blur-xl'>
        <span className='h-1.5 w-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.8)]' />
        <span className='text-[11px] font-medium tracking-[0.2em] text-[#D1D5DB] uppercase'>
          Edicion 2026 — TECNM
        </span>
      </div>

      <h1 className='mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl'>
        <span className='bg-gradient-to-br from-white via-white to-[#94A3B8] bg-clip-text text-transparent'>
          Tu acceso a
        </span>
        <br />
        <span className='bg-gradient-to-r from-[#8B5CF6] via-[#60A5FA] to-[#22D3EE] bg-clip-text text-transparent'>
          Coding Conf
        </span>
      </h1>

      <p className='mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#94A3B8] sm:text-lg'>
        Plataforma oficial de eventos académicos del TECNM.
        Reserva tu lugar, genera tu ticket personalizado
        y forma parte de la conferencia de tecnología del año.
      </p>

      <div className='mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-[#94A3B8] sm:text-sm'>
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#8B5CF6]' />
          <span>15 — 17 Septiembre, 2026</span>
        </div>
        <div className='hidden h-3 w-px bg-white/10 sm:block' />
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#60A5FA]' />
          <span>Auditorio TECNM Celaya</span>
        </div>
        <div className='hidden h-3 w-px bg-white/10 sm:block' />
        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-[#22D3EE]' />
          <span>Presencial + Streaming</span>
        </div>
      </div>
    </section>
  )
}
