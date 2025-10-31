const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async newParticipant({ name, email, phone, idEvent }) {
    const idevent = Number(idEvent);

    // verifica evento
    const event = await prisma.event.findUnique({
      where: { idevent },
      select: { idevent: true }
    });
    if (!event) {
      const err = new Error('Evento não encontrado');
      err.statusCode = 404;
      throw err;
    }

    // já inscrito?
    const already = await prisma.participant.findFirst({
      where: { email, eventId: idevent },
      select: { idparticipant: true }
    });
    if (already) {
      const err = new Error(`Este e-mail (${email}) já está inscrito no evento ${idevent}.`);
      err.statusCode = 409;
      throw err;
    }

//usamos o upsert pois como apenas o email é unico, se a pessoa ja tiver
// cadastrado em outro evento, atualizamos o telefone e adicionamos o novo evento
//se nao criamos do zero
    const participant = await prisma.participant.upsert({
      where: { email }, // email UNIQUE no schema
      update: { phone, eventId: idevent },
      create: { name, email, phone, eventId: idevent },
      include: { event: { select: { idevent: true, title: true } } }
    });

    return participant;
  },

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
  }
  
};