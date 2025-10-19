const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listAllEvents = async (req, res, next) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({
      status: 'ok',
      data: events,
    });
  } catch (err) {
    res.status(500).json({
      status: 'erro',
      message: 'Erro ao listar eventos.',
      error: err.message,
    });
  }
};


