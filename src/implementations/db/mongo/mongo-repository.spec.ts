import { MongoRepository } from './mongo-repository'
import mongoose from 'mongoose'
import { UserModel } from './models/user'

const makeSut = (): any => {
  return new MongoRepository(UserModel)
}

describe('Mongo Repository', () => {
  beforeAll(async () => {
    const url = 'mongodb://localhost:27017/test'
    await mongoose.connect(url)
  })
  afterAll(async () => {
    await UserModel.deleteMany({})
    await mongoose.disconnect()
  })

  test('should return user id if user is added ', async () => {
    const sut = makeSut()
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    const userAccount = await sut.addUser(user)
    expect(userAccount.id).toBeTruthy()
  })
  test('should find user by email', async () => {
    const sut = makeSut()
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    const userAccount = await sut.find(user.email)
    expect(userAccount.id).toBeTruthy()
    expect(userAccount.email).toBe('any_email')
    expect(userAccount.name).toBe('any_name')
  })
  test('should add token in user ', async () => {
    const sut = makeSut()
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    await sut.addUser(user)
    const userAccount = await sut.find(user.email)
    await sut.addToken(userAccount.id, 'any_token')
    const result = await sut.find(user.email)
    expect(result.accessToken).toBe('any_token')
  })
})
