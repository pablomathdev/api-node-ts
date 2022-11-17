import { User } from '../domain/entitys/user'
import { HasherCompare } from '../domain/useCases/security/hasherCompare'
import { Authentication } from '../domain/useCases/user/authentication'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

class Authenticate implements Authentication {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly comparePassword: HasherCompare) {}

  async auth (email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail.findByEmail(email)
    if (user) {
      await this.comparePassword.compare(password, user.password)
    }

    return null
  }
}
const makeFindUserByEmailRepository = (): FindUserByEmail => {
  class FindUserByEmailRepositoryStub implements FindUserByEmail {
    async findByEmail (email: string): Promise<User> {
      const user = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password'
      }
      return user
    }
  }
  return new FindUserByEmailRepositoryStub()
}

const makeComparePassword = (): HasherCompare => {
  class ComparePasswordStub implements HasherCompare {
    async compare (value: string, hashedValue: string): Promise<boolean> {
      return true
    }
  }
  return new ComparePasswordStub()
}

const makeSut = (): any => {
  const comparePasswordStub = makeComparePassword()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new Authenticate(findUserByEmailRepositoryStub, comparePasswordStub)
  return { sut, findUserByEmailRepositoryStub, comparePasswordStub }
}

describe('Authentication', () => {
  test('should call FindUserByEmailRepository with correct email', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    const authSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')

    const user = {
      email: 'any_email',
      password: 'hashed_password'
    }

    await sut.auth(user.email, user.password)
    expect(authSpy).toHaveBeenCalledWith(user.email)
  })
  test('should call ComparePassword  with corrects passwords', async () => {
    const { sut, comparePasswordStub } = makeSut()
    const authSpy = jest.spyOn(comparePasswordStub, 'compare')

    const user = {
      email: 'any_email',
      password: 'any_password'
    }

    await sut.auth(user.email, user.password)
    expect(authSpy).toHaveBeenCalledWith(user.password, 'hashed_password')
  })
})
