const EditEventService = require('../../services/eventservices/editEvent.Service.js');

module.exports = {
    async editEvent(req, res, next) {
        try {
            const eventData = req.body; 
            const updatedEvent = await EditEventService.editEventService(eventData);
            return res
                .status(200)
                .json({ status: 'ok', message: 'Evento atualizado com sucesso', data: updatedEvent });
        } catch (error) {
            console.error('Erro ao tentar atualizar evento:', error);
            const status = error.statusCode || 400;
            return res.status(status).json({ status: 'err', message: error.message || 'Falha ao atualizar evento' });
        }   
    },
};