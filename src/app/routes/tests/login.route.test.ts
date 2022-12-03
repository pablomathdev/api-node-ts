import request from 'supertest'
import app from '../../config/app'
import { hash } from 'bcrypt'
import { deleteDocs, mongoConnect, mongoDisconnect } from '../../../implementations/db/mongo/conn/mongo-connect'
import { UserModel } from '../../../implementations/db/mongo/models/user'
import env from '../../config/env'

describe('Login route', () => {
  beforeAll(async () => {
    await mongoConnect(env.mongoUriTest)
  })
  afterAll(async () => {
    await deleteDocs(UserModel)
    await mongoDisconnect()
  })

  test('Should return 200 if user login success', async () => {
    const hashPassword = await hash('123', 12)
    await UserModel.create({
      name: 'Pablo',
      email: 'pablomatheus144@gmail.com',
      password: hashPassword
    })
    await request(app)
      .post('/login')
      .send({

        email: 'pablomatheus144@gmail.com',
        password: '123'
      })
      .expect(200)
  })
})
