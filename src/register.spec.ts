import { HttpRequest } from './http-protocols'
import { Validation } from './interfaces/validation'
import { RegisterController } from './register-controller'

type SutTypes = {
  sut: RegisterController
  validationStub: Validation

}

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: string): Boolean {
      return true
    }
  }
  return new ValidationCompositeStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new RegisterController(validationStub)
  return { sut, validationStub }
}

describe('Register Controller', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpReq: HttpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(httpReq)
    expect(validateSpy).toBeCalledWith(httpReq.body)
  })
})
