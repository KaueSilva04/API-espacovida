const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function create_event(event_json) {
    try {
        const newEvent = await prisma.event.create({
            data: {
                title: event_json.title,
                location: event_json.location,
                date: new Date(event_json.date),
                description: event_json.description,
            },
        });

        console.log("Evento criado com sucesso: ", newEvent);
        return newEvent;

    } catch (error) {
        console.error("Erro ao criar evento: ", error);
        throw new Error("Falha ao salvar o evento no banco de dados.");
    }
}

module.exports = {
    create_event
};