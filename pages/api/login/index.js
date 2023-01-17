import connect from '../../../db/connection'
import login from '../../../db/controllers/login'

export default async function handler(req, res) {
  connect()
  login(req, res)
}
