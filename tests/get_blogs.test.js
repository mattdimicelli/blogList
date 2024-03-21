const { test, describe} = require('node:test')
require('../utils/config')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
const { resetDb, closeDb } = require('../utils/list_helper')
describe('get blogs', () => {
  try {
    resetDb()
    test('returns the correct amount of blog posts in JSON format', async () => {
      const response = await request
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, 2)
    })
    closeDb()
  } catch (e) {
    console.error(e)
  }
})

