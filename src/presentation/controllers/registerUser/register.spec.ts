import { MissingParamError } from '../../../helpers/errors'
import { badRequest } from '../../../helpers/http-responses'
import { HttpRequest } from '../../../helpers/http-protocols'
import { Validation } from '../../interfaces/validation'
import { RegisterController } from './register-controller'
import { UserRepository } from '../../../domain/interfaces/user-repository'

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: string): any {
      return null
    }
  }
  return new ValidationCompositeStub()
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
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const userRepositoryStub = makeUserRepository()
  const sut = new RegisterController(validationStub, userRepositoryStub)
  return { sut, validationStub, userRepositoryStub }
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
})
