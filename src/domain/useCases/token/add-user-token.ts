
export interface AddUserToken {
  addToken(value: string, token: string): Promise<void>
}
