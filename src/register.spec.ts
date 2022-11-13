import { MissingParamError } from './helpers/errors'
import { badRequest } from './helpers/http-responses'
import { HttpRequest } from './http-protocols'
import { Validation } from './interfaces/validation'
import { RegisterController } from './register-controller'

type SutTypes = {
  sut: RegisterController
  validationStub: Validation

}

const makeValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate (input: string): any {
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
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }

    await sut.handle(httpReq)
    expect(validateSpy).toBeCalledWith(httpReq.body)
  })
  test('should return 400 if validation returns a error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpReq: HttpRequest = {
      body: {

        email: 'any_email',
        password: 'any_password'
      }
    }

    const httpRes = await sut.handle(httpReq)
    expect(httpRes).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
