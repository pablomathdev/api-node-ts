import { TokenGeneratorImplementation } from './token-generator-implementation'
import { AddUserToken } from '../../domain/useCases/token/add-user-token'
import Jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => {
  return {
    async sign (): Promise<string> {
      return new Promise(resolve => resolve('token'))
    }

  }
})

const makeTokenRepository = (): AddUserToken => {
  class TokenRepositoryStub implements AddUserToken {
    async addToken (value: string): Promise<void> {
      return null
    }
  }
  return new TokenRepositoryStub()
}

const makeSut = (): any => {
  const tokenRepositoryStub = makeTokenRepository()
  const sut = new TokenGeneratorImplementation(tokenRepositoryStub)
  return {
    sut, tokenRepositoryStub
  }
}

describe('Token Generate', () => {
  test('should calls jsonwebtoken with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(Jwt, 'sign')
    await sut.generate('user_id')
    expect(signSpy).toHaveBeenCalledWith({ user_id: 'user_id' }, 'secret', { expiresIn: 3600000 })
  })
  test('should throw if jsonwebtoken throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(Jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const result = sut.generate('user_id')
    await expect(result).rejects.toThrow()
  })
  test('should calls tokenRepository with correct value', async () => {
    const { sut, tokenRepositoryStub } = makeSut()
    const addTokenSpy = jest.spyOn(tokenRepositoryStub, 'addToken')
    await sut.generate('user_id')
    expect(addTokenSpy).toHaveBeenCalledWith('user_id', 'token')
  })
  test('should return token if jsonwebtoken success', async () => {
    const { sut } = makeSut()

    const result = await sut.generate('user_id')
    expect(result).toBe('token')
  })
})
