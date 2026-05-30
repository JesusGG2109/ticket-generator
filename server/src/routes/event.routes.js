const express = require("express");

const router = express.Router();

const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const validateNumericId = require("../middlewares/validateId.middleware");

router.use(authMiddleware);

/**
 * @swagger
 * /events:
 *   get:
 *     tags: [Events]
 *     summary: Lista los eventos del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos propiedad del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", getEvents);

/**
 * @swagger
 * /events:
 *   post:
 *     tags: [Events]
 *     summary: Crea un evento asociado al usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Evento creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", createEvent);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Obtiene un evento del usuario por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         description: El evento existe pero pertenece a otro usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", validateNumericId, getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Actualiza un evento propio del usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Evento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evento actualizado
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         description: El evento pertenece a otro usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", validateNumericId, updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Elimina un evento propio del usuario
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Evento eliminado
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         description: El evento pertenece a otro usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", validateNumericId, deleteEvent);

module.exports = router;
