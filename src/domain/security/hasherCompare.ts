export interface HasherCompare {
  compare(value: string, hashedValue: string): Promise<boolean>
}
