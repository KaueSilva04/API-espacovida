const express = require('express');
const router = express.Router();

router.post('/event', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});


router.put('/event', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});


router.delete('/event', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});


router.get('/event_participants', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});

module.exports = router