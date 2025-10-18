const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function delete_event(event_id) {
    try {
        await prisma.participant.deleteMany({
            where: { eventId: event_id }
        });

        const edited_event = await prisma.event.delete({
            where: { idevent: event_id } 
        });

        return edited_event;

    } catch (error) {
        console.error("Erro ao excluir evento: ", error);
        throw new Error("Falha ao excluir evento do banco de dados."); 
    }
}

module.exports = {
    delete_event
};