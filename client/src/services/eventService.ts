import { api } from "./api";

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventInput {
  title: string;
  description: string;
  location: string;
  date: string;
}

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>("/events");
  return response.data;
};

export const createEvent = async (eventData: EventInput): Promise<Event> => {
  const response = await api.post<Event>("/events", eventData);
  return response.data;
};

export const updateEvent = async (
  id: number,
  eventData: Partial<EventInput>
): Promise<{ message: string; event: Event }> => {
  const response = await api.put<{ message: string; event: Event }>(
    `/events/${id}`,
    eventData
  );
  return response.data;
};

export const deleteEvent = async (
  id: number
): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/events/${id}`);
  return response.data;
};
