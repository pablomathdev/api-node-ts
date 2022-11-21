import { Hasher } from '../domain/security/Hasher'
import { AddUser, IdUser } from '../domain/useCases/user/add-user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'
import { User } from '../domain/entitys/user'
import { AddUserInDatabase } from '../domain/useCases/db/add-user-in-database'

export class AddUserRepository implements AddUser {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly hashPassword: Hasher,
    private readonly addUserInDatabase: AddUserInDatabase) {}

  async create (user: User): Promise<IdUser> {
    const userAccount = await this.findUserByEmail.findByEmail(user.email)
    if (userAccount) {
      return null
    }
    const hashedPassword = await this.hashPassword.hash(user.password)
    const accountToDb = Object.assign({}, user, { password: hashedPassword })

    return await this.addUserInDatabase.addUser(accountToDb)
  }
}
