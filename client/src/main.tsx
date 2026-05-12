import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ShowTicketProvider } from './contexts/show-ticket-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShowTicketProvider>
      <App />
    </ShowTicketProvider>
  </StrictMode>,
)
