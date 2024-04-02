const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/api/users', async (req, res) => {
  try {
    const { username, password, name } = req.body
    if (password != undefined && password.length < 3) {
      return res.status(400).send({ error: 'password must be minimum of three chars' })
    }
    const saltRounds = 10
    let hashedPassword
    if (password != undefined) {
      hashedPassword = await bcrypt.hash(password, saltRounds)
    }
    const user = new User({ username, password: hashedPassword, name })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (e) {
    if (e.name === 'MongoServerError') {
      return res.status(400).send({ error: 'username must be unique' })
    }
    if (e?.errors?.password?.properties?.message === 'Path `password` is required.') {
      return res.status(400).send({ error: 'must give password' })
    }
    if (e?.errors?.username?.properties?.message === 'Path `username` is required.') {
      return res.status(400).send({ error: 'must give username' })
    }
    if (e?.errors?.name?.properties?.message === 'Path `name` is required.') {
      return res.status(400).send({ error: 'must give name' })
    }
    if (e?.errors?.username?.kind === 'minlength') {
      return res.status(400).send({ error: 'username must be minimum of three chars' })
    }
    res.status(400).send({ error: 'invalid request' })
  }
})

userRouter.get('/api/users', async (req, res) => {
  try {
    const allUsers = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, _id: 1 })
    res.json(allUsers)
  } catch (e) {
    console.error(e)
    res.status(400).send({ error: 'invalid request' })
  }
})

module.exports = userRouter