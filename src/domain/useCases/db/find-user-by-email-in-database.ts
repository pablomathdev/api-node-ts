import { User } from '../../entities/user'

export interface FindUserByEmailInDatabase {
  find(email: string): Promise<User>
}
