import { Authenticate } from '../../authentication/authenticate'
import { MongoRepository } from '../../implementations/db/mongo/mongo-repository'
import { BcryptImplementation } from '../../implementations/security/password/bcrypt-implementation'
import { TokenGeneratorImplementation } from '../../implementations/security/token/token-generator-implementation'
import { RegisterController } from '../controllers/registerUser/register-controller'
import { AddUserTokenRepository } from '../../repositories/add-user-token'
import { FindUserByEmailRepository } from '../../repositories/find-user-by-email'
import { EmailValidatorImplementation } from '../../implementations/validators/email-validator-implemantation'
import { EmailValidation } from '../../validation/email-validation'
import { RequiredFieldsValidation } from '../../validation/required-fields-validation'
import { ValidationComposite } from '../../validation/validation-composite'
import { AddUserRepository } from '../../repositories/add-user'
import { LoginController } from '../controllers/loginUser/login-controller'
import { loginValidationFactory } from './login-validation-factory'

const mongoFactory = (): MongoRepository => {
  return new MongoRepository()
}

export const authenticateFactory = (): Authenticate => {
  const findUserByEmail = new FindUserByEmailRepository(mongoFactory())
  const bcrypt = new BcryptImplementation()
  const addUserTokenRepository = new AddUserTokenRepository(mongoFactory())
  const tokenGenerator = new TokenGeneratorImplementation(addUserTokenRepository)
  return new Authenticate(findUserByEmail, bcrypt, tokenGenerator)
}

export const registerValidation = (): ValidationComposite => {
  const validations = [new RequiredFieldsValidation(['name', 'email', 'password']), new EmailValidation(new EmailValidatorImplementation())]
  return new ValidationComposite(validations)
}

export const registerControllerFactory = (): RegisterController => {
  const findUserByEmail = new FindUserByEmailRepository(mongoFactory())
  const bcrypt = new BcryptImplementation()
  const addUser = new AddUserRepository(findUserByEmail, bcrypt, mongoFactory())
  return new RegisterController(registerValidation(), addUser, authenticateFactory())
}

export const loginControllerFactory = (): LoginController => {
  return new LoginController(loginValidationFactory(), authenticateFactory())
}
