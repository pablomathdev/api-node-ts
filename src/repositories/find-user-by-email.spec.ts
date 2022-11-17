
import { User } from '../domain/entitys/user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

interface FindUserByEmailInDatabase {
  find(email: string): Promise<User>
}

class DatabaseRepoStub implements FindUserByEmailInDatabase {
  async find (email: string): Promise<User> {
    return null
  }
}

class FindUserByEmailRepository implements FindUserByEmail {
  constructor (private readonly databaseRepository: FindUserByEmailInDatabase) {}
  async findByEmail (email: string): Promise<User> {
    await this.databaseRepository.find(email)
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
})
