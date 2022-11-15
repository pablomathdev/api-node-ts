import { MissingParamError } from '../presentation/helpers/errors'
import { RequiredFieldsValidation } from './required-fields-validation'

const makeSut = (): RequiredFieldsValidation => {
  const requiredFields = ['name', 'email', 'password']
  return new RequiredFieldsValidation(requiredFields)
}

describe('Required Fields Validation', () => {
  test('should return error if name no is provided', () => {
    const sut = makeSut()

    const httpReq = {
      body: {
        email: 'any_email',
        password: 'any_password'
      }
    }
    const result = sut.validate(httpReq.body)
    expect(result).toEqual(new MissingParamError('name'))
  })
  test('should return error if email no is provided', () => {
    const requiredFields = ['name', 'email', 'password']
    const sut = new RequiredFieldsValidation(requiredFields)

    const httpReq = {
      body: {
        name: 'any_name',
        password: 'any_password'
      }
    }
    const result = sut.validate(httpReq.body)
    expect(result).toEqual(new MissingParamError('email'))
  })
  test('should return error if password no is provided', () => {
    const sut = makeSut()
    const httpReq = {
      body: {
        name: 'any_name',
        email: 'any_email'

      }
    }
    const result = sut.validate(httpReq.body)
    expect(result).toEqual(new MissingParamError('password'))
  })
})
