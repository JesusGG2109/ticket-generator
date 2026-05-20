import { Hero } from './hero'
import { Form } from './form/form'
import { useEffect, useState } from 'react'
import { getEvents } from '../../services/eventService'

export const TicketFormPage = () => {

  const [events, setEvents] = useState<any[]>([])

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

  return (
    <section className='mx-auto pb-[76px]'>

      <Hero />

      <Form />

      <div className='mt-10 flex flex-col gap-4'>

        <h2 className='text-white text-2xl font-bold'>
          Eventos Registrados
        </h2>

        {
          events.map((event) => (
            <div
              key={event.id}
              className='border border-white/20 rounded-xl p-4 bg-white/10 text-white'
            >
              <h3 className='font-bold text-lg'>
                {event.title}
              </h3>

              <p>{event.description}</p>

              <p>{event.location}</p>

              <p>{event.date}</p>
            </div>
          ))
        }

      </div>

    </section>
  )
}