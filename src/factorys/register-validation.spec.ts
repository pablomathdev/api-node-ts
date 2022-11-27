import { EmailValidator, EmailValidation } from '../validation/email-validation'
import { RequiredFieldsValidation } from '../validation/required-fields-validation'
import { ValidationComposite } from '../validation/validation-composite'
import { registerValidationFactory } from './register-validation-factory'

jest.mock('../validation/validation-composite')

function makeEmailValidator (): EmailValidator {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('Register Validation factory ', () => {
  test('should call ValidationComposite with all validations', () => {
    registerValidationFactory()
    const validations = [new RequiredFieldsValidation(['name', 'email', 'password']), new EmailValidation(makeEmailValidator())]
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
