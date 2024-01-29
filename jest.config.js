module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended/all"],
  maxConcurrency: 1,
  collectCoverage: true,
  collectCoverageFrom: ["services/*/controller/*.js"],
  coverageReporters: ["json", "lcov", "text", "clover"],
};
