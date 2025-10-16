const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function delete_event_controller(event_id) {
    try {
        await prisma.participant.delete({
            where: { events: parseInt(event_id.id, 10) }
        })

        const edited_event = await prisma.event.delete({
            where: { idevent: parseInt(event_id.id, 10) }
        })

        console.log("Evento editado com sucesso: ", edited_event);
        return edited_event;

    } catch (error) {
        console.error("Erro ao criar evento: ", error);
        throw new Error("Falha ao salvar o evento no banco de dados.");
    }
}

module.exports = {
    delete_event_controller
};