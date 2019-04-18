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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
const i18next_node_fs_backend_1 = __importDefault(__webpack_require__(/*! i18next-node-fs-backend */ "i18next-node-fs-backend"));
const moment_1 = __importDefault(__webpack_require__(/*! moment */ "moment"));
const isDev = "development" === 'development';
i18next_1.default.use(i18next_node_fs_backend_1.default).init({
    lng: 'fr-tu',
    fallbackLng: 'fr-tu',
    preload: ['fr-tu'],
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
        port: process.env.MAIL_SMTP_PORT || 25,
        secure: process.env.MAIL_SMTP_SECURE === 'true' || false,
        recipient: process.env.MAIL_RECIPIENT || undefined,
        sender: process.env.MAIL_SENDER || '',
        sav: process.env.MAIL_SAV || 'service-si@easy-life.fr',
    },
    NEDB: {
        ttl: parseInt(process.env.NEDB_TTL || '0', 10),
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
            const response = await handlemessage_util_1.default(msg, from, '+33755536910', 'luis', 'tel');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end(response);
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

/***/ "./src/controllers/index.ts":
/*!**********************************!*\
  !*** ./src/controllers/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
async function default_1(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const html = fs_1.default.readFileSync(`C:/Users/Visiteur/Documents/Lifee/tests/Templates/index.html`);
    return res.end(html);
}
exports.default = default_1;


/***/ }),

/***/ "./src/controllers/slack.controller.ts":
/*!*********************************************!*\
  !*** ./src/controllers/slack.controller.ts ***!
  \*********************************************/
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
const handlemessage_util_1 = __importStar(__webpack_require__(/*! ../utils/handlemessage.util */ "./src/utils/handlemessage.util.ts"));
const async_util_1 = __webpack_require__(/*! ../utils/async.util */ "./src/utils/async.util.ts");
const querystring_1 = __importDefault(__webpack_require__(/*! querystring */ "querystring"));
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
const getUserURL = 'https://slack.com/api/users.profile.get';
const postMsgURL = 'https://slack.com/api/chat.postMessage';
async function default_1(req, res, next) {
    if (req.body.event &&
        req.body.event.type === 'message' &&
        !req.body.event.bot_id &&
        req.body.token === 'hvKeVxQcyXJ0DsnjGLfS617C') {
        const msg = req.body.event.text;
        const from = await getEmail(req.body.event.user);
        const to = req.body.team_id;
        const response = await handlemessage_util_1.default(msg, from, to, 'luis', 'slack');
        await sendSlackResponse(response, req.body.event.channel);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(req.body.challenge);
}
exports.default = default_1;
async function events(req, res, next) {
    if (req.body.token === 'hvKeVxQcyXJ0DsnjGLfS617C') {
        const payload = JSON.parse(req.body.payload);
        const to = payload.team.id;
        const from = payload.user.id;
        const intents = [];
        const entities = [];
        payload.actions.forEach((a) => {
            intents.push({
                confidence: 0.1,
                name: a.action_id,
            });
            entities.push({
                name: 'site_code',
                value: a.selected_option.value,
            });
        });
        const result = {
            intents,
            entities,
            response: {
                type: 'text',
                text: '',
            },
            query: '',
        };
        const response = await handlemessage_util_1.handleMsgWithoutService('', from, to, 'slack', result);
        await sendSlackResponse(response, payload.channel.id);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end();
}
exports.events = events;
async function getEmail(user) {
    const getOpt = {
        method: 'GET',
        uri: `${getUserURL}?token=${config_1.default.SLACK.apiToken}&user=${user}`,
        json: true,
    };
    const res = await async_util_1.execrequest(getOpt);
    if (res.body && res.body.profile && res.body.profile.email) {
        return res.body.profile.email;
    }
    return null;
}
async function sendMessage(msg) {
    const postOpt = {
        uri: `${postMsgURL}?${querystring_1.default.stringify(msg)}`,
        method: 'GET',
    };
    const res = await async_util_1.execrequest(postOpt);
    return res;
}
async function sendSlackResponse(responses, channel) {
    if (responses) {
        responses.reduce(async (previous, response) => {
            await previous;
            if (response.type === 'dropdown') {
                const opt = [];
                response.params.forEach((e) => {
                    opt.push({
                        text: {
                            type: 'plain_text',
                            text: e.text,
                            emoji: true,
                        },
                        value: e.value,
                    });
                });
                const resu = {
                    channel,
                    token: config_1.default.SLACK.apiToken,
                    blocks: JSON.stringify([
                        {
                            type: 'section',
                            block_id: 'block1',
                            text: {
                                type: 'mrkdwn',
                                text: response.text,
                            },
                            accessory: {
                                action_id: response.value,
                                type: 'static_select',
                                placeholder: {
                                    type: 'plain_text',
                                    text: 'Sélectionnez un item',
                                    emoji: true,
                                },
                                options: opt,
                            },
                        },
                    ]),
                };
                await sendMessage(resu);
            }
            else {
                await sendMessage({
                    channel,
                    text: response.text,
                    token: config_1.default.SLACK.apiToken,
                });
            }
        }, Promise.resolve());
    }
}


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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const controllers_1 = __importDefault(__webpack_require__(/*! ../controllers */ "./src/controllers/index.ts"));
const ajax_controller_1 = __importDefault(__webpack_require__(/*! ../controllers/ajax.controller */ "./src/controllers/ajax.controller.ts"));
const slack_controller_1 = __importStar(__webpack_require__(/*! ../controllers/slack.controller */ "./src/controllers/slack.controller.ts"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const routes = express_1.default.Router();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
routes.all('/', controllers_1.default);
routes.get('/ajax/sendmessage', ajax_controller_1.default);
routes.post('/slack', slack_controller_1.default);
routes.post('/slackevents', urlencodedParser, slack_controller_1.events);
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
const db = new nedb_1.default({ filename: 'DB/contexts', autoload: true });
async function deleteOld() {
    const ttl = Date.now() - config_1.default.NEDB.ttl * 86400000;
    await db.remove({ createTime: { $lt: ttl } }, { multi: true });
}
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
async function save(user, c) {
    await deleteOld();
    if (user) {
        const nb = await findone({ user });
        const contexts = {
            fulfill: c.fulfill,
            service: c.service,
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
async function load(user) {
    await deleteOld();
    if (user) {
        const contexts = await findone({ user });
        if (contexts) {
            contexts.contexts.site = null;
            return contexts.contexts;
        }
    }
    return {
        fulfill: {
            ctx: [],
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
function clone(src) {
    return JSON.parse(JSON.stringify(src));
}
async function default_1(result, contexts, types) {
    // Return 'not understand' when no intents
    if (result.intents.length === 0) {
        return await default_intent_1.default.fallback(null, contexts, 0, result.query, types);
    }
    // Get all known intents
    const intents = getConfig();
    const intentMap = new Map();
    intents.forEach(intent => {
        intentMap.set(intent.name, intent.func);
    });
    const intentsRes = [];
    // Check all intents
    await result.intents.reduce(async (previous, e) => {
        await previous;
        let res;
        if (!intentMap.has(e.name)) {
            if (result.response) {
                res = {
                    contexts,
                    response: { text: result.response.text, type: 'text' },
                    confidence: 0.01,
                };
            }
            res = await default_intent_1.default.fallback(null, contexts, 0, result.query, types);
        }
        else {
            const c = clone(contexts);
            res = await intentMap.get(e.name)(result.entities, c, e.confidence, result.query, types);
        }
        if (res) {
            intentsRes.push(res);
        }
    }, Promise.resolve());
    let response = intentsRes[0];
    // Get the most probable one
    intentsRes.forEach(e => {
        if (e && response.confidence < e.confidence) {
            response = e;
        }
    });
    console.log(response);
    // Return it
    return response;
}
exports.default = default_1;
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
const translate_util_1 = __importDefault(__webpack_require__(/*! ../translate.util */ "./src/utils/translate.util.ts"));
async function fallback(entities, c, confidence, query, types) {
    const res = {
        confidence,
        contexts: c,
        response: [
            {
                text: translate_util_1.default('intent.default.notunderstand'),
                type: 'text',
            },
        ],
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
const translate_util_1 = __importDefault(__webpack_require__(/*! ../translate.util */ "./src/utils/translate.util.ts"));
const ecl_1 = __importDefault(__webpack_require__(/*! ../../models/ecl */ "./src/models/ecl.ts"));
async function opentime(entities, c, confidence, query, types) {
    let txt = translate_util_1.default('intent.infos.schedulenotfound');
    if (c.site) {
        txt = translate_util_1.default('intent.infos.schedule', {
            count: c.site.concierges.length,
            conciergeGivenName: ecl_1.default.getPrenomConcierge(c.site.concierges),
            sitesSchedules: c.site.site.horaires,
        });
    }
    const res = {
        confidence,
        contexts: c,
        response: [
            {
                text: txt,
                type: 'text',
            },
        ],
    };
    return res;
}
async function contact(entities, c, confidence, query, types) {
    let txt = translate_util_1.default('intent.infos.contactnotfound');
    if (c.site) {
        txt = translate_util_1.default('intent.infos.contact', {
            count: c.site.concierges.length,
            conciergeGivenName: ecl_1.default.getPrenomConcierge(c.site.concierges),
            siteEmail: c.site.site.email,
            siteTelephone: c.site.site.telephone,
            siteSchedules: c.site.site.horaires,
        });
    }
    const res = {
        confidence,
        contexts: c,
        response: [
            {
                text: txt,
                type: 'text',
            },
        ],
    };
    return res;
}
async function services(entities, c, confidence, query, types) {
    let txt = translate_util_1.default('intent.infos.servicesnotfound');
    if (c.site) {
        txt = translate_util_1.default('intent.infos.services', {
            siteServices: c.site.site.guideServices,
        });
    }
    const res = {
        confidence,
        contexts: c,
        response: [
            {
                text: txt,
                type: 'text',
            },
        ],
    };
    return res;
}
async function relaiscolis(entities, c, confidence, query, types) {
    let txt = translate_util_1.default('intent.infos.relaiscolisnotfound');
    if (c.site) {
        txt = translate_util_1.default('intent.infos.relaiscolis', {
            count: c.site.concierges.length,
            conciergeGivenName: ecl_1.default.getPrenomConcierge(c.site.concierges),
            siteRelaisColis: c.site.site.relaisColis,
        });
    }
    const res = {
        confidence,
        contexts: c,
        response: [
            {
                text: txt,
                type: 'text',
            },
        ],
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
const translate_util_1 = __importDefault(__webpack_require__(/*! ../translate.util */ "./src/utils/translate.util.ts"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
const ecl_1 = __importDefault(__webpack_require__(/*! ../../models/ecl */ "./src/models/ecl.ts"));
const message_util_1 = __webpack_require__(/*! ../message.util */ "./src/utils/message.util.ts");
const ecl = new ecl_1.default();
async function registration(c, siteGroup) {
    if (!c.site || !c.fulfill || !siteGroup)
        return null;
    try {
        // Store registration request in database
        const token = await ecl.saveRegistration(c.site.site, c.fulfill.userId || '?', c.fulfill.email, c.fulfill.lastname, c.fulfill.firstname, siteGroup);
        const link = `${config_1.default.ECL.url}/inscription/verif_email.php?tok=${token}`;
        await message_util_1.sendMessage({
            from: c.site.site.email,
            to: c.fulfill.email,
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
                ` <p>Bonjour ${c.fulfill.firstname},</p><br />` +
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
        const nomConcierge = ecl_1.default.getPrenomConcierge(c.site.concierges, false);
        await message_util_1.sendMessage({
            from: config_1.default.MAIL.sender,
            to: c.site.site.email,
            subject: `[Lifee] Nouvelle inscription à saisir`,
            text: `Salut ${nomConcierge}, c'est Lifee !\n\nL'utilisateur suivant souhaite s'inscrire:\n\n  Son nom: ${c.fulfill.lastname}\n  Son Prénom: ${c.fulfill.firstname}\n  Son Email: ${c.fulfill.lastname}\n  Son N°: ${c.fulfill.userId || '?'}\n  Sa conciergerie: ${c.site
                .site.libelle || '?'}\n  Son code de regroupement: ${siteGroup ? siteGroup.nom : '?'}\n\nMerci de procéder à son inscription.\n\nBonne journée !`,
        }, true);
        return null;
    }
}
async function register(entities, c, confidence, query, types) {
    if (!c.fulfill)
        return null;
    c.fulfill.ctx = [config_1.default.CONTEXTS.FULFILL.register];
    const res = {
        confidence,
        contexts: c,
        response: [
            {
                text: translate_util_1.default('intent.register.askmail'),
                type: 'text',
            },
        ],
    };
    return res;
}
async function registerMail(entities, c, confidence, query, types) {
    if (!c.fulfill)
        return null;
    let conf = confidence;
    if (c.fulfill.ctx &&
        c.fulfill.ctx.includes(config_1.default.CONTEXTS.FULFILL.register) &&
        entities.filter(e => e.name === 'builtin.email').length > 0) {
        c.fulfill.email = entities.filter(e => e.name === 'builtin.email')[0].value;
        c.fulfill.ctx = [config_1.default.CONTEXTS.FULFILL.registermail];
    }
    else {
        conf = 0;
    }
    const res = {
        contexts: c,
        response: [
            {
                text: translate_util_1.default('intent.register.askfirstname'),
                type: 'text',
            },
        ],
        confidence: conf,
    };
    return res;
}
async function registerName(entities, c, confidence, query, types) {
    if (!c.fulfill)
        return null;
    let conf = confidence;
    const response = {
        text: '',
        type: 'text',
        params: null,
    };
    const names = entities.filter(e => e.name === 'name');
    let name = null;
    if (names.length > 0) {
        name = names[0].value;
    }
    else if (query.split(' ').length === 1) {
        name = query;
    }
    if (c.fulfill.ctx &&
        c.fulfill.ctx.includes(config_1.default.CONTEXTS.FULFILL.registermail) &&
        name) {
        c.fulfill.ctx = [config_1.default.CONTEXTS.FULFILL.registermail];
        if (c.fulfill.firstname) {
            c.fulfill.lastname = name;
            if (c.site) {
                // User site group is needed
                const groups = await ecl.getSiteGroups(c.site.site.id);
                if (groups.length > 1) {
                    c.fulfill.ctx = [config_1.default.CONTEXTS.FULFILL.registercode];
                    response.text = translate_util_1.default('intent.register.askcode', {
                        firstname: c.fulfill.firstname,
                    });
                    if (types.includes('dropdown')) {
                        response.type = 'dropdown';
                        response.params = [];
                        response.value = config_1.default.INTENTS.registercode;
                        groups.forEach((group, index) => {
                            const v = index + 1;
                            const l = v.toString();
                            response.params.push({
                                text: group.nom,
                                value: l,
                            });
                        });
                    }
                    else {
                        groups.forEach((group, index) => {
                            response.text += translate_util_1.default('intent.register.give_site_group_choice', {
                                number: index + 1,
                                name: group.nom,
                            });
                        });
                    }
                }
                else {
                    c.fulfill.ctx = [];
                    if (registration(c, groups.length ? groups[0] : null)) {
                        response.text = translate_util_1.default('intent.register.done_after_validation', {
                            count: c.site.concierges.length,
                            conciergeGivenName: ecl_1.default.getPrenomConcierge(c.site.concierges),
                        });
                    }
                    else {
                        response.text = translate_util_1.default('intent.register.done');
                    }
                }
            }
            else {
                c.fulfill.ctx = [config_1.default.CONTEXTS.FULFILL.registercode];
                response.text = translate_util_1.default('intent.register.askcode', {
                    firstname: c.fulfill.firstname,
                });
            }
        }
        else {
            c.fulfill.firstname = name;
            response.text = translate_util_1.default('intent.register.asklastname', {
                firstname: c.fulfill.firstname,
            });
        }
        conf = 0.9;
    }
    else {
        conf = 0;
    }
    const res = {
        response: [response],
        contexts: c,
        confidence: conf,
    };
    return res;
}
async function registerCode(entities, c, confidence, query, types) {
    if (!c.fulfill)
        return null;
    let conf = confidence;
    let txt = '';
    if (c.fulfill.ctx &&
        c.fulfill.ctx.includes(config_1.default.CONTEXTS.FULFILL.registercode) &&
        entities.filter(e => e.name === 'builtin.number').length > 0 &&
        c.site) {
        const siteGroupNumber = parseInt(entities.filter(e => e.name === 'builtin.number')[0].value, 10);
        // Check given number exists in ECL
        const groups = await ecl.getSiteGroups(c.site.site.id);
        const siteGroup = siteGroupNumber && siteGroupNumber > 0 && siteGroupNumber <= groups.length
            ? groups[siteGroupNumber - 1]
            : undefined;
        if (!siteGroup) {
            txt = translate_util_1.default('intent.register.ask_site_group_again', {
                max: groups.length,
            });
        }
        else {
            c.fulfill.ctx = [];
            c.fulfill.siteGroup = siteGroupNumber;
            if (registration(c, siteGroup)) {
                txt = translate_util_1.default('intent.register.done_after_validation', {
                    count: c.site.concierges.length,
                    conciergeGivenName: ecl_1.default.getPrenomConcierge(c.site.concierges),
                });
            }
            else {
                txt = translate_util_1.default('intent.register.done');
            }
        }
        conf = 0.9;
    }
    else {
        conf = 0;
    }
    const res = {
        contexts: c,
        response: [
            {
                text: txt,
                type: 'text',
            },
        ],
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
const fulfill_util_1 = __importDefault(__webpack_require__(/*! ./fulfill.util */ "./src/utils/fulfill.util.ts"));
const contextsmanager_util_1 = __importDefault(__webpack_require__(/*! ./contextsmanager.util */ "./src/utils/contextsmanager.util.ts"));
const ecl_1 = __importDefault(__webpack_require__(/*! ../models/ecl */ "./src/models/ecl.ts"));
const i18next_1 = __importDefault(__webpack_require__(/*! i18next */ "i18next"));
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
async function default_1(msg, from, to, service, platform) {
    /* Get contexts */
    let contexts = await contextsmanager_util_1.default.load(from);
    const a = await getSiteContexts(to, platform);
    contexts.site = a;
    /* Get service Result */
    let result;
    switch (service) {
        case 'watson':
            result = await watson_util_1.default(msg, contexts);
            break;
        case 'luis':
            result = await luis_util_1.default(msg, contexts);
            break;
        default:
            result = {
                contexts,
                result: {
                    response: null,
                    intents: [],
                    entities: [],
                    query: msg,
                },
            };
    }
    contexts = result.contexts;
    /* Change language */
    if (to === '+33755536910') {
        await i18next_1.default.changeLanguage('fr-vs');
    }
    else {
        await i18next_1.default.changeLanguage('fr-tu');
    }
    console.log(result.result.intents);
    /* Defines accepted type for the platform */
    let types = [];
    switch (platform) {
        case 'slack':
            types = ['buttons', 'dropdown', 'text'];
            break;
        case 'tel':
            types = ['text'];
            break;
        default:
            types = ['text'];
    }
    /* Get fulfill Response */
    const response = await fulfill_util_1.default(result.result, contexts, types);
    /* Save contexts */
    await contextsmanager_util_1.default.save(from, response.contexts);
    /* Return response text */
    return response.response;
}
exports.default = default_1;
async function handleMsgWithoutService(msg, from, to, platform, result) {
    /* Get contexts */
    const contexts = await contextsmanager_util_1.default.load(from);
    const a = await getSiteContexts(to, platform);
    contexts.site = a;
    /* Change language */
    if (to === '+33755536910') {
        await i18next_1.default.changeLanguage('fr-vs');
    }
    else {
        await i18next_1.default.changeLanguage('fr-tu');
    }
    /* Defines accepted type for the platform */
    let types = [];
    switch (platform) {
        case 'slack':
            types = ['buttons', 'dropdown', 'text'];
            break;
        case 'tel':
            types = ['text'];
            break;
        default:
            types = ['text'];
    }
    /* Get fulfill Response */
    const response = await fulfill_util_1.default(result, contexts, types);
    /* Save contexts */
    await contextsmanager_util_1.default.save(from, response.contexts);
    /* Return response text */
    return response.response;
}
exports.handleMsgWithoutService = handleMsgWithoutService;


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
    port: 25,
    secure: config_1.default.MAIL.secure,
    // auth: {
    //     user: 'xxx@xx.com',
    //     pass: 'xxxx'
    // },
    tls: { rejectUnauthorized: false },
});
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
async function default_1(msg, contexts) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: msg,
    };
    try {
        const endpoint = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';
        const appId = config_1.default.LUIS.appId;
        const endpointkey = config_1.default.LUIS.endpointKey;
        const queryParams = {
            verbose: true,
            q: msg,
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
        return { result, contexts };
    }
    catch (err) {
        return { result, contexts };
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
async function default_1(msg, contexts) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: msg,
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
        contexts.service.watsonId = sessionId;
        const res = await sendMessage(assistant, {
            assistant_id: assistantId,
            session_id: sessionId,
            input: {
                message_type: 'text',
                text: msg,
                options: {
                    return_context: true,
                },
            },
            contexts: contexts.service.watson,
        });
        contexts.service.watson = res.context;
        result.response = {
            type: res.output.generic[0].response_type,
            text: res.output.generic[0].text,
        };
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
                value: msg.substring(e.location[0], e.location[1]),
            });
        });
        return { result, contexts };
    }
    catch (err) {
        return { result, contexts };
    }
}
exports.default = default_1;


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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "i18next":
/*!**************************!*\
  !*** external "i18next" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next");

/***/ }),

/***/ "i18next-node-fs-backend":
/*!******************************************!*\
  !*** external "i18next-node-fs-backend" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("i18next-node-fs-backend");

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpMThuLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXGNvbnRyb2xsZXJzXFxhamF4LmNvbnRyb2xsZXIudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcaW5kZXgudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcc2xhY2suY29udHJvbGxlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXG1vZGVsc1xcZWNsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xccm91dGVzXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHNlcnZlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxhc3luYy51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGNvbnRleHRzbWFuYWdlci51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGZ1bGZpbGwudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsXFxkZWZhdWx0LmludGVudC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsXFxpbmZvcy5pbnRlbnQudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcZnVsZmlsbFxccmVnaXN0ZXIuaW50ZW50LnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGhhbmRsZW1lc3NhZ2UudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxtZXNzYWdlLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcc2VydmljZXNcXGx1aXMudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxzZXJ2aWNlc1xcd2F0c29uLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcdHJhbnNsYXRlLnV0aWwudHMiLCJleHRlcm5hbCBcImJvZHktcGFyc2VyXCIiLCJleHRlcm5hbCBcImRvdGVudlwiIiwiZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJleHRlcm5hbCBcImZzXCIiLCJleHRlcm5hbCBcImkxOG5leHRcIiIsImV4dGVybmFsIFwiaTE4bmV4dC1ub2RlLWZzLWJhY2tlbmRcIiIsImV4dGVybmFsIFwibW9tZW50XCIiLCJleHRlcm5hbCBcIm5lZGJcIiIsImV4dGVybmFsIFwibm9kZW1haWxlclwiIiwiZXh0ZXJuYWwgXCJxdWVyeXN0cmluZ1wiIiwiZXh0ZXJuYWwgXCJyZXF1ZXN0XCIiLCJleHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwiZXh0ZXJuYWwgXCJ1dWlkXCIiLCJleHRlcm5hbCBcIndhdHNvbi1kZXZlbG9wZXItY2xvdWQvYXNzaXN0YW50L3YyXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxpRkFBMkI7QUFDM0IsaUlBQXFEO0FBQ3JELDhFQUE0QjtBQUU1QixNQUFNLEtBQUssR0FBRyxhQUFvQixLQUFLLGFBQWEsQ0FBQztBQUVyRCxpQkFBSSxDQUFDLEdBQUcsQ0FBQyxpQ0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzVCLEdBQUcsRUFBRSxPQUFPO0lBQ1osV0FBVyxFQUFFLE9BQU87SUFDcEIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLEtBQUssRUFBRSxLQUFLO0lBQ1osYUFBYSxFQUFFO1FBQ2IsTUFBTSxFQUFFLENBQUMsS0FB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QWEsR0FBRyxJQUFJLENBQUM7SUFDaEMsTUFBTSxhQUFhLEdBQUcsaUJBQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNoQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUN4RTtJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFYRCw0QkFXQzs7Ozs7Ozs7Ozs7O0FDYkQsd0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0UiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2VydmVyLnRzXCIpO1xuIiwiaW1wb3J0IGkxOG4gZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgaTE4bmV4dEJhY2tlbmQgZnJvbSAnaTE4bmV4dC1ub2RlLWZzLWJhY2tlbmQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5pMThuLnVzZShpMThuZXh0QmFja2VuZCkuaW5pdCh7XG4gIGxuZzogJ2ZyLXR1JyxcbiAgZmFsbGJhY2tMbmc6ICdmci10dScsXG4gIHByZWxvYWQ6IFsnZnItdHUnXSxcbiAgc2F2ZU1pc3Npbmc6IHRydWUsXG4gIGRlYnVnOiBpc0RldixcbiAgaW50ZXJwb2xhdGlvbjoge1xuICAgIGZvcm1hdDogKHZhbHVlLCBmb3JtYXQgLyogLCBsbmcgKi8pID0+IHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdjYXBpdGFsaXplJylcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gbW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9LFxuICBiYWNrZW5kOiB7XG4gICAgLy8gcGF0aCB3aGVyZSByZXNvdXJjZXMgZ2V0IGxvYWRlZCBmcm9tXG4gICAgbG9hZFBhdGg6ICdsb2NhbGVzL3t7bG5nfX0ve3tuc319Lmpzb24nLFxuICAgIC8vIHBhdGggdG8gcG9zdCBtaXNzaW5nIHJlc291cmNlc1xuICAgIGFkZFBhdGg6ICdsb2NhbGVzL3t7bG5nfX0ve3tuc319Lm1pc3NpbmcuanNvbicsXG4gICAgLy8ganNvbkluZGVudCB0byB1c2Ugd2hlbiBzdG9yaW5nIGpzb24gZmlsZXNcbiAgICBqc29uSW5kZW50OiAyLFxuICB9LFxufSk7XG4iLCJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5jb25maWcoeyBkZWJ1ZzogdHJ1ZSB9KTtcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIFBPUlQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCxcbiAgREVCVUc6IHByb2Nlc3MuZW52LkRFQlVHIHx8IGZhbHNlLFxuICBFQ0w6IHtcbiAgICB1cmw6IHByb2Nlc3MuZW52LkVDTF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnLFxuICB9LFxuICBEQl9MT0dHSU5HOiBpc0RldixcbiAgQVBJX0FDQ0VTU19VU0VSTkFNRTogcHJvY2Vzcy5lbnYuQVBJX0FDQ0VTU19VU0VSTkFNRSB8fCBudWxsLFxuICBBUElfQUNDRVNTX1BBU1NXT1JEOiBwcm9jZXNzLmVudi5BUElfQUNDRVNTX1BBU1NXT1JEIHx8IG51bGwsXG4gIERCOiB7XG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LkRCX1VTRVJOQU1FIHx8ICdhZG1pbicsXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEIHx8ICdwYXNzd29yZCcsXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX0RBVEFCQVNFIHx8ICdkYXRhYmFzZScsXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCAnbG9jYWxob3N0JyxcbiAgICBvcHRpb25zOiB7IGVuY3J5cHQ6IHRydWUgfSxcbiAgICBvcGVyYXRvcnNBbGlhc2VzOiBmYWxzZSxcbiAgfSxcbiAgSU5URU5UUzoge1xuICAgIHJlZ2lzdGVyOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVHSVNURVIgfHwgJycsXG4gICAgcmVnaXN0ZXJtYWlsOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVHSVNURVJNQUlMIHx8ICcnLFxuICAgIHJlZ2lzdGVybmFtZTogcHJvY2Vzcy5lbnYuSU5URU5UX1JFR0lTVEVSTkFNRSB8fCAnJyxcbiAgICByZWdpc3RlcmNvZGU6IHByb2Nlc3MuZW52LklOVEVOVF9SRUdJU1RFUkNPREUgfHwgJycsXG4gICAgb3BlbmluZ3RpbWU6IHByb2Nlc3MuZW52LklOVEVOVF9PUEVOVElNRSB8fCAnJyxcbiAgICBjb250YWN0OiBwcm9jZXNzLmVudi5JTlRFTlRfQ09OVEFDVCB8fCAnJyxcbiAgICBzZXJ2aWNlczogcHJvY2Vzcy5lbnYuSU5URU5UX1NFUlZJQ0VTIHx8ICcnLFxuICAgIHJlbGFpc2NvbGlzOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVMQUlTQ09MSVMgfHwgJycsXG4gICAgZmFsbGJhY2s6IHByb2Nlc3MuZW52LklOVEVOVF9GQUxMQkFDSyB8fCAnJyxcbiAgfSxcbiAgQ09OVEVYVFM6IHtcbiAgICBGVUxGSUxMOiB7XG4gICAgICByZWdpc3RlcjogcHJvY2Vzcy5lbnYuQ09OVEVYVF9GVUxGSUxMX1JFR0lTVEVSIHx8ICcnLFxuICAgICAgcmVnaXN0ZXJtYWlsOiBwcm9jZXNzLmVudi5DT05URVhUX0ZVTEZJTExfUkVHSVNURVJNQUlMIHx8ICcnLFxuICAgICAgcmVnaXN0ZXJjb2RlOiBwcm9jZXNzLmVudi5DT05URVhUX0ZVTEZJTExfUkVHSVNURVJDT0RFIHx8ICcnLFxuICAgIH0sXG4gIH0sXG4gIExVSVM6IHtcbiAgICBhcHBJZDogcHJvY2Vzcy5lbnYuTFVJU19BUFBfSUQgfHwgJycsXG4gICAgZW5kcG9pbnRLZXk6IHByb2Nlc3MuZW52LkxVSVNfRU5EUE9JTlRfS0VZIHx8ICcnLFxuICB9LFxuICBXQVRTT046IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52LldBVFNPTl9BUElfS0VZIHx8ICcnLFxuICAgIGFzc2lzdGFudElkOiBwcm9jZXNzLmVudi5XQVRTT05fQVNTSVNUQU5UX0lEIHx8ICcnLFxuICB9LFxuICBUV0lMSU86IHtcbiAgICBhY2NvdW50SWQ6IHByb2Nlc3MuZW52LlRXSUxJT19BQ0NPVU5UX0lEIHx8ICd0d2lsaW9fYWNjb3VudCcsXG4gICAgYXV0aFRva2VuOiBwcm9jZXNzLmVudi5UV0lMSU9fQVVUSF9UT0tFTiB8fCAnYXV0aF90b2tlbicsXG4gIH0sXG4gIFBMSVZPOiB7XG4gICAgYWNjb3VudElkOiBwcm9jZXNzLmVudi5QTElWT19BQ0NPVU5UX0lEIHx8ICdwbGl2b19hY2NvdW50JyxcbiAgICBhdXRoVG9rZW46IHByb2Nlc3MuZW52LlBMSVZPX0FVVEhfVE9LRU4gfHwgJ2F1dGhfdG9rZW4nLFxuICB9LFxuICBORVhNTzoge1xuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYTU9fQVBJX0tFWSB8fCAnbmV4bW9fYXBpX2tleScsXG4gICAgYXBpU2VjcmV0OiBwcm9jZXNzLmVudi5ORVhNT19BUElfU0VDUkVUIHx8ICduZXhtb19hcGlfc2VjcmV0JyxcbiAgfSxcbiAgRElBTE9HX0ZMT1c6IHtcbiAgICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX1BST0pFQ1RfSUQgfHwgJ2FnZW50JyxcbiAgICBlbnZpcm9ubWVudDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfRU5WSVJPTk1FTlQgfHwgJ2RyYWZ0JyxcbiAgICBsYW5ndWFnZUNvZGU6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0xBTkdVQUdFX0NPREUgfHwgJ2VuJyxcbiAgICB1c2VybmFtZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfVVNFUk5BTUUgfHwgbnVsbCxcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfUEFTU1dPUkQgfHwgbnVsbCxcbiAgICBjb25zb2xlU2VydmljZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfQ09OU09MRV9TRVJWSUNFIHx8ICdjb25zb2xlJyxcbiAgICBjb25zb2xlU2VydmljZUlkOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19DT05TT0xFX1NFUlZJQ0VfSUQgfHwgJzY5MTAnLFxuICAgIGNvbnNvbGVVc2VySWQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlNPTEVfVVNFUl9JRCB8fCAnMERIU0VOSlA5WicsXG4gICAgY29uc29sZVVzZXJUeXBlOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19VU0VSX1RZUEUgfHwgJ3VzZXJJZCcsXG4gIH0sXG4gIFNMQUNLOiB7XG4gICAgYXBpVG9rZW46IHByb2Nlc3MuZW52LlNMQUNLX0FQSV9UT0tFTiB8fCAnc2xhY2tfdG9rZW4nLFxuICB9LFxuICBNQUlMOiB7XG4gICAgZW5hYmxlOiBwcm9jZXNzLmVudi5NQUlMX0VOQUJMRSA9PT0gJ3RydWUnIHx8IGZhbHNlLFxuICAgIGhvc3Q6IHByb2Nlc3MuZW52Lk1BSUxfU01UUF9TRVJWRVIgfHwgJ2xvY2FsaG9zdCcsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuTUFJTF9TTVRQX1BPUlQgfHwgMjUsXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5NQUlMX1NNVFBfU0VDVVJFID09PSAndHJ1ZScgfHwgZmFsc2UsXG4gICAgcmVjaXBpZW50OiBwcm9jZXNzLmVudi5NQUlMX1JFQ0lQSUVOVCB8fCB1bmRlZmluZWQsXG4gICAgc2VuZGVyOiBwcm9jZXNzLmVudi5NQUlMX1NFTkRFUiB8fCAnJyxcbiAgICBzYXY6IHByb2Nlc3MuZW52Lk1BSUxfU0FWIHx8ICdzZXJ2aWNlLXNpQGVhc3ktbGlmZS5mcicsXG4gIH0sXG4gIE5FREI6IHtcbiAgICB0dGw6IHBhcnNlSW50KHByb2Nlc3MuZW52Lk5FREJfVFRMIHx8ICcwJywgMTApLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENvbmZpZztcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGhhbmRsZW1lc3NhZ2UgZnJvbSAnLi4vdXRpbHMvaGFuZGxlbWVzc2FnZS51dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oXG4gIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuKSB7XG4gIHRyeSB7XG4gICAgaWYgKHJlcS5xdWVyeS5tc2cgJiYgcmVxLnF1ZXJ5LmZyb20pIHtcbiAgICAgIGNvbnN0IG1zZyA9IHJlcS5xdWVyeS5tc2c7XG4gICAgICBjb25zdCBmcm9tID0gcmVxLnF1ZXJ5LmZyb207XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZW1lc3NhZ2UoXG4gICAgICAgIG1zZyxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgJyszMzc1NTUzNjkxMCcsXG4gICAgICAgICdsdWlzJyxcbiAgICAgICAgJ3RlbCcsXG4gICAgICApO1xuICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJyB9KTtcbiAgICAgIHJldHVybiByZXMuZW5kKHJlc3BvbnNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmVzLndyaXRlSGVhZCg1MDApO1xuICAgIHJldHVybiByZXMuZW5kKCdFcnJvcicpO1xuICB9XG4gIHJlcy53cml0ZUhlYWQoNDA0KTtcbiAgcmV0dXJuIHJlcy5lbmQoJ01pc3NpbmcgXCJtc2dcIiBvciBcImZyb21cIicpO1xufVxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnIH0pO1xuICBjb25zdCBodG1sID0gZnMucmVhZEZpbGVTeW5jKFxuICAgIGBDOi9Vc2Vycy9WaXNpdGV1ci9Eb2N1bWVudHMvTGlmZWUvdGVzdHMvVGVtcGxhdGVzL2luZGV4Lmh0bWxgLFxuICApO1xuICByZXR1cm4gcmVzLmVuZChodG1sKTtcbn1cbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGhhbmRsZW1lc3NhZ2UsIHtcbiAgaGFuZGxlTXNnV2l0aG91dFNlcnZpY2UsXG59IGZyb20gJy4uL3V0aWxzL2hhbmRsZW1lc3NhZ2UudXRpbCc7XG5pbXBvcnQgeyBleGVjcmVxdWVzdCB9IGZyb20gJy4uL3V0aWxzL2FzeW5jLnV0aWwnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB7XG4gIFJlc3VsdCxcbiAgUmVzdWx0SW50ZW50LFxuICBSZXN1bHRFbnRpdHksXG4gIEZ1bGZpbGxSZXNwb25zZVJlc3BvbnNlLFxufSBmcm9tICcuLi91dGlscy90eXBlcy51dGlsJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgZ2V0VXNlclVSTCA9ICdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMucHJvZmlsZS5nZXQnO1xuY29uc3QgcG9zdE1zZ1VSTCA9ICdodHRwczovL3NsYWNrLmNvbS9hcGkvY2hhdC5wb3N0TWVzc2FnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBpZiAoXG4gICAgcmVxLmJvZHkuZXZlbnQgJiZcbiAgICByZXEuYm9keS5ldmVudC50eXBlID09PSAnbWVzc2FnZScgJiZcbiAgICAhcmVxLmJvZHkuZXZlbnQuYm90X2lkICYmXG4gICAgcmVxLmJvZHkudG9rZW4gPT09ICdodktlVnhRY3lYSjBEc25qR0xmUzYxN0MnXG4gICkge1xuICAgIGNvbnN0IG1zZyA9IHJlcS5ib2R5LmV2ZW50LnRleHQ7XG4gICAgY29uc3QgZnJvbSA9IGF3YWl0IGdldEVtYWlsKHJlcS5ib2R5LmV2ZW50LnVzZXIpO1xuICAgIGNvbnN0IHRvID0gcmVxLmJvZHkudGVhbV9pZDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZW1lc3NhZ2UobXNnLCBmcm9tLCB0bywgJ2x1aXMnLCAnc2xhY2snKTtcbiAgICBhd2FpdCBzZW5kU2xhY2tSZXNwb25zZShyZXNwb25zZSwgcmVxLmJvZHkuZXZlbnQuY2hhbm5lbCk7XG4gIH1cbiAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJyB9KTtcbiAgcmVzLmVuZChyZXEuYm9keS5jaGFsbGVuZ2UpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXZlbnRzKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBpZiAocmVxLmJvZHkudG9rZW4gPT09ICdodktlVnhRY3lYSjBEc25qR0xmUzYxN0MnKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2UocmVxLmJvZHkucGF5bG9hZCk7XG4gICAgY29uc3QgdG8gPSBwYXlsb2FkLnRlYW0uaWQ7XG4gICAgY29uc3QgZnJvbSA9IHBheWxvYWQudXNlci5pZDtcbiAgICBjb25zdCBpbnRlbnRzOiBSZXN1bHRJbnRlbnRbXSA9IFtdO1xuICAgIGNvbnN0IGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSA9IFtdO1xuICAgIHBheWxvYWQuYWN0aW9ucy5mb3JFYWNoKChhOiBhbnkpID0+IHtcbiAgICAgIGludGVudHMucHVzaCh7XG4gICAgICAgIGNvbmZpZGVuY2U6IDAuMSxcbiAgICAgICAgbmFtZTogYS5hY3Rpb25faWQsXG4gICAgICB9KTtcbiAgICAgIGVudGl0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiAnc2l0ZV9jb2RlJyxcbiAgICAgICAgdmFsdWU6IGEuc2VsZWN0ZWRfb3B0aW9uLnZhbHVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0OiBSZXN1bHQgPSB7XG4gICAgICBpbnRlbnRzLFxuICAgICAgZW50aXRpZXMsXG4gICAgICByZXNwb25zZToge1xuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6ICcnLFxuICAgICAgfSxcbiAgICAgIHF1ZXJ5OiAnJyxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlTXNnV2l0aG91dFNlcnZpY2UoXG4gICAgICAnJyxcbiAgICAgIGZyb20sXG4gICAgICB0byxcbiAgICAgICdzbGFjaycsXG4gICAgICByZXN1bHQsXG4gICAgKTtcbiAgICBhd2FpdCBzZW5kU2xhY2tSZXNwb25zZShyZXNwb25zZSwgcGF5bG9hZC5jaGFubmVsLmlkKTtcbiAgfVxuICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0pO1xuICByZXMuZW5kKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEVtYWlsKHVzZXI6IHN0cmluZykge1xuICBjb25zdCBnZXRPcHQgPSB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICB1cmk6IGAke2dldFVzZXJVUkx9P3Rva2VuPSR7Y29uZmlnLlNMQUNLLmFwaVRva2VufSZ1c2VyPSR7dXNlcn1gLFxuICAgIGpzb246IHRydWUsXG4gIH07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KGdldE9wdCk7XG4gIGlmIChyZXMuYm9keSAmJiByZXMuYm9keS5wcm9maWxlICYmIHJlcy5ib2R5LnByb2ZpbGUuZW1haWwpIHtcbiAgICByZXR1cm4gcmVzLmJvZHkucHJvZmlsZS5lbWFpbDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZE1lc3NhZ2UobXNnOiBhbnkpIHtcbiAgY29uc3QgcG9zdE9wdCA9IHtcbiAgICB1cmk6IGAke3Bvc3RNc2dVUkx9PyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KG1zZyl9YCxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICB9O1xuICBjb25zdCByZXMgPSBhd2FpdCBleGVjcmVxdWVzdChwb3N0T3B0KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZFNsYWNrUmVzcG9uc2UoXG4gIHJlc3BvbnNlczogRnVsZmlsbFJlc3BvbnNlUmVzcG9uc2VbXSB8IG51bGwsXG4gIGNoYW5uZWw6IHN0cmluZyxcbikge1xuICBpZiAocmVzcG9uc2VzKSB7XG4gICAgcmVzcG9uc2VzLnJlZHVjZShhc3luYyAocHJldmlvdXMsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBhd2FpdCBwcmV2aW91cztcbiAgICAgIGlmIChyZXNwb25zZS50eXBlID09PSAnZHJvcGRvd24nKSB7XG4gICAgICAgIGNvbnN0IG9wdDogYW55W10gPSBbXTtcbiAgICAgICAgcmVzcG9uc2UucGFyYW1zLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICAgIG9wdC5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3BsYWluX3RleHQnLFxuICAgICAgICAgICAgICB0ZXh0OiBlLnRleHQsXG4gICAgICAgICAgICAgIGVtb2ppOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbHVlOiBlLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzdSA9IHtcbiAgICAgICAgICBjaGFubmVsLFxuICAgICAgICAgIHRva2VuOiBjb25maWcuU0xBQ0suYXBpVG9rZW4sXG4gICAgICAgICAgYmxvY2tzOiBKU09OLnN0cmluZ2lmeShbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgICAgICAgICAgYmxvY2tfaWQ6ICdibG9jazEnLFxuICAgICAgICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ21ya2R3bicsXG4gICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UudGV4dCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYWNjZXNzb3J5OiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uX2lkOiByZXNwb25zZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3RhdGljX3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdwbGFpbl90ZXh0JyxcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdTw6lsZWN0aW9ubmV6IHVuIGl0ZW0nLFxuICAgICAgICAgICAgICAgICAgZW1vamk6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiBvcHQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pLFxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCBzZW5kTWVzc2FnZShyZXN1KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHNlbmRNZXNzYWdlKHtcbiAgICAgICAgICBjaGFubmVsLFxuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLnRleHQsXG4gICAgICAgICAgdG9rZW46IGNvbmZpZy5TTEFDSy5hcGlUb2tlbixcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICB9XG59XG4iLCIvLyBAZmxvd1xuXG5pbXBvcnQgeyBTZXF1ZWxpemUsIERhdGFUeXBlcyB9IGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IHQgZnJvbSAnLi4vdXRpbHMvdHJhbnNsYXRlLnV0aWwnO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG4vKmNvbnN0IGVjbCA9IG5ldyBTZXF1ZWxpemUoXG4gICdteXNxbDovL2NsdDEzMjktZGV2OkVhc3lsaWZlMjAxMEAxOTUuMjAwLjc4LjI1Mi9jbHQxMzI5X2RldicsXG4pOyovXG5jb25zdCBlY2wgPSBuZXcgU2VxdWVsaXplKFxuICBjb25maWcuREIuZGF0YWJhc2UsXG4gIGNvbmZpZy5EQi51c2VybmFtZSxcbiAgY29uZmlnLkRCLnBhc3N3b3JkLFxuICB7XG4gICAgLi4uY29uZmlnLkRCLFxuICAgIGRpYWxlY3Q6ICdteXNxbCcsXG4gICAgZGlhbGVjdE9wdGlvbnM6IHtcbiAgICAgIGNoYXJzZXQ6ICdsYXRpbjEnLFxuICAgICAgZW5jcnlwdDogZmFsc2UsXG4gICAgfSxcbiAgICBsb2dnaW5nOiBpc0RldixcbiAgfSxcbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2l0ZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgbGliZWxsZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICB0ZWxlcGhvbmU6IHN0cmluZztcbiAgYm90TnVtYmVyOiBzdHJpbmc7XG4gIGhvcmFpcmVzOiBzdHJpbmc7XG4gIGluZm9zOiBzdHJpbmc7XG4gIGd1aWRlU2VydmljZXM6IHN0cmluZztcbiAgcmVsYWlzQ29saXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaXRlR3JvdXAge1xuICBpZDogc3RyaW5nO1xuICBub206IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb25jaWVyZ2Uge1xuICBwcmVub206IHN0cmluZztcbiAgbm9tOiBzdHJpbmc7XG4gIHRyaWdyYW1tZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xuICBpZDogc3RyaW5nO1xuICBub206IHN0cmluZztcbiAgcHJlbm9tOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHRlbGVwaG9uZTogc3RyaW5nO1xufVxuXG50eXBlIFJlcXVlc3RUeXBlID0gJ1NNUycgfCAnY2FzaWVyJztcblxuaW50ZXJmYWNlIFJlcXVlc3Qge1xuICB0ZXh0OiBzdHJpbmc7XG4gIHR5cGU6IFJlcXVlc3RUeXBlO1xuICBudW1Mb2NrZXI/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVjbCB7XG4gIHN0YXRpYyBnZXRQcmVub21Db25jaWVyZ2UoXG4gICAgY29uY2llcmdlczogQ29uY2llcmdlW10gfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIGZvclVzZXI6IGJvb2xlYW4gPSB0cnVlLFxuICApIHtcbiAgICBpZiAoIWNvbmNpZXJnZXMgfHwgIWNvbmNpZXJnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZm9yVXNlciA/IHQoJ2luZm9zLmNvbmNpZXJnZScpIDogJyc7XG4gICAgfVxuICAgIGlmIChjb25jaWVyZ2VzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGNvbmNpZXJnZXNbMF0ucHJlbm9tO1xuICAgIH1cbiAgICBpZiAoY29uY2llcmdlcy5sZW5ndGggPT09IDIpXG4gICAgICByZXR1cm4gYCR7Y29uY2llcmdlc1swXS5wcmVub219IGV0ICR7Y29uY2llcmdlc1sxXS5wcmVub219YDtcbiAgICByZXR1cm4gZm9yVXNlciA/IHQoJ2luZm9zLmNvbmNpZXJnZXMnKSA6ICcnO1xuICB9XG5cbiAgc3RhdGljIGlzTXVsdGlwbGVDb25jaWVyZ2VzKGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBjb25jaWVyZ2VzICYmIGNvbmNpZXJnZXMubGVuZ3RoID4gMTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRUcmlncmFtbWVDb25jaWVyZ2UoY29uY2llcmdlczogQ29uY2llcmdlW10gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFjb25jaWVyZ2VzIHx8ICFjb25jaWVyZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNvbmNpZXJnZXNbMF0udHJpZ3JhbW1lO1xuICB9XG4gIGVjbDogU2VxdWVsaXplO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZWNsID0gZWNsO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2l0ZUluZm9zKHNlcnZpY2U6IHN0cmluZywgc2VydmljZUlkOiBzdHJpbmcpIHtcbiAgICBsZXQgc2VydmljZUNvbHVtbjtcbiAgICAvLyBDYXMgZGUgbGEgY29uc29sZS4gT24gZmFpdCB1biByZW1wbGFjZW1lbnQgZGUgdmFsZXVyIHBvdXIgYWxsZXIgY2hlcmNoZXIgdW4gY29kZSBzaXRlXG4gICAgaWYgKHNlcnZpY2UgPT09ICdjb25zb2xlJykgc2VydmljZUNvbHVtbiA9ICdjb3JyZXNwXzA0JztcbiAgICBlbHNlIHNlcnZpY2VDb2x1bW4gPSBzZXJ2aWNlO1xuICAgIGNvbnN0IHNpdGVzOiBTaXRlW10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGlkX3JlXzAzYCBBUyBgaWRgICwgYGNvcnJlc3BfMDRgIEFTIGBjb2RlYCAsIGBjbF9sYl8wMWAgQVMgYGxpYmVsbGVgICwgYGNsX3JlXzAxX3VgIEFTIGBlbWFpbGAsIGBzaXRlX3RlbGVwaG9uZWAgQVMgYHRlbGVwaG9uZWAsIGBzaXRlX2hvcmFpcmVzYCBBUyBgaG9yYWlyZXNgLCBgYm90SW5mb2AgQVMgYGluZm9zYCwgYGJvdE51bWJlcmAgRlJPTSBgY2xpZW50YCAnICtcbiAgICAgICAgYFdIRVJFICR7c2VydmljZUNvbHVtbn0gPSA6c2VydmljZUlkIExJTUlUIDFgLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyBzZXJ2aWNlSWQgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAoc2l0ZXMgJiYgc2l0ZXMubGVuZ3RoKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc2l0ZXNbMF0sXG4gICAgICAgIGd1aWRlU2VydmljZXM6IGBodHRwOi8vZWNsLmVhc3ktbGlmZS5mci9nZHMvJHtzaXRlc1swXS5jb2RlfS5wZGZgLFxuICAgICAgICByZWxhaXNDb2xpczogYGh0dHA6Ly9lY2wuZWFzeS1saWZlLmZyL2dkcy8ke3NpdGVzWzBdLmNvZGV9X1JDLnBkZmAsXG4gICAgICB9O1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICBhc3luYyBnZXRTaXRlR3JvdXBzKHNpdGVJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZ3JvdXBzOiBTaXRlR3JvdXBbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgY29ycmVzcF8wMWAgYXMgaWQsIGBjb3JyZXNwXzAyYCBhcyBub20gRlJPTSBgY29ycmVzcG9uZGFuY2VfY2xpZW50YCBXSEVSRSBgaWRfcmVfMDNgPTpzaXRlSWQnLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyBzaXRlSWQgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gZ3JvdXBzO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q29uY2llcmdlTGlzdChzaXRlQ29kZTogc3RyaW5nKTogUHJvbWlzZTxDb25jaWVyZ2VbXT4ge1xuICAgIC8vICdMRUZUIEpPSU4gYGNsaWVudGAgT04gYGNsaWVudGAuYGlkX3JlXzAzYD1gY29vcmRgLmBpZF9yZV8wM0ZLYCAnICtcbiAgICAvLyAnV0hFUkUgYGNsaWVudGAuYGNvcnJlc3BfMDRgPTpzaXRlQ29kZSBhbmQgYGNvb3JkYC5gY29fZ2VfMDNgPTAnLFxuICAgIGNvbnN0IGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIGBjb29yZGAuYGNvX3JlXzAzX3VgIGFzIHByZW5vbSwgYGNvb3JkYC5gY29fcmVfMDJfdWAgYXMgbm9tLCBgY29vcmRgLmBjb19yZV8wMWAgYXMgdHJpZ3JhbW1lICcgK1xuICAgICAgICAnRlJPTSBgY29vcmRpbmF0ZXVyYCBhcyBgY29vcmRgICcgK1xuICAgICAgICAnTEVGVCBKT0lOIGBjbGllbnRgIE9OIGBjbGllbnRgLmBjb19yZV8wMWA9YGNvb3JkYC5gY29fcmVfMDFgICcgK1xuICAgICAgICBcIkFORCAoYGNsaWVudGAuYGNsX3JlXzAzYCA9ICcwMDAwLTAwLTAwJyBPUiBgY2xpZW50YC5gY2xfcmVfMDNgIElTIE5VTEwpIFwiICtcbiAgICAgICAgJ1dIRVJFIGBjbGllbnRgLmBjb3JyZXNwXzA0YD06c2l0ZUNvZGUnLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyBzaXRlQ29kZSB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIHJldHVybiBjb25jaWVyZ2VzO1xuICB9XG5cbiAgYXN5bmMgZ2V0VXNlcihcbiAgICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gICAgdmFsdWU6IHN0cmluZyxcbiAgICBzaXRlOiBTaXRlLFxuICApOiBQcm9taXNlPFVzZXIgfCBudWxsPiB7XG4gICAgbGV0IHdoZXJlO1xuICAgIHN3aXRjaCAoaWRlbnRpZmllcikge1xuICAgICAgY2FzZSAndXNlcklkJzpcbiAgICAgICAgd2hlcmUgPSAnYHV0aWxpc2F0ZXVyYC5gaWRfcmVfMDRgPTp2YWx1ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW9iaWxlJzpcbiAgICAgICAgd2hlcmUgPSAnYHV0aWxpc2F0ZXVyYC5gaWRfY29fMDZfdWA9OnZhbHVlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgIHdoZXJlID0gJ2xvd2VyKGB1dGlsaXNhdGV1cmAuYGlkX3JlXzAxX3VgKSA9IGxvd2VyKDp2YWx1ZSknO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlcnM6IFVzZXJbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgaWRfcmVfMDFfdWAgQVMgYGVtYWlsYCAsIGBpZF9yZV8wNl91YCBBUyBgbm9tYCAsIGBpZF9yZV8wN191YCBBUyBgcHJlbm9tYCAsICcgK1xuICAgICAgICAnYGlkX2NvXzA2X3VgIEFTIGB0ZWxlcGhvbmVgLCBgaWRfcmVfMDRgIEFTIGBpZGAgJyArXG4gICAgICAgICdGUk9NIGB1dGlsaXNhdGV1cmAgJyArXG4gICAgICAgICdKT0lOIGBjbGllbnRgIE9OIGB1dGlsaXNhdGV1cmAuYGlkX3JlXzAzYCA9IGBjbGllbnRgLmBpZF9yZV8wM2AgJyArXG4gICAgICAgICdXSEVSRSBgY2xpZW50YC5gY29ycmVzcF8wNGA9OnNpdGVDb2RlICcgK1xuICAgICAgICBgJHt3aGVyZSA/IGBBTkQgJHt3aGVyZX1gIDogJyd9O2AsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7IHZhbHVlLCBzaXRlQ29kZTogc2l0ZS5jb2RlIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoID09PSAxKSByZXR1cm4gdXNlcnNbMF07XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHVzZXIgcmVnaXN0cmF0aW9uXG4gICAqIEByZXR1cm4gdG9rZW4gdG8gYmUgdXNlZCBpbiB1c2VyIG1haWwgdmFsaWRhdGlvblxuICAgKiBAcGFyYW0geyp9IHNpdGVcbiAgICogQHBhcmFtIHsqfSB1c2VySWRcbiAgICogQHBhcmFtIHsqfSBlbWFpbFxuICAgKiBAcGFyYW0geyp9IGxhc3ROYW1lXG4gICAqIEBwYXJhbSB7Kn0gZ2l2ZW5OYW1lXG4gICAqIEBwYXJhbSB7Kn0gc2l0ZUdyb3VwXG4gICAqL1xuICBhc3luYyBzYXZlUmVnaXN0cmF0aW9uKFxuICAgIHNpdGU6IFNpdGUsXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgZW1haWw6IHN0cmluZyxcbiAgICBsYXN0TmFtZTogc3RyaW5nLFxuICAgIGdpdmVuTmFtZTogc3RyaW5nLFxuICAgIHNpdGVHcm91cDogU2l0ZUdyb3VwIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgKSB7XG4gICAgLy8gR2V0IG5lZWRlZCBzaXRlIGluZm9cbiAgICBjb25zdCBzaXRlc0luZm86IGFueVtdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIGBpZF9yZV8wM2AgYXMgaWQsIGBmaV9kZV8wM2AgYXMgYGNhdGVnb3J5YCwgYGZpX2RlXzA0YCBhcyBgZ3JvdXBgIEZST00gYGZvcm1faW5zY3JpcHRpb25gIFdIRVJFIGBpZF9yZV8wM2A9OnNpdGVJZCcsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7IHNpdGVJZDogc2l0ZS5pZCB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIGlmICghc2l0ZXNJbmZvLmxlbmd0aCAmJiAhc2l0ZXNJbmZvKVxuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIGBDYW5ub3Qgc2F2ZSByZWdpc3RyYXRpb246IHVuYWJsZSB0byBmaW5kIHNpdGUgaW5mbyBmb3IgJyR7c2l0ZS5pZH0nYCxcbiAgICAgICk7XG5cbiAgICBjb25zdCBzaXRlSW5mbyA9IHNpdGVzSW5mb1swXTtcbiAgICAvLyBHZW5lcmF0ZSBhIHRva2VuIGZvciB1c2VyIG1haWwgdmFsaWRhdGlvblxuICAgIGNvbnN0IHRva2VuID0gdXVpZC52NCgpO1xuICAgIC8vIEluc2VydCByZWdpc3RyYXRpb24gaW4gZGF0YWJhc2VcbiAgICBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdJTlNFUlQgSU5UTyBgZm9ybV9pbnNjcmlwdGlvbl91dGlsYChgaWRfcmVfMDNgLGBpZF9yZV8wMV91YCxgaWRfcmVfMDZfdWAsYGlkX3JlXzA3X3VgLGBpZF9yZV8wOGAsYGlkX2NvXzA2X3VgLGBpZF9nZV8wNGAsYGl1X3RvXzAxYCxgaWRfcmVfMTBgLGBpZF9pbl8wMWAsYGlkX2luXzAyYCxgaWRfY29fMDJfdWApICcgK1xuICAgICAgICAnVkFMVUVTICg6c2l0ZUlkLDplbWFpbCw6bGFzdE5hbWUsOmdpdmVuTmFtZSw6ZnVsbE5hbWUsOm1vYmlsZSxEQVRFX0ZPUk1BVChOT1coKSwgXCIlWS0lbS0lZFwiKSw6dG9rZW4sOmNsaWVudCw6Y2F0ZWdvcnksOmdyb3VwLDpjcCknLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5JTlNFUlQsXG4gICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgIHRva2VuLFxuICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgIHNpdGVJZDogc2l0ZS5pZCxcbiAgICAgICAgICBsYXN0TmFtZTogbGFzdE5hbWUudHJpbSgpLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgZ2l2ZW5OYW1lOiBnaXZlbk5hbWUudHJpbSgpLFxuICAgICAgICAgIGZ1bGxOYW1lOiBgJHtsYXN0TmFtZS50cmltKCkudG9VcHBlckNhc2UoKX0gJHtnaXZlbk5hbWUudHJpbSgpfWAsXG4gICAgICAgICAgbW9iaWxlOiB1c2VySWQsXG4gICAgICAgICAgY2xpZW50OiBzaXRlR3JvdXAgPyBzaXRlR3JvdXAubm9tIDogbnVsbCxcbiAgICAgICAgICBjYXRlZ29yeTogc2l0ZUluZm8uY2F0ZWdvcnksXG4gICAgICAgICAgZ3JvdXA6IHNpdGVJbmZvLmdyb3VwLFxuICAgICAgICAgIGNwOiBgJHtzaXRlLmNvZGUuc3Vic3RyKDAsIDIpfTAwMGAsIC8vIFRha2UgdGhlIGRlcGFydG1lbnQgZnJvbSBzaXRlIGNvZGUgYW5kIGFkZCB0aHJlZSAwXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICBhc3luYyBzYXZlVXNlck1vYmlsZSh1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1VQREFURSBgdXRpbGlzYXRldXJgIFNFVCAnICtcbiAgICAgICAgJ2BpZF9jb18wNl91YD06dGVsZXBob25lICcgK1xuICAgICAgICAnV0hFUkUgYGlkX3JlXzA0YD06aWQnLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5VUERBVEUsXG4gICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIHRlbGVwaG9uZTogdXNlci50ZWxlcGhvbmUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBhc3luYyBzYXZlUmVxdWVzdChcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHNpdGU6IFNpdGUsXG4gICAgY29uY2llcmdlczogQ29uY2llcmdlW10sXG4gICAgdXNlcjogVXNlcixcbiAgKSB7XG4gICAgbGV0IHJlcXVlc3ROdW06IGFueVtdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIENPVU5UKGBkZV9yZV8wN191YCkgQVMgY291bnQgRlJPTSBgZGVtYW5kZWAgJyArXG4gICAgICAgIFwiV0hFUkUgYGRlX3JlXzAxX3VgPTpkYXRlIEFORCBgZGVfcmVfMDVfdWA8PidhYmFuZG9uX3AxJ1wiLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyBkYXRlOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIGlmICghcmVxdWVzdE51bSB8fCAhcmVxdWVzdE51bS5sZW5ndGgpXG4gICAgICB0aHJvdyBFcnJvcignQ2Fubm90IHNhdmUgcmVxdWVzdDogdW5hYmxlIHRvIGZpbmQgYSBuZXcgcmVxdWVzdCBudW1iZXInKTtcbiAgICByZXF1ZXN0TnVtID0gcmVxdWVzdE51bVswXS5jb3VudCArIDE7XG5cbiAgICBsZXQgcmVxdWVzdFR5cGU7XG4gICAgbGV0IHJlcXVlc3RUeXBlMjtcbiAgICBsZXQgdHlwZUNvZGU7XG4gICAgbGV0IGRldGFpbDtcbiAgICBsZXQgYWRkaXRpb247XG4gICAgc3dpdGNoIChyZXF1ZXN0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Nhc2llcic6XG4gICAgICAgIHJlcXVlc3RUeXBlID0gJ0RlbWFuZGUgY2FzaWVyJztcbiAgICAgICAgcmVxdWVzdFR5cGUyID0gcmVxdWVzdC50eXBlO1xuICAgICAgICB0eXBlQ29kZSA9ICdjYXNpJztcbiAgICAgICAgZGV0YWlsID0gcmVxdWVzdC5udW1Mb2NrZXJcbiAgICAgICAgICA/IGBjYXNpZXI6JHtyZXF1ZXN0Lm51bUxvY2tlcn0gJHtyZXF1ZXN0LnRleHR9YFxuICAgICAgICAgIDogcmVxdWVzdC50ZXh0O1xuICAgICAgICBhZGRpdGlvbiA9IHJlcXVlc3QubnVtTG9ja2VyXG4gICAgICAgICAgPyBgY2FzaWVyOiR7cmVxdWVzdC5udW1Mb2NrZXJ9ICR7cmVxdWVzdC50ZXh0fWBcbiAgICAgICAgICA6IHJlcXVlc3QudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTTVMnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVxdWVzdFR5cGUgPSAnQXV0cmUnO1xuICAgICAgICByZXF1ZXN0VHlwZTIgPSByZXF1ZXN0LnR5cGU7XG4gICAgICAgIHR5cGVDb2RlID0gJ3Ntcyc7XG4gICAgICAgIGRldGFpbCA9IHJlcXVlc3QudGV4dDtcbiAgICAgICAgYWRkaXRpb24gPSByZXF1ZXN0LnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVlc3RSZWYgPSBbXG4gICAgICBzaXRlLmNvZGUsXG4gICAgICBtb21lbnQoKS5mb3JtYXQoJ0RETU1ZWVlZJyksXG4gICAgICB0eXBlQ29kZSxcbiAgICAgIHJlcXVlc3ROdW0sXG4gICAgXVxuICAgICAgLmpvaW4oJ18nKVxuICAgICAgLnJlcGxhY2UoL1xccy9nLCAnXycpO1xuXG4gICAgYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnSU5TRVJUIElOVE8gYGRlbWFuZGVgKGBkZV9yZV8wM191YCwgYGRlX3JlXzAxX3VgLCBgZGVfcmVfMDJfdWAsIGBkZV9yZV8wNF91YCwgJyArXG4gICAgICAgICdgZGVfcmVfMDVfdWAsIGBkZV9yZV8wNl91YCwgYGRlX3JlXzA3X3VgLCBgZGVfcmVfMDhfdWAsIGBkZV9yZV8wOV91YCwgJyArXG4gICAgICAgICdgZGVfcmVfMTBfdWAsIGBkZV9yZV8xNGAsIGBpZF9yZV8wNGAsIGBkZV9jYV8wMV91YCkgJyArXG4gICAgICAgIFwiVkFMVUVTKDpyZXF1ZXN0UmVmLCA6ZGF0ZSwgOnRpbWUsIDp0cmlncmFtLCAnRGVtYW5kZSBlbiBjb3VycyBkZSB0cmFpdGVtZW50JywgOnJlcXVlc3RUeXBlLCA6cmVxdWVzdFR5cGUyLCA6ZGV0YWlsLCA6YWRkaXRpb24sIDEsIDAsIDp1c2VySWQsIDpudW1Mb2NrZXIpXCIsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLklOU0VSVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7XG4gICAgICAgICAgcmVxdWVzdFR5cGUsXG4gICAgICAgICAgcmVxdWVzdFR5cGUyLFxuICAgICAgICAgIGRldGFpbCxcbiAgICAgICAgICBhZGRpdGlvbixcbiAgICAgICAgICByZXF1ZXN0UmVmLFxuICAgICAgICAgIGRhdGU6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpLFxuICAgICAgICAgIHRpbWU6IG1vbWVudCgpLmZvcm1hdCgnSEg6bW06c3MnKSxcbiAgICAgICAgICB0cmlncmFtOiBFY2wuZ2V0VHJpZ3JhbW1lQ29uY2llcmdlKGNvbmNpZXJnZXMpLFxuICAgICAgICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICAgICAgICBudW1Mb2NrZXI6IHJlcXVlc3QubnVtTG9ja2VyIHx8ICcnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlcXVlc3RSZWY7XG4gIH1cblxuICBhc3luYyB1cGRhdGVSZXF1ZXN0KHJlcXVlc3RSZWY6IHN0cmluZywgcmVxdWVzdDogUmVxdWVzdCkge1xuICAgIGZ1bmN0aW9uIGFkZE51bUxvY2tlcihmaWVsZDogYW55LCBudW1Mb2NrZXI6IGFueSkge1xuICAgICAgcmV0dXJuIGBcXGAke2ZpZWxkfVxcYD1DT05DQVQoJ2Nhc2llcjoke251bUxvY2tlciB8fCAnJ30gJywgXFxgJHtmaWVsZH1cXGApYDtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkRGV0YWlscyhmaWVsZDogYW55LCBwYXJhbU5hbWU6IGFueSkge1xuICAgICAgcmV0dXJuIGBcXGAke2ZpZWxkfVxcYD1DT05DQVQoXFxgJHtmaWVsZH1cXGAsICcgJywgJHtwYXJhbU5hbWV9KWA7XG4gICAgfVxuICAgIC8vIFVwZGF0ZSBudW0gbG9ja2VyIGlmIGFkZGVkIGluIHJlcXVlc3QgZGV0YWlsc1xuICAgIGlmIChyZXF1ZXN0Lm51bUxvY2tlcikge1xuICAgICAgYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAgICdVUERBVEUgYGRlbWFuZGVgIFNFVCAnICtcbiAgICAgICAgICBgJHthZGROdW1Mb2NrZXIoJ2RlX3JlXzA4X3UnLCByZXF1ZXN0Lm51bUxvY2tlcil9LCBgICtcbiAgICAgICAgICBgJHthZGROdW1Mb2NrZXIoJ2RlX3JlXzA5X3UnLCByZXF1ZXN0Lm51bUxvY2tlcil9LCBgICtcbiAgICAgICAgICBcImBkZV9yZV8wNl91YD0nRGVtYW5kZSBjYXNpZXInLCBcIiArXG4gICAgICAgICAgXCJgZGVfcmVfMDdfdWA9J2Nhc2llcicsIFwiICtcbiAgICAgICAgICAnYGRlX2NhXzAxX3VgPTpudW1Mb2NrZXIgJyArXG4gICAgICAgICAgJ1dIRVJFIGBkZV9yZV8wM191YD06cmVxdWVzdFJlZicsXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5VUERBVEUsXG4gICAgICAgICAgcmVwbGFjZW1lbnRzOiB7XG4gICAgICAgICAgICByZXF1ZXN0UmVmLFxuICAgICAgICAgICAgbnVtTG9ja2VyOiByZXF1ZXN0Lm51bUxvY2tlcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gQWRkIHJlcXVlc3QgZGV0YWlsc1xuICAgIHJldHVybiB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdVUERBVEUgYGRlbWFuZGVgIFNFVCAnICtcbiAgICAgICAgYCR7YWRkRGV0YWlscygnZGVfcmVfMDhfdScsICc6ZGV0YWlscycpfSwgYCArXG4gICAgICAgIGAke2FkZERldGFpbHMoJ2RlX3JlXzA5X3UnLCAnOmRldGFpbHMnKX0gYCArXG4gICAgICAgICdXSEVSRSBgZGVfcmVfMDNfdWA9OnJlcXVlc3RSZWYnLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5VUERBVEUsXG4gICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgIHJlcXVlc3RSZWYsXG4gICAgICAgICAgZGV0YWlsczogcmVxdWVzdC50ZXh0LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2l0ZVVzZXJzKHNpdGVzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IHdoZXJlSW4gPSBgJyR7c2l0ZXMuam9pbihcIicsJ1wiKX0nYDtcblxuICAgIHJldHVybiB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgRElTVElOQ1QgKHUuYGlkX2NvXzA2X3VgKSBBUyB0ZWwsIGMudHdpbGlvIEFTIHR3aWxpbyAnICtcbiAgICAgICAgJ0ZST00gYHV0aWxpc2F0ZXVyYCBBUyB1ICcgK1xuICAgICAgICAnSU5ORVIgSk9JTiBgY2xpZW50YCBBUyBjIE9OIGMuYGlkX3JlXzAzYCA9IHUuYGlkX3JlXzAzYCAnICtcbiAgICAgICAgJ1dIRVJFIHUuYGlkX3JlXzAzYCBJTiAnICtcbiAgICAgICAgYCgke3doZXJlSW59KSBgICtcbiAgICAgICAgXCJBTkQgdS5gaWRfY29fMDZfdWAgIT0gJycgXCIgK1xuICAgICAgICAnQU5EIHUuYGlkX2NvXzA2X3VgIElTIE5PVCBOVUxMICcgK1xuICAgICAgICBcIkFORCAodS5gaWRfZ2VfMDJgID0gJzAwMDAtMDAtMDAnIE9SIHUuYGlkX2dlXzAyYCBJUyBOVUxMKTtcIixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBUZXN0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycyc7XG5pbXBvcnQgU2VuZE1lc3NhZ2VDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2FqYXguY29udHJvbGxlcic7XG5pbXBvcnQgU2xhY2tDb250cm9sbGVyLCB7IGV2ZW50cyB9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3NsYWNrLmNvbnRyb2xsZXInO1xuaW1wb3J0IGJvZHlwYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuY29uc3Qgcm91dGVzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbmNvbnN0IHVybGVuY29kZWRQYXJzZXIgPSBib2R5cGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSk7XG5cbnJvdXRlcy5hbGwoJy8nLCBUZXN0Q29udHJvbGxlcik7XG5yb3V0ZXMuZ2V0KCcvYWpheC9zZW5kbWVzc2FnZScsIFNlbmRNZXNzYWdlQ29udHJvbGxlcik7XG5yb3V0ZXMucG9zdCgnL3NsYWNrJywgU2xhY2tDb250cm9sbGVyKTtcbnJvdXRlcy5wb3N0KCcvc2xhY2tldmVudHMnLCB1cmxlbmNvZGVkUGFyc2VyLCBldmVudHMpO1xuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgVGVzdFJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbmltcG9ydCAnLi9tb2RlbHMvZWNsJztcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKCcvJywgVGVzdFJvdXRlcyk7XG5cbmFwcC5saXN0ZW4oODA4MCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuXG5leHBvcnQgY29uc3QgZXhlY3JlcXVlc3Q6IGFueSA9IGFzeW5jIChyZXE6IHN0cmluZykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QocmVxLCAoZXJyOiBhbnksIHJlczogYW55LCBib2R5OiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHsgcmVzLCBib2R5IH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG4iLCJpbXBvcnQgRGF0YXN0b3JlIGZyb20gJ25lZGInO1xuaW1wb3J0IHsgQ29udGV4dHMgfSBmcm9tICcuL3R5cGVzLnV0aWwnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG5jb25zdCBkYiA9IG5ldyBEYXRhc3RvcmUoeyBmaWxlbmFtZTogJ0RCL2NvbnRleHRzJywgYXV0b2xvYWQ6IHRydWUgfSk7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZU9sZCgpIHtcbiAgY29uc3QgdHRsID0gRGF0ZS5ub3coKSAtIGNvbmZpZy5ORURCLnR0bCAqIDg2NDAwMDAwO1xuICBhd2FpdCBkYi5yZW1vdmUoeyBjcmVhdGVUaW1lOiB7ICRsdDogdHRsIH0gfSwgeyBtdWx0aTogdHJ1ZSB9KTtcbn1cblxuY29uc3QgY291bnQ6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIuY291bnQocXVlcnksIChlcnI6IGFueSwgbmI6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobmIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IGluc2VydDogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi5pbnNlcnQocXVlcnksIChlcnI6IGFueSwgbmV3RG9jOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG5ld0RvYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlOiBhbnkgPSBhc3luYyAocXVlcnk6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiLnVwZGF0ZShcbiAgICAgIHsgdXNlcjogcXVlcnkudXNlciB9LFxuICAgICAgeyAkc2V0OiB7IGNvbnRleHRzOiBxdWVyeS5jb250ZXh0cyB9IH0sXG4gICAgICB7fSxcbiAgICAgIChlcnI6IGFueSwgbnVtUmVwbGFjZWQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShudW1SZXBsYWNlZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfSk7XG59O1xuXG5jb25zdCBmaW5kb25lOiBhbnkgPSBhc3luYyAocXVlcnk6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiLmZpbmRPbmUocXVlcnksIChlcnI6IGFueSwgZG9jOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGRvYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuYXN5bmMgZnVuY3Rpb24gc2F2ZSh1c2VyOiBzdHJpbmcsIGM6IENvbnRleHRzKSB7XG4gIGF3YWl0IGRlbGV0ZU9sZCgpO1xuICBpZiAodXNlcikge1xuICAgIGNvbnN0IG5iID0gYXdhaXQgZmluZG9uZSh7IHVzZXIgfSk7XG4gICAgY29uc3QgY29udGV4dHMgPSB7XG4gICAgICBmdWxmaWxsOiBjLmZ1bGZpbGwsXG4gICAgICBzZXJ2aWNlOiBjLnNlcnZpY2UsXG4gICAgfTtcbiAgICBpZiAoIW5iKSB7XG4gICAgICAvLyBJbnNlcnRpbmcgY29udGV4dFxuICAgICAgYXdhaXQgaW5zZXJ0KHsgdXNlciwgY29udGV4dHMsIGNyZWF0ZVRpbWU6IERhdGUubm93KCkgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVwZGF0aW5nIGNvbnRleHRcbiAgICAgIGF3YWl0IHVwZGF0ZSh7IHVzZXIsIGNvbnRleHRzIH0pO1xuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkKHVzZXI6IHN0cmluZyk6IFByb21pc2U8Q29udGV4dHM+IHtcbiAgYXdhaXQgZGVsZXRlT2xkKCk7XG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgY29udGV4dHMgPSBhd2FpdCBmaW5kb25lKHsgdXNlciB9KTtcbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnRleHRzLmNvbnRleHRzLnNpdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIGNvbnRleHRzLmNvbnRleHRzO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGZ1bGZpbGw6IHtcbiAgICAgIGN0eDogW10sXG4gICAgICBsYXN0bmFtZTogJycsXG4gICAgICBmaXJzdG5hbWU6ICcnLFxuICAgICAgZW1haWw6ICcnLFxuICAgICAgc2l0ZUdyb3VwOiBudWxsLFxuICAgICAgdXNlcklkOiAnJyxcbiAgICB9LFxuICAgIHNlcnZpY2U6IHtcbiAgICAgIHdhdHNvbjogbnVsbCxcbiAgICB9LFxuICAgIHNpdGU6IG51bGwsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2F2ZSxcbiAgbG9hZCxcbn07XG4iLCJpbXBvcnQgeyBSZXN1bHQsIENvbnRleHRzLCBJbnRlbnQsIEZ1bGZpbGxSZXNwb25zZSB9IGZyb20gJy4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgJy4uL2NvbmZpZy9pMThuJztcbmltcG9ydCBpbnRlbnRSZWdpc3RlciBmcm9tICcuL2Z1bGZpbGwvcmVnaXN0ZXIuaW50ZW50JztcbmltcG9ydCBpbnRlbnREZWZhdWx0IGZyb20gJy4vZnVsZmlsbC9kZWZhdWx0LmludGVudCc7XG5pbXBvcnQgaW50ZW50SW5mb3MgZnJvbSAnLi9mdWxmaWxsL2luZm9zLmludGVudCc7XG5cbmZ1bmN0aW9uIGNsb25lKHNyYzogYW55KSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNyYykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihcbiAgcmVzdWx0OiBSZXN1bHQsXG4gIGNvbnRleHRzOiBDb250ZXh0cyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIC8vIFJldHVybiAnbm90IHVuZGVyc3RhbmQnIHdoZW4gbm8gaW50ZW50c1xuICBpZiAocmVzdWx0LmludGVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGF3YWl0IGludGVudERlZmF1bHQuZmFsbGJhY2sobnVsbCwgY29udGV4dHMsIDAsIHJlc3VsdC5xdWVyeSwgdHlwZXMpO1xuICB9XG4gIC8vIEdldCBhbGwga25vd24gaW50ZW50c1xuICBjb25zdCBpbnRlbnRzOiBJbnRlbnRbXSA9IGdldENvbmZpZygpO1xuICBjb25zdCBpbnRlbnRNYXAgPSBuZXcgTWFwKCk7XG4gIGludGVudHMuZm9yRWFjaChpbnRlbnQgPT4ge1xuICAgIGludGVudE1hcC5zZXQoaW50ZW50Lm5hbWUsIGludGVudC5mdW5jKTtcbiAgfSk7XG4gIGNvbnN0IGludGVudHNSZXM6IEZ1bGZpbGxSZXNwb25zZVtdID0gW107XG4gIC8vIENoZWNrIGFsbCBpbnRlbnRzXG4gIGF3YWl0IHJlc3VsdC5pbnRlbnRzLnJlZHVjZShhc3luYyAocHJldmlvdXMsIGUpID0+IHtcbiAgICBhd2FpdCBwcmV2aW91cztcbiAgICBsZXQgcmVzOiBGdWxmaWxsUmVzcG9uc2U7XG4gICAgaWYgKCFpbnRlbnRNYXAuaGFzKGUubmFtZSkpIHtcbiAgICAgIGlmIChyZXN1bHQucmVzcG9uc2UpIHtcbiAgICAgICAgcmVzID0ge1xuICAgICAgICAgIGNvbnRleHRzLFxuICAgICAgICAgIHJlc3BvbnNlOiB7IHRleHQ6IHJlc3VsdC5yZXNwb25zZS50ZXh0LCB0eXBlOiAndGV4dCcgfSxcbiAgICAgICAgICBjb25maWRlbmNlOiAwLjAxLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmVzID0gYXdhaXQgaW50ZW50RGVmYXVsdC5mYWxsYmFjayhcbiAgICAgICAgbnVsbCxcbiAgICAgICAgY29udGV4dHMsXG4gICAgICAgIDAsXG4gICAgICAgIHJlc3VsdC5xdWVyeSxcbiAgICAgICAgdHlwZXMsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjOiBDb250ZXh0cyA9IGNsb25lKGNvbnRleHRzKTtcbiAgICAgIHJlcyA9IGF3YWl0IGludGVudE1hcC5nZXQoZS5uYW1lKShcbiAgICAgICAgcmVzdWx0LmVudGl0aWVzLFxuICAgICAgICBjLFxuICAgICAgICBlLmNvbmZpZGVuY2UsXG4gICAgICAgIHJlc3VsdC5xdWVyeSxcbiAgICAgICAgdHlwZXMsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAocmVzKSB7XG4gICAgICBpbnRlbnRzUmVzLnB1c2gocmVzKTtcbiAgICB9XG4gIH0sIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgbGV0IHJlc3BvbnNlID0gaW50ZW50c1Jlc1swXTtcbiAgLy8gR2V0IHRoZSBtb3N0IHByb2JhYmxlIG9uZVxuICBpbnRlbnRzUmVzLmZvckVhY2goZSA9PiB7XG4gICAgaWYgKGUgJiYgcmVzcG9uc2UuY29uZmlkZW5jZSA8IGUuY29uZmlkZW5jZSkge1xuICAgICAgcmVzcG9uc2UgPSBlO1xuICAgIH1cbiAgfSk7XG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgLy8gUmV0dXJuIGl0XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29uZmlnKCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVyLFxuICAgICAgZnVuYzogaW50ZW50UmVnaXN0ZXIucmVnaXN0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWdpc3Rlcm1haWwsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3Rlck1haWwsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWdpc3Rlcm5hbWUsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3Rlck5hbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWdpc3RlcmNvZGUsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3RlckNvZGUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5vcGVuaW5ndGltZSxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLm9wZW50aW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMuY29udGFjdCxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLmNvbnRhY3QsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5zZXJ2aWNlcyxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLnNlcnZpY2VzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMucmVsYWlzY29saXMsXG4gICAgICBmdW5jOiBpbnRlbnRJbmZvcy5yZWxhaXNjb2xpcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLmZhbGxiYWNrLFxuICAgICAgZnVuYzogaW50ZW50RGVmYXVsdC5mYWxsYmFjayxcbiAgICB9LFxuICBdO1xufVxuIiwiaW1wb3J0IHQgZnJvbSAnLi4vdHJhbnNsYXRlLnV0aWwnO1xuaW1wb3J0IHsgUmVzdWx0RW50aXR5LCBDb250ZXh0cywgRnVsZmlsbFJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGZhbGxiYWNrKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10gfCBudWxsLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZTogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiB0KCdpbnRlbnQuZGVmYXVsdC5ub3R1bmRlcnN0YW5kJyksXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmYWxsYmFjayxcbn07XG4iLCJpbXBvcnQgdCBmcm9tICcuLi90cmFuc2xhdGUudXRpbCc7XG5pbXBvcnQgeyBSZXN1bHRFbnRpdHksIENvbnRleHRzLCBGdWxmaWxsUmVzcG9uc2UgfSBmcm9tICcuLi90eXBlcy51dGlsJztcbmltcG9ydCBFY2wgZnJvbSAnLi4vLi4vbW9kZWxzL2VjbCc7XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW50aW1lKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBsZXQgdHh0ID0gdCgnaW50ZW50LmluZm9zLnNjaGVkdWxlbm90Zm91bmQnKTtcbiAgaWYgKGMuc2l0ZSkge1xuICAgIHR4dCA9IHQoJ2ludGVudC5pbmZvcy5zY2hlZHVsZScsIHtcbiAgICAgIGNvdW50OiBjLnNpdGUuY29uY2llcmdlcy5sZW5ndGgsXG4gICAgICBjb25jaWVyZ2VHaXZlbk5hbWU6IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMpLFxuICAgICAgc2l0ZXNTY2hlZHVsZXM6IGMuc2l0ZS5zaXRlLmhvcmFpcmVzLFxuICAgIH0pO1xuICB9XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogdHh0LFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnRhY3QoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGxldCB0eHQgPSB0KCdpbnRlbnQuaW5mb3MuY29udGFjdG5vdGZvdW5kJyk7XG4gIGlmIChjLnNpdGUpIHtcbiAgICB0eHQgPSB0KCdpbnRlbnQuaW5mb3MuY29udGFjdCcsIHtcbiAgICAgIGNvdW50OiBjLnNpdGUuY29uY2llcmdlcy5sZW5ndGgsXG4gICAgICBjb25jaWVyZ2VHaXZlbk5hbWU6IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMpLFxuICAgICAgc2l0ZUVtYWlsOiBjLnNpdGUuc2l0ZS5lbWFpbCxcbiAgICAgIHNpdGVUZWxlcGhvbmU6IGMuc2l0ZS5zaXRlLnRlbGVwaG9uZSxcbiAgICAgIHNpdGVTY2hlZHVsZXM6IGMuc2l0ZS5zaXRlLmhvcmFpcmVzLFxuICAgIH0pO1xuICB9XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogdHh0LFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlcnZpY2VzKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBsZXQgdHh0ID0gdCgnaW50ZW50LmluZm9zLnNlcnZpY2Vzbm90Zm91bmQnKTtcbiAgaWYgKGMuc2l0ZSkge1xuICAgIHR4dCA9IHQoJ2ludGVudC5pbmZvcy5zZXJ2aWNlcycsIHtcbiAgICAgIHNpdGVTZXJ2aWNlczogYy5zaXRlLnNpdGUuZ3VpZGVTZXJ2aWNlcyxcbiAgICB9KTtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IHR4dCxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWxhaXNjb2xpcyhcbiAgZW50aXRpZXM6IFJlc3VsdEVudGl0eVtdLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgbGV0IHR4dCA9IHQoJ2ludGVudC5pbmZvcy5yZWxhaXNjb2xpc25vdGZvdW5kJyk7XG4gIGlmIChjLnNpdGUpIHtcbiAgICB0eHQgPSB0KCdpbnRlbnQuaW5mb3MucmVsYWlzY29saXMnLCB7XG4gICAgICBjb3VudDogYy5zaXRlLmNvbmNpZXJnZXMubGVuZ3RoLFxuICAgICAgY29uY2llcmdlR2l2ZW5OYW1lOiBFY2wuZ2V0UHJlbm9tQ29uY2llcmdlKGMuc2l0ZS5jb25jaWVyZ2VzKSxcbiAgICAgIHNpdGVSZWxhaXNDb2xpczogYy5zaXRlLnNpdGUucmVsYWlzQ29saXMsXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZTogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiB0eHQsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBvcGVudGltZSxcbiAgY29udGFjdCxcbiAgc2VydmljZXMsXG4gIHJlbGFpc2NvbGlzLFxufTtcbiIsImltcG9ydCB7XG4gIENvbnRleHRzLFxuICBSZXN1bHRFbnRpdHksXG4gIEZ1bGZpbGxSZXNwb25zZSxcbiAgRnVsZmlsbFJlc3BvbnNlUmVzcG9uc2UsXG59IGZyb20gJy4uL3R5cGVzLnV0aWwnO1xuaW1wb3J0IHQgZnJvbSAnLi4vdHJhbnNsYXRlLnV0aWwnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IEVjbCwgeyBTaXRlR3JvdXAgfSBmcm9tICcuLi8uLi9tb2RlbHMvZWNsJztcbmltcG9ydCB7IHNlbmRNZXNzYWdlIH0gZnJvbSAnLi4vbWVzc2FnZS51dGlsJztcblxuY29uc3QgZWNsID0gbmV3IEVjbCgpO1xuXG5hc3luYyBmdW5jdGlvbiByZWdpc3RyYXRpb24oYzogQ29udGV4dHMsIHNpdGVHcm91cDogU2l0ZUdyb3VwIHwgbnVsbCkge1xuICBpZiAoIWMuc2l0ZSB8fCAhYy5mdWxmaWxsIHx8ICFzaXRlR3JvdXApIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIC8vIFN0b3JlIHJlZ2lzdHJhdGlvbiByZXF1ZXN0IGluIGRhdGFiYXNlXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBlY2wuc2F2ZVJlZ2lzdHJhdGlvbihcbiAgICAgIGMuc2l0ZS5zaXRlLFxuICAgICAgYy5mdWxmaWxsLnVzZXJJZCB8fCAnPycsXG4gICAgICBjLmZ1bGZpbGwuZW1haWwsXG4gICAgICBjLmZ1bGZpbGwubGFzdG5hbWUsXG4gICAgICBjLmZ1bGZpbGwuZmlyc3RuYW1lLFxuICAgICAgc2l0ZUdyb3VwLFxuICAgICk7XG4gICAgY29uc3QgbGluayA9IGAke2NvbmZpZy5FQ0wudXJsfS9pbnNjcmlwdGlvbi92ZXJpZl9lbWFpbC5waHA/dG9rPSR7dG9rZW59YDtcbiAgICBhd2FpdCBzZW5kTWVzc2FnZSh7XG4gICAgICBmcm9tOiBjLnNpdGUuc2l0ZS5lbWFpbCxcbiAgICAgIHRvOiBjLmZ1bGZpbGwuZW1haWwsXG4gICAgICBzdWJqZWN0OiAnVm90cmUgaW5zY3JpcHRpb24gw6AgbGEgQ29uY2llcmdlcmllJyxcbiAgICAgIGh0bWw6XG4gICAgICAgICc8aHRtbD4nICtcbiAgICAgICAgJzxoZWFkPicgK1xuICAgICAgICAnIDxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4nICtcbiAgICAgICAgJyAgIHAgeycgK1xuICAgICAgICAnICAgICB0ZXh0LWFsaWduOiBqdXN0aWZ5OycgK1xuICAgICAgICAnICAgICBmb250LWZhbWlseTpDYWxpYnJpLCBzYW5zLXNlcmlmOycgK1xuICAgICAgICAnICAgfScgK1xuICAgICAgICAnIDwvc3R5bGU+JyArXG4gICAgICAgICc8L2hlYWQ+JyArXG4gICAgICAgICc8Ym9keT4nICtcbiAgICAgICAgYCA8cD5Cb25qb3VyICR7Yy5mdWxmaWxsLmZpcnN0bmFtZX0sPC9wPjxiciAvPmAgK1xuICAgICAgICAnIDxwPk5vdXMgYXZvbnMgYmllbiBwcmlzIGVuIGNvbXB0ZSB2b3RyZSBpbnNjcmlwdGlvbiDDoCBsYSBjb25jaWVyZ2VyaWUuICcgK1xuICAgICAgICAnQWZpbiBkZSB2w6lyaWZpZXIgdm90cmUgYWRyZXNzZSBtYWlsLCBtZXJjaSBkZSBjbGlxdWVyIHN1ciBsZSBsaWVuIHN1aXZhbnQ6PC9wPicgK1xuICAgICAgICBgIDxhIGhyZWY9XCIke2xpbmt9XCI+VsOpcmlmaWVyIG1vbiBhZHJlc3NlIG1haWw8L2E+YCArXG4gICAgICAgICcgPHA+VW5lIGZvaXMgdm90cmUgYWRyZXNzZSB2w6lyaWZpw6llLCB2b3RyZSBjb21wdGUgc2VyYSBhY3RpZiBkYW5zIGxlcyBkZXV4IGpvdXJzIG91dnJhYmxlcyBzdWl2YW50IHZvdHJlIGluc2NyaXB0aW9uLjwvcD48YnI+JyArXG4gICAgICAgICcgPHA+w4AgdHLDqHMgYmllbnTDtHQgw6AgbGEgY29uY2llcmdlcmllICE8L3A+JyArXG4gICAgICAgICcgPHA+QXUgcGxhaXNpciBkZSB2b3VzIHJlbmRyZSBzZXJ2aWNlLjwvcD4nICtcbiAgICAgICAgJzwvYm9keT4nICtcbiAgICAgICAgJzwvaHRtbD4nLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIFNlbmQgcmVnaXN0cmF0aW9uIHJlcXVlc3QgYnkgbWFpbCB0byBjb25jaWVyZ2VcbiAgICBjb25zdCBub21Db25jaWVyZ2UgPSBFY2wuZ2V0UHJlbm9tQ29uY2llcmdlKGMuc2l0ZS5jb25jaWVyZ2VzLCBmYWxzZSk7XG4gICAgYXdhaXQgc2VuZE1lc3NhZ2UoXG4gICAgICB7XG4gICAgICAgIGZyb206IGNvbmZpZy5NQUlMLnNlbmRlcixcbiAgICAgICAgdG86IGMuc2l0ZS5zaXRlLmVtYWlsLFxuICAgICAgICBzdWJqZWN0OiBgW0xpZmVlXSBOb3V2ZWxsZSBpbnNjcmlwdGlvbiDDoCBzYWlzaXJgLFxuICAgICAgICB0ZXh0OiBgU2FsdXQgJHtub21Db25jaWVyZ2V9LCBjJ2VzdCBMaWZlZSAhXFxuXFxuTCd1dGlsaXNhdGV1ciBzdWl2YW50IHNvdWhhaXRlIHMnaW5zY3JpcmU6XFxuXFxuICBTb24gbm9tOiAke1xuICAgICAgICAgIGMuZnVsZmlsbC5sYXN0bmFtZVxuICAgICAgICB9XFxuICBTb24gUHLDqW5vbTogJHtjLmZ1bGZpbGwuZmlyc3RuYW1lfVxcbiAgU29uIEVtYWlsOiAke1xuICAgICAgICAgIGMuZnVsZmlsbC5sYXN0bmFtZVxuICAgICAgICB9XFxuICBTb24gTsKwOiAke2MuZnVsZmlsbC51c2VySWQgfHwgJz8nfVxcbiAgU2EgY29uY2llcmdlcmllOiAke2Muc2l0ZVxuICAgICAgICAgIC5zaXRlLmxpYmVsbGUgfHwgJz8nfVxcbiAgU29uIGNvZGUgZGUgcmVncm91cGVtZW50OiAke1xuICAgICAgICAgIHNpdGVHcm91cCA/IHNpdGVHcm91cC5ub20gOiAnPydcbiAgICAgICAgfVxcblxcbk1lcmNpIGRlIHByb2PDqWRlciDDoCBzb24gaW5zY3JpcHRpb24uXFxuXFxuQm9ubmUgam91cm7DqWUgIWAsXG4gICAgICB9LFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBpZiAoIWMuZnVsZmlsbCkgcmV0dXJuIG51bGw7XG4gIGMuZnVsZmlsbC5jdHggPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJdO1xuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IHQoJ2ludGVudC5yZWdpc3Rlci5hc2ttYWlsJyksXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJNYWlsKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBpZiAoIWMuZnVsZmlsbCkgcmV0dXJuIG51bGw7XG4gIGxldCBjb25mID0gY29uZmlkZW5jZTtcbiAgaWYgKFxuICAgIGMuZnVsZmlsbC5jdHggJiZcbiAgICBjLmZ1bGZpbGwuY3R4LmluY2x1ZGVzKGNvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVyKSAmJlxuICAgIGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4uZW1haWwnKS5sZW5ndGggPiAwXG4gICkge1xuICAgIGMuZnVsZmlsbC5lbWFpbCA9IGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4uZW1haWwnKVswXS52YWx1ZTtcbiAgICBjLmZ1bGZpbGwuY3R4ID0gW2NvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVybWFpbF07XG4gIH0gZWxzZSB7XG4gICAgY29uZiA9IDA7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogdCgnaW50ZW50LnJlZ2lzdGVyLmFza2ZpcnN0bmFtZScpLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY29uZmlkZW5jZTogY29uZixcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJOYW1lKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBpZiAoIWMuZnVsZmlsbCkgcmV0dXJuIG51bGw7XG4gIGxldCBjb25mID0gY29uZmlkZW5jZTtcbiAgY29uc3QgcmVzcG9uc2U6IEZ1bGZpbGxSZXNwb25zZVJlc3BvbnNlID0ge1xuICAgIHRleHQ6ICcnLFxuICAgIHR5cGU6ICd0ZXh0JyxcbiAgICBwYXJhbXM6IG51bGwsXG4gIH07XG4gIGNvbnN0IG5hbWVzID0gZW50aXRpZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSAnbmFtZScpO1xuICBsZXQgbmFtZSA9IG51bGw7XG4gIGlmIChuYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgbmFtZSA9IG5hbWVzWzBdLnZhbHVlO1xuICB9IGVsc2UgaWYgKHF1ZXJ5LnNwbGl0KCcgJykubGVuZ3RoID09PSAxKSB7XG4gICAgbmFtZSA9IHF1ZXJ5O1xuICB9XG4gIGlmIChcbiAgICBjLmZ1bGZpbGwuY3R4ICYmXG4gICAgYy5mdWxmaWxsLmN0eC5pbmNsdWRlcyhjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3Rlcm1haWwpICYmXG4gICAgbmFtZVxuICApIHtcbiAgICBjLmZ1bGZpbGwuY3R4ID0gW2NvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVybWFpbF07XG4gICAgaWYgKGMuZnVsZmlsbC5maXJzdG5hbWUpIHtcbiAgICAgIGMuZnVsZmlsbC5sYXN0bmFtZSA9IG5hbWU7XG4gICAgICBpZiAoYy5zaXRlKSB7XG4gICAgICAgIC8vIFVzZXIgc2l0ZSBncm91cCBpcyBuZWVkZWRcbiAgICAgICAgY29uc3QgZ3JvdXBzID0gYXdhaXQgZWNsLmdldFNpdGVHcm91cHMoYy5zaXRlLnNpdGUuaWQpO1xuICAgICAgICBpZiAoZ3JvdXBzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBjLmZ1bGZpbGwuY3R4ID0gW2NvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVyY29kZV07XG4gICAgICAgICAgcmVzcG9uc2UudGV4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5hc2tjb2RlJywge1xuICAgICAgICAgICAgZmlyc3RuYW1lOiBjLmZ1bGZpbGwuZmlyc3RuYW1lLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh0eXBlcy5pbmNsdWRlcygnZHJvcGRvd24nKSkge1xuICAgICAgICAgICAgcmVzcG9uc2UudHlwZSA9ICdkcm9wZG93bic7XG4gICAgICAgICAgICByZXNwb25zZS5wYXJhbXMgPSBbXTtcbiAgICAgICAgICAgIHJlc3BvbnNlLnZhbHVlID0gY29uZmlnLklOVEVOVFMucmVnaXN0ZXJjb2RlO1xuICAgICAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICBjb25zdCBsID0gdi50b1N0cmluZygpO1xuICAgICAgICAgICAgICByZXNwb25zZS5wYXJhbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogZ3JvdXAubm9tLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBncm91cHMuZm9yRWFjaCgoZ3JvdXAsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIHJlc3BvbnNlLnRleHQgKz0gdCgnaW50ZW50LnJlZ2lzdGVyLmdpdmVfc2l0ZV9ncm91cF9jaG9pY2UnLCB7XG4gICAgICAgICAgICAgICAgbnVtYmVyOiBpbmRleCArIDEsXG4gICAgICAgICAgICAgICAgbmFtZTogZ3JvdXAubm9tLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjLmZ1bGZpbGwuY3R4ID0gW107XG4gICAgICAgICAgaWYgKHJlZ2lzdHJhdGlvbihjLCBncm91cHMubGVuZ3RoID8gZ3JvdXBzWzBdIDogbnVsbCkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnRleHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuZG9uZV9hZnRlcl92YWxpZGF0aW9uJywge1xuICAgICAgICAgICAgICBjb3VudDogYy5zaXRlLmNvbmNpZXJnZXMubGVuZ3RoLFxuICAgICAgICAgICAgICBjb25jaWVyZ2VHaXZlbk5hbWU6IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnRleHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuZG9uZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYy5mdWxmaWxsLmN0eCA9IFtjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3RlcmNvZGVdO1xuICAgICAgICByZXNwb25zZS50ZXh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmFza2NvZGUnLCB7XG4gICAgICAgICAgZmlyc3RuYW1lOiBjLmZ1bGZpbGwuZmlyc3RuYW1lLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYy5mdWxmaWxsLmZpcnN0bmFtZSA9IG5hbWU7XG4gICAgICByZXNwb25zZS50ZXh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmFza2xhc3RuYW1lJywge1xuICAgICAgICBmaXJzdG5hbWU6IGMuZnVsZmlsbC5maXJzdG5hbWUsXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uZiA9IDAuOTtcbiAgfSBlbHNlIHtcbiAgICBjb25mID0gMDtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICByZXNwb25zZTogW3Jlc3BvbnNlXSxcbiAgICBjb250ZXh0czogYyxcbiAgICBjb25maWRlbmNlOiBjb25mLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3RlckNvZGUoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGlmICghYy5mdWxmaWxsKSByZXR1cm4gbnVsbDtcbiAgbGV0IGNvbmYgPSBjb25maWRlbmNlO1xuICBsZXQgdHh0ID0gJyc7XG4gIGlmIChcbiAgICBjLmZ1bGZpbGwuY3R4ICYmXG4gICAgYy5mdWxmaWxsLmN0eC5pbmNsdWRlcyhjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3RlcmNvZGUpICYmXG4gICAgZW50aXRpZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSAnYnVpbHRpbi5udW1iZXInKS5sZW5ndGggPiAwICYmXG4gICAgYy5zaXRlXG4gICkge1xuICAgIGNvbnN0IHNpdGVHcm91cE51bWJlciA9IHBhcnNlSW50KFxuICAgICAgZW50aXRpZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSAnYnVpbHRpbi5udW1iZXInKVswXS52YWx1ZSxcbiAgICAgIDEwLFxuICAgICk7XG4gICAgLy8gQ2hlY2sgZ2l2ZW4gbnVtYmVyIGV4aXN0cyBpbiBFQ0xcbiAgICBjb25zdCBncm91cHMgPSBhd2FpdCBlY2wuZ2V0U2l0ZUdyb3VwcyhjLnNpdGUuc2l0ZS5pZCk7XG4gICAgY29uc3Qgc2l0ZUdyb3VwID1cbiAgICAgIHNpdGVHcm91cE51bWJlciAmJiBzaXRlR3JvdXBOdW1iZXIgPiAwICYmIHNpdGVHcm91cE51bWJlciA8PSBncm91cHMubGVuZ3RoXG4gICAgICAgID8gZ3JvdXBzW3NpdGVHcm91cE51bWJlciAtIDFdXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIGlmICghc2l0ZUdyb3VwKSB7XG4gICAgICB0eHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuYXNrX3NpdGVfZ3JvdXBfYWdhaW4nLCB7XG4gICAgICAgIG1heDogZ3JvdXBzLmxlbmd0aCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjLmZ1bGZpbGwuY3R4ID0gW107XG4gICAgICBjLmZ1bGZpbGwuc2l0ZUdyb3VwID0gc2l0ZUdyb3VwTnVtYmVyO1xuICAgICAgaWYgKHJlZ2lzdHJhdGlvbihjLCBzaXRlR3JvdXApKSB7XG4gICAgICAgIHR4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5kb25lX2FmdGVyX3ZhbGlkYXRpb24nLCB7XG4gICAgICAgICAgY291bnQ6IGMuc2l0ZS5jb25jaWVyZ2VzLmxlbmd0aCxcbiAgICAgICAgICBjb25jaWVyZ2VHaXZlbk5hbWU6IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMpLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5kb25lJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbmYgPSAwLjk7XG4gIH0gZWxzZSB7XG4gICAgY29uZiA9IDA7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogdHh0LFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY29uZmlkZW5jZTogY29uZixcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICByZWdpc3RlcixcbiAgcmVnaXN0ZXJNYWlsLFxuICByZWdpc3Rlck5hbWUsXG4gIHJlZ2lzdGVyQ29kZSxcbn07XG4iLCJpbXBvcnQgd2F0c29uIGZyb20gJy4vc2VydmljZXMvd2F0c29uLnV0aWwnO1xuaW1wb3J0IGx1aXMgZnJvbSAnLi9zZXJ2aWNlcy9sdWlzLnV0aWwnO1xuaW1wb3J0IGZ1bGZpbGwgZnJvbSAnLi9mdWxmaWxsLnV0aWwnO1xuaW1wb3J0IENvbnRleHRzTWFuYWdlciBmcm9tICcuL2NvbnRleHRzbWFuYWdlci51dGlsJztcbmltcG9ydCBlY2wgZnJvbSAnLi4vbW9kZWxzL2VjbCc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dHMsIENvbnRleHRzLCBGdWxmaWxsUmVzcG9uc2UsIFJlc3VsdCB9IGZyb20gJy4vdHlwZXMudXRpbCc7XG5pbXBvcnQgaTE4biBmcm9tICdpMThuZXh0JztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2l0ZUNvbnRleHRzKFxuICB0bzogc3RyaW5nLFxuICBwbGF0Zm9ybTogc3RyaW5nLFxuKTogUHJvbWlzZTxTaXRlQ29udGV4dHM+IHtcbiAgbGV0IHNlcnZpY2UgPSAndHdpbGlvJztcbiAgaWYgKHBsYXRmb3JtID09PSAnc2xhY2snKSB7XG4gICAgc2VydmljZSA9ICdzbGFjayc7XG4gIH1cbiAgaWYgKCF0bykgdGhyb3cgRXJyb3IoYFVua25vd24gdG8gZm9yIHNlcnZpY2UgJHtzZXJ2aWNlfWApO1xuICBjb25zdCBFY2wgPSBuZXcgZWNsKCk7XG4gIGNvbnN0IHNpdGUgPSBhd2FpdCBFY2wuZ2V0U2l0ZUluZm9zKHNlcnZpY2UsIHRvKTtcbiAgaWYgKCFzaXRlKSB0aHJvdyBFcnJvcihgVW5rbm93biBTaXRlIGZvciBzZXJ2aWNlICR7c2VydmljZX0gd2l0aCBpZCAke3RvfWApO1xuXG4gIGNvbnN0IGNvbmNpZXJnZXMgPSBhd2FpdCBFY2wuZ2V0Q29uY2llcmdlTGlzdChzaXRlLmNvZGUpO1xuICByZXR1cm4ge1xuICAgIGNvbmNpZXJnZXMsXG4gICAgc2l0ZSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oXG4gIG1zZzogc3RyaW5nLFxuICBmcm9tOiBzdHJpbmcsXG4gIHRvOiBzdHJpbmcsXG4gIHNlcnZpY2U6IHN0cmluZyxcbiAgcGxhdGZvcm06IHN0cmluZyxcbikge1xuICAvKiBHZXQgY29udGV4dHMgKi9cbiAgbGV0IGNvbnRleHRzOiBDb250ZXh0cyA9IGF3YWl0IENvbnRleHRzTWFuYWdlci5sb2FkKGZyb20pO1xuICBjb25zdCBhOiBTaXRlQ29udGV4dHMgPSBhd2FpdCBnZXRTaXRlQ29udGV4dHModG8sIHBsYXRmb3JtKTtcbiAgY29udGV4dHMuc2l0ZSA9IGE7XG5cbiAgLyogR2V0IHNlcnZpY2UgUmVzdWx0ICovXG4gIGxldCByZXN1bHQ7XG4gIHN3aXRjaCAoc2VydmljZSkge1xuICAgIGNhc2UgJ3dhdHNvbic6XG4gICAgICByZXN1bHQgPSBhd2FpdCB3YXRzb24obXNnLCBjb250ZXh0cyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsdWlzJzpcbiAgICAgIHJlc3VsdCA9IGF3YWl0IGx1aXMobXNnLCBjb250ZXh0cyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBjb250ZXh0cyxcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgcmVzcG9uc2U6IG51bGwsXG4gICAgICAgICAgaW50ZW50czogW10sXG4gICAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiBtc2csXG4gICAgICAgIH0sXG4gICAgICB9O1xuICB9XG4gIGNvbnRleHRzID0gcmVzdWx0LmNvbnRleHRzO1xuICAvKiBDaGFuZ2UgbGFuZ3VhZ2UgKi9cbiAgaWYgKHRvID09PSAnKzMzNzU1NTM2OTEwJykge1xuICAgIGF3YWl0IGkxOG4uY2hhbmdlTGFuZ3VhZ2UoJ2ZyLXZzJyk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgaTE4bi5jaGFuZ2VMYW5ndWFnZSgnZnItdHUnKTtcbiAgfVxuICBjb25zb2xlLmxvZyhyZXN1bHQucmVzdWx0LmludGVudHMpO1xuICAvKiBEZWZpbmVzIGFjY2VwdGVkIHR5cGUgZm9yIHRoZSBwbGF0Zm9ybSAqL1xuICBsZXQgdHlwZXMgPSBbXTtcbiAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgIGNhc2UgJ3NsYWNrJzpcbiAgICAgIHR5cGVzID0gWydidXR0b25zJywgJ2Ryb3Bkb3duJywgJ3RleHQnXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3RlbCc6XG4gICAgICB0eXBlcyA9IFsndGV4dCddO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHR5cGVzID0gWyd0ZXh0J107XG4gIH1cbiAgLyogR2V0IGZ1bGZpbGwgUmVzcG9uc2UgKi9cbiAgY29uc3QgcmVzcG9uc2U6IEZ1bGZpbGxSZXNwb25zZSA9IGF3YWl0IGZ1bGZpbGwoXG4gICAgcmVzdWx0LnJlc3VsdCxcbiAgICBjb250ZXh0cyxcbiAgICB0eXBlcyxcbiAgKTtcbiAgLyogU2F2ZSBjb250ZXh0cyAqL1xuICBhd2FpdCBDb250ZXh0c01hbmFnZXIuc2F2ZShmcm9tLCByZXNwb25zZS5jb250ZXh0cyk7XG4gIC8qIFJldHVybiByZXNwb25zZSB0ZXh0ICovXG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1zZ1dpdGhvdXRTZXJ2aWNlKFxuICBtc2c6IHN0cmluZyxcbiAgZnJvbTogc3RyaW5nLFxuICB0bzogc3RyaW5nLFxuICBwbGF0Zm9ybTogc3RyaW5nLFxuICByZXN1bHQ6IFJlc3VsdCxcbikge1xuICAvKiBHZXQgY29udGV4dHMgKi9cbiAgY29uc3QgY29udGV4dHM6IENvbnRleHRzID0gYXdhaXQgQ29udGV4dHNNYW5hZ2VyLmxvYWQoZnJvbSk7XG4gIGNvbnN0IGE6IFNpdGVDb250ZXh0cyA9IGF3YWl0IGdldFNpdGVDb250ZXh0cyh0bywgcGxhdGZvcm0pO1xuICBjb250ZXh0cy5zaXRlID0gYTtcbiAgLyogQ2hhbmdlIGxhbmd1YWdlICovXG4gIGlmICh0byA9PT0gJyszMzc1NTUzNjkxMCcpIHtcbiAgICBhd2FpdCBpMThuLmNoYW5nZUxhbmd1YWdlKCdmci12cycpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGkxOG4uY2hhbmdlTGFuZ3VhZ2UoJ2ZyLXR1Jyk7XG4gIH1cbiAgLyogRGVmaW5lcyBhY2NlcHRlZCB0eXBlIGZvciB0aGUgcGxhdGZvcm0gKi9cbiAgbGV0IHR5cGVzID0gW107XG4gIHN3aXRjaCAocGxhdGZvcm0pIHtcbiAgICBjYXNlICdzbGFjayc6XG4gICAgICB0eXBlcyA9IFsnYnV0dG9ucycsICdkcm9wZG93bicsICd0ZXh0J107XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZWwnOlxuICAgICAgdHlwZXMgPSBbJ3RleHQnXTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0eXBlcyA9IFsndGV4dCddO1xuICB9XG4gIC8qIEdldCBmdWxmaWxsIFJlc3BvbnNlICovXG4gIGNvbnN0IHJlc3BvbnNlOiBGdWxmaWxsUmVzcG9uc2UgPSBhd2FpdCBmdWxmaWxsKHJlc3VsdCwgY29udGV4dHMsIHR5cGVzKTtcbiAgLyogU2F2ZSBjb250ZXh0cyAqL1xuICBhd2FpdCBDb250ZXh0c01hbmFnZXIuc2F2ZShmcm9tLCByZXNwb25zZS5jb250ZXh0cyk7XG4gIC8qIFJldHVybiByZXNwb25zZSB0ZXh0ICovXG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cbiIsImltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy8nO1xuXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgaG9zdDogY29uZmlnLk1BSUwuaG9zdCxcbiAgcG9ydDogMjUsXG4gIHNlY3VyZTogY29uZmlnLk1BSUwuc2VjdXJlLFxuICAvLyBhdXRoOiB7XG4gIC8vICAgICB1c2VyOiAneHh4QHh4LmNvbScsXG4gIC8vICAgICBwYXNzOiAneHh4eCdcbiAgLy8gfSxcbiAgdGxzOiB7IHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UgfSxcbn0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1haWxPcHRpb25zIHtcbiAgZnJvbTogc3RyaW5nO1xuICB0bzogc3RyaW5nIHwgc3RyaW5nW107XG4gIGNjPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICByZXBseVRvPzogc3RyaW5nO1xuICBzdWJqZWN0OiBzdHJpbmc7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIGh0bWw/OiBzdHJpbmc7XG4gIGF0dGFjaG1lbnRzPzogYW55W107XG59XG5cbmV4cG9ydCBjb25zdCBzZW5kTWVzc2FnZSA9IGFzeW5jIChcbiAgb3B0aW9uczogTWFpbE9wdGlvbnMsXG4gIHRocm93RXJyb3I6IGJvb2xlYW4gPSB0cnVlLFxuKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKGNvbmZpZy5NQUlMLmVuYWJsZSkge1xuICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIHRvOiBjb25maWcuTUFJTC5yZWNpcGllbnQgfHwgb3B0aW9ucy50byxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHRocm93RXJyb3IpIHRocm93IGU7XG4gIH1cbn07XG4iLCJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXN1bHQsIENvbnRleHRzIH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgeyBleGVjcmVxdWVzdCB9IGZyb20gJy4uL2FzeW5jLnV0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtc2c6IHN0cmluZywgY29udGV4dHM6IENvbnRleHRzKSB7XG4gIGNvbnN0IHJlc3VsdDogUmVzdWx0ID0ge1xuICAgIHJlc3BvbnNlOiBudWxsLFxuICAgIGludGVudHM6IFtdLFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBxdWVyeTogbXNnLFxuICB9O1xuICB0cnkge1xuICAgIGNvbnN0IGVuZHBvaW50ID1cbiAgICAgICdodHRwczovL3dlc3R1cy5hcGkuY29nbml0aXZlLm1pY3Jvc29mdC5jb20vbHVpcy92Mi4wL2FwcHMvJztcbiAgICBjb25zdCBhcHBJZCA9IGNvbmZpZy5MVUlTLmFwcElkO1xuICAgIGNvbnN0IGVuZHBvaW50a2V5ID0gY29uZmlnLkxVSVMuZW5kcG9pbnRLZXk7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSB7XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgcTogbXNnLFxuICAgICAgJ3N1YnNjcmlwdGlvbi1rZXknOiBlbmRwb2ludGtleSxcbiAgICB9O1xuICAgIGNvbnN0IHJlcSA9IGAke2VuZHBvaW50fSR7YXBwSWR9PyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KHF1ZXJ5UGFyYW1zKX1gO1xuICAgIGxldCByZXMgPSBhd2FpdCBleGVjcmVxdWVzdChyZXEpO1xuICAgIHJlcyA9IEpTT04ucGFyc2UocmVzLmJvZHkpO1xuICAgIHJlcy5pbnRlbnRzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmludGVudHMucHVzaCh7XG4gICAgICAgIG5hbWU6IGUuaW50ZW50LFxuICAgICAgICBjb25maWRlbmNlOiBlLnNjb3JlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzdWx0LmVudGl0aWVzID0gW107XG4gICAgcmVzLmVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBlLnR5cGUsXG4gICAgICAgIHZhbHVlOiBlLmVudGl0eSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7IHJlc3VsdCwgY29udGV4dHMgfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHsgcmVzdWx0LCBjb250ZXh0cyB9O1xuICB9XG59XG4iLCJpbXBvcnQgd2F0c29uIGZyb20gJ3dhdHNvbi1kZXZlbG9wZXItY2xvdWQvYXNzaXN0YW50L3YyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IFJlc3VsdCwgQ29udGV4dHMgfSBmcm9tICcuLi90eXBlcy51dGlsJztcblxuY29uc3QgY3JlYXRlU2Vzc2lvbjogYW55ID0gYXN5bmMgKGFzc2lzdGFudDogYW55LCBvYmo6IGFueSkgPT4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXNzaXN0YW50LmNyZWF0ZVNlc3Npb24ob2JqLCAoZXJyOiBhbnksIHJlczogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHNlbmRNZXNzYWdlOiBhbnkgPSBhc3luYyAoYXNzaXN0YW50OiBhbnksIG9iajogYW55KSA9PiB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW51c2VkLWV4cHJlc3Npb25cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBhc3Npc3RhbnQubWVzc2FnZShvYmosIChlcnI6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1zZzogc3RyaW5nLCBjb250ZXh0czogQ29udGV4dHMpIHtcbiAgY29uc3QgcmVzdWx0OiBSZXN1bHQgPSB7XG4gICAgcmVzcG9uc2U6IG51bGwsXG4gICAgaW50ZW50czogW10sXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIHF1ZXJ5OiBtc2csXG4gIH07XG4gIHRyeSB7XG4gICAgLy8gQ3JlYXRlIGFzc2lzdGFudFxuICAgIGNvbnN0IGFzc2lzdGFudCA9IG5ldyB3YXRzb24oe1xuICAgICAgaWFtX2FwaWtleTogY29uZmlnLldBVFNPTi5hcGlLZXksXG4gICAgICB2ZXJzaW9uOiAnMjAxOC0wOS0yMCcsXG4gICAgICB1cmw6ICdodHRwczovL2dhdGV3YXktbG9uLndhdHNvbnBsYXRmb3JtLm5ldC9hc3Npc3RhbnQvYXBpJyxcbiAgICB9KTtcbiAgICBjb25zdCBhc3Npc3RhbnRJZCA9IGNvbmZpZy5XQVRTT04uYXNzaXN0YW50SWQ7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGNyZWF0ZVNlc3Npb24oYXNzaXN0YW50LCB7XG4gICAgICBhc3Npc3RhbnRfaWQ6IGFzc2lzdGFudElkLFxuICAgIH0pO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHNlc3Npb24uc2Vzc2lvbl9pZDtcbiAgICBjb250ZXh0cy5zZXJ2aWNlLndhdHNvbklkID0gc2Vzc2lvbklkO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNlbmRNZXNzYWdlKGFzc2lzdGFudCwge1xuICAgICAgYXNzaXN0YW50X2lkOiBhc3Npc3RhbnRJZCxcbiAgICAgIHNlc3Npb25faWQ6IHNlc3Npb25JZCxcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1lc3NhZ2VfdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBtc2csXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXR1cm5fY29udGV4dDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjb250ZXh0czogY29udGV4dHMuc2VydmljZS53YXRzb24sXG4gICAgfSk7XG4gICAgY29udGV4dHMuc2VydmljZS53YXRzb24gPSByZXMuY29udGV4dDtcbiAgICByZXN1bHQucmVzcG9uc2UgPSB7XG4gICAgICB0eXBlOiByZXMub3V0cHV0LmdlbmVyaWNbMF0ucmVzcG9uc2VfdHlwZSxcbiAgICAgIHRleHQ6IHJlcy5vdXRwdXQuZ2VuZXJpY1swXS50ZXh0LFxuICAgIH07XG4gICAgcmVzLm91dHB1dC5pbnRlbnRzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmludGVudHMucHVzaCh7XG4gICAgICAgIGNvbmZpZGVuY2U6IGUuY29uZmlkZW5jZSxcbiAgICAgICAgbmFtZTogZS5pbnRlbnQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXN1bHQuZW50aXRpZXMgPSBbXTtcbiAgICByZXMub3V0cHV0LmVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBlLmVudGl0eSxcbiAgICAgICAgdmFsdWU6IG1zZy5zdWJzdHJpbmcoZS5sb2NhdGlvblswXSwgZS5sb2NhdGlvblsxXSksXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4geyByZXN1bHQsIGNvbnRleHRzIH07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB7IHJlc3VsdCwgY29udGV4dHMgfTtcbiAgfVxufVxuIiwiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGtleTogc3RyaW5nLCBwYXJhbXM6IGFueSA9IG51bGwpIHtcbiAgbGV0IHBhcmFtZXRlcnMgPSBwYXJhbXM7XG4gIGlmICghcGFyYW1ldGVycykge1xuICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgfVxuICBwYXJhbWV0ZXJzLnJldHVybk9iamVjdHMgPSB0cnVlO1xuICBjb25zdCBwb3NzaWJpbGl0aWVzID0gaTE4bmV4dC50KGtleSwgcGFyYW1ldGVycyk7XG4gIGlmIChBcnJheS5pc0FycmF5KHBvc3NpYmlsaXRpZXMpKSB7XG4gICAgcmV0dXJuIHBvc3NpYmlsaXRpZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2liaWxpdGllcy5sZW5ndGgpXTtcbiAgfVxuICByZXR1cm4gcG9zc2liaWxpdGllcztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImkxOG5leHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaTE4bmV4dC1ub2RlLWZzLWJhY2tlbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibW9tZW50XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5lZGJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZW1haWxlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZXF1ZXN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndhdHNvbi1kZXZlbG9wZXItY2xvdWQvYXNzaXN0YW50L3YyXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=