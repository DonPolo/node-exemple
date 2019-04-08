require('dotenv').config();

const npsUtils = require('nps-utils');

const { rimraf, crossEnv, series, concurrent } = npsUtils;

module.exports = {
  scripts: {
    build: {
      description: 'Building in production environment.',
      default: series.nps('clean', 'build.build'),
      build: `${crossEnv('NODE_ENV=production')} webpack`
    },
    clean: {
      description: 'Clean dist folder.',
      default: rimraf('dist')
    },
    default: {
      description: 'Start project with pm2 on production.',
      script: `${crossEnv(
        'NODE_ENV=production'
      )} pm2 start processes.json dist/index.bundle.js`
    },
    stop: {
      description: 'Stop project with pm2 on production.',
      script: `${crossEnv(
        'NODE_ENV=production'
      )} pm2 stop processes.json dist/index.bundle.js`
    },
    restart: {
      description: 'Restart project with pm2 on production.',
      script: `${crossEnv(
        'NODE_ENV=production'
      )} pm2 restart processes.json dist/index.bundle.js`
    },
    doc: {
      description: 'Documenting the api.',
      default: 'apidoc -i src'
    },
    dev: {
      start: {
        description: 'Running on dev environment.',
        script: `${crossEnv(
          'NODE_ENV=development'
        )} nodemon --delay 3 dist/index.bundle.js`
      },
      default: {
        script: concurrent.nps('dev.watch', 'dev.start')
      },
      watch: {
        description: 'Webpack watch for change and compile.',
        script: `${crossEnv('NODE_ENV=development')} webpack -w`
      },
      withDebug: {
        script: `${crossEnv(
          'NODE_ENV=development'
        )} DEBUG=express:* nodemon --delay 3 --inspect dist/index.bundle.js`
      },
      debug: {
        description: 'Running on dev environment with debug on.',
        script: concurrent.nps('dev.watch', 'dev.withDebug')
      }
    },
    lint: {
      default: 'eslint src',
      fix: 'eslint --fix src'
    },
    lintStaged: 'lint-staged',
    test: {
      default: `${crossEnv(
        'NODE_ENV=test'
      )} mocha $(find __tests__ -name *.test.js) --colors --require babel-core/register`,
      watch: series.nps('test -w'),
      cover: `${crossEnv(
        'NODE_ENV=test'
      )} istanbul cover _mocha $(find __tests__ -name *.test.js) --require babel-core/register --colors --bail --recursive '__tests__/**/*.test.js'`,
      checkCover: series('nps test.cover', 'istanbul check-coverage')
    },
    cover: {
      description: 'Open the coverage on browser.',
      default: 'open coverage/lcov-report/*.html'
    },
    reportCoverage: {
      description: 'Send report to coveralls.',
      default: 'coveralls < ./coverage/lcov.info'
    },
    validate: {
      description: 'Validate code by linting, type-checking.',
      default: series.nps('lint')
    }
  }
};
