require('dotenv').config();

const npsUtils = require('nps-utils');

const { rimraf, crossEnv, series, concurrent } = npsUtils;

const NODEMON_CMD =
  'nodemon --watch .env --watch dev --delay 5 --icu-data-dir=node_modules/full-icu';

module.exports = {
  scripts: {
    sass: 'sass --watch public/SASS:public/CSS --no-source-map --charset --style=compressed',
    sass_debug: 'sass --watch public/SASS:public/CSS --no-source-map --charset --style=expanded',
    startfront: 'webpack --config ./assets/webpack.config.js',
    start: {
      front: 'webpack --open --config ./assets/webpack.dev.js',
      back: {
        start: {
          description: 'Running on dev environment.',
          script: `${crossEnv(
            'NODE_ENV=development'
          )} nodemon --delay 3 dev/index.bundle.js`
        },
        default: {
          script: concurrent.nps('start.back.watch', 'start.back.start')
        },
        watch: {
          description: 'Webpack watch for change and compile.',
          script: `${crossEnv('NODE_ENV=development')} webpack -w`
        },
        withDebug: {
          script: `${crossEnv(
            'NODE_ENV=development'
          )} DEBUG=express:* nodemon --delay 3 --inspect dev/index.bundle.js`
        },
        debug: {
          description: 'Running on dev environment with debug on.',
          script: concurrent.nps('start.back.watch', 'start.back.withDebug')
        }
      },
      all: concurrent.nps('start.front', 'start.back')
    },
    build: {
      front: 'webpack --config ./assets/webpack.prod.js',
      back: {
        default: series.nps('clean.prod', 'build.back.pack'),
        pack: `${crossEnv('NODE_ENV=production')} webpack-cli`
      },
      all: concurrent.nps('build.front', 'build.back')
    },
    clean: {
      description: 'Clean dist folder.',
      prod: rimraf('dist'),
      dev: rimraf('dev'),
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
    },
    lint : {
      default : "tslint -t stylish --project tsconfig.json src/**/*.ts",
      fix : "tslint -t stylish --project tsconfig.json --fix 'src/**/*.ts'",
    },
  }
};
