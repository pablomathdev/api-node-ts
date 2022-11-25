import { TokenGenerator, Options } from '../../../domain/security/token-generator'
import Jwt from 'jsonwebtoken'
import { AddUserToken } from '../../../domain/useCases/token/add-user-token'
export class TokenGeneratorImplementation implements TokenGenerator {
  constructor (private readonly tokenRepository: AddUserToken) {}
  static get options (): Options {
    return {
      expiresIn: 3600000,
      secretKey: 'secret'
    }
  }

  async generate (value: string): Promise<string> {
    const token = await Jwt.sign({ user_id: value },
      TokenGeneratorImplementation.options.secretKey,
      { expiresIn: TokenGeneratorImplementation.options.expiresIn })

    await this.tokenRepository.addToken(value, token)
    return token
  }
}
