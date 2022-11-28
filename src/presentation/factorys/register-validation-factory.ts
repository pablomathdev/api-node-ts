import { EmailValidatorImplementation } from '../../implementations/validators/email-validator-implemantation'
import { EmailValidation } from '../../validation/email-validation'
import { RequiredFieldsValidation } from '../../validation/required-fields-validation'
import { ValidationComposite } from '../../validation/validation-composite'

export const registerValidationFactory = (): ValidationComposite => {
  const validations = [new RequiredFieldsValidation(['name', 'email', 'password']), new EmailValidation(new EmailValidatorImplementation())]
  return new ValidationComposite(validations)
}
