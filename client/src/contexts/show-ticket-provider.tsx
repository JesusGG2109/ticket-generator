import { useState, type ReactNode } from 'react'
import { ShowTicketContext } from './show-ticket';

interface ShowTicketProviderProps  {
  children: ReactNode;  // Los componentes hijos que envolverá el provider
}

export const ShowTicketProvider = ({children}:ShowTicketProviderProps) => {

  const [showTicket, setShowTicket] = useState<boolean>(false);

  return (
    <ShowTicketContext.Provider value={{
      showTicket,
      setShowTicket
    }}>
      {children}
    </ShowTicketContext.Provider>
  )
}
