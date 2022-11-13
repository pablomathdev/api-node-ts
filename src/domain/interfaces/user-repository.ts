import { User } from '../entitys/user'

export interface UserRepository {
  create(user: User): Promise<boolean>

}
