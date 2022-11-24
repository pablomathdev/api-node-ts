import { User } from '../../../domain/entitys/user'
import { IdUser } from '../../../domain/useCases/user/add-user'
import { AddTokenInDatabase } from '../../../domain/useCases/db/add-user-token-in-database'
import { AddUserInDatabase } from '../../../domain/useCases/db/add-user-in-database'
import { FindUserByEmailInDatabase } from '../../../domain/useCases/db/find-user-by-email-in-database'

export class MongoRepository implements
 AddUserInDatabase,
 FindUserByEmailInDatabase,
 AddTokenInDatabase {
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
