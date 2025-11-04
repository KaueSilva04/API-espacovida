// controller/participant/deleteParticipant.js
const { PrismaClient } = require('@prisma/client');
const { deleteParticipantService } = require('../../services/participantservices/deleteParticipant.Service')
const prisma = new PrismaClient();

exports.deleteparticipant = async (req, res, next) => {
  try {
    let { idparticipant, eventId } = req.body;

    deleteParticipantService(idparticipant, eventId)

    return res.status(200).json({
      status: 'ok',
      message: 'Participação removida com sucesso',
    });
  } catch (err) {
    // Registro não encontrado em operação de delete/update
    if (err.code === 'P2025') {
      return res.status(404).json({
        status: 'erro',
        message: 'Participante não encontrado para exclusão',
      });
    }
    next(err);
  }
};
