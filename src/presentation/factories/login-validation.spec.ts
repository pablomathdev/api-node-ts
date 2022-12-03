import { EmailValidator, EmailValidation } from '../../validation/email-validation'
import { RequiredFieldsValidation } from '../../validation/required-fields-validation'
import { ValidationComposite } from '../../validation/validation-composite'
import { loginValidationFactory } from './login-validation-factory'

jest.mock('../../validation/validation-composite')

function makeEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('Login Validation factory ', () => {
  test('should call ValidationComposite with all validations', () => {
    loginValidationFactory()
    const validations = [new RequiredFieldsValidation(['email', 'password']), new EmailValidation(makeEmailValidator())]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
