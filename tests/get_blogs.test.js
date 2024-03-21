const app = require('../app')
const { test, describe, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const request = supertest(app)
const { resetDb, closeDb } = require('../utils/list_helper')
describe('get blogs', async () => {
  try {
    await beforeEach(async () => await resetDb())
    test('returns the correct amount of blog posts in JSON format', async () => {
      const response = await request
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, 2)
    })
    await afterEach(() => closeDb())
  } catch (e) {
    console.error(e)
  }
})

