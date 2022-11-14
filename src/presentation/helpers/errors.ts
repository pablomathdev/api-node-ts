
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

export class InvalidEmail extends Error {
  constructor () {
    super('Invalid Email')
    this.name = 'Invalid Email'
  }
}
