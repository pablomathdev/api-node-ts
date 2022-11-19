
import { AddUserToken } from '../domain/useCases/token/add-user-token'

interface AddTokenInDatabase {
  add(value: string, token: string): Promise<void>
}

class DatabaseRepository implements AddTokenInDatabase {
  async add (value: string, token: string): Promise<void> {

  }
}

class AddUserTokenRepository implements AddUserToken {
  constructor (private readonly addTokenInDatabase: AddTokenInDatabase) {}
  async addToken (value: string, token: string): Promise<void> {
    await this.addTokenInDatabase.add(value, token)
  }
}

describe('add user token repository', () => {
  test('should database repository with correct values', async () => {
    const databaseRepository = new DatabaseRepository()
    const sut = new AddUserTokenRepository(databaseRepository)
    const addSpy = jest.spyOn(databaseRepository, 'add')
    const values = { user_id: 'user_id', token: 'token' }
    await sut.addToken(values.user_id, values.token)
    expect(addSpy).toHaveBeenCalledWith('user_id', 'token')
  })
  test('should throw if database repository throws', async () => {
    const databaseRepository = new DatabaseRepository()
    const sut = new AddUserTokenRepository(databaseRepository)
    jest.spyOn(databaseRepository, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const values = { user_id: 'user_id', token: 'token' }
    const result = sut.addToken(values.user_id, values.token)
    await expect(result).rejects.toThrow()
  })
})
