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

/***/ "./src/config/i18n.ts":
/*!****************************!*\
  !*** ./src/config/i18n.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const isDev = "development" === 'development';
/*i18n.use(i18nextBackend).init({
  lng: 'fr-tu',
  fallbackLng: 'fr-tu',
  preload: ['fr-tu'],
  saveMissing: true,
  debug: isDev,
  interpolation: {
    format: (value, format) => {
      if (format === 'capitalize')
        return value.charAt(0).toUpperCase() + value.slice(1);
      if (value instanceof Date) return moment(value).format(format);
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
});*/


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
    API_ACCESS_USERNAME: process.env.API_ACCESS_USERNAME || null,
    API_ACCESS_PASSWORD: process.env.API_ACCESS_PASSWORD || null,
    DB: {
        username: process.env.DB_USERNAME || 'admin',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'database',
        host: process.env.DB_HOST || 'localhost',
        options: { encrypt: true },
        operatorsAliases: false,
    },
    INTENTS: {
        register: process.env.INTENT_REGISTER || '',
        registermail: process.env.INTENT_REGISTERMAIL || '',
        registername: process.env.INTENT_REGISTERNAME || '',
        registercode: process.env.INTENT_REGISTERCODE || '',
        openingtime: process.env.INTENT_OPENTIME || '',
        contact: process.env.INTENT_CONTACT || '',
        services: process.env.INTENT_SERVICES || '',
        relaiscolis: process.env.INTENT_RELAISCOLIS || '',
        fallback: process.env.INTENT_FALLBACK || '',
    },
    CONTEXTS: {
        FULFILL: {
            register: process.env.CONTEXT_FULFILL_REGISTER || '',
            registermail: process.env.CONTEXT_FULFILL_REGISTERMAIL || '',
            registercode: process.env.CONTEXT_FULFILL_REGISTERCODE || '',
        },
    },
    LUIS: {
        appId: process.env.LUIS_APP_ID || '',
        endpointKey: process.env.LUIS_ENDPOINT_KEY || '',
    },
    WATSON: {
        apiKey: process.env.WATSON_API_KEY || '',
        assistantId: process.env.WATSON_ASSISTANT_ID || '',
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
    },
    SLACK: {
        apiToken: process.env.SLACK_API_TOKEN || 'slack_token',
    },
    MAIL: {
        enable: process.env.MAIL_ENABLE === 'true' || false,
        host: process.env.MAIL_SMTP_SERVER || 'localhost',
        port: parseInt(process.env.MAIL_SMTP_PORT || '25', 10),
        secure: process.env.MAIL_SMTP_SECURE === 'true' || false,
        recipient: process.env.MAIL_RECIPIENT || undefined,
        sender: process.env.MAIL_SENDER || '',
        sav: process.env.MAIL_SAV || 'service-si@easy-life.fr',
    },
    NEDB: {
        ttl: parseInt(process.env.NEDB_TTL || '0', 10),
    },
    WIT: {
        accesstoken: process.env.WIT_ACCESSTOKEN || '',
    },
    SAP: {
        token: process.env.SAP_TOKEN || '',
        userslug: process.env.SAP_USERSLUG || '',
        botslug: process.env.SAP_BOTSLUG || '',
        versionslug: process.env.SAP_VERSIONSLUG || '',
        devtoken: process.env.SAP_DEV_TOKEN || '',
    },
};
exports.default = defaultConfig;


/***/ }),

/***/ "./src/controllers/ajax.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/ajax.controller.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlemessage_util_1 = __importDefault(__webpack_require__(/*! ../utils/handlemessage.util */ "./src/utils/handlemessage.util.ts"));
async function default_1(req, res, next) {
    try {
        if (req.query.msg && req.query.from) {
            const msg = req.query.msg;
            const from = req.query.from;
            const request = {
                msg,
                from,
                to: '+33755536910',
                service: 'sap',
                platform: 'tel',
                acceptedtypes: ['text', 'btn', 'dropdown'],
            };
            const response = await handlemessage_util_1.default(request);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(response));
        }
    }
    catch (ex) {
        res.writeHead(500);
        return res.end('Error');
    }
    res.writeHead(404);
    return res.end('Missing "msg" or "from"');
}
exports.default = default_1;


/***/ }),

/***/ "./src/controllers/slack.controller.ts":
/*!*********************************************!*\
  !*** ./src/controllers/slack.controller.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (162:28)\nYou may need an appropriate loader to handle this file type.\n|         else if (response.dropdown) {\r\n|             const opt = [];\r\n>             const element = ;\r\n|         }\r\n|         ;\r");

/***/ }),

/***/ "./src/controllers/webapp.controllers.ts":
/*!***********************************************!*\
  !*** ./src/controllers/webapp.controllers.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responsemanager_util_1 = __importDefault(__webpack_require__(/*! ../utils/responsemanager.util */ "./src/utils/responsemanager.util.ts"));
const trainingmanager_util_1 = __importDefault(__webpack_require__(/*! ../utils/trainingmanager.util */ "./src/utils/trainingmanager.util.ts"));
const json_to_pretty_yaml_1 = __importDefault(__webpack_require__(/*! json-to-pretty-yaml */ "json-to-pretty-yaml"));
const yamljs_1 = __importDefault(__webpack_require__(/*! yamljs */ "yamljs"));
/**
 * Show the different response and training types
 * @param req
 * @param res
 * @param next
 */
async function home(req, res, next) {
    const restypes = await responsemanager_util_1.default.gettypes();
    const traintypes = await trainingmanager_util_1.default.getTypes();
    const types = restypes;
    traintypes.forEach((t) => {
        if (!types.includes(t)) {
            types.push(t);
        }
    });
    res.render('home.twig', { types });
}
/**
 * Show the different responses and trainings for one type
 * @param req
 * @param res
 * @param next
 */
async function type(req, res, next) {
    const typeparam = req.params.type;
    const responsefiles = await responsemanager_util_1.default.loadtype(typeparam);
    const trainfiles = await trainingmanager_util_1.default.loadtype(typeparam);
    res.render('type.twig', { responsefiles, trainfiles, type: typeparam });
}
/**
 * Show an editor to edit the file
 * @param req
 * @param res
 * @param next
 */
async function file(req, res, next) {
    const typeparam = req.params.type;
    const catparam = req.params.cat;
    const nameparam = req.params.name;
    let fileres;
    if (catparam === 'response') {
        fileres = await responsemanager_util_1.default.loadfile(`${typeparam}.${nameparam}`);
    }
    else if (catparam === 'training') {
        fileres = await trainingmanager_util_1.default.loadfile(`${typeparam}-${nameparam}`);
    }
    res.render('file.twig', {
        file: json_to_pretty_yaml_1.default.stringify(fileres),
        type: typeparam,
        filename: nameparam,
        cat: catparam,
    });
}
/**
 * Save the file
 * @param req
 * @param res
 * @param next
 */
async function save(req, res, next) {
    let error = null;
    try {
        const json = yamljs_1.default.parse(req.body.code);
        if (req.body.cat === 'response') {
            await responsemanager_util_1.default.save(json);
        }
        else if (req.body.cat === 'training') {
            await trainingmanager_util_1.default.updatefile(req.body.file.replace('.', '-'), json);
        }
    }
    catch (e) {
        error = e;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error }));
}
/**
 * Get all the types and there files
 * @param req
 * @param res
 * @param next
 */
async function getfiles(req, res, next) {
    try {
        if (req.body.token === 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw') {
            const realtypes = [];
            const restypes = await responsemanager_util_1.default.gettypes();
            const traintypes = await trainingmanager_util_1.default.getTypes();
            const types = restypes;
            traintypes.forEach((t) => {
                if (!types.includes(t)) {
                    types.push(t);
                }
            });
            await types.reduce(async (previous, e) => {
                await previous;
                const responsefiles = await responsemanager_util_1.default.loadtype(e);
                const trainfiles = await trainingmanager_util_1.default.loadtype(e);
                realtypes.push({
                    response: responsefiles,
                    training: trainfiles,
                    name: e,
                });
            }, Promise.resolve());
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(realtypes));
            return;
        }
    }
    catch (e) {
        // Do nothing
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end();
}
exports.default = {
    home,
    type,
    file,
    save,
    getfiles,
};


/***/ }),

/***/ "./src/models/ecl.ts":
/*!***************************!*\
  !*** ./src/models/ecl.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// @flow
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const uuid_1 = __importDefault(__webpack_require__(/*! uuid */ "uuid"));
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
const translate_util_1 = __importDefault(__webpack_require__(/*! ../utils/translate.util */ "./src/utils/translate.util.ts"));
const isDev = "development" === 'development';
/*const ecl = new Sequelize(
  'mysql://clt1329-dev:Easylife2010@195.200.78.252/clt1329_dev',
);*/
const ecl = new sequelize_1.Sequelize(config_1.default.DB.database, config_1.default.DB.username, config_1.default.DB.password, Object.assign({}, config_1.default.DB, { dialect: 'mysql', dialectOptions: {
        charset: 'latin1',
        encrypt: false,
    }, logging: isDev }));
class Ecl {
    static getPrenomConcierge(concierges, forUser = true) {
        if (!concierges || !concierges.length) {
            return forUser ? translate_util_1.default('infos.concierge') : '';
        }
        if (concierges.length === 1) {
            return concierges[0].prenom;
        }
        if (concierges.length === 2)
            return `${concierges[0].prenom} et ${concierges[1].prenom}`;
        return forUser ? translate_util_1.default('infos.concierges') : '';
    }
    static isMultipleConcierges(concierges) {
        return concierges && concierges.length > 1;
    }
    static getTrigrammeConcierge(concierges) {
        if (!concierges || !concierges.length)
            return null;
        return concierges[0].trigramme;
    }
    constructor() {
        this.ecl = ecl;
    }
    async getSiteInfos(service, serviceId) {
        let serviceColumn;
        // Cas de la console. On fait un remplacement de valeur pour aller chercher un code site
        if (service === 'console')
            serviceColumn = 'corresp_04';
        else
            serviceColumn = service;
        const sites = await this.ecl.query('SELECT `id_re_03` AS `id` , `corresp_04` AS `code` , `cl_lb_01` AS `libelle` , `cl_re_01_u` AS `email`, `site_telephone` AS `telephone`, `site_horaires` AS `horaires`, `botInfo` AS `infos`, `botNumber` FROM `client` ' +
            `WHERE ${serviceColumn} = :serviceId LIMIT 1`, {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
            replacements: { serviceId },
        });
        if (sites && sites.length)
            return Object.assign({}, sites[0], { guideServices: `http://ecl.easy-life.fr/gds/${sites[0].code}.pdf`, relaisColis: `http://ecl.easy-life.fr/gds/${sites[0].code}_RC.pdf` });
        return Promise.resolve(null);
    }
    async getSiteGroups(siteId) {
        const groups = await this.ecl.query('SELECT `corresp_01` as id, `corresp_02` as nom FROM `correspondance_client` WHERE `id_re_03`=:siteId', {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
            replacements: { siteId },
        });
        return groups;
    }
    async getConciergeList(siteCode) {
        // 'LEFT JOIN `client` ON `client`.`id_re_03`=`coord`.`id_re_03FK` ' +
        // 'WHERE `client`.`corresp_04`=:siteCode and `coord`.`co_ge_03`=0',
        const concierges = await this.ecl.query('SELECT `coord`.`co_re_03_u` as prenom, `coord`.`co_re_02_u` as nom, `coord`.`co_re_01` as trigramme ' +
            'FROM `coordinateur` as `coord` ' +
            'LEFT JOIN `client` ON `client`.`co_re_01`=`coord`.`co_re_01` ' +
            "AND (`client`.`cl_re_03` = '0000-00-00' OR `client`.`cl_re_03` IS NULL) " +
            'WHERE `client`.`corresp_04`=:siteCode', {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
            replacements: { siteCode },
        });
        return concierges;
    }
    async getUser(identifier, value, site) {
        let where;
        switch (identifier) {
            case 'userId':
                where = '`utilisateur`.`id_re_04`=:value';
                break;
            case 'mobile':
                where = '`utilisateur`.`id_co_06_u`=:value';
                break;
            case 'email':
                where = 'lower(`utilisateur`.`id_re_01_u`) = lower(:value)';
                break;
            default:
                return Promise.resolve(null);
        }
        const users = await this.ecl.query('SELECT `id_re_01_u` AS `email` , `id_re_06_u` AS `nom` , `id_re_07_u` AS `prenom` , ' +
            '`id_co_06_u` AS `telephone`, `id_re_04` AS `id` ' +
            'FROM `utilisateur` ' +
            'JOIN `client` ON `utilisateur`.`id_re_03` = `client`.`id_re_03` ' +
            'WHERE `client`.`corresp_04`=:siteCode ' +
            `${where ? `AND ${where}` : ''};`, {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
            replacements: { value, siteCode: site.code },
        });
        if (users && users.length === 1)
            return users[0];
        return Promise.resolve(null);
    }
    /**
     * Save user registration
     * @return token to be used in user mail validation
     * @param {*} site
     * @param {*} userId
     * @param {*} email
     * @param {*} lastName
     * @param {*} givenName
     * @param {*} siteGroup
     */
    async saveRegistration(site, userId, email, lastName, givenName, siteGroup) {
        // Get needed site info
        const sitesInfo = await this.ecl.query('SELECT `id_re_03` as id, `fi_de_03` as `category`, `fi_de_04` as `group` FROM `form_inscription` WHERE `id_re_03`=:siteId', {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
            replacements: { siteId: site.id },
        });
        if (!sitesInfo.length && !sitesInfo)
            throw Error(`Cannot save registration: unable to find site info for '${site.id}'`);
        const siteInfo = sitesInfo[0];
        // Generate a token for user mail validation
        const token = uuid_1.default.v4();
        // Insert registration in database
        await this.ecl.query('INSERT INTO `form_inscription_util`(`id_re_03`,`id_re_01_u`,`id_re_06_u`,`id_re_07_u`,`id_re_08`,`id_co_06_u`,`id_ge_04`,`iu_to_01`,`id_re_10`,`id_in_01`,`id_in_02`,`id_co_02_u`) ' +
            'VALUES (:siteId,:email,:lastName,:givenName,:fullName,:mobile,DATE_FORMAT(NOW(), "%Y-%m-%d"),:token,:client,:category,:group,:cp)', {
            type: sequelize_1.Sequelize.QueryTypes.INSERT,
            replacements: {
                token,
                email,
                siteId: site.id,
                lastName: lastName.trim().toUpperCase(),
                givenName: givenName.trim(),
                fullName: `${lastName.trim().toUpperCase()} ${givenName.trim()}`,
                mobile: userId,
                client: siteGroup ? siteGroup.nom : null,
                category: siteInfo.category,
                group: siteInfo.group,
                cp: `${site.code.substr(0, 2)}000`,
            },
        });
        return token;
    }
    async saveUserMobile(user) {
        return this.ecl.query('UPDATE `utilisateur` SET ' +
            '`id_co_06_u`=:telephone ' +
            'WHERE `id_re_04`=:id', {
            type: sequelize_1.Sequelize.QueryTypes.UPDATE,
            replacements: {
                id: user.id,
                telephone: user.telephone,
            },
        });
    }
    async saveRequest(request, site, concierges, user) {
        let requestNum = await this.ecl.query('SELECT COUNT(`de_re_07_u`) AS count FROM `demande` ' +
            "WHERE `de_re_01_u`=:date AND `de_re_05_u`<>'abandon_p1'", {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
            replacements: { date: moment_1.default().format('YYYY-MM-DD') },
        });
        if (!requestNum || !requestNum.length)
            throw Error('Cannot save request: unable to find a new request number');
        requestNum = requestNum[0].count + 1;
        let requestType;
        let requestType2;
        let typeCode;
        let detail;
        let addition;
        switch (request.type) {
            case 'casier':
                requestType = 'Demande casier';
                requestType2 = request.type;
                typeCode = 'casi';
                detail = request.numLocker
                    ? `casier:${request.numLocker} ${request.text}`
                    : request.text;
                addition = request.numLocker
                    ? `casier:${request.numLocker} ${request.text}`
                    : request.text;
                break;
            case 'SMS':
            default:
                requestType = 'Autre';
                requestType2 = request.type;
                typeCode = 'sms';
                detail = request.text;
                addition = request.text;
                break;
        }
        const requestRef = [
            site.code,
            moment_1.default().format('DDMMYYYY'),
            typeCode,
            requestNum,
        ]
            .join('_')
            .replace(/\s/g, '_');
        await this.ecl.query('INSERT INTO `demande`(`de_re_03_u`, `de_re_01_u`, `de_re_02_u`, `de_re_04_u`, ' +
            '`de_re_05_u`, `de_re_06_u`, `de_re_07_u`, `de_re_08_u`, `de_re_09_u`, ' +
            '`de_re_10_u`, `de_re_14`, `id_re_04`, `de_ca_01_u`) ' +
            "VALUES(:requestRef, :date, :time, :trigram, 'Demande en cours de traitement', :requestType, :requestType2, :detail, :addition, 1, 0, :userId, :numLocker)", {
            type: sequelize_1.Sequelize.QueryTypes.INSERT,
            replacements: {
                requestType,
                requestType2,
                detail,
                addition,
                requestRef,
                date: moment_1.default().format('YYYY-MM-DD'),
                time: moment_1.default().format('HH:mm:ss'),
                trigram: Ecl.getTrigrammeConcierge(concierges),
                userId: user.id,
                numLocker: request.numLocker || '',
            },
        });
        return requestRef;
    }
    async updateRequest(requestRef, request) {
        function addNumLocker(field, numLocker) {
            return `\`${field}\`=CONCAT('casier:${numLocker || ''} ', \`${field}\`)`;
        }
        function addDetails(field, paramName) {
            return `\`${field}\`=CONCAT(\`${field}\`, ' ', ${paramName})`;
        }
        // Update num locker if added in request details
        if (request.numLocker) {
            await this.ecl.query('UPDATE `demande` SET ' +
                `${addNumLocker('de_re_08_u', request.numLocker)}, ` +
                `${addNumLocker('de_re_09_u', request.numLocker)}, ` +
                "`de_re_06_u`='Demande casier', " +
                "`de_re_07_u`='casier', " +
                '`de_ca_01_u`=:numLocker ' +
                'WHERE `de_re_03_u`=:requestRef', {
                type: sequelize_1.Sequelize.QueryTypes.UPDATE,
                replacements: {
                    requestRef,
                    numLocker: request.numLocker,
                },
            });
        }
        // Add request details
        return this.ecl.query('UPDATE `demande` SET ' +
            `${addDetails('de_re_08_u', ':details')}, ` +
            `${addDetails('de_re_09_u', ':details')} ` +
            'WHERE `de_re_03_u`=:requestRef', {
            type: sequelize_1.Sequelize.QueryTypes.UPDATE,
            replacements: {
                requestRef,
                details: request.text,
            },
        });
    }
    async getSiteUsers(sites) {
        const whereIn = `'${sites.join("','")}'`;
        return this.ecl.query('SELECT DISTINCT (u.`id_co_06_u`) AS tel, c.twilio AS twilio ' +
            'FROM `utilisateur` AS u ' +
            'INNER JOIN `client` AS c ON c.`id_re_03` = u.`id_re_03` ' +
            'WHERE u.`id_re_03` IN ' +
            `(${whereIn}) ` +
            "AND u.`id_co_06_u` != '' " +
            'AND u.`id_co_06_u` IS NOT NULL ' +
            "AND (u.`id_ge_02` = '0000-00-00' OR u.`id_ge_02` IS NULL);", {
            type: sequelize_1.Sequelize.QueryTypes.SELECT,
        });
    }
}
exports.default = Ecl;


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
const test_routes_1 = __importDefault(__webpack_require__(/*! ./test.routes */ "./src/routes/test.routes.ts"));
const webapp_routes_1 = __importDefault(__webpack_require__(/*! ./webapp.routes */ "./src/routes/webapp.routes.ts"));
const routes = express_1.default.Router();
// Test routes for the console
routes.use('/test', test_routes_1.default);
// Webapp routes to modified responses and training
routes.use('/webapp', webapp_routes_1.default);
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
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const ajax_controller_1 = __importDefault(__webpack_require__(/*! ../controllers/ajax.controller */ "./src/controllers/ajax.controller.ts"));
const slack_controller_1 = __importStar(__webpack_require__(/*! ../controllers/slack.controller */ "./src/controllers/slack.controller.ts"));
const routes = express_1.default.Router();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
// Route to test on web console
routes.get('/ajax/sendmessage', ajax_controller_1.default);
// Route used by slack when a new message arrives
routes.post('/slack', slack_controller_1.default);
// Route used by slack when a new event is triggered like a button click
routes.post('/slackevents', urlencodedParser, slack_controller_1.events);
exports.default = routes;


/***/ }),

/***/ "./src/routes/webapp.routes.ts":
/*!*************************************!*\
  !*** ./src/routes/webapp.routes.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const webapp_controllers_1 = __importDefault(__webpack_require__(/*! ../controllers/webapp.controllers */ "./src/controllers/webapp.controllers.ts"));
const routes = express_1.default.Router();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
routes.all('/', webapp_controllers_1.default.home);
// Ajax call
routes.post('/save', urlencodedParser, webapp_controllers_1.default.save);
// Ajax call
routes.post('/getfiles', urlencodedParser, webapp_controllers_1.default.getfiles);
routes.all('/:type', webapp_controllers_1.default.type);
routes.all('/:type/:cat/:name', webapp_controllers_1.default.file);
exports.default = routes;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./src/routes/index.ts"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
__webpack_require__(/*! ./models/ecl */ "./src/models/ecl.ts");
const app = express_1.default();
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
app.use('/', routes_1.default);
app.listen(8080);
exports.default = app;


/***/ }),

/***/ "./src/utils/async.util.ts":
/*!*********************************!*\
  !*** ./src/utils/async.util.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(__webpack_require__(/*! request */ "request"));
/**
 * Send an http request and return the result and the body
 * @param req the http request to send
 */
exports.execrequest = async (req) => {
    return new Promise((resolve, reject) => {
        request_1.default(req, (err, res, body) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ res, body });
            }
        });
    });
};


/***/ }),

/***/ "./src/utils/contextsmanager.util.ts":
/*!*******************************************!*\
  !*** ./src/utils/contextsmanager.util.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(__webpack_require__(/*! nedb */ "nedb"));
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
// Connect to ad db stored in DB/contexts
const db = new nedb_1.default({ filename: 'DB/contexts', autoload: true });
/**
 * Delete old contexts (date expired)
 */
async function deleteOld() {
    const ttl = Date.now() - config_1.default.NEDB.ttl * 86400000;
    await db.remove({ createTime: { $lt: ttl } }, { multi: true });
}
/**
 * Count the occurences in db
 * @param query a mongodb query
 */
const count = async (query) => {
    return new Promise((resolve, reject) => {
        db.count(query, (err, nb) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(nb);
            }
        });
    });
};
/**
 * Insert datas in db
 * @param query a mongodb query
 */
const insert = async (query) => {
    return new Promise((resolve, reject) => {
        db.insert(query, (err, newDoc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(newDoc);
            }
        });
    });
};
/**
 * Update datas in db
 * @param query a mongodb query
 */
const update = async (query) => {
    return new Promise((resolve, reject) => {
        db.update({ user: query.user }, { $set: { contexts: query.contexts } }, {}, (err, numReplaced) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(numReplaced);
            }
        });
    });
};
/**
 * Find one row in db
 * @param query a mongodb query
 */
const findone = async (query) => {
    return new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
};
/**
 * Save contexts relative to a user
 * @param user the user id (phone, mail)
 * @param c the contexts to store
 */
async function save(user, c) {
    await deleteOld();
    if (user) {
        const nb = await findone({ user });
        const contexts = {
            fulfill: c.fulfill,
            service: c.service,
            user: c.user,
        };
        if (!nb) {
            // Inserting context
            await insert({ user, contexts, createTime: Date.now() });
        }
        else {
            // Updating context
            await update({ user, contexts });
        }
    }
}
/**
 * Load a user contexts (if there's not return an empty context)
 * @param user the user id (phone, mail)
 */
async function load(user) {
    await deleteOld();
    if (user) {
        const contexts = await findone({ user });
        if (contexts) {
            contexts.contexts.site = null;
            contexts.contexts.concierges = null;
            return contexts.contexts;
        }
    }
    return {
        fulfill: [],
        user: {
            lastname: '',
            firstname: '',
            email: '',
            siteGroup: null,
            userId: '',
        },
        service: {
            watson: null,
        },
        site: null,
        concierges: null,
    };
}
exports.default = {
    save,
    load,
};


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
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
__webpack_require__(/*! ../config/i18n */ "./src/config/i18n.ts");
const register_intent_1 = __importDefault(__webpack_require__(/*! ./fulfill/register.intent */ "./src/utils/fulfill/register.intent.ts"));
const default_intent_1 = __importDefault(__webpack_require__(/*! ./fulfill/default.intent */ "./src/utils/fulfill/default.intent.ts"));
const infos_intent_1 = __importDefault(__webpack_require__(/*! ./fulfill/infos.intent */ "./src/utils/fulfill/infos.intent.ts"));
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
const func_util_1 = __webpack_require__(/*! ./func.util */ "./src/utils/func.util.ts");
/**
 * Find and return the most probable response
 * @param result the intents and entities
 * @param contexts the diferent contexts
 * @param types the types supported by the platform
 * @param lang the level of language for the response (fr-tu or fr-vous)
 */
