import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.models.event || mongoose.model('Event', eventSchema)
