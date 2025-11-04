const ParticipantService = require('../../services/participantservices/newParticipant.service');

module.exports = {
    async newParticipant(req, res, next) {
        try {
      const participantData = req.body;
      // { name, email, phone, eventId }
      const participant = await ParticipantService.newParticipantService(participantData);
      return res
        .status(201)
        .json({ status: 'ok', message: 'Participante criado com sucesso', data: participant });
    } catch (error) {
      console.error('Erro ao tentar criar participante:', error);
      const status = error.statusCode || 400;
      return res.status(status).json({ status: 'err', message: error.message || 'Falha ao criar participante' });
    }
  },

};