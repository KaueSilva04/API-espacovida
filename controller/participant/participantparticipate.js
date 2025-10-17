const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.participateParticipant = async (req, res, next) => {
  try {
    const { name, email, phone, eventId } = req.body;

    if (!name || !email || !eventId) {
      return res.status(400).json({
        status: 'erro',
        message: 'Campos obrigatórios: name, email, eventId',
      });
    }

    const idevent = Number(eventId);

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

    const already = await prisma.participant.findFirst({
      where: {
        email,
        events: { some: { idevent } },
      },
      select: { idparticipant: true },
    });

    if (already) {
      return res.status(409).json({
        status: 'erro',
        message: `Este e-mail (${email}) já está inscrito no evento ${idevent}.`,
      });
    }

   
    const participant = await prisma.participant.upsert({
      where: { email },             
      update: {
        phone,
        events: { connect: { idevent } },
      },
      create: {
        name,
        email,
        phone,
        events: { connect: { idevent } },
      },
      include: {
        events: { select: { idevent: true, title: true } },
      },
    });

    return res.status(201).json({
      status: 'ok',
      message: 'Participação registrada com sucesso.',
      data: participant,
    });
  } catch (err) {
    if (err.code === 'P2002' && err.meta?.target?.includes('email')) {
      return res.status(409).json({
        status: 'erro',
        message: 'E-mail já cadastrado para outro participante.',
        detail: 'Como o e-mail é único no schema, reaproveite o registro existente.',
      });
    }
    next(err);
  }
};
