const { test, describe} = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { resetDb, closeDb } = require('../utils/list_helper')
const mongoose = require('mongoose')

console.log('start of this file')
describe('id property', async () => {
  try {
    console.log('in id property')
    const { mongoDbUri } = require('../utils/config')
    await mongoose.connect(mongoDbUri)
    resetDb()
    test('the unique identifier property of the blog posts is named id', async() => {
      const blogs = await Blog.find({})
      const aBlog = blogs[0]
      assert('id' in aBlog)
    })
    closeDb()
  } catch(e) {
    console.error(e)
  }
})