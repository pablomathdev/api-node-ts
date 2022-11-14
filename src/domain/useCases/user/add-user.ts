import { User } from '../../entitys/user'

export interface AddUser {
  create(user: User): Promise<boolean>

}
