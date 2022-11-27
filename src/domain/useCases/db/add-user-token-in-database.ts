
export interface AddTokenInDatabase {
  addToken(id: any, token: string): Promise<void>
}
