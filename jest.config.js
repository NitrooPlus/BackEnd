module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ["jest-extended/all"],
    maxConcurrency: 1
  };
  