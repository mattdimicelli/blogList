const { test, describe, beforeEach, after, before } = require('node:test')
const assert = require('node:assert')
const { resetDb, closeDb } = require('../utils/list_helper')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const { mongoDbUri } = require('../utils/config')
describe('delete blog', async() => {
  try {
    await before(async () => {
      await mongoose.connect(mongoDbUri)
    })
    await beforeEach(async () => {
      await resetDb()
    })
    await test('When given a valid id, total count of blogs is one less', async() => {
      const response = await request(app).get('/api/blogs')
      const originalCount = response.body.length
      const id = response.body[0].id
      await request(app).delete(`/api/blogs/${id}`)
      const response2 = await request(app).get('/api/blogs')
      const currentCount = response2.body.length
      console.log('prvious', originalCount)
      console.log('current', currentCount)
      assert(currentCount === originalCount - 1)
    })
    await test('the blog specified to be deleted is the one deleted', async() => {
      const response = await request(app).get('/api/blogs')
      const blog1 = response.body[0]
      const id = blog1.id
      const response2 = await request(app).delete(`/api/blogs/${id}`)
      const deletedBlog = response2.body
      assert.deepStrictEqual(blog1, deletedBlog)
    })
    await test('if given invalid id, will respond with 404 Not Found', async() => {
      await request(app).delete('/api/blogs/12345').expect(404)
    })
    await after(async() => {
      await closeDb()
    })
  } catch(e) {
    console.error(e)
  }
})