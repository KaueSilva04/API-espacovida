const EventRepository = require('../../repositories/event.repository');

module.exports = {
  async createEventService(eventData) {
    const { title, location, date, description, coverImageUrl, imagePublicId } = eventData;

    if (!title || !location || !date) {
      const err = new Error('Campos obrigatórios: title, location, date');
      err.statusCode = 400;
      throw err;
    }

    const newEventData = {
      title,
      location,
      date,
      description: description || null,
      coverImageUrl: coverImageUrl || null,
      imagePublicId: imagePublicId || null,
    };

    return EventRepository.createEvent(newEventData);
  },
};
