import { Hero } from './hero'
import { Form } from './form/form'
import { useEffect, useState } from 'react'
import { getEvents, deleteEvent, updateEvent } from '../../services/eventService'

export const TicketFormPage = () => {

  const [events, setEvents] = useState<any[]>([])

  const [search, setSearch] = useState("")

  const [editingId, setEditingId] = useState<number | null>(null)

  const [newTitle, setNewTitle] = useState("")

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

  const handleDelete = async (id: number) => {

    try {

      await deleteEvent(id)

      loadEvents()

    } catch (error) {

      console.error(error)

    }
  }

  const handleUpdate = async (id: number) => {

    try {

      const currentEvent = events.find(event => event.id === id)

      await updateEvent(id, {
        title: newTitle,
        description: currentEvent?.description,
        location: currentEvent?.location,
        date: currentEvent?.date
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
    <section className='mx-auto pb-[76px]'>

      <Hero />

      <Form />

      <div className='mt-10 flex flex-col gap-4'>

        <h2 className='text-white text-2xl font-bold'>
          Eventos Registrados
        </h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-400 w-full'
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

              <div className='flex gap-2 mt-3'>

                <button
                  onClick={() => {

                    const confirmDelete = confirm(
                      `¿Seguro que quieres eliminar "${event.title}"?`
                    )

                    if (confirmDelete) {
                      handleDelete(event.id)
                    }

                  }}
                  className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg'
                >
                  Eliminar
                </button>

                {
                  editingId === event.id ? (

                    <div className='flex gap-2'>

                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className='bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white outline-none focus:border-orange-400'
                        placeholder='Nuevo titulo'
                      />

                      <button
                        onClick={() => handleUpdate(event.id)}
                        className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg'
                      >
                        Guardar
                      </button>

                    </div>

                  ) : (

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

    </section>
  )
}