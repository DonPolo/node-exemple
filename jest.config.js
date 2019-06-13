module.exports = {
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
};
