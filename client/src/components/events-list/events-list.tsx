import { useEffect, useState } from 'react'

import {
  getEvents,
  deleteEvent,
  updateEvent,
  type Event,
} from '../../services/eventService'
import { EventForm } from './event-form'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

const CARD_GLASS =
  'rounded-2xl border border-[rgba(15,23,42,0.06)] bg-white/65 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18),0_1px_0_0_rgba(255,255,255,0.9)_inset] backdrop-blur-xl'

const PRIMARY_BTN =
  'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-6px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset]'

export const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getEvents()
      setEvents(data)
    } catch (err: any) {
      setError(
        err?.response?.data?.message || 'No se pudieron cargar tus eventos'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, title: string) => {
    const confirmDelete = confirm(`¿Seguro que quieres eliminar "${title}"?`)
    if (!confirmDelete) return
    try {
      await deleteEvent(id)
      loadEvents()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'No se pudo eliminar el evento')
    }
  }

  const handleUpdate = async (event: Event) => {
    try {
      await updateEvent(event.id, {
        title: newTitle,
        description: event.description,
        location: event.location,
        date: event.date,
      })
      setEditingId(null)
      setNewTitle('')
      loadEvents()
    } catch (err: any) {
      alert(err?.response?.data?.message || 'No se pudo actualizar el evento')
    }
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className='py-12 sm:py-16'>
      {/* Header */}
      <div className='mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.06)] bg-white/60 px-3 py-1 backdrop-blur-xl'>
            <span className='h-1.5 w-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_8px_rgba(255,122,0,0.8)]' />
            <span className='text-[10px] font-medium tracking-[0.25em] text-[#475569] uppercase'>
              Catalogo
            </span>
          </div>
          <h1 className='text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl'>
            Mis eventos
          </h1>
          <p className='mt-2 text-sm text-[#64748B]'>
            {loading
              ? 'Cargando eventos...'
              : `${events.length} ${events.length === 1 ? 'evento registrado' : 'eventos registrados'}`}
          </p>
        </div>

        <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center'>
          <div className='relative w-full sm:w-72'>
            <svg
              className='pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#94A3B8]'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='11' cy='11' r='7' />
              <path d='m21 21-4.3-4.3' />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-full border border-[rgba(15,23,42,0.08)] bg-white/70 py-2.5 pr-4 pl-10 text-sm text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#FF7A00]/50 focus:bg-white/90 focus:ring-2 focus:ring-[#FF7A00]/15'
              placeholder='Buscar por titulo...'
            />
          </div>

          <button
            onClick={() => setShowForm((s) => !s)}
            className={PRIMARY_BTN}
          >
            {showForm ? (
              <>
                <svg
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
                Cerrar
              </>
            ) : (
              <>
                <svg
                  className='h-4 w-4'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='12' y1='5' x2='12' y2='19' />
                  <line x1='5' y1='12' x2='19' y2='12' />
                </svg>
                Nuevo evento
              </>
            )}
          </button>
        </div>
      </div>

      {showForm && (
        <EventForm
          onCreated={() => {
            setShowForm(false)
            loadEvents()
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {error && (
        <div className='mb-6 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-700 backdrop-blur-sm'>
          {error}
        </div>
      )}

      {/* Empty states */}
      {!loading && events.length === 0 && !showForm && (
        <div className={`${CARD_GLASS} p-12 text-center`}>
          <p className='text-sm text-[#64748B]'>
            Aun no tienes eventos registrados.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className={`mt-4 ${PRIMARY_BTN}`}
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
              <line x1='12' y1='5' x2='12' y2='19' />
              <line x1='5' y1='12' x2='19' y2='12' />
            </svg>
            Crear mi primer evento
          </button>
        </div>
      )}

      {!loading && events.length > 0 && filteredEvents.length === 0 && (
        <div className={`${CARD_GLASS} p-12 text-center`}>
          <p className='text-sm text-[#64748B]'>
            No se encontraron eventos con "{search}".
          </p>
        </div>
      )}

      {/* Grid de cards */}
      <div className='grid gap-4 sm:grid-cols-2'>
        {filteredEvents.map((event) => {
          const isEditing = editingId === event.id

          return (
            <article
              key={event.id}
              className={`group relative overflow-hidden ${CARD_GLASS} p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(15,23,42,0.12)] hover:shadow-[0_24px_70px_-18px_rgba(255,122,0,0.25),0_1px_0_0_rgba(255,255,255,0.95)_inset]`}
            >
              {/* Línea decorativa superior */}
              <div className='absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent opacity-70' />

              {/* Fecha como chip */}
              <div className='mb-4 flex items-center gap-2'>
                <span className='h-1 w-1 rounded-full bg-[#FF4FD8]' />
                <time className='text-[11px] font-medium tracking-[0.15em] text-[#64748B] uppercase'>
                  {formatDate(event.date)}
                </time>
              </div>

              {/* Título o editor */}
              {isEditing ? (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className='mb-3 w-full rounded-lg border border-[rgba(15,23,42,0.1)] bg-white/80 px-3 py-2 text-lg font-semibold text-[#0F172A] outline-none focus:border-[#FF7A00]/50 focus:ring-2 focus:ring-[#FF7A00]/15'
                  placeholder='Nuevo titulo'
                  autoFocus
                />
              ) : (
                <h3 className='mb-3 text-xl font-semibold leading-snug text-[#0F172A]'>
                  {event.title}
                </h3>
              )}

              <p className='mb-4 text-sm leading-relaxed text-[#475569]'>
                {event.description}
              </p>

              <div className='mb-5 flex items-center gap-2 text-xs text-[#64748B]'>
                <svg
                  className='h-3.5 w-3.5'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z' />
                  <circle cx='12' cy='9' r='2.5' />
                </svg>
                <span>{event.location}</span>
              </div>

              {/* Acciones */}
              <div className='flex items-center gap-2 border-t border-[rgba(15,23,42,0.06)] pt-4'>
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleUpdate(event)}
                      className='flex-1 rounded-lg bg-gradient-to-r from-[#FF7A00] to-[#FF4FD8] px-3 py-2 text-xs font-semibold text-white shadow-[0_6px_20px_-6px_rgba(255,122,0,0.55),0_1px_0_0_rgba(255,255,255,0.32)_inset] transition-all hover:shadow-[0_10px_28px_-4px_rgba(255,122,0,0.75),0_1px_0_0_rgba(255,255,255,0.4)_inset]'
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setNewTitle('')
                      }}
                      className='rounded-lg border border-[rgba(15,23,42,0.08)] bg-white/60 px-3 py-2 text-xs font-medium text-[#475569] transition-colors hover:border-[rgba(15,23,42,0.16)] hover:bg-white/80'
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(event.id)
                        setNewTitle(event.title)
                      }}
                      className='flex-1 rounded-lg border border-[rgba(15,23,42,0.08)] bg-white/60 px-3 py-2 text-xs font-medium text-[#475569] transition-colors hover:border-[rgba(15,23,42,0.16)] hover:bg-white/80 hover:text-[#0F172A]'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
                      className='rounded-lg border border-rose-200 bg-rose-50/60 px-3 py-2 text-xs font-medium text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-100/80 hover:text-rose-700'
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
