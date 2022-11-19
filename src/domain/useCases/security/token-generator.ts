
export interface TokenGenerator {
  generate(value: string, expiresIn: number): Promise<string>
}
