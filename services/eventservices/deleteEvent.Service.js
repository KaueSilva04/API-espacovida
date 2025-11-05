const EventRepository = require('../../repositories/event.repository');
const cloudinary = require('../../utils/cloudinary');

module.exports = {
    async deleteEventService(event_id, imagePublicId) {
        if (!event_id) {
            const err = new Error('ID do evento é obrigatório para exclusão');
            err.statusCode = 400;
            throw err;
        }

        if (imagePublicId) {
            try {
                await cloudinary.uploader.destroy(imagePublicId);
                console.log('Imagem do Cloudinary deletada com sucesso');
            } catch (error) {
                console.warn('Erro ao deletar imagem do Cloudinary:', error);
            }
        }

        return EventRepository.deleteEvent(event_id);
    }
};