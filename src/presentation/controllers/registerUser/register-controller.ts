import { badRequest, created, serverError } from '../../../helpers/http-responses'
import { HttpRequest, HttpResponse } from '../../../helpers/http-protocols'
import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'
import { UserRepository } from '../../../domain/interfaces/repositories/user-repository'
import { Authentication } from '../../../domain/interfaces/authetication/authentication'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly userRepository: UserRepository,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }

      const isCreateAccount = await this.userRepository.create(httpRequest.body)
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
