const express = require('express');
const { participantparticipate } = require('../controller/participant/participantparticipate');
const { deleteparticipant } = require('../controller/participant/deleteparticipant');   
const router = express.Router();


router.get('/test', (req, res) => {
    res.json({ message: 'teste rodando' });
});

router.post('/participate', (req, res, next) => {
    participantparticipate(req, res, next);
});

router.delete('/delete', (req, res, next) => {
    deleteparticipant(req, res, next);
});



module.exports = router;