const nextJest = require("next/jest")

const createJestConfig = nextJest()

const ignoredModules = ["next"].join("|")

const customJestConfig = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [`/node_modules/(?!${ignoredModules})`],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "@testing-library/react",
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
}

module.exports = createJestConfig(customJestConfig)
