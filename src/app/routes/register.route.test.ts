import request from 'supertest'
import app from '../config/app'
import mongoose from 'mongoose'
import { UserModel } from '../../implementations/db/mongo/models/user'

describe('Register route', () => {
  beforeAll(async () => {
    const url = 'mongodb://localhost:27017/test'
    await mongoose.connect(url)
  })
  afterAll(async () => {
    await UserModel.deleteMany({})
    await mongoose.disconnect()
  })
  test('Should return 201 if user added', async () => {
    await request(app)
      .post('/register')
      .send({
        name: 'Pablo',
        email: 'pablomatheus18koe@gmail.com',
        password: '123'
      })
      .expect(201)
  })
})
