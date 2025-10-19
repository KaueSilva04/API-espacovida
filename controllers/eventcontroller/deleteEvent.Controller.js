const DeleteEvent = require('../../services/eventservices/deleteEvent.Service');

module.exports = {
    async deleteEvent(req, res) {
        try {
            const { event_id } = req.params;
            await DeleteEvent.deleteEventService(event_id);
            return res
                .status(200)
                .json({ status: 'ok', message: 'Evento deletado com sucesso' });
        } catch (error) {
            console.error('Erro ao tentar deletar evento:', error);
            const status = error.statusCode || 400;
            return res.status(status).json({ status: 'err', message: error.message || 'Falha ao deletar evento' });
        }
    },
};