module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  setupFiles: ['<rootDir>/setupFile.js'],
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/__tests__/**/*.js?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).js?(x)'
  ],
  verbose: true
}
