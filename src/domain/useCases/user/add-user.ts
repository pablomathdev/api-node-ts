import { User } from '../../entitys/user'

export interface IdUser {
  id: any
}

export interface AddUser {
  create(user: User): Promise<IdUser>

}
