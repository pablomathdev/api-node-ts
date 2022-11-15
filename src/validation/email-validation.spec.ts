import { InvalidEmail } from '../presentation/helpers/errors'
import { Validation } from '../presentation/interfaces/validation'
import { EmailValidation, EmailValidator } from './email-validation'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (email: string): Boolean {
      return null
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: Validation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation(emailValidatorStub)
  return { sut, emailValidatorStub }
}

describe('Email Validation', () => {
  test('should calls EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isvalidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const email = { email: 'any_email' }

    sut.validate(email)
    expect(isvalidSpy).toHaveBeenCalledWith('any_email')
  })
  test('should return error if email to invalid', () => {
    const { sut } = makeSut()

    const email = { email: 'invalid_email' }

    const result = sut.validate(email)
    expect(result).toEqual(new InvalidEmail())
  })
})
