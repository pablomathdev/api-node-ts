import { MissingParamError } from '../presentation/helpers/errors'
import { HttpRequest } from '../presentation/helpers/http-protocols'
import { Validation } from '../presentation/interfaces/validation'
import { ValidationComposite } from './validation-composite'

const makeRequiredFields = (): Validation => {
  class RequiredFieldsStub implements Validation {
    validate (input: any): any {
      return null
    }
  }
  return new RequiredFieldsStub()
}

type SutTypes = {
  sut: Validation
  requiredFieldsStub: Validation
}

const makeSut = (): SutTypes => {
  const requiredFieldsStub = makeRequiredFields()
  const sut = new ValidationComposite(requiredFieldsStub)
  return { sut, requiredFieldsStub }
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
})
