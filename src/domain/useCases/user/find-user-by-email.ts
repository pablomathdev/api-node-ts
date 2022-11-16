import { User } from '../../entitys/user'

export interface FindUserByEmail {
  findByEmail(email: string): Promise<User>
}
