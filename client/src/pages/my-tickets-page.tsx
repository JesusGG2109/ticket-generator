import { Link } from 'react-router-dom'
import { useUserStore } from '../store/user'
import { Ticket } from '../components/confirmation-page/ticket'

export const MyTicketsPage = () => {
  const { fullName, email } = useUserStore()
  const hasTicket = Boolean(fullName)

  return (
    <section className='py-12 sm:py-16'>
      <div className='mb-10'>
        <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 backdrop-blur-sm'>
          <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' />
          <span className='text-[10px] font-medium tracking-[0.25em] text-[#D1D5DB] uppercase'>
            Acceso personal
          </span>
        </div>
        <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
          Mis tickets
        </h1>
        <p className='mt-2 text-sm text-[#94A3B8]'>
          {hasTicket
            ? `Ticket generado para ${email || fullName}.`
            : 'Aun no has generado ningun ticket en esta sesion.'}
        </p>
      </div>

      {hasTicket ? (
        <div className='mx-auto max-w-3xl'>
          <Ticket />

          <p className='mt-8 text-center text-xs text-[#94A3B8]'>
            Conserva este ticket. Lo necesitaras al ingresar al evento.
          </p>
        </div>
      ) : (
        <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm'>
          <p className='text-sm text-[#94A3B8]'>
            Aun no tienes un ticket emitido en esta sesion.
          </p>
          <Link
            to='/'
            className='mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_-4px_rgba(139,92,246,0.5)] transition-all hover:shadow-[0_0_28px_-2px_rgba(139,92,246,0.75)]'
          >
            <svg
              className='h-4 w-4'
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
            Generar mi ticket
          </Link>
        </div>
      )}
    </section>
  )
}
