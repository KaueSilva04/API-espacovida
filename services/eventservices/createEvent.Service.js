const EventRepository = require('../../repositories/event.repository');

module.exports = {
    async createEventService(eventData) {
        const { title, location, date, description } = eventData;
        if (!title || !location || !date) {
            const err = new Error('Campos obrigatórios: title, location, date');
            err.statusCode = 400;
            throw err;
        }
        return EventRepository.createEvent(eventData);
    }
};