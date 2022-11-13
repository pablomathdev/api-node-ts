import { HttpRequest, HttpResponse } from './http-protocols'
import { Controller } from './interfaces/controller'
import { Validation } from './interfaces/validation'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const validationError = this.validation.validate(httpRequest.body)
    if (validationError) {
      return {
        statusCode: 400,
        body: new Error()
      }
    }
    return null
  }
}
