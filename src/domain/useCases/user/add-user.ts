import { User } from '../../entities/user'

export interface IdUser {
  id: any
}

export interface AddUser {
  create(user: User): Promise<IdUser>

}
