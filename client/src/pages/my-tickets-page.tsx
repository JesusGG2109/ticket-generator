import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteTicket,
  getMyTickets,
  type Ticket as ApiTicket,
} from '../services/ticketService'
import { TicketCard } from '../components/confirmation-page/ticket-card'

const CARD_GLASS =
  'rounded-2xl border border-[rgba(15,23,42,0.06)] bg-white/65 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18),0_1px_0_0_rgba(255,255,255,0.9)_inset] backdrop-blur-xl'

export const MyTicketsPage = () => {
  const [tickets, setTickets] = useState<ApiTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getMyTickets()
      setTickets(data)
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'No se pudieron cargar tus tickets'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este ticket? Esta accion no se puede deshacer.'))
      return
    try {
      await deleteTicket(id)
      setTickets((prev) => prev.filter((t) => t.id !== id))
    } catch (err: any) {
      alert(err?.response?.data?.message || 'No se pudo eliminar el ticket')
    }
  }

  return (
    <section className='py-12 sm:py-16'>
      <div className='mb-10'>
        <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 px-3 py-1 backdrop-blur-xl'>
          <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]' />
          <span className='text-[10px] font-medium tracking-[0.25em] text-[#475569] uppercase'>
            Acceso personal
          </span>
        </div>
        <h1 className='text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl'>
          Mis tickets
        </h1>
        <p className='mt-2 text-sm text-[#64748B]'>
          {loading
            ? 'Cargando tickets...'
            : `${tickets.length} ${tickets.length === 1 ? 'ticket emitido' : 'tickets emitidos'} en tu cuenta`}
        </p>
      </div>

      {error && (
        <div className='mb-6 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-700 backdrop-blur-sm'>
          {error}
        </div>
      )}

      {loading && (
        <div className={`${CARD_GLASS} p-12 text-center`}>
          <span className='inline-flex items-center gap-2 text-sm text-[#64748B]'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A00]' />
            Cargando tickets...
          </span>
        </div>
      )}

      {!loading && tickets.length === 0 && !error && (
        <div className={`${CARD_GLASS} p-12 text-center`}>
          <p className='text-sm text-[#64748B]'>
            Aun no has generado ningun ticket.
          </p>
          <Link
            to='/'
            className='mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-6px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset]'
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
            Generar mi primer ticket
          </Link>
        </div>
      )}

      {!loading && tickets.length > 0 && (
        <div className='mx-auto flex max-w-3xl flex-col gap-8'>
          {tickets.map((t) => (
            <div key={t.id} className='space-y-3'>
              <TicketCard
                id={t.id}
                name={t.name}
                email={t.email}
                github={t.github}
                avatar={t.avatar}
                createdAt={t.createdAt}
              />
              <div className='flex justify-end'>
                <button
                  onClick={() => handleDelete(t.id)}
                  className='inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50/60 px-3 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100/80 hover:text-rose-700'
                >
                  <svg
                    className='h-3.5 w-3.5'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <polyline points='3 6 5 6 21 6' />
                    <path d='M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6' />
                    <path d='M10 11v6M14 11v6' />
                  </svg>
                  Eliminar ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
