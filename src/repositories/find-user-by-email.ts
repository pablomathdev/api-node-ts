
import { User } from '../domain/entitys/user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'
import { FindUserByEmailInDatabase } from '../domain/useCases/db/find-user-by-email-in-database'

export class FindUserByEmailRepository implements FindUserByEmail {
  constructor (private readonly databaseRepository: FindUserByEmailInDatabase) {}
  async findByEmail (email: string): Promise<User> {
    const user = await this.databaseRepository.find(email)
    if (user) {
      return user
    }
    return null
  }
}
