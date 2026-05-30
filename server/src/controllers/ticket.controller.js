const { Ticket } = require("../models");
const { createTicketSchema } = require("../validators/ticketValidator");

const createTicket = async (req, res) => {
  try {
    const validatedData = createTicketSchema.parse(req.body);

    const ticket = await Ticket.create({
      ...validatedData,
      userId: req.user.id,
    });

    res.status(201).json(ticket);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Datos invalidos",
        errors: error.issues,
      });
    }

    res.status(500).json({
      message: "Error creando ticket",
      error: error.message,
    });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo tickets",
      error: error.message,
    });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket no encontrado",
      });
    }

    if (ticket.userId !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para ver este ticket",
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: "Error obteniendo ticket",
      error: error.message,
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket no encontrado",
      });
    }

    if (ticket.userId !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para eliminar este ticket",
      });
    }

    await ticket.destroy();

    res.json({
      message: "Ticket eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error eliminando ticket",
      error: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getMyTickets,
  getTicketById,
  deleteTicket,
};
