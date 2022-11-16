import { IdUser } from './add-user'

export interface FindUserById {
  findById(email: string): Promise<IdUser>
}
