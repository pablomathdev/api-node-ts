import { HttpResponse } from '../helpers/http-protocols'
import { MissingParamError } from './errors'

export const badRequest = (paramName: any): HttpResponse => {
  return {
    statusCode: 400,
    body: new MissingParamError(paramName)
  }
}
