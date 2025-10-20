const ListAllEventsService = require('../../services/eventservice/listAllEvent.Service.js');

module.exports = {
    async listAllEvents(req, res, next) {
        try {
            const events = await ListAllEventsService.listAllEvents();
            return res
                .status(200)
                .json({ status: 'ok', message: 'Eventos listados com sucesso', data: events });
        } catch (error) {
            console.error('Erro ao tentar listar eventos:', error);
            const status = error.statusCode || 400;
            return res.status(status).json({ status: 'err', message: error.message || 'Falha ao listar eventos' });
        }
    },
};