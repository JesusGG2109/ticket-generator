const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo eventos",
      error,
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error creando evento",
      error,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado"
      });
    }

    res.json(event);

  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo evento",
      error: error.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {

    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado"
      });
    }

    await event.update(req.body);

    res.json({
      message: "Evento actualizado",
      event
    });

  } catch (error) {

    res.status(500).json({
      message: "Error actualizando evento",
      error: error.message
    });

  }
};

const deleteEvent = async (req, res) => {
  try {

    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado"
      });
    }

    await event.destroy();

    res.json({
      message: "Evento eliminado"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error eliminando evento",
      error: error.message
    });

  }
};


module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent
};