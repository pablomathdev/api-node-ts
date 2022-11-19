import { User } from '../domain/entitys/user'
import { TokenGenerator } from '../domain/useCases/security/token-generator'
import { HasherCompare } from '../domain/useCases/security/hasherCompare'
import { Authentication } from '../domain/useCases/user/authentication'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

class Authenticate implements Authentication {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly comparePassword: HasherCompare,
    private readonly tokenGenerator: TokenGenerator) {}

  async auth (email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail.findByEmail(email)
    if (user) {
      const isValidPassword = await this.comparePassword.compare(password, user.password)
      if (isValidPassword) {
        const token = await this.tokenGenerator.generate(user.id, 0)

        if (token) {
          return token
        }
      }
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
const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (value: string): Promise<string> {
      return new Promise(resolve => resolve('token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeSut = (): any => {
  const tokenGeneratorStub = makeTokenGenerator()
  const comparePasswordStub = makeComparePassword()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new Authenticate(findUserByEmailRepositoryStub, comparePasswordStub, tokenGeneratorStub)
  return { sut, findUserByEmailRepositoryStub, comparePasswordStub, tokenGeneratorStub }
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
  test('should call TokenGenerator with correct value', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const encryptSpy = jest.spyOn(tokenGeneratorStub, 'generate')

    const user = {
      email: 'any_email',
      password: 'hashed_password'
    }

    await sut.auth(user.email, user.password)
    expect(encryptSpy).toHaveBeenCalledWith('any_id', 0)
  })
  test('should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate')
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
  test('should return token if TokenGenerator sucess', async () => {
    const { sut } = makeSut()

    const user = {
      email: 'any_email',
      password: 'hashed_password'
    }

    const result = await sut.auth(user.email, user.password)
    expect(result).toBe('token')
  })
})
