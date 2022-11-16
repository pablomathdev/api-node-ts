
export interface FindUserByEmail {
  findByEmail(email: string): Promise<any>
}
