const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    async createEvent(event_json) {
        const newEvent = await prisma.event.create({
            data: {
                title: event_json.title,
                location: event_json.location,
                date: new Date(event_json.date),
                description: event_json.description,
                coverImageUrl: event_json.coverImageUrl || null,
                imagePublicId: event_json.imagePublicId || null
            },
        });
        return newEvent;
    },
    async deleteEvent(event_id) {
        await prisma.participant.deleteMany({
            where: { eventId: event_id }
        });

        const edited_event = await prisma.event.delete({
            where: { idevent: event_id }
        });

        return edited_event;
    },
    async editEvent(event_json) {
        const edited_event = await prisma.event.update({
            where: { idevent: parseInt(event_json.id, 10) },
            data: {
                "title": event_json.title,
                "location": event_json.location,
                "date": new Date(event_json.date),
                "description": event_json.description,
                "coverImageUrl": event_json.coverImageUrl || undefined,
                "imagePublicId": event_json.imagePublicId || undefined
            }
        })

        console.log("Evento editado com sucesso: ", edited_event);
        return edited_event;
    },
    async getParticipantByEvent(event_id) {
        const participants = await prisma.participant.findMany({
            where: { eventId: event_id }
        });

        return participants;
    },
    async listAllEvents() {

        const events = await prisma.event.findMany();
        return events;
    },
    async getTotalEvents(){
        const events = await prisma.event.count();
        return events
    },
    async getFutureEvents(){
        const events = prisma.event.count({
            where:{
                date: {
                    gte: new Date()
                }
            }
        })

        return events;
    }
};