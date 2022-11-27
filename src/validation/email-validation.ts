import { InvalidEmail } from '../presentation/helpers/errors'
import { Validation } from '../presentation/interfaces/validation'

export interface EmailValidator {
  isValid(email: string): Boolean
}

export class EmailValidation implements Validation {
  constructor (private readonly emailvalidator: EmailValidator) {}
  validate (input: any): any {
    const email = input.email
    const valid = this.emailvalidator.isValid(email)
    if (valid === false) {
      return new InvalidEmail()
    }
  }
}
