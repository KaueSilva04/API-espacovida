// controller/participant/deleteParticipant.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteparticipant = async (req, res, next) => {
  try {
    let { idparticipant, eventId } = req.body;

    // validação
    if (idparticipant == null || eventId == null) {
      return res.status(400).json({
        status: 'erro',
        message: 'Campos obrigatórios: id do user , e id do evento',
      });
    }

    idparticipant = Number(idparticipant);
    const idevent = Number(eventId);

    // busca participante e confere a qual evento ele pertence
    const participant = await prisma.participant.findUnique({
      where: { idparticipant },
      select: { eventId: true },
    });

    if (!participant) {
      return res.status(404).json({
        status: 'erro',
        message: 'Participante não encontrado',
      });
    }

    if (participant.eventId !== idevent) {
      return res.status(409).json({
        status: 'erro',
        message: `Este participante não está inscrito no evento ${idevent}.`,
      });
    }

    // apaga o participante
    await prisma.participant.delete({ where: { idparticipant } });

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
