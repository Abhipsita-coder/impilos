/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  preset: "ts-jest",
  "moduleNameMapper": {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  collectCoverageFrom: [
        "src/**/*.{ts,tsx}",
        "!src/**/*.d.ts"
    ],
    coverageThreshold: {
        "global": {
            "branches": 80,
            "functions": 80,
            "lines": 80,
            "statements": 80
        }
    },
    setupFilesAfterEnv:['<rootDir>/setupTests.ts']
};