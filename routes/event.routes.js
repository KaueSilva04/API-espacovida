// routes/event.routes.js
const express = require('express');
const router = express.Router();

// Caminhos corretos (conforme sua estrutura mostrada)
const createEventController = require('../controllers/eventcontroller/create_event');
const editEventController = require('../controllers/eventcontroller/edit_event');
const deleteEventController = require('../controllers/eventcontroller/delete_event');
const getParticipantsByEventController = require('../controllers/eventcontroller/get_participant_by_event');

// (Opcional) healthcheck da rota de eventos
router.get('/test', (req, res) => {
  res.json({ message: 'event routes ok' });
});

// Apenas delegação para os controllers (padrão middleware)
router.post('/',        (req, res, next) => createEventController.create_event(req, res, next));
router.put('/',         (req, res, next) => editEventController.edit_event(req, res, next));
router.delete('/',      (req, res, next) => deleteEventController.delete_event(req, res, next));
router.get('/participants', (req, res, next) =>
  getParticipantsByEventController.get_participant_by_event(req, res, next)
);

module.exports = router;
