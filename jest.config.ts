/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports =  {

export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  setupFiles: ["./src/setupTests.ts"],
  testPathIgnorePatterns : [
    "src/setupTests.ts",
  ],
  coveragePathIgnorePatterns: [
    "src/setupTests.ts"
  ],
};