async function default_1(request) {
    // Get all known intents
    const intents = getConfig();
    const intentMap = new Map();
    intents.forEach(intent => {
        intentMap.set(intent.name, intent.func);
    });
    // Create an array with all intent responses
    const intentsRes = [];
    // Get all intents
    await request.result.intents.reduce(async (previous, e) => {
        await previous;
        let res;
        if (!intentMap.has(e.name)) {
            if (request.result.response) {
                res = {
                    // TODO change that
                    response: {
                        intent: '',
                        type: '',
                        responses: [
                            {
                                text: {
                                    'fr-tu': [request.result.response],
                                    'fr-vous': [request.result.response],
                                },
                            },
                        ],
                    },
                    contexts: request.result.contexts,
                    confidence: 0.01,
                };
            }
            res = await default_intent_1.default.fallback({
                entities: request.result.entities,
                contexts: func_util_1.clone(request.result.contexts),
                confidence: e.confidence,
                query: request.result.query,
            });
        }
        else {
            res = await intentMap.get(e.name)({
                entities: request.result.entities,
                contexts: func_util_1.clone(request.result.contexts),
                confidence: e.confidence,
                query: request.result.query,
            });
        }
        if (res) {
            intentsRes.push(res);
        }
    }, Promise.resolve());
    // Get the most probable one
    let intentResult = await default_intent_1.default.fallback({
        entities: request.result.entities,
        contexts: func_util_1.clone(request.result.contexts),
        confidence: 0.01,
        query: request.result.query,
    });
    intentsRes.forEach(e => {
        if (e && intentResult.confidence < e.confidence) {
            intentResult = e;
        }
    });
    // Parse the response
    const parseResponseRequest = {
        intentResult,
        acceptedtypes: request.acceptedtypes,
        lang: request.lang,
    };
    const response = await parseResponse(parseResponseRequest);
    // Return the fulfill result
    const result = {
        response,
        contexts: intentResult.contexts,
    };
    return result;
}
exports.default = default_1;
/**
 * Get the match between intents name and function to call
 */
function getConfig() {
    return [
        {
            name: config_1.default.INTENTS.register,
            func: register_intent_1.default.register,
        },
        {
            name: config_1.default.INTENTS.registermail,
            func: register_intent_1.default.registerMail,
        },
        {
            name: config_1.default.INTENTS.registername,
            func: register_intent_1.default.registerName,
        },
        {
            name: config_1.default.INTENTS.registercode,
            func: register_intent_1.default.registerCode,
        },
        {
            name: config_1.default.INTENTS.openingtime,
            func: infos_intent_1.default.opentime,
        },
        {
            name: config_1.default.INTENTS.contact,
            func: infos_intent_1.default.contact,
        },
        {
            name: config_1.default.INTENTS.services,
            func: infos_intent_1.default.services,
        },
        {
            name: config_1.default.INTENTS.relaiscolis,
            func: infos_intent_1.default.relaiscolis,
        },
        {
            name: config_1.default.INTENTS.fallback,
            func: default_intent_1.default.fallback,
        },
    ];
}
/**
 * Return the response with the good language and random texts
 * @param response the full response
 * @param types the accepted types
 * @param lang the level of language
 */
async function parseResponse(request) {
    // Get the responses array
    const res = request.intentResult.response.responses;
    const types = request.acceptedtypes;
    const lang = request.lang;
    // Create parsed response
    const newres = {
        responses: [],
    };
    // Build it
    res.reduce(async (previous, r) => {
        await previous;
        if (!r.desc) {
            if (types.includes(Object.keys(r)[0])) {
                if (typeof r.text !== 'undefined') {
                    const texts = r[lang];
                    const text = texts[Math.floor(Math.random() * texts.length)];
                    const realtxt = await getTextFormated(text, request.intentResult.contexts);
                    newres.responses.push({
                        text: realtxt,
                    });
                }
                else if (typeof r.media !== 'undefined') {
                    newres.responses.push({
                        media: r.media,
                    });
                }
                else if (typeof r.link !== 'undefined') {
                    newres.responses.push({
                        link: r.link,
                    });
                }
                else if (typeof r.btn !== 'undefined') {
                    const btns = r[lang];
                    const realbtns = [];
                    btns.reduce(async (prev, b) => {
                        await prev;
                        realbtns.push({
                            text: await getTextFormated(b.text, request.intentResult.contexts),
                            value: b.value,
                        });
                    }, Promise.resolve());
                    newres.responses.push({
                        btn: {
                            btns: realbtns,
                            nextaction: r.nextaction,
                        },
                    });
                }
                else if (typeof r.dropdown !== 'undefined') {
                    const opts = r[lang];
                    const realopts = [];
                    opts.reduce(async (prev, b) => {
                        await prev;
                        realopts.push({
                            text: await getTextFormated(b.text, request.intentResult.contexts),
                            value: b.value,
                        });
                    }, Promise.resolve());
                    newres.responses.push({
                        dropdown: {
                            opts: realopts,
                            nextaction: r.nextaction,
                        },
                    });
                }
            }
        }
    }, Promise.resolve());
    return newres;
}
/**
 * Return a text with the parameters inside
 * @param text the text you want to format
 * @param params the parameters for your text
 */
async function getTextFormated(text, params) {
    await i18next_1.default.init({
        lng: 'lang',
        resources: {
            lang: {
                translation: {
                    key: text,
                },
            },
        },
    });
    return i18next_1.default.t('key', {
        site: params.site,
        user: params.user,
        concierges: params.concierges,
    });
}


/***/ }),

/***/ "./src/utils/fulfill/default.intent.ts":
/*!*********************************************!*\
  !*** ./src/utils/fulfill/default.intent.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responsemanager_util_1 = __importDefault(__webpack_require__(/*! ../responsemanager.util */ "./src/utils/responsemanager.util.ts"));
async function fallback(request) {
    const res = {
        confidence: request.confidence,
        contexts: request.contexts,
        response: await responsemanager_util_1.default.load('fallback'),
    };
    return res;
}
exports.default = {
    fallback,
};


/***/ }),

/***/ "./src/utils/fulfill/infos.intent.ts":
/*!*******************************************!*\
  !*** ./src/utils/fulfill/infos.intent.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responsemanager_util_1 = __importDefault(__webpack_require__(/*! ../responsemanager.util */ "./src/utils/responsemanager.util.ts"));
async function opentime(request) {
    let txt = await responsemanager_util_1.default.load('intent.infos.schedulenotfound');
    if (request.contexts.site) {
        txt = await responsemanager_util_1.default.load('intent.infos.schedule');
    }
    const res = {
        confidence: request.confidence,
        contexts: request.contexts,
        response: txt,
    };
    return res;
}
async function contact(request) {
    let txt = await responsemanager_util_1.default.load('intent.infos.contactnotfound');
    if (request.contexts.site) {
        txt = await responsemanager_util_1.default.load('intent.infos.contact');
    }
    const res = {
        confidence: request.confidence,
        contexts: request.contexts,
        response: txt,
    };
    return res;
}
async function services(request) {
    let txt = await responsemanager_util_1.default.load('intent.infos.servicesnotfound');
    if (request.contexts.site) {
        txt = await responsemanager_util_1.default.load('intent.infos.services');
    }
    const res = {
        confidence: request.confidence,
        contexts: request.contexts,
        response: txt,
    };
    return res;
}
async function relaiscolis(request) {
    let txt = await responsemanager_util_1.default.load('intent.infos.relaiscolisnotfound');
    if (request.contexts.site) {
        txt = await responsemanager_util_1.default.load('intent.infos.relaiscolis');
    }
    const res = {
        confidence: request.confidence,
        contexts: request.contexts,
        response: txt,
    };
    return res;
}
exports.default = {
    opentime,
    contact,
    services,
    relaiscolis,
};


/***/ }),

/***/ "./src/utils/fulfill/register.intent.ts":
/*!**********************************************!*\
  !*** ./src/utils/fulfill/register.intent.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responsemanager_util_1 = __importDefault(__webpack_require__(/*! ../responsemanager.util */ "./src/utils/responsemanager.util.ts"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
const ecl_1 = __importDefault(__webpack_require__(/*! ../../models/ecl */ "./src/models/ecl.ts"));
const message_util_1 = __webpack_require__(/*! ../message.util */ "./src/utils/message.util.ts");
const ecl = new ecl_1.default();
async function registration(c, siteGroup) {
    if (!c.site || !c.fulfill || !siteGroup || !c.user)
        return null;
    try {
        // Store registration request in database
        const token = await ecl.saveRegistration(c.site, c.user.userId || '?', c.user.email, c.user.lastname, c.user.firstname, siteGroup);
        const link = `${config_1.default.ECL.url}/inscription/verif_email.php?tok=${token}`;
        await message_util_1.sendMessage({
            from: c.site.email,
            to: c.user.email,
            subject: 'Votre inscription à la Conciergerie',
            html: '<html>' +
                '<head>' +
                ' <style type="text/css">' +
                '   p {' +
                '     text-align: justify;' +
                '     font-family:Calibri, sans-serif;' +
                '   }' +
                ' </style>' +
                '</head>' +
                '<body>' +
                ` <p>Bonjour ${c.user.firstname},</p><br />` +
                ' <p>Nous avons bien pris en compte votre inscription à la conciergerie. ' +
                'Afin de vérifier votre adresse mail, merci de cliquer sur le lien suivant:</p>' +
                ` <a href="${link}">Vérifier mon adresse mail</a>` +
                ' <p>Une fois votre adresse vérifiée, votre compte sera actif dans les deux jours ouvrables suivant votre inscription.</p><br>' +
                ' <p>À très bientôt à la conciergerie !</p>' +
                ' <p>Au plaisir de vous rendre service.</p>' +
                '</body>' +
                '</html>',
        });
        return true;
    }
    catch (err) {
        // Send registration request by mail to concierge
        const nomConcierge = ecl_1.default.getPrenomConcierge(c.concierges, false);
        await message_util_1.sendMessage({
            from: config_1.default.MAIL.sender,
            to: c.site.email,
            subject: `[Lifee] Nouvelle inscription à saisir`,
            text: `Salut ${nomConcierge}, c'est Lifee !\n\nL'utilisateur suivant souhaite s'inscrire:\n\n  Son nom: ${c.user.lastname}\n  Son Prénom: ${c.user.firstname}\n  Son Email: ${c.user.lastname}\n  Son N°: ${c.user.userId || '?'}\n  Sa conciergerie: ${c.site
                .libelle || '?'}\n  Son code de regroupement: ${siteGroup ? siteGroup.nom : '?'}\n\nMerci de procéder à son inscription.\n\nBonne journée !`,
        }, true);
        return null;
    }
}
async function register(request) {
    if (!request.contexts.fulfill)
        return null;
    request.contexts.fulfill = [config_1.default.CONTEXTS.FULFILL.register];
    const res = {
        confidence: request.confidence,
        contexts: request.contexts,
        response: await responsemanager_util_1.default.load('intent.register.askmail'),
    };
    return res;
}
async function registerMail(request) {
    if (!request.contexts.fulfill || !request.contexts.user)
        return null;
    let conf = request.confidence;
    if (request.contexts.fulfill &&
        request.contexts.fulfill.includes(config_1.default.CONTEXTS.FULFILL.register) &&
        request.entities.filter(e => e.name === 'builtin.email').length > 0) {
        request.contexts.user.email = request.entities.filter(e => e.name === 'builtin.email')[0].value;
        request.contexts.fulfill = [config_1.default.CONTEXTS.FULFILL.registermail];
    }
    else {
        conf = 0;
    }
    const res = {
        contexts: request.contexts,
        response: await responsemanager_util_1.default.load('intent.register.askfirstname'),
        confidence: conf,
    };
    return res;
}
async function registerName(request) {
    if (!request.contexts.fulfill || !request.contexts.user)
        return null;
    let conf = request.confidence;
    const names = request.entities.filter(e => e.name === 'name');
    let text = await responsemanager_util_1.default.load('default.fallback');
    let name = null;
    if (names.length > 0) {
        name = names[0].value;
    }
    else if (request.query.split(' ').length === 1) {
        name = request.query;
    }
    if (request.contexts.fulfill &&
        request.contexts.fulfill.includes(config_1.default.CONTEXTS.FULFILL.registermail) &&
        name) {
        request.contexts.fulfill = [config_1.default.CONTEXTS.FULFILL.registermail];
        if (request.contexts.user.firstname) {
            request.contexts.user.lastname = name;
            if (request.contexts.site) {
                // User site group is needed
                const groups = await ecl.getSiteGroups(request.contexts.site.id);
                if (groups.length > 1) {
                    request.contexts.fulfill = [config_1.default.CONTEXTS.FULFILL.registercode];
                    text = await responsemanager_util_1.default.load('intent.register.askcode');
                }
                else {
                    request.contexts.fulfill = [];
                    if (registration(request.contexts, groups.length ? groups[0] : null)) {
                        text = await responsemanager_util_1.default.load('intent.register.done_after_validation');
                    }
                    else {
                        text = await responsemanager_util_1.default.load('intent.register.done');
                    }
                }
            }
            else {
                request.contexts.fulfill = [config_1.default.CONTEXTS.FULFILL.registercode];
                text = await responsemanager_util_1.default.load('intent.register.askcode');
            }
        }
        else {
            request.contexts.user.firstname = name;
            text = await responsemanager_util_1.default.load('intent.register.asklastname');
        }
        conf = 0.9;
    }
    else {
        conf = 0;
    }
    const res = {
        response: text,
        contexts: request.contexts,
        confidence: conf,
    };
    return res;
}
async function registerCode(request) {
    if (!request.contexts.fulfill || !request.contexts.user)
        return null;
    let conf = request.confidence;
    let txt = await responsemanager_util_1.default.load('default.fallback');
    if (request.contexts.fulfill &&
        request.contexts.fulfill.includes(config_1.default.CONTEXTS.FULFILL.registercode) &&
        request.entities.filter(e => e.name === 'builtin.number').length > 0 &&
        request.contexts.site) {
        const siteGroupNumber = parseInt(request.entities.filter(e => e.name === 'builtin.number')[0].value, 10);
        // Check given number exists in ECL
        const groups = await ecl.getSiteGroups(request.contexts.site.id);
        const siteGroup = siteGroupNumber && siteGroupNumber > 0 && siteGroupNumber <= groups.length
            ? groups[siteGroupNumber - 1]
            : undefined;
        if (!siteGroup) {
            txt = await responsemanager_util_1.default.load('intent.register.ask_site_group_again');
        }
        else {
            request.contexts.fulfill = [];
            request.contexts.user.siteGroup = siteGroupNumber;
            if (registration(request.contexts, siteGroup)) {
                txt = await responsemanager_util_1.default.load('intent.register.done_after_validation');
            }
            else {
                txt = await responsemanager_util_1.default.load('intent.register.done');
            }
        }
        conf = 0.9;
    }
    else {
        conf = 0;
    }
    const res = {
        contexts: request.contexts,
        response: txt,
        confidence: conf,
    };
    return res;
}
exports.default = {
    register,
    registerMail,
    registerName,
    registerCode,
};


/***/ }),

/***/ "./src/utils/func.util.ts":
/*!********************************!*\
  !*** ./src/utils/func.util.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Clone a Json object
 * @param src the object to clone
 */
function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
exports.clone = clone;


/***/ }),

/***/ "./src/utils/handlemessage.util.ts":
/*!*****************************************!*\
  !*** ./src/utils/handlemessage.util.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const watson_util_1 = __importDefault(__webpack_require__(/*! ./services/watson.util */ "./src/utils/services/watson.util.ts"));
const luis_util_1 = __importDefault(__webpack_require__(/*! ./services/luis.util */ "./src/utils/services/luis.util.ts"));
const wit_util_1 = __importDefault(__webpack_require__(/*! ./services/wit.util */ "./src/utils/services/wit.util.ts"));
const sap_util_1 = __importDefault(__webpack_require__(/*! ./services/sap.util */ "./src/utils/services/sap.util.ts"));
const fulfill_util_1 = __importDefault(__webpack_require__(/*! ./fulfill.util */ "./src/utils/fulfill.util.ts"));
const contextsmanager_util_1 = __importDefault(__webpack_require__(/*! ./contextsmanager.util */ "./src/utils/contextsmanager.util.ts"));
const ecl_1 = __importDefault(__webpack_require__(/*! ../models/ecl */ "./src/models/ecl.ts"));
/**
 * Get contexts relative to the user site
 * @param to Phone number or slack id of the media where the message arrived : string
 * @param platform Platform which received the message (slack, tel) : string
 * @returns An object which contains the informations relative to the user site : SiteContexts
 */
async function getSiteContexts(to, platform) {
    let service = 'twilio';
    if (platform === 'slack') {
        service = 'slack';
    }
    if (!to)
        throw Error(`Unknown to for service ${service}`);
    const Ecl = new ecl_1.default();
    const site = await Ecl.getSiteInfos(service, to);
    if (!site)
        throw Error(`Unknown Site for service ${service} with id ${to}`);
    const concierges = await Ecl.getConciergeList(site.code);
    return {
        concierges,
        site,
    };
}
/**
 * Handle a message and return a response
 * @param msg Message sent by user : string
 * @param from User mail or phone number : string
 * @param to Slack code or phone number : string
 * @param service NLP to use (sap, luis, watson, wit) : string
 * @param platform Type of the platform (slack, tel) : string
 * @param acceptedtypes Types accepted by the platform (text, button, dropdown, image, link) : string[]
 * @returns An array of objects containing the responses : any
 */
async function default_1(request) {
    if (!request.service && !request.result)
        return null;
    /* Get contexts */
    const contexts = await contextsmanager_util_1.default.load(request.from);
    const a = await getSiteContexts(request.to, request.platform);
    contexts.site = a.site;
    contexts.concierges = a.concierges;
    if (request.service) {
        /* Get service (NLP) Result */
        const serviceRequest = {
            contexts,
            msg: request.msg,
        };
        switch (request.service) {
            case 'watson':
                request.result = await watson_util_1.default(serviceRequest);
                break;
            case 'luis':
                request.result = await luis_util_1.default(serviceRequest);
                break;
            case 'wit':
                request.result = await wit_util_1.default(serviceRequest);
                break;
            case 'sap':
                request.result = await sap_util_1.default(serviceRequest);
                break;
            default:
                request.result = {
                    contexts,
                    response: null,
                    intents: [],
                    entities: [],
                    query: request.msg,
                };
        }
    }
    else if (request.result) {
        request.result.contexts = contexts;
    }
    /* Change language */
    let lang = 'fr-tu';
    if (request.to === '+33755536910') {
        lang = 'fr-vous';
    }
    /* Get fulfill Response */
    if (!request.result)
        return null;
    const fulfillRequest = {
        lang,
        result: request.result,
        acceptedtypes: request.acceptedtypes,
    };
    const response = await fulfill_util_1.default(fulfillRequest);
    /* Save contexts */
    await contextsmanager_util_1.default.save(request.from, response.contexts);
    /* Return response text */
    return response.response;
}
exports.default = default_1;


/***/ }),

/***/ "./src/utils/message.util.ts":
/*!***********************************!*\
  !*** ./src/utils/message.util.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(__webpack_require__(/*! nodemailer */ "nodemailer"));
const config_1 = __importDefault(__webpack_require__(/*! ../config/ */ "./src/config/index.ts"));
const transporter = nodemailer.createTransport({
    host: config_1.default.MAIL.host,
    port: config_1.default.MAIL.port,
    secure: config_1.default.MAIL.secure,
    // auth: {
    //     user: 'xxx@xx.com',
    //     pass: 'xxxx'
    // },
    tls: { rejectUnauthorized: false },
});
/**
 * Send a mail
 * @param options The mail to send
 * @param throwError if true the function can throw errors
 */
exports.sendMessage = async (options, throwError = true) => {
    try {
        if (config_1.default.MAIL.enable) {
            const mailOptions = Object.assign({}, options, { to: config_1.default.MAIL.recipient || options.to });
            const result = await transporter.sendMail(mailOptions);
        }
    }
    catch (e) {
        if (throwError)
            throw e;
    }
};


/***/ }),

/***/ "./src/utils/responsemanager.util.ts":
/*!*******************************************!*\
  !*** ./src/utils/responsemanager.util.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_1 = __importDefault(__webpack_require__(/*! nedb */ "nedb"));
// Connect to a DB stored in DB/responses
const db = new nedb_1.default({ filename: 'DB/responses', autoload: true });
/**
 * Insert datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const insert = async (query) => {
    return new Promise((resolve, reject) => {
        db.insert(query, (err, newDoc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(newDoc);
            }
        });
    });
};
/**
 * Update datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const update = async (query) => {
    return new Promise((resolve, reject) => {
        db.update({ intent: query.intent }, query.all, {}, (err, numReplaced) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(numReplaced);
            }
        });
    });
};
/**
 * Find one row in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const findone = async (query) => {
    return new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
};
/**
 * Find datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const find = async (query) => {
    return new Promise((resolve, reject) => {
        db.find(query, (err, docs) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(docs);
            }
        });
    });
};
/**
 * Save an intent response in the DB, the intent must already exists
 * @param response the response object
 */
async function save(response) {
    await update({ intent: response.intent, all: response });
}
/**
 * Load an intent by it's name
 * @param intent the intent name with the type like 'type.intent'
 */
async function load(intent) {
    let response = await findone({ intent });
    if (!response) {
        response = await findone({ intent: 'fallback' });
    }
    return response;
}
/**
 * Get the different intents for a given type
 * @param type the intent type like 'type.intent'
 */
async function loadtype(type) {
    const files = await find({ type });
    if (files) {
        const realfiles = [];
        files.forEach((f) => {
            realfiles.push(f.intent.split('.')[1]);
        });
        return realfiles;
    }
    return [];
}
/**
 * Get the different types
 */
async function gettypes() {
    const response = await find({});
    if (response) {
        const res = [];
        response.forEach((r) => {
            if (!res.includes(r.type)) {
                res.push(r.type);
            }
        });
        return res;
    }
    return [];
}
/**
 * Load an intent response and return the object
 * @param intent intent name with the type like 'type.intent'
 */
async function loadfile(intent) {
    let response = await findone({ intent });
    if (!response) {
        response = await findone({ intent: 'default.fallback' });
    }
    delete response._id;
    return response;
}
exports.default = {
    save,
    load,
    loadtype,
    gettypes,
    loadfile,
};


/***/ }),

/***/ "./src/utils/services/luis.util.ts":
/*!*****************************************!*\
  !*** ./src/utils/services/luis.util.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = __importDefault(__webpack_require__(/*! querystring */ "querystring"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
const async_util_1 = __webpack_require__(/*! ../async.util */ "./src/utils/async.util.ts");
async function default_1(request) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: request.msg,
        contexts: request.contexts,
    };
    try {
        const endpoint = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';
        const appId = config_1.default.LUIS.appId;
        const endpointkey = config_1.default.LUIS.endpointKey;
        const queryParams = {
            verbose: true,
            q: request.msg,
            'subscription-key': endpointkey,
        };
        const req = `${endpoint}${appId}?${querystring_1.default.stringify(queryParams)}`;
        let res = await async_util_1.execrequest(req);
        res = JSON.parse(res.body);
        res.intents.forEach((e) => {
            result.intents.push({
                name: e.intent,
                confidence: e.score,
            });
        });
        result.entities = [];
        res.entities.forEach((e) => {
            result.entities.push({
                name: e.type,
                value: e.entity,
            });
        });
        return result;
    }
    catch (err) {
        return result;
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/utils/services/sap.util.ts":
/*!****************************************!*\
  !*** ./src/utils/services/sap.util.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
const async_util_1 = __webpack_require__(/*! ../async.util */ "./src/utils/async.util.ts");
const uuid_1 = __importDefault(__webpack_require__(/*! uuid */ "uuid"));
/**
 * Get intents and entities from SAP relative to a message
 * @param msg the user message
 * @param contexts the contexts (not usefull here but can be for dialogflow or watson)
 * @returns an object containing the result and the contexts
 */
