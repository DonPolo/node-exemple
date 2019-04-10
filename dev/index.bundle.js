module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/config/i18n.ts":
/*!****************************!*\
  !*** ./src/config/i18n.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
const i18next_node_fs_backend_1 = __importDefault(__webpack_require__(/*! i18next-node-fs-backend */ "i18next-node-fs-backend"));
const i18next_express_middleware_1 = __importDefault(__webpack_require__(/*! i18next-express-middleware */ "i18next-express-middleware"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const isDev = "development" === 'development';
i18next_1.default.use(i18next_node_fs_backend_1.default).init({
    lng: 'fr',
    fallbackLng: 'fr',
    preload: ['fr'],
    saveMissing: true,
    debug: isDev,
    interpolation: {
        format: (value, format /* , lng */) => {
            if (format === 'capitalize')
                return value.charAt(0).toUpperCase() + value.slice(1);
            if (value instanceof Date)
                return moment_1.default(value).format(format);
            return value;
        },
    },
    backend: {
        // path where resources get loaded from
        loadPath: 'locales/{{lng}}/{{ns}}.json',
        // path to post missing resources
        addPath: 'locales/{{lng}}/{{ns}}.missing.json',
        // jsonIndent to use when storing json files
        jsonIndent: 2,
    },
});
exports.middleware = i18next_express_middleware_1.default.handle(i18next_1.default, {});


/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config({ debug: true });
const isDev = "development" === 'development';
const defaultConfig = {
    PORT: process.env.PORT || 3000,
    DEBUG: process.env.DEBUG || false,
    ECL: {
        url: process.env.ECL_URL || 'http://localhost',
    },
    DB_LOGGING: isDev,
    DB: {
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'database',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql',
        options: { encrypt: true },
        operatorsAliases: false,
    },
    TWILIO: {
        accountId: process.env.TWILIO_ACCOUNT_ID || 'twilio_account',
        authToken: process.env.TWILIO_AUTH_TOKEN || 'auth_token',
    },
    PLIVO: {
        accountId: process.env.PLIVO_ACCOUNT_ID || 'plivo_account',
        authToken: process.env.PLIVO_AUTH_TOKEN || 'auth_token',
    },
    NEXMO: {
        apiKey: process.env.NEXMO_API_KEY || 'nexmo_api_key',
        apiSecret: process.env.NEXMO_API_SECRET || 'nexmo_api_secret',
        applicationId: process.env.NEXMO_APP_ID || 'nexmo_app_id',
        privateKey: process.env.NEXMO_PRIVATE_KEY || 'nexmo_private_key',
    },
    DIALOG_FLOW: {
        projectId: process.env.DIALOG_FLOW_PROJECT_ID || 'agent',
        environment: process.env.DIALOG_FLOW_ENVIRONMENT || 'draft',
        languageCode: process.env.DIALOG_FLOW_LANGUAGE_CODE || 'en',
        username: process.env.DIALOG_FLOW_USERNAME || null,
        password: process.env.DIALOG_FLOW_PASSWORD || null,
        consoleService: process.env.DIALOG_FLOW_CONSOLE_SERVICE || 'console',
        consoleServiceId: process.env.DIALOG_FLOW_CONSOLE_SERVICE_ID || '6910',
        consoleUserId: process.env.DIALOG_FLOW_CONSOLE_USER_ID || '0DHSENJP9Z',
        consoleUserType: process.env.DIALOG_FLOW_USER_TYPE || 'userId',
        intent: {
            contact: process.env.DIALOG_FLOW_INTENT_CONTACT,
            relaisColis: process.env.DIALOG_FLOW_INTENT_RELAIS_COLIS,
            schedule: process.env.DIALOG_FLOW_INTENT_SCHEDULE,
            services: process.env.DIALOG_FLOW_INTENT_SERVICES,
            infos: process.env.DIALOG_FLOW_INTENT_INFOS,
            globalRequest: process.env.DIALOG_FLOW_INTENT_GLOBAL_REQUEST,
            globalRequestDetails: process.env.DIALOG_FLOW_INTENT_GLOBAL_REQUEST_DETAILS,
            searchUserByMail: process.env.DIALOG_FLOW_INTENT_SEARCH_BY_MAIL,
            needRegistration: process.env.DIALOG_FLOW_INTENT_NEED_REGISTRATION,
            registration: process.env.DIALOG_FLOW_INTENT_REGISTRATION,
            registerLastName: process.env.DIALOG_FLOW_INTENT_REGISTER_LAST_NAME,
            registerGivenName: process.env.DIALOG_FLOW_INTENT_REGISTER_GIVEN_NAME,
            registerSiteGroup: process.env.DIALOG_FLOW_INTENT_REGISTER_SITE_GROUP,
            fallback: process.env.DIALOG_FLOW_INTENT_FALLBACK,
        },
        context: {
            askUserMail: process.env.DIALOG_FLOW_CONTEXT_USER_ASK_MAIL,
            needRegistration: process.env.DIALOG_FLOW_CONTEXT_USER_NEED_REGISTRATION,
            userRegistration: process.env.DIALOG_FLOW_CONTEXT_USER_REGISTRATION,
            userRegisterGivenName: process.env.DIALOG_FLOW_CONTEXT_USER_REGISTER_GIVEN_NAME,
            userRegisterSiteGroup: process.env.DIALOG_FLOW_CONTEXT_USER_REGISTER_SITE_GROUP,
            userRequestDetails: process.env.DIALOG_FLOW_CONTEXT_USER_GLOBAL_REQUEST_DETAILS,
        },
    },
    SLACK: {
        apiToken: process.env.SLACK_API_TOKEN || 'slack_token',
    },
};
exports.default = defaultConfig;


/***/ }),

/***/ "./src/config/logger.ts":
/*!******************************!*\
  !*** ./src/config/logger.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(__webpack_require__(/*! winston */ "winston"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const _1 = __importDefault(__webpack_require__(/*! . */ "./src/config/index.ts"));
const isDev = "development" === 'development';
const prodFormatError = (error) => error.message;
const devFormatError = (error) => `${error.message}\n\n${error.stack}\n`;
const formatError = (error) => isDev ? devFormatError(error) : prodFormatError(error);
const formatter = (info) => {
    let msg;
    let meta;
    if (info.message instanceof Error)
        msg = formatError(info.message);
    else {
        msg = info.message;
        if (info.meta)
            meta =
                info.meta instanceof Error
                    ? formatError(info.meta)
                    : JSON.stringify(info.meta, null, 2);
    }
    msg = meta ? `${msg} ${meta}` : msg;
    return `${moment_1.default().format('D/MM/YYYY HH:mm:ss')} ${info.level} ${msg}`;
};
const logger = winston_1.default.createLogger({
    level: isDev || _1.default.DEBUG ? 'debug' : 'info',
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.printf(info => formatter(info))),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;


/***/ }),

/***/ "./src/config/middlewares.ts":
/*!***********************************!*\
  !*** ./src/config/middlewares.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// @flow
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const compression_1 = __importDefault(__webpack_require__(/*! compression */ "compression"));
const method_override_1 = __importDefault(__webpack_require__(/*! method-override */ "method-override"));
const helmet_1 = __importDefault(__webpack_require__(/*! helmet */ "helmet"));
exports.default = (app) => {
    app.use(compression_1.default());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(helmet_1.default());
    // app.use(expressStatusMonitor());
    app.use(method_override_1.default());
    /* app.use(i18n);
    if (isDev && !isTest) {
      app.use(morgan('dev'));
      expressWinston.requestWhitelist.push('body');
      expressWinston.responseWhitelist.push('body');
      app.use(
        expressWinston.logger({
          winstonInstance: logger,
          meta: true,
          msg:
            'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
          colorStatus: true
        })
      );
    }*/
};


/***/ }),

/***/ "./src/controllers/medias.controller.ts":
/*!**********************************************!*\
  !*** ./src/controllers/medias.controller.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(__webpack_require__(/*! twilio */ "twilio"));
const plivo_1 = __importDefault(__webpack_require__(/*! plivo */ "plivo"));
const nexmo_util_1 = __importDefault(__webpack_require__(/*! ../utils/medias/nexmo.util */ "./src/utils/medias/nexmo.util.ts"));
const http_status_1 = __importDefault(__webpack_require__(/*! http-status */ "http-status"));
const apierror_util_1 = __importDefault(__webpack_require__(/*! ../utils/error/apierror.util */ "./src/utils/error/apierror.util.ts"));
const handlerequest_util_1 = __importDefault(__webpack_require__(/*! ../utils/handlerequest.util */ "./src/utils/handlerequest.util.ts"));
__webpack_require__(/*! ../config/i18n */ "./src/config/i18n.ts");
const { MessagingResponse } = twilio_1.default.twiml;
async function twilioWebHook(req, res, next) {
    try {
        if (req.body.From && req.body.Body && req.body.To) {
            const telFrom = req.body.From;
            const query = req.body.Body;
            const telTo = req.body.To;
            const response = await handlerequest_util_1.default(query);
            if (response) {
                // Answer with Twilio
                const twiml = new MessagingResponse();
                // twilio(response, telFrom, telTo);
                twiml.message(response);
                res.writeHead(http_status_1.default.OK, { 'Content-Type': 'text/xml' });
                return res.end(twiml.toString());
            }
            return res.sendStatus(http_status_1.default.OK);
        }
        return next(new apierror_util_1.default("Missing 'From' or 'Body' param in body", http_status_1.default.BAD_REQUEST));
    }
    catch (err) {
        err.status = http_status_1.default.INTERNAL_SERVER_ERROR;
        return next(err);
    }
}
exports.twilioWebHook = twilioWebHook;
async function plivoWebHook(req, res, next) {
    try {
        if (req.body.From && req.body.Body && req.body.To) {
            const telFrom = req.body.From;
            const query = req.body.Text;
            const telTo = req.body.To;
            const response = await handlerequest_util_1.default(query);
            if (response) {
                // Answer with Plivo
                const r = plivo_1.default.Response();
                r.addMessage(response, { src: telTo, dst: telFrom });
                res.writeHead(http_status_1.default.OK, { 'Content-Type': 'text/xml' });
                return res.end(r.toXML());
            }
            return res.sendStatus(http_status_1.default.OK);
        }
        return next(new apierror_util_1.default("Missing 'From' or 'Body' param in body", http_status_1.default.BAD_REQUEST));
    }
    catch (err) {
        err.status = http_status_1.default.INTERNAL_SERVER_ERROR;
        return next(err);
    }
}
exports.plivoWebHook = plivoWebHook;
async function nexmoWebHook(req, res, next) {
    try {
        if (req.body.From && req.body.Body && req.body.To) {
            const telFrom = req.body.msisdn;
            const query = req.body.text;
            const telTo = req.body.to;
            const response = await handlerequest_util_1.default(query);
            if (response) {
                // Answer with Plivo
                nexmo_util_1.default(response, telTo, telFrom);
                res.writeHead(http_status_1.default.OK, { 'Content-Type': 'text/xml' });
                return res.end();
            }
            return res.sendStatus(http_status_1.default.OK);
        }
        return next(new apierror_util_1.default("Missing 'From' or 'Body' param in body", http_status_1.default.BAD_REQUEST));
    }
    catch (err) {
        err.status = http_status_1.default.INTERNAL_SERVER_ERROR;
        return next(err);
    }
}
exports.nexmoWebHook = nexmoWebHook;


/***/ }),

