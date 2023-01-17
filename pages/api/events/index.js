import connect from '../../../db/connection'
import { getEvents, postEvent } from '../../../db/controllers/event'

export default async function handler(req, res) {
  connect()
  const { method } = req

  switch (method) {
    case 'GET':
      getEvents(req, res)
      break
    case 'POST':
      postEvent(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowd`)
      break
  }
}
