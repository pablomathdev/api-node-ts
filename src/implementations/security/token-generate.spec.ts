import { TokenGenerator } from '../../domain/useCases/security/token-generator'
import Jwt from 'jsonwebtoken'
class TokenGeneratorImplementation implements TokenGenerator {
  async generate (value: string): Promise<string> {
    await Jwt.sign(value, 'secretkey')
    return null
  }
}

describe('Token Generate', () => {
  test('should calls jsonwebtoken with correct values', async () => {
    const sut = new TokenGeneratorImplementation()
    const signSpy = jest.spyOn(Jwt, 'sign')
    await sut.generate('user_id')
    expect(signSpy).toHaveBeenCalledWith('user_id', 'secretkey')
  })
})
