import { Congrats } from './congrats'
import { Ticket } from './ticket'

export const ConfirmationPage = () => {
  return (
    <section className='mx-auto max-w-3xl py-12 text-center sm:py-16'>
      <Congrats />
      <div className='mt-12'>
        <Ticket />
      </div>
    </section>
  )
}
