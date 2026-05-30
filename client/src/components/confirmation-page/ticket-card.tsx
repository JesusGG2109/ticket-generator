interface Props {
  id: number
  name: string
  email?: string
  github?: string | null
  avatar?: string | null
  createdAt?: string
}

const formatTicketNumber = (id: number) =>
  String(id).padStart(5, '0')

export const TicketCard = ({
  id,
  name,
  github,
  avatar,
  createdAt,
}: Props) => {
  const ticketNumber = formatTicketNumber(id)

  return (
    <div className='relative w-full'>
      <div
        aria-hidden='true'
        className='absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#7C3AED]/30 via-[#60A5FA]/15 to-[#22D3EE]/30 opacity-60 blur-2xl'
      />

      <div className='relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#0B1026]/95 via-[#121A3A]/95 to-[#0B1026]/95 p-6 shadow-[0_20px_60px_-30px_rgba(139,92,246,0.5)] backdrop-blur-xl sm:p-7'>
        <div className='absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/60 to-transparent' />

        {/* Header */}
        <div className='mb-6 flex items-start justify-between gap-4'>
          <div className='text-left'>
            <div className='mb-2 flex items-center gap-2'>
              <span className='relative inline-flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-50' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]' />
              </span>
              <span className='text-[10px] font-semibold tracking-[0.3em] text-[#22D3EE] uppercase'>
                Coding Conf 2026
              </span>
            </div>
            <p className='text-xs font-medium text-[#94A3B8]'>
              15 — 17 Septiembre · TECNM Celaya
            </p>
          </div>

          <div className='text-right'>
            <p className='text-[9px] font-medium tracking-[0.2em] text-[#94A3B8] uppercase'>
              Ticket
            </p>
            <p className='font-mono text-base font-bold text-white sm:text-lg'>
              #{ticketNumber}
            </p>
          </div>
        </div>

        {/* Separador */}
        <div className='relative my-5'>
          <div className='border-t border-dashed border-white/15' />
          <div className='absolute top-1/2 -left-9 h-5 w-5 -translate-y-1/2 rounded-full bg-[#050816]' />
          <div className='absolute top-1/2 -right-9 h-5 w-5 -translate-y-1/2 rounded-full bg-[#050816]' />
        </div>

        {/* Identidad */}
        <div className='flex items-center gap-4 text-left'>
          <div className='h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-br from-[#7C3AED]/30 to-[#22D3EE]/30 ring-1 ring-white/5'>
            {avatar ? (
              <img
                src={avatar}
                alt='avatar'
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center text-xl font-bold text-white/70'>
                {name ? name[0].toUpperCase() : '?'}
              </div>
            )}
          </div>

          <div className='min-w-0 flex-1'>
            <p className='truncate text-base font-semibold text-white sm:text-lg'>
              {name || 'Asistente'}
            </p>
            {github && (
              <div className='mt-1 flex items-center gap-1.5 text-xs text-[#94A3B8]'>
                <svg
                  className='h-3.5 w-3.5'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2c-3.2.69-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55C20.71 21.38 24 17.08 24 12 24 5.65 18.85.5 12 .5Z' />
                </svg>
                <span className='font-mono'>{github}</span>
              </div>
            )}
            {createdAt && (
              <p className='mt-1 text-[10px] tracking-wider text-[#94A3B8]/80 uppercase'>
                Emitido{' '}
                {new Date(createdAt).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
