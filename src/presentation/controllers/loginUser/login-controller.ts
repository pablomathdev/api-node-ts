import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'
import { Authentication } from '../../../domain/useCases/user/authentication'
import { HttpResponse, HttpRequest } from '../../helpers/http-protocols'
import { ok, badRequest, Unauthorized, serverError } from '../../helpers/http-responses'

export class LoginController implements Controller {
  constructor (private readonly validation: Validation,
    private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      const { email, password } = httpRequest.body
      const token = await this.authentication.auth(email, password)
      if (token) {
        return ok(token)
      }
      return Unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}
