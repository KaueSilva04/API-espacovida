const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function get_participant_by_event(event_id) {
    try {
        const participants = await prisma.participant.findMany({
            where: { eventId: event_id }
        });

        return participants;

    } catch (error) {
        console.error("Erro ao excluir evento: ", error);
        throw new Error("Falha ao excluir evento do banco de dados."); 
    }
}

module.exports = {
    get_participant_by_event
};