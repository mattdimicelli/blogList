const { test, describe, beforeEach, after, before } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { resetDb, closeDb } = require('../utils/list_helper')
const mongoose = require('mongoose')
const { mongoDbUri } = require('../utils/config')

describe('id property', async () => {
  try {
    await before(async () => {
      await mongoose.connect(mongoDbUri)
    })
    await beforeEach(async () => {
      await resetDb()
    })
    test('the unique identifier property of the blog posts is named id', async () => {
      const blogs = await Blog.find({})
      const aBlog = blogs[0]
      assert('id' in aBlog)
    })
    await after(() => closeDb())
  } catch (e) {
    console.error(e)
  }
})