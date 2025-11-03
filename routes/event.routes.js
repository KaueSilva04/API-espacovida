// routes/event.routes.js
const express = require('express');
const router = express.Router();

// Caminhos corretos (conforme sua estrutura mostrada)
const createEventController = require('../controllers/eventcontroller/createEvent.Controller.js');
const editEventController = require('../controllers/eventcontroller/editEvent.Controller.js');
const deleteEventController = require('../controllers/eventcontroller/deleteEvent.Controller.js');
const getParticipantsByEventController = require('../controllers/eventcontroller/getParticipantsByEvent.Controller.js');
const listAllEventsController = require('../controllers/eventcontroller/listAllEvent.Controller.js');
const middleware = require('../utils/middleware.js');

router.get('/test', (req, res) => {
  res.json({ message: 'event routes ok' });
});

// Apenas delegação para os controllers (padrão middleware)
router.post('/', middleware.authMiddleware() , createEventController.createEvent);
router.put('/', middleware.authMiddleware() , editEventController.editEvent);
router.delete('/', middleware.authMiddleware() , deleteEventController.deleteEvent);
router.get('/participants', middleware.authMiddleware() , getParticipantsByEventController.getParticipantByEvent);
router.get('/all', listAllEventsController.listAllEvents);

module.exports = router;