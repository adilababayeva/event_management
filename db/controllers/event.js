import Event from '../models/eventSchema'

// get : /api/events
export async function getEvents(req, res) {
  try {
    const events = await Event.find({})

    if (!events) return res.status(404).json({ error: 'Data not Found' })
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Data' })
  }
}

// post : /api/events
export async function postEvent(req, res) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provided...!' })
    Event.create(formData, function (err, data) {
      return res.status(200).json(data)
    })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// put : /api/events/1
export async function putUser(req, res) {
  try {
    const { eventId } = req.query
    const formData = req.body

    if (eventId && formData) {
      const user = await Event.findByIdAndUpdate(eventId, formData)
      res.status(200).json(user)
    }
    res.status(404).json({ error: 'error' })
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Data...!' })
  }
}

// delete : /api/events/1
export async function deleteUser(req, res) {
  try {
    const { eventId } = req.query

    if (eventId) {
      const event = await Event.findByIdAndDelete(eventId)
      return res.status(200).json(event)
    }

    res.status(404).json({ error: 'Event Not Selected...!' })
  } catch (error) {
    res.status(404).json({ error: 'Error While Deleting the Event...!' })
  }
}
