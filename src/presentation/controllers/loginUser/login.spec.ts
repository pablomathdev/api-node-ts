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

class LoginController implements Controller {
  constructor (private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      return null
    } catch {

    }
  }
}

const makeSut = (): any => {
  const validationStub = makeValidation()
  const sut = new LoginController(validationStub)
  return { sut, validationStub }
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
})
