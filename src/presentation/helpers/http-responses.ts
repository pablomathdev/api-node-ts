import { HttpResponse } from './http-protocols'
import { ServerError, EmailAlreadyExistsError, InvalidEmail } from './errors'

export const badRequest = (error: any): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const badRequestInvalidEmail = (): HttpResponse => {
  return {
    statusCode: 400,
    body: new InvalidEmail()
  }
}
export const badRequestUserAlreadyExists = (): HttpResponse => {
  return {
    statusCode: 400,
    body: new EmailAlreadyExistsError()
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export const created = (token: string): HttpResponse => {
  return {
    statusCode: 201,
    body: token
  }
}
