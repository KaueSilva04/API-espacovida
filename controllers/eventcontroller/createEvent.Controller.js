const CreateEvent = require('../../services/eventservices/createEvent.Service');

module.exports = {
    async createEvent(req, res) {
        try {
            const { title, description, date, location, coverImageUrl, imagePublicId } = req.body;

            const eventData = {
                title,
                description,
                date,
                location,
                coverImageUrl: coverImageUrl || null,
                imagePublicId: imagePublicId || null
            };

            const event = await CreateEvent.createEventService(eventData);
            return res
                .status(201)
                .json({ status: 'ok', message: 'Evento criado com sucesso', data: event });
        } catch (error) {
            console.error('Erro ao tentar criar evento:', error);
            const status = error.statusCode || 400;
            return res.status(status).json({ status: 'err', message: error.message || 'Falha ao criar evento' });
        }
    },
};