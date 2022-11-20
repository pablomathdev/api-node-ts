
import { AddUserInDatabase } from '../../../domain/useCases/db/add-user-in-database'
import { IdUser } from '../../../domain/useCases/user/add-user'
import mongoose from 'mongoose'
import { UserModel } from './models/user'
import { FindUserByEmailInDatabase } from '../../../domain/useCases/db/find-user-by-email-in-database'
import { User } from '../../../domain/entitys/user'

class MongoRepository implements AddUserInDatabase, FindUserByEmailInDatabase {
  constructor (private readonly userModel: any) {}
  async find (email: string): Promise<User> {
    const user = await this.userModel.collection.findOne({ email })
    const { _id, ...WithoutId } = user
    return Object.assign({}, WithoutId, { id: _id })
  }

  async add (input: any): Promise<IdUser> {
    const { name, email, password } = input

    await this.userModel.collection.insertOne({ name, email, password })
    const user = await this.find(email)
    return {
      id: user.id
    }
  }
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
    const sut = new MongoRepository(UserModel)
    const user = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'

    }

    const userAccount = await sut.add(user)
    expect(userAccount.id).toBeTruthy()
  })
  test('should find user by email', async () => {
    const sut = new MongoRepository(UserModel)
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
})
