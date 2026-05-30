import { Hero } from '../components/ticket-form-page/hero'
import { Form } from '../components/ticket-form-page/form/form'
import { ConfirmationPage } from '../components/confirmation-page/confirmation-page'
import { useShowTicket } from '../hooks/use-show-ticket'

export const HomePage = () => {
  const { showTicket } = useShowTicket()

  if (showTicket) {
    return (
      <section className='py-12 sm:py-16'>
        <ConfirmationPage />
      </section>
    )
  }

  return (
    <section className='pb-24'>
      <Hero />

      <div className='mx-auto mt-4 max-w-xl'>
        <div className='mb-10 flex items-center gap-4'>
          <div className='h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent' />
          <span className='text-[11px] font-medium tracking-[0.25em] text-[#94A3B8] uppercase'>
            Genera tu ticket
          </span>
          <div className='h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent' />
        </div>

        <Form />
      </div>
    </section>
  )
}
