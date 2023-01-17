import connect from '../../../db/connection'
import {
  getUsers,
  postUser,
  deleteUserBulk,
} from '../../../db/controllers/user'

export default async function handler(req, res) {
  connect()
  const { method } = req

  switch (method) {
    case 'GET':
      getUsers(req, res)
      break
    case 'POST':
      postUser(req, res)
      break
    case 'DELETE':
      deleteUserBulk(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowd`)
      break
  }
}
