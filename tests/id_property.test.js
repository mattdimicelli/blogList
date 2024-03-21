const { test, describe, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { resetDb, closeDb } = require('../utils/list_helper')
const mongoose = require('mongoose')
const { mongoDbUri } = require('../utils/config')

describe('id property', async () => {
  try {
    await beforeEach(async () => {
      await mongoose.connect(mongoDbUri)
      await resetDb()
    })
    test('the unique identifier property of the blog posts is named id', async () => {
      const blogs = await Blog.find({})
      const aBlog = blogs[0]
      assert('id' in aBlog)
    })
    await afterEach(() => closeDb())
  } catch (e) {
    console.error(e)
  }
})