const EventRepository = require('../../repositories/event.repository');

module.exports = {
    async listAllEvents() {
        const events = EventRepository.listAllEvents();
         if (!events) {
            const err = new Error('Nenhum evento encontrado');
            err.statusCode = 404;
            throw err;
         }

         return events;
    }
};