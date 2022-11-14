import { MissingParamError, InvalidEmail } from '../presentation/helpers/errors'
import { HttpRequest } from '../presentation/helpers/http-protocols'
import { Validation } from '../presentation/interfaces/validation'
import { ValidationComposite } from './validation-composite'
const makeRequiredFields = (): Validation => {
  class RequiredFieldsValidationStub implements Validation {
    validate (input: any): any {
      return null
    }
  }
  return new RequiredFieldsValidationStub()
}

const makeEmailValidation = (): Validation => {
  class EmailValidationStub implements Validation {
    validate (input: any): any {
      return null
    }
  }
  return new EmailValidationStub()
}

type SutTypes = {
  sut: Validation
  requiredFieldsStub: Validation
  emailValidationStub: Validation
}

const makeSut = (): SutTypes => {
  const emailValidationStub = makeEmailValidation()
  const requiredFieldsStub = makeRequiredFields()
  const sut = new ValidationComposite(requiredFieldsStub, emailValidationStub)
  return { sut, requiredFieldsStub, emailValidationStub }
}

describe('Validation Composite', () => {
  test('should calls validationRequiredFields with correct values', () => {
    const { sut, requiredFieldsStub } = makeSut()
    const validateSpy = jest.spyOn(requiredFieldsStub, 'validate')

    const fields: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }
    sut.validate(fields.body)
    expect(validateSpy).toHaveBeenCalledWith(fields.body)
  })
  test('should return missingParamError if validationRequiredFields returns this error ', () => {
    const { sut, requiredFieldsStub } = makeSut()
    jest.spyOn(requiredFieldsStub, 'validate')
      .mockImplementationOnce(() => { return new MissingParamError('any_field') })
    const fields: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }
    const error = sut.validate(fields.body)
    expect(error).toEqual(new MissingParamError('any_field'))
  })
  test('should calls emailValidation with correct email', () => {
    const { sut, emailValidationStub } = makeSut()
    const validateSpy = jest.spyOn(emailValidationStub, 'validate')

    const httpReq: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    }
    sut.validate(httpReq.body)
    expect(validateSpy).toHaveBeenCalledWith(httpReq.body.email)
  })
  test('should return InvalidEmail if emailValidation returns this error ', () => {
    const { sut, emailValidationStub } = makeSut()
    jest.spyOn(emailValidationStub, 'validate')
      .mockImplementationOnce(() => { return new InvalidEmail() })
    const fields: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: 'any_password'
      }
    }
    const error = sut.validate(fields.body.email)
    expect(error).toEqual(new InvalidEmail())
  })
})
