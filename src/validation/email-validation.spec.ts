import { Validation } from '../presentation/interfaces/validation'

class EmailValidation implements Validation {
  constructor (private readonly emailvalidator: EmailValidator) {}
  validate (input: any): any {
    const email = input.email
    this.emailvalidator.isValid(email)
  }
}

interface EmailValidator {
  isValid(email: string): boolean
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub {
    isValid (): boolean {
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
  test('should calls EmailValidator with correct values', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isvalidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const email = { email: 'any_email' }

    sut.validate(email)
    expect(isvalidSpy).toHaveBeenCalledWith('any_email')
  })
})
