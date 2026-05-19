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

module.exports = {
  getEvents,
  createEvent,
};