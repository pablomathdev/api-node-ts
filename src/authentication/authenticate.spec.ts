import { User } from '../domain/entitys/user'
import { Encrypter } from '../domain/useCases/security/encrypter'
import { HasherCompare } from '../domain/useCases/security/hasherCompare'
import { Authentication } from '../domain/useCases/user/authentication'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

class Authenticate implements Authentication {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly comparePassword: HasherCompare,
    private readonly encrypter: Encrypter) {}

  async auth (email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail.findByEmail(email)
    if (user) {
      await this.comparePassword.compare(password, user.password)
    }
    await this.encrypter.encrypt(user.id)

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
      return new Promise(resolve => resolve(user))
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
const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('token'))
    }
  }
  return new EncrypterStub()
}

const makeSut = (): any => {
  const encrypterStub = makeEncrypter()
  const comparePasswordStub = makeComparePassword()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new Authenticate(findUserByEmailRepositoryStub, comparePasswordStub, encrypterStub)
  return { sut, findUserByEmailRepositoryStub, comparePasswordStub, encrypterStub }
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
  test('should throw if FindUserByEmailRepository throws', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(new Promise((resolve, reject) => {
        reject(new Error())
      }))

    const user = {
      email: 'any_email',
      password: 'hashed_password'
    }

    const result = sut.auth(user.email, user.password)
    await expect(result).rejects.toThrow()
  })
  test('should throw if ComparePassword throws', async () => {
    const { sut, comparePasswordStub } = makeSut()
    jest.spyOn(comparePasswordStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve, reject) => {
        reject(new Error())
      }))

    const user = {
      email: 'any_email',
      password: 'hashed_password'
    }

    const result = sut.auth(user.email, user.password)
    await expect(result).rejects.toThrow()
  })
  test('should call Encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const user = {
      email: 'any_email',
      password: 'hashed_password'
    }

    await sut.auth(user.email, user.password)
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })
})
