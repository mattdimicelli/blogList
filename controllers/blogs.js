const Blog = require('../models/blog')
const User = require('../models/user')

const blogsRouter = require('express').Router()
blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  const aUser = await User.findOne()
  const aUserID = aUser._id
  blog.user = aUserID
  try {
    const savedBlog = await blog.save()
    aUser.blogs = [...aUser.blogs, savedBlog._id]
    await aUser.save()
    response.status(201).send(savedBlog.toJSON())
  } catch (e) {
    response.status(400).end()
  }
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  const id = request.params.id
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id)
    return response.send(deletedBlog.toJSON())
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
