
import { AddUserInDatabase } from '../../../domain/useCases/db/add-user-in-database'
import { IdUser } from '../../../domain/useCases/user/add-user'
import mongoose from 'mongoose'
import { UserModel } from './models/user'
import { FindUserByEmailInDatabase } from '../../../domain/useCases/db/find-user-by-email-in-database'
import { User } from '../../../domain/entitys/user'
import { AddTokenInDatabase } from '../../../domain/useCases/db/add-user-token-in-database'

class MongoRepository implements AddUserInDatabase, FindUserByEmailInDatabase, AddTokenInDatabase {
  constructor (private readonly userModel: any) {}
  async addToken (id: string, token: string): Promise<void> {
    await this.userModel.collection.findOneAndUpdate({ _id: id }, { $set: { accessToken: token } })
  }

  async find (email: string): Promise<User> {
    const user = await this.userModel.collection.findOne({ email })
    const { _id, ...WithoutId } = user
    return Object.assign({}, WithoutId, { id: _id })
  }

  async addUser (input: any): Promise<IdUser> {
    const { name, email, password } = input

    await this.userModel.collection.insertOne({ name, email, password })
    const user = await this.find(email)
    return {
      id: user.id
    }
  }
}

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
