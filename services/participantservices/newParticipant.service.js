const ParticipantRepository = require('../../repositories/participant.repository');

module.exports = {
    async newParticipantService(participantData) {
    const { name, email, phone, eventId } = participantData;

    if (!name || !email || !eventId) {
      const err = new Error('Campos obrigatórios: name, email, eventId');
      err.statusCode = 400;
      throw err;
    }

    return ParticipantRepository.newParticipant({ name, email, phone, eventId });
  },
};