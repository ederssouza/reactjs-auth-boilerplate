module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/public/'],
  collectCoverageFrom: [
    'src/components/**/*.ts(x)?',
    'src/contexts/**/*.ts(x)?',
    'src/hooks/**/*.ts(x)?',
    'src/pages/**/*.ts(x)?',
    'src/providers/**/*.ts(x)?',
    '!src/**/index.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  coverageThreshold: {
    global: {
      statements: -10,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
}
