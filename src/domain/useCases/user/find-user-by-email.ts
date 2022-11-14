import { User } from '../../entitys/user'

export interface FindUserByEmail {
  find(email: string): Promise<User>
}
