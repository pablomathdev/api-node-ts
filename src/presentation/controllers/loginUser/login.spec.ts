import { Authentication } from '../../../domain/useCases/user/authentication'
import { MissingParamError } from '../../helpers/errors'
import { HttpRequest, HttpResponse } from '../../helpers/http-protocols'
import { badRequest } from '../../helpers/http-responses'
import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: object): any {
      return null
    }
  }
  return new ValidationCompositeStub()
}
const makeAuthenticate = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('token'))
    }
  }
  return new AuthenticationStub()
}

class LoginController implements Controller {
  constructor (private readonly validation: Validation,
    private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      const { email, password } = httpRequest.body
      await this.authentication.auth(email, password)
      return null
    } catch {

    }
  }
}

const makeSut = (): any => {
  const authenticationStub = makeAuthenticate()
  const validationStub = makeValidation()
  const sut = new LoginController(validationStub, authenticationStub)
  return { sut, validationStub, authenticationStub }
}

describe('Login User', () => {
  test('should calls validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
  test('should returns 400 if validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('email'))
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result).toEqual(badRequest(new MissingParamError('email')))
  })
  test('should calls authenticate with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authenticationSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(authenticationSpy).toHaveBeenCalledWith('any_email', 'any_password')
  })
})
