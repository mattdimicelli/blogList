const { PORT } = require('../utils/config')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const request = supertest(app)
const Blog = require('../models/blog')
describe.only('get blogs', () => {
  try {
    beforeEach(async () => {
      console.log('in beforeeach')
      const blog1 = new Blog({ title: 'blog1', author: 'Matt Di Micelli', url: 'none', likes: 0 })
      const blog2 = new Blog({ title: 'blog2', author: 'Matt Di Micelli', url: 'none', likes: 0 })
      await Blog.deleteMany({})
      console.log('about to save first blog')
      await blog1.save()
      await blog2.save()
      console.log('second blog saved')
    })
    test.only('returns the correct amount of blog posts in JSON format', async () => {
      const response = await request.get('/api/blogs')

      function isValidJSON (str) {
        try {
          JSON.parse(str)
          return true
        } catch (e) {
          return false
        }
      }

      console.log('type of', typeof response.body)

      assert.strictEqual(isValidJSON(response.body), true)
      assert.strictEqual(JSON.parse(response.body).length, 2)
    })
    after(() => {
      mongoose.connection.close()
    })
  } catch (e) {
    console.error(e)
  }
})