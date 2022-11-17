import { IdUser } from '../user/add-user'

export interface AddUserInDatabase {
  add(input: any): Promise<IdUser>
}
