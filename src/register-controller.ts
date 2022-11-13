import { HttpRequest, HttpResponse } from './http-protocols'
import { Controller } from './interfaces/controller'
import { Validation } from './interfaces/validation'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => resolve(null))
  }
}
