
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json-summary', 'lcov', 'text'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/app/routes/tests/**',
    '!<rootDir>/src/app/config/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/presentation/helpers/http-protocols.ts',
    '!<rootDir>/src/presentation/interfaces/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
