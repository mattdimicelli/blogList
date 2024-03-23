const { test, describe, beforeEach, after, before } = require('node:test')
const assert = require('node:assert')
const { resetDb, closeDb } = require('../utils/list_helper')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const { mongoDbUri } = require('../utils/config')
describe('update blog', async() => {
  try {
    await before(async () => {
      await mongoose.connect(mongoDbUri)
    })
    await beforeEach(async () => {
      await resetDb()
    })
    await test('When given a valid id and a new properties for the blog, the blog is successfully updated', async() => {
      const updates = {
        title: 'updated title',
        likes: 69,
      }
      const response1 = await request(app).get('/api/blogs')
      const blogs = response1.body
      const firstBlog = blogs[0]
      const validId = firstBlog.id
      const response2 = await request(app).put(`/api/blogs/${validId}`).send(updates)
      const updatedDocument = response2.body
      const expectedDocument = firstBlog;
      expectedDocument.title = updates.title
      expectedDocument.likes = updates.likes
      assert.deepStrictEqual(updatedDocument, expectedDocument)
    })
    await test('if given invalid id and new properties for a blog, returns 404', async() => {
      const updates = {
        title: 'updated title',
        likes: 69,
      }
      await request(app).put('/api/blogs/12345').send(updates).expect(404)
    })
    await test('if given invalid properties to update, returns 404', async() => {
      const invalidUpdates = {
        blogginess: 99
      }
      await request(app).put('/api/blogs').send(invalidUpdates).expect(404)
    })
    await after(async() => {
      await closeDb()
    })
  } catch(e) {
    console.error(e)
  }
})