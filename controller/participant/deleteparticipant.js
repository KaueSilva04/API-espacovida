const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.deleteParticipant = async (req, res, next) => {

    try {
        const { idparticipant, eventId } = req.body;
        //validando
        if (!idparticipant || !eventId) {
            return res.status(400).json({
                status: 'erro',
                message: 'Campos obrigatórios: idparticipant, eventId',
            });
        }

        //buscando participante
        const idevent = Number(eventId);

        const participant = await prisma.participant.findUnique({
            where: { idparticipant },
            include: { events: true },
        });

        if (!participant) {
            return res.status(404).json({
                status: 'erro',
                message: 'Participante não encontrado',
            });
        }

        const event = participant.events.find(event => event.idevent === idevent);

        if (!event) {
            return res.status(404).json({
                status: 'erro',
                message: 'Evento não encontrado para este participante',
            });
        }

        await prisma.participant.update({
            where: { idparticipant },
            data: {
                events: { disconnect: { idevent } },
            },
        });

        return res.status(200).json({
            status: 'ok',
            message: 'Participação removida com sucesso',
        });
    } catch (err) {
        next(err);
    }
};


