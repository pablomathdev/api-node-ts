import { MissingParamError } from '../../helpers/errors'
import { badRequest, badRequestUserAlreadyExists, serverError, created } from '../../helpers/http-responses'
import { HttpRequest } from '../../helpers/http-protocols'
import { Validation } from '../../interfaces/validation'
import { RegisterController } from './register-controller'
import { Authentication } from '../../../domain/useCases/user/authentication'
import { User } from '../../../domain/entitys/user'
import { UserRepository } from '../../../data/user-repository'

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: object): any {
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

const makeAddUserRepository = (): UserRepository => {
  class UserRepositoryStub implements UserRepository {
    async execute (body: User): Promise<any> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new UserRepositoryStub()
}
interface SutTypes {
  sut: RegisterController
  validationStub: Validation
  repositoryStub: UserRepository
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const repositoryStub = makeAddUserRepository()
  const sut = new RegisterController(validationStub, repositoryStub, authenticationStub)
  return { sut, validationStub, repositoryStub, authenticationStub }
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
  test('should call repository with correct values', async () => {
    const { sut, repositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(repositoryStub, 'execute')
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(httpReq)
    expect(repositorySpy).toHaveBeenCalledWith(httpReq.body)
  })
  test('should return 400 if repository returns a error', async () => {
    const { sut, repositoryStub } = makeSut()
    jest.spyOn(repositoryStub, 'execute')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    expect(httpRes).toEqual(badRequestUserAlreadyExists())
  })
  test('should throw if repository throws', async () => {
    const { sut, repositoryStub } = makeSut()
    jest.spyOn(repositoryStub, 'execute')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    expect(httpRes).toEqual(serverError(new Error()))
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
    const { sut } = makeSut()
    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    expect(httpRes).toEqual(created('any_token'))
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
