
export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export class ServerError extends Error {
  constructor (stackError: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stackError
  }
}
