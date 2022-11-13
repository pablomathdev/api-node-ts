import { badRequest } from '../../../helpers/http-responses'
import { HttpRequest, HttpResponse } from '../../../helpers/http-protocols'
import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
    } catch (error) {
      return null
    }
  }
}
