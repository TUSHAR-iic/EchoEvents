const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  eventMode: { type: String, required: true },
  eventType: { type: String },
  eventImage: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);

