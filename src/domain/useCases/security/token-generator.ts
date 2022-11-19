export type Options = {
  expiresIn: number
  secretKey: string
}

export interface TokenGenerator {
  generate(value: string): Promise<string>
}
