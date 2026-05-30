import { api } from "./api";

export interface Ticket {
  id: number;
  name: string;
  email: string;
  github: string | null;
  avatar: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TicketInput {
  name: string;
  email: string;
  github?: string | null;
  avatar?: string | null;
}

export const createTicket = async (
  payload: TicketInput
): Promise<Ticket> => {
  const response = await api.post<Ticket>("/tickets", payload);
  return response.data;
};

export const getMyTickets = async (): Promise<Ticket[]> => {
  const response = await api.get<Ticket[]>("/tickets/me");
  return response.data;
};

export const getTicketById = async (id: number): Promise<Ticket> => {
  const response = await api.get<Ticket>(`/tickets/${id}`);
  return response.data;
};

export const deleteTicket = async (
  id: number
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/tickets/${id}`);
  return response.data;
};
