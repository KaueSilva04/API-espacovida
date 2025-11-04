const ParticipantRepository = require('../../repositories/participant.repository');

module.exports = {
    async deleteParticipantService(idparticipant, eventId) {
    

    if (!idparticipant || !eventId) {
      const err = new Error('Campos obrigatórios: idparticipant, eventId');
      err.statusCode = 400;
      throw err;
    }

    return ParticipantRepository.deleteParticipant({ idparticipant, eventId });
  },
};