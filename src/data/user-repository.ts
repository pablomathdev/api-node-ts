import { User } from '../domain/entitys/user'

export interface UserRepository {
  execute(body: User): Promise<any>
}
