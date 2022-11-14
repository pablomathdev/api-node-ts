
import { Validation } from '../presentation/interfaces/validation'

export class ValidationComposite implements Validation {
  constructor (
    private readonly requiredFields: Validation,
    private readonly emailValidation: Validation
  ) {

  }

  validate (input: any): any {
    const missingParam = this.requiredFields.validate(input)
    if (missingParam) {
      return missingParam
    }
    const isValidEmail = this.emailValidation.validate(input.email)
    if (isValidEmail) {
      return isValidEmail
    }
  }
}
