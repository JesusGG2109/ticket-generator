const Event = require("../models/Event");
const { eventSchema } = require("../validators/eventValidator");

const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { userId: req.user.id },
      order: [["date", "ASC"]],
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo eventos",
      error: error.message,
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const validatedData = eventSchema.parse(req.body);

    const event = await Event.create({
      ...validatedData,
      userId: req.user.id,
    });

    res.status(201).json(event);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Datos invalidos",
        errors: error.issues,
      });
    }

    res.status(500).json({
      message: "Error creando evento",
      error: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado",
      });
    }

    if (event.userId !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para ver este evento",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo evento",
      error: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado",
      });
    }

    if (event.userId !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para editar este evento",
      });
    }

    // Evitamos que userId pueda ser reasignado desde el body
    const { userId: _ignored, ...safeBody } = req.body;
    await event.update(safeBody);

    res.json({
      message: "Evento actualizado",
      event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error actualizando evento",
      error: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({
        message: "Evento no encontrado",
      });
    }

    if (event.userId !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para eliminar este evento",
      });
    }

    await event.destroy();

    res.json({
      message: "Evento eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error eliminando evento",
      error: error.message,
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
