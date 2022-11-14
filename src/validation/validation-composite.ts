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
    this.emailValidation.validate(input.email)
  }
}
