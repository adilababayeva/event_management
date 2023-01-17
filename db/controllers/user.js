import Users from '../models/userSchema'

// get : /api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({})

    if (!users) return res.status(404).json({ error: 'Data not Found' })
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Data' })
  }
}

// get : /api/users/1
export async function getUser(req, res) {
  try {
    const { userId } = req.query

    if (userId) {
      const user = await Users.findById(userId)
      res.status(200).json(user)
    }
    res.status(404).json({ error: 'User not Selected...!' })
  } catch (error) {
    res.status(404).json({ error: 'Cannot get the User...!' })
  }
}

// post : /api/users
export async function postUser(req, res) {
  try {
    const formData = req.body
    if (!formData)
      return res.status(404).json({ error: 'Form Data Not Provided...!' })
    Users.create(formData, function (err, data) {
      return res.status(200).json(data)
    })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// put : /api/users/1
export async function putUser(req, res) {
  try {
    const { userId } = req.query
    const formData = req.body

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData)
      res.status(200).json(user)
    }
    res.status(404).json({ error: 'User Not Selected...!' })
  } catch (error) {
    res.status(404).json({ error: 'Error While Updating the Data...!' })
  }
}

// delete : /api/users/1
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query

    if (userId) {
      const user = await Users.findByIdAndDelete(userId)
      return res.status(200).json(user)
    }

    res.status(404).json({ error: 'User Not Selected...!' })
  } catch (error) {
    res.status(404).json({ error: 'Error While Deleting the User...!' })
  }
}

// bulk delete : /api/users
export async function deleteUserBulk(req, res) {
  try {
    const user = await Users.deleteMany({ isDeletable: true })
    return res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error: 'Error While Deleting the User...!' })
  }
}
