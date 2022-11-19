import { TokenGenerator } from '../../domain/useCases/security/token-generator'
import Jwt from 'jsonwebtoken'
class TokenGeneratorImplementation implements TokenGenerator {
  static get options (): any {
    return {
      expiresIn: 3600000,
      secretKey: 'secret'
    }
  }

  async generate (value: string): Promise<string> {
    await Jwt.sign({ user_id: value },
      TokenGeneratorImplementation.options.secretKey,
      { expiresIn: TokenGeneratorImplementation.options.expiresIn })
    return null
  }
}

describe('Token Generate', () => {
  test('should calls jsonwebtoken with correct values', async () => {
    const sut = new TokenGeneratorImplementation()
    const signSpy = jest.spyOn(Jwt, 'sign')
    await sut.generate('user_id')
    expect(signSpy).toHaveBeenCalledWith({ user_id: 'user_id' }, 'secret', { expiresIn: 3600000 })
  })
  test('should throw if jsonwebtoken throws', async () => {
    const sut = new TokenGeneratorImplementation()
    jest.spyOn(Jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const result = sut.generate('user_id')
    await expect(result).rejects.toThrow()
  })
})
