const create_event_controller = require('./../controller/event/create_event')
const edit_event_controller = require('./../controller/event/edit_event')
const delete_event_controller = require('./../controller/event/delete_event')
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
    id_evento_json = req.body
    id_evento = parseInt(id_evento_json.id, 10)
    deleted_event = edit_event_controller.delete_event_controller(id_evento)
    res.json(deleted_event)
});


router.get('/participants', (req, res) => {
    res.json({ ok: true, message: 'Rota de eventos padrão' });
});

module.exports = router