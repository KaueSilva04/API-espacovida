const GetParticipantsByEvent = require('../../services/eventservices/getParticipantByEvent.Service')

module.exports = {
    async getParticipantByEvent(req, res, next) {
        try {
            const eventId = Number(req.query.eventId);
            const participants = await GetParticipantsByEvent.getParticipantByEvent(eventId);
            return res
                .status(200)
                .json({ status: 'ok', message: 'Participantes listados com sucesso', data: participants });
        } catch (error) {
            console.error('Erro ao tentar recuperar participantes do evento:', error);
            const status = error.statusCode || 400;
            return res.status(status).json({ status: 'err', message: error.message || 'Falha ao recuperar participantes' });
        }
    },
};