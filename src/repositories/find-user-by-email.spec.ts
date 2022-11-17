import { User } from '../domain/entitys/user'
import { FindUserByEmailInDatabase } from '../domain/useCases/db/find-user-by-email-in-database'
import { FindUserByEmailRepository } from './find-user-by-email'

class DatabaseRepoStub implements FindUserByEmailInDatabase {
  async find (email: string): Promise<User> {
    const userAccount: User = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email'
    }
    return new Promise(resolve => resolve(userAccount))
  }
}

describe('Find User By Email Repository', () => {
  test('should calls database with correct email', async () => {
    const databaseRepositoryStub = new DatabaseRepoStub()
    const sut = new FindUserByEmailRepository(databaseRepositoryStub)
    const findSpy = jest.spyOn(databaseRepositoryStub, 'find')
    await sut.findByEmail('any_email')
    expect(findSpy).toHaveBeenCalledWith('any_email')
  })
  test('should throw if database throws', async () => {
    const databaseRepositoryStub = new DatabaseRepoStub()
    const sut = new FindUserByEmailRepository(databaseRepositoryStub)
    jest.spyOn(databaseRepositoryStub, 'find')
      .mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const result = sut.findByEmail('any_email')
    await expect(result).rejects.toThrow()
  })
  test('should returns user if success', async () => {
    const databaseRepositoryStub = new DatabaseRepoStub()
    const sut = new FindUserByEmailRepository(databaseRepositoryStub)

    const result = await sut.findByEmail('any_email')
    expect(result).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email'
    })
  })
  test('should returns null if database fails', async () => {
    const databaseRepositoryStub = new DatabaseRepoStub()
    const sut = new FindUserByEmailRepository(databaseRepositoryStub)
    jest.spyOn(databaseRepositoryStub, 'find')
      .mockResolvedValueOnce(new Promise(resolve => resolve(null)))

    const result = await sut.findByEmail('any_email')
    expect(result).toEqual(null)
  })
})
