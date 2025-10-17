const express = require('express');
const { participate } = require('../controller/participant/participantparticipate');

const router = express.Router();


router.get('/test', (req, res) => {
    res.json({ message: 'teste rodando' });
});

router.post('/participate', (req, res, next) => {
    participate(req, res, next);
});




module.exports = router;