import { useEffect, useState } from 'react'

import {
  getEvents,
  deleteEvent,
  updateEvent,
  type Event,
} from '../../services/eventService'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const data = await getEvents()
      setEvents(data)
    } catch (error) {
      console.error(error)
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
    } catch (error) {
      console.error(error)
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
    } catch (error) {
      console.error(error)
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
          <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 backdrop-blur-sm'>
            <span className='h-1.5 w-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.8)]' />
            <span className='text-[10px] font-medium tracking-[0.25em] text-[#D1D5DB] uppercase'>
              Catalogo
            </span>
          </div>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            Eventos registrados
          </h1>
          <p className='mt-2 text-sm text-[#94A3B8]'>
            {loading
              ? 'Cargando eventos...'
              : `${events.length} ${events.length === 1 ? 'evento disponible' : 'eventos disponibles'}`}
          </p>
        </div>

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
            className='w-full rounded-full border border-white/[0.08] bg-white/[0.03] py-2.5 pr-4 pl-10 text-sm text-white placeholder-[#94A3B8]/60 outline-none transition-all focus:border-[#8B5CF6]/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#8B5CF6]/20'
            placeholder='Buscar por titulo...'
          />
        </div>
      </div>

      {/* Empty states */}
      {!loading && events.length === 0 && (
        <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm'>
          <p className='text-sm text-[#94A3B8]'>
            Aun no hay eventos registrados.
          </p>
        </div>
      )}

      {!loading && events.length > 0 && filteredEvents.length === 0 && (
        <div className='rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 text-center backdrop-blur-sm'>
          <p className='text-sm text-[#94A3B8]'>
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
              className='group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.05] hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.4)]'
            >
              {/* Línea decorativa superior */}
              <div className='absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent opacity-60' />

              {/* Fecha como chip */}
              <div className='mb-4 flex items-center gap-2'>
                <span className='h-1 w-1 rounded-full bg-[#22D3EE]' />
                <time className='text-[11px] font-medium tracking-[0.15em] text-[#94A3B8] uppercase'>
                  {formatDate(event.date)}
                </time>
              </div>

              {/* Título o editor */}
              {isEditing ? (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className='mb-3 w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-3 py-2 text-lg font-semibold text-white outline-none focus:border-[#8B5CF6]/60 focus:ring-2 focus:ring-[#8B5CF6]/20'
                  placeholder='Nuevo titulo'
                  autoFocus
                />
              ) : (
                <h3 className='mb-3 text-xl font-semibold leading-snug text-white'>
                  {event.title}
                </h3>
              )}

              <p className='mb-4 text-sm leading-relaxed text-[#D1D5DB]'>
                {event.description}
              </p>

              <div className='mb-5 flex items-center gap-2 text-xs text-[#94A3B8]'>
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
              <div className='flex items-center gap-2 border-t border-white/[0.06] pt-4'>
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleUpdate(event)}
                      className='flex-1 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-3 py-2 text-xs font-semibold text-white shadow-[0_0_16px_-4px_rgba(139,92,246,0.5)] transition-all hover:shadow-[0_0_20px_-2px_rgba(139,92,246,0.7)]'
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setNewTitle('')
                      }}
                      className='rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-white/20 hover:bg-white/[0.06]'
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
                      className='flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(event.id, event.title)}
                      className='rounded-lg border border-red-400/20 bg-red-500/[0.06] px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:border-red-400/40 hover:bg-red-500/[0.12] hover:text-red-200'
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
