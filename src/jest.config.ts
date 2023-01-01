import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '@middleware/(.*)': '<rootDir>/middleware/$1',
    '@common/(.*)': '<rootDir>/common/$1',
    '@routes/*/(.*)': '<rootDir>/routes/$1',
    '@controllers/(.*)': '<rootDir>/controllers/$1',
    '@models/(.*)': '<rootDir>/models/$1'
  }
};
export default config;
