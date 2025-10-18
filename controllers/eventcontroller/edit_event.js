const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function edit_event(event_json) {
    try {
        const edited_event = await prisma.event.update({
            where: { idevent: parseInt(event_json.id, 10) },
            data: {
                "title": event_json.title,
                "location": event_json.location,
                "date": new Date(event_json.date),
                "description": event_json.description
            }
        })

        console.log("Evento editado com sucesso: ", edited_event);
        return edited_event;

    } catch (error) {
        console.error("Erro ao criar evento: ", error);
        throw new Error("Falha ao salvar o evento no banco de dados.");
    }
}

module.exports = {
    edit_event
};