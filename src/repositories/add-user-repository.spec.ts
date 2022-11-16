import { User } from '../domain/entitys/user'
import { AddUser } from '../domain/useCases/user/add-user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

class FindUserByEmailRepositoryStub implements FindUserByEmail {
  async findByEmail (email: string): Promise<User> {
    return new Promise(resolve => resolve({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }))
  }
}

class AddUserRepository implements AddUser {
  constructor (private readonly findUserByEmail: FindUserByEmail) {}

  async create (user: User): Promise<boolean> {
    await this.findUserByEmail.findByEmail(user.email)
    return null
  }
}

const makeFindUserByEmailRepository = (): FindUserByEmail => {
  return new FindUserByEmailRepositoryStub()
}

interface SutTypes {
  sut: AddUser
  findUserByEmailRepositoryStub: FindUserByEmail
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new AddUserRepository(findUserByEmailRepositoryStub)
  return { sut, findUserByEmailRepositoryStub }
}

describe('Add User Repository', () => {
  test('should calls findUserByEmail with correct email', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    const findByEmailSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.create(user)
    expect(findByEmailSpy).toHaveBeenCalledWith('any_email')
  })
})
