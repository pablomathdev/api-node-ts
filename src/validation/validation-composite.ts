import { Validation } from '../presentation/interfaces/validation'

export class ValidationComposite implements Validation {
  private readonly validations: Validation[] = []
  constructor (
    private readonly requiredFields: Validation
  ) {

  }

  validate (input: any): any {
    this.requiredFields.validate(input)
  }
}
