import { IdUser } from '../user/add-user'

export interface Database {
  add(input: any): Promise<IdUser>
}
