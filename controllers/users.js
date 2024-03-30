const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/api/users', async (req, res) => {
  try {
    const { username, password, name } = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, password: hashedPassword, name })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (e) {
    console.error(e)
    res.status(400).send({ error: 'invalid request' })
  }
})

userRouter.get('/api/users', async(req, res) => {
  try {
    const allUsers = await User.find({})
    res.json(allUsers);
  } catch(e) {
    console.error(e)
    res.status(400).send({ error: 'invalid request' })
  }
})

module.exports = userRouter