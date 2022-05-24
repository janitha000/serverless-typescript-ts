module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@functions/(.*)$': '<rootDir>/src/lib/functions/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
  },

  testEnvironment: "node",
  testMatch: [
    "**/test-jest/**/*.test.ts"
  ],
};