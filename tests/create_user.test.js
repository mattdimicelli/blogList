const { test, describe, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const { resetUsers, closeDb } = require('../utils/list_helper')
const mongoose = require('mongoose')
const { mongoDbUri } = require('../utils/config')
const request = require('supertest')
const app = require('../app')

describe('create user', async() => {
  try {
    await before(async () => {
      await mongoose.connect(mongoDbUri)
    })
    await beforeEach(async () => {
      await resetUsers()
    })
    await test('using a previously named username will result in error', async() => {
      await request(app).post('/api/users').send({ username: 'mrd2689a', password: 'stupid pw', name: 'Matt Di Micelli' }).expect(400, { error: 'username must be unique'})
    })
    await test('if the password is too short, get appropriate error', async() => {
      await request(app).post('/api/users').send({ username: 'user2', password: 'fu', name: 'Matt Di Micelli' }).expect(400, { error: 'password must be minimum of three chars' })
    })
    await test('if the username is too short, get appropriate error', async() => {
      await request(app).post('/api/users').send({ username: 'hi', password: 'facka', name: 'Matt Di Micelli' }).expect(400, { error: 'username must be minimum of three chars' })
    })
    await test('if missing a pw, get error', async() => {
      await request(app).post('/api/users').send({ username: 'user3', name: 'Matt Di Micelli' }).expect(400, { error: 'must give password' })
    })
    await test('if missing username, get error', async() => {
      await request(app).post('/api/users').send({ password: 'nice', name: 'Matt Di Micelli' }).expect(400, { error: 'must give username' })
    })
    await test('if missing name, get error', async() => {
      await request(app).post('/api/users').send({ password: 'nice', username: 'user5' }).expect(400, { error: 'must give name' })
    })
    await test('if username is unique & at least three chars, password is at least 3 chars, and name is supplied, user created', async() => {
      const niceUser = { password: 'nice_password', username: 'unique_user', name: 'Matt Di Micelli' }
      const result = await request(app).post('/api/users').send(niceUser).expect(201)
      assert(result.body.username === niceUser.username && result.body.name === niceUser.name && result.body.id)
    })
    await after(async() => {
      await closeDb()
    })
  } catch(e) {
    console.error(e)
  }

})