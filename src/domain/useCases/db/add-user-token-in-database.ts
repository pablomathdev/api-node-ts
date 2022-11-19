
export interface AddTokenInDatabase {
  add(value: string, token: string): Promise<void>
}
