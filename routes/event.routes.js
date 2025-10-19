// routes/event.routes.js
const express = require('express');
const router = express.Router();

// Caminhos corretos (conforme sua estrutura mostrada)
const createEventController = require('../controllers/eventcontroller/createEvent.Controller.js');
const editEventController = require('../controllers/eventcontroller/editEvent.Controller.js');
const deleteEventController = require('../controllers/eventcontroller/deleteEvent.Controller.js');
const getParticipantsByEventController = require('../controllers/eventcontroller/getParticipantsByEvent.js');

router.get('/test', (req, res) => {
  res.json({ message: 'event routes ok' });
});

// Apenas delegação para os controllers (padrão middleware)
router.post('/',        (req, res, next) => createEventController.createEvent(req, res, next));
router.put('/',         (req, res, next) => editEventController.editEvent(req, res, next));
router.delete('/',      (req, res, next) => deleteEventController.deleteEvent(req, res, next));
router.get('/participants', (req, res, next) =>
  getParticipantsByEventController.getParticipantByEvent(req, res, next)
);

module.exports = router;
