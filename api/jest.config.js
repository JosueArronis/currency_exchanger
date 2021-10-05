// module.exports = {
//   roots: ['<rootDir>/src'],
//   testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },
// };

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'node'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    tsConfig: 'tsconfig.json',
  },
  testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/__tests__/**/*.+(ts|tsx|js)'],
};
