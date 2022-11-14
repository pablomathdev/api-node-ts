import { MissingParamError } from '../../../helpers/errors'
import { badRequest, serverError } from '../../../helpers/http-responses'
import { HttpRequest } from '../../../helpers/http-protocols'
import { Validation } from '../../interfaces/validation'
import { RegisterController } from './register-controller'
import { UserRepository } from '../../../domain/interfaces/repositories/user-repository'
import { Authentication } from '../../../domain/interfaces/authetication/authentication'

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: string): any {
      return null
    }
  }
  return new ValidationCompositeStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticationStub()
}

const makeUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async create (): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UserRepositoryStub()
}
interface SutTypes {
  sut: RegisterController
  validationStub: Validation
  userRepositoryStub: UserRepository
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const userRepositoryStub = makeUserRepository()
  const sut = new RegisterController(validationStub, userRepositoryStub, authenticationStub)
  return { sut, validationStub, userRepositoryStub, authenticationStub }
}

describe('Register Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(httpReq)
    expect(validateSpy).toHaveBeenCalledWith(httpReq.body)
  })
  test('should return 400 if validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('name'))
    const httpReq: HttpRequest = {
      body: {

        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    expect(httpRes).toEqual(badRequest(new MissingParamError('name')))
  })
  test('should call userRepository with correct values', async () => {
    const { sut, userRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(userRepositoryStub, 'create')
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(httpReq)
    expect(createSpy).toBeCalledWith(httpReq.body)
  })
  test('should throw if userRepository throws', async () => {
    const { sut, userRepositoryStub } = makeSut()
    jest.spyOn(userRepositoryStub, 'create')
      .mockImplementationOnce(async () => { return await new Promise((resolve, reject) => reject(new Error())) })
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httRes = await sut.handle(httpReq)
    expect(httRes).toEqual(serverError(new Error()))
  })
  test('should calls authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(httpReq)
    expect(authSpy).toHaveBeenCalledWith('any_email', 'any_password')
  })
  test('should return access Token if user is authenticated', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth')
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    expect(httpRes).toEqual({ statusCode: 200, accessToken: 'any_token' })
  })
  test('should throw if authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(async () => { return new Promise((resolve, reject) => reject(new Error())) })
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    await expect(httpRes).toEqual(serverError(new Error()))
  })
})
