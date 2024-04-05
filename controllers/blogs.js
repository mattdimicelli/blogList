const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    blog.user = user._id
    const savedBlog = await blog.save()
    user.blogs = [...user.blogs, savedBlog._id]
    await user.save()
    response.status(201).send(savedBlog.toJSON())
  } catch (e) {
    if (e.message === 'jwt must be provided') {
      response.status(401).json({ error: 'jwt must be provided' })
    } else if (e.message === 'invalid token') {
      response.status(401).json({ error: 'invalid token' })
    } else {
      response.status(400).end()
    }
  }
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const foundBlog = await Blog.findById(id)
    if (decodedToken.id === foundBlog.user._id) {
      const deletedBlog = await Blog.findByIdAndDelete(id)
      return response.send(deletedBlog.toJSON())
    } else {
      return response.send({ error: 'this user cannot delete this blog' })
    }
    // otherwise, return status
  } catch (e) {
    response.status(404).end()
  }
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  const updates = request.body
  try {
    const updatedDocument = await Blog.findByIdAndUpdate(id, updates, { new: 'true' })
    response.send(updatedDocument.toJSON()).end()
  } catch (e) {
    response.status(404).end()
  }
})

module.exports = blogsRouter
