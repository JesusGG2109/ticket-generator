import { Hero } from '../components/ticket-form-page/hero'
import { Form } from '../components/ticket-form-page/form/form'
import { ConfirmationPage } from '../components/confirmation-page/confirmation-page'
import { useShowTicket } from '../hooks/use-show-ticket'

export const HomePage = () => {

  const { showTicket } = useShowTicket()

  return (

    <section className='mx-auto pb-[76px]'>

      {

        showTicket
          ? <ConfirmationPage />
          : (
            <>
              <Hero />
              <Form />
            </>
          )
      }

    </section>
  )
}
