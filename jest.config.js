/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  // collectCoverageFrom: ["./src/**/*.{ts,js}", "!src/**/*.d.ts"],
  collectCoverageFrom: ["src/**/*.{ts,js}", "!src/**/*.d.ts"],
  coveragePathIgnorePatterns: ["src/database", "src/server"]
};