const { PrismaClient } = require('@prisma/client');
const { getParticipantByEvent } = require('./event.repository');
const prisma = new PrismaClient();

module.exports = {
  async newParticipant({ name, email, phone, idEvent }) {
    const idevent = Number(idEvent);

    // 1. Verifica se o evento existe
    const event = await prisma.event.findUnique({
      where: { idevent },
      select: { idevent: true }
    });

    if (!event) {
      const err = new Error('Evento não encontrado');
      err.statusCode = 404;
      throw err;
    }

    // 2. Verifica se o participante já está inscrito NO MESMO EVENTO
    const already = await prisma.participant.findFirst({
      where: { email, eventId: idevent },
      select: { idparticipant: true }
    });

    if (already) {
      const err = new Error(`Este e-mail (${email}) já está inscrito no evento ${idevent}.`);
      err.statusCode = 409;
      throw err;
    }

    // 3. Cadastra o participante no evento
    const participant = await prisma.participant.create({
      data: { name, email, phone, eventId: idevent },
      include: {
        event: { select: { idevent: true, title: true } }
      }
    });

    return participant;
  }
  ,

  async deleteParticipant({ idparticipant, eventId }) {
    const pid = Number(idparticipant);
    const idevent = Number(eventId);

    // confere participante
    const participant = await prisma.participant.findUnique({
      where: { idparticipant: pid },
      select: { eventId: true }
    });
    if (!participant) {
      const err = new Error('Participante não encontrado');
      err.statusCode = 404;
      throw err;
    }

    if (participant.eventId !== idevent) {
      const err = new Error(`Este participante não está inscrito no evento ${idevent}.`);
      err.statusCode = 409;
      throw err;
    }

    await prisma.participant.delete({ where: { idparticipant: pid } });
    return true;
  },
  async getTotalParticipant() {
    const participants = await prisma.participant.count();
    return participants;
  },
  async getParticipantByEvent(eventId) {
    const participant = await prisma.participant.count({
      where: { eventId }
    });

    return participant;
  },
  async listParticipantesTopEvents() {
    const mostParticipantedEvent = await prisma.participant.groupBy({
      by: ['eventId'],
      _count: {
        eventId: true
      },
      orderBy: {
        _count: {
          eventId: 'desc'
        }
      },
      take: 7
    })
    return mostParticipantedEvent;
  }

};