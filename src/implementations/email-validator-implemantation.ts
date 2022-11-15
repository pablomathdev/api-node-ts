import { EmailValidator } from '../validation/email-validation'
import * as emailValidationLib from 'email-validator'

export class EmailValidatorImplementation implements EmailValidator {
  isValid (email: string): Boolean {
    return emailValidationLib.validate(email)
  }
}
