const { test, describe, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const { resetDb, closeDb } = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)
describe('post blog', async () => {
  // await beforeEach(() => resetDb)
  // test('posting blog increases number of blogs by one', async () => {
  //   try {
  //     const response = await request.post.send({ title: 'blog3', author: 'Matt', url: 'http://none.com', likes: 0 })
  //     console.log(response.length === 3)
  //     assert(response.length === 3)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // })
  // afterEach(() => closeDb())
})