const EventRepository = require('../../repositories/event.repository');

module.exports = {
    async getParticipantByEvent(event_id) {
        if (!event_id) {
            const err = new Error('ID do evento é obrigatório');
            err.statusCode = 400;
            throw err;
        }
        return EventRepository.getParticipantByEvent(event_id);
    }
};