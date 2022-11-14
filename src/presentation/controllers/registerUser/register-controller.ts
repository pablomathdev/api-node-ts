import { badRequest, badRequestUserAlreadyExists, serverError } from '../../helpers/http-responses'
import { HttpRequest, HttpResponse } from '../../helpers/http-protocols'
import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'

import { Authentication } from '../../../domain/useCases/user/authentication'
import { UserRepository } from '../../../data/user-repository'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly repository: UserRepository,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const isCreateAccount = await this.repository.execute(httpRequest.body)
      if (!isCreateAccount) {
        return badRequestUserAlreadyExists()
      }
      // if (isCreateAccount) {
      //   const token = await this.authentication.auth(email, password)
      //   if (token) {
      //     return created(token)
      //   }
      // }
    } catch (error) {
      return serverError(error)
    }
  }
}
