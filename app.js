const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blogs')
const cors = require('cors')
const mongoose = require('mongoose')
const { mongoDbUri } = require('./utils/config')

mongoose.connect(mongoDbUri)

app.use(cors())
app.use(express.json())

app.use(blogsRouter)

module.exports = app