const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (req, res) => {
  try {
    const { username, password, name } = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, hashedPassword, name })
    const newUser = await user.save()
  } catch (e) {
    console.error(e)
  }
})

module.exports = userRouter