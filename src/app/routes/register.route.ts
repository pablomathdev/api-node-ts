import express, { Request, Response, Router } from 'express'
import { Authenticate } from '../../authentication/authenticate'
import { UserModel } from '../../implementations/db/mongo/models/user'
import { MongoRepository } from '../../implementations/db/mongo/mongo-repository'

import { BcryptImplementation } from '../../implementations/security/password/bcrypt-implementation'
import { TokenGeneratorImplementation } from '../../implementations/security/token/token-generator-implementation'
import { EmailValidatorImplementation } from '../../implementations/validators/email-validator-implemantation'
import { RegisterController } from '../../presentation/controllers/registerUser/register-controller'
import { HttpRequest } from '../../presentation/helpers/http-protocols'
import { Controller } from '../../presentation/interfaces/controller'
import { AddUserRepository } from '../../repositories/add-user'
import { AddUserTokenRepository } from '../../repositories/add-user-token'
import { FindUserByEmailRepository } from '../../repositories/find-user-by-email'
import { EmailValidation } from '../../validation/email-validation'
import { RequiredFieldsValidation } from '../../validation/required-fields-validation'
import { ValidationComposite } from '../../validation/validation-composite'

const registerFactory = (): RegisterController => {
  const mongoRepository = new MongoRepository(UserModel)
  const requiredFields = new RequiredFieldsValidation(['name', 'email', 'password'])
  const emailvalidatorImplementation = new EmailValidatorImplementation()
  const emailValidation = new EmailValidation(emailvalidatorImplementation)
  const validation = new ValidationComposite([requiredFields, emailValidation])
  const bcryptImplementation = new BcryptImplementation()
  const findUserByEmailRepository = new FindUserByEmailRepository(mongoRepository)
  const tokenRepository = new AddUserTokenRepository(mongoRepository)
  const tokenGeneratorImplementation = new TokenGeneratorImplementation(tokenRepository)

  const addUserRepository = new AddUserRepository(findUserByEmailRepository, bcryptImplementation, mongoRepository)
  const authenticate = new Authenticate(findUserByEmailRepository, bcryptImplementation, tokenGeneratorImplementation)
  return new RegisterController(validation, addUserRepository, authenticate)
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class RequestAndResponse {
  static execute (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body
      }

      const httpResponse = await controller.handle(httpRequest)
      if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({ error: httpResponse.body.message })
      }
    }
  }
}

const app = express()

app.use(express.json())

const registerRoute = Router()
// eslint-disable-next-line @typescript-eslint/no-misused-promises
registerRoute.post('/register', RequestAndResponse.execute(registerFactory()))
