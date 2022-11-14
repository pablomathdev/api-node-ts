import { MissingParamError } from '../presentation/helpers/errors'
import { Validation } from '../presentation/interfaces/validation'

class RequiredFieldsValidation implements Validation {
  validate (input: any): any {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!input[field]) {
        return new MissingParamError(field)
      }
    }
  }
}

describe('Required Fields Validation', () => {
  test('should return error if name no is provided', () => {
    const sut = new RequiredFieldsValidation()

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
    const sut = new RequiredFieldsValidation()

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
    const sut = new RequiredFieldsValidation()

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