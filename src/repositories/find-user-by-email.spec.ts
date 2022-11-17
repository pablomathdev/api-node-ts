
import { User } from '../domain/entitys/user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

interface FindUserByEmailInDatabase {
  find(email: string): Promise<User>
}

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

class FindUserByEmailRepository implements FindUserByEmail {
  constructor (private readonly databaseRepository: FindUserByEmailInDatabase) {}
  async findByEmail (email: string): Promise<User> {
    const user = await this.databaseRepository.find(email)
    if (user) {
      return user
    }
    return null
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
})
