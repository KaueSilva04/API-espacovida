const create_event_controller = require('./../controller/event/create_event')
const edit_event_controller = require('./../controller/event/edit_event')
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    evento = req.body
    created_event = create_event_controller.create_event(evento)
    res.json(created_event)
});


router.put('/', (req, res) => {
    id_plus_evento = req.body
    edited_event = edit_event_controller.edit_event(id_plus_evento)
    res.json(edited_event)
});


router.delete('/', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});


router.get('/participants', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});

module.exports = router