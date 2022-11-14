import { HttpResponse } from './http-protocols'
import { MissingParamError, ServerError } from './errors'

export const badRequest = (paramName: any): HttpResponse => {
  return {
    statusCode: 400,
    body: new MissingParamError(paramName)
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
    accessToken: token
  }
}