async function default_1(request) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: request.msg,
        contexts: request.contexts,
    };
    try {
        let res = await async_util_1.execrequest({
            url: 'https://api.cai.tools.sap/build/v1/dialog',
            method: 'POST',
            headers: {
                Authorization: `Token ${config_1.default.SAP.token}`,
                'Content-Type': 'application/json',
            },
            json: {
                message: {
                    content: request.msg,
                    type: 'text',
                },
                conversation_id: uuid_1.default(),
            },
        });
        res = res.body.results.nlp;
        res.intents.forEach((e) => {
            result.intents.push({
                name: e.slug,
                confidence: e.confidence,
            });
        });
        let key;
        // tslint:disable-next-line: forin
        for (key in res.entities) {
            res.entities[key].forEach((e) => {
                result.entities.push({
                    name: key,
                    value: e.raw,
                });
            });
        }
        return result;
    }
    catch (e) {
        return result;
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/utils/services/watson.util.ts":
/*!*******************************************!*\
  !*** ./src/utils/services/watson.util.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v2_1 = __importDefault(__webpack_require__(/*! watson-developer-cloud/assistant/v2 */ "watson-developer-cloud/assistant/v2"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
const createSession = async (assistant, obj) => {
    // tslint:disable-next-line: no-unused-expression
    return new Promise((resolve, reject) => {
        assistant.createSession(obj, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
};
const sendMessage = async (assistant, obj) => {
    // tslint:disable-next-line: no-unused-expression
    return new Promise((resolve, reject) => {
        assistant.message(obj, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
};
async function default_1(request) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: request.msg,
        contexts: request.contexts,
    };
    try {
        // Create assistant
        const assistant = new v2_1.default({
            iam_apikey: config_1.default.WATSON.apiKey,
            version: '2018-09-20',
            url: 'https://gateway-lon.watsonplatform.net/assistant/api',
        });
        const assistantId = config_1.default.WATSON.assistantId;
        const session = await createSession(assistant, {
            assistant_id: assistantId,
        });
        const sessionId = session.session_id;
        request.contexts.service.watsonId = sessionId;
        const res = await sendMessage(assistant, {
            assistant_id: assistantId,
            session_id: sessionId,
            input: {
                message_type: 'text',
                text: request.msg,
                options: {
                    return_context: true,
                },
            },
            contexts: request.contexts.service.watson,
        });
        request.contexts.service.watson = res.context;
        result.response = res.output.generic[0].text;
        res.output.intents.forEach((e) => {
            result.intents.push({
                confidence: e.confidence,
                name: e.intent,
            });
        });
        result.entities = [];
        res.output.entities.forEach((e) => {
            result.entities.push({
                name: e.entity,
                value: request.msg.substring(e.location[0], e.location[1]),
            });
        });
        return result;
    }
    catch (err) {
        return result;
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/utils/services/wit.util.ts":
/*!****************************************!*\
  !*** ./src/utils/services/wit.util.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_wit_1 = __webpack_require__(/*! node-wit */ "node-wit");
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
async function default_1(request) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: request.msg,
        contexts: request.contexts,
    };
    try {
        const client = new node_wit_1.Wit({ accessToken: config_1.default.WIT.accesstoken });
        const res = await client.message(request.msg, {});
        let key;
        for (key in res.entities) {
            if (key === 'intent') {
                res.entities.intent.forEach((e) => {
                    result.intents.push({
                        name: e.value,
                        confidence: e.confidence,
                    });
                });
            }
            else {
                res.entities[key].forEach((e) => {
                    result.entities.push({
                        name: key,
                        value: e.value,
                    });
                });
            }
        }
        return result;
    }
    catch (e) {
        return result;
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/utils/trainingmanager.util.ts":
/*!*******************************************!*\
  !*** ./src/utils/trainingmanager.util.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_util_1 = __webpack_require__(/*! ./async.util */ "./src/utils/async.util.ts");
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
const uuid_1 = __importDefault(__webpack_require__(/*! uuid */ "uuid"));
/**
 * Get all the intents name in SAP recast
 * @returns a list of intents name : string[]
 */
async function getIntents() {
    let res = await async_util_1.execrequest({
        url: `https://api.cai.tools.sap/train/v2/users/${config_1.default.SAP.userslug}/bots/${config_1.default.SAP.botslug}/versions/${config_1.default.SAP.versionslug}/dataset/intents`,
        method: 'GET',
        headers: {
            Authorization: `Token ${config_1.default.SAP.devtoken}`,
        },
    });
    res = JSON.parse(res.body);
    const intents = [];
    res.results.forEach((r) => {
        intents.push(r.name);
    });
    return intents;
}
/**
 * Get the different intent types which are formed like 'type-intent'
 * @returns a list of types name : string []
 */
async function getTypes() {
    const intents = await getIntents();
    const types = [];
    intents.forEach((i) => {
        types.push(i.split('-')[0]);
    });
    return types;
}
/**
 * Get all the intents name for one type without the type like 'type-intentname'
 * @param type name of a type : string
 * @returns a list of intents name : string[]
 */
async function loadtype(type) {
    const intents = await getIntents();
    const files = [];
    intents.forEach((i) => {
        if (i.split('-')[0] === type) {
            files.push(i.split('-')[1]);
        }
    });
    return files;
}
/**
 * Get the expressions for one intent
 * @param file the intent name with the type like 'type-intent'
 * @returns a list of expressions see SAP doc to have the structure : any[]
 */
async function loadexpressions(file) {
    let res = await async_util_1.execrequest({
        url: `https://api.cai.tools.sap/train/v2/users/${config_1.default.SAP.userslug}/bots/${config_1.default.SAP.botslug}/versions/${config_1.default.SAP.versionslug}/dataset/intents/${file}/expressions`,
        method: 'GET',
        headers: {
            Authorization: `Token ${config_1.default.SAP.devtoken}`,
        },
    });
    res = JSON.parse(res.body);
    return res.results;
}
/**
 * Get a json which represent the training sentences of an intent
 * @param file the intent name with the type like 'type-intent'
 * @returns a list of sentences : string[]
 */
async function loadfile(file) {
    const res = await loadexpressions(file);
    const expressions = [];
    await res.reduce(async (previous, e) => {
        await previous;
        let r = await async_util_1.execrequest({
            url: `https://api.cai.tools.sap/train/v2/users/${config_1.default.SAP.userslug}/bots/${config_1.default.SAP.botslug}/versions/${config_1.default.SAP.versionslug}/dataset/intents/${file}/expressions/${e.id}`,
            method: 'GET',
            headers: {
                Authorization: `Token ${config_1.default.SAP.devtoken}`,
            },
        });
        r = JSON.parse(r.body);
        expressions.push(r.results);
    }, Promise.resolve());
    const final = [];
    expressions.forEach((e) => {
        let sentence = e.source;
        e.tokens.forEach((t) => {
            if (t.entity !== null) {
                sentence = sentence
                    .split(t.word.name)
                    .join(`{{ ${t.word.name} | ${t.entity.slug} }}`);
            }
        });
        final.push(sentence);
    });
    return final;
}
async function updatefile(file, newfile) {
    // Delete all expressions
    /*const res = await loadexpressions(file);
    await res.results.reduce(async (previous: any, e: any) => {
      await previous;
      await execrequest({
        url: `https://api.cai.tools.sap/train/v2/users/${
          config.SAP.userslug
        }/bots/${config.SAP.botslug}/versions/${
          config.SAP.versionslug
        }/dataset/intents/${file}/expressions/${e.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${config.SAP.devtoken}`,
        },
      });
    }, Promise.resolve());*/
    // Create new expressions
    const expressions = [];
    newfile.forEach((e) => {
        let src = e;
        const toks = [];
        while (src.indexOf('{{') !== -1) {
            const a = src.indexOf('{{') + 2;
            const b = src.indexOf('}}');
            const txt = src.substring(a, b);
            const type = txt.split('|')[1].trim();
            const val = txt.split('|')[0].trim();
            src = src.substring(0, a - 2) + val + src.substring(b + 2, src.length);
            toks.push({
                id: uuid_1.default(),
                space: false,
                word: {
                    id: uuid_1.default(),
                    name: val,
                    slug: val,
                },
                entity: {
                    id: uuid_1.default(),
                    name: type.toUpperCase(),
                    slug: type,
                },
            });
        }
        expressions.push({
            id: uuid_1.default(),
            source: src,
            tokens: toks,
            language: {
                id: '996ad860-2a9a-504f-8861-aeafd0b2ae29',
                name: 'French',
                slug: 'french',
                isocode: 'fr',
                support: 'advanced',
            },
        });
    });
    const res = await async_util_1.execrequest({
        url: `https://api.cai.tools.sap/train/v2/users/${config_1.default.SAP.userslug}/bots/${config_1.default.SAP.botslug}/versions/${config_1.default.SAP.versionslug}/dataset/intents/${file}/expressions/bulk_create`,
        method: 'POST',
        headers: {
            Authorization: `Token ${config_1.default.SAP.devtoken}`,
            'Content-Type': 'application/json',
        },
        json: {
            expressions,
        },
    });
}
exports.default = {
    getIntents,
    getTypes,
    loadtype,
    loadfile,
    updatefile,
};


/***/ }),

/***/ "./src/utils/translate.util.ts":
/*!*************************************!*\
  !*** ./src/utils/translate.util.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
/**
 * Get a random response in the good language
 * @param key Key for the text : string
 * @param params Parameters to put on the text: any
 * @returns A response : string
 */
function default_1(key, params = null) {
    let parameters = params;
    if (!parameters) {
        parameters = {};
    }
    parameters.returnObjects = true;
    const possibilities = i18next_1.default.t(key, parameters);
    if (Array.isArray(possibilities)) {
        return possibilities[Math.floor(Math.random() * possibilities.length)];
    }
    return possibilities;
}
exports.default = default_1;


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

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

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next");

/***/ }),

/***/ "json-to-pretty-yaml":
/*!**************************************!*\
  !*** external "json-to-pretty-yaml" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("json-to-pretty-yaml");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "nedb":
/*!***********************!*\
  !*** external "nedb" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nedb");

/***/ }),

/***/ "node-wit":
/*!***************************!*\
  !*** external "node-wit" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-wit");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),

/***/ "watson-developer-cloud/assistant/v2":
/*!******************************************************!*\
  !*** external "watson-developer-cloud/assistant/v2" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("watson-developer-cloud/assistant/v2");

/***/ }),

