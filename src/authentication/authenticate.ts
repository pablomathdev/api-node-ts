import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'
import { HasherCompare } from '../domain/security/hasherCompare'
import { Authentication } from '../domain/useCases/user/authentication'
import { TokenGenerator } from '../domain/security/token-generator'
export class Authenticate implements Authentication {
  constructor (
    private readonly findUserByEmail: FindUserByEmail,
    private readonly comparePassword: HasherCompare,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth (email: string, password: string): Promise<string> {
    const user = await this.findUserByEmail.findByEmail(email)
    if (user) {
      const isValidPassword = await this.comparePassword.compare(
        password,
        user.password
      )
      if (isValidPassword) {
        const token = await this.tokenGenerator.generate(user.id)

        if (token) {
          return token
        }
      }
    }

    return null
  }
}
