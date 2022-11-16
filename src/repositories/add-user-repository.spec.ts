import { User } from '../domain/entitys/user'
import { Hasher } from '../domain/useCases/security/Hasher'
import { AddUser } from '../domain/useCases/user/add-user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

class FindUserByEmailRepositoryStub implements FindUserByEmail {
  async findByEmail (email: string): Promise<User> {
    return new Promise(resolve => resolve(null))
  }
}
class HashPasswordStub implements Hasher {
  hash (password: string): string {
    return 'hashed_password'
  }
}

class AddUserRepository implements AddUser {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly hashPassword: Hasher) {}

  async create (user: User): Promise<boolean> {
    const userAccount = await this.findUserByEmail.findByEmail(user.email)
    if (userAccount) {
      return false
    }
    this.hashPassword.hash(user.password)
  }
}
const makeHashPassword = (): Hasher => {
  return new HashPasswordStub()
}

const makeFindUserByEmailRepository = (): FindUserByEmail => {
  return new FindUserByEmailRepositoryStub()
}

interface SutTypes {
  sut: AddUser
  findUserByEmailRepositoryStub: FindUserByEmail
  hashPasswordStub: Hasher
}

const makeSut = (): SutTypes => {
  const hashPasswordStub = makeHashPassword()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new AddUserRepository(findUserByEmailRepositoryStub, hashPasswordStub)
  return { sut, findUserByEmailRepositoryStub, hashPasswordStub }
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
  test('should returns false if findUserByEmail returns a user', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve({
        name: 'any_name',
        email: 'any_email'
      })))
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = await sut.create(user)
    expect(result).toBe(false)
  })
  test('should calls hashPassword with correct password', async () => {
    const { sut, hashPasswordStub } = makeSut()
    const hashSpy = jest.spyOn(hashPasswordStub, 'hash')
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.create(user)
    expect(hashSpy).toHaveBeenCalledWith(user.password)
  })
})
