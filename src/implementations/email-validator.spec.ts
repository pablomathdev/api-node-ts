import { EmailValidator } from '../validation/email-validation'
import * as emailValidationLib from 'email-validator'
import { EmailValidatorImplementation } from './email-validator-implemantation'

jest.mock('email-validator')

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
  test('should return true if email to valid', () => {
    const sut = makeSut()
    jest.spyOn(emailValidationLib, 'validate')
      .mockReturnValueOnce(true)
    const result = sut.isValid('any_email')
    expect(result).toBe(true)
  })
  test('should return false if email to invalid', () => {
    const sut = makeSut()
    jest.spyOn(emailValidationLib, 'validate')
      .mockReturnValueOnce(false)
    const result = sut.isValid('any_email')
    expect(result).toBe(false)
  })
})
