import { User } from '../../entitys/user'

export type IdUser = {
  id: string
}

export interface AddUser {
  create(user: User): Promise<IdUser>

}
