import connect from '../../../db/connection'
import { getUser, putUser, deleteUser } from '../../../db/controllers/user'

export default async function handler(req, res) {
  connect()

  // type of request
  const { method } = req

  switch (method) {
    case 'GET':
      getUser(req, res)
      break
    case 'PUT':
      putUser(req, res)
      break
    case 'DELETE':
      deleteUser(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
      break
  }
}
