
export interface AddTokenInDatabase {
  addToken(id: string, token: string): Promise<void>
}
