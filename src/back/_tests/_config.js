module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.html$': 'html-loader-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'html'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  rootDir: '../',
  coverageDirectory: '<rootDir>/_tests/__coverage__',
  setupFilesAfterEnv: ['<rootDir>/_tests/_setup.ts'],
  collectCoverageFrom: [
    '<rootDir>/**/*.*',
    '!<rootDir>/_tests/**',
    '!<rootDir>/server.ts',
    '!<rootDir>/webpack.config.js',
    '!<rootDir>/utils/dbfactory.util.ts',
    '!<rootDir>/utils/nexmo.util.ts',
    '!<rootDir>/utils/message.util.ts',
  ],
  cacheDirectory: '<rootDir>/_tests/cache/',
};
