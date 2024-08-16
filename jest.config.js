module.exports = {
  // Other Jest configuration options...
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
    "^@/(.*)$": "/Users/account/Desktop/City-Hotels/ch-fe/src/$1",
    "\\.(svg)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    "\\.svg$": "jest-transform-stub"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["./jest.setup.js"]
};