/***/ "./src/controllers/test.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/test.controller.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlerequest_util_1 = __importDefault(__webpack_require__(/*! ../utils/handlerequest.util */ "./src/utils/handlerequest.util.ts"));
const http_status_1 = __importDefault(__webpack_require__(/*! http-status */ "http-status"));
const apierror_util_1 = __importDefault(__webpack_require__(/*! ../utils/error/apierror.util */ "./src/utils/error/apierror.util.ts"));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const logger_1 = __importDefault(__webpack_require__(/*! ../config/logger */ "./src/config/logger.ts"));
function defaultpage(req, res, next) {
    res.writeHead(http_status_1.default.OK, { 'Content-Type': 'text/html' });
    const page = fs_1.default.readFileSync('C:/Users/Visiteur/Documents/Lifee/lifee/templates/test.html');
    return res.end(page);
}
exports.defaultpage = defaultpage;
async function question(req, res, next) {
    try {
        if (req.query.ask) {
            const query = req.query.ask;
            const response = await handlerequest_util_1.default(query);
            logger_1.default.info(`Response : ${response}`);
            if (response) {
                res.writeHead(http_status_1.default.OK, {
                    'Content-Type': 'text/plain; charset=utf-8',
                });
                return res.end(response);
            }
            return res.sendStatus(http_status_1.default.OK);
        }
        return next(new apierror_util_1.default("Missing 'From' or 'Body' param in body", http_status_1.default.BAD_REQUEST));
    }
    catch (err) {
        err.status = http_status_1.default.INTERNAL_SERVER_ERROR;
        return next(err);
    }
}
exports.question = question;


/***/ }),

/***/ "./src/models/BaseCompteUtilisateur.model.ts":
/*!***************************************************!*\
  !*** ./src/models/BaseCompteUtilisateur.model.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseCompteUtilisateur_1;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let BaseCompteUtilisateur = BaseCompteUtilisateur_1 = class BaseCompteUtilisateur extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        field: 'Id',
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], BaseCompteUtilisateur.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], BaseCompteUtilisateur.prototype, "Login", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => BaseCompteUtilisateur_1),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseCompteUtilisateur.prototype, "IdCreatedUser", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], BaseCompteUtilisateur.prototype, "CreatedDate", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => BaseCompteUtilisateur_1),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseCompteUtilisateur.prototype, "IdUpdatedUser", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseCompteUtilisateur.prototype, "UpdatedDate", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseCompteUtilisateur.prototype, "DeletedDate", void 0);
BaseCompteUtilisateur = BaseCompteUtilisateur_1 = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'CompteUtilisateur',
        modelName: 'CompteUtilisateur',
    })
], BaseCompteUtilisateur);
exports.default = BaseCompteUtilisateur;


/***/ }),

/***/ "./src/models/BaseModel.model.ts":
/*!***************************************!*\
  !*** ./src/models/BaseModel.model.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const BaseCompteUtilisateur_model_1 = __importDefault(__webpack_require__(/*! ./BaseCompteUtilisateur.model */ "./src/models/BaseCompteUtilisateur.model.ts"));
class BaseModel extends sequelize_typescript_1.Model {
}
__decorate([
    sequelize_typescript_1.Column({
        field: 'Id',
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], BaseModel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => BaseCompteUtilisateur_model_1.default),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "IdCreatedUser", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], BaseModel.prototype, "CreatedDate", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => BaseCompteUtilisateur_model_1.default),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "IdUpdatedUser", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "UpdatedDate", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], BaseModel.prototype, "DeletedDate", void 0);
exports.default = BaseModel;


/***/ }),

/***/ "./src/models/Filiale.model.ts":
/*!*************************************!*\
  !*** ./src/models/Filiale.model.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Filiale = class Filiale extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        field: 'Id',
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Filiale.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Filiale.prototype, "Nom", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Filiale.prototype, "NumeroCompte", void 0);
Filiale = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'Filiale',
        modelName: 'Filiale',
    })
], Filiale);
exports.default = Filiale;


/***/ }),

/***/ "./src/models/Site.model.ts":
/*!**********************************!*\
  !*** ./src/models/Site.model.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Site_1;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const BaseModel_model_1 = __importDefault(__webpack_require__(/*! ./BaseModel.model */ "./src/models/BaseModel.model.ts"));
const SiteOrService_model_1 = __importDefault(__webpack_require__(/*! ./SiteOrService.model */ "./src/models/SiteOrService.model.ts"));
const model_util_1 = __webpack_require__(/*! ../utils/model.util */ "./src/utils/model.util.ts");
const Filiale_model_1 = __importDefault(__webpack_require__(/*! ./Filiale.model */ "./src/models/Filiale.model.ts"));
let Site = Site_1 = class Site extends BaseModel_model_1.default {
    static checkCode(siteCode) {
        return siteCode.length === 4;
    }
    static async getFiliale(siteCode) {
        const queryRes = await SiteOrService_model_1.default.findOne({
            attributes: [],
            include: [
                {
                    model: Site_1,
                    attributes: [],
                    required: true,
                },
                {
                    model: Filiale_model_1.default,
                    attributes: [model_util_1.field('Nom')],
                },
            ],
            where: model_util_1.fields({
                Code: siteCode,
            }),
        });
        return queryRes ? queryRes.Filiale.Nom : null;
    }
    static async getNomSite(siteCode) {
        const queryRes = await SiteOrService_model_1.default.findOne({
            attributes: [model_util_1.field('Libelle')],
            include: [
                {
                    model: Site_1,
                    attributes: [],
                    required: true,
                }
            ],
            where: model_util_1.fields({
                Code: siteCode,
            }),
        });
        return queryRes ? queryRes.Libelle : null;
    }
};
__decorate([
    sequelize_typescript_1.ForeignKey(() => SiteOrService_model_1.default),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Site.prototype, "IdSiteOrService", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => SiteOrService_model_1.default),
    __metadata("design:type", SiteOrService_model_1.default)
], Site.prototype, "SiteOrService", void 0);
Site = Site_1 = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'Site',
        modelName: 'Site',
    })
], Site);
exports.default = Site;


/***/ }),

/***/ "./src/models/SiteOrService.model.ts":
/*!*******************************************!*\
  !*** ./src/models/SiteOrService.model.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const Filiale_model_1 = __importDefault(__webpack_require__(/*! ./Filiale.model */ "./src/models/Filiale.model.ts"));
const Site_model_1 = __importDefault(__webpack_require__(/*! ./Site.model */ "./src/models/Site.model.ts"));
const BaseModel_model_1 = __importDefault(__webpack_require__(/*! ./BaseModel.model */ "./src/models/BaseModel.model.ts"));
let SiteOrService = class SiteOrService extends BaseModel_model_1.default {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], SiteOrService.prototype, "Code", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], SiteOrService.prototype, "Libelle", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Filiale_model_1.default),
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.Sequelize.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], SiteOrService.prototype, "IdFiliale", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Filiale_model_1.default),
    __metadata("design:type", Filiale_model_1.default)
], SiteOrService.prototype, "Filiale", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => Site_model_1.default),
    __metadata("design:type", Site_model_1.default)
], SiteOrService.prototype, "Site", void 0);
SiteOrService = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'SiteOrService',
        modelName: 'SiteOrService',
    })
], SiteOrService);
exports.default = SiteOrService;


/***/ }),

/***/ "./src/models/sequelize.ts":
/*!*********************************!*\
  !*** ./src/models/sequelize.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const logger_1 = __importDefault(__webpack_require__(/*! ../config/logger */ "./src/config/logger.ts"));
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
const Filiale_model_1 = __importDefault(__webpack_require__(/*! ./Filiale.model */ "./src/models/Filiale.model.ts"));
const Site_model_1 = __importDefault(__webpack_require__(/*! ./Site.model */ "./src/models/Site.model.ts"));
const SiteOrService_model_1 = __importDefault(__webpack_require__(/*! ./SiteOrService.model */ "./src/models/SiteOrService.model.ts"));
const options = config_1.default.DB;
// Add it in DB options only when false, do not put true
if (!config_1.default.DB_LOGGING)
    options.logging = false;
else
    logger_1.default.debug('Sequelize log enabled');
logger_1.default.debug('Sequelize config', options);
const sequelize = new sequelize_typescript_1.Sequelize(options);
sequelize.addModels([Filiale_model_1.default, Site_model_1.default, SiteOrService_model_1.default]);
exports.default = sequelize;


/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const http_status_1 = __importDefault(__webpack_require__(/*! http-status */ "http-status"));
const medias_routes_1 = __importDefault(__webpack_require__(/*! ./medias.routes */ "./src/routes/medias.routes.ts"));
const test_routes_1 = __importDefault(__webpack_require__(/*! ./test.routes */ "./src/routes/test.routes.ts"));
const apierror_util_1 = __importDefault(__webpack_require__(/*! ../utils/error/apierror.util */ "./src/utils/error/apierror.util.ts"));
// import logErrorService from '../util/log.util';
const routes = express_1.default.Router();
routes.use('/medias', medias_routes_1.default);
routes.use('/tests', test_routes_1.default);
routes.all('*', (_req, _res, _next) => _next(new apierror_util_1.default('Not Found!', http_status_1.default.NOT_FOUND)));
// routes.use(logErrorService);
exports.default = routes;
//


/***/ }),

/***/ "./src/routes/medias.routes.ts":
/*!*************************************!*\
  !*** ./src/routes/medias.routes.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const MediasController = __importStar(__webpack_require__(/*! ../controllers/medias.controller */ "./src/controllers/medias.controller.ts"));
const routes = express_1.default.Router();
routes.post('/twilio' /*, authBasicEnv*/, MediasController.twilioWebHook);
routes.post('/nexmo' /*, authBasicEnv*/, MediasController.nexmoWebHook);
routes.post('/plivo' /*, authBasicEnv*/, MediasController.plivoWebHook);
exports.default = routes;


/***/ }),

/***/ "./src/routes/test.routes.ts":
/*!***********************************!*\
  !*** ./src/routes/test.routes.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const TestController = __importStar(__webpack_require__(/*! ../controllers/test.controller */ "./src/controllers/test.controller.ts"));
const routes = express_1.default.Router();
routes.get('/' /*, authBasicEnv*/, TestController.defaultpage);
routes.get('/question' /*, authBasicEnv*/, TestController.question);
exports.default = routes;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const http_status_1 = __importDefault(__webpack_require__(/*! http-status */ "http-status"));
const config_1 = __importDefault(__webpack_require__(/*! ./config */ "./src/config/index.ts"));
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const logger_1 = __importDefault(__webpack_require__(/*! ./config/logger */ "./src/config/logger.ts"));
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./src/routes/index.ts"));
const middlewares_1 = __importDefault(__webpack_require__(/*! ./config/middlewares */ "./src/config/middlewares.ts"));
__webpack_require__(/*! ./models/sequelize */ "./src/models/sequelize.ts");
const app = express_1.default();
// Wrap all the middlewares with the server
middlewares_1.default(app);
app.use('/api', routes_1.default);
app.get('/', (req, res) => res.sendStatus(http_status_1.default.OK));
// We need this to make sure we don't run a second instance
if (!module.parent) {
    app.listen(config_1.default.PORT, (err) => {
        if (err) {
            logger_1.default.info(chalk_1.default.red('Cannot run!'));
        }
        else {
            logger_1.default.info(chalk_1.default.green.bold(`
        Yep this is working 🍺
        App listen on port: ${config_1.default.PORT} 🍕
        Env: ${"development" || 'none'} 🦄
      `));
        }
    });
}
exports.default = app;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/utils/dialogflow.util.ts":
/*!**************************************!*\
  !*** ./src/utils/dialogflow.util.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
const dialogflow_1 = __importDefault(__webpack_require__(/*! dialogflow */ "dialogflow"));
const uuid_1 = __importDefault(__webpack_require__(/*! uuid */ "uuid"));
const logger_1 = __importDefault(__webpack_require__(/*! ../config/logger */ "./src/config/logger.ts"));
const dialogflow = dialogflow_1.default.v2beta1;
async function default_1(query, lang = 'fr-FR') {
    try {
        const sessionId = uuid_1.default.v4();
        // Create a new session
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath(config_1.default.DIALOG_FLOW.projectId, sessionId);
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: query,
                    // The language used by the client (en-US)
                    languageCode: lang,
                },
            },
        };
        logger_1.default.info('Send request');
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        logger_1.default.info('Detected intent');
        const result = responses[0].queryResult;
        if (result.intent) {
            logger_1.default.info(`  Intent: ${result.intent.displayName}`);
            return result;
        }
        logger_1.default.info(`  No intent matched.`);
        return null;
    }
    catch (err) {
        return null;
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/utils/error/apierror.util.ts":
/*!******************************************!*\
  !*** ./src/utils/error/apierror.util.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(__webpack_require__(/*! http-status */ "http-status"));
/**
 * Class representing an API error.
 *
 * @extends ExtendableError
 */
class APIError extends Error {
    /**
     * Creates an API error.
     *
     * @param {String} message - Error message.
     * @param {Number} status - HTTP status code of error.
     */
    constructor(message, status = http_status_1.default.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
    }
}
exports.default = APIError;


/***/ }),

/***/ "./src/utils/fulfill.util.ts":
/*!***********************************!*\
  !*** ./src/utils/fulfill.util.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(__webpack_require__(/*! ../config/logger */ "./src/config/logger.ts"));
const Site_model_1 = __importDefault(__webpack_require__(/*! ../models/Site.model */ "./src/models/Site.model.ts"));
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
async function getByCode(parameter, func) {
    const possibleCodes = parameter.split(' ');
    let res = null;
    await possibleCodes.reduce(async (previous, code) => {
        logger_1.default.info(` Code : ${code}`);
        await previous;
        if (!res && Site_model_1.default.checkCode(code)) {
            res = await func(code);
            logger_1.default.info(` Res : ${res}`);
        }
    }, Promise.resolve());
    return res;
}
async function nomFilialeByCode(parameters) {
    const param = parameters.fields.site_code.stringValue;
    const nomFiliale = await getByCode(param, (code) => Site_model_1.default.getFiliale(code));
    logger_1.default.info(` Filiale : ${nomFiliale}`);
    let res = '';
    if (nomFiliale) {
        res = i18next_1.default.t('intent.filiale.success', { filiale: nomFiliale });
    }
    else {
        res = i18next_1.default.t('intent.filiale.not-found');
    }
    return res;
}
async function nomSiteByCode(parameters) {
    const param = parameters.fields.site_code.stringValue;
    const nomSite = await getByCode(param, (code) => Site_model_1.default.getNomSite(code));
    let res = '';
    if (nomSite) {
        res = i18next_1.default.t('intent.site.success', { site: nomSite });
    }
    else {
        res = i18next_1.default.t('intent.site.not-found');
    }
    return res;
}
async function handle(intentName, parameters) {
    switch (intentName) {
        case 'filiale':
            return await nomFilialeByCode(parameters);
        case 'nom_site':
            return await nomSiteByCode(parameters);
        default:
            return null;
    }
}
exports.default = handle;


/***/ }),

/***/ "./src/utils/handlerequest.util.ts":
/*!*****************************************!*\
  !*** ./src/utils/handlerequest.util.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dialogflow_util_1 = __importDefault(__webpack_require__(/*! ./dialogflow.util */ "./src/utils/dialogflow.util.ts"));
const fulfill_util_1 = __importDefault(__webpack_require__(/*! ./fulfill.util */ "./src/utils/fulfill.util.ts"));
const logger_1 = __importDefault(__webpack_require__(/*! ../config/logger */ "./src/config/logger.ts"));
async function handleRequest(query, num = '') {
    const result = await dialogflow_util_1.default(query);
    // TODO change lang depending num
    let response;
    if (!result || result.intent.isFallback) {
        response = "Je n'ai pas bien saisi";
    }
    else {
        const intent = result.intent;
        const parameters = result.parameters;
        response = await fulfill_util_1.default(intent.displayName, parameters);
        if (!response) {
            response = result.fulfillmentText;
        }
    }
    logger_1.default.info(`  Response fulfilled: ${response}`);
    return response;
}
exports.default = handleRequest;


/***/ }),

/***/ "./src/utils/medias/nexmo.util.ts":
/*!****************************************!*\
  !*** ./src/utils/medias/nexmo.util.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexmo_1 = __importDefault(__webpack_require__(/*! nexmo */ "nexmo"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
async function sendTextMessage(msg, telTo, telFrom) {
    const nexm = new nexmo_1.default({
        apiKey: config_1.default.NEXMO.apiKey,
        apiSecret: config_1.default.NEXMO.apiSecret,
        applicationId: config_1.default.NEXMO.applicationId,
    });
    nexm.message.sendSms(telFrom, telTo, msg);
}
exports.default = sendTextMessage;


/***/ }),

/***/ "./src/utils/model.util.ts":
/*!*********************************!*\
  !*** ./src/utils/model.util.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
/**
 * Ensure given key belongs to T
 */
function field(key) {
    return key;
}
exports.field = field;
/**
 * Ensure keys of given object belongs to T
 */
function fields(obj) {
    return obj;
}
exports.fields = fields;
/**
 * Ensure given object is part of T
 */
function partial(obj) {
    return obj;
}
exports.partial = partial;
/**
 * Format column name from join tables using sql server format
 */
exports.getFieldForMssql = (table, column) => `[${table}].[${column}]`;
/**
 * Format directly column name from join tables for sequelize attributes options using sql server format
 */
exports.getFieldForAttribute = (fieldPath, targetField, alias, castAs) => {
    const formattedField = sequelize_typescript_1.Sequelize.literal(exports.getFieldForMssql(fieldPath.join('->'), targetField));
    if (castAs)
        return [sequelize_typescript_1.Sequelize.cast(formattedField, castAs), alias || targetField];
    return [formattedField, alias || targetField];
};
/**
 * Format where condition with like operator and force case and accent insensitive collation
 */
exports.searchInsensitive = (fieldPath, targetField, value) => sequelize_typescript_1.Sequelize.where(sequelize_typescript_1.Sequelize.literal(`${exports.getFieldForMssql(fieldPath.join('->'), targetField)} COLLATE French_CI_AI`), 'like', `%${value}%`);
/**
 * Format directly column name from join tables for sequelize group options
 * Workaround since column name is wrong (. separator instead of ->) when putting all models in group params like in order property
 */
exports.getFieldForGroup = (fieldPath, targetField, castAs) => {
    const col = sequelize_typescript_1.Sequelize.col(`${fieldPath.join('->')}.${targetField}`);
    if (castAs)
        return sequelize_typescript_1.Sequelize.cast(col, castAs);
    return col;
};


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "dialogflow":
/*!*****************************!*\
  !*** external "dialogflow" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dialogflow");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "http-status":
/*!******************************!*\
  !*** external "http-status" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next");

/***/ }),

/***/ "i18next-express-middleware":
/*!*********************************************!*\
  !*** external "i18next-express-middleware" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next-express-middleware");

/***/ }),

/***/ "i18next-node-fs-backend":
/*!******************************************!*\
  !*** external "i18next-node-fs-backend" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next-node-fs-backend");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "nexmo":
/*!************************!*\
  !*** external "nexmo" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nexmo");

/***/ }),

/***/ "plivo":
/*!************************!*\
  !*** external "plivo" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("plivo");

/***/ }),

/***/ "sequelize-typescript":
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize-typescript");

/***/ }),

/***/ "twilio":
/*!*************************!*\
  !*** external "twilio" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXG5vZGVfbW9kdWxlc1xcd2VicGFja1xcYnVpbGRpblxcbW9kdWxlLmpzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpMThuLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXGNvbmZpZ1xcbG9nZ2VyLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxtaWRkbGV3YXJlcy50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXGNvbnRyb2xsZXJzXFxtZWRpYXMuY29udHJvbGxlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXGNvbnRyb2xsZXJzXFx0ZXN0LmNvbnRyb2xsZXIudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxtb2RlbHNcXEJhc2VDb21wdGVVdGlsaXNhdGV1ci5tb2RlbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXG1vZGVsc1xcQmFzZU1vZGVsLm1vZGVsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcbW9kZWxzXFxGaWxpYWxlLm1vZGVsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcbW9kZWxzXFxTaXRlLm1vZGVsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcbW9kZWxzXFxTaXRlT3JTZXJ2aWNlLm1vZGVsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcbW9kZWxzXFxzZXF1ZWxpemUudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxyb3V0ZXNcXGluZGV4LnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xccm91dGVzXFxtZWRpYXMucm91dGVzLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xccm91dGVzXFx0ZXN0LnJvdXRlcy50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHNlcnZlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxkaWFsb2dmbG93LnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcZXJyb3JcXGFwaWVycm9yLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcZnVsZmlsbC51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGhhbmRsZXJlcXVlc3QudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxtZWRpYXNcXG5leG1vLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcbW9kZWwudXRpbC50cyIsImV4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsImV4dGVybmFsIFwiY2hhbGtcIiIsImV4dGVybmFsIFwiY29tcHJlc3Npb25cIiIsImV4dGVybmFsIFwiZGlhbG9nZmxvd1wiIiwiZXh0ZXJuYWwgXCJkb3RlbnZcIiIsImV4dGVybmFsIFwiZXhwcmVzc1wiIiwiZXh0ZXJuYWwgXCJmc1wiIiwiZXh0ZXJuYWwgXCJoZWxtZXRcIiIsImV4dGVybmFsIFwiaHR0cC1zdGF0dXNcIiIsImV4dGVybmFsIFwiaTE4bmV4dFwiIiwiZXh0ZXJuYWwgXCJpMThuZXh0LWV4cHJlc3MtbWlkZGxld2FyZVwiIiwiZXh0ZXJuYWwgXCJpMThuZXh0LW5vZGUtZnMtYmFja2VuZFwiIiwiZXh0ZXJuYWwgXCJtZXRob2Qtb3ZlcnJpZGVcIiIsImV4dGVybmFsIFwibW9tZW50XCIiLCJleHRlcm5hbCBcIm5leG1vXCIiLCJleHRlcm5hbCBcInBsaXZvXCIiLCJleHRlcm5hbCBcInNlcXVlbGl6ZS10eXBlc2NyaXB0XCIiLCJleHRlcm5hbCBcInR3aWxpb1wiIiwiZXh0ZXJuYWwgXCJ1dWlkXCIiLCJleHRlcm5hbCBcIndpbnN0b25cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMx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Q0FBQztJQUNwRSxJQUFJLE1BQU07UUFBRSxPQUFPLGdDQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDN0VGLHdDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLDRDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLGlEOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG9DIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NlcnZlci50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCBpMThuIGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0IGkxOG5leHRCYWNrZW5kIGZyb20gJ2kxOG5leHQtbm9kZS1mcy1iYWNrZW5kJztcbmltcG9ydCBpMThuZXh0TWlkZGxld2FyZSBmcm9tICdpMThuZXh0LWV4cHJlc3MtbWlkZGxld2FyZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmkxOG4udXNlKGkxOG5leHRCYWNrZW5kKS5pbml0KHtcbiAgbG5nOiAnZnInLFxuICBmYWxsYmFja0xuZzogJ2ZyJyxcbiAgcHJlbG9hZDogWydmciddLFxuICBzYXZlTWlzc2luZzogdHJ1ZSxcbiAgZGVidWc6IGlzRGV2LFxuICBpbnRlcnBvbGF0aW9uOiB7XG4gICAgZm9ybWF0OiAodmFsdWUsIGZvcm1hdCAvKiAsIGxuZyAqLykgPT4ge1xuICAgICAgaWYgKGZvcm1hdCA9PT0gJ2NhcGl0YWxpemUnKVxuICAgICAgICByZXR1cm4gdmFsdWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gIH0sXG4gIGJhY2tlbmQ6IHtcbiAgICAvLyBwYXRoIHdoZXJlIHJlc291cmNlcyBnZXQgbG9hZGVkIGZyb21cbiAgICBsb2FkUGF0aDogJ2xvY2FsZXMve3tsbmd9fS97e25zfX0uanNvbicsXG4gICAgLy8gcGF0aCB0byBwb3N0IG1pc3NpbmcgcmVzb3VyY2VzXG4gICAgYWRkUGF0aDogJ2xvY2FsZXMve3tsbmd9fS97e25zfX0ubWlzc2luZy5qc29uJyxcbiAgICAvLyBqc29uSW5kZW50IHRvIHVzZSB3aGVuIHN0b3JpbmcganNvbiBmaWxlc1xuICAgIGpzb25JbmRlbnQ6IDIsXG4gIH0sXG59KTtcblxuZXhwb3J0IGNvbnN0IG1pZGRsZXdhcmUgPSBpMThuZXh0TWlkZGxld2FyZS5oYW5kbGUoaTE4biwge30pO1xuIiwiaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuXG5kb3RlbnYuY29uZmlnKHsgZGVidWc6IHRydWUgfSk7XG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5jb25zdCBkZWZhdWx0Q29uZmlnID0ge1xuICBQT1JUOiBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDAsXG4gIERFQlVHOiBwcm9jZXNzLmVudi5ERUJVRyB8fCBmYWxzZSxcbiAgRUNMOiB7XG4gICAgdXJsOiBwcm9jZXNzLmVudi5FQ0xfVVJMIHx8ICdodHRwOi8vbG9jYWxob3N0JyxcbiAgfSxcbiAgREJfTE9HR0lORzogaXNEZXYsXG4gIERCOiB7XG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LkRCX1VTRVJOQU1FIHx8ICdhZG1pbicsXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEIHx8ICdwYXNzd29yZCcsXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX0RBVEFCQVNFIHx8ICdkYXRhYmFzZScsXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCAnbG9jYWxob3N0JyxcbiAgICBkaWFsZWN0OiBwcm9jZXNzLmVudi5EQl9ESUFMRUNUIHx8ICdteXNxbCcsXG4gICAgb3B0aW9uczogeyBlbmNyeXB0OiB0cnVlIH0sXG4gICAgb3BlcmF0b3JzQWxpYXNlczogZmFsc2UsXG4gIH0sXG5cbiAgVFdJTElPOiB7XG4gICAgYWNjb3VudElkOiBwcm9jZXNzLmVudi5UV0lMSU9fQUNDT1VOVF9JRCB8fCAndHdpbGlvX2FjY291bnQnLFxuICAgIGF1dGhUb2tlbjogcHJvY2Vzcy5lbnYuVFdJTElPX0FVVEhfVE9LRU4gfHwgJ2F1dGhfdG9rZW4nLFxuICB9LFxuICBQTElWTzoge1xuICAgIGFjY291bnRJZDogcHJvY2Vzcy5lbnYuUExJVk9fQUNDT1VOVF9JRCB8fCAncGxpdm9fYWNjb3VudCcsXG4gICAgYXV0aFRva2VuOiBwcm9jZXNzLmVudi5QTElWT19BVVRIX1RPS0VOIHx8ICdhdXRoX3Rva2VuJyxcbiAgfSxcbiAgTkVYTU86IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52Lk5FWE1PX0FQSV9LRVkgfHwgJ25leG1vX2FwaV9rZXknLFxuICAgIGFwaVNlY3JldDogcHJvY2Vzcy5lbnYuTkVYTU9fQVBJX1NFQ1JFVCB8fCAnbmV4bW9fYXBpX3NlY3JldCcsXG4gICAgYXBwbGljYXRpb25JZDogcHJvY2Vzcy5lbnYuTkVYTU9fQVBQX0lEIHx8ICduZXhtb19hcHBfaWQnLFxuICAgIHByaXZhdGVLZXk6IHByb2Nlc3MuZW52Lk5FWE1PX1BSSVZBVEVfS0VZIHx8ICduZXhtb19wcml2YXRlX2tleScsXG4gIH0sXG4gIERJQUxPR19GTE9XOiB7XG4gICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19QUk9KRUNUX0lEIHx8ICdhZ2VudCcsXG4gICAgZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0VOVklST05NRU5UIHx8ICdkcmFmdCcsXG4gICAgbGFuZ3VhZ2VDb2RlOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19MQU5HVUFHRV9DT0RFIHx8ICdlbicsXG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX1VTRVJOQU1FIHx8IG51bGwsXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX1BBU1NXT1JEIHx8IG51bGwsXG4gICAgY29uc29sZVNlcnZpY2U6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlNPTEVfU0VSVklDRSB8fCAnY29uc29sZScsXG4gICAgY29uc29sZVNlcnZpY2VJZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfQ09OU09MRV9TRVJWSUNFX0lEIHx8ICc2OTEwJyxcbiAgICBjb25zb2xlVXNlcklkOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19DT05TT0xFX1VTRVJfSUQgfHwgJzBESFNFTkpQOVonLFxuICAgIGNvbnNvbGVVc2VyVHlwZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfVVNFUl9UWVBFIHx8ICd1c2VySWQnLFxuICAgIGludGVudDoge1xuICAgICAgY29udGFjdDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX0NPTlRBQ1QsXG4gICAgICByZWxhaXNDb2xpczogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX1JFTEFJU19DT0xJUyxcbiAgICAgIHNjaGVkdWxlOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19JTlRFTlRfU0NIRURVTEUsXG4gICAgICBzZXJ2aWNlczogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX1NFUlZJQ0VTLFxuICAgICAgaW5mb3M6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0lOVEVOVF9JTkZPUyxcbiAgICAgIGdsb2JhbFJlcXVlc3Q6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0lOVEVOVF9HTE9CQUxfUkVRVUVTVCxcbiAgICAgIGdsb2JhbFJlcXVlc3REZXRhaWxzOlxuICAgICAgICBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19JTlRFTlRfR0xPQkFMX1JFUVVFU1RfREVUQUlMUyxcbiAgICAgIHNlYXJjaFVzZXJCeU1haWw6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0lOVEVOVF9TRUFSQ0hfQllfTUFJTCxcbiAgICAgIG5lZWRSZWdpc3RyYXRpb246IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0lOVEVOVF9ORUVEX1JFR0lTVFJBVElPTixcbiAgICAgIHJlZ2lzdHJhdGlvbjogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX1JFR0lTVFJBVElPTixcbiAgICAgIHJlZ2lzdGVyTGFzdE5hbWU6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0lOVEVOVF9SRUdJU1RFUl9MQVNUX05BTUUsXG4gICAgICByZWdpc3RlckdpdmVuTmFtZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX1JFR0lTVEVSX0dJVkVOX05BTUUsXG4gICAgICByZWdpc3RlclNpdGVHcm91cDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX1JFR0lTVEVSX1NJVEVfR1JPVVAsXG4gICAgICBmYWxsYmFjazogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfSU5URU5UX0ZBTExCQUNLLFxuICAgIH0sXG4gICAgY29udGV4dDoge1xuICAgICAgYXNrVXNlck1haWw6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlRFWFRfVVNFUl9BU0tfTUFJTCxcbiAgICAgIG5lZWRSZWdpc3RyYXRpb246IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlRFWFRfVVNFUl9ORUVEX1JFR0lTVFJBVElPTixcbiAgICAgIHVzZXJSZWdpc3RyYXRpb246IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlRFWFRfVVNFUl9SRUdJU1RSQVRJT04sXG4gICAgICB1c2VyUmVnaXN0ZXJHaXZlbk5hbWU6XG4gICAgICAgIHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlRFWFRfVVNFUl9SRUdJU1RFUl9HSVZFTl9OQU1FLFxuICAgICAgdXNlclJlZ2lzdGVyU2l0ZUdyb3VwOlxuICAgICAgICBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19DT05URVhUX1VTRVJfUkVHSVNURVJfU0lURV9HUk9VUCxcbiAgICAgIHVzZXJSZXF1ZXN0RGV0YWlsczpcbiAgICAgICAgcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfQ09OVEVYVF9VU0VSX0dMT0JBTF9SRVFVRVNUX0RFVEFJTFMsXG4gICAgfSxcbiAgfSxcbiAgU0xBQ0s6IHtcbiAgICBhcGlUb2tlbjogcHJvY2Vzcy5lbnYuU0xBQ0tfQVBJX1RPS0VOIHx8ICdzbGFja190b2tlbicsXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0Q29uZmlnO1xuIiwiaW1wb3J0IHdpbnN0b24gZnJvbSAnd2luc3Rvbic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCBjb25maWcgZnJvbSAnLic7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmNvbnN0IHByb2RGb3JtYXRFcnJvciA9IChlcnJvcjogRXJyb3IpID0+IGVycm9yLm1lc3NhZ2U7XG5jb25zdCBkZXZGb3JtYXRFcnJvciA9IChlcnJvcjogRXJyb3IpID0+IGAke2Vycm9yLm1lc3NhZ2V9XFxuXFxuJHtlcnJvci5zdGFja31cXG5gO1xuXG5jb25zdCBmb3JtYXRFcnJvciA9IChlcnJvcjogRXJyb3IpID0+XG4gIGlzRGV2ID8gZGV2Rm9ybWF0RXJyb3IoZXJyb3IpIDogcHJvZEZvcm1hdEVycm9yKGVycm9yKTtcblxuY29uc3QgZm9ybWF0dGVyID0gKGluZm86IGFueSkgPT4ge1xuICBsZXQgbXNnO1xuICBsZXQgbWV0YTtcbiAgaWYgKGluZm8ubWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSBtc2cgPSBmb3JtYXRFcnJvcihpbmZvLm1lc3NhZ2UpO1xuICBlbHNlIHtcbiAgICBtc2cgPSBpbmZvLm1lc3NhZ2U7XG4gICAgaWYgKGluZm8ubWV0YSlcbiAgICAgIG1ldGEgPVxuICAgICAgICBpbmZvLm1ldGEgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgID8gZm9ybWF0RXJyb3IoaW5mby5tZXRhKVxuICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoaW5mby5tZXRhLCBudWxsLCAyKTtcbiAgfVxuICBtc2cgPSBtZXRhID8gYCR7bXNnfSAke21ldGF9YCA6IG1zZztcbiAgcmV0dXJuIGAke21vbWVudCgpLmZvcm1hdCgnRC9NTS9ZWVlZIEhIOm1tOnNzJyl9ICR7aW5mby5sZXZlbH0gJHttc2d9YDtcbn07XG5cbmNvbnN0IGxvZ2dlciA9IHdpbnN0b24uY3JlYXRlTG9nZ2VyKHtcbiAgbGV2ZWw6IGlzRGV2IHx8IGNvbmZpZy5ERUJVRyA/ICdkZWJ1ZycgOiAnaW5mbycsXG4gIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICB3aW5zdG9uLmZvcm1hdC5zcGxhdCgpLFxuICAgIHdpbnN0b24uZm9ybWF0LnByaW50ZihpbmZvID0+IGZvcm1hdHRlcihpbmZvKSksXG4gICksXG4gIHRyYW5zcG9ydHM6IFtuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoKV0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIiwiLy8gQGZsb3dcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9mIHRoZSBzZXJ2ZXIgbWlkZGxld2FyZXMuXG4gKi9cbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IG1vcmdhbiBmcm9tICdtb3JnYW4nO1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ2NvbXByZXNzaW9uJztcbmltcG9ydCBleHByZXNzV2luc3RvbiBmcm9tICdleHByZXNzLXdpbnN0b24nO1xuaW1wb3J0IG1ldGhvZE92ZXJyaWRlIGZyb20gJ21ldGhvZC1vdmVycmlkZSc7XG5pbXBvcnQgaGVsbWV0IGZyb20gJ2hlbG1ldCc7XG5cbmV4cG9ydCBkZWZhdWx0IChhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pID0+IHtcbiAgYXBwLnVzZShjb21wcmVzc2lvbigpKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpO1xuICBhcHAudXNlKGhlbG1ldCgpKTtcbiAgLy8gYXBwLnVzZShleHByZXNzU3RhdHVzTW9uaXRvcigpKTtcbiAgYXBwLnVzZShtZXRob2RPdmVycmlkZSgpKTtcbiAgLyogYXBwLnVzZShpMThuKTtcbiAgaWYgKGlzRGV2ICYmICFpc1Rlc3QpIHtcbiAgICBhcHAudXNlKG1vcmdhbignZGV2JykpO1xuICAgIGV4cHJlc3NXaW5zdG9uLnJlcXVlc3RXaGl0ZWxpc3QucHVzaCgnYm9keScpO1xuICAgIGV4cHJlc3NXaW5zdG9uLnJlc3BvbnNlV2hpdGVsaXN0LnB1c2goJ2JvZHknKTtcbiAgICBhcHAudXNlKFxuICAgICAgZXhwcmVzc1dpbnN0b24ubG9nZ2VyKHtcbiAgICAgICAgd2luc3Rvbkluc3RhbmNlOiBsb2dnZXIsXG4gICAgICAgIG1ldGE6IHRydWUsXG4gICAgICAgIG1zZzpcbiAgICAgICAgICAnSFRUUCB7e3JlcS5tZXRob2R9fSB7e3JlcS51cmx9fSB7e3Jlcy5zdGF0dXNDb2RlfX0ge3tyZXMucmVzcG9uc2VUaW1lfX1tcycsXG4gICAgICAgIGNvbG9yU3RhdHVzOiB0cnVlXG4gICAgICB9KVxuICAgICk7XG4gIH0qL1xufTtcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9jb25maWcvbG9nZ2VyJztcblxuaW1wb3J0IHR3aWxpbyBmcm9tICd0d2lsaW8nO1xuaW1wb3J0IHBsaXZvIGZyb20gJ3BsaXZvJztcbmltcG9ydCBuZXhtbyBmcm9tICcuLi91dGlscy9tZWRpYXMvbmV4bW8udXRpbCc7XG5cbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi91dGlscy9lcnJvci9hcGllcnJvci51dGlsJztcbmltcG9ydCBoYW5kbGVSZXF1ZXN0IGZyb20gJy4uL3V0aWxzL2hhbmRsZXJlcXVlc3QudXRpbCc7XG5cbmltcG9ydCAnLi4vY29uZmlnL2kxOG4nO1xuXG5jb25zdCB7IE1lc3NhZ2luZ1Jlc3BvbnNlIH0gPSB0d2lsaW8udHdpbWw7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0d2lsaW9XZWJIb29rKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICB0cnkge1xuICAgIGlmIChyZXEuYm9keS5Gcm9tICYmIHJlcS5ib2R5LkJvZHkgJiYgcmVxLmJvZHkuVG8pIHtcbiAgICAgIGNvbnN0IHRlbEZyb206IHN0cmluZyA9IHJlcS5ib2R5LkZyb207XG4gICAgICBjb25zdCBxdWVyeTogc3RyaW5nID0gcmVxLmJvZHkuQm9keTtcbiAgICAgIGNvbnN0IHRlbFRvOiBzdHJpbmcgPSByZXEuYm9keS5UbztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVSZXF1ZXN0KHF1ZXJ5KTtcblxuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vIEFuc3dlciB3aXRoIFR3aWxpb1xuICAgICAgICBjb25zdCB0d2ltbCA9IG5ldyBNZXNzYWdpbmdSZXNwb25zZSgpO1xuICAgICAgICAvLyB0d2lsaW8ocmVzcG9uc2UsIHRlbEZyb20sIHRlbFRvKTtcbiAgICAgICAgdHdpbWwubWVzc2FnZShyZXNwb25zZSk7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoSFRUUFN0YXR1cy5PSywgeyAnQ29udGVudC1UeXBlJzogJ3RleHQveG1sJyB9KTtcbiAgICAgICAgcmV0dXJuIHJlcy5lbmQodHdpbWwudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoSFRUUFN0YXR1cy5PSyk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0KFxuICAgICAgbmV3IEFQSUVycm9yKFxuICAgICAgICBcIk1pc3NpbmcgJ0Zyb20nIG9yICdCb2R5JyBwYXJhbSBpbiBib2R5XCIsXG4gICAgICAgIEhUVFBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApLFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVyci5zdGF0dXMgPSBIVFRQU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwbGl2b1dlYkhvb2soXG4gIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuKSB7XG4gIHRyeSB7XG4gICAgaWYgKHJlcS5ib2R5LkZyb20gJiYgcmVxLmJvZHkuQm9keSAmJiByZXEuYm9keS5Ubykge1xuICAgICAgY29uc3QgdGVsRnJvbTogc3RyaW5nID0gcmVxLmJvZHkuRnJvbTtcbiAgICAgIGNvbnN0IHF1ZXJ5OiBzdHJpbmcgPSByZXEuYm9keS5UZXh0O1xuICAgICAgY29uc3QgdGVsVG86IHN0cmluZyA9IHJlcS5ib2R5LlRvO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZVJlcXVlc3QocXVlcnkpO1xuXG4gICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gQW5zd2VyIHdpdGggUGxpdm9cbiAgICAgICAgY29uc3QgciA9IHBsaXZvLlJlc3BvbnNlKCk7XG4gICAgICAgIHIuYWRkTWVzc2FnZShyZXNwb25zZSwgeyBzcmM6IHRlbFRvLCBkc3Q6IHRlbEZyb20gfSk7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoSFRUUFN0YXR1cy5PSywgeyAnQ29udGVudC1UeXBlJzogJ3RleHQveG1sJyB9KTtcbiAgICAgICAgcmV0dXJuIHJlcy5lbmQoci50b1hNTCgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cyhIVFRQU3RhdHVzLk9LKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQoXG4gICAgICBuZXcgQVBJRXJyb3IoXG4gICAgICAgIFwiTWlzc2luZyAnRnJvbScgb3IgJ0JvZHknIHBhcmFtIGluIGJvZHlcIixcbiAgICAgICAgSFRUUFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICksXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICAgIHJldHVybiBuZXh0KGVycik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG5leG1vV2ViSG9vayhcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgdHJ5IHtcbiAgICBpZiAocmVxLmJvZHkuRnJvbSAmJiByZXEuYm9keS5Cb2R5ICYmIHJlcS5ib2R5LlRvKSB7XG4gICAgICBjb25zdCB0ZWxGcm9tOiBzdHJpbmcgPSByZXEuYm9keS5tc2lzZG47XG4gICAgICBjb25zdCBxdWVyeTogc3RyaW5nID0gcmVxLmJvZHkudGV4dDtcbiAgICAgIGNvbnN0IHRlbFRvOiBzdHJpbmcgPSByZXEuYm9keS50bztcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVSZXF1ZXN0KHF1ZXJ5KTtcblxuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vIEFuc3dlciB3aXRoIFBsaXZvXG4gICAgICAgIG5leG1vKHJlc3BvbnNlLCB0ZWxUbywgdGVsRnJvbSk7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoSFRUUFN0YXR1cy5PSywgeyAnQ29udGVudC1UeXBlJzogJ3RleHQveG1sJyB9KTtcbiAgICAgICAgcmV0dXJuIHJlcy5lbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuc2VuZFN0YXR1cyhIVFRQU3RhdHVzLk9LKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHQoXG4gICAgICBuZXcgQVBJRXJyb3IoXG4gICAgICAgIFwiTWlzc2luZyAnRnJvbScgb3IgJ0JvZHknIHBhcmFtIGluIGJvZHlcIixcbiAgICAgICAgSFRUUFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICksXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLnN0YXR1cyA9IEhUVFBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SO1xuICAgIHJldHVybiBuZXh0KGVycik7XG4gIH1cbn1cbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGhhbmRsZVJlcXVlc3QgZnJvbSAnLi4vdXRpbHMvaGFuZGxlcmVxdWVzdC51dGlsJztcbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcbmltcG9ydCBBUElFcnJvciBmcm9tICcuLi91dGlscy9lcnJvci9hcGllcnJvci51dGlsJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2NvbmZpZy9sb2dnZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdHBhZ2UoXG4gIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuKSB7XG4gIHJlcy53cml0ZUhlYWQoSFRUUFN0YXR1cy5PSywgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gIGNvbnN0IHBhZ2UgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgJ0M6L1VzZXJzL1Zpc2l0ZXVyL0RvY3VtZW50cy9MaWZlZS9saWZlZS90ZW1wbGF0ZXMvdGVzdC5odG1sJyxcbiAgKTtcbiAgcmV0dXJuIHJlcy5lbmQocGFnZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBxdWVzdGlvbihcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgdHJ5IHtcbiAgICBpZiAocmVxLnF1ZXJ5LmFzaykge1xuICAgICAgY29uc3QgcXVlcnk6IHN0cmluZyA9IHJlcS5xdWVyeS5hc2s7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlUmVxdWVzdChxdWVyeSk7XG4gICAgICBsb2dnZXIuaW5mbyhgUmVzcG9uc2UgOiAke3Jlc3BvbnNlfWApO1xuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoSFRUUFN0YXR1cy5PSywge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzLmVuZChyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzLnNlbmRTdGF0dXMoSFRUUFN0YXR1cy5PSyk7XG4gICAgfVxuICAgIHJldHVybiBuZXh0KFxuICAgICAgbmV3IEFQSUVycm9yKFxuICAgICAgICBcIk1pc3NpbmcgJ0Zyb20nIG9yICdCb2R5JyBwYXJhbSBpbiBib2R5XCIsXG4gICAgICAgIEhUVFBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApLFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVyci5zdGF0dXMgPSBIVFRQU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUjtcbiAgICByZXR1cm4gbmV4dChlcnIpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBTZXF1ZWxpemUsXG4gIFRhYmxlLFxuICBDb2x1bW4sXG4gIEZvcmVpZ25LZXksXG4gIE1vZGVsLFxuICBVcGRhdGVkQXQsXG4gIERlbGV0ZWRBdCxcbiAgQ3JlYXRlZEF0LFxufSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCc7XG5cbkBUYWJsZSh7XG4gIHRhYmxlTmFtZTogJ0NvbXB0ZVV0aWxpc2F0ZXVyJyxcbiAgbW9kZWxOYW1lOiAnQ29tcHRlVXRpbGlzYXRldXInLFxufSlcbmNsYXNzIEJhc2VDb21wdGVVdGlsaXNhdGV1cjxUPiBleHRlbmRzIE1vZGVsPEJhc2VDb21wdGVVdGlsaXNhdGV1cjxUPj4ge1xuICBAQ29sdW1uKHtcbiAgICBmaWVsZDogJ0lkJyxcbiAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUixcbiAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgYXV0b0luY3JlbWVudDogdHJ1ZSxcbiAgfSlcbiAgaWQ6IG51bWJlcjtcblxuICBAQ29sdW1uKHtcbiAgICB0eXBlOiBTZXF1ZWxpemUuU1RSSU5HLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gIH0pXG4gIExvZ2luOiBzdHJpbmc7XG5cbiAgQEZvcmVpZ25LZXkoKCkgPT4gQmFzZUNvbXB0ZVV0aWxpc2F0ZXVyKVxuICBAQ29sdW1uKHtcbiAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUixcbiAgICBhbGxvd051bGw6IHRydWUsXG4gIH0pXG4gIElkQ3JlYXRlZFVzZXI6IG51bWJlciB8IG51bGw7XG5cbiAgQENyZWF0ZWRBdFxuICBAQ29sdW1uKHtcbiAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcbiAgICBhbGxvd051bGw6IGZhbHNlLFxuICB9KVxuICBDcmVhdGVkRGF0ZTogRGF0ZTtcblxuICBARm9yZWlnbktleSgoKSA9PiBCYXNlQ29tcHRlVXRpbGlzYXRldXIpXG4gIEBDb2x1bW4oe1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxuICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgfSlcbiAgSWRVcGRhdGVkVXNlcjogbnVtYmVyIHwgbnVsbDtcblxuICBAVXBkYXRlZEF0XG4gIEBDb2x1bW4oe1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxuICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgfSlcbiAgVXBkYXRlZERhdGU6IERhdGUgfCBudWxsO1xuXG4gIEBEZWxldGVkQXRcbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXG4gICAgYWxsb3dOdWxsOiB0cnVlLFxuICB9KVxuICBEZWxldGVkRGF0ZTogRGF0ZSB8IG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VDb21wdGVVdGlsaXNhdGV1cjtcbiIsImltcG9ydCB7XG4gIFNlcXVlbGl6ZSxcbiAgQ29sdW1uLFxuICBNb2RlbCxcbiAgRm9yZWlnbktleSxcbiAgQ3JlYXRlZEF0LFxuICBVcGRhdGVkQXQsXG4gIERlbGV0ZWRBdCxcbn0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnO1xuXG5pbXBvcnQgQmFzZUNvbXB0ZVV0aWxpc2F0ZXVyIGZyb20gJy4vQmFzZUNvbXB0ZVV0aWxpc2F0ZXVyLm1vZGVsJztcblxuY2xhc3MgQmFzZU1vZGVsPFQ+IGV4dGVuZHMgTW9kZWw8QmFzZU1vZGVsPFQ+PiB7XG4gIEBDb2x1bW4oe1xuICAgIGZpZWxkOiAnSWQnLFxuICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxuICB9KVxuICBpZDogbnVtYmVyO1xuXG4gIEBGb3JlaWduS2V5KCgpID0+IEJhc2VDb21wdGVVdGlsaXNhdGV1cilcbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLklOVEVHRVIsXG4gICAgYWxsb3dOdWxsOiB0cnVlLFxuICB9KVxuICBJZENyZWF0ZWRVc2VyOiBudW1iZXIgfCBudWxsO1xuXG4gIEBDcmVhdGVkQXRcbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLkRBVEUsXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgfSlcbiAgQ3JlYXRlZERhdGU6IERhdGU7XG5cbiAgQEZvcmVpZ25LZXkoKCkgPT4gQmFzZUNvbXB0ZVV0aWxpc2F0ZXVyKVxuICBAQ29sdW1uKHtcbiAgICB0eXBlOiBTZXF1ZWxpemUuSU5URUdFUixcbiAgICBhbGxvd051bGw6IHRydWUsXG4gIH0pXG4gIElkVXBkYXRlZFVzZXI6IG51bWJlciB8IG51bGw7XG5cbiAgQFVwZGF0ZWRBdFxuICBAQ29sdW1uKHtcbiAgICB0eXBlOiBTZXF1ZWxpemUuREFURSxcbiAgICBhbGxvd051bGw6IHRydWUsXG4gIH0pXG4gIFVwZGF0ZWREYXRlOiBEYXRlIHwgbnVsbDtcblxuICBARGVsZXRlZEF0XG4gIEBDb2x1bW4oe1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5EQVRFLFxuICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgfSlcbiAgRGVsZXRlZERhdGU6IERhdGUgfCBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlTW9kZWw7XG4iLCJpbXBvcnQgeyBTZXF1ZWxpemUsIFRhYmxlLCBDb2x1bW4sIE1vZGVsIH0gZnJvbSAnc2VxdWVsaXplLXR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IHsgZmllbGRzIH0gZnJvbSAnLi4vdXRpbHMvbW9kZWwudXRpbCc7XG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vdXRpbHMvZXJyb3IvYXBpZXJyb3IudXRpbCc7XG5cbkBUYWJsZSh7XG4gIHRhYmxlTmFtZTogJ0ZpbGlhbGUnLFxuICBtb2RlbE5hbWU6ICdGaWxpYWxlJyxcbn0pXG5jbGFzcyBGaWxpYWxlIGV4dGVuZHMgTW9kZWw8RmlsaWFsZT4ge1xuICAvKipcbiAgICogUmV0dXJucyBpbmZvcyBmb3IgZW50aXR5IHdpdGggZ2l2ZW4gaWQgb3IgdGhyb3cgYW4gZXJyb3JcbiAgICovXG4gIC8qc3RhdGljIGFzeW5jIGdldEluZm9zKGVudGl0eUlkOiBudW1iZXIsIHRyYW5zYWN0aW9uPzogVHJhbnNhY3Rpb24pIHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBEb25uZWVzRmlsaWFsZS5maW5kT25lKHtcbiAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgd2hlcmU6IGZpZWxkczxEb25uZWVzRmlsaWFsZT4oeyBJZEZpbGlhbGU6IGVudGl0eUlkIH0pLFxuICAgIH0pO1xuICAgIGlmICghcmVzdWx0KSB0aHJvdyBuZXcgQVBJRXJyb3IoYE1pc3NpbmcgaW5mb3MgZm9yIGVudGl0eSAke2VudGl0eUlkfWApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0qL1xuXG4gIEBDb2x1bW4oe1xuICAgIGZpZWxkOiAnSWQnLFxuICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICBhdXRvSW5jcmVtZW50OiB0cnVlLFxuICB9KVxuICBpZDogbnVtYmVyO1xuXG4gIEBDb2x1bW4oe1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcsXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgfSlcbiAgTm9tOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLklOVEVHRVIsXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgfSlcbiAgTnVtZXJvQ29tcHRlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbGlhbGU7XG4iLCJpbXBvcnQge1xuICBTZXF1ZWxpemUsXG4gIFRhYmxlLFxuICBDb2x1bW4sXG4gIEZvcmVpZ25LZXksXG4gIEhhc01hbnksXG4gIEJlbG9uZ3NUbyxcbiAgTW9kZWwsXG59IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0JztcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9CYXNlTW9kZWwubW9kZWwnO1xuaW1wb3J0IFNpdGVPclNlcnZpY2UgZnJvbSAnLi9TaXRlT3JTZXJ2aWNlLm1vZGVsJztcbmltcG9ydCB7IGZpZWxkcywgZmllbGQgfSBmcm9tICcuLi91dGlscy9tb2RlbC51dGlsJztcbmltcG9ydCBGaWxpYWxlIGZyb20gJy4vRmlsaWFsZS5tb2RlbCc7XG5cblxuQFRhYmxlKHtcbiAgdGFibGVOYW1lOiAnU2l0ZScsXG4gIG1vZGVsTmFtZTogJ1NpdGUnLFxufSlcbmNsYXNzIFNpdGUgZXh0ZW5kcyBCYXNlTW9kZWw8U2l0ZT4ge1xuICBzdGF0aWMgY2hlY2tDb2RlKHNpdGVDb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc2l0ZUNvZGUubGVuZ3RoID09PSA0O1xuICB9XG4gIHN0YXRpYyBhc3luYyBnZXRGaWxpYWxlKHNpdGVDb2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBxdWVyeVJlcyA9IGF3YWl0IFNpdGVPclNlcnZpY2UuZmluZE9uZSh7XG4gICAgICBhdHRyaWJ1dGVzOiBbXSxcbiAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAge1xuICAgICAgICAgIG1vZGVsOiBTaXRlLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IFtdLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZWw6IEZpbGlhbGUsXG4gICAgICAgICAgYXR0cmlidXRlczogW2ZpZWxkPEZpbGlhbGU+KCdOb20nKV0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgd2hlcmU6IGZpZWxkczxTaXRlT3JTZXJ2aWNlPih7XG4gICAgICAgIENvZGU6IHNpdGVDb2RlLFxuICAgICAgfSksXG4gICAgfSk7XG4gICAgcmV0dXJuIHF1ZXJ5UmVzID8gcXVlcnlSZXMuRmlsaWFsZS5Ob20gOiBudWxsO1xuICB9XG4gIHN0YXRpYyBhc3luYyBnZXROb21TaXRlKHNpdGVDb2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBxdWVyeVJlcyA9IGF3YWl0IFNpdGVPclNlcnZpY2UuZmluZE9uZSh7XG4gICAgICBhdHRyaWJ1dGVzOiBbZmllbGQ8U2l0ZU9yU2VydmljZT4oJ0xpYmVsbGUnKV0sXG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlbDogU2l0ZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiBbXSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHdoZXJlOiBmaWVsZHM8U2l0ZU9yU2VydmljZT4oe1xuICAgICAgICBDb2RlOiBzaXRlQ29kZSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIHJldHVybiBxdWVyeVJlcyA/IHF1ZXJ5UmVzLkxpYmVsbGUgOiBudWxsO1xuICB9XG4gIEBGb3JlaWduS2V5KCgpID0+IFNpdGVPclNlcnZpY2UpXG4gIEBDb2x1bW4oe1xuICAgIHR5cGU6IFNlcXVlbGl6ZS5JTlRFR0VSLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gIH0pXG4gIElkU2l0ZU9yU2VydmljZTogbnVtYmVyO1xuXG4gIEBCZWxvbmdzVG8oKCkgPT4gU2l0ZU9yU2VydmljZSlcbiAgU2l0ZU9yU2VydmljZTogU2l0ZU9yU2VydmljZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2l0ZTtcbiIsImltcG9ydCB7XG4gIFNlcXVlbGl6ZSxcbiAgVGFibGUsXG4gIENvbHVtbixcbiAgRm9yZWlnbktleSxcbiAgSGFzT25lLFxuICBCZWxvbmdzVG9NYW55LFxuICBCZWxvbmdzVG8sXG59IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0JztcbmltcG9ydCBGaWxpYWxlIGZyb20gJy4vRmlsaWFsZS5tb2RlbCc7XG5pbXBvcnQgU2l0ZSBmcm9tICcuL1NpdGUubW9kZWwnO1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbC5tb2RlbCc7XG5cbkBUYWJsZSh7XG4gIHRhYmxlTmFtZTogJ1NpdGVPclNlcnZpY2UnLFxuICBtb2RlbE5hbWU6ICdTaXRlT3JTZXJ2aWNlJyxcbn0pXG5jbGFzcyBTaXRlT3JTZXJ2aWNlIGV4dGVuZHMgQmFzZU1vZGVsPFNpdGVPclNlcnZpY2U+IHtcbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLlNUUklORyxcbiAgICBhbGxvd051bGw6IGZhbHNlLFxuICB9KVxuICBDb2RlOiBzdHJpbmc7XG5cbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLlNUUklORyxcbiAgICBhbGxvd051bGw6IGZhbHNlLFxuICB9KVxuICBMaWJlbGxlOiBzdHJpbmc7XG5cbiAgQEZvcmVpZ25LZXkoKCkgPT4gRmlsaWFsZSlcbiAgQENvbHVtbih7XG4gICAgdHlwZTogU2VxdWVsaXplLklOVEVHRVIsXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgfSlcbiAgSWRGaWxpYWxlOiBudW1iZXI7XG5cbiAgQEJlbG9uZ3NUbygoKSA9PiBGaWxpYWxlKVxuICBGaWxpYWxlOiBGaWxpYWxlO1xuXG4gIEBIYXNPbmUoKCkgPT4gU2l0ZSlcbiAgU2l0ZTogU2l0ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2l0ZU9yU2VydmljZTtcbiIsImltcG9ydCB7IFNlcXVlbGl6ZSwgSVNlcXVlbGl6ZUNvbmZpZyB9IGZyb20gJ3NlcXVlbGl6ZS10eXBlc2NyaXB0JztcblxuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9jb25maWcvbG9nZ2VyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuaW1wb3J0IEZpbGlhbGUgZnJvbSAnLi9GaWxpYWxlLm1vZGVsJztcblxuaW1wb3J0IFNpdGUgZnJvbSAnLi9TaXRlLm1vZGVsJztcbmltcG9ydCBTaXRlT3JTZXJ2aWNlIGZyb20gJy4vU2l0ZU9yU2VydmljZS5tb2RlbCc7XG5cbmNvbnN0IG9wdGlvbnM6IElTZXF1ZWxpemVDb25maWcgPSBjb25maWcuREI7XG4vLyBBZGQgaXQgaW4gREIgb3B0aW9ucyBvbmx5IHdoZW4gZmFsc2UsIGRvIG5vdCBwdXQgdHJ1ZVxuaWYgKCFjb25maWcuREJfTE9HR0lORykgb3B0aW9ucy5sb2dnaW5nID0gZmFsc2U7XG5lbHNlIGxvZ2dlci5kZWJ1ZygnU2VxdWVsaXplIGxvZyBlbmFibGVkJyk7XG5sb2dnZXIuZGVidWcoJ1NlcXVlbGl6ZSBjb25maWcnLCBvcHRpb25zKTtcbmNvbnN0IHNlcXVlbGl6ZSA9IG5ldyBTZXF1ZWxpemUob3B0aW9ucyk7XG5cbnNlcXVlbGl6ZS5hZGRNb2RlbHMoW0ZpbGlhbGUsIFNpdGUsIFNpdGVPclNlcnZpY2VdKTtcblxuZXhwb3J0IGRlZmF1bHQgc2VxdWVsaXplO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgSFRUUFN0YXR1cyBmcm9tICdodHRwLXN0YXR1cyc7XG5cbmltcG9ydCBNZWRpYXNSb3V0ZXMgZnJvbSAnLi9tZWRpYXMucm91dGVzJztcbmltcG9ydCBUZXN0Um91dGVzIGZyb20gJy4vdGVzdC5yb3V0ZXMnO1xuXG5pbXBvcnQgQVBJRXJyb3IgZnJvbSAnLi4vdXRpbHMvZXJyb3IvYXBpZXJyb3IudXRpbCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2NvbmZpZy9sb2dnZXInO1xuLy8gaW1wb3J0IGxvZ0Vycm9yU2VydmljZSBmcm9tICcuLi91dGlsL2xvZy51dGlsJztcblxuY29uc3Qgcm91dGVzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVzLnVzZSgnL21lZGlhcycsIE1lZGlhc1JvdXRlcyk7XG5cbnJvdXRlcy51c2UoJy90ZXN0cycsIFRlc3RSb3V0ZXMpO1xuXG5yb3V0ZXMuYWxsKFxuICAnKicsXG4gIChcbiAgICBfcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gICAgX3JlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgICBfbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4gICkgPT4gX25leHQobmV3IEFQSUVycm9yKCdOb3QgRm91bmQhJywgSFRUUFN0YXR1cy5OT1RfRk9VTkQpKSxcbik7XG5cbi8vIHJvdXRlcy51c2UobG9nRXJyb3JTZXJ2aWNlKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuXG4vL1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCAqIGFzIE1lZGlhc0NvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvbWVkaWFzLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgYXV0aEJhc2ljRW52IH0gZnJvbSAnLi4vdXRpbHMvYXV0aC51dGlsJztcblxuY29uc3Qgcm91dGVzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVzLnBvc3QoJy90d2lsaW8nIC8qLCBhdXRoQmFzaWNFbnYqLywgTWVkaWFzQ29udHJvbGxlci50d2lsaW9XZWJIb29rKTtcbnJvdXRlcy5wb3N0KCcvbmV4bW8nIC8qLCBhdXRoQmFzaWNFbnYqLywgTWVkaWFzQ29udHJvbGxlci5uZXhtb1dlYkhvb2spO1xucm91dGVzLnBvc3QoJy9wbGl2bycgLyosIGF1dGhCYXNpY0VudiovLCBNZWRpYXNDb250cm9sbGVyLnBsaXZvV2ViSG9vayk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgKiBhcyBUZXN0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy90ZXN0LmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgYXV0aEJhc2ljRW52IH0gZnJvbSAnLi4vdXRpbHMvYXV0aC51dGlsJztcblxuY29uc3Qgcm91dGVzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVzLmdldCgnLycgLyosIGF1dGhCYXNpY0VudiovLCBUZXN0Q29udHJvbGxlci5kZWZhdWx0cGFnZSk7XG5yb3V0ZXMuZ2V0KCcvcXVlc3Rpb24nIC8qLCBhdXRoQmFzaWNFbnYqLywgVGVzdENvbnRyb2xsZXIucXVlc3Rpb24pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBIVFRQU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9jb25maWcvbG9nZ2VyJztcbmltcG9ydCBBcGlSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IG1pZGRsZXdhcmVzQ29uZmlnIGZyb20gJy4vY29uZmlnL21pZGRsZXdhcmVzJztcbmltcG9ydCAnLi9tb2RlbHMvc2VxdWVsaXplJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG4vLyBXcmFwIGFsbCB0aGUgbWlkZGxld2FyZXMgd2l0aCB0aGUgc2VydmVyXG5taWRkbGV3YXJlc0NvbmZpZyhhcHApO1xuXG5hcHAudXNlKCcvYXBpJywgQXBpUm91dGVzKTtcblxuYXBwLmdldCgnLycsIChyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlKSA9PlxuICByZXMuc2VuZFN0YXR1cyhIVFRQU3RhdHVzLk9LKSxcbik7XG5cbi8vIFdlIG5lZWQgdGhpcyB0byBtYWtlIHN1cmUgd2UgZG9uJ3QgcnVuIGEgc2Vjb25kIGluc3RhbmNlXG5pZiAoIW1vZHVsZS5wYXJlbnQpIHtcbiAgYXBwLmxpc3Rlbihjb25maWcuUE9SVCwgKGVycj86IEVycm9yKSA9PiB7XG4gICAgaWYgKGVycikge1xuICAgICAgbG9nZ2VyLmluZm8oY2hhbGsucmVkKCdDYW5ub3QgcnVuIScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgIGNoYWxrLmdyZWVuLmJvbGQoXG4gICAgICAgICAgYFxuICAgICAgICBZZXAgdGhpcyBpcyB3b3JraW5nIPCfjbpcbiAgICAgICAgQXBwIGxpc3RlbiBvbiBwb3J0OiAke2NvbmZpZy5QT1JUfSDwn42VXG4gICAgICAgIEVudjogJHtwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnbm9uZSd9IPCfpoRcbiAgICAgIGAsXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCBEaWFsb2dmbG93IGZyb20gJ2RpYWxvZ2Zsb3cnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2NvbmZpZy9sb2dnZXInO1xuXG5jb25zdCBkaWFsb2dmbG93ID0gRGlhbG9nZmxvdy52MmJldGExO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihxdWVyeTogc3RyaW5nLCBsYW5nOiBzdHJpbmcgPSAnZnItRlInKSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbklkID0gdXVpZC52NCgpO1xuICAgIC8vIENyZWF0ZSBhIG5ldyBzZXNzaW9uXG4gICAgY29uc3Qgc2Vzc2lvbkNsaWVudCA9IG5ldyBkaWFsb2dmbG93LlNlc3Npb25zQ2xpZW50KCk7XG4gICAgY29uc3Qgc2Vzc2lvblBhdGggPSBzZXNzaW9uQ2xpZW50LnNlc3Npb25QYXRoKFxuICAgICAgY29uZmlnLkRJQUxPR19GTE9XLnByb2plY3RJZCxcbiAgICAgIHNlc3Npb25JZCxcbiAgICApO1xuXG4gICAgLy8gVGhlIHRleHQgcXVlcnkgcmVxdWVzdC5cbiAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgc2Vzc2lvbjogc2Vzc2lvblBhdGgsXG4gICAgICBxdWVyeUlucHV0OiB7XG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAvLyBUaGUgcXVlcnkgdG8gc2VuZCB0byB0aGUgZGlhbG9nZmxvdyBhZ2VudFxuICAgICAgICAgIHRleHQ6IHF1ZXJ5LFxuICAgICAgICAgIC8vIFRoZSBsYW5ndWFnZSB1c2VkIGJ5IHRoZSBjbGllbnQgKGVuLVVTKVxuICAgICAgICAgIGxhbmd1YWdlQ29kZTogbGFuZyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICBsb2dnZXIuaW5mbygnU2VuZCByZXF1ZXN0Jyk7XG4gICAgLy8gU2VuZCByZXF1ZXN0IGFuZCBsb2cgcmVzdWx0XG4gICAgY29uc3QgcmVzcG9uc2VzID0gYXdhaXQgc2Vzc2lvbkNsaWVudC5kZXRlY3RJbnRlbnQocmVxdWVzdCk7XG4gICAgbG9nZ2VyLmluZm8oJ0RldGVjdGVkIGludGVudCcpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlc1swXS5xdWVyeVJlc3VsdDtcbiAgICBpZiAocmVzdWx0LmludGVudCkge1xuICAgICAgbG9nZ2VyLmluZm8oYCAgSW50ZW50OiAke3Jlc3VsdC5pbnRlbnQuZGlzcGxheU5hbWV9YCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbyhgICBObyBpbnRlbnQgbWF0Y2hlZC5gKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBIdHRwU3RhdHVzIGZyb20gJ2h0dHAtc3RhdHVzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gQVBJIGVycm9yLlxuICpcbiAqIEBleHRlbmRzIEV4dGVuZGFibGVFcnJvclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gQVBJIGVycm9yLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAtIEVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXMgLSBIVFRQIHN0YXR1cyBjb2RlIG9mIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIHN0YXR1czogbnVtYmVyID0gSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICB9XG59XG4iLCJpbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2NvbmZpZy9sb2dnZXInO1xuaW1wb3J0IFNpdGUgZnJvbSAnLi4vbW9kZWxzL1NpdGUubW9kZWwnO1xuaW1wb3J0IGkxOG4gZnJvbSAnaTE4bmV4dCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEJ5Q29kZShwYXJhbWV0ZXI6IHN0cmluZywgZnVuYzogKGNvZGU6IHN0cmluZykgPT4gYW55KSB7XG4gIGNvbnN0IHBvc3NpYmxlQ29kZXM6IHN0cmluZ1tdID0gcGFyYW1ldGVyLnNwbGl0KCcgJyk7XG4gIGxldCByZXM6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBhd2FpdCBwb3NzaWJsZUNvZGVzLnJlZHVjZShhc3luYyAocHJldmlvdXMsIGNvZGUpID0+IHtcbiAgICBsb2dnZXIuaW5mbyhgIENvZGUgOiAke2NvZGV9YCk7XG4gICAgYXdhaXQgcHJldmlvdXM7XG4gICAgaWYgKCFyZXMgJiYgU2l0ZS5jaGVja0NvZGUoY29kZSkpIHtcbiAgICAgIHJlcyA9IGF3YWl0IGZ1bmMoY29kZSk7XG4gICAgICBsb2dnZXIuaW5mbyhgIFJlcyA6ICR7cmVzfWApO1xuICAgIH1cbiAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBub21GaWxpYWxlQnlDb2RlKHBhcmFtZXRlcnM6IGFueSkge1xuICBjb25zdCBwYXJhbTogc3RyaW5nID0gcGFyYW1ldGVycy5maWVsZHMuc2l0ZV9jb2RlLnN0cmluZ1ZhbHVlO1xuICBjb25zdCBub21GaWxpYWxlOiBhbnkgPSBhd2FpdCBnZXRCeUNvZGUocGFyYW0sIChjb2RlOiBzdHJpbmcpID0+XG4gICAgU2l0ZS5nZXRGaWxpYWxlKGNvZGUpLFxuICApO1xuICBsb2dnZXIuaW5mbyhgIEZpbGlhbGUgOiAke25vbUZpbGlhbGV9YCk7XG4gIGxldCByZXMgPSAnJztcbiAgaWYgKG5vbUZpbGlhbGUpIHtcbiAgICByZXMgPSBpMThuLnQoJ2ludGVudC5maWxpYWxlLnN1Y2Nlc3MnLCB7IGZpbGlhbGU6IG5vbUZpbGlhbGUgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzID0gaTE4bi50KCdpbnRlbnQuZmlsaWFsZS5ub3QtZm91bmQnKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBub21TaXRlQnlDb2RlKHBhcmFtZXRlcnM6IGFueSkge1xuICBjb25zdCBwYXJhbTogc3RyaW5nID0gcGFyYW1ldGVycy5maWVsZHMuc2l0ZV9jb2RlLnN0cmluZ1ZhbHVlO1xuICBjb25zdCBub21TaXRlOiBhbnkgPSBhd2FpdCBnZXRCeUNvZGUocGFyYW0sIChjb2RlOiBzdHJpbmcpID0+XG4gICAgU2l0ZS5nZXROb21TaXRlKGNvZGUpLFxuICApO1xuICBsZXQgcmVzID0gJyc7XG4gIGlmIChub21TaXRlKSB7XG4gICAgcmVzID0gaTE4bi50KCdpbnRlbnQuc2l0ZS5zdWNjZXNzJywgeyBzaXRlOiBub21TaXRlIH0pO1xuICB9IGVsc2Uge1xuICAgIHJlcyA9IGkxOG4udCgnaW50ZW50LnNpdGUubm90LWZvdW5kJyk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlKGludGVudE5hbWU6IHN0cmluZywgcGFyYW1ldGVyczogYW55KSB7XG4gIHN3aXRjaCAoaW50ZW50TmFtZSkge1xuICAgIGNhc2UgJ2ZpbGlhbGUnOlxuICAgICAgcmV0dXJuIGF3YWl0IG5vbUZpbGlhbGVCeUNvZGUocGFyYW1ldGVycyk7XG4gICAgY2FzZSAnbm9tX3NpdGUnOlxuICAgICAgcmV0dXJuIGF3YWl0IG5vbVNpdGVCeUNvZGUocGFyYW1ldGVycyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgZGlhbG9nZmxvdyBmcm9tICcuL2RpYWxvZ2Zsb3cudXRpbCc7XG5pbXBvcnQgZnVsZmlsbCBmcm9tICcuL2Z1bGZpbGwudXRpbCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2NvbmZpZy9sb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KHF1ZXJ5OiBzdHJpbmcsIG51bTogc3RyaW5nID0gJycpIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZGlhbG9nZmxvdyhxdWVyeSk7XG4gIC8vIFRPRE8gY2hhbmdlIGxhbmcgZGVwZW5kaW5nIG51bVxuICBsZXQgcmVzcG9uc2U7XG4gIGlmICghcmVzdWx0IHx8IHJlc3VsdC5pbnRlbnQuaXNGYWxsYmFjaykge1xuICAgIHJlc3BvbnNlID0gXCJKZSBuJ2FpIHBhcyBiaWVuIHNhaXNpXCI7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaW50ZW50ID0gcmVzdWx0LmludGVudDtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gcmVzdWx0LnBhcmFtZXRlcnM7XG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmdWxmaWxsKGludGVudC5kaXNwbGF5TmFtZSwgcGFyYW1ldGVycyk7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgcmVzcG9uc2UgPSByZXN1bHQuZnVsZmlsbG1lbnRUZXh0O1xuICAgIH1cbiAgfVxuICBsb2dnZXIuaW5mbyhgICBSZXNwb25zZSBmdWxmaWxsZWQ6ICR7cmVzcG9uc2V9YCk7XG4gIHJldHVybiByZXNwb25zZTtcbn1cbiIsImltcG9ydCBOZXhtbyBmcm9tICduZXhtbyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNlbmRUZXh0TWVzc2FnZShcbiAgbXNnOiBzdHJpbmcsXG4gIHRlbFRvOiBzdHJpbmcsXG4gIHRlbEZyb206IHN0cmluZyxcbikge1xuICBjb25zdCBuZXhtID0gbmV3IE5leG1vKHtcbiAgICBhcGlLZXk6IGNvbmZpZy5ORVhNTy5hcGlLZXksXG4gICAgYXBpU2VjcmV0OiBjb25maWcuTkVYTU8uYXBpU2VjcmV0LFxuICAgIGFwcGxpY2F0aW9uSWQ6IGNvbmZpZy5ORVhNTy5hcHBsaWNhdGlvbklkLFxuICB9KTtcbiAgbmV4bS5tZXNzYWdlLnNlbmRTbXModGVsRnJvbSwgdGVsVG8sIG1zZyk7XG59XG4iLCJpbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tICdzZXF1ZWxpemUtdHlwZXNjcmlwdCc7XG5pbXBvcnQgU2VxdWVsaXplT3JpZ2luIGZyb20gJ3NlcXVlbGl6ZSc7XG5cbi8qKlxuICogRW5zdXJlIGdpdmVuIGtleSBiZWxvbmdzIHRvIFRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkPFQ+KGtleToga2V5b2YgVCkge1xuICByZXR1cm4ga2V5O1xufVxuXG4vKipcbiAqIEVuc3VyZSBrZXlzIG9mIGdpdmVuIG9iamVjdCBiZWxvbmdzIHRvIFRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkczxUPihvYmo6IFBhcnRpYWw8eyBba2V5IGluIGtleW9mIFRdOiBhbnkgfT4pIHtcbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFbnN1cmUgZ2l2ZW4gb2JqZWN0IGlzIHBhcnQgb2YgVFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFydGlhbDxUPihvYmo6IHsgW2tleSBpbiBrZXlvZiBUXT86IFRba2V5XSB8IG51bGwgfSkge1xuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEZvcm1hdCBjb2x1bW4gbmFtZSBmcm9tIGpvaW4gdGFibGVzIHVzaW5nIHNxbCBzZXJ2ZXIgZm9ybWF0XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRGaWVsZEZvck1zc3FsID0gKHRhYmxlOiBzdHJpbmcsIGNvbHVtbjogc3RyaW5nKSA9PlxuICBgWyR7dGFibGV9XS5bJHtjb2x1bW59XWA7XG5cbi8qKlxuICogRm9ybWF0IGRpcmVjdGx5IGNvbHVtbiBuYW1lIGZyb20gam9pbiB0YWJsZXMgZm9yIHNlcXVlbGl6ZSBhdHRyaWJ1dGVzIG9wdGlvbnMgdXNpbmcgc3FsIHNlcnZlciBmb3JtYXRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEZpZWxkRm9yQXR0cmlidXRlID0gKFxuICBmaWVsZFBhdGg6IHN0cmluZ1tdLFxuICB0YXJnZXRGaWVsZDogc3RyaW5nLFxuICBhbGlhcz86IHN0cmluZyxcbiAgY2FzdEFzPzogc3RyaW5nLFxuKTogW1NlcXVlbGl6ZU9yaWdpbi5saXRlcmFsIHwgU2VxdWVsaXplT3JpZ2luLmNhc3QsIHN0cmluZ10gPT4ge1xuICBjb25zdCBmb3JtYXR0ZWRGaWVsZCA9IFNlcXVlbGl6ZS5saXRlcmFsKFxuICAgIGdldEZpZWxkRm9yTXNzcWwoZmllbGRQYXRoLmpvaW4oJy0+JyksIHRhcmdldEZpZWxkKSxcbiAgKTtcbiAgaWYgKGNhc3RBcylcbiAgICByZXR1cm4gW1NlcXVlbGl6ZS5jYXN0KGZvcm1hdHRlZEZpZWxkLCBjYXN0QXMpLCBhbGlhcyB8fCB0YXJnZXRGaWVsZF07XG4gIHJldHVybiBbZm9ybWF0dGVkRmllbGQsIGFsaWFzIHx8IHRhcmdldEZpZWxkXTtcbn07XG5cbi8qKlxuICogRm9ybWF0IHdoZXJlIGNvbmRpdGlvbiB3aXRoIGxpa2Ugb3BlcmF0b3IgYW5kIGZvcmNlIGNhc2UgYW5kIGFjY2VudCBpbnNlbnNpdGl2ZSBjb2xsYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHNlYXJjaEluc2Vuc2l0aXZlID0gKFxuICBmaWVsZFBhdGg6IHN0cmluZ1tdLFxuICB0YXJnZXRGaWVsZDogc3RyaW5nLFxuICB2YWx1ZTogc3RyaW5nLFxuKSA9PlxuICBTZXF1ZWxpemUud2hlcmUoXG4gICAgU2VxdWVsaXplLmxpdGVyYWwoXG4gICAgICBgJHtnZXRGaWVsZEZvck1zc3FsKFxuICAgICAgICBmaWVsZFBhdGguam9pbignLT4nKSxcbiAgICAgICAgdGFyZ2V0RmllbGQsXG4gICAgICApfSBDT0xMQVRFIEZyZW5jaF9DSV9BSWAsXG4gICAgKSxcbiAgICAnbGlrZScsXG4gICAgYCUke3ZhbHVlfSVgLFxuICApO1xuLyoqXG4gKiBGb3JtYXQgZGlyZWN0bHkgY29sdW1uIG5hbWUgZnJvbSBqb2luIHRhYmxlcyBmb3Igc2VxdWVsaXplIGdyb3VwIG9wdGlvbnNcbiAqIFdvcmthcm91bmQgc2luY2UgY29sdW1uIG5hbWUgaXMgd3JvbmcgKC4gc2VwYXJhdG9yIGluc3RlYWQgb2YgLT4pIHdoZW4gcHV0dGluZyBhbGwgbW9kZWxzIGluIGdyb3VwIHBhcmFtcyBsaWtlIGluIG9yZGVyIHByb3BlcnR5XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRGaWVsZEZvckdyb3VwID0gKFxuICBmaWVsZFBhdGg6IHN0cmluZ1tdLFxuICB0YXJnZXRGaWVsZDogc3RyaW5nLFxuICBjYXN0QXM/OiBzdHJpbmcsXG4pID0+IHtcbiAgY29uc3QgY29sID0gU2VxdWVsaXplLmNvbChgJHtmaWVsZFBhdGguam9pbignLT4nKX0uJHt0YXJnZXRGaWVsZH1gKTtcbiAgaWYgKGNhc3RBcykgcmV0dXJuIFNlcXVlbGl6ZS5jYXN0KGNvbCwgY2FzdEFzKTtcbiAgcmV0dXJuIGNvbDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkaWFsb2dmbG93XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwLXN0YXR1c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImkxOG5leHQtZXhwcmVzcy1taWRkbGV3YXJlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImkxOG5leHQtbm9kZS1mcy1iYWNrZW5kXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1ldGhvZC1vdmVycmlkZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4bW9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGxpdm9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplLXR5cGVzY3JpcHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHdpbGlvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2luc3RvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9