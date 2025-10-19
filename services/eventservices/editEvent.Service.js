const EventRepository = require('../../repositories/event.repository');

module.exports = {
    async editEventService(eventData) {
        const { id, title, location, date, description } = eventData;
        if (!id || !title || !location || !date) {
            const err = new Error('Campos obrigatórios: id, title, location, date');
            err.statusCode = 400;
            throw err;
        }
        return EventRepository.editEvent(eventData);
    }
};