const EventRepository = require('../repositories/event.repository');
const ParticipantRepository = require('../repositories/participant.repository');

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
function formatDate(dateString) {
    const date = new Date(dateString);

    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
    const ano = date.getUTCFullYear();

    return `${dia}/${mes}/${ano}`;
}

module.exports = {
    async homeDataList() {

        const totalEvents = await EventRepository.countTotalEvents();
        if (totalEvents === null || totalEvents === undefined) {
            const err = new Error("Erro ao buscar total de eventos");
            err.statusCode = 500;
            throw err;
        }

        if (totalEvents === 0) {
            const err = new Error("Nenhum evento encontrado");
            err.statusCode = 404;
            throw err;
        }

        const totalParticipants = await ParticipantRepository.getTotalParticipant();
        if (totalParticipants < 0 || isNaN(totalParticipants)) {
            const err = new Error("Dados inválidos de participantes totais");
            err.statusCode = 500;
            throw err;
        }


        const avg = totalParticipants / totalEvents;
        const averageParticipants = (avg === 0) ? 0 : Math.max(1, Math.round(avg));


        const futureEvents = await EventRepository.countFutureEvents();
        if (futureEvents === null) {
            const err = new Error("Erro ao buscar eventos futuros");
            err.statusCode = 500;
            throw err;
        }

        const pastEvents = await EventRepository.countPastEvents();
        if (pastEvents === null) {
            const err = new Error("Erro ao buscar eventos passados");
            err.statusCode = 500;
            throw err;
        }

        const events = await EventRepository.listAllEvents();
        if (!Array.isArray(events)) {
            const err = new Error("Falha ao listar eventos");
            err.statusCode = 500;
            throw err;
        }

        const participantsMonthly = {};

        for (const event of events) {

            if (!event.date) {
                const err = new Error(`Evento com ID ${event.idevent} está sem data`);
                err.statusCode = 500;
                throw err;
            }

            const date = new Date(event.date);
            const year = date.getFullYear();
            const month = date.getMonth();

            const participantsCount = await ParticipantRepository.getParticipantByEvent(
                event.idevent || event.id || event.eventId
            );

            if (participantsCount === null || participantsCount === undefined) {
                const err = new Error(`Falha ao buscar participantes do evento ${event.idevent}`);
                err.statusCode = 500;
                throw err;
            }

            if (!participantsMonthly[year]) {
                participantsMonthly[year] = monthNames.map(name => ({
                    name,
                    participantes: 0
                }));
            }

            participantsMonthly[year][month].participantes += participantsCount;
        }

        const nextEvents = await EventRepository.listNextEvents();
        if (!Array.isArray(nextEvents)) {
            const err = new Error("Erro ao buscar eventos futuros detalhados");
            err.statusCode = 500;
            throw err;
        }

        const nextEventsUpdate = nextEvents.map(event => {

            if (!event.idevent || !event.title) {
                const err = new Error("Um dos eventos futuros possui dados inválidos");
                err.statusCode = 500;
                throw err;
            }

            return {
                id: event.idevent,
                title: event.title,
                date: formatDate(event.date),
                location: event.location
            };
        });

        const topEvents = await ParticipantRepository.listParticipantesTopEvents();

        if (!Array.isArray(topEvents)) {
            const err = new Error("Erro ao buscar eventos mais populares");
            err.statusCode = 500;
            throw err;
        }

        const topEventsAtualizado = [];

        for (const numberEvent of topEvents) {

            if (!numberEvent.eventId) {
                const err = new Error("Evento inválido em top events");
                err.statusCode = 500;
                throw err;
            }

            const event = await EventRepository.getEventById(numberEvent.eventId);

            if (!event) {
                const err = new Error(`Evento não encontrado para ID ${numberEvent.eventId}`);
                err.statusCode = 404;
                throw err;
            }

            topEventsAtualizado.push({
                id: event.idevent,
                title: event.title,
                participants: numberEvent._count.eventId
            });
        }

        const eventsDistribution = [
            { name: "Futuros", value: futureEvents },
            { name: "Passados", value: pastEvents }
        ];

        const result = {
            totalEvents,
            totalParticipants,
            averageParticipants,
            futureEvents,
            pastEvents,
            eventsDistribution,
            participantsMonthly,
            nextEvents: nextEventsUpdate,
            topEvents: topEventsAtualizado
        };

        return result;
    },

};
