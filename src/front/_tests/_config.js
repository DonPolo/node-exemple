module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'html'],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  rootDir: '../',
  coverageDirectory: '<rootDir>/_tests/__coverage__',
  setupFilesAfterEnv: ['<rootDir>/_tests/_setup.ts'],
  collectCoverageFrom: [
    '<rootDir>/**/*.tsx',
    '<rootDir>/**/*.ts',
    '!<rootDir>/_tests/**',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.html$': 'html-loader-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/_tests/_fileTransformer.js',
  },
};
