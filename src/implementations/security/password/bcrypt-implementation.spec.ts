import { Hasher } from '../../../domain/security/Hasher'
import { HasherCompare } from '../../../domain/security/hasherCompare'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => {
  return {
    async hash (): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    },
    async compare (): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
})

class BcryptImplementation implements Hasher, HasherCompare {
  async hash (value: string): Promise<string> {
    const salt = 10
    const hashedPassword = await bcrypt.hash(value, salt)
    return hashedPassword
  }

  async compare (value: string, hashedValue: string): Promise<boolean> {
    const match = await bcrypt.compare(value, hashedValue)
    return match
  }
}

describe('Bcrypt', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptImplementation()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.hash('user_password')
    await sut.compare('user_password', 'hashed_password')
    expect(hashSpy).toHaveBeenCalledWith('user_password', 10)
    expect(compareSpy).toHaveBeenCalledWith('user_password', 'hashed_password')
  })
  test('should returns hashed password if bcrypt hash success', async () => {
    const sut = new BcryptImplementation()

    const result = await sut.hash('user_password')
    expect(result).toBe('hashed_password')
  })
  test('should return true if password matches', async () => {
    const sut = new BcryptImplementation()

    const result = await sut.compare('user_password', 'hashed_password')
    expect(result).toBe(true)
  })
})
