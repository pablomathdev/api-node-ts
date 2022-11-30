
export class MissingParamError extends Error {
  constructor (paramName: string) {
    super()
    this.name = 'Missing Param Error'
    this.message = `Missing param: ${paramName}`
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
    super()
    this.name = 'Invalid Email'
    this.message = 'Invalid Email'
  }
}
export class EmailAlreadyExistsError extends Error {
  constructor () {
    super()
    this.name = 'EmailAlreadyExistsError'
    this.message = 'Email already exists'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super()
    this.name = 'UnauthorizedError'
    this.message = 'Unauthorized'
  }
}
