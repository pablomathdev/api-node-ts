import { User } from '../../entities/user'

export interface FindUserByEmail {
  findByEmail(email: string): Promise<User>
}
