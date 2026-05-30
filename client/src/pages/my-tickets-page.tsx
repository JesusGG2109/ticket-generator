import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteTicket,
  getMyTickets,
  type Ticket as ApiTicket,
} from '../services/ticketService'
import { TicketCard } from '../components/confirmation-page/ticket-card'

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
          {loading
            ? 'Cargando tickets...'
            : `${tickets.length} ${tickets.length === 1 ? 'ticket emitido' : 'tickets emitidos'} en tu cuenta`}
        </p>
      </div>

      {error && (
        <div className='mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-sm'>
          {error}
        </div>
      )}

      {loading && (
        <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm'>
          <span className='inline-flex items-center gap-2 text-sm text-[#94A3B8]'>
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#22D3EE]' />
            Cargando tickets...
          </span>
        </div>
      )}

      {!loading && tickets.length === 0 && !error && (
        <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm'>
          <p className='text-sm text-[#94A3B8]'>
            Aun no has generado ningun ticket.
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
                  className='inline-flex items-center gap-1.5 rounded-full border border-red-400/20 bg-red-500/[0.06] px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:border-red-400/40 hover:bg-red-500/[0.12] hover:text-red-200'
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
