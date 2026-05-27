import { api } from "./api";

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const createEvent = async (eventData: any) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export const updateEvent = async (id: number, eventData: any) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: number) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};
