import { badRequest } from '../../../helpers/http-responses'
import { HttpRequest, HttpResponse } from '../../../helpers/http-protocols'
import { Controller } from '../../interfaces/controller'
import { Validation } from '../../interfaces/validation'
import { UserRepository } from '../../../domain/interfaces/user-repository'

export class RegisterController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly userRepository: UserRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)
      if (validationError) {
        return badRequest(validationError)
      }
      await this.userRepository.create(httpRequest.body)
    } catch (error) {
      return new Promise(resolve => resolve(null))
    }
  }
}
