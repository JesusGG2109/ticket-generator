import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface ShowTicket {
  showTicket: boolean;
  setShowTicket: Dispatch<SetStateAction<boolean>>;
}

export const ShowTicketContext = createContext<ShowTicket>({
  showTicket: false,
  setShowTicket: () => {}
});