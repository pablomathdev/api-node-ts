import { EmailValidator } from '../validation/email-validation'
import * as emailValidationLib from 'email-validator'

jest.mock('email-validator')

class EmailValidatorImplementation implements EmailValidator {
  isValid (email: string): Boolean {
    return emailValidationLib.validate(email)
  }
}

const makeSut = (): EmailValidator => {
  const sut = new EmailValidatorImplementation()
  return sut
}

describe('Email Validator', () => {
  test('should be able to call emailValidator with the correct email', () => {
    const sut = makeSut()
    const validateSpy = jest.spyOn(emailValidationLib, 'validate')
    sut.isValid('any_email')
    expect(validateSpy).toHaveBeenCalledWith('any_email')
  })
})
