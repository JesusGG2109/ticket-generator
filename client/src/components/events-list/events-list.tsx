import { useEffect, useState } from 'react'

import {
  getEvents,
  deleteEvent,
  updateEvent,
  type Event,
} from '../../services/eventService'

export const EventsList = () => {

  const [events, setEvents] = useState<Event[]>([])

  const [search, setSearch] = useState('')

  const [editingId, setEditingId] = useState<number | null>(null)

  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {

    try {

      const data = await getEvents()

      setEvents(data)

    } catch (error) {

      console.error(error)

    }
  }

  const handleDelete = async (
    id: number,
    title: string
  ) => {

    const confirmDelete = confirm(
      `¿Seguro que quieres eliminar "${title}"?`
    )

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

      setNewTitle("")

      loadEvents()

    } catch (error) {

      console.error(error)

    }
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className='mt-10 flex flex-col gap-4'>

      <h2 className='text-white text-2xl font-bold'>
        Eventos Registrados
      </h2>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white outline-none'
        placeholder='Buscar por título'
      />

      {

        filteredEvents.map((event) => (

          <div
            key={event.id}
            className='border border-white/20 rounded-xl p-4 bg-white/10 text-white'
          >

            <h3 className='font-bold text-lg'>
              {event.title}
            </h3>

            <p>{event.description}</p>

            <p>{event.location}</p>

            <p>
              {
                new Date(event.date).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            </p>

            <div className='flex gap-3 mt-4'>

              <button
                onClick={() =>
                  handleDelete(event.id, event.title)
                }
                className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg'
              >
                Eliminar
              </button>

              {

                editingId === event.id
                  ? (
                    <>
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className='bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg'
                        placeholder='Nuevo título'
                      />

                      <button
                        onClick={() => handleUpdate(event)}
                        className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg'
                      >
                        Guardar
                      </button>
                    </>
                  )
                  : (
                    <button
                      onClick={() => {
                        setEditingId(event.id)
                        setNewTitle(event.title)
                      }}
                      className='bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg'
                    >
                      Editar
                    </button>
                  )
              }

            </div>

          </div>
        ))
      }

    </div>
  )
}
