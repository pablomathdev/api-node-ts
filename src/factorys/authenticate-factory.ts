import { Authenticate } from '../authentication/authenticate'

export const authenticateFactory = (): Authenticate => {
  return new Authenticate()
}
