const create_event_controller = require('./../controller/event/create_event');
const edit_event_controller = require('./../controller/event/edit_event');
const delete_event_controller = require('./../controller/event/delete_event');
const get_participant_by_event_controller = require('./../controller/event/get_participant_by_event');
const express = require('express');
const { listAllEvents } = require('../controller/event/listallevent');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const evento = req.body;
        const created_event = await create_event_controller.create_event(evento);
        res.json(created_event);
    } catch (error) {
        res.status(500).json({ error: error.message || "Erro ao criar evento." });
    }
});


router.put('/', async (req, res) => {
    try {
        const id_plus_evento = req.body;
        const edited_event = await edit_event_controller.edit_event(id_plus_evento);
        res.json(edited_event);
    } catch (error) {
        res.status(500).json({ error: error.message || "Erro ao editar evento." });
    }
});


router.delete('/', async (req, res) => {
    try {
        const id_evento_json = req.body;
        const id_evento = parseInt(id_evento_json.id, 10);
        const deleted_event = await delete_event_controller.delete_event(id_evento);
        res.json(deleted_event);
    } catch (error) {
        // Use 404 se for um erro de não encontrado, 500 para outros
        res.status(500).json({ error: error.message || "Erro ao deletar evento." }); 
    }
});


router.get('/participants', async (req, res) => {
    try {
        const id_evento_json = req.body;
        const id_evento = parseInt(id_evento_json.id, 10);
        const participants = await get_participant_by_event_controller.get_participant_by_event(id_evento);
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message || "Erro ao buscar participantes." });
    }
});

router.get('/list', (req, res, next) => {
    listAllEvents(req, res, next);
});


module.exports = router;