import { useContext } from 'react'
import { ShowTicketContext } from '../contexts/show-ticket'

export const useShowTicket = () => {

  const context = useContext(ShowTicketContext);

  if(!context){
    throw new Error("useShowTicket debe ser usado dentro de un ShowTicketProvider")
  }

  return context;

}