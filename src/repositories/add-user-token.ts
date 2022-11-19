import { AddTokenInDatabase } from '../domain/useCases/db/add-user-token-in-database'
import { AddUserToken } from '../domain/useCases/token/add-user-token'

export class AddUserTokenRepository implements AddUserToken {
  constructor (private readonly addTokenInDatabase: AddTokenInDatabase) {}
  async addToken (value: string, token: string): Promise<void> {
    await this.addTokenInDatabase.add(value, token)
  }
}
