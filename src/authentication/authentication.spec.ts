import { User } from '../domain/entitys/user'
import { Authentication } from '../domain/useCases/user/authentication'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

class Authenticate implements Authentication {
  constructor (private readonly findUserByEmail: FindUserByEmail) {}
  async auth (email: string, password: string): Promise<string> {
    await this.findUserByEmail.findByEmail(email)
    return null
  }
}
const makeFindUserByEmailRepository = (): FindUserByEmail => {
  class FindUserByEmailRepositoryStub implements FindUserByEmail {
    async findByEmail (email: string): Promise<User> {
      return null
    }
  }
  return new FindUserByEmailRepositoryStub()
}

const makeSut = (): any => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new Authenticate(findUserByEmailRepositoryStub)
  return { sut, findUserByEmailRepositoryStub }
}

describe('Authentication', () => {
  test('should call FindUserByEmailRepository with correct email', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    const authSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')

    const userEmail = 'any_email'

    await sut.auth(userEmail)
    expect(authSpy).toHaveBeenCalledWith(userEmail)
  })
})
