import { Validation } from '../presentation/interfaces/validation'
import { MissingParamError } from '../presentation/helpers/errors'

export class RequiredFieldsValidation implements Validation {
  constructor (private readonly requiredFields: string[]) {

  }

  validate (input: any): any {
    for (const field of this.requiredFields) {
      if (!input[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
