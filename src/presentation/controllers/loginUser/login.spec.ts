import { HttpRequest, HttpResponse } from '../../helpers/http-protocols'
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
    this.validation.validate(httpRequest.body)
    return null
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
})
