const { test, describe, beforeEach, after, before } = require('node:test')
const assert = require('node:assert')
const { resetDb, closeDb } = require('../utils/list_helper')
const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const { mongoDbUri } = require('../utils/config')
describe('post blog', async () => {
  try {
    await before(async () => {
      await mongoose.connect(mongoDbUri)
    })
    await beforeEach(async () => {
      await resetDb()
    })
    await test('posting blog increases number of blogs by one', async () => {
      await request(app).post('/api/blogs').send({ title: 'blog3', author: 'Matt', url: 'http://none.com', likes: 0 })
      const response = await request(app).get('/api/blogs')
      assert(response.body.length === 3)
    })
    await test('the correct content is saved to the db', async () => {
      const data = { title: 'blog3', author: 'Matt', url: 'http://none.com', likes: 0 }
      const response = await request(app).post('/api/blogs').send(data)
      const copyOfResponseBody = JSON.parse(JSON.stringify(response.body))
      delete copyOfResponseBody.id
      assert.deepStrictEqual(data, copyOfResponseBody)
    })
    await test('if blog post is without likes property, defaults to 0', async() => {
      const data = { title: 'blog3', author: 'Matt', url: 'http://none.com' }
      const response = await request(app).post('/api/blogs').send(data)
      assert(response.body.likes === 0)
    })
    await after(async() => {
      await closeDb()
    })
  } catch(e) {
    console.error(e)
  }
})