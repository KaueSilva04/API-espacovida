// controller/participant/participantparticipate.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.participantparticipate = async (req, res, next) => {
  try {
    const { name, email, phone, eventId } = req.body;

    if (!name || !email || !eventId) {
      return res.status(400).json({
        status: 'erro',
        message: 'Campos obrigatórios: name, email, eventId',
      });
    }

    const idevent = Number(eventId);

    // valida se o evento existe
    const event = await prisma.event.findUnique({
      where: { idevent },
      select: { idevent: true },
    });
    if (!event) {
      return res.status(404).json({
        status: 'erro',
        message: 'Evento não encontrado',
      });
    }

    // já inscrito nesse evento?
    const already = await prisma.participant.findFirst({
      where: { email, eventId: idevent },
      select: { idparticipant: true },
    });
    if (already) {
      return res.status(409).json({
        status: 'erro',
        message: `Este e-mail (${email}) já está inscrito no evento ${idevent}.`,
      });
    }

    // como 'email' é UNIQUE no schema, usamos upsert:
    // - se existir o participante, atualiza phone e (se quiser) move para esse eventId
    // - se não existir, cria já apontando para eventId
    const participant = await prisma.participant.upsert({
      where: { email },              // UNIQUE
      update: { phone, eventId: idevent },
      create: { name, email, phone, eventId: idevent },
      include: { event: { select: { idevent: true, title: true } } },
    });

    return res.status(201).json({
      status: 'ok',
      message: 'Participação registrada com sucesso.',
      data: participant,
    });
  } catch (err) {
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      // ainda assim, devolve erro amigável
      return res.status(409).json({
        status: 'erro',
        message: 'E-mail já cadastrado para outro participante.',
      });
    }
    next(err);
  }
};
