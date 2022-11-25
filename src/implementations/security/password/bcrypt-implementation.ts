import { Hasher } from '../../../domain/security/Hasher'
import { HasherCompare } from '../../../domain/security/hasherCompare'
import bcrypt from 'bcrypt'

export class BcryptImplementation implements Hasher, HasherCompare {
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
