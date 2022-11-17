export interface HasherCompare {
  compare(password: string, hashedPassword: string): Promise<boolean>
}
