const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const cors = require('cors')
const mongoose = require('mongoose')
const { mongoDbUri } = require('./utils/config')

mongoose.connect(mongoDbUri)

app.use(cors())
app.use(express.json())

app.use(loginRouter)
app.use(blogsRouter)
app.use(userRouter)

module.exports = app