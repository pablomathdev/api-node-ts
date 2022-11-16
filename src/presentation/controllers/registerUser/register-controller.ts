import { badRequest, badRequestUserAlreadyExists, serverError, created } from '../../helpers/http-responses'
import { HttpRequest, HttpResponse } from '../../helpers/http-protocols'
import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'

import { Authentication } from '../../../domain/useCases/user/authentication'

import { AddUser } from '../../../domain/useCases/user/add-user'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addUser: AddUser,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const isCreateAccount = await this.addUser.create(httpRequest.body)
      if (!isCreateAccount) {
        return badRequestUserAlreadyExists()
      }
      if (isCreateAccount) {
        const { email, password } = httpRequest.body
        const token = await this.authentication.auth(email, password)
        if (token) {
          return created(token)
        }
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
