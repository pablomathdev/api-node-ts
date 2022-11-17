import { User } from '../../entitys/user'

export interface FindUserByEmailInDatabase {
  find(email: string): Promise<User>
}
