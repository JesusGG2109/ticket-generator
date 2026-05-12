import { TicketFormPage } from './components/ticket-form-page/ticket-form-page'
import { MainLayout } from './components/layouts/main-layout'
import { useShowTicket } from './hooks/use-show-ticket';
import { ConfirmationPage } from './components/confirmation-page/confirmation-page'


function App() {

  const context = useShowTicket();

  return (

      <MainLayout>
        <main className='max-w-3xl mx-auto'>
          {
            context.showTicket 
            ? <ConfirmationPage />
            : <TicketFormPage />
          }
        </main>
          
      </MainLayout>
  )
}

export default App