/***/ "yamljs":
/*!*************************!*\
  !*** external "yamljs" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yamljs");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcY29uZmlnXFxpMThuLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcY29uZmlnXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXGNvbnRyb2xsZXJzXFxhamF4LmNvbnRyb2xsZXIudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcd2ViYXBwLmNvbnRyb2xsZXJzLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcbW9kZWxzXFxlY2wudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFxyb3V0ZXNcXGluZGV4LnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xccm91dGVzXFx0ZXN0LnJvdXRlcy50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHJvdXRlc1xcd2ViYXBwLnJvdXRlcy50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHNlcnZlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHV0aWxzXFxhc3luYy51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcdXRpbHNcXGNvbnRleHRzbWFuYWdlci51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcdXRpbHNcXGZ1bGZpbGwudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsXFxkZWZhdWx0LmludGVudC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsXFxpbmZvcy5pbnRlbnQudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFx1dGlsc1xcZnVsZmlsbFxccmVnaXN0ZXIuaW50ZW50LnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcdXRpbHNcXGZ1bmMudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHV0aWxzXFxoYW5kbGVtZXNzYWdlLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFx1dGlsc1xcbWVzc2FnZS51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcdXRpbHNcXHJlc3BvbnNlbWFuYWdlci51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcdXRpbHNcXHNlcnZpY2VzXFxsdWlzLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFx1dGlsc1xcc2VydmljZXNcXHNhcC51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZURvY1xcbGlmZWVcXHNyY1xcdXRpbHNcXHNlcnZpY2VzXFx3YXRzb24udXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVEb2NcXGxpZmVlXFxzcmNcXHV0aWxzXFxzZXJ2aWNlc1xcd2l0LnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFx1dGlsc1xcdHJhaW5pbmdtYW5hZ2VyLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlRG9jXFxsaWZlZVxcc3JjXFx1dGlsc1xcdHJhbnNsYXRlLnV0aWwudHMiLCJleHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJleHRlcm5hbCBcImRvdGVudlwiIiwiZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJleHRlcm5hbCBcImkxOG5leHRcIiIsImV4dGVybmFsIFwianNvbi10by1wcmV0dHkteWFtbFwiIiwiZXh0ZXJuYWwgXCJtb21lbnRcIiIsImV4dGVybmFsIFwibmVkYlwiIiwiZXh0ZXJuYWwgXCJub2RlLXdpdFwiIiwiZXh0ZXJuYWwgXCJub2RlbWFpbGVyXCIiLCJleHRlcm5hbCBcInF1ZXJ5c3RyaW5nXCIiLCJleHRlcm5hbCBcInJlcXVlc3RcIiIsImV4dGVybmFsIFwic2VxdWVsaXplXCIiLCJleHRlcm5hbCBcInV1aWRcIiIsImV4dGVybmFsIFwid2F0c29uLWRldmVsb3Blci1jbG91ZC9hc3Npc3RhbnQvdjJcIiIsImV4dGVybmFsIFwieWFtbGpzXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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LGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUN4RTtJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFYRCw0QkFXQzs7Ozs7Ozs7Ozs7O0FDbkJELHdDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGdEOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLHVDOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGdFOzs7Ozs7Ozs7OztBQ0FBLG1DIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NlcnZlci50c1wiKTtcbiIsImltcG9ydCBpMThuIGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0IGkxOG5leHRCYWNrZW5kIGZyb20gJ2kxOG5leHQtbm9kZS1mcy1iYWNrZW5kJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuLyppMThuLnVzZShpMThuZXh0QmFja2VuZCkuaW5pdCh7XG4gIGxuZzogJ2ZyLXR1JyxcbiAgZmFsbGJhY2tMbmc6ICdmci10dScsXG4gIHByZWxvYWQ6IFsnZnItdHUnXSxcbiAgc2F2ZU1pc3Npbmc6IHRydWUsXG4gIGRlYnVnOiBpc0RldixcbiAgaW50ZXJwb2xhdGlvbjoge1xuICAgIGZvcm1hdDogKHZhbHVlLCBmb3JtYXQpID0+IHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdjYXBpdGFsaXplJylcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gbW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9LFxuICBiYWNrZW5kOiB7XG4gICAgLy8gcGF0aCB3aGVyZSByZXNvdXJjZXMgZ2V0IGxvYWRlZCBmcm9tXG4gICAgbG9hZFBhdGg6ICdsb2NhbGVzL3t7bG5nfX0ve3tuc319Lmpzb24nLFxuICAgIC8vIHBhdGggdG8gcG9zdCBtaXNzaW5nIHJlc291cmNlc1xuICAgIGFkZFBhdGg6ICdsb2NhbGVzL3t7bG5nfX0ve3tuc319Lm1pc3NpbmcuanNvbicsXG4gICAgLy8ganNvbkluZGVudCB0byB1c2Ugd2hlbiBzdG9yaW5nIGpzb24gZmlsZXNcbiAgICBqc29uSW5kZW50OiAyLFxuICB9LFxufSk7Ki9cbiIsImltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZyh7IGRlYnVnOiB0cnVlIH0pO1xuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgUE9SVDogcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwLFxuICBERUJVRzogcHJvY2Vzcy5lbnYuREVCVUcgfHwgZmFsc2UsXG4gIEVDTDoge1xuICAgIHVybDogcHJvY2Vzcy5lbnYuRUNMX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdCcsXG4gIH0sXG4gIERCX0xPR0dJTkc6IGlzRGV2LFxuICBBUElfQUNDRVNTX1VTRVJOQU1FOiBwcm9jZXNzLmVudi5BUElfQUNDRVNTX1VTRVJOQU1FIHx8IG51bGwsXG4gIEFQSV9BQ0NFU1NfUEFTU1dPUkQ6IHByb2Nlc3MuZW52LkFQSV9BQ0NFU1NfUEFTU1dPUkQgfHwgbnVsbCxcbiAgREI6IHtcbiAgICB1c2VybmFtZTogcHJvY2Vzcy5lbnYuREJfVVNFUk5BTUUgfHwgJ2FkbWluJyxcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQgfHwgJ3Bhc3N3b3JkJyxcbiAgICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfREFUQUJBU0UgfHwgJ2RhdGFiYXNlJyxcbiAgICBob3N0OiBwcm9jZXNzLmVudi5EQl9IT1NUIHx8ICdsb2NhbGhvc3QnLFxuICAgIG9wdGlvbnM6IHsgZW5jcnlwdDogdHJ1ZSB9LFxuICAgIG9wZXJhdG9yc0FsaWFzZXM6IGZhbHNlLFxuICB9LFxuICBJTlRFTlRTOiB7XG4gICAgcmVnaXN0ZXI6IHByb2Nlc3MuZW52LklOVEVOVF9SRUdJU1RFUiB8fCAnJyxcbiAgICByZWdpc3Rlcm1haWw6IHByb2Nlc3MuZW52LklOVEVOVF9SRUdJU1RFUk1BSUwgfHwgJycsXG4gICAgcmVnaXN0ZXJuYW1lOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVHSVNURVJOQU1FIHx8ICcnLFxuICAgIHJlZ2lzdGVyY29kZTogcHJvY2Vzcy5lbnYuSU5URU5UX1JFR0lTVEVSQ09ERSB8fCAnJyxcbiAgICBvcGVuaW5ndGltZTogcHJvY2Vzcy5lbnYuSU5URU5UX09QRU5USU1FIHx8ICcnLFxuICAgIGNvbnRhY3Q6IHByb2Nlc3MuZW52LklOVEVOVF9DT05UQUNUIHx8ICcnLFxuICAgIHNlcnZpY2VzOiBwcm9jZXNzLmVudi5JTlRFTlRfU0VSVklDRVMgfHwgJycsXG4gICAgcmVsYWlzY29saXM6IHByb2Nlc3MuZW52LklOVEVOVF9SRUxBSVNDT0xJUyB8fCAnJyxcbiAgICBmYWxsYmFjazogcHJvY2Vzcy5lbnYuSU5URU5UX0ZBTExCQUNLIHx8ICcnLFxuICB9LFxuICBDT05URVhUUzoge1xuICAgIEZVTEZJTEw6IHtcbiAgICAgIHJlZ2lzdGVyOiBwcm9jZXNzLmVudi5DT05URVhUX0ZVTEZJTExfUkVHSVNURVIgfHwgJycsXG4gICAgICByZWdpc3Rlcm1haWw6IHByb2Nlc3MuZW52LkNPTlRFWFRfRlVMRklMTF9SRUdJU1RFUk1BSUwgfHwgJycsXG4gICAgICByZWdpc3RlcmNvZGU6IHByb2Nlc3MuZW52LkNPTlRFWFRfRlVMRklMTF9SRUdJU1RFUkNPREUgfHwgJycsXG4gICAgfSxcbiAgfSxcbiAgTFVJUzoge1xuICAgIGFwcElkOiBwcm9jZXNzLmVudi5MVUlTX0FQUF9JRCB8fCAnJyxcbiAgICBlbmRwb2ludEtleTogcHJvY2Vzcy5lbnYuTFVJU19FTkRQT0lOVF9LRVkgfHwgJycsXG4gIH0sXG4gIFdBVFNPTjoge1xuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuV0FUU09OX0FQSV9LRVkgfHwgJycsXG4gICAgYXNzaXN0YW50SWQ6IHByb2Nlc3MuZW52LldBVFNPTl9BU1NJU1RBTlRfSUQgfHwgJycsXG4gIH0sXG4gIFRXSUxJTzoge1xuICAgIGFjY291bnRJZDogcHJvY2Vzcy5lbnYuVFdJTElPX0FDQ09VTlRfSUQgfHwgJ3R3aWxpb19hY2NvdW50JyxcbiAgICBhdXRoVG9rZW46IHByb2Nlc3MuZW52LlRXSUxJT19BVVRIX1RPS0VOIHx8ICdhdXRoX3Rva2VuJyxcbiAgfSxcbiAgUExJVk86IHtcbiAgICBhY2NvdW50SWQ6IHByb2Nlc3MuZW52LlBMSVZPX0FDQ09VTlRfSUQgfHwgJ3BsaXZvX2FjY291bnQnLFxuICAgIGF1dGhUb2tlbjogcHJvY2Vzcy5lbnYuUExJVk9fQVVUSF9UT0tFTiB8fCAnYXV0aF90b2tlbicsXG4gIH0sXG4gIE5FWE1POiB7XG4gICAgYXBpS2V5OiBwcm9jZXNzLmVudi5ORVhNT19BUElfS0VZIHx8ICduZXhtb19hcGlfa2V5JyxcbiAgICBhcGlTZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWE1PX0FQSV9TRUNSRVQgfHwgJ25leG1vX2FwaV9zZWNyZXQnLFxuICB9LFxuICBESUFMT0dfRkxPVzoge1xuICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfUFJPSkVDVF9JRCB8fCAnYWdlbnQnLFxuICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19FTlZJUk9OTUVOVCB8fCAnZHJhZnQnLFxuICAgIGxhbmd1YWdlQ29kZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfTEFOR1VBR0VfQ09ERSB8fCAnZW4nLFxuICAgIHVzZXJuYW1lOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19VU0VSTkFNRSB8fCBudWxsLFxuICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19QQVNTV09SRCB8fCBudWxsLFxuICAgIGNvbnNvbGVTZXJ2aWNlOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19DT05TT0xFX1NFUlZJQ0UgfHwgJ2NvbnNvbGUnLFxuICAgIGNvbnNvbGVTZXJ2aWNlSWQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlNPTEVfU0VSVklDRV9JRCB8fCAnNjkxMCcsXG4gICAgY29uc29sZVVzZXJJZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfQ09OU09MRV9VU0VSX0lEIHx8ICcwREhTRU5KUDlaJyxcbiAgICBjb25zb2xlVXNlclR5cGU6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX1VTRVJfVFlQRSB8fCAndXNlcklkJyxcbiAgfSxcbiAgU0xBQ0s6IHtcbiAgICBhcGlUb2tlbjogcHJvY2Vzcy5lbnYuU0xBQ0tfQVBJX1RPS0VOIHx8ICdzbGFja190b2tlbicsXG4gIH0sXG4gIE1BSUw6IHtcbiAgICBlbmFibGU6IHByb2Nlc3MuZW52Lk1BSUxfRU5BQkxFID09PSAndHJ1ZScgfHwgZmFsc2UsXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuTUFJTF9TTVRQX1NFUlZFUiB8fCAnbG9jYWxob3N0JyxcbiAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5NQUlMX1NNVFBfUE9SVCB8fCAnMjUnLCAxMCksXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5NQUlMX1NNVFBfU0VDVVJFID09PSAndHJ1ZScgfHwgZmFsc2UsXG4gICAgcmVjaXBpZW50OiBwcm9jZXNzLmVudi5NQUlMX1JFQ0lQSUVOVCB8fCB1bmRlZmluZWQsXG4gICAgc2VuZGVyOiBwcm9jZXNzLmVudi5NQUlMX1NFTkRFUiB8fCAnJyxcbiAgICBzYXY6IHByb2Nlc3MuZW52Lk1BSUxfU0FWIHx8ICdzZXJ2aWNlLXNpQGVhc3ktbGlmZS5mcicsXG4gIH0sXG4gIE5FREI6IHtcbiAgICB0dGw6IHBhcnNlSW50KHByb2Nlc3MuZW52Lk5FREJfVFRMIHx8ICcwJywgMTApLFxuICB9LFxuICBXSVQ6IHtcbiAgICBhY2Nlc3N0b2tlbjogcHJvY2Vzcy5lbnYuV0lUX0FDQ0VTU1RPS0VOIHx8ICcnLFxuICB9LFxuICBTQVA6IHtcbiAgICB0b2tlbjogcHJvY2Vzcy5lbnYuU0FQX1RPS0VOIHx8ICcnLFxuICAgIHVzZXJzbHVnOiBwcm9jZXNzLmVudi5TQVBfVVNFUlNMVUcgfHwgJycsXG4gICAgYm90c2x1ZzogcHJvY2Vzcy5lbnYuU0FQX0JPVFNMVUcgfHwgJycsXG4gICAgdmVyc2lvbnNsdWc6IHByb2Nlc3MuZW52LlNBUF9WRVJTSU9OU0xVRyB8fCAnJyxcbiAgICBkZXZ0b2tlbjogcHJvY2Vzcy5lbnYuU0FQX0RFVl9UT0tFTiB8fCAnJyxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRDb25maWc7XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBoYW5kbGVtZXNzYWdlIGZyb20gJy4uL3V0aWxzL2hhbmRsZW1lc3NhZ2UudXRpbCc7XG5pbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSwgUGFyc2VkUmVzcG9uc2UgfSBmcm9tICcuLi91dGlscy90eXBlcy51dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oXG4gIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuKSB7XG4gIHRyeSB7XG4gICAgaWYgKHJlcS5xdWVyeS5tc2cgJiYgcmVxLnF1ZXJ5LmZyb20pIHtcbiAgICAgIGNvbnN0IG1zZyA9IHJlcS5xdWVyeS5tc2c7XG4gICAgICBjb25zdCBmcm9tID0gcmVxLnF1ZXJ5LmZyb207XG4gICAgICBjb25zdCByZXF1ZXN0OiBSZXF1ZXN0ID0ge1xuICAgICAgICBtc2csXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvOiAnKzMzNzU1NTM2OTEwJyxcbiAgICAgICAgc2VydmljZTogJ3NhcCcsXG4gICAgICAgIHBsYXRmb3JtOiAndGVsJyxcbiAgICAgICAgYWNjZXB0ZWR0eXBlczogWyd0ZXh0JywgJ2J0bicsICdkcm9wZG93biddLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiBQYXJzZWRSZXNwb25zZSB8IG51bGwgPSBhd2FpdCBoYW5kbGVtZXNzYWdlKHJlcXVlc3QpO1xuICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgIHJldHVybiByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG4gICAgfVxuICB9IGNhdGNoIChleCkge1xuICAgIHJlcy53cml0ZUhlYWQoNTAwKTtcbiAgICByZXR1cm4gcmVzLmVuZCgnRXJyb3InKTtcbiAgfVxuICByZXMud3JpdGVIZWFkKDQwNCk7XG4gIHJldHVybiByZXMuZW5kKCdNaXNzaW5nIFwibXNnXCIgb3IgXCJmcm9tXCInKTtcbn1cbiIsImltcG9ydCBleHByZXNzLCB7IHJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcmVzcG9uc2VtYW5hZ2VyIGZyb20gJy4uL3V0aWxzL3Jlc3BvbnNlbWFuYWdlci51dGlsJztcbmltcG9ydCB0cmFpbmluZ21hbmFnZXIgZnJvbSAnLi4vdXRpbHMvdHJhaW5pbmdtYW5hZ2VyLnV0aWwnO1xuXG5pbXBvcnQganNvbjJweWFtbCBmcm9tICdqc29uLXRvLXByZXR0eS15YW1sJztcbmltcG9ydCB5YW1sIGZyb20gJ3lhbWxqcyc7XG5cbi8qKlxuICogU2hvdyB0aGUgZGlmZmVyZW50IHJlc3BvbnNlIGFuZCB0cmFpbmluZyB0eXBlc1xuICogQHBhcmFtIHJlcVxuICogQHBhcmFtIHJlc1xuICogQHBhcmFtIG5leHRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gaG9tZShcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgY29uc3QgcmVzdHlwZXMgPSBhd2FpdCByZXNwb25zZW1hbmFnZXIuZ2V0dHlwZXMoKTtcbiAgY29uc3QgdHJhaW50eXBlcyA9IGF3YWl0IHRyYWluaW5nbWFuYWdlci5nZXRUeXBlcygpO1xuICBjb25zdCB0eXBlcyA9IHJlc3R5cGVzO1xuICB0cmFpbnR5cGVzLmZvckVhY2goKHQ6IGFueSkgPT4ge1xuICAgIGlmICghdHlwZXMuaW5jbHVkZXModCkpIHtcbiAgICAgIHR5cGVzLnB1c2godCk7XG4gICAgfVxuICB9KTtcbiAgcmVzLnJlbmRlcignaG9tZS50d2lnJywgeyB0eXBlcyB9KTtcbn1cblxuLyoqXG4gKiBTaG93IHRoZSBkaWZmZXJlbnQgcmVzcG9uc2VzIGFuZCB0cmFpbmluZ3MgZm9yIG9uZSB0eXBlXG4gKiBAcGFyYW0gcmVxXG4gKiBAcGFyYW0gcmVzXG4gKiBAcGFyYW0gbmV4dFxuICovXG5hc3luYyBmdW5jdGlvbiB0eXBlKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBjb25zdCB0eXBlcGFyYW0gPSByZXEucGFyYW1zLnR5cGU7XG4gIGNvbnN0IHJlc3BvbnNlZmlsZXMgPSBhd2FpdCByZXNwb25zZW1hbmFnZXIubG9hZHR5cGUodHlwZXBhcmFtKTtcbiAgY29uc3QgdHJhaW5maWxlcyA9IGF3YWl0IHRyYWluaW5nbWFuYWdlci5sb2FkdHlwZSh0eXBlcGFyYW0pO1xuICByZXMucmVuZGVyKCd0eXBlLnR3aWcnLCB7IHJlc3BvbnNlZmlsZXMsIHRyYWluZmlsZXMsIHR5cGU6IHR5cGVwYXJhbSB9KTtcbn1cblxuLyoqXG4gKiBTaG93IGFuIGVkaXRvciB0byBlZGl0IHRoZSBmaWxlXG4gKiBAcGFyYW0gcmVxXG4gKiBAcGFyYW0gcmVzXG4gKiBAcGFyYW0gbmV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBmaWxlKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBjb25zdCB0eXBlcGFyYW0gPSByZXEucGFyYW1zLnR5cGU7XG4gIGNvbnN0IGNhdHBhcmFtID0gcmVxLnBhcmFtcy5jYXQ7XG4gIGNvbnN0IG5hbWVwYXJhbSA9IHJlcS5wYXJhbXMubmFtZTtcbiAgbGV0IGZpbGVyZXM6IGFueTtcbiAgaWYgKGNhdHBhcmFtID09PSAncmVzcG9uc2UnKSB7XG4gICAgZmlsZXJlcyA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkZmlsZShgJHt0eXBlcGFyYW19LiR7bmFtZXBhcmFtfWApO1xuICB9IGVsc2UgaWYgKGNhdHBhcmFtID09PSAndHJhaW5pbmcnKSB7XG4gICAgZmlsZXJlcyA9IGF3YWl0IHRyYWluaW5nbWFuYWdlci5sb2FkZmlsZShgJHt0eXBlcGFyYW19LSR7bmFtZXBhcmFtfWApO1xuICB9XG5cbiAgcmVzLnJlbmRlcignZmlsZS50d2lnJywge1xuICAgIGZpbGU6IGpzb24ycHlhbWwuc3RyaW5naWZ5KGZpbGVyZXMpLFxuICAgIHR5cGU6IHR5cGVwYXJhbSxcbiAgICBmaWxlbmFtZTogbmFtZXBhcmFtLFxuICAgIGNhdDogY2F0cGFyYW0sXG4gIH0pO1xufVxuXG4vKipcbiAqIFNhdmUgdGhlIGZpbGVcbiAqIEBwYXJhbSByZXFcbiAqIEBwYXJhbSByZXNcbiAqIEBwYXJhbSBuZXh0XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHNhdmUoXG4gIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuKSB7XG4gIGxldCBlcnJvciA9IG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QganNvbiA9IHlhbWwucGFyc2UocmVxLmJvZHkuY29kZSk7XG4gICAgaWYgKHJlcS5ib2R5LmNhdCA9PT0gJ3Jlc3BvbnNlJykge1xuICAgICAgYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLnNhdmUoanNvbik7XG4gICAgfSBlbHNlIGlmIChyZXEuYm9keS5jYXQgPT09ICd0cmFpbmluZycpIHtcbiAgICAgIGF3YWl0IHRyYWluaW5nbWFuYWdlci51cGRhdGVmaWxlKHJlcS5ib2R5LmZpbGUucmVwbGFjZSgnLicsICctJyksIGpzb24pO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGVycm9yID0gZTtcbiAgfVxuXG4gIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvciB9KSk7XG59XG5cbi8qKlxuICogR2V0IGFsbCB0aGUgdHlwZXMgYW5kIHRoZXJlIGZpbGVzXG4gKiBAcGFyYW0gcmVxXG4gKiBAcGFyYW0gcmVzXG4gKiBAcGFyYW0gbmV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRmaWxlcyhcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgdHJ5IHtcbiAgICBpZiAocmVxLmJvZHkudG9rZW4gPT09ICdNbUZKWW1rV2ExUWZnNzMwYzVnT1JKYUVPVHNCbVhmdycpIHtcbiAgICAgIGNvbnN0IHJlYWx0eXBlczogYW55W10gPSBbXTtcbiAgICAgIGNvbnN0IHJlc3R5cGVzID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmdldHR5cGVzKCk7XG4gICAgICBjb25zdCB0cmFpbnR5cGVzID0gYXdhaXQgdHJhaW5pbmdtYW5hZ2VyLmdldFR5cGVzKCk7XG4gICAgICBjb25zdCB0eXBlcyA9IHJlc3R5cGVzO1xuICAgICAgdHJhaW50eXBlcy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCF0eXBlcy5pbmNsdWRlcyh0KSkge1xuICAgICAgICAgIHR5cGVzLnB1c2godCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdHlwZXMucmVkdWNlKGFzeW5jIChwcmV2aW91czogYW55LCBlOiBhbnkpID0+IHtcbiAgICAgICAgYXdhaXQgcHJldmlvdXM7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlZmlsZXMgPSBhd2FpdCByZXNwb25zZW1hbmFnZXIubG9hZHR5cGUoZSk7XG4gICAgICAgIGNvbnN0IHRyYWluZmlsZXMgPSBhd2FpdCB0cmFpbmluZ21hbmFnZXIubG9hZHR5cGUoZSk7XG4gICAgICAgIHJlYWx0eXBlcy5wdXNoKHtcbiAgICAgICAgICByZXNwb25zZTogcmVzcG9uc2VmaWxlcyxcbiAgICAgICAgICB0cmFpbmluZzogdHJhaW5maWxlcyxcbiAgICAgICAgICBuYW1lOiBlLFxuICAgICAgICB9KTtcbiAgICAgIH0sIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHJlYWx0eXBlcykpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxuICByZXMud3JpdGVIZWFkKDQwNCwgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0pO1xuICByZXMuZW5kKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaG9tZSxcbiAgdHlwZSxcbiAgZmlsZSxcbiAgc2F2ZSxcbiAgZ2V0ZmlsZXMsXG59O1xuIiwiLy8gQGZsb3dcblxuaW1wb3J0IHsgU2VxdWVsaXplLCBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB0IGZyb20gJy4uL3V0aWxzL3RyYW5zbGF0ZS51dGlsJztcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuLypjb25zdCBlY2wgPSBuZXcgU2VxdWVsaXplKFxuICAnbXlzcWw6Ly9jbHQxMzI5LWRldjpFYXN5bGlmZTIwMTBAMTk1LjIwMC43OC4yNTIvY2x0MTMyOV9kZXYnLFxuKTsqL1xuY29uc3QgZWNsID0gbmV3IFNlcXVlbGl6ZShcbiAgY29uZmlnLkRCLmRhdGFiYXNlLFxuICBjb25maWcuREIudXNlcm5hbWUsXG4gIGNvbmZpZy5EQi5wYXNzd29yZCxcbiAge1xuICAgIC4uLmNvbmZpZy5EQixcbiAgICBkaWFsZWN0OiAnbXlzcWwnLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgICBjaGFyc2V0OiAnbGF0aW4xJyxcbiAgICAgIGVuY3J5cHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbG9nZ2luZzogaXNEZXYsXG4gIH0sXG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpdGUge1xuICBpZDogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG4gIGxpYmVsbGU6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgdGVsZXBob25lOiBzdHJpbmc7XG4gIGJvdE51bWJlcjogc3RyaW5nO1xuICBob3JhaXJlczogc3RyaW5nO1xuICBpbmZvczogc3RyaW5nO1xuICBndWlkZVNlcnZpY2VzOiBzdHJpbmc7XG4gIHJlbGFpc0NvbGlzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2l0ZUdyb3VwIHtcbiAgaWQ6IHN0cmluZztcbiAgbm9tOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uY2llcmdlIHtcbiAgcHJlbm9tOiBzdHJpbmc7XG4gIG5vbTogc3RyaW5nO1xuICB0cmlncmFtbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IHN0cmluZztcbiAgbm9tOiBzdHJpbmc7XG4gIHByZW5vbTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICB0ZWxlcGhvbmU6IHN0cmluZztcbn1cblxudHlwZSBSZXF1ZXN0VHlwZSA9ICdTTVMnIHwgJ2Nhc2llcic7XG5cbmludGVyZmFjZSBSZXF1ZXN0IHtcbiAgdGV4dDogc3RyaW5nO1xuICB0eXBlOiBSZXF1ZXN0VHlwZTtcbiAgbnVtTG9ja2VyPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFY2wge1xuICBzdGF0aWMgZ2V0UHJlbm9tQ29uY2llcmdlKFxuICAgIGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBmb3JVc2VyOiBib29sZWFuID0gdHJ1ZSxcbiAgKSB7XG4gICAgaWYgKCFjb25jaWVyZ2VzIHx8ICFjb25jaWVyZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZvclVzZXIgPyB0KCdpbmZvcy5jb25jaWVyZ2UnKSA6ICcnO1xuICAgIH1cbiAgICBpZiAoY29uY2llcmdlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBjb25jaWVyZ2VzWzBdLnByZW5vbTtcbiAgICB9XG4gICAgaWYgKGNvbmNpZXJnZXMubGVuZ3RoID09PSAyKVxuICAgICAgcmV0dXJuIGAke2NvbmNpZXJnZXNbMF0ucHJlbm9tfSBldCAke2NvbmNpZXJnZXNbMV0ucHJlbm9tfWA7XG4gICAgcmV0dXJuIGZvclVzZXIgPyB0KCdpbmZvcy5jb25jaWVyZ2VzJykgOiAnJztcbiAgfVxuXG4gIHN0YXRpYyBpc011bHRpcGxlQ29uY2llcmdlcyhjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29uY2llcmdlcyAmJiBjb25jaWVyZ2VzLmxlbmd0aCA+IDE7XG4gIH1cblxuICBzdGF0aWMgZ2V0VHJpZ3JhbW1lQ29uY2llcmdlKGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghY29uY2llcmdlcyB8fCAhY29uY2llcmdlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb25jaWVyZ2VzWzBdLnRyaWdyYW1tZTtcbiAgfVxuICBlY2w6IFNlcXVlbGl6ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVjbCA9IGVjbDtcbiAgfVxuXG4gIGFzeW5jIGdldFNpdGVJbmZvcyhzZXJ2aWNlOiBzdHJpbmcsIHNlcnZpY2VJZDogc3RyaW5nKSB7XG4gICAgbGV0IHNlcnZpY2VDb2x1bW47XG4gICAgLy8gQ2FzIGRlIGxhIGNvbnNvbGUuIE9uIGZhaXQgdW4gcmVtcGxhY2VtZW50IGRlIHZhbGV1ciBwb3VyIGFsbGVyIGNoZXJjaGVyIHVuIGNvZGUgc2l0ZVxuICAgIGlmIChzZXJ2aWNlID09PSAnY29uc29sZScpIHNlcnZpY2VDb2x1bW4gPSAnY29ycmVzcF8wNCc7XG4gICAgZWxzZSBzZXJ2aWNlQ29sdW1uID0gc2VydmljZTtcbiAgICBjb25zdCBzaXRlczogU2l0ZVtdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIGBpZF9yZV8wM2AgQVMgYGlkYCAsIGBjb3JyZXNwXzA0YCBBUyBgY29kZWAgLCBgY2xfbGJfMDFgIEFTIGBsaWJlbGxlYCAsIGBjbF9yZV8wMV91YCBBUyBgZW1haWxgLCBgc2l0ZV90ZWxlcGhvbmVgIEFTIGB0ZWxlcGhvbmVgLCBgc2l0ZV9ob3JhaXJlc2AgQVMgYGhvcmFpcmVzYCwgYGJvdEluZm9gIEFTIGBpbmZvc2AsIGBib3ROdW1iZXJgIEZST00gYGNsaWVudGAgJyArXG4gICAgICAgIGBXSEVSRSAke3NlcnZpY2VDb2x1bW59ID0gOnNlcnZpY2VJZCBMSU1JVCAxYCxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2VydmljZUlkIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHNpdGVzICYmIHNpdGVzLmxlbmd0aClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNpdGVzWzBdLFxuICAgICAgICBndWlkZVNlcnZpY2VzOiBgaHR0cDovL2VjbC5lYXN5LWxpZmUuZnIvZ2RzLyR7c2l0ZXNbMF0uY29kZX0ucGRmYCxcbiAgICAgICAgcmVsYWlzQ29saXM6IGBodHRwOi8vZWNsLmVhc3ktbGlmZS5mci9nZHMvJHtzaXRlc1swXS5jb2RlfV9SQy5wZGZgLFxuICAgICAgfTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2l0ZUdyb3VwcyhzaXRlSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGdyb3VwczogU2l0ZUdyb3VwW10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGNvcnJlc3BfMDFgIGFzIGlkLCBgY29ycmVzcF8wMmAgYXMgbm9tIEZST00gYGNvcnJlc3BvbmRhbmNlX2NsaWVudGAgV0hFUkUgYGlkX3JlXzAzYD06c2l0ZUlkJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2l0ZUlkIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfVxuXG4gIGFzeW5jIGdldENvbmNpZXJnZUxpc3Qoc2l0ZUNvZGU6IHN0cmluZyk6IFByb21pc2U8Q29uY2llcmdlW10+IHtcbiAgICAvLyAnTEVGVCBKT0lOIGBjbGllbnRgIE9OIGBjbGllbnRgLmBpZF9yZV8wM2A9YGNvb3JkYC5gaWRfcmVfMDNGS2AgJyArXG4gICAgLy8gJ1dIRVJFIGBjbGllbnRgLmBjb3JyZXNwXzA0YD06c2l0ZUNvZGUgYW5kIGBjb29yZGAuYGNvX2dlXzAzYD0wJyxcbiAgICBjb25zdCBjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgY29vcmRgLmBjb19yZV8wM191YCBhcyBwcmVub20sIGBjb29yZGAuYGNvX3JlXzAyX3VgIGFzIG5vbSwgYGNvb3JkYC5gY29fcmVfMDFgIGFzIHRyaWdyYW1tZSAnICtcbiAgICAgICAgJ0ZST00gYGNvb3JkaW5hdGV1cmAgYXMgYGNvb3JkYCAnICtcbiAgICAgICAgJ0xFRlQgSk9JTiBgY2xpZW50YCBPTiBgY2xpZW50YC5gY29fcmVfMDFgPWBjb29yZGAuYGNvX3JlXzAxYCAnICtcbiAgICAgICAgXCJBTkQgKGBjbGllbnRgLmBjbF9yZV8wM2AgPSAnMDAwMC0wMC0wMCcgT1IgYGNsaWVudGAuYGNsX3JlXzAzYCBJUyBOVUxMKSBcIiArXG4gICAgICAgICdXSEVSRSBgY2xpZW50YC5gY29ycmVzcF8wNGA9OnNpdGVDb2RlJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2l0ZUNvZGUgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gY29uY2llcmdlcztcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXIoXG4gICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgc2l0ZTogU2l0ZSxcbiAgKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICAgIGxldCB3aGVyZTtcbiAgICBzd2l0Y2ggKGlkZW50aWZpZXIpIHtcbiAgICAgIGNhc2UgJ3VzZXJJZCc6XG4gICAgICAgIHdoZXJlID0gJ2B1dGlsaXNhdGV1cmAuYGlkX3JlXzA0YD06dmFsdWUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vYmlsZSc6XG4gICAgICAgIHdoZXJlID0gJ2B1dGlsaXNhdGV1cmAuYGlkX2NvXzA2X3VgPTp2YWx1ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICB3aGVyZSA9ICdsb3dlcihgdXRpbGlzYXRldXJgLmBpZF9yZV8wMV91YCkgPSBsb3dlcig6dmFsdWUpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzOiBVc2VyW10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGlkX3JlXzAxX3VgIEFTIGBlbWFpbGAgLCBgaWRfcmVfMDZfdWAgQVMgYG5vbWAgLCBgaWRfcmVfMDdfdWAgQVMgYHByZW5vbWAgLCAnICtcbiAgICAgICAgJ2BpZF9jb18wNl91YCBBUyBgdGVsZXBob25lYCwgYGlkX3JlXzA0YCBBUyBgaWRgICcgK1xuICAgICAgICAnRlJPTSBgdXRpbGlzYXRldXJgICcgK1xuICAgICAgICAnSk9JTiBgY2xpZW50YCBPTiBgdXRpbGlzYXRldXJgLmBpZF9yZV8wM2AgPSBgY2xpZW50YC5gaWRfcmVfMDNgICcgK1xuICAgICAgICAnV0hFUkUgYGNsaWVudGAuYGNvcnJlc3BfMDRgPTpzaXRlQ29kZSAnICtcbiAgICAgICAgYCR7d2hlcmUgPyBgQU5EICR7d2hlcmV9YCA6ICcnfTtgLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyB2YWx1ZSwgc2l0ZUNvZGU6IHNpdGUuY29kZSB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHVzZXJzWzBdO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB1c2VyIHJlZ2lzdHJhdGlvblxuICAgKiBAcmV0dXJuIHRva2VuIHRvIGJlIHVzZWQgaW4gdXNlciBtYWlsIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIHsqfSBzaXRlXG4gICAqIEBwYXJhbSB7Kn0gdXNlcklkXG4gICAqIEBwYXJhbSB7Kn0gZW1haWxcbiAgICogQHBhcmFtIHsqfSBsYXN0TmFtZVxuICAgKiBAcGFyYW0geyp9IGdpdmVuTmFtZVxuICAgKiBAcGFyYW0geyp9IHNpdGVHcm91cFxuICAgKi9cbiAgYXN5bmMgc2F2ZVJlZ2lzdHJhdGlvbihcbiAgICBzaXRlOiBTaXRlLFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgbGFzdE5hbWU6IHN0cmluZyxcbiAgICBnaXZlbk5hbWU6IHN0cmluZyxcbiAgICBzaXRlR3JvdXA6IFNpdGVHcm91cCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICkge1xuICAgIC8vIEdldCBuZWVkZWQgc2l0ZSBpbmZvXG4gICAgY29uc3Qgc2l0ZXNJbmZvOiBhbnlbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgaWRfcmVfMDNgIGFzIGlkLCBgZmlfZGVfMDNgIGFzIGBjYXRlZ29yeWAsIGBmaV9kZV8wNGAgYXMgYGdyb3VwYCBGUk9NIGBmb3JtX2luc2NyaXB0aW9uYCBXSEVSRSBgaWRfcmVfMDNgPTpzaXRlSWQnLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyBzaXRlSWQ6IHNpdGUuaWQgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAoIXNpdGVzSW5mby5sZW5ndGggJiYgIXNpdGVzSW5mbylcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgQ2Fubm90IHNhdmUgcmVnaXN0cmF0aW9uOiB1bmFibGUgdG8gZmluZCBzaXRlIGluZm8gZm9yICcke3NpdGUuaWR9J2AsXG4gICAgICApO1xuXG4gICAgY29uc3Qgc2l0ZUluZm8gPSBzaXRlc0luZm9bMF07XG4gICAgLy8gR2VuZXJhdGUgYSB0b2tlbiBmb3IgdXNlciBtYWlsIHZhbGlkYXRpb25cbiAgICBjb25zdCB0b2tlbiA9IHV1aWQudjQoKTtcbiAgICAvLyBJbnNlcnQgcmVnaXN0cmF0aW9uIGluIGRhdGFiYXNlXG4gICAgYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnSU5TRVJUIElOVE8gYGZvcm1faW5zY3JpcHRpb25fdXRpbGAoYGlkX3JlXzAzYCxgaWRfcmVfMDFfdWAsYGlkX3JlXzA2X3VgLGBpZF9yZV8wN191YCxgaWRfcmVfMDhgLGBpZF9jb18wNl91YCxgaWRfZ2VfMDRgLGBpdV90b18wMWAsYGlkX3JlXzEwYCxgaWRfaW5fMDFgLGBpZF9pbl8wMmAsYGlkX2NvXzAyX3VgKSAnICtcbiAgICAgICAgJ1ZBTFVFUyAoOnNpdGVJZCw6ZW1haWwsOmxhc3ROYW1lLDpnaXZlbk5hbWUsOmZ1bGxOYW1lLDptb2JpbGUsREFURV9GT1JNQVQoTk9XKCksIFwiJVktJW0tJWRcIiksOnRva2VuLDpjbGllbnQsOmNhdGVnb3J5LDpncm91cCw6Y3ApJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuSU5TRVJULFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICB0b2tlbixcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBzaXRlSWQ6IHNpdGUuaWQsXG4gICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLnRyaW0oKS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIGdpdmVuTmFtZTogZ2l2ZW5OYW1lLnRyaW0oKSxcbiAgICAgICAgICBmdWxsTmFtZTogYCR7bGFzdE5hbWUudHJpbSgpLnRvVXBwZXJDYXNlKCl9ICR7Z2l2ZW5OYW1lLnRyaW0oKX1gLFxuICAgICAgICAgIG1vYmlsZTogdXNlcklkLFxuICAgICAgICAgIGNsaWVudDogc2l0ZUdyb3VwID8gc2l0ZUdyb3VwLm5vbSA6IG51bGwsXG4gICAgICAgICAgY2F0ZWdvcnk6IHNpdGVJbmZvLmNhdGVnb3J5LFxuICAgICAgICAgIGdyb3VwOiBzaXRlSW5mby5ncm91cCxcbiAgICAgICAgICBjcDogYCR7c2l0ZS5jb2RlLnN1YnN0cigwLCAyKX0wMDBgLCAvLyBUYWtlIHRoZSBkZXBhcnRtZW50IGZyb20gc2l0ZSBjb2RlIGFuZCBhZGQgdGhyZWUgMFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVVzZXJNb2JpbGUodXNlcjogVXNlcikge1xuICAgIHJldHVybiB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdVUERBVEUgYHV0aWxpc2F0ZXVyYCBTRVQgJyArXG4gICAgICAgICdgaWRfY29fMDZfdWA9OnRlbGVwaG9uZSAnICtcbiAgICAgICAgJ1dIRVJFIGBpZF9yZV8wNGA9OmlkJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICB0ZWxlcGhvbmU6IHVzZXIudGVsZXBob25lLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVJlcXVlc3QoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBzaXRlOiBTaXRlLFxuICAgIGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdLFxuICAgIHVzZXI6IFVzZXIsXG4gICkge1xuICAgIGxldCByZXF1ZXN0TnVtOiBhbnlbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBDT1VOVChgZGVfcmVfMDdfdWApIEFTIGNvdW50IEZST00gYGRlbWFuZGVgICcgK1xuICAgICAgICBcIldIRVJFIGBkZV9yZV8wMV91YD06ZGF0ZSBBTkQgYGRlX3JlXzA1X3VgPD4nYWJhbmRvbl9wMSdcIixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJykgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAoIXJlcXVlc3ROdW0gfHwgIXJlcXVlc3ROdW0ubGVuZ3RoKVxuICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBzYXZlIHJlcXVlc3Q6IHVuYWJsZSB0byBmaW5kIGEgbmV3IHJlcXVlc3QgbnVtYmVyJyk7XG4gICAgcmVxdWVzdE51bSA9IHJlcXVlc3ROdW1bMF0uY291bnQgKyAxO1xuXG4gICAgbGV0IHJlcXVlc3RUeXBlO1xuICAgIGxldCByZXF1ZXN0VHlwZTI7XG4gICAgbGV0IHR5cGVDb2RlO1xuICAgIGxldCBkZXRhaWw7XG4gICAgbGV0IGFkZGl0aW9uO1xuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XG4gICAgICBjYXNlICdjYXNpZXInOlxuICAgICAgICByZXF1ZXN0VHlwZSA9ICdEZW1hbmRlIGNhc2llcic7XG4gICAgICAgIHJlcXVlc3RUeXBlMiA9IHJlcXVlc3QudHlwZTtcbiAgICAgICAgdHlwZUNvZGUgPSAnY2FzaSc7XG4gICAgICAgIGRldGFpbCA9IHJlcXVlc3QubnVtTG9ja2VyXG4gICAgICAgICAgPyBgY2FzaWVyOiR7cmVxdWVzdC5udW1Mb2NrZXJ9ICR7cmVxdWVzdC50ZXh0fWBcbiAgICAgICAgICA6IHJlcXVlc3QudGV4dDtcbiAgICAgICAgYWRkaXRpb24gPSByZXF1ZXN0Lm51bUxvY2tlclxuICAgICAgICAgID8gYGNhc2llcjoke3JlcXVlc3QubnVtTG9ja2VyfSAke3JlcXVlc3QudGV4dH1gXG4gICAgICAgICAgOiByZXF1ZXN0LnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU01TJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlcXVlc3RUeXBlID0gJ0F1dHJlJztcbiAgICAgICAgcmVxdWVzdFR5cGUyID0gcmVxdWVzdC50eXBlO1xuICAgICAgICB0eXBlQ29kZSA9ICdzbXMnO1xuICAgICAgICBkZXRhaWwgPSByZXF1ZXN0LnRleHQ7XG4gICAgICAgIGFkZGl0aW9uID0gcmVxdWVzdC50ZXh0O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0UmVmID0gW1xuICAgICAgc2l0ZS5jb2RlLFxuICAgICAgbW9tZW50KCkuZm9ybWF0KCdERE1NWVlZWScpLFxuICAgICAgdHlwZUNvZGUsXG4gICAgICByZXF1ZXN0TnVtLFxuICAgIF1cbiAgICAgIC5qb2luKCdfJylcbiAgICAgIC5yZXBsYWNlKC9cXHMvZywgJ18nKTtcblxuICAgIGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ0lOU0VSVCBJTlRPIGBkZW1hbmRlYChgZGVfcmVfMDNfdWAsIGBkZV9yZV8wMV91YCwgYGRlX3JlXzAyX3VgLCBgZGVfcmVfMDRfdWAsICcgK1xuICAgICAgICAnYGRlX3JlXzA1X3VgLCBgZGVfcmVfMDZfdWAsIGBkZV9yZV8wN191YCwgYGRlX3JlXzA4X3VgLCBgZGVfcmVfMDlfdWAsICcgK1xuICAgICAgICAnYGRlX3JlXzEwX3VgLCBgZGVfcmVfMTRgLCBgaWRfcmVfMDRgLCBgZGVfY2FfMDFfdWApICcgK1xuICAgICAgICBcIlZBTFVFUyg6cmVxdWVzdFJlZiwgOmRhdGUsIDp0aW1lLCA6dHJpZ3JhbSwgJ0RlbWFuZGUgZW4gY291cnMgZGUgdHJhaXRlbWVudCcsIDpyZXF1ZXN0VHlwZSwgOnJlcXVlc3RUeXBlMiwgOmRldGFpbCwgOmFkZGl0aW9uLCAxLCAwLCA6dXNlcklkLCA6bnVtTG9ja2VyKVwiLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5JTlNFUlQsXG4gICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgICAgIHJlcXVlc3RUeXBlMixcbiAgICAgICAgICBkZXRhaWwsXG4gICAgICAgICAgYWRkaXRpb24sXG4gICAgICAgICAgcmVxdWVzdFJlZixcbiAgICAgICAgICBkYXRlOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgICB0aW1lOiBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyksXG4gICAgICAgICAgdHJpZ3JhbTogRWNsLmdldFRyaWdyYW1tZUNvbmNpZXJnZShjb25jaWVyZ2VzKSxcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbnVtTG9ja2VyOiByZXF1ZXN0Lm51bUxvY2tlciB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiByZXF1ZXN0UmVmO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlUmVxdWVzdChyZXF1ZXN0UmVmOiBzdHJpbmcsIHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBmdW5jdGlvbiBhZGROdW1Mb2NrZXIoZmllbGQ6IGFueSwgbnVtTG9ja2VyOiBhbnkpIHtcbiAgICAgIHJldHVybiBgXFxgJHtmaWVsZH1cXGA9Q09OQ0FUKCdjYXNpZXI6JHtudW1Mb2NrZXIgfHwgJyd9ICcsIFxcYCR7ZmllbGR9XFxgKWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZERldGFpbHMoZmllbGQ6IGFueSwgcGFyYW1OYW1lOiBhbnkpIHtcbiAgICAgIHJldHVybiBgXFxgJHtmaWVsZH1cXGA9Q09OQ0FUKFxcYCR7ZmllbGR9XFxgLCAnICcsICR7cGFyYW1OYW1lfSlgO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgbnVtIGxvY2tlciBpZiBhZGRlZCBpbiByZXF1ZXN0IGRldGFpbHNcbiAgICBpZiAocmVxdWVzdC5udW1Mb2NrZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgICAnVVBEQVRFIGBkZW1hbmRlYCBTRVQgJyArXG4gICAgICAgICAgYCR7YWRkTnVtTG9ja2VyKCdkZV9yZV8wOF91JywgcmVxdWVzdC5udW1Mb2NrZXIpfSwgYCArXG4gICAgICAgICAgYCR7YWRkTnVtTG9ja2VyKCdkZV9yZV8wOV91JywgcmVxdWVzdC5udW1Mb2NrZXIpfSwgYCArXG4gICAgICAgICAgXCJgZGVfcmVfMDZfdWA9J0RlbWFuZGUgY2FzaWVyJywgXCIgK1xuICAgICAgICAgIFwiYGRlX3JlXzA3X3VgPSdjYXNpZXInLCBcIiArXG4gICAgICAgICAgJ2BkZV9jYV8wMV91YD06bnVtTG9ja2VyICcgK1xuICAgICAgICAgICdXSEVSRSBgZGVfcmVfMDNfdWA9OnJlcXVlc3RSZWYnLFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgICAgcmVxdWVzdFJlZixcbiAgICAgICAgICAgIG51bUxvY2tlcjogcmVxdWVzdC5udW1Mb2NrZXIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIEFkZCByZXF1ZXN0IGRldGFpbHNcbiAgICByZXR1cm4gdGhpcy5lY2wucXVlcnkoXG4gICAgICAnVVBEQVRFIGBkZW1hbmRlYCBTRVQgJyArXG4gICAgICAgIGAke2FkZERldGFpbHMoJ2RlX3JlXzA4X3UnLCAnOmRldGFpbHMnKX0sIGAgK1xuICAgICAgICBgJHthZGREZXRhaWxzKCdkZV9yZV8wOV91JywgJzpkZXRhaWxzJyl9IGAgK1xuICAgICAgICAnV0hFUkUgYGRlX3JlXzAzX3VgPTpyZXF1ZXN0UmVmJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICByZXF1ZXN0UmVmLFxuICAgICAgICAgIGRldGFpbHM6IHJlcXVlc3QudGV4dCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdldFNpdGVVc2VycyhzaXRlczogc3RyaW5nW10pIHtcbiAgICBjb25zdCB3aGVyZUluID0gYCcke3NpdGVzLmpvaW4oXCInLCdcIil9J2A7XG5cbiAgICByZXR1cm4gdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIERJU1RJTkNUICh1LmBpZF9jb18wNl91YCkgQVMgdGVsLCBjLnR3aWxpbyBBUyB0d2lsaW8gJyArXG4gICAgICAgICdGUk9NIGB1dGlsaXNhdGV1cmAgQVMgdSAnICtcbiAgICAgICAgJ0lOTkVSIEpPSU4gYGNsaWVudGAgQVMgYyBPTiBjLmBpZF9yZV8wM2AgPSB1LmBpZF9yZV8wM2AgJyArXG4gICAgICAgICdXSEVSRSB1LmBpZF9yZV8wM2AgSU4gJyArXG4gICAgICAgIGAoJHt3aGVyZUlufSkgYCArXG4gICAgICAgIFwiQU5EIHUuYGlkX2NvXzA2X3VgICE9ICcnIFwiICtcbiAgICAgICAgJ0FORCB1LmBpZF9jb18wNl91YCBJUyBOT1QgTlVMTCAnICtcbiAgICAgICAgXCJBTkQgKHUuYGlkX2dlXzAyYCA9ICcwMDAwLTAwLTAwJyBPUiB1LmBpZF9nZV8wMmAgSVMgTlVMTCk7XCIsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5cbmltcG9ydCBUZXN0Um91dGVzIGZyb20gJy4vdGVzdC5yb3V0ZXMnO1xuaW1wb3J0IFdlYmFwcFJvdXRlcyBmcm9tICcuL3dlYmFwcC5yb3V0ZXMnO1xuXG5jb25zdCByb3V0ZXMgPSBleHByZXNzLlJvdXRlcigpO1xuXG4vLyBUZXN0IHJvdXRlcyBmb3IgdGhlIGNvbnNvbGVcbnJvdXRlcy51c2UoJy90ZXN0JywgVGVzdFJvdXRlcyk7XG5cbi8vIFdlYmFwcCByb3V0ZXMgdG8gbW9kaWZpZWQgcmVzcG9uc2VzIGFuZCB0cmFpbmluZ1xucm91dGVzLnVzZSgnL3dlYmFwcCcsIFdlYmFwcFJvdXRlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGJvZHlwYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuXG5pbXBvcnQgU2VuZE1lc3NhZ2VDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2FqYXguY29udHJvbGxlcic7XG5pbXBvcnQgU2xhY2tDb250cm9sbGVyLCB7IGV2ZW50cyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3NsYWNrLmNvbnRyb2xsZXInO1xuXG5jb25zdCByb3V0ZXMgPSBleHByZXNzLlJvdXRlcigpO1xuY29uc3QgdXJsZW5jb2RlZFBhcnNlciA9IGJvZHlwYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KTtcblxuLy8gUm91dGUgdG8gdGVzdCBvbiB3ZWIgY29uc29sZVxucm91dGVzLmdldCgnL2FqYXgvc2VuZG1lc3NhZ2UnLCBTZW5kTWVzc2FnZUNvbnRyb2xsZXIpO1xuXG4vLyBSb3V0ZSB1c2VkIGJ5IHNsYWNrIHdoZW4gYSBuZXcgbWVzc2FnZSBhcnJpdmVzXG5yb3V0ZXMucG9zdCgnL3NsYWNrJywgU2xhY2tDb250cm9sbGVyKTtcblxuLy8gUm91dGUgdXNlZCBieSBzbGFjayB3aGVuIGEgbmV3IGV2ZW50IGlzIHRyaWdnZXJlZCBsaWtlIGEgYnV0dG9uIGNsaWNrXG5yb3V0ZXMucG9zdCgnL3NsYWNrZXZlbnRzJywgdXJsZW5jb2RlZFBhcnNlciwgZXZlbnRzKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgYm9keXBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbmltcG9ydCBXZWJhcHBDb250cm9sbGVycyBmcm9tICcuLi9jb250cm9sbGVycy93ZWJhcHAuY29udHJvbGxlcnMnO1xuXG5jb25zdCByb3V0ZXMgPSBleHByZXNzLlJvdXRlcigpO1xuY29uc3QgdXJsZW5jb2RlZFBhcnNlciA9IGJvZHlwYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KTtcblxucm91dGVzLmFsbCgnLycsIFdlYmFwcENvbnRyb2xsZXJzLmhvbWUpO1xuXG4vLyBBamF4IGNhbGxcbnJvdXRlcy5wb3N0KCcvc2F2ZScsIHVybGVuY29kZWRQYXJzZXIsIFdlYmFwcENvbnRyb2xsZXJzLnNhdmUpO1xuLy8gQWpheCBjYWxsXG5yb3V0ZXMucG9zdCgnL2dldGZpbGVzJywgdXJsZW5jb2RlZFBhcnNlciwgV2ViYXBwQ29udHJvbGxlcnMuZ2V0ZmlsZXMpO1xuXG5yb3V0ZXMuYWxsKCcvOnR5cGUnLCBXZWJhcHBDb250cm9sbGVycy50eXBlKTtcbnJvdXRlcy5hbGwoJy86dHlwZS86Y2F0LzpuYW1lJywgV2ViYXBwQ29udHJvbGxlcnMuZmlsZSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuXG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IFR3aWcgZnJvbSAndHdpZyc7XG5cbmltcG9ydCAnLi9tb2RlbHMvZWNsJztcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYygncHVibGljJykpO1xuXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoJy8nLCByb3V0ZXMpO1xuXG5hcHAubGlzdGVuKDgwODApO1xuXG5leHBvcnQgZGVmYXVsdCBhcHA7XG4iLCJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcblxuLyoqXG4gKiBTZW5kIGFuIGh0dHAgcmVxdWVzdCBhbmQgcmV0dXJuIHRoZSByZXN1bHQgYW5kIHRoZSBib2R5XG4gKiBAcGFyYW0gcmVxIHRoZSBodHRwIHJlcXVlc3QgdG8gc2VuZFxuICovXG5leHBvcnQgY29uc3QgZXhlY3JlcXVlc3Q6IGFueSA9IGFzeW5jIChyZXE6IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QocmVxLCAoZXJyOiBhbnksIHJlczogYW55LCBib2R5OiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHsgcmVzLCBib2R5IH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgRGF0YXN0b3JlIGZyb20gJ25lZGInO1xuaW1wb3J0IHsgQ29udGV4dHMgfSBmcm9tICcuL3R5cGVzLnV0aWwnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG4vLyBDb25uZWN0IHRvIGFkIGRiIHN0b3JlZCBpbiBEQi9jb250ZXh0c1xuY29uc3QgZGIgPSBuZXcgRGF0YXN0b3JlKHsgZmlsZW5hbWU6ICdEQi9jb250ZXh0cycsIGF1dG9sb2FkOiB0cnVlIH0pO1xuXG4vKipcbiAqIERlbGV0ZSBvbGQgY29udGV4dHMgKGRhdGUgZXhwaXJlZClcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZGVsZXRlT2xkKCkge1xuICBjb25zdCB0dGwgPSBEYXRlLm5vdygpIC0gY29uZmlnLk5FREIudHRsICogODY0MDAwMDA7XG4gIGF3YWl0IGRiLnJlbW92ZSh7IGNyZWF0ZVRpbWU6IHsgJGx0OiB0dGwgfSB9LCB7IG11bHRpOiB0cnVlIH0pO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBvY2N1cmVuY2VzIGluIGRiXG4gKiBAcGFyYW0gcXVlcnkgYSBtb25nb2RiIHF1ZXJ5XG4gKi9cbmNvbnN0IGNvdW50OiBhbnkgPSBhc3luYyAocXVlcnk6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiLmNvdW50KHF1ZXJ5LCAoZXJyOiBhbnksIG5iOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG5iKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEluc2VydCBkYXRhcyBpbiBkYlxuICogQHBhcmFtIHF1ZXJ5IGEgbW9uZ29kYiBxdWVyeVxuICovXG5jb25zdCBpbnNlcnQ6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIuaW5zZXJ0KHF1ZXJ5LCAoZXJyOiBhbnksIG5ld0RvYzogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShuZXdEb2MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogVXBkYXRlIGRhdGFzIGluIGRiXG4gKiBAcGFyYW0gcXVlcnkgYSBtb25nb2RiIHF1ZXJ5XG4gKi9cbmNvbnN0IHVwZGF0ZTogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi51cGRhdGUoXG4gICAgICB7IHVzZXI6IHF1ZXJ5LnVzZXIgfSxcbiAgICAgIHsgJHNldDogeyBjb250ZXh0czogcXVlcnkuY29udGV4dHMgfSB9LFxuICAgICAge30sXG4gICAgICAoZXJyOiBhbnksIG51bVJlcGxhY2VkOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUobnVtUmVwbGFjZWQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBGaW5kIG9uZSByb3cgaW4gZGJcbiAqIEBwYXJhbSBxdWVyeSBhIG1vbmdvZGIgcXVlcnlcbiAqL1xuY29uc3QgZmluZG9uZTogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi5maW5kT25lKHF1ZXJ5LCAoZXJyOiBhbnksIGRvYzogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShkb2MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogU2F2ZSBjb250ZXh0cyByZWxhdGl2ZSB0byBhIHVzZXJcbiAqIEBwYXJhbSB1c2VyIHRoZSB1c2VyIGlkIChwaG9uZSwgbWFpbClcbiAqIEBwYXJhbSBjIHRoZSBjb250ZXh0cyB0byBzdG9yZVxuICovXG5hc3luYyBmdW5jdGlvbiBzYXZlKHVzZXI6IHN0cmluZywgYzogQ29udGV4dHMpIHtcbiAgYXdhaXQgZGVsZXRlT2xkKCk7XG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgbmIgPSBhd2FpdCBmaW5kb25lKHsgdXNlciB9KTtcbiAgICBjb25zdCBjb250ZXh0cyA9IHtcbiAgICAgIGZ1bGZpbGw6IGMuZnVsZmlsbCxcbiAgICAgIHNlcnZpY2U6IGMuc2VydmljZSxcbiAgICAgIHVzZXI6IGMudXNlcixcbiAgICB9O1xuICAgIGlmICghbmIpIHtcbiAgICAgIC8vIEluc2VydGluZyBjb250ZXh0XG4gICAgICBhd2FpdCBpbnNlcnQoeyB1c2VyLCBjb250ZXh0cywgY3JlYXRlVGltZTogRGF0ZS5ub3coKSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXBkYXRpbmcgY29udGV4dFxuICAgICAgYXdhaXQgdXBkYXRlKHsgdXNlciwgY29udGV4dHMgfSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTG9hZCBhIHVzZXIgY29udGV4dHMgKGlmIHRoZXJlJ3Mgbm90IHJldHVybiBhbiBlbXB0eSBjb250ZXh0KVxuICogQHBhcmFtIHVzZXIgdGhlIHVzZXIgaWQgKHBob25lLCBtYWlsKVxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkKHVzZXI6IHN0cmluZyk6IFByb21pc2U8Q29udGV4dHM+IHtcbiAgYXdhaXQgZGVsZXRlT2xkKCk7XG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgY29udGV4dHMgPSBhd2FpdCBmaW5kb25lKHsgdXNlciB9KTtcbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnRleHRzLmNvbnRleHRzLnNpdGUgPSBudWxsO1xuICAgICAgY29udGV4dHMuY29udGV4dHMuY29uY2llcmdlcyA9IG51bGw7XG4gICAgICByZXR1cm4gY29udGV4dHMuY29udGV4dHM7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgZnVsZmlsbDogW10sXG4gICAgdXNlcjoge1xuICAgICAgbGFzdG5hbWU6ICcnLFxuICAgICAgZmlyc3RuYW1lOiAnJyxcbiAgICAgIGVtYWlsOiAnJyxcbiAgICAgIHNpdGVHcm91cDogbnVsbCxcbiAgICAgIHVzZXJJZDogJycsXG4gICAgfSxcbiAgICBzZXJ2aWNlOiB7XG4gICAgICB3YXRzb246IG51bGwsXG4gICAgfSxcbiAgICBzaXRlOiBudWxsLFxuICAgIGNvbmNpZXJnZXM6IG51bGwsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2F2ZSxcbiAgbG9hZCxcbn07XG4iLCJpbXBvcnQge1xuICBJbnRlbnQsXG4gIEZ1bGZpbGxSZXF1ZXN0LFxuICBGdWxmaWxsUmVzdWx0LFxuICBJbnRlbnRSZXN1bHQsXG4gIFBhcnNlUmVzcG9uc2VSZXF1ZXN0LFxuICBQYXJzZWRSZXNwb25zZSxcbiAgQ29udGV4dHMsXG59IGZyb20gJy4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgJy4uL2NvbmZpZy9pMThuJztcbmltcG9ydCBpbnRlbnRSZWdpc3RlciBmcm9tICcuL2Z1bGZpbGwvcmVnaXN0ZXIuaW50ZW50JztcbmltcG9ydCBpbnRlbnREZWZhdWx0IGZyb20gJy4vZnVsZmlsbC9kZWZhdWx0LmludGVudCc7XG5pbXBvcnQgaW50ZW50SW5mb3MgZnJvbSAnLi9mdWxmaWxsL2luZm9zLmludGVudCc7XG5pbXBvcnQgaTE4biBmcm9tICdpMThuZXh0JztcbmltcG9ydCB7IGNsb25lIH0gZnJvbSAnLi9mdW5jLnV0aWwnO1xuXG4vKipcbiAqIEZpbmQgYW5kIHJldHVybiB0aGUgbW9zdCBwcm9iYWJsZSByZXNwb25zZVxuICogQHBhcmFtIHJlc3VsdCB0aGUgaW50ZW50cyBhbmQgZW50aXRpZXNcbiAqIEBwYXJhbSBjb250ZXh0cyB0aGUgZGlmZXJlbnQgY29udGV4dHNcbiAqIEBwYXJhbSB0eXBlcyB0aGUgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoZSBwbGF0Zm9ybVxuICogQHBhcmFtIGxhbmcgdGhlIGxldmVsIG9mIGxhbmd1YWdlIGZvciB0aGUgcmVzcG9uc2UgKGZyLXR1IG9yIGZyLXZvdXMpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKHJlcXVlc3Q6IEZ1bGZpbGxSZXF1ZXN0KTogUHJvbWlzZTxGdWxmaWxsUmVzdWx0PiB7XG4gIC8vIEdldCBhbGwga25vd24gaW50ZW50c1xuICBjb25zdCBpbnRlbnRzOiBJbnRlbnRbXSA9IGdldENvbmZpZygpO1xuICBjb25zdCBpbnRlbnRNYXAgPSBuZXcgTWFwKCk7XG4gIGludGVudHMuZm9yRWFjaChpbnRlbnQgPT4ge1xuICAgIGludGVudE1hcC5zZXQoaW50ZW50Lm5hbWUsIGludGVudC5mdW5jKTtcbiAgfSk7XG5cbiAgLy8gQ3JlYXRlIGFuIGFycmF5IHdpdGggYWxsIGludGVudCByZXNwb25zZXNcbiAgY29uc3QgaW50ZW50c1JlczogSW50ZW50UmVzdWx0W10gPSBbXTtcbiAgLy8gR2V0IGFsbCBpbnRlbnRzXG4gIGF3YWl0IHJlcXVlc3QucmVzdWx0LmludGVudHMucmVkdWNlKGFzeW5jIChwcmV2aW91cywgZSkgPT4ge1xuICAgIGF3YWl0IHByZXZpb3VzO1xuICAgIGxldCByZXM6IEludGVudFJlc3VsdDtcbiAgICBpZiAoIWludGVudE1hcC5oYXMoZS5uYW1lKSkge1xuICAgICAgaWYgKHJlcXVlc3QucmVzdWx0LnJlc3BvbnNlKSB7XG4gICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAvLyBUT0RPIGNoYW5nZSB0aGF0XG4gICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgIGludGVudDogJycsXG4gICAgICAgICAgICB0eXBlOiAnJyxcbiAgICAgICAgICAgIHJlc3BvbnNlczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgICAgICAgJ2ZyLXR1JzogW3JlcXVlc3QucmVzdWx0LnJlc3BvbnNlXSxcbiAgICAgICAgICAgICAgICAgICdmci12b3VzJzogW3JlcXVlc3QucmVzdWx0LnJlc3BvbnNlXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRleHRzOiByZXF1ZXN0LnJlc3VsdC5jb250ZXh0cyxcbiAgICAgICAgICBjb25maWRlbmNlOiAwLjAxLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmVzID0gYXdhaXQgaW50ZW50RGVmYXVsdC5mYWxsYmFjayh7XG4gICAgICAgIGVudGl0aWVzOiByZXF1ZXN0LnJlc3VsdC5lbnRpdGllcyxcbiAgICAgICAgY29udGV4dHM6IGNsb25lKHJlcXVlc3QucmVzdWx0LmNvbnRleHRzKSxcbiAgICAgICAgY29uZmlkZW5jZTogZS5jb25maWRlbmNlLFxuICAgICAgICBxdWVyeTogcmVxdWVzdC5yZXN1bHQucXVlcnksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzID0gYXdhaXQgaW50ZW50TWFwLmdldChlLm5hbWUpKHtcbiAgICAgICAgZW50aXRpZXM6IHJlcXVlc3QucmVzdWx0LmVudGl0aWVzLFxuICAgICAgICBjb250ZXh0czogY2xvbmUocmVxdWVzdC5yZXN1bHQuY29udGV4dHMpLFxuICAgICAgICBjb25maWRlbmNlOiBlLmNvbmZpZGVuY2UsXG4gICAgICAgIHF1ZXJ5OiByZXF1ZXN0LnJlc3VsdC5xdWVyeSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocmVzKSB7XG4gICAgICBpbnRlbnRzUmVzLnB1c2gocmVzKTtcbiAgICB9XG4gIH0sIFByb21pc2UucmVzb2x2ZSgpKTtcblxuICAvLyBHZXQgdGhlIG1vc3QgcHJvYmFibGUgb25lXG4gIGxldCBpbnRlbnRSZXN1bHQ6IEludGVudFJlc3VsdCA9IGF3YWl0IGludGVudERlZmF1bHQuZmFsbGJhY2soe1xuICAgIGVudGl0aWVzOiByZXF1ZXN0LnJlc3VsdC5lbnRpdGllcyxcbiAgICBjb250ZXh0czogY2xvbmUocmVxdWVzdC5yZXN1bHQuY29udGV4dHMpLFxuICAgIGNvbmZpZGVuY2U6IDAuMDEsXG4gICAgcXVlcnk6IHJlcXVlc3QucmVzdWx0LnF1ZXJ5LFxuICB9KTtcbiAgaW50ZW50c1Jlcy5mb3JFYWNoKGUgPT4ge1xuICAgIGlmIChlICYmIGludGVudFJlc3VsdC5jb25maWRlbmNlIDwgZS5jb25maWRlbmNlKSB7XG4gICAgICBpbnRlbnRSZXN1bHQgPSBlO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gUGFyc2UgdGhlIHJlc3BvbnNlXG4gIGNvbnN0IHBhcnNlUmVzcG9uc2VSZXF1ZXN0OiBQYXJzZVJlc3BvbnNlUmVxdWVzdCA9IHtcbiAgICBpbnRlbnRSZXN1bHQsXG4gICAgYWNjZXB0ZWR0eXBlczogcmVxdWVzdC5hY2NlcHRlZHR5cGVzLFxuICAgIGxhbmc6IHJlcXVlc3QubGFuZyxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2U6IFBhcnNlZFJlc3BvbnNlID0gYXdhaXQgcGFyc2VSZXNwb25zZShwYXJzZVJlc3BvbnNlUmVxdWVzdCk7XG5cbiAgLy8gUmV0dXJuIHRoZSBmdWxmaWxsIHJlc3VsdFxuICBjb25zdCByZXN1bHQ6IEZ1bGZpbGxSZXN1bHQgPSB7XG4gICAgcmVzcG9uc2UsXG4gICAgY29udGV4dHM6IGludGVudFJlc3VsdC5jb250ZXh0cyxcbiAgfTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG1hdGNoIGJldHdlZW4gaW50ZW50cyBuYW1lIGFuZCBmdW5jdGlvbiB0byBjYWxsXG4gKi9cbmZ1bmN0aW9uIGdldENvbmZpZygpOiBJbnRlbnRbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMucmVnaXN0ZXIsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3RlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVybWFpbCxcbiAgICAgIGZ1bmM6IGludGVudFJlZ2lzdGVyLnJlZ2lzdGVyTWFpbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVybmFtZSxcbiAgICAgIGZ1bmM6IGludGVudFJlZ2lzdGVyLnJlZ2lzdGVyTmFtZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVyY29kZSxcbiAgICAgIGZ1bmM6IGludGVudFJlZ2lzdGVyLnJlZ2lzdGVyQ29kZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLm9wZW5pbmd0aW1lLFxuICAgICAgZnVuYzogaW50ZW50SW5mb3Mub3BlbnRpbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5jb250YWN0LFxuICAgICAgZnVuYzogaW50ZW50SW5mb3MuY29udGFjdCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnNlcnZpY2VzLFxuICAgICAgZnVuYzogaW50ZW50SW5mb3Muc2VydmljZXMsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWxhaXNjb2xpcyxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLnJlbGFpc2NvbGlzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMuZmFsbGJhY2ssXG4gICAgICBmdW5jOiBpbnRlbnREZWZhdWx0LmZhbGxiYWNrLFxuICAgIH0sXG4gIF07XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSByZXNwb25zZSB3aXRoIHRoZSBnb29kIGxhbmd1YWdlIGFuZCByYW5kb20gdGV4dHNcbiAqIEBwYXJhbSByZXNwb25zZSB0aGUgZnVsbCByZXNwb25zZVxuICogQHBhcmFtIHR5cGVzIHRoZSBhY2NlcHRlZCB0eXBlc1xuICogQHBhcmFtIGxhbmcgdGhlIGxldmVsIG9mIGxhbmd1YWdlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHBhcnNlUmVzcG9uc2UoXG4gIHJlcXVlc3Q6IFBhcnNlUmVzcG9uc2VSZXF1ZXN0LFxuKTogUHJvbWlzZTxQYXJzZWRSZXNwb25zZT4ge1xuICAvLyBHZXQgdGhlIHJlc3BvbnNlcyBhcnJheVxuICBjb25zdCByZXMgPSByZXF1ZXN0LmludGVudFJlc3VsdC5yZXNwb25zZS5yZXNwb25zZXM7XG4gIGNvbnN0IHR5cGVzID0gcmVxdWVzdC5hY2NlcHRlZHR5cGVzO1xuICBjb25zdCBsYW5nID0gcmVxdWVzdC5sYW5nO1xuICAvLyBDcmVhdGUgcGFyc2VkIHJlc3BvbnNlXG4gIGNvbnN0IG5ld3JlczogUGFyc2VkUmVzcG9uc2UgPSB7XG4gICAgcmVzcG9uc2VzOiBbXSxcbiAgfTtcbiAgLy8gQnVpbGQgaXRcbiAgcmVzLnJlZHVjZShhc3luYyAocHJldmlvdXM6IGFueSwgcjogYW55KSA9PiB7XG4gICAgYXdhaXQgcHJldmlvdXM7XG4gICAgaWYgKCFyLmRlc2MpIHtcbiAgICAgIGlmICh0eXBlcy5pbmNsdWRlcyhPYmplY3Qua2V5cyhyKVswXSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByLnRleHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgdGV4dHMgPSByW2xhbmddO1xuICAgICAgICAgIGNvbnN0IHRleHQgPSB0ZXh0c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZXh0cy5sZW5ndGgpXTtcbiAgICAgICAgICBjb25zdCByZWFsdHh0ID0gYXdhaXQgZ2V0VGV4dEZvcm1hdGVkKFxuICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgIHJlcXVlc3QuaW50ZW50UmVzdWx0LmNvbnRleHRzLFxuICAgICAgICAgICk7XG4gICAgICAgICAgbmV3cmVzLnJlc3BvbnNlcy5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IHJlYWx0eHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHIubWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbmV3cmVzLnJlc3BvbnNlcy5wdXNoKHtcbiAgICAgICAgICAgIG1lZGlhOiByLm1lZGlhLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByLmxpbmsgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgbmV3cmVzLnJlc3BvbnNlcy5wdXNoKHtcbiAgICAgICAgICAgIGxpbms6IHIubGluayxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygci5idG4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgYnRucyA9IHJbbGFuZ107XG4gICAgICAgICAgY29uc3QgcmVhbGJ0bnM6IGFueVtdID0gW107XG4gICAgICAgICAgYnRucy5yZWR1Y2UoYXN5bmMgKHByZXY6IGFueSwgYjogYW55KSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBwcmV2O1xuICAgICAgICAgICAgcmVhbGJ0bnMucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IGF3YWl0IGdldFRleHRGb3JtYXRlZChcbiAgICAgICAgICAgICAgICBiLnRleHQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5pbnRlbnRSZXN1bHQuY29udGV4dHMsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHZhbHVlOiBiLnZhbHVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgICAgICAgIG5ld3Jlcy5yZXNwb25zZXMucHVzaCh7XG4gICAgICAgICAgICBidG46IHtcbiAgICAgICAgICAgICAgYnRuczogcmVhbGJ0bnMsXG4gICAgICAgICAgICAgIG5leHRhY3Rpb246IHIubmV4dGFjdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHIuZHJvcGRvd24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3Qgb3B0cyA9IHJbbGFuZ107XG4gICAgICAgICAgY29uc3QgcmVhbG9wdHM6IGFueVtdID0gW107XG4gICAgICAgICAgb3B0cy5yZWR1Y2UoYXN5bmMgKHByZXY6IGFueSwgYjogYW55KSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBwcmV2O1xuICAgICAgICAgICAgcmVhbG9wdHMucHVzaCh7XG4gICAgICAgICAgICAgIHRleHQ6IGF3YWl0IGdldFRleHRGb3JtYXRlZChcbiAgICAgICAgICAgICAgICBiLnRleHQsXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5pbnRlbnRSZXN1bHQuY29udGV4dHMsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHZhbHVlOiBiLnZhbHVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICAgICAgICAgIG5ld3Jlcy5yZXNwb25zZXMucHVzaCh7XG4gICAgICAgICAgICBkcm9wZG93bjoge1xuICAgICAgICAgICAgICBvcHRzOiByZWFsb3B0cyxcbiAgICAgICAgICAgICAgbmV4dGFjdGlvbjogci5uZXh0YWN0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICByZXR1cm4gbmV3cmVzO1xufVxuXG4vKipcbiAqIFJldHVybiBhIHRleHQgd2l0aCB0aGUgcGFyYW1ldGVycyBpbnNpZGVcbiAqIEBwYXJhbSB0ZXh0IHRoZSB0ZXh0IHlvdSB3YW50IHRvIGZvcm1hdFxuICogQHBhcmFtIHBhcmFtcyB0aGUgcGFyYW1ldGVycyBmb3IgeW91ciB0ZXh0XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldFRleHRGb3JtYXRlZCh0ZXh0OiBzdHJpbmcsIHBhcmFtczogQ29udGV4dHMpIHtcbiAgYXdhaXQgaTE4bi5pbml0KHtcbiAgICBsbmc6ICdsYW5nJyxcbiAgICByZXNvdXJjZXM6IHtcbiAgICAgIGxhbmc6IHtcbiAgICAgICAgdHJhbnNsYXRpb246IHtcbiAgICAgICAgICBrZXk6IHRleHQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gaTE4bi50KCdrZXknLCB7XG4gICAgc2l0ZTogcGFyYW1zLnNpdGUsXG4gICAgdXNlcjogcGFyYW1zLnVzZXIsXG4gICAgY29uY2llcmdlczogcGFyYW1zLmNvbmNpZXJnZXMsXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgSW50ZW50UmVzdWx0LCBJbnRlbnRSZXF1ZXN0IH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgcmVzcG9uc2VtYW5hZ2VyIGZyb20gJy4uL3Jlc3BvbnNlbWFuYWdlci51dGlsJztcblxuYXN5bmMgZnVuY3Rpb24gZmFsbGJhY2socmVxdWVzdDogSW50ZW50UmVxdWVzdCkge1xuICBjb25zdCByZXM6IEludGVudFJlc3VsdCA9IHtcbiAgICBjb25maWRlbmNlOiByZXF1ZXN0LmNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IHJlcXVlc3QuY29udGV4dHMsXG4gICAgcmVzcG9uc2U6IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdmYWxsYmFjaycpLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZhbGxiYWNrLFxufTtcbiIsImltcG9ydCByZXNwb25zZW1hbmFnZXIgZnJvbSAnLi4vcmVzcG9uc2VtYW5hZ2VyLnV0aWwnO1xuaW1wb3J0IHsgSW50ZW50UmVxdWVzdCwgSW50ZW50UmVzdWx0IH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW50aW1lKHJlcXVlc3Q6IEludGVudFJlcXVlc3QpIHtcbiAgbGV0IHR4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQuaW5mb3Muc2NoZWR1bGVub3Rmb3VuZCcpO1xuICBpZiAocmVxdWVzdC5jb250ZXh0cy5zaXRlKSB7XG4gICAgdHh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2ludGVudC5pbmZvcy5zY2hlZHVsZScpO1xuICB9XG4gIGNvbnN0IHJlczogSW50ZW50UmVzdWx0ID0ge1xuICAgIGNvbmZpZGVuY2U6IHJlcXVlc3QuY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogcmVxdWVzdC5jb250ZXh0cyxcbiAgICByZXNwb25zZTogdHh0LFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb250YWN0KHJlcXVlc3Q6IEludGVudFJlcXVlc3QpIHtcbiAgbGV0IHR4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQuaW5mb3MuY29udGFjdG5vdGZvdW5kJyk7XG4gIGlmIChyZXF1ZXN0LmNvbnRleHRzLnNpdGUpIHtcbiAgICB0eHQgPSBhd2FpdCByZXNwb25zZW1hbmFnZXIubG9hZCgnaW50ZW50LmluZm9zLmNvbnRhY3QnKTtcbiAgfVxuICBjb25zdCByZXM6IEludGVudFJlc3VsdCA9IHtcbiAgICBjb25maWRlbmNlOiByZXF1ZXN0LmNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IHJlcXVlc3QuY29udGV4dHMsXG4gICAgcmVzcG9uc2U6IHR4dCxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VydmljZXMocmVxdWVzdDogSW50ZW50UmVxdWVzdCkge1xuICBsZXQgdHh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2ludGVudC5pbmZvcy5zZXJ2aWNlc25vdGZvdW5kJyk7XG4gIGlmIChyZXF1ZXN0LmNvbnRleHRzLnNpdGUpIHtcbiAgICB0eHQgPSBhd2FpdCByZXNwb25zZW1hbmFnZXIubG9hZCgnaW50ZW50LmluZm9zLnNlcnZpY2VzJyk7XG4gIH1cbiAgY29uc3QgcmVzOiBJbnRlbnRSZXN1bHQgPSB7XG4gICAgY29uZmlkZW5jZTogcmVxdWVzdC5jb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiByZXF1ZXN0LmNvbnRleHRzLFxuICAgIHJlc3BvbnNlOiB0eHQsXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbGFpc2NvbGlzKHJlcXVlc3Q6IEludGVudFJlcXVlc3QpIHtcbiAgbGV0IHR4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQuaW5mb3MucmVsYWlzY29saXNub3Rmb3VuZCcpO1xuICBpZiAocmVxdWVzdC5jb250ZXh0cy5zaXRlKSB7XG4gICAgdHh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2ludGVudC5pbmZvcy5yZWxhaXNjb2xpcycpO1xuICB9XG4gIGNvbnN0IHJlczogSW50ZW50UmVzdWx0ID0ge1xuICAgIGNvbmZpZGVuY2U6IHJlcXVlc3QuY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogcmVxdWVzdC5jb250ZXh0cyxcbiAgICByZXNwb25zZTogdHh0LFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9wZW50aW1lLFxuICBjb250YWN0LFxuICBzZXJ2aWNlcyxcbiAgcmVsYWlzY29saXMsXG59O1xuIiwiaW1wb3J0IHsgQ29udGV4dHMsIEludGVudFJlcXVlc3QsIEludGVudFJlc3VsdCB9IGZyb20gJy4uL3R5cGVzLnV0aWwnO1xuaW1wb3J0IHJlc3BvbnNlbWFuYWdlciBmcm9tICcuLi9yZXNwb25zZW1hbmFnZXIudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgRWNsLCB7IFNpdGVHcm91cCB9IGZyb20gJy4uLy4uL21vZGVscy9lY2wnO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2UgfSBmcm9tICcuLi9tZXNzYWdlLnV0aWwnO1xuXG5jb25zdCBlY2wgPSBuZXcgRWNsKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdHJhdGlvbihjOiBDb250ZXh0cywgc2l0ZUdyb3VwOiBTaXRlR3JvdXAgfCBudWxsKSB7XG4gIGlmICghYy5zaXRlIHx8ICFjLmZ1bGZpbGwgfHwgIXNpdGVHcm91cCB8fCAhYy51c2VyKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICAvLyBTdG9yZSByZWdpc3RyYXRpb24gcmVxdWVzdCBpbiBkYXRhYmFzZVxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgZWNsLnNhdmVSZWdpc3RyYXRpb24oXG4gICAgICBjLnNpdGUsXG4gICAgICBjLnVzZXIudXNlcklkIHx8ICc/JyxcbiAgICAgIGMudXNlci5lbWFpbCxcbiAgICAgIGMudXNlci5sYXN0bmFtZSxcbiAgICAgIGMudXNlci5maXJzdG5hbWUsXG4gICAgICBzaXRlR3JvdXAsXG4gICAgKTtcbiAgICBjb25zdCBsaW5rID0gYCR7Y29uZmlnLkVDTC51cmx9L2luc2NyaXB0aW9uL3ZlcmlmX2VtYWlsLnBocD90b2s9JHt0b2tlbn1gO1xuICAgIGF3YWl0IHNlbmRNZXNzYWdlKHtcbiAgICAgIGZyb206IGMuc2l0ZS5lbWFpbCxcbiAgICAgIHRvOiBjLnVzZXIuZW1haWwsXG4gICAgICBzdWJqZWN0OiAnVm90cmUgaW5zY3JpcHRpb24gw6AgbGEgQ29uY2llcmdlcmllJyxcbiAgICAgIGh0bWw6XG4gICAgICAgICc8aHRtbD4nICtcbiAgICAgICAgJzxoZWFkPicgK1xuICAgICAgICAnIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4nICtcbiAgICAgICAgJyAgIHAgeycgK1xuICAgICAgICAnICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OycgK1xuICAgICAgICAnICAgICBmb250LWZhbWlseTpDYWxpYnJpLCBzYW5zLXNlcmlmOycgK1xuICAgICAgICAnICAgfScgK1xuICAgICAgICAnIDwvc3R5bGU+JyArXG4gICAgICAgICc8L2hlYWQ+JyArXG4gICAgICAgICc8Ym9keT4nICtcbiAgICAgICAgYCA8cD5Cb25qb3VyICR7Yy51c2VyLmZpcnN0bmFtZX0sPC9wPjxiciAvPmAgK1xuICAgICAgICAnIDxwPk5vdXMgYXZvbnMgYmllbiBwcmlzIGVuIGNvbXB0ZSB2b3RyZSBpbnNjcmlwdGlvbiDDoCBsYSBjb25jaWVyZ2VyaWUuICcgK1xuICAgICAgICAnQWZpbiBkZSB2w6lyaWZpZXIgdm90cmUgYWRyZXNzZSBtYWlsLCBtZXJjaSBkZSBjbGlxdWVyIHN1ciBsZSBsaWVuIHN1aXZhbnQ6PC9wPicgK1xuICAgICAgICBgIDxhIGhyZWY9XCIke2xpbmt9XCI+VsOpcmlmaWVyIG1vbiBhZHJlc3NlIG1haWw8L2E+YCArXG4gICAgICAgICcgPHA+VW5lIGZvaXMgdm90cmUgYWRyZXNzZSB2w6lyaWZpw6llLCB2b3RyZSBjb21wdGUgc2VyYSBhY3RpZiBkYW5zIGxlcyBkZXV4IGpvdXJzIG91dnJhYmxlcyBzdWl2YW50IHZvdHJlIGluc2NyaXB0aW9uLjwvcD48YnI+JyArXG4gICAgICAgICcgPHA+w4AgdHLDqHMgYmllbnTDtHQgw6AgbGEgY29uY2llcmdlcmllICE8L3A+JyArXG4gICAgICAgICcgPHA+QXUgcGxhaXNpciBkZSB2b3VzIHJlbmRyZSBzZXJ2aWNlLjwvcD4nICtcbiAgICAgICAgJzwvYm9keT4nICtcbiAgICAgICAgJzwvaHRtbD4nLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIFNlbmQgcmVnaXN0cmF0aW9uIHJlcXVlc3QgYnkgbWFpbCB0byBjb25jaWVyZ2VcbiAgICBjb25zdCBub21Db25jaWVyZ2UgPSBFY2wuZ2V0UHJlbm9tQ29uY2llcmdlKGMuY29uY2llcmdlcywgZmFsc2UpO1xuICAgIGF3YWl0IHNlbmRNZXNzYWdlKFxuICAgICAge1xuICAgICAgICBmcm9tOiBjb25maWcuTUFJTC5zZW5kZXIsXG4gICAgICAgIHRvOiBjLnNpdGUuZW1haWwsXG4gICAgICAgIHN1YmplY3Q6IGBbTGlmZWVdIE5vdXZlbGxlIGluc2NyaXB0aW9uIMOgIHNhaXNpcmAsXG4gICAgICAgIHRleHQ6IGBTYWx1dCAke25vbUNvbmNpZXJnZX0sIGMnZXN0IExpZmVlICFcXG5cXG5MJ3V0aWxpc2F0ZXVyIHN1aXZhbnQgc291aGFpdGUgcydpbnNjcmlyZTpcXG5cXG4gIFNvbiBub206ICR7XG4gICAgICAgICAgYy51c2VyLmxhc3RuYW1lXG4gICAgICAgIH1cXG4gIFNvbiBQcsOpbm9tOiAke2MudXNlci5maXJzdG5hbWV9XFxuICBTb24gRW1haWw6ICR7XG4gICAgICAgICAgYy51c2VyLmxhc3RuYW1lXG4gICAgICAgIH1cXG4gIFNvbiBOwrA6ICR7Yy51c2VyLnVzZXJJZCB8fCAnPyd9XFxuICBTYSBjb25jaWVyZ2VyaWU6ICR7Yy5zaXRlXG4gICAgICAgICAgLmxpYmVsbGUgfHwgJz8nfVxcbiAgU29uIGNvZGUgZGUgcmVncm91cGVtZW50OiAke1xuICAgICAgICAgIHNpdGVHcm91cCA/IHNpdGVHcm91cC5ub20gOiAnPydcbiAgICAgICAgfVxcblxcbk1lcmNpIGRlIHByb2PDqWRlciDDoCBzb24gaW5zY3JpcHRpb24uXFxuXFxuQm9ubmUgam91cm7DqWUgIWAsXG4gICAgICB9LFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKHJlcXVlc3Q6IEludGVudFJlcXVlc3QpIHtcbiAgaWYgKCFyZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwpIHJldHVybiBudWxsO1xuICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJdO1xuICBjb25zdCByZXM6IEludGVudFJlc3VsdCA9IHtcbiAgICBjb25maWRlbmNlOiByZXF1ZXN0LmNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IHJlcXVlc3QuY29udGV4dHMsXG4gICAgcmVzcG9uc2U6IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQucmVnaXN0ZXIuYXNrbWFpbCcpLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck1haWwocmVxdWVzdDogSW50ZW50UmVxdWVzdCkge1xuICBpZiAoIXJlcXVlc3QuY29udGV4dHMuZnVsZmlsbCB8fCAhcmVxdWVzdC5jb250ZXh0cy51c2VyKSByZXR1cm4gbnVsbDtcbiAgbGV0IGNvbmYgPSByZXF1ZXN0LmNvbmZpZGVuY2U7XG4gIGlmIChcbiAgICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgJiZcbiAgICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwuaW5jbHVkZXMoY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXIpICYmXG4gICAgcmVxdWVzdC5lbnRpdGllcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09ICdidWlsdGluLmVtYWlsJykubGVuZ3RoID4gMFxuICApIHtcbiAgICByZXF1ZXN0LmNvbnRleHRzLnVzZXIuZW1haWwgPSByZXF1ZXN0LmVudGl0aWVzLmZpbHRlcihcbiAgICAgIGUgPT4gZS5uYW1lID09PSAnYnVpbHRpbi5lbWFpbCcsXG4gICAgKVswXS52YWx1ZTtcbiAgICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJtYWlsXTtcbiAgfSBlbHNlIHtcbiAgICBjb25mID0gMDtcbiAgfVxuICBjb25zdCByZXM6IEludGVudFJlc3VsdCA9IHtcbiAgICBjb250ZXh0czogcmVxdWVzdC5jb250ZXh0cyxcbiAgICByZXNwb25zZTogYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2ludGVudC5yZWdpc3Rlci5hc2tmaXJzdG5hbWUnKSxcbiAgICBjb25maWRlbmNlOiBjb25mLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck5hbWUocmVxdWVzdDogSW50ZW50UmVxdWVzdCkge1xuICBpZiAoIXJlcXVlc3QuY29udGV4dHMuZnVsZmlsbCB8fCAhcmVxdWVzdC5jb250ZXh0cy51c2VyKSByZXR1cm4gbnVsbDtcbiAgbGV0IGNvbmYgPSByZXF1ZXN0LmNvbmZpZGVuY2U7XG4gIGNvbnN0IG5hbWVzID0gcmVxdWVzdC5lbnRpdGllcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09ICduYW1lJyk7XG4gIGxldCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2RlZmF1bHQuZmFsbGJhY2snKTtcbiAgbGV0IG5hbWUgPSBudWxsO1xuICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xuICAgIG5hbWUgPSBuYW1lc1swXS52YWx1ZTtcbiAgfSBlbHNlIGlmIChyZXF1ZXN0LnF1ZXJ5LnNwbGl0KCcgJykubGVuZ3RoID09PSAxKSB7XG4gICAgbmFtZSA9IHJlcXVlc3QucXVlcnk7XG4gIH1cbiAgaWYgKFxuICAgIHJlcXVlc3QuY29udGV4dHMuZnVsZmlsbCAmJlxuICAgIHJlcXVlc3QuY29udGV4dHMuZnVsZmlsbC5pbmNsdWRlcyhjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3Rlcm1haWwpICYmXG4gICAgbmFtZVxuICApIHtcbiAgICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJtYWlsXTtcbiAgICBpZiAocmVxdWVzdC5jb250ZXh0cy51c2VyLmZpcnN0bmFtZSkge1xuICAgICAgcmVxdWVzdC5jb250ZXh0cy51c2VyLmxhc3RuYW1lID0gbmFtZTtcbiAgICAgIGlmIChyZXF1ZXN0LmNvbnRleHRzLnNpdGUpIHtcbiAgICAgICAgLy8gVXNlciBzaXRlIGdyb3VwIGlzIG5lZWRlZFxuICAgICAgICBjb25zdCBncm91cHMgPSBhd2FpdCBlY2wuZ2V0U2l0ZUdyb3VwcyhyZXF1ZXN0LmNvbnRleHRzLnNpdGUuaWQpO1xuICAgICAgICBpZiAoZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJjb2RlXTtcbiAgICAgICAgICB0ZXh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2ludGVudC5yZWdpc3Rlci5hc2tjb2RlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVxdWVzdC5jb250ZXh0cy5mdWxmaWxsID0gW107XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uKHJlcXVlc3QuY29udGV4dHMsIGdyb3Vwcy5sZW5ndGggPyBncm91cHNbMF0gOiBudWxsKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGV4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKFxuICAgICAgICAgICAgICAnaW50ZW50LnJlZ2lzdGVyLmRvbmVfYWZ0ZXJfdmFsaWRhdGlvbicsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZXh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2ludGVudC5yZWdpc3Rlci5kb25lJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJjb2RlXTtcbiAgICAgICAgdGV4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQucmVnaXN0ZXIuYXNrY29kZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmNvbnRleHRzLnVzZXIuZmlyc3RuYW1lID0gbmFtZTtcbiAgICAgIHRleHQgPSBhd2FpdCByZXNwb25zZW1hbmFnZXIubG9hZCgnaW50ZW50LnJlZ2lzdGVyLmFza2xhc3RuYW1lJyk7XG4gICAgfVxuICAgIGNvbmYgPSAwLjk7XG4gIH0gZWxzZSB7XG4gICAgY29uZiA9IDA7XG4gIH1cbiAgY29uc3QgcmVzOiBJbnRlbnRSZXN1bHQgPSB7XG4gICAgcmVzcG9uc2U6IHRleHQsXG4gICAgY29udGV4dHM6IHJlcXVlc3QuY29udGV4dHMsXG4gICAgY29uZmlkZW5jZTogY29uZixcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJDb2RlKHJlcXVlc3Q6IEludGVudFJlcXVlc3QpIHtcbiAgaWYgKCFyZXF1ZXN0LmNvbnRleHRzLmZ1bGZpbGwgfHwgIXJlcXVlc3QuY29udGV4dHMudXNlcikgcmV0dXJuIG51bGw7XG4gIGxldCBjb25mID0gcmVxdWVzdC5jb25maWRlbmNlO1xuICBsZXQgdHh0ID0gYXdhaXQgcmVzcG9uc2VtYW5hZ2VyLmxvYWQoJ2RlZmF1bHQuZmFsbGJhY2snKTtcbiAgaWYgKFxuICAgIHJlcXVlc3QuY29udGV4dHMuZnVsZmlsbCAmJlxuICAgIHJlcXVlc3QuY29udGV4dHMuZnVsZmlsbC5pbmNsdWRlcyhjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3RlcmNvZGUpICYmXG4gICAgcmVxdWVzdC5lbnRpdGllcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09ICdidWlsdGluLm51bWJlcicpLmxlbmd0aCA+IDAgJiZcbiAgICByZXF1ZXN0LmNvbnRleHRzLnNpdGVcbiAgKSB7XG4gICAgY29uc3Qgc2l0ZUdyb3VwTnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICByZXF1ZXN0LmVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4ubnVtYmVyJylbMF0udmFsdWUsXG4gICAgICAxMCxcbiAgICApO1xuICAgIC8vIENoZWNrIGdpdmVuIG51bWJlciBleGlzdHMgaW4gRUNMXG4gICAgY29uc3QgZ3JvdXBzID0gYXdhaXQgZWNsLmdldFNpdGVHcm91cHMocmVxdWVzdC5jb250ZXh0cy5zaXRlLmlkKTtcbiAgICBjb25zdCBzaXRlR3JvdXAgPVxuICAgICAgc2l0ZUdyb3VwTnVtYmVyICYmIHNpdGVHcm91cE51bWJlciA+IDAgJiYgc2l0ZUdyb3VwTnVtYmVyIDw9IGdyb3Vwcy5sZW5ndGhcbiAgICAgICAgPyBncm91cHNbc2l0ZUdyb3VwTnVtYmVyIC0gMV1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKCFzaXRlR3JvdXApIHtcbiAgICAgIHR4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQucmVnaXN0ZXIuYXNrX3NpdGVfZ3JvdXBfYWdhaW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdC5jb250ZXh0cy5mdWxmaWxsID0gW107XG4gICAgICByZXF1ZXN0LmNvbnRleHRzLnVzZXIuc2l0ZUdyb3VwID0gc2l0ZUdyb3VwTnVtYmVyO1xuICAgICAgaWYgKHJlZ2lzdHJhdGlvbihyZXF1ZXN0LmNvbnRleHRzLCBzaXRlR3JvdXApKSB7XG4gICAgICAgIHR4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKFxuICAgICAgICAgICdpbnRlbnQucmVnaXN0ZXIuZG9uZV9hZnRlcl92YWxpZGF0aW9uJyxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR4dCA9IGF3YWl0IHJlc3BvbnNlbWFuYWdlci5sb2FkKCdpbnRlbnQucmVnaXN0ZXIuZG9uZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25mID0gMC45O1xuICB9IGVsc2Uge1xuICAgIGNvbmYgPSAwO1xuICB9XG4gIGNvbnN0IHJlczogSW50ZW50UmVzdWx0ID0ge1xuICAgIGNvbnRleHRzOiByZXF1ZXN0LmNvbnRleHRzLFxuICAgIHJlc3BvbnNlOiB0eHQsXG4gICAgY29uZmlkZW5jZTogY29uZixcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICByZWdpc3RlcixcbiAgcmVnaXN0ZXJNYWlsLFxuICByZWdpc3Rlck5hbWUsXG4gIHJlZ2lzdGVyQ29kZSxcbn07XG4iLCIvKipcbiAqIENsb25lIGEgSnNvbiBvYmplY3RcbiAqIEBwYXJhbSBzcmMgdGhlIG9iamVjdCB0byBjbG9uZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoc3JjOiBhbnkpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3JjKSk7XG59XG4iLCJpbXBvcnQgd2F0c29uIGZyb20gJy4vc2VydmljZXMvd2F0c29uLnV0aWwnO1xuaW1wb3J0IGx1aXMgZnJvbSAnLi9zZXJ2aWNlcy9sdWlzLnV0aWwnO1xuaW1wb3J0IHdpdCBmcm9tICcuL3NlcnZpY2VzL3dpdC51dGlsJztcbmltcG9ydCBzYXAgZnJvbSAnLi9zZXJ2aWNlcy9zYXAudXRpbCc7XG5cbmltcG9ydCBmdWxmaWxsIGZyb20gJy4vZnVsZmlsbC51dGlsJztcbmltcG9ydCBDb250ZXh0c01hbmFnZXIgZnJvbSAnLi9jb250ZXh0c21hbmFnZXIudXRpbCc7XG5pbXBvcnQgZWNsLCB7IENvbmNpZXJnZSwgU2l0ZSB9IGZyb20gJy4uL21vZGVscy9lY2wnO1xuaW1wb3J0IHtcbiAgQ29udGV4dHMsXG4gIFJlcXVlc3QsXG4gIFNlcnZpY2VSZXF1ZXN0LFxuICBGdWxmaWxsUmVzdWx0LFxuICBGdWxmaWxsUmVxdWVzdCxcbiAgUGFyc2VkUmVzcG9uc2UsXG59IGZyb20gJy4vdHlwZXMudXRpbCc7XG5cbi8qKlxuICogR2V0IGNvbnRleHRzIHJlbGF0aXZlIHRvIHRoZSB1c2VyIHNpdGVcbiAqIEBwYXJhbSB0byBQaG9uZSBudW1iZXIgb3Igc2xhY2sgaWQgb2YgdGhlIG1lZGlhIHdoZXJlIHRoZSBtZXNzYWdlIGFycml2ZWQgOiBzdHJpbmdcbiAqIEBwYXJhbSBwbGF0Zm9ybSBQbGF0Zm9ybSB3aGljaCByZWNlaXZlZCB0aGUgbWVzc2FnZSAoc2xhY2ssIHRlbCkgOiBzdHJpbmdcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aGljaCBjb250YWlucyB0aGUgaW5mb3JtYXRpb25zIHJlbGF0aXZlIHRvIHRoZSB1c2VyIHNpdGUgOiBTaXRlQ29udGV4dHNcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0U2l0ZUNvbnRleHRzKFxuICB0bzogc3RyaW5nLFxuICBwbGF0Zm9ybTogc3RyaW5nLFxuKTogUHJvbWlzZTx7IGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdOyBzaXRlOiBTaXRlIHwgbnVsbCB9PiB7XG4gIGxldCBzZXJ2aWNlID0gJ3R3aWxpbyc7XG4gIGlmIChwbGF0Zm9ybSA9PT0gJ3NsYWNrJykge1xuICAgIHNlcnZpY2UgPSAnc2xhY2snO1xuICB9XG4gIGlmICghdG8pIHRocm93IEVycm9yKGBVbmtub3duIHRvIGZvciBzZXJ2aWNlICR7c2VydmljZX1gKTtcbiAgY29uc3QgRWNsID0gbmV3IGVjbCgpO1xuICBjb25zdCBzaXRlID0gYXdhaXQgRWNsLmdldFNpdGVJbmZvcyhzZXJ2aWNlLCB0byk7XG4gIGlmICghc2l0ZSkgdGhyb3cgRXJyb3IoYFVua25vd24gU2l0ZSBmb3Igc2VydmljZSAke3NlcnZpY2V9IHdpdGggaWQgJHt0b31gKTtcblxuICBjb25zdCBjb25jaWVyZ2VzID0gYXdhaXQgRWNsLmdldENvbmNpZXJnZUxpc3Qoc2l0ZS5jb2RlKTtcbiAgcmV0dXJuIHtcbiAgICBjb25jaWVyZ2VzLFxuICAgIHNpdGUsXG4gIH07XG59XG5cbi8qKlxuICogSGFuZGxlIGEgbWVzc2FnZSBhbmQgcmV0dXJuIGEgcmVzcG9uc2VcbiAqIEBwYXJhbSBtc2cgTWVzc2FnZSBzZW50IGJ5IHVzZXIgOiBzdHJpbmdcbiAqIEBwYXJhbSBmcm9tIFVzZXIgbWFpbCBvciBwaG9uZSBudW1iZXIgOiBzdHJpbmdcbiAqIEBwYXJhbSB0byBTbGFjayBjb2RlIG9yIHBob25lIG51bWJlciA6IHN0cmluZ1xuICogQHBhcmFtIHNlcnZpY2UgTkxQIHRvIHVzZSAoc2FwLCBsdWlzLCB3YXRzb24sIHdpdCkgOiBzdHJpbmdcbiAqIEBwYXJhbSBwbGF0Zm9ybSBUeXBlIG9mIHRoZSBwbGF0Zm9ybSAoc2xhY2ssIHRlbCkgOiBzdHJpbmdcbiAqIEBwYXJhbSBhY2NlcHRlZHR5cGVzIFR5cGVzIGFjY2VwdGVkIGJ5IHRoZSBwbGF0Zm9ybSAodGV4dCwgYnV0dG9uLCBkcm9wZG93biwgaW1hZ2UsIGxpbmspIDogc3RyaW5nW11cbiAqIEByZXR1cm5zIEFuIGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyB0aGUgcmVzcG9uc2VzIDogYW55XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuKTogUHJvbWlzZTxQYXJzZWRSZXNwb25zZSB8IG51bGw+IHtcbiAgaWYgKCFyZXF1ZXN0LnNlcnZpY2UgJiYgIXJlcXVlc3QucmVzdWx0KSByZXR1cm4gbnVsbDtcblxuICAvKiBHZXQgY29udGV4dHMgKi9cbiAgY29uc3QgY29udGV4dHM6IENvbnRleHRzID0gYXdhaXQgQ29udGV4dHNNYW5hZ2VyLmxvYWQocmVxdWVzdC5mcm9tKTtcbiAgY29uc3QgYToge1xuICAgIGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdO1xuICAgIHNpdGU6IFNpdGUgfCBudWxsO1xuICB9ID0gYXdhaXQgZ2V0U2l0ZUNvbnRleHRzKHJlcXVlc3QudG8sIHJlcXVlc3QucGxhdGZvcm0pO1xuICBjb250ZXh0cy5zaXRlID0gYS5zaXRlO1xuICBjb250ZXh0cy5jb25jaWVyZ2VzID0gYS5jb25jaWVyZ2VzO1xuXG4gIGlmIChyZXF1ZXN0LnNlcnZpY2UpIHtcbiAgICAvKiBHZXQgc2VydmljZSAoTkxQKSBSZXN1bHQgKi9cbiAgICBjb25zdCBzZXJ2aWNlUmVxdWVzdDogU2VydmljZVJlcXVlc3QgPSB7XG4gICAgICBjb250ZXh0cyxcbiAgICAgIG1zZzogcmVxdWVzdC5tc2csXG4gICAgfTtcbiAgICBzd2l0Y2ggKHJlcXVlc3Quc2VydmljZSkge1xuICAgICAgY2FzZSAnd2F0c29uJzpcbiAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSBhd2FpdCB3YXRzb24oc2VydmljZVJlcXVlc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2x1aXMnOlxuICAgICAgICByZXF1ZXN0LnJlc3VsdCA9IGF3YWl0IGx1aXMoc2VydmljZVJlcXVlc3QpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dpdCc6XG4gICAgICAgIHJlcXVlc3QucmVzdWx0ID0gYXdhaXQgd2l0KHNlcnZpY2VSZXF1ZXN0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzYXAnOlxuICAgICAgICByZXF1ZXN0LnJlc3VsdCA9IGF3YWl0IHNhcChzZXJ2aWNlUmVxdWVzdCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVxdWVzdC5yZXN1bHQgPSB7XG4gICAgICAgICAgY29udGV4dHMsXG4gICAgICAgICAgcmVzcG9uc2U6IG51bGwsXG4gICAgICAgICAgaW50ZW50czogW10sXG4gICAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiByZXF1ZXN0Lm1zZyxcbiAgICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5yZXN1bHQpIHtcbiAgICByZXF1ZXN0LnJlc3VsdC5jb250ZXh0cyA9IGNvbnRleHRzO1xuICB9XG5cbiAgLyogQ2hhbmdlIGxhbmd1YWdlICovXG4gIGxldCBsYW5nID0gJ2ZyLXR1JztcbiAgaWYgKHJlcXVlc3QudG8gPT09ICcrMzM3NTU1MzY5MTAnKSB7XG4gICAgbGFuZyA9ICdmci12b3VzJztcbiAgfVxuXG4gIC8qIEdldCBmdWxmaWxsIFJlc3BvbnNlICovXG4gIGlmICghcmVxdWVzdC5yZXN1bHQpIHJldHVybiBudWxsO1xuICBjb25zdCBmdWxmaWxsUmVxdWVzdDogRnVsZmlsbFJlcXVlc3QgPSB7XG4gICAgbGFuZyxcbiAgICByZXN1bHQ6IHJlcXVlc3QucmVzdWx0LFxuICAgIGFjY2VwdGVkdHlwZXM6IHJlcXVlc3QuYWNjZXB0ZWR0eXBlcyxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2U6IEZ1bGZpbGxSZXN1bHQgPSBhd2FpdCBmdWxmaWxsKGZ1bGZpbGxSZXF1ZXN0KTtcblxuICAvKiBTYXZlIGNvbnRleHRzICovXG4gIGF3YWl0IENvbnRleHRzTWFuYWdlci5zYXZlKHJlcXVlc3QuZnJvbSwgcmVzcG9uc2UuY29udGV4dHMpO1xuXG4gIC8qIFJldHVybiByZXNwb25zZSB0ZXh0ICovXG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cbiIsImltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy8nO1xuXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgaG9zdDogY29uZmlnLk1BSUwuaG9zdCxcbiAgcG9ydDogY29uZmlnLk1BSUwucG9ydCxcbiAgc2VjdXJlOiBjb25maWcuTUFJTC5zZWN1cmUsXG4gIC8vIGF1dGg6IHtcbiAgLy8gICAgIHVzZXI6ICd4eHhAeHguY29tJyxcbiAgLy8gICAgIHBhc3M6ICd4eHh4J1xuICAvLyB9LFxuICB0bHM6IHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9LFxufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbE9wdGlvbnMge1xuICBmcm9tOiBzdHJpbmc7XG4gIHRvOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgYmNjPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHJlcGx5VG8/OiBzdHJpbmc7XG4gIHN1YmplY3Q6IHN0cmluZztcbiAgdGV4dD86IHN0cmluZztcbiAgaHRtbD86IHN0cmluZztcbiAgYXR0YWNobWVudHM/OiBhbnlbXTtcbn1cblxuLyoqXG4gKiBTZW5kIGEgbWFpbFxuICogQHBhcmFtIG9wdGlvbnMgVGhlIG1haWwgdG8gc2VuZFxuICogQHBhcmFtIHRocm93RXJyb3IgaWYgdHJ1ZSB0aGUgZnVuY3Rpb24gY2FuIHRocm93IGVycm9yc1xuICovXG5leHBvcnQgY29uc3Qgc2VuZE1lc3NhZ2UgPSBhc3luYyAoXG4gIG9wdGlvbnM6IE1haWxPcHRpb25zLFxuICB0aHJvd0Vycm9yOiBib29sZWFuID0gdHJ1ZSxcbikgPT4ge1xuICB0cnkge1xuICAgIGlmIChjb25maWcuTUFJTC5lbmFibGUpIHtcbiAgICAgIGNvbnN0IG1haWxPcHRpb25zID0ge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB0bzogY29uZmlnLk1BSUwucmVjaXBpZW50IHx8IG9wdGlvbnMudG8sXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbE9wdGlvbnMpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmICh0aHJvd0Vycm9yKSB0aHJvdyBlO1xuICB9XG59O1xuIiwiaW1wb3J0IERhdGFzdG9yZSBmcm9tICduZWRiJztcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcy51dGlsJztcblxuLy8gQ29ubmVjdCB0byBhIERCIHN0b3JlZCBpbiBEQi9yZXNwb25zZXNcbmNvbnN0IGRiID0gbmV3IERhdGFzdG9yZSh7IGZpbGVuYW1lOiAnREIvcmVzcG9uc2VzJywgYXV0b2xvYWQ6IHRydWUgfSk7XG5cbi8qKlxuICogSW5zZXJ0IGRhdGFzIGluIHRoZSBkYXRhYmFzZSB3aXRoIHByb21pc2VcbiAqIEBwYXJhbSBxdWVyeSBhIE5vU1FMIHF1ZXJ5IGxpa2Ugd2l0aCBNb25nb0RCXG4gKi9cbmNvbnN0IGluc2VydDogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi5pbnNlcnQocXVlcnksIChlcnI6IGFueSwgbmV3RG9jOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG5ld0RvYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgZGF0YXMgaW4gdGhlIGRhdGFiYXNlIHdpdGggcHJvbWlzZVxuICogQHBhcmFtIHF1ZXJ5IGEgTm9TUUwgcXVlcnkgbGlrZSB3aXRoIE1vbmdvREJcbiAqL1xuY29uc3QgdXBkYXRlOiBhbnkgPSBhc3luYyAocXVlcnk6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiLnVwZGF0ZShcbiAgICAgIHsgaW50ZW50OiBxdWVyeS5pbnRlbnQgfSxcbiAgICAgIHF1ZXJ5LmFsbCxcbiAgICAgIHt9LFxuICAgICAgKGVycjogYW55LCBudW1SZXBsYWNlZDogYW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKG51bVJlcGxhY2VkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9KTtcbn07XG5cbi8qKlxuICogRmluZCBvbmUgcm93IGluIHRoZSBkYXRhYmFzZSB3aXRoIHByb21pc2VcbiAqIEBwYXJhbSBxdWVyeSBhIE5vU1FMIHF1ZXJ5IGxpa2Ugd2l0aCBNb25nb0RCXG4gKi9cbmNvbnN0IGZpbmRvbmU6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIuZmluZE9uZShxdWVyeSwgKGVycjogYW55LCBkb2M6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZG9jKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEZpbmQgZGF0YXMgaW4gdGhlIGRhdGFiYXNlIHdpdGggcHJvbWlzZVxuICogQHBhcmFtIHF1ZXJ5IGEgTm9TUUwgcXVlcnkgbGlrZSB3aXRoIE1vbmdvREJcbiAqL1xuY29uc3QgZmluZDogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi5maW5kKHF1ZXJ5LCAoZXJyOiBhbnksIGRvY3M6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZG9jcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBTYXZlIGFuIGludGVudCByZXNwb25zZSBpbiB0aGUgREIsIHRoZSBpbnRlbnQgbXVzdCBhbHJlYWR5IGV4aXN0c1xuICogQHBhcmFtIHJlc3BvbnNlIHRoZSByZXNwb25zZSBvYmplY3RcbiAqL1xuYXN5bmMgZnVuY3Rpb24gc2F2ZShyZXNwb25zZTogYW55KSB7XG4gIGF3YWl0IHVwZGF0ZSh7IGludGVudDogcmVzcG9uc2UuaW50ZW50LCBhbGw6IHJlc3BvbnNlIH0pO1xufVxuXG4vKipcbiAqIExvYWQgYW4gaW50ZW50IGJ5IGl0J3MgbmFtZVxuICogQHBhcmFtIGludGVudCB0aGUgaW50ZW50IG5hbWUgd2l0aCB0aGUgdHlwZSBsaWtlICd0eXBlLmludGVudCdcbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZChpbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmluZG9uZSh7IGludGVudCB9KTtcblxuICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmaW5kb25lKHsgaW50ZW50OiAnZmFsbGJhY2snIH0pO1xuICB9XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGRpZmZlcmVudCBpbnRlbnRzIGZvciBhIGdpdmVuIHR5cGVcbiAqIEBwYXJhbSB0eXBlIHRoZSBpbnRlbnQgdHlwZSBsaWtlICd0eXBlLmludGVudCdcbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZHR5cGUodHlwZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgZmlsZXMgPSBhd2FpdCBmaW5kKHsgdHlwZSB9KTtcbiAgaWYgKGZpbGVzKSB7XG4gICAgY29uc3QgcmVhbGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZpbGVzLmZvckVhY2goKGY6IGFueSkgPT4ge1xuICAgICAgcmVhbGZpbGVzLnB1c2goZi5pbnRlbnQuc3BsaXQoJy4nKVsxXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlYWxmaWxlcztcbiAgfVxuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogR2V0IHRoZSBkaWZmZXJlbnQgdHlwZXNcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0dHlwZXMoKTogUHJvbWlzZTxhbnk+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmaW5kKHt9KTtcbiAgaWYgKHJlc3BvbnNlKSB7XG4gICAgY29uc3QgcmVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHJlc3BvbnNlLmZvckVhY2goKHI6IGFueSkgPT4ge1xuICAgICAgaWYgKCFyZXMuaW5jbHVkZXMoci50eXBlKSkge1xuICAgICAgICByZXMucHVzaChyLnR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIExvYWQgYW4gaW50ZW50IHJlc3BvbnNlIGFuZCByZXR1cm4gdGhlIG9iamVjdFxuICogQHBhcmFtIGludGVudCBpbnRlbnQgbmFtZSB3aXRoIHRoZSB0eXBlIGxpa2UgJ3R5cGUuaW50ZW50J1xuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkZmlsZShpbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGZpbmRvbmUoeyBpbnRlbnQgfSk7XG4gIGlmICghcmVzcG9uc2UpIHtcbiAgICByZXNwb25zZSA9IGF3YWl0IGZpbmRvbmUoeyBpbnRlbnQ6ICdkZWZhdWx0LmZhbGxiYWNrJyB9KTtcbiAgfVxuICBkZWxldGUgcmVzcG9uc2UuX2lkO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2F2ZSxcbiAgbG9hZCxcbiAgbG9hZHR5cGUsXG4gIGdldHR5cGVzLFxuICBsb2FkZmlsZSxcbn07XG4iLCJpbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgU2VydmljZVJlcXVlc3QsIFNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi90eXBlcy51dGlsJztcbmltcG9ydCB7IGV4ZWNyZXF1ZXN0IH0gZnJvbSAnLi4vYXN5bmMudXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKHJlcXVlc3Q6IFNlcnZpY2VSZXF1ZXN0KSB7XG4gIGNvbnN0IHJlc3VsdDogU2VydmljZVJlc3VsdCA9IHtcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICBpbnRlbnRzOiBbXSxcbiAgICBlbnRpdGllczogW10sXG4gICAgcXVlcnk6IHJlcXVlc3QubXNnLFxuICAgIGNvbnRleHRzOiByZXF1ZXN0LmNvbnRleHRzLFxuICB9O1xuICB0cnkge1xuICAgIGNvbnN0IGVuZHBvaW50ID1cbiAgICAgICdodHRwczovL3dlc3R1cy5hcGkuY29nbml0aXZlLm1pY3Jvc29mdC5jb20vbHVpcy92Mi4wL2FwcHMvJztcbiAgICBjb25zdCBhcHBJZCA9IGNvbmZpZy5MVUlTLmFwcElkO1xuICAgIGNvbnN0IGVuZHBvaW50a2V5ID0gY29uZmlnLkxVSVMuZW5kcG9pbnRLZXk7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSB7XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgcTogcmVxdWVzdC5tc2csXG4gICAgICAnc3Vic2NyaXB0aW9uLWtleSc6IGVuZHBvaW50a2V5LFxuICAgIH07XG4gICAgY29uc3QgcmVxID0gYCR7ZW5kcG9pbnR9JHthcHBJZH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkocXVlcnlQYXJhbXMpfWA7XG4gICAgbGV0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHJlcSk7XG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMuYm9keSk7XG4gICAgcmVzLmludGVudHMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuaW50ZW50cy5wdXNoKHtcbiAgICAgICAgbmFtZTogZS5pbnRlbnQsXG4gICAgICAgIGNvbmZpZGVuY2U6IGUuc2NvcmUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXN1bHQuZW50aXRpZXMgPSBbXTtcbiAgICByZXMuZW50aXRpZXMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuZW50aXRpZXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGUudHlwZSxcbiAgICAgICAgdmFsdWU6IGUuZW50aXR5LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2VydmljZVJlcXVlc3QsIFNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi90eXBlcy51dGlsJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IGV4ZWNyZXF1ZXN0IH0gZnJvbSAnLi4vYXN5bmMudXRpbCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuLyoqXG4gKiBHZXQgaW50ZW50cyBhbmQgZW50aXRpZXMgZnJvbSBTQVAgcmVsYXRpdmUgdG8gYSBtZXNzYWdlXG4gKiBAcGFyYW0gbXNnIHRoZSB1c2VyIG1lc3NhZ2VcbiAqIEBwYXJhbSBjb250ZXh0cyB0aGUgY29udGV4dHMgKG5vdCB1c2VmdWxsIGhlcmUgYnV0IGNhbiBiZSBmb3IgZGlhbG9nZmxvdyBvciB3YXRzb24pXG4gKiBAcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgcmVzdWx0IGFuZCB0aGUgY29udGV4dHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24ocmVxdWVzdDogU2VydmljZVJlcXVlc3QpIHtcbiAgY29uc3QgcmVzdWx0OiBTZXJ2aWNlUmVzdWx0ID0ge1xuICAgIHJlc3BvbnNlOiBudWxsLFxuICAgIGludGVudHM6IFtdLFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBxdWVyeTogcmVxdWVzdC5tc2csXG4gICAgY29udGV4dHM6IHJlcXVlc3QuY29udGV4dHMsXG4gIH07XG4gIHRyeSB7XG4gICAgbGV0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmNhaS50b29scy5zYXAvYnVpbGQvdjEvZGlhbG9nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgVG9rZW4gJHtjb25maWcuU0FQLnRva2VufWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAganNvbjoge1xuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgY29udGVudDogcmVxdWVzdC5tc2csXG4gICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgICAgICBjb252ZXJzYXRpb25faWQ6IHV1aWQoKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmVzID0gcmVzLmJvZHkucmVzdWx0cy5ubHA7XG4gICAgcmVzLmludGVudHMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuaW50ZW50cy5wdXNoKHtcbiAgICAgICAgbmFtZTogZS5zbHVnLFxuICAgICAgICBjb25maWRlbmNlOiBlLmNvbmZpZGVuY2UsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBrZXk6IHN0cmluZztcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGZvcmluXG4gICAgZm9yIChrZXkgaW4gcmVzLmVudGl0aWVzKSB7XG4gICAgICByZXMuZW50aXRpZXNba2V5XS5mb3JFYWNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB2YWx1ZTogZS5yYXcsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgd2F0c29uIGZyb20gJ3dhdHNvbi1kZXZlbG9wZXItY2xvdWQvYXNzaXN0YW50L3YyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IFNlcnZpY2VSZXF1ZXN0LCBTZXJ2aWNlUmVzdWx0IH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5cbmNvbnN0IGNyZWF0ZVNlc3Npb246IGFueSA9IGFzeW5jIChhc3Npc3RhbnQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtZXhwcmVzc2lvblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGFzc2lzdGFudC5jcmVhdGVTZXNzaW9uKG9iaiwgKGVycjogYW55LCByZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCBzZW5kTWVzc2FnZTogYW55ID0gYXN5bmMgKGFzc2lzdGFudDogYW55LCBvYmo6IGFueSkgPT4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXNzaXN0YW50Lm1lc3NhZ2Uob2JqLCAoZXJyOiBhbnksIHJlczogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKHJlcXVlc3Q6IFNlcnZpY2VSZXF1ZXN0KSB7XG4gIGNvbnN0IHJlc3VsdDogU2VydmljZVJlc3VsdCA9IHtcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICBpbnRlbnRzOiBbXSxcbiAgICBlbnRpdGllczogW10sXG4gICAgcXVlcnk6IHJlcXVlc3QubXNnLFxuICAgIGNvbnRleHRzOiByZXF1ZXN0LmNvbnRleHRzLFxuICB9O1xuICB0cnkge1xuICAgIC8vIENyZWF0ZSBhc3Npc3RhbnRcbiAgICBjb25zdCBhc3Npc3RhbnQgPSBuZXcgd2F0c29uKHtcbiAgICAgIGlhbV9hcGlrZXk6IGNvbmZpZy5XQVRTT04uYXBpS2V5LFxuICAgICAgdmVyc2lvbjogJzIwMTgtMDktMjAnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9nYXRld2F5LWxvbi53YXRzb25wbGF0Zm9ybS5uZXQvYXNzaXN0YW50L2FwaScsXG4gICAgfSk7XG4gICAgY29uc3QgYXNzaXN0YW50SWQgPSBjb25maWcuV0FUU09OLmFzc2lzdGFudElkO1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBjcmVhdGVTZXNzaW9uKGFzc2lzdGFudCwge1xuICAgICAgYXNzaXN0YW50X2lkOiBhc3Npc3RhbnRJZCxcbiAgICB9KTtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSBzZXNzaW9uLnNlc3Npb25faWQ7XG4gICAgcmVxdWVzdC5jb250ZXh0cy5zZXJ2aWNlLndhdHNvbklkID0gc2Vzc2lvbklkO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNlbmRNZXNzYWdlKGFzc2lzdGFudCwge1xuICAgICAgYXNzaXN0YW50X2lkOiBhc3Npc3RhbnRJZCxcbiAgICAgIHNlc3Npb25faWQ6IHNlc3Npb25JZCxcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1lc3NhZ2VfdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiByZXF1ZXN0Lm1zZyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHJldHVybl9jb250ZXh0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNvbnRleHRzOiByZXF1ZXN0LmNvbnRleHRzLnNlcnZpY2Uud2F0c29uLFxuICAgIH0pO1xuICAgIHJlcXVlc3QuY29udGV4dHMuc2VydmljZS53YXRzb24gPSByZXMuY29udGV4dDtcbiAgICByZXN1bHQucmVzcG9uc2UgPSByZXMub3V0cHV0LmdlbmVyaWNbMF0udGV4dDtcblxuICAgIHJlcy5vdXRwdXQuaW50ZW50cy5mb3JFYWNoKChlOiBhbnkpID0+IHtcbiAgICAgIHJlc3VsdC5pbnRlbnRzLnB1c2goe1xuICAgICAgICBjb25maWRlbmNlOiBlLmNvbmZpZGVuY2UsXG4gICAgICAgIG5hbWU6IGUuaW50ZW50LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzdWx0LmVudGl0aWVzID0gW107XG4gICAgcmVzLm91dHB1dC5lbnRpdGllcy5mb3JFYWNoKChlOiBhbnkpID0+IHtcbiAgICAgIHJlc3VsdC5lbnRpdGllcy5wdXNoKHtcbiAgICAgICAgbmFtZTogZS5lbnRpdHksXG4gICAgICAgIHZhbHVlOiByZXF1ZXN0Lm1zZy5zdWJzdHJpbmcoZS5sb2NhdGlvblswXSwgZS5sb2NhdGlvblsxXSksXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBXaXQgfSBmcm9tICdub2RlLXdpdCc7XG5cbmltcG9ydCB7IFNlcnZpY2VSZXN1bHQsIFNlcnZpY2VSZXF1ZXN0IH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKHJlcXVlc3Q6IFNlcnZpY2VSZXF1ZXN0KSB7XG4gIGNvbnN0IHJlc3VsdDogU2VydmljZVJlc3VsdCA9IHtcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICBpbnRlbnRzOiBbXSxcbiAgICBlbnRpdGllczogW10sXG4gICAgcXVlcnk6IHJlcXVlc3QubXNnLFxuICAgIGNvbnRleHRzOiByZXF1ZXN0LmNvbnRleHRzLFxuICB9O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgY2xpZW50ID0gbmV3IFdpdCh7IGFjY2Vzc1Rva2VuOiBjb25maWcuV0lULmFjY2Vzc3Rva2VuIH0pO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNsaWVudC5tZXNzYWdlKHJlcXVlc3QubXNnLCB7fSk7XG4gICAgbGV0IGtleTogc3RyaW5nO1xuICAgIGZvciAoa2V5IGluIHJlcy5lbnRpdGllcykge1xuICAgICAgaWYgKGtleSA9PT0gJ2ludGVudCcpIHtcbiAgICAgICAgcmVzLmVudGl0aWVzLmludGVudC5mb3JFYWNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgICByZXN1bHQuaW50ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGUudmFsdWUsXG4gICAgICAgICAgICBjb25maWRlbmNlOiBlLmNvbmZpZGVuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLmVudGl0aWVzW2tleV0uZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgdmFsdWU6IGUudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZXhlY3JlcXVlc3QgfSBmcm9tICcuL2FzeW5jLnV0aWwnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8qKlxuICogR2V0IGFsbCB0aGUgaW50ZW50cyBuYW1lIGluIFNBUCByZWNhc3RcbiAqIEByZXR1cm5zIGEgbGlzdCBvZiBpbnRlbnRzIG5hbWUgOiBzdHJpbmdbXVxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRJbnRlbnRzKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgbGV0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHtcbiAgICB1cmw6IGBodHRwczovL2FwaS5jYWkudG9vbHMuc2FwL3RyYWluL3YyL3VzZXJzLyR7XG4gICAgICBjb25maWcuU0FQLnVzZXJzbHVnXG4gICAgfS9ib3RzLyR7Y29uZmlnLlNBUC5ib3RzbHVnfS92ZXJzaW9ucy8ke1xuICAgICAgY29uZmlnLlNBUC52ZXJzaW9uc2x1Z1xuICAgIH0vZGF0YXNldC9pbnRlbnRzYCxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBUb2tlbiAke2NvbmZpZy5TQVAuZGV2dG9rZW59YCxcbiAgICB9LFxuICB9KTtcbiAgcmVzID0gSlNPTi5wYXJzZShyZXMuYm9keSk7XG4gIGNvbnN0IGludGVudHM6IHN0cmluZ1tdID0gW107XG4gIHJlcy5yZXN1bHRzLmZvckVhY2goKHI6IGFueSkgPT4ge1xuICAgIGludGVudHMucHVzaChyLm5hbWUpO1xuICB9KTtcbiAgcmV0dXJuIGludGVudHM7XG59XG5cbi8qKlxuICogR2V0IHRoZSBkaWZmZXJlbnQgaW50ZW50IHR5cGVzIHdoaWNoIGFyZSBmb3JtZWQgbGlrZSAndHlwZS1pbnRlbnQnXG4gKiBAcmV0dXJucyBhIGxpc3Qgb2YgdHlwZXMgbmFtZSA6IHN0cmluZyBbXVxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRUeXBlcygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IGludGVudHMgPSBhd2FpdCBnZXRJbnRlbnRzKCk7XG4gIGNvbnN0IHR5cGVzOiBzdHJpbmdbXSA9IFtdO1xuICBpbnRlbnRzLmZvckVhY2goKGk6IHN0cmluZykgPT4ge1xuICAgIHR5cGVzLnB1c2goaS5zcGxpdCgnLScpWzBdKTtcbiAgfSk7XG4gIHJldHVybiB0eXBlcztcbn1cblxuLyoqXG4gKiBHZXQgYWxsIHRoZSBpbnRlbnRzIG5hbWUgZm9yIG9uZSB0eXBlIHdpdGhvdXQgdGhlIHR5cGUgbGlrZSAndHlwZS1pbnRlbnRuYW1lJ1xuICogQHBhcmFtIHR5cGUgbmFtZSBvZiBhIHR5cGUgOiBzdHJpbmdcbiAqIEByZXR1cm5zIGEgbGlzdCBvZiBpbnRlbnRzIG5hbWUgOiBzdHJpbmdbXVxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkdHlwZSh0eXBlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IGludGVudHMgPSBhd2FpdCBnZXRJbnRlbnRzKCk7XG4gIGNvbnN0IGZpbGVzOiBzdHJpbmdbXSA9IFtdO1xuICBpbnRlbnRzLmZvckVhY2goKGk6IHN0cmluZykgPT4ge1xuICAgIGlmIChpLnNwbGl0KCctJylbMF0gPT09IHR5cGUpIHtcbiAgICAgIGZpbGVzLnB1c2goaS5zcGxpdCgnLScpWzFdKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZmlsZXM7XG59XG5cbi8qKlxuICogR2V0IHRoZSBleHByZXNzaW9ucyBmb3Igb25lIGludGVudFxuICogQHBhcmFtIGZpbGUgdGhlIGludGVudCBuYW1lIHdpdGggdGhlIHR5cGUgbGlrZSAndHlwZS1pbnRlbnQnXG4gKiBAcmV0dXJucyBhIGxpc3Qgb2YgZXhwcmVzc2lvbnMgc2VlIFNBUCBkb2MgdG8gaGF2ZSB0aGUgc3RydWN0dXJlIDogYW55W11cbiAqL1xuYXN5bmMgZnVuY3Rpb24gbG9hZGV4cHJlc3Npb25zKGZpbGU6IHN0cmluZyk6IFByb21pc2U8YW55W10+IHtcbiAgbGV0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHtcbiAgICB1cmw6IGBodHRwczovL2FwaS5jYWkudG9vbHMuc2FwL3RyYWluL3YyL3VzZXJzLyR7XG4gICAgICBjb25maWcuU0FQLnVzZXJzbHVnXG4gICAgfS9ib3RzLyR7Y29uZmlnLlNBUC5ib3RzbHVnfS92ZXJzaW9ucy8ke1xuICAgICAgY29uZmlnLlNBUC52ZXJzaW9uc2x1Z1xuICAgIH0vZGF0YXNldC9pbnRlbnRzLyR7ZmlsZX0vZXhwcmVzc2lvbnNgLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgQXV0aG9yaXphdGlvbjogYFRva2VuICR7Y29uZmlnLlNBUC5kZXZ0b2tlbn1gLFxuICAgIH0sXG4gIH0pO1xuICByZXMgPSBKU09OLnBhcnNlKHJlcy5ib2R5KTtcbiAgcmV0dXJuIHJlcy5yZXN1bHRzO1xufVxuXG4vKipcbiAqIEdldCBhIGpzb24gd2hpY2ggcmVwcmVzZW50IHRoZSB0cmFpbmluZyBzZW50ZW5jZXMgb2YgYW4gaW50ZW50XG4gKiBAcGFyYW0gZmlsZSB0aGUgaW50ZW50IG5hbWUgd2l0aCB0aGUgdHlwZSBsaWtlICd0eXBlLWludGVudCdcbiAqIEByZXR1cm5zIGEgbGlzdCBvZiBzZW50ZW5jZXMgOiBzdHJpbmdbXVxuICovXG5hc3luYyBmdW5jdGlvbiBsb2FkZmlsZShmaWxlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGxvYWRleHByZXNzaW9ucyhmaWxlKTtcbiAgY29uc3QgZXhwcmVzc2lvbnM6IGFueVtdID0gW107XG4gIGF3YWl0IHJlcy5yZWR1Y2UoYXN5bmMgKHByZXZpb3VzOiBhbnksIGU6IGFueSkgPT4ge1xuICAgIGF3YWl0IHByZXZpb3VzO1xuICAgIGxldCByID0gYXdhaXQgZXhlY3JlcXVlc3Qoe1xuICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuY2FpLnRvb2xzLnNhcC90cmFpbi92Mi91c2Vycy8ke1xuICAgICAgICBjb25maWcuU0FQLnVzZXJzbHVnXG4gICAgICB9L2JvdHMvJHtjb25maWcuU0FQLmJvdHNsdWd9L3ZlcnNpb25zLyR7XG4gICAgICAgIGNvbmZpZy5TQVAudmVyc2lvbnNsdWdcbiAgICAgIH0vZGF0YXNldC9pbnRlbnRzLyR7ZmlsZX0vZXhwcmVzc2lvbnMvJHtlLmlkfWAsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgVG9rZW4gJHtjb25maWcuU0FQLmRldnRva2VufWAsXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHIgPSBKU09OLnBhcnNlKHIuYm9keSk7XG4gICAgZXhwcmVzc2lvbnMucHVzaChyLnJlc3VsdHMpO1xuICB9LCBQcm9taXNlLnJlc29sdmUoKSk7XG4gIGNvbnN0IGZpbmFsOiBhbnkgPSBbXTtcbiAgZXhwcmVzc2lvbnMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgbGV0IHNlbnRlbmNlID0gZS5zb3VyY2U7XG4gICAgZS50b2tlbnMuZm9yRWFjaCgodDogYW55KSA9PiB7XG4gICAgICBpZiAodC5lbnRpdHkgIT09IG51bGwpIHtcbiAgICAgICAgc2VudGVuY2UgPSBzZW50ZW5jZVxuICAgICAgICAgIC5zcGxpdCh0LndvcmQubmFtZSlcbiAgICAgICAgICAuam9pbihge3sgJHt0LndvcmQubmFtZX0gfCAke3QuZW50aXR5LnNsdWd9IH19YCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZmluYWwucHVzaChzZW50ZW5jZSk7XG4gIH0pO1xuICByZXR1cm4gZmluYWw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZWZpbGUoZmlsZTogc3RyaW5nLCBuZXdmaWxlOiBhbnkpIHtcbiAgLy8gRGVsZXRlIGFsbCBleHByZXNzaW9uc1xuICAvKmNvbnN0IHJlcyA9IGF3YWl0IGxvYWRleHByZXNzaW9ucyhmaWxlKTtcbiAgYXdhaXQgcmVzLnJlc3VsdHMucmVkdWNlKGFzeW5jIChwcmV2aW91czogYW55LCBlOiBhbnkpID0+IHtcbiAgICBhd2FpdCBwcmV2aW91cztcbiAgICBhd2FpdCBleGVjcmVxdWVzdCh7XG4gICAgICB1cmw6IGBodHRwczovL2FwaS5jYWkudG9vbHMuc2FwL3RyYWluL3YyL3VzZXJzLyR7XG4gICAgICAgIGNvbmZpZy5TQVAudXNlcnNsdWdcbiAgICAgIH0vYm90cy8ke2NvbmZpZy5TQVAuYm90c2x1Z30vdmVyc2lvbnMvJHtcbiAgICAgICAgY29uZmlnLlNBUC52ZXJzaW9uc2x1Z1xuICAgICAgfS9kYXRhc2V0L2ludGVudHMvJHtmaWxlfS9leHByZXNzaW9ucy8ke2UuaWR9YCxcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGBUb2tlbiAke2NvbmZpZy5TQVAuZGV2dG9rZW59YCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFByb21pc2UucmVzb2x2ZSgpKTsqL1xuICAvLyBDcmVhdGUgbmV3IGV4cHJlc3Npb25zXG4gIGNvbnN0IGV4cHJlc3Npb25zOiBhbnlbXSA9IFtdO1xuICBuZXdmaWxlLmZvckVhY2goKGU6IHN0cmluZykgPT4ge1xuICAgIGxldCBzcmMgPSBlO1xuICAgIGNvbnN0IHRva3M6IGFueVtdID0gW107XG4gICAgd2hpbGUgKHNyYy5pbmRleE9mKCd7eycpICE9PSAtMSkge1xuICAgICAgY29uc3QgYSA9IHNyYy5pbmRleE9mKCd7eycpICsgMjtcbiAgICAgIGNvbnN0IGIgPSBzcmMuaW5kZXhPZignfX0nKTtcbiAgICAgIGNvbnN0IHR4dCA9IHNyYy5zdWJzdHJpbmcoYSwgYik7XG4gICAgICBjb25zdCB0eXBlID0gdHh0LnNwbGl0KCd8JylbMV0udHJpbSgpO1xuICAgICAgY29uc3QgdmFsID0gdHh0LnNwbGl0KCd8JylbMF0udHJpbSgpO1xuICAgICAgc3JjID0gc3JjLnN1YnN0cmluZygwLCBhIC0gMikgKyB2YWwgKyBzcmMuc3Vic3RyaW5nKGIgKyAyLCBzcmMubGVuZ3RoKTtcbiAgICAgIHRva3MucHVzaCh7XG4gICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgIHNwYWNlOiBmYWxzZSxcbiAgICAgICAgd29yZDoge1xuICAgICAgICAgIGlkOiB1dWlkKCksXG4gICAgICAgICAgbmFtZTogdmFsLFxuICAgICAgICAgIHNsdWc6IHZhbCxcbiAgICAgICAgfSxcbiAgICAgICAgZW50aXR5OiB7XG4gICAgICAgICAgaWQ6IHV1aWQoKSxcbiAgICAgICAgICBuYW1lOiB0eXBlLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgc2x1ZzogdHlwZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBleHByZXNzaW9ucy5wdXNoKHtcbiAgICAgIGlkOiB1dWlkKCksXG4gICAgICBzb3VyY2U6IHNyYyxcbiAgICAgIHRva2VuczogdG9rcyxcbiAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgIGlkOiAnOTk2YWQ4NjAtMmE5YS01MDRmLTg4NjEtYWVhZmQwYjJhZTI5JyxcbiAgICAgICAgbmFtZTogJ0ZyZW5jaCcsXG4gICAgICAgIHNsdWc6ICdmcmVuY2gnLFxuICAgICAgICBpc29jb2RlOiAnZnInLFxuICAgICAgICBzdXBwb3J0OiAnYWR2YW5jZWQnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHtcbiAgICB1cmw6IGBodHRwczovL2FwaS5jYWkudG9vbHMuc2FwL3RyYWluL3YyL3VzZXJzLyR7XG4gICAgICBjb25maWcuU0FQLnVzZXJzbHVnXG4gICAgfS9ib3RzLyR7Y29uZmlnLlNBUC5ib3RzbHVnfS92ZXJzaW9ucy8ke1xuICAgICAgY29uZmlnLlNBUC52ZXJzaW9uc2x1Z1xuICAgIH0vZGF0YXNldC9pbnRlbnRzLyR7ZmlsZX0vZXhwcmVzc2lvbnMvYnVsa19jcmVhdGVgLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEF1dGhvcml6YXRpb246IGBUb2tlbiAke2NvbmZpZy5TQVAuZGV2dG9rZW59YCxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBqc29uOiB7XG4gICAgICBleHByZXNzaW9ucyxcbiAgICB9LFxuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRJbnRlbnRzLFxuICBnZXRUeXBlcyxcbiAgbG9hZHR5cGUsXG4gIGxvYWRmaWxlLFxuICB1cGRhdGVmaWxlLFxufTtcbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuXG4vKipcbiAqIEdldCBhIHJhbmRvbSByZXNwb25zZSBpbiB0aGUgZ29vZCBsYW5ndWFnZVxuICogQHBhcmFtIGtleSBLZXkgZm9yIHRoZSB0ZXh0IDogc3RyaW5nXG4gKiBAcGFyYW0gcGFyYW1zIFBhcmFtZXRlcnMgdG8gcHV0IG9uIHRoZSB0ZXh0OiBhbnlcbiAqIEByZXR1cm5zIEEgcmVzcG9uc2UgOiBzdHJpbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oa2V5OiBzdHJpbmcsIHBhcmFtczogYW55ID0gbnVsbCk6IHN0cmluZyB7XG4gIGxldCBwYXJhbWV0ZXJzID0gcGFyYW1zO1xuICBpZiAoIXBhcmFtZXRlcnMpIHtcbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cbiAgcGFyYW1ldGVycy5yZXR1cm5PYmplY3RzID0gdHJ1ZTtcbiAgY29uc3QgcG9zc2liaWxpdGllcyA9IGkxOG5leHQudChrZXksIHBhcmFtZXRlcnMpO1xuICBpZiAoQXJyYXkuaXNBcnJheShwb3NzaWJpbGl0aWVzKSkge1xuICAgIHJldHVybiBwb3NzaWJpbGl0aWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmlsaXRpZXMubGVuZ3RoKV07XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb24tdG8tcHJldHR5LXlhbWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lZGJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZS13aXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndhdHNvbi1kZXZlbG9wZXItY2xvdWQvYXNzaXN0YW50L3YyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInlhbWxqc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9