const EventRepository = require('../../repositories/event.repository');

module.exports = {
    async deleteEventService(event_id) {
        if (!event_id) {
            const err = new Error('ID do evento é obrigatório para exclusão');
            err.statusCode = 400;
            throw err;
        }
        return EventRepository.deleteEvent(event_id);
    }
};