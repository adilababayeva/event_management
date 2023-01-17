import connect from '../connection'
import User from '../models/userSchema'

connect()

export default async function login(req, res) {
  const { email, password } = req.body
  console.log(email)
  const user = await User.findOne({ email, password })
  if (!user) {
    return res.json({ error: 'Invalid credentials' })
  } else {
    return res.json({ success: 'ok' })
  }
}
