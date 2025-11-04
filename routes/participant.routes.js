// routes/participant.routes.js
const express = require('express');
const router = express.Router();

// imports com caminho e CAIXA corretos
const { newParticipant } = require('../controllers/participantcontroller/newParticipant.Controller');
const { deleteparticipant } = require('../controllers/participantcontroller/deleteparticipant.Controller');

router.get('/test', (req, res) => {
  res.json({ message: 'teste rodando' });
});

router.post('/', (req, res, next) => newParticipant(req, res, next));

// remove participante de um evento
router.delete('/', (req, res, next) => deleteparticipant(req, res, next));

module.exports = router;
