import { Hasher } from '../domain/useCases/security/Hasher'
import { AddUser, IdUser } from '../domain/useCases/user/add-user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'
import { User } from '../domain/entitys/user'
import { Database } from '../domain/useCases/db/interface-database'

export class AddUserRepository implements AddUser {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly hashPassword: Hasher,
    private readonly database: Database) {}

  async create (user: User): Promise<IdUser> {
    const userAccount = await this.findUserByEmail.findByEmail(user.email)
    if (userAccount) {
      return null
    }
    const hashedPassword = await this.hashPassword.hash(user.password)
    const accountToDb = Object.assign({}, user, { password: hashedPassword })

    return await this.database.add(accountToDb)
  }
}
