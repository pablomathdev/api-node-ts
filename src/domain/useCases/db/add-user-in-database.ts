import { IdUser } from '../user/add-user'

export interface AddUserInDatabase {
  addUser(input: any): Promise<IdUser>
}
