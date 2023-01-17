import connect from '../../../db/connection'
import { getEvent, putEvent, deleteEvent } from '../../../db/controllers/event'

export default async function handler(req, res) {
  connect()

  // type of request
  const { method } = req

  switch (method) {
    case 'GET':
      getEvent(req, res)
      break
    case 'PUT':
      putEvent(req, res)
      break
    case 'DELETE':
      deleteEvent(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
      break
  }
}
