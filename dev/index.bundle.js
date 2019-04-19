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
    WIT: {
        accesstoken: process.env.WIT_ACCESSTOKEN || '',
    },
    SAP: {
        token: process.env.SAP_TOKEN || '',
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
            const response = await handlemessage_util_1.default(msg, from, '+33755536910', 'sap', 'tel');
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            return res.end(JSON.stringify(response));
        }
    }
    catch (ex) {
        console.log('error');
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
    const payload = JSON.parse(req.body.payload);
    if (payload.token === 'hvKeVxQcyXJ0DsnjGLfS617C') {
        const to = payload.team.id;
        const from = await getEmail(payload.user.id);
        const intents = [];
        const entities = [];
        payload.actions.forEach((a) => {
            intents.push({
                confidence: 0.1,
                name: a.action_id.split(' ')[0],
            });
            entities.push({
                name: a.action_id.split(' ')[1],
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
                    response: [{ text: result.response.text, type: 'text' }],
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
                        response.value = `${config_1.default.INTENTS.registercode} builtin.number`;
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
const wit_util_1 = __importDefault(__webpack_require__(/*! ./services/wit.util */ "./src/utils/services/wit.util.ts"));
const sap_util_1 = __importDefault(__webpack_require__(/*! ./services/sap.util */ "./src/utils/services/sap.util.ts"));
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
        case 'wit':
            result = await wit_util_1.default(msg, contexts);
            break;
        case 'sap':
            result = await sap_util_1.default(msg, contexts);
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
    console.log(response);
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
async function default_1(msg, contexts) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: msg,
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
                    content: msg,
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
        return { result, contexts };
    }
    catch (e) {
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
async function default_1(msg, contexts) {
    const result = {
        response: null,
        intents: [],
        entities: [],
        query: msg,
    };
    try {
        const client = new node_wit_1.Wit({ accessToken: config_1.default.WIT.accesstoken });
        const res = await client.message(msg, {});
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
        return { result, contexts };
    }
    catch (e) {
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpMThuLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXGNvbnRyb2xsZXJzXFxhamF4LmNvbnRyb2xsZXIudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcaW5kZXgudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcc2xhY2suY29udHJvbGxlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXG1vZGVsc1xcZWNsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xccm91dGVzXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHNlcnZlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxhc3luYy51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGNvbnRleHRzbWFuYWdlci51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGZ1bGZpbGwudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsXFxkZWZhdWx0LmludGVudC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsXFxpbmZvcy5pbnRlbnQudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcZnVsZmlsbFxccmVnaXN0ZXIuaW50ZW50LnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGhhbmRsZW1lc3NhZ2UudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxtZXNzYWdlLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcc2VydmljZXNcXGx1aXMudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxzZXJ2aWNlc1xcc2FwLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcc2VydmljZXNcXHdhdHNvbi51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXHNlcnZpY2VzXFx3aXQudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFx0cmFuc2xhdGUudXRpbC50cyIsImV4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsImV4dGVybmFsIFwiZG90ZW52XCIiLCJleHRlcm5hbCBcImV4cHJlc3NcIiIsImV4dGVybmFsIFwiZnNcIiIsImV4dGVybmFsIFwiaTE4bmV4dFwiIiwiZXh0ZXJuYWwgXCJpMThuZXh0LW5vZGUtZnMtYmFja2VuZFwiIiwiZXh0ZXJuYWwgXCJtb21lbnRcIiIsImV4dGVybmFsIFwibmVkYlwiIiwiZXh0ZXJuYWwgXCJub2RlLXdpdFwiIiwiZXh0ZXJuYWwgXCJub2RlbWFpbGVyXCIiLCJleHRlcm5hbCBcInF1ZXJ5c3RyaW5nXCIiLCJleHRlcm5hbCBcInJlcXVlc3RcIiIsImV4dGVybmFsIFwic2VxdWVsaXplXCIiLCJleHRlcm5hbCBcInV1aWRcIiIsImV4dGVybmFsIFwid2F0c29uLWRldmVsb3Blci1jbG91ZC9hc3Npc3RhbnQvdjJcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLGlGQUEyQjtBQUMzQixpSUFBcUQ7QUFDckQsOEVBQTRCO0FBRTVCLE1BQU0sS0FBSyxHQUFHLGFBQW9CLEtBQUssYUFBYSxDQUFDO0FBRXJELGlCQUFJLENBQUMs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QXdCLEdBQVcsRUFBRSxTQUFjLElBQUk7SUFDckQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixVQUFVLEdBQUcsRUFBRSxDQUFDO0tBQ2pCO0lBQ0QsVUFBVSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDaEMsTUFBTSxhQUFhLEdBQUcsaUJBQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNoQyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUN4RTtJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFYRCw0QkFXQzs7Ozs7Ozs7Ozs7O0FDYkQsd0M7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsdUM7Ozs7Ozs7Ozs7O0FDQUEsd0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0UiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc2VydmVyLnRzXCIpO1xuIiwiaW1wb3J0IGkxOG4gZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgaTE4bmV4dEJhY2tlbmQgZnJvbSAnaTE4bmV4dC1ub2RlLWZzLWJhY2tlbmQnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5pMThuLnVzZShpMThuZXh0QmFja2VuZCkuaW5pdCh7XG4gIGxuZzogJ2ZyLXR1JyxcbiAgZmFsbGJhY2tMbmc6ICdmci10dScsXG4gIHByZWxvYWQ6IFsnZnItdHUnXSxcbiAgc2F2ZU1pc3Npbmc6IHRydWUsXG4gIGRlYnVnOiBpc0RldixcbiAgaW50ZXJwb2xhdGlvbjoge1xuICAgIGZvcm1hdDogKHZhbHVlLCBmb3JtYXQgLyogLCBsbmcgKi8pID0+IHtcbiAgICAgIGlmIChmb3JtYXQgPT09ICdjYXBpdGFsaXplJylcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSByZXR1cm4gbW9tZW50KHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICB9LFxuICBiYWNrZW5kOiB7XG4gICAgLy8gcGF0aCB3aGVyZSByZXNvdXJjZXMgZ2V0IGxvYWRlZCBmcm9tXG4gICAgbG9hZFBhdGg6ICdsb2NhbGVzL3t7bG5nfX0ve3tuc319Lmpzb24nLFxuICAgIC8vIHBhdGggdG8gcG9zdCBtaXNzaW5nIHJlc291cmNlc1xuICAgIGFkZFBhdGg6ICdsb2NhbGVzL3t7bG5nfX0ve3tuc319Lm1pc3NpbmcuanNvbicsXG4gICAgLy8ganNvbkluZGVudCB0byB1c2Ugd2hlbiBzdG9yaW5nIGpzb24gZmlsZXNcbiAgICBqc29uSW5kZW50OiAyLFxuICB9LFxufSk7XG4iLCJpbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbmRvdGVudi5jb25maWcoeyBkZWJ1ZzogdHJ1ZSB9KTtcbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIFBPUlQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCxcbiAgREVCVUc6IHByb2Nlc3MuZW52LkRFQlVHIHx8IGZhbHNlLFxuICBFQ0w6IHtcbiAgICB1cmw6IHByb2Nlc3MuZW52LkVDTF9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3QnLFxuICB9LFxuICBEQl9MT0dHSU5HOiBpc0RldixcbiAgQVBJX0FDQ0VTU19VU0VSTkFNRTogcHJvY2Vzcy5lbnYuQVBJX0FDQ0VTU19VU0VSTkFNRSB8fCBudWxsLFxuICBBUElfQUNDRVNTX1BBU1NXT1JEOiBwcm9jZXNzLmVudi5BUElfQUNDRVNTX1BBU1NXT1JEIHx8IG51bGwsXG4gIERCOiB7XG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LkRCX1VTRVJOQU1FIHx8ICdhZG1pbicsXG4gICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LkRCX1BBU1NXT1JEIHx8ICdwYXNzd29yZCcsXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRCX0RBVEFCQVNFIHx8ICdkYXRhYmFzZScsXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuREJfSE9TVCB8fCAnbG9jYWxob3N0JyxcbiAgICBvcHRpb25zOiB7IGVuY3J5cHQ6IHRydWUgfSxcbiAgICBvcGVyYXRvcnNBbGlhc2VzOiBmYWxzZSxcbiAgfSxcbiAgSU5URU5UUzoge1xuICAgIHJlZ2lzdGVyOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVHSVNURVIgfHwgJycsXG4gICAgcmVnaXN0ZXJtYWlsOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVHSVNURVJNQUlMIHx8ICcnLFxuICAgIHJlZ2lzdGVybmFtZTogcHJvY2Vzcy5lbnYuSU5URU5UX1JFR0lTVEVSTkFNRSB8fCAnJyxcbiAgICByZWdpc3RlcmNvZGU6IHByb2Nlc3MuZW52LklOVEVOVF9SRUdJU1RFUkNPREUgfHwgJycsXG4gICAgb3BlbmluZ3RpbWU6IHByb2Nlc3MuZW52LklOVEVOVF9PUEVOVElNRSB8fCAnJyxcbiAgICBjb250YWN0OiBwcm9jZXNzLmVudi5JTlRFTlRfQ09OVEFDVCB8fCAnJyxcbiAgICBzZXJ2aWNlczogcHJvY2Vzcy5lbnYuSU5URU5UX1NFUlZJQ0VTIHx8ICcnLFxuICAgIHJlbGFpc2NvbGlzOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVMQUlTQ09MSVMgfHwgJycsXG4gICAgZmFsbGJhY2s6IHByb2Nlc3MuZW52LklOVEVOVF9GQUxMQkFDSyB8fCAnJyxcbiAgfSxcbiAgQ09OVEVYVFM6IHtcbiAgICBGVUxGSUxMOiB7XG4gICAgICByZWdpc3RlcjogcHJvY2Vzcy5lbnYuQ09OVEVYVF9GVUxGSUxMX1JFR0lTVEVSIHx8ICcnLFxuICAgICAgcmVnaXN0ZXJtYWlsOiBwcm9jZXNzLmVudi5DT05URVhUX0ZVTEZJTExfUkVHSVNURVJNQUlMIHx8ICcnLFxuICAgICAgcmVnaXN0ZXJjb2RlOiBwcm9jZXNzLmVudi5DT05URVhUX0ZVTEZJTExfUkVHSVNURVJDT0RFIHx8ICcnLFxuICAgIH0sXG4gIH0sXG4gIExVSVM6IHtcbiAgICBhcHBJZDogcHJvY2Vzcy5lbnYuTFVJU19BUFBfSUQgfHwgJycsXG4gICAgZW5kcG9pbnRLZXk6IHByb2Nlc3MuZW52LkxVSVNfRU5EUE9JTlRfS0VZIHx8ICcnLFxuICB9LFxuICBXQVRTT046IHtcbiAgICBhcGlLZXk6IHByb2Nlc3MuZW52LldBVFNPTl9BUElfS0VZIHx8ICcnLFxuICAgIGFzc2lzdGFudElkOiBwcm9jZXNzLmVudi5XQVRTT05fQVNTSVNUQU5UX0lEIHx8ICcnLFxuICB9LFxuICBUV0lMSU86IHtcbiAgICBhY2NvdW50SWQ6IHByb2Nlc3MuZW52LlRXSUxJT19BQ0NPVU5UX0lEIHx8ICd0d2lsaW9fYWNjb3VudCcsXG4gICAgYXV0aFRva2VuOiBwcm9jZXNzLmVudi5UV0lMSU9fQVVUSF9UT0tFTiB8fCAnYXV0aF90b2tlbicsXG4gIH0sXG4gIFBMSVZPOiB7XG4gICAgYWNjb3VudElkOiBwcm9jZXNzLmVudi5QTElWT19BQ0NPVU5UX0lEIHx8ICdwbGl2b19hY2NvdW50JyxcbiAgICBhdXRoVG9rZW46IHByb2Nlc3MuZW52LlBMSVZPX0FVVEhfVE9LRU4gfHwgJ2F1dGhfdG9rZW4nLFxuICB9LFxuICBORVhNTzoge1xuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYTU9fQVBJX0tFWSB8fCAnbmV4bW9fYXBpX2tleScsXG4gICAgYXBpU2VjcmV0OiBwcm9jZXNzLmVudi5ORVhNT19BUElfU0VDUkVUIHx8ICduZXhtb19hcGlfc2VjcmV0JyxcbiAgfSxcbiAgRElBTE9HX0ZMT1c6IHtcbiAgICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX1BST0pFQ1RfSUQgfHwgJ2FnZW50JyxcbiAgICBlbnZpcm9ubWVudDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfRU5WSVJPTk1FTlQgfHwgJ2RyYWZ0JyxcbiAgICBsYW5ndWFnZUNvZGU6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0xBTkdVQUdFX0NPREUgfHwgJ2VuJyxcbiAgICB1c2VybmFtZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfVVNFUk5BTUUgfHwgbnVsbCxcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfUEFTU1dPUkQgfHwgbnVsbCxcbiAgICBjb25zb2xlU2VydmljZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfQ09OU09MRV9TRVJWSUNFIHx8ICdjb25zb2xlJyxcbiAgICBjb25zb2xlU2VydmljZUlkOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19DT05TT0xFX1NFUlZJQ0VfSUQgfHwgJzY5MTAnLFxuICAgIGNvbnNvbGVVc2VySWQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlNPTEVfVVNFUl9JRCB8fCAnMERIU0VOSlA5WicsXG4gICAgY29uc29sZVVzZXJUeXBlOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19VU0VSX1RZUEUgfHwgJ3VzZXJJZCcsXG4gIH0sXG4gIFNMQUNLOiB7XG4gICAgYXBpVG9rZW46IHByb2Nlc3MuZW52LlNMQUNLX0FQSV9UT0tFTiB8fCAnc2xhY2tfdG9rZW4nLFxuICB9LFxuICBNQUlMOiB7XG4gICAgZW5hYmxlOiBwcm9jZXNzLmVudi5NQUlMX0VOQUJMRSA9PT0gJ3RydWUnIHx8IGZhbHNlLFxuICAgIGhvc3Q6IHByb2Nlc3MuZW52Lk1BSUxfU01UUF9TRVJWRVIgfHwgJ2xvY2FsaG9zdCcsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuTUFJTF9TTVRQX1BPUlQgfHwgMjUsXG4gICAgc2VjdXJlOiBwcm9jZXNzLmVudi5NQUlMX1NNVFBfU0VDVVJFID09PSAndHJ1ZScgfHwgZmFsc2UsXG4gICAgcmVjaXBpZW50OiBwcm9jZXNzLmVudi5NQUlMX1JFQ0lQSUVOVCB8fCB1bmRlZmluZWQsXG4gICAgc2VuZGVyOiBwcm9jZXNzLmVudi5NQUlMX1NFTkRFUiB8fCAnJyxcbiAgICBzYXY6IHByb2Nlc3MuZW52Lk1BSUxfU0FWIHx8ICdzZXJ2aWNlLXNpQGVhc3ktbGlmZS5mcicsXG4gIH0sXG4gIE5FREI6IHtcbiAgICB0dGw6IHBhcnNlSW50KHByb2Nlc3MuZW52Lk5FREJfVFRMIHx8ICcwJywgMTApLFxuICB9LFxuICBXSVQ6IHtcbiAgICBhY2Nlc3N0b2tlbjogcHJvY2Vzcy5lbnYuV0lUX0FDQ0VTU1RPS0VOIHx8ICcnLFxuICB9LFxuICBTQVA6IHtcbiAgICB0b2tlbjogcHJvY2Vzcy5lbnYuU0FQX1RPS0VOIHx8ICcnLFxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENvbmZpZztcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGhhbmRsZW1lc3NhZ2UgZnJvbSAnLi4vdXRpbHMvaGFuZGxlbWVzc2FnZS51dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24oXG4gIHJlcTogZXhwcmVzcy5SZXF1ZXN0LFxuICByZXM6IGV4cHJlc3MuUmVzcG9uc2UsXG4gIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uLFxuKSB7XG4gIHRyeSB7XG4gICAgaWYgKHJlcS5xdWVyeS5tc2cgJiYgcmVxLnF1ZXJ5LmZyb20pIHtcbiAgICAgIGNvbnN0IG1zZyA9IHJlcS5xdWVyeS5tc2c7XG4gICAgICBjb25zdCBmcm9tID0gcmVxLnF1ZXJ5LmZyb207XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZW1lc3NhZ2UoXG4gICAgICAgIG1zZyxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgJyszMzc1NTUzNjkxMCcsXG4gICAgICAgICdzYXAnLFxuICAgICAgICAndGVsJyxcbiAgICAgICk7XG4gICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0pO1xuICAgICAgcmV0dXJuIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgcmVzLndyaXRlSGVhZCg1MDApO1xuICAgIHJldHVybiByZXMuZW5kKCdFcnJvcicpO1xuICB9XG4gIHJlcy53cml0ZUhlYWQoNDA0KTtcbiAgcmV0dXJuIHJlcy5lbmQoJ01pc3NpbmcgXCJtc2dcIiBvciBcImZyb21cIicpO1xufVxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnIH0pO1xuICBjb25zdCBodG1sID0gZnMucmVhZEZpbGVTeW5jKFxuICAgIGBDOi9Vc2Vycy9WaXNpdGV1ci9Eb2N1bWVudHMvTGlmZWUvdGVzdHMvVGVtcGxhdGVzL2luZGV4Lmh0bWxgLFxuICApO1xuICByZXR1cm4gcmVzLmVuZChodG1sKTtcbn1cbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGhhbmRsZW1lc3NhZ2UsIHtcbiAgaGFuZGxlTXNnV2l0aG91dFNlcnZpY2UsXG59IGZyb20gJy4uL3V0aWxzL2hhbmRsZW1lc3NhZ2UudXRpbCc7XG5pbXBvcnQgeyBleGVjcmVxdWVzdCB9IGZyb20gJy4uL3V0aWxzL2FzeW5jLnV0aWwnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB7XG4gIFJlc3VsdCxcbiAgUmVzdWx0SW50ZW50LFxuICBSZXN1bHRFbnRpdHksXG4gIEZ1bGZpbGxSZXNwb25zZVJlc3BvbnNlLFxufSBmcm9tICcuLi91dGlscy90eXBlcy51dGlsJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuY29uc3QgZ2V0VXNlclVSTCA9ICdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMucHJvZmlsZS5nZXQnO1xuY29uc3QgcG9zdE1zZ1VSTCA9ICdodHRwczovL3NsYWNrLmNvbS9hcGkvY2hhdC5wb3N0TWVzc2FnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBpZiAoXG4gICAgcmVxLmJvZHkuZXZlbnQgJiZcbiAgICByZXEuYm9keS5ldmVudC50eXBlID09PSAnbWVzc2FnZScgJiZcbiAgICAhcmVxLmJvZHkuZXZlbnQuYm90X2lkICYmXG4gICAgcmVxLmJvZHkudG9rZW4gPT09ICdodktlVnhRY3lYSjBEc25qR0xmUzYxN0MnXG4gICkge1xuICAgIGNvbnN0IG1zZyA9IHJlcS5ib2R5LmV2ZW50LnRleHQ7XG4gICAgY29uc3QgZnJvbSA9IGF3YWl0IGdldEVtYWlsKHJlcS5ib2R5LmV2ZW50LnVzZXIpO1xuICAgIGNvbnN0IHRvID0gcmVxLmJvZHkudGVhbV9pZDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZW1lc3NhZ2UobXNnLCBmcm9tLCB0bywgJ2x1aXMnLCAnc2xhY2snKTtcbiAgICBhd2FpdCBzZW5kU2xhY2tSZXNwb25zZShyZXNwb25zZSwgcmVxLmJvZHkuZXZlbnQuY2hhbm5lbCk7XG4gIH1cbiAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJyB9KTtcbiAgcmVzLmVuZChyZXEuYm9keS5jaGFsbGVuZ2UpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXZlbnRzKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShyZXEuYm9keS5wYXlsb2FkKTtcbiAgaWYgKHBheWxvYWQudG9rZW4gPT09ICdodktlVnhRY3lYSjBEc25qR0xmUzYxN0MnKSB7XG4gICAgY29uc3QgdG8gPSBwYXlsb2FkLnRlYW0uaWQ7XG4gICAgY29uc3QgZnJvbSA9IGF3YWl0IGdldEVtYWlsKHBheWxvYWQudXNlci5pZCk7XG4gICAgY29uc3QgaW50ZW50czogUmVzdWx0SW50ZW50W10gPSBbXTtcbiAgICBjb25zdCBlbnRpdGllczogUmVzdWx0RW50aXR5W10gPSBbXTtcbiAgICBwYXlsb2FkLmFjdGlvbnMuZm9yRWFjaCgoYTogYW55KSA9PiB7XG4gICAgICBpbnRlbnRzLnB1c2goe1xuICAgICAgICBjb25maWRlbmNlOiAwLjEsXG4gICAgICAgIG5hbWU6IGEuYWN0aW9uX2lkLnNwbGl0KCcgJylbMF0sXG4gICAgICB9KTtcbiAgICAgIGVudGl0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBhLmFjdGlvbl9pZC5zcGxpdCgnICcpWzFdLFxuICAgICAgICB2YWx1ZTogYS5zZWxlY3RlZF9vcHRpb24udmFsdWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQ6IFJlc3VsdCA9IHtcbiAgICAgIGludGVudHMsXG4gICAgICBlbnRpdGllcyxcbiAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdGV4dDogJycsXG4gICAgICB9LFxuICAgICAgcXVlcnk6ICcnLFxuICAgIH07XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVNc2dXaXRob3V0U2VydmljZShcbiAgICAgICcnLFxuICAgICAgZnJvbSxcbiAgICAgIHRvLFxuICAgICAgJ3NsYWNrJyxcbiAgICAgIHJlc3VsdCxcbiAgICApO1xuICAgIGF3YWl0IHNlbmRTbGFja1Jlc3BvbnNlKHJlc3BvbnNlLCBwYXlsb2FkLmNoYW5uZWwuaWQpO1xuICB9XG4gIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbicgfSk7XG4gIHJlcy5lbmQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RW1haWwodXNlcjogc3RyaW5nKSB7XG4gIGNvbnN0IGdldE9wdCA9IHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVyaTogYCR7Z2V0VXNlclVSTH0/dG9rZW49JHtjb25maWcuU0xBQ0suYXBpVG9rZW59JnVzZXI9JHt1c2VyfWAsXG4gICAganNvbjogdHJ1ZSxcbiAgfTtcbiAgY29uc3QgcmVzID0gYXdhaXQgZXhlY3JlcXVlc3QoZ2V0T3B0KTtcbiAgaWYgKHJlcy5ib2R5ICYmIHJlcy5ib2R5LnByb2ZpbGUgJiYgcmVzLmJvZHkucHJvZmlsZS5lbWFpbCkge1xuICAgIHJldHVybiByZXMuYm9keS5wcm9maWxlLmVtYWlsO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZW5kTWVzc2FnZShtc2c6IGFueSkge1xuICBjb25zdCBwb3N0T3B0ID0ge1xuICAgIHVyaTogYCR7cG9zdE1zZ1VSTH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkobXNnKX1gLFxuICAgIG1ldGhvZDogJ0dFVCcsXG4gIH07XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHBvc3RPcHQpO1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZW5kU2xhY2tSZXNwb25zZShcbiAgcmVzcG9uc2VzOiBGdWxmaWxsUmVzcG9uc2VSZXNwb25zZVtdIHwgbnVsbCxcbiAgY2hhbm5lbDogc3RyaW5nLFxuKSB7XG4gIGlmIChyZXNwb25zZXMpIHtcbiAgICByZXNwb25zZXMucmVkdWNlKGFzeW5jIChwcmV2aW91cywgcmVzcG9uc2UpID0+IHtcbiAgICAgIGF3YWl0IHByZXZpb3VzO1xuICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT09ICdkcm9wZG93bicpIHtcbiAgICAgICAgY29uc3Qgb3B0OiBhbnlbXSA9IFtdO1xuICAgICAgICByZXNwb25zZS5wYXJhbXMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICAgICAgb3B0LnB1c2goe1xuICAgICAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgICB0eXBlOiAncGxhaW5fdGV4dCcsXG4gICAgICAgICAgICAgIHRleHQ6IGUudGV4dCxcbiAgICAgICAgICAgICAgZW1vamk6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsdWU6IGUudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXN1ID0ge1xuICAgICAgICAgIGNoYW5uZWwsXG4gICAgICAgICAgdG9rZW46IGNvbmZpZy5TTEFDSy5hcGlUb2tlbixcbiAgICAgICAgICBibG9ja3M6IEpTT04uc3RyaW5naWZ5KFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3NlY3Rpb24nLFxuICAgICAgICAgICAgICBibG9ja19pZDogJ2Jsb2NrMScsXG4gICAgICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbXJrZHduJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS50ZXh0LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhY2Nlc3Nvcnk6IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25faWQ6IHJlc3BvbnNlLnZhbHVlLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzdGF0aWNfc2VsZWN0JyxcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcjoge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ3BsYWluX3RleHQnLFxuICAgICAgICAgICAgICAgICAgdGV4dDogJ1PDqWxlY3Rpb25uZXogdW4gaXRlbScsXG4gICAgICAgICAgICAgICAgICBlbW9qaTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IG9wdCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSksXG4gICAgICAgIH07XG4gICAgICAgIGF3YWl0IHNlbmRNZXNzYWdlKHJlc3UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgIGNoYW5uZWwsXG4gICAgICAgICAgdGV4dDogcmVzcG9uc2UudGV4dCxcbiAgICAgICAgICB0b2tlbjogY29uZmlnLlNMQUNLLmFwaVRva2VuLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCBQcm9taXNlLnJlc29sdmUoKSk7XG4gIH1cbn1cbiIsIi8vIEBmbG93XG5cbmltcG9ydCB7IFNlcXVlbGl6ZSwgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgdCBmcm9tICcuLi91dGlscy90cmFuc2xhdGUudXRpbCc7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbi8qY29uc3QgZWNsID0gbmV3IFNlcXVlbGl6ZShcbiAgJ215c3FsOi8vY2x0MTMyOS1kZXY6RWFzeWxpZmUyMDEwQDE5NS4yMDAuNzguMjUyL2NsdDEzMjlfZGV2Jyxcbik7Ki9cbmNvbnN0IGVjbCA9IG5ldyBTZXF1ZWxpemUoXG4gIGNvbmZpZy5EQi5kYXRhYmFzZSxcbiAgY29uZmlnLkRCLnVzZXJuYW1lLFxuICBjb25maWcuREIucGFzc3dvcmQsXG4gIHtcbiAgICAuLi5jb25maWcuREIsXG4gICAgZGlhbGVjdDogJ215c3FsJyxcbiAgICBkaWFsZWN0T3B0aW9uczoge1xuICAgICAgY2hhcnNldDogJ2xhdGluMScsXG4gICAgICBlbmNyeXB0OiBmYWxzZSxcbiAgICB9LFxuICAgIGxvZ2dpbmc6IGlzRGV2LFxuICB9LFxuKTtcblxuZXhwb3J0IGludGVyZmFjZSBTaXRlIHtcbiAgaWQ6IHN0cmluZztcbiAgY29kZTogc3RyaW5nO1xuICBsaWJlbGxlOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHRlbGVwaG9uZTogc3RyaW5nO1xuICBib3ROdW1iZXI6IHN0cmluZztcbiAgaG9yYWlyZXM6IHN0cmluZztcbiAgaW5mb3M6IHN0cmluZztcbiAgZ3VpZGVTZXJ2aWNlczogc3RyaW5nO1xuICByZWxhaXNDb2xpczogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpdGVHcm91cCB7XG4gIGlkOiBzdHJpbmc7XG4gIG5vbTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbmNpZXJnZSB7XG4gIHByZW5vbTogc3RyaW5nO1xuICBub206IHN0cmluZztcbiAgdHJpZ3JhbW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXNlciB7XG4gIGlkOiBzdHJpbmc7XG4gIG5vbTogc3RyaW5nO1xuICBwcmVub206IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgdGVsZXBob25lOiBzdHJpbmc7XG59XG5cbnR5cGUgUmVxdWVzdFR5cGUgPSAnU01TJyB8ICdjYXNpZXInO1xuXG5pbnRlcmZhY2UgUmVxdWVzdCB7XG4gIHRleHQ6IHN0cmluZztcbiAgdHlwZTogUmVxdWVzdFR5cGU7XG4gIG51bUxvY2tlcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWNsIHtcbiAgc3RhdGljIGdldFByZW5vbUNvbmNpZXJnZShcbiAgICBjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgZm9yVXNlcjogYm9vbGVhbiA9IHRydWUsXG4gICkge1xuICAgIGlmICghY29uY2llcmdlcyB8fCAhY29uY2llcmdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmb3JVc2VyID8gdCgnaW5mb3MuY29uY2llcmdlJykgOiAnJztcbiAgICB9XG4gICAgaWYgKGNvbmNpZXJnZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gY29uY2llcmdlc1swXS5wcmVub207XG4gICAgfVxuICAgIGlmIChjb25jaWVyZ2VzLmxlbmd0aCA9PT0gMilcbiAgICAgIHJldHVybiBgJHtjb25jaWVyZ2VzWzBdLnByZW5vbX0gZXQgJHtjb25jaWVyZ2VzWzFdLnByZW5vbX1gO1xuICAgIHJldHVybiBmb3JVc2VyID8gdCgnaW5mb3MuY29uY2llcmdlcycpIDogJyc7XG4gIH1cblxuICBzdGF0aWMgaXNNdWx0aXBsZUNvbmNpZXJnZXMoY29uY2llcmdlczogQ29uY2llcmdlW10gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGNvbmNpZXJnZXMgJiYgY29uY2llcmdlcy5sZW5ndGggPiAxO1xuICB9XG5cbiAgc3RhdGljIGdldFRyaWdyYW1tZUNvbmNpZXJnZShjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoIWNvbmNpZXJnZXMgfHwgIWNvbmNpZXJnZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY29uY2llcmdlc1swXS50cmlncmFtbWU7XG4gIH1cbiAgZWNsOiBTZXF1ZWxpemU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lY2wgPSBlY2w7XG4gIH1cblxuICBhc3luYyBnZXRTaXRlSW5mb3Moc2VydmljZTogc3RyaW5nLCBzZXJ2aWNlSWQ6IHN0cmluZykge1xuICAgIGxldCBzZXJ2aWNlQ29sdW1uO1xuICAgIC8vIENhcyBkZSBsYSBjb25zb2xlLiBPbiBmYWl0IHVuIHJlbXBsYWNlbWVudCBkZSB2YWxldXIgcG91ciBhbGxlciBjaGVyY2hlciB1biBjb2RlIHNpdGVcbiAgICBpZiAoc2VydmljZSA9PT0gJ2NvbnNvbGUnKSBzZXJ2aWNlQ29sdW1uID0gJ2NvcnJlc3BfMDQnO1xuICAgIGVsc2Ugc2VydmljZUNvbHVtbiA9IHNlcnZpY2U7XG4gICAgY29uc3Qgc2l0ZXM6IFNpdGVbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgaWRfcmVfMDNgIEFTIGBpZGAgLCBgY29ycmVzcF8wNGAgQVMgYGNvZGVgICwgYGNsX2xiXzAxYCBBUyBgbGliZWxsZWAgLCBgY2xfcmVfMDFfdWAgQVMgYGVtYWlsYCwgYHNpdGVfdGVsZXBob25lYCBBUyBgdGVsZXBob25lYCwgYHNpdGVfaG9yYWlyZXNgIEFTIGBob3JhaXJlc2AsIGBib3RJbmZvYCBBUyBgaW5mb3NgLCBgYm90TnVtYmVyYCBGUk9NIGBjbGllbnRgICcgK1xuICAgICAgICBgV0hFUkUgJHtzZXJ2aWNlQ29sdW1ufSA9IDpzZXJ2aWNlSWQgTElNSVQgMWAsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7IHNlcnZpY2VJZCB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIGlmIChzaXRlcyAmJiBzaXRlcy5sZW5ndGgpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zaXRlc1swXSxcbiAgICAgICAgZ3VpZGVTZXJ2aWNlczogYGh0dHA6Ly9lY2wuZWFzeS1saWZlLmZyL2dkcy8ke3NpdGVzWzBdLmNvZGV9LnBkZmAsXG4gICAgICAgIHJlbGFpc0NvbGlzOiBgaHR0cDovL2VjbC5lYXN5LWxpZmUuZnIvZ2RzLyR7c2l0ZXNbMF0uY29kZX1fUkMucGRmYCxcbiAgICAgIH07XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgfVxuXG4gIGFzeW5jIGdldFNpdGVHcm91cHMoc2l0ZUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBncm91cHM6IFNpdGVHcm91cFtdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIGBjb3JyZXNwXzAxYCBhcyBpZCwgYGNvcnJlc3BfMDJgIGFzIG5vbSBGUk9NIGBjb3JyZXNwb25kYW5jZV9jbGllbnRgIFdIRVJFIGBpZF9yZV8wM2A9OnNpdGVJZCcsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7IHNpdGVJZCB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIHJldHVybiBncm91cHM7XG4gIH1cblxuICBhc3luYyBnZXRDb25jaWVyZ2VMaXN0KHNpdGVDb2RlOiBzdHJpbmcpOiBQcm9taXNlPENvbmNpZXJnZVtdPiB7XG4gICAgLy8gJ0xFRlQgSk9JTiBgY2xpZW50YCBPTiBgY2xpZW50YC5gaWRfcmVfMDNgPWBjb29yZGAuYGlkX3JlXzAzRktgICcgK1xuICAgIC8vICdXSEVSRSBgY2xpZW50YC5gY29ycmVzcF8wNGA9OnNpdGVDb2RlIGFuZCBgY29vcmRgLmBjb19nZV8wM2A9MCcsXG4gICAgY29uc3QgY29uY2llcmdlczogQ29uY2llcmdlW10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGNvb3JkYC5gY29fcmVfMDNfdWAgYXMgcHJlbm9tLCBgY29vcmRgLmBjb19yZV8wMl91YCBhcyBub20sIGBjb29yZGAuYGNvX3JlXzAxYCBhcyB0cmlncmFtbWUgJyArXG4gICAgICAgICdGUk9NIGBjb29yZGluYXRldXJgIGFzIGBjb29yZGAgJyArXG4gICAgICAgICdMRUZUIEpPSU4gYGNsaWVudGAgT04gYGNsaWVudGAuYGNvX3JlXzAxYD1gY29vcmRgLmBjb19yZV8wMWAgJyArXG4gICAgICAgIFwiQU5EIChgY2xpZW50YC5gY2xfcmVfMDNgID0gJzAwMDAtMDAtMDAnIE9SIGBjbGllbnRgLmBjbF9yZV8wM2AgSVMgTlVMTCkgXCIgK1xuICAgICAgICAnV0hFUkUgYGNsaWVudGAuYGNvcnJlc3BfMDRgPTpzaXRlQ29kZScsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7IHNpdGVDb2RlIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgcmV0dXJuIGNvbmNpZXJnZXM7XG4gIH1cblxuICBhc3luYyBnZXRVc2VyKFxuICAgIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIHNpdGU6IFNpdGUsXG4gICk6IFByb21pc2U8VXNlciB8IG51bGw+IHtcbiAgICBsZXQgd2hlcmU7XG4gICAgc3dpdGNoIChpZGVudGlmaWVyKSB7XG4gICAgICBjYXNlICd1c2VySWQnOlxuICAgICAgICB3aGVyZSA9ICdgdXRpbGlzYXRldXJgLmBpZF9yZV8wNGA9OnZhbHVlJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb2JpbGUnOlxuICAgICAgICB3aGVyZSA9ICdgdXRpbGlzYXRldXJgLmBpZF9jb18wNl91YD06dmFsdWUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgd2hlcmUgPSAnbG93ZXIoYHV0aWxpc2F0ZXVyYC5gaWRfcmVfMDFfdWApID0gbG93ZXIoOnZhbHVlKSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyczogVXNlcltdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIGBpZF9yZV8wMV91YCBBUyBgZW1haWxgICwgYGlkX3JlXzA2X3VgIEFTIGBub21gICwgYGlkX3JlXzA3X3VgIEFTIGBwcmVub21gICwgJyArXG4gICAgICAgICdgaWRfY29fMDZfdWAgQVMgYHRlbGVwaG9uZWAsIGBpZF9yZV8wNGAgQVMgYGlkYCAnICtcbiAgICAgICAgJ0ZST00gYHV0aWxpc2F0ZXVyYCAnICtcbiAgICAgICAgJ0pPSU4gYGNsaWVudGAgT04gYHV0aWxpc2F0ZXVyYC5gaWRfcmVfMDNgID0gYGNsaWVudGAuYGlkX3JlXzAzYCAnICtcbiAgICAgICAgJ1dIRVJFIGBjbGllbnRgLmBjb3JyZXNwXzA0YD06c2l0ZUNvZGUgJyArXG4gICAgICAgIGAke3doZXJlID8gYEFORCAke3doZXJlfWAgOiAnJ307YCxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgdmFsdWUsIHNpdGVDb2RlOiBzaXRlLmNvZGUgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIGlmICh1c2VycyAmJiB1c2Vycy5sZW5ndGggPT09IDEpIHJldHVybiB1c2Vyc1swXTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdXNlciByZWdpc3RyYXRpb25cbiAgICogQHJldHVybiB0b2tlbiB0byBiZSB1c2VkIGluIHVzZXIgbWFpbCB2YWxpZGF0aW9uXG4gICAqIEBwYXJhbSB7Kn0gc2l0ZVxuICAgKiBAcGFyYW0geyp9IHVzZXJJZFxuICAgKiBAcGFyYW0geyp9IGVtYWlsXG4gICAqIEBwYXJhbSB7Kn0gbGFzdE5hbWVcbiAgICogQHBhcmFtIHsqfSBnaXZlbk5hbWVcbiAgICogQHBhcmFtIHsqfSBzaXRlR3JvdXBcbiAgICovXG4gIGFzeW5jIHNhdmVSZWdpc3RyYXRpb24oXG4gICAgc2l0ZTogU2l0ZSxcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIGxhc3ROYW1lOiBzdHJpbmcsXG4gICAgZ2l2ZW5OYW1lOiBzdHJpbmcsXG4gICAgc2l0ZUdyb3VwOiBTaXRlR3JvdXAgfCBudWxsIHwgdW5kZWZpbmVkLFxuICApIHtcbiAgICAvLyBHZXQgbmVlZGVkIHNpdGUgaW5mb1xuICAgIGNvbnN0IHNpdGVzSW5mbzogYW55W10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGlkX3JlXzAzYCBhcyBpZCwgYGZpX2RlXzAzYCBhcyBgY2F0ZWdvcnlgLCBgZmlfZGVfMDRgIGFzIGBncm91cGAgRlJPTSBgZm9ybV9pbnNjcmlwdGlvbmAgV0hFUkUgYGlkX3JlXzAzYD06c2l0ZUlkJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2l0ZUlkOiBzaXRlLmlkIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKCFzaXRlc0luZm8ubGVuZ3RoICYmICFzaXRlc0luZm8pXG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgYENhbm5vdCBzYXZlIHJlZ2lzdHJhdGlvbjogdW5hYmxlIHRvIGZpbmQgc2l0ZSBpbmZvIGZvciAnJHtzaXRlLmlkfSdgLFxuICAgICAgKTtcblxuICAgIGNvbnN0IHNpdGVJbmZvID0gc2l0ZXNJbmZvWzBdO1xuICAgIC8vIEdlbmVyYXRlIGEgdG9rZW4gZm9yIHVzZXIgbWFpbCB2YWxpZGF0aW9uXG4gICAgY29uc3QgdG9rZW4gPSB1dWlkLnY0KCk7XG4gICAgLy8gSW5zZXJ0IHJlZ2lzdHJhdGlvbiBpbiBkYXRhYmFzZVxuICAgIGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ0lOU0VSVCBJTlRPIGBmb3JtX2luc2NyaXB0aW9uX3V0aWxgKGBpZF9yZV8wM2AsYGlkX3JlXzAxX3VgLGBpZF9yZV8wNl91YCxgaWRfcmVfMDdfdWAsYGlkX3JlXzA4YCxgaWRfY29fMDZfdWAsYGlkX2dlXzA0YCxgaXVfdG9fMDFgLGBpZF9yZV8xMGAsYGlkX2luXzAxYCxgaWRfaW5fMDJgLGBpZF9jb18wMl91YCkgJyArXG4gICAgICAgICdWQUxVRVMgKDpzaXRlSWQsOmVtYWlsLDpsYXN0TmFtZSw6Z2l2ZW5OYW1lLDpmdWxsTmFtZSw6bW9iaWxlLERBVEVfRk9STUFUKE5PVygpLCBcIiVZLSVtLSVkXCIpLDp0b2tlbiw6Y2xpZW50LDpjYXRlZ29yeSw6Z3JvdXAsOmNwKScsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLklOU0VSVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7XG4gICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgZW1haWwsXG4gICAgICAgICAgc2l0ZUlkOiBzaXRlLmlkLFxuICAgICAgICAgIGxhc3ROYW1lOiBsYXN0TmFtZS50cmltKCkudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICBnaXZlbk5hbWU6IGdpdmVuTmFtZS50cmltKCksXG4gICAgICAgICAgZnVsbE5hbWU6IGAke2xhc3ROYW1lLnRyaW0oKS50b1VwcGVyQ2FzZSgpfSAke2dpdmVuTmFtZS50cmltKCl9YCxcbiAgICAgICAgICBtb2JpbGU6IHVzZXJJZCxcbiAgICAgICAgICBjbGllbnQ6IHNpdGVHcm91cCA/IHNpdGVHcm91cC5ub20gOiBudWxsLFxuICAgICAgICAgIGNhdGVnb3J5OiBzaXRlSW5mby5jYXRlZ29yeSxcbiAgICAgICAgICBncm91cDogc2l0ZUluZm8uZ3JvdXAsXG4gICAgICAgICAgY3A6IGAke3NpdGUuY29kZS5zdWJzdHIoMCwgMil9MDAwYCwgLy8gVGFrZSB0aGUgZGVwYXJ0bWVudCBmcm9tIHNpdGUgY29kZSBhbmQgYWRkIHRocmVlIDBcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGFzeW5jIHNhdmVVc2VyTW9iaWxlKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5lY2wucXVlcnkoXG4gICAgICAnVVBEQVRFIGB1dGlsaXNhdGV1cmAgU0VUICcgK1xuICAgICAgICAnYGlkX2NvXzA2X3VgPTp0ZWxlcGhvbmUgJyArXG4gICAgICAgICdXSEVSRSBgaWRfcmVfMDRgPTppZCcsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlVQREFURSxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgdGVsZXBob25lOiB1c2VyLnRlbGVwaG9uZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVSZXF1ZXN0KFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgc2l0ZTogU2l0ZSxcbiAgICBjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSxcbiAgICB1c2VyOiBVc2VyLFxuICApIHtcbiAgICBsZXQgcmVxdWVzdE51bTogYW55W10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgQ09VTlQoYGRlX3JlXzA3X3VgKSBBUyBjb3VudCBGUk9NIGBkZW1hbmRlYCAnICtcbiAgICAgICAgXCJXSEVSRSBgZGVfcmVfMDFfdWA9OmRhdGUgQU5EIGBkZV9yZV8wNV91YDw+J2FiYW5kb25fcDEnXCIsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7IGRhdGU6IG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTS1ERCcpIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKCFyZXF1ZXN0TnVtIHx8ICFyZXF1ZXN0TnVtLmxlbmd0aClcbiAgICAgIHRocm93IEVycm9yKCdDYW5ub3Qgc2F2ZSByZXF1ZXN0OiB1bmFibGUgdG8gZmluZCBhIG5ldyByZXF1ZXN0IG51bWJlcicpO1xuICAgIHJlcXVlc3ROdW0gPSByZXF1ZXN0TnVtWzBdLmNvdW50ICsgMTtcblxuICAgIGxldCByZXF1ZXN0VHlwZTtcbiAgICBsZXQgcmVxdWVzdFR5cGUyO1xuICAgIGxldCB0eXBlQ29kZTtcbiAgICBsZXQgZGV0YWlsO1xuICAgIGxldCBhZGRpdGlvbjtcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xuICAgICAgY2FzZSAnY2FzaWVyJzpcbiAgICAgICAgcmVxdWVzdFR5cGUgPSAnRGVtYW5kZSBjYXNpZXInO1xuICAgICAgICByZXF1ZXN0VHlwZTIgPSByZXF1ZXN0LnR5cGU7XG4gICAgICAgIHR5cGVDb2RlID0gJ2Nhc2knO1xuICAgICAgICBkZXRhaWwgPSByZXF1ZXN0Lm51bUxvY2tlclxuICAgICAgICAgID8gYGNhc2llcjoke3JlcXVlc3QubnVtTG9ja2VyfSAke3JlcXVlc3QudGV4dH1gXG4gICAgICAgICAgOiByZXF1ZXN0LnRleHQ7XG4gICAgICAgIGFkZGl0aW9uID0gcmVxdWVzdC5udW1Mb2NrZXJcbiAgICAgICAgICA/IGBjYXNpZXI6JHtyZXF1ZXN0Lm51bUxvY2tlcn0gJHtyZXF1ZXN0LnRleHR9YFxuICAgICAgICAgIDogcmVxdWVzdC50ZXh0O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1NNUyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXF1ZXN0VHlwZSA9ICdBdXRyZSc7XG4gICAgICAgIHJlcXVlc3RUeXBlMiA9IHJlcXVlc3QudHlwZTtcbiAgICAgICAgdHlwZUNvZGUgPSAnc21zJztcbiAgICAgICAgZGV0YWlsID0gcmVxdWVzdC50ZXh0O1xuICAgICAgICBhZGRpdGlvbiA9IHJlcXVlc3QudGV4dDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdFJlZiA9IFtcbiAgICAgIHNpdGUuY29kZSxcbiAgICAgIG1vbWVudCgpLmZvcm1hdCgnRERNTVlZWVknKSxcbiAgICAgIHR5cGVDb2RlLFxuICAgICAgcmVxdWVzdE51bSxcbiAgICBdXG4gICAgICAuam9pbignXycpXG4gICAgICAucmVwbGFjZSgvXFxzL2csICdfJyk7XG5cbiAgICBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdJTlNFUlQgSU5UTyBgZGVtYW5kZWAoYGRlX3JlXzAzX3VgLCBgZGVfcmVfMDFfdWAsIGBkZV9yZV8wMl91YCwgYGRlX3JlXzA0X3VgLCAnICtcbiAgICAgICAgJ2BkZV9yZV8wNV91YCwgYGRlX3JlXzA2X3VgLCBgZGVfcmVfMDdfdWAsIGBkZV9yZV8wOF91YCwgYGRlX3JlXzA5X3VgLCAnICtcbiAgICAgICAgJ2BkZV9yZV8xMF91YCwgYGRlX3JlXzE0YCwgYGlkX3JlXzA0YCwgYGRlX2NhXzAxX3VgKSAnICtcbiAgICAgICAgXCJWQUxVRVMoOnJlcXVlc3RSZWYsIDpkYXRlLCA6dGltZSwgOnRyaWdyYW0sICdEZW1hbmRlIGVuIGNvdXJzIGRlIHRyYWl0ZW1lbnQnLCA6cmVxdWVzdFR5cGUsIDpyZXF1ZXN0VHlwZTIsIDpkZXRhaWwsIDphZGRpdGlvbiwgMSwgMCwgOnVzZXJJZCwgOm51bUxvY2tlcilcIixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuSU5TRVJULFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICByZXF1ZXN0VHlwZSxcbiAgICAgICAgICByZXF1ZXN0VHlwZTIsXG4gICAgICAgICAgZGV0YWlsLFxuICAgICAgICAgIGFkZGl0aW9uLFxuICAgICAgICAgIHJlcXVlc3RSZWYsXG4gICAgICAgICAgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyksXG4gICAgICAgICAgdGltZTogbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpLFxuICAgICAgICAgIHRyaWdyYW06IEVjbC5nZXRUcmlncmFtbWVDb25jaWVyZ2UoY29uY2llcmdlcyksXG4gICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxuICAgICAgICAgIG51bUxvY2tlcjogcmVxdWVzdC5udW1Mb2NrZXIgfHwgJycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG5cbiAgICByZXR1cm4gcmVxdWVzdFJlZjtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVJlcXVlc3QocmVxdWVzdFJlZjogc3RyaW5nLCByZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gICAgZnVuY3Rpb24gYWRkTnVtTG9ja2VyKGZpZWxkOiBhbnksIG51bUxvY2tlcjogYW55KSB7XG4gICAgICByZXR1cm4gYFxcYCR7ZmllbGR9XFxgPUNPTkNBVCgnY2FzaWVyOiR7bnVtTG9ja2VyIHx8ICcnfSAnLCBcXGAke2ZpZWxkfVxcYClgO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGREZXRhaWxzKGZpZWxkOiBhbnksIHBhcmFtTmFtZTogYW55KSB7XG4gICAgICByZXR1cm4gYFxcYCR7ZmllbGR9XFxgPUNPTkNBVChcXGAke2ZpZWxkfVxcYCwgJyAnLCAke3BhcmFtTmFtZX0pYDtcbiAgICB9XG4gICAgLy8gVXBkYXRlIG51bSBsb2NrZXIgaWYgYWRkZWQgaW4gcmVxdWVzdCBkZXRhaWxzXG4gICAgaWYgKHJlcXVlc3QubnVtTG9ja2VyKSB7XG4gICAgICBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICAgJ1VQREFURSBgZGVtYW5kZWAgU0VUICcgK1xuICAgICAgICAgIGAke2FkZE51bUxvY2tlcignZGVfcmVfMDhfdScsIHJlcXVlc3QubnVtTG9ja2VyKX0sIGAgK1xuICAgICAgICAgIGAke2FkZE51bUxvY2tlcignZGVfcmVfMDlfdScsIHJlcXVlc3QubnVtTG9ja2VyKX0sIGAgK1xuICAgICAgICAgIFwiYGRlX3JlXzA2X3VgPSdEZW1hbmRlIGNhc2llcicsIFwiICtcbiAgICAgICAgICBcImBkZV9yZV8wN191YD0nY2FzaWVyJywgXCIgK1xuICAgICAgICAgICdgZGVfY2FfMDFfdWA9Om51bUxvY2tlciAnICtcbiAgICAgICAgICAnV0hFUkUgYGRlX3JlXzAzX3VgPTpyZXF1ZXN0UmVmJyxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlVQREFURSxcbiAgICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICAgIHJlcXVlc3RSZWYsXG4gICAgICAgICAgICBudW1Mb2NrZXI6IHJlcXVlc3QubnVtTG9ja2VyLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBBZGQgcmVxdWVzdCBkZXRhaWxzXG4gICAgcmV0dXJuIHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1VQREFURSBgZGVtYW5kZWAgU0VUICcgK1xuICAgICAgICBgJHthZGREZXRhaWxzKCdkZV9yZV8wOF91JywgJzpkZXRhaWxzJyl9LCBgICtcbiAgICAgICAgYCR7YWRkRGV0YWlscygnZGVfcmVfMDlfdScsICc6ZGV0YWlscycpfSBgICtcbiAgICAgICAgJ1dIRVJFIGBkZV9yZV8wM191YD06cmVxdWVzdFJlZicsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlVQREFURSxcbiAgICAgICAgcmVwbGFjZW1lbnRzOiB7XG4gICAgICAgICAgcmVxdWVzdFJlZixcbiAgICAgICAgICBkZXRhaWxzOiByZXF1ZXN0LnRleHQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBhc3luYyBnZXRTaXRlVXNlcnMoc2l0ZXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3Qgd2hlcmVJbiA9IGAnJHtzaXRlcy5qb2luKFwiJywnXCIpfSdgO1xuXG4gICAgcmV0dXJuIHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBESVNUSU5DVCAodS5gaWRfY29fMDZfdWApIEFTIHRlbCwgYy50d2lsaW8gQVMgdHdpbGlvICcgK1xuICAgICAgICAnRlJPTSBgdXRpbGlzYXRldXJgIEFTIHUgJyArXG4gICAgICAgICdJTk5FUiBKT0lOIGBjbGllbnRgIEFTIGMgT04gYy5gaWRfcmVfMDNgID0gdS5gaWRfcmVfMDNgICcgK1xuICAgICAgICAnV0hFUkUgdS5gaWRfcmVfMDNgIElOICcgK1xuICAgICAgICBgKCR7d2hlcmVJbn0pIGAgK1xuICAgICAgICBcIkFORCB1LmBpZF9jb18wNl91YCAhPSAnJyBcIiArXG4gICAgICAgICdBTkQgdS5gaWRfY29fMDZfdWAgSVMgTk9UIE5VTEwgJyArXG4gICAgICAgIFwiQU5EICh1LmBpZF9nZV8wMmAgPSAnMDAwMC0wMC0wMCcgT1IgdS5gaWRfZ2VfMDJgIElTIE5VTEwpO1wiLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFRlc3RDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzJztcbmltcG9ydCBTZW5kTWVzc2FnZUNvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvYWpheC5jb250cm9sbGVyJztcbmltcG9ydCBTbGFja0NvbnRyb2xsZXIsIHsgZXZlbnRzIH0gZnJvbSAnLi4vY29udHJvbGxlcnMvc2xhY2suY29udHJvbGxlcic7XG5pbXBvcnQgYm9keXBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5jb25zdCByb3V0ZXMgPSBleHByZXNzLlJvdXRlcigpO1xuY29uc3QgdXJsZW5jb2RlZFBhcnNlciA9IGJvZHlwYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KTtcblxucm91dGVzLmFsbCgnLycsIFRlc3RDb250cm9sbGVyKTtcbnJvdXRlcy5nZXQoJy9hamF4L3NlbmRtZXNzYWdlJywgU2VuZE1lc3NhZ2VDb250cm9sbGVyKTtcbnJvdXRlcy5wb3N0KCcvc2xhY2snLCBTbGFja0NvbnRyb2xsZXIpO1xucm91dGVzLnBvc3QoJy9zbGFja2V2ZW50cycsIHVybGVuY29kZWRQYXJzZXIsIGV2ZW50cyk7XG5leHBvcnQgZGVmYXVsdCByb3V0ZXM7XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBUZXN0Um91dGVzIGZyb20gJy4vcm91dGVzJztcbmltcG9ydCBib2R5UGFyc2VyIGZyb20gJ2JvZHktcGFyc2VyJztcblxuaW1wb3J0ICcuL21vZGVscy9lY2wnO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcbmFwcC51c2UoJy8nLCBUZXN0Um91dGVzKTtcblxuYXBwLmxpc3Rlbig4MDgwKTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwiaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5cbmV4cG9ydCBjb25zdCBleGVjcmVxdWVzdDogYW55ID0gYXN5bmMgKHJlcTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdChyZXEsIChlcnI6IGFueSwgcmVzOiBhbnksIGJvZHk6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoeyByZXMsIGJvZHkgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbiIsImltcG9ydCBEYXRhc3RvcmUgZnJvbSAnbmVkYic7XG5pbXBvcnQgeyBDb250ZXh0cyB9IGZyb20gJy4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbmNvbnN0IGRiID0gbmV3IERhdGFzdG9yZSh7IGZpbGVuYW1lOiAnREIvY29udGV4dHMnLCBhdXRvbG9hZDogdHJ1ZSB9KTtcblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlT2xkKCkge1xuICBjb25zdCB0dGwgPSBEYXRlLm5vdygpIC0gY29uZmlnLk5FREIudHRsICogODY0MDAwMDA7XG4gIGF3YWl0IGRiLnJlbW92ZSh7IGNyZWF0ZVRpbWU6IHsgJGx0OiB0dGwgfSB9LCB7IG11bHRpOiB0cnVlIH0pO1xufVxuXG5jb25zdCBjb3VudDogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi5jb3VudChxdWVyeSwgKGVycjogYW55LCBuYjogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShuYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgaW5zZXJ0OiBhbnkgPSBhc3luYyAocXVlcnk6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiLmluc2VydChxdWVyeSwgKGVycjogYW55LCBuZXdEb2M6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobmV3RG9jKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGU6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIudXBkYXRlKFxuICAgICAgeyB1c2VyOiBxdWVyeS51c2VyIH0sXG4gICAgICB7ICRzZXQ6IHsgY29udGV4dHM6IHF1ZXJ5LmNvbnRleHRzIH0gfSxcbiAgICAgIHt9LFxuICAgICAgKGVycjogYW55LCBudW1SZXBsYWNlZDogYW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKG51bVJlcGxhY2VkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9KTtcbn07XG5cbmNvbnN0IGZpbmRvbmU6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIuZmluZE9uZShxdWVyeSwgKGVycjogYW55LCBkb2M6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZG9jKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBzYXZlKHVzZXI6IHN0cmluZywgYzogQ29udGV4dHMpIHtcbiAgYXdhaXQgZGVsZXRlT2xkKCk7XG4gIGlmICh1c2VyKSB7XG4gICAgY29uc3QgbmIgPSBhd2FpdCBmaW5kb25lKHsgdXNlciB9KTtcbiAgICBjb25zdCBjb250ZXh0cyA9IHtcbiAgICAgIGZ1bGZpbGw6IGMuZnVsZmlsbCxcbiAgICAgIHNlcnZpY2U6IGMuc2VydmljZSxcbiAgICB9O1xuICAgIGlmICghbmIpIHtcbiAgICAgIC8vIEluc2VydGluZyBjb250ZXh0XG4gICAgICBhd2FpdCBpbnNlcnQoeyB1c2VyLCBjb250ZXh0cywgY3JlYXRlVGltZTogRGF0ZS5ub3coKSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXBkYXRpbmcgY29udGV4dFxuICAgICAgYXdhaXQgdXBkYXRlKHsgdXNlciwgY29udGV4dHMgfSk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWQodXNlcjogc3RyaW5nKTogUHJvbWlzZTxDb250ZXh0cz4ge1xuICBhd2FpdCBkZWxldGVPbGQoKTtcbiAgaWYgKHVzZXIpIHtcbiAgICBjb25zdCBjb250ZXh0cyA9IGF3YWl0IGZpbmRvbmUoeyB1c2VyIH0pO1xuICAgIGlmIChjb250ZXh0cykge1xuICAgICAgY29udGV4dHMuY29udGV4dHMuc2l0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gY29udGV4dHMuY29udGV4dHM7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgZnVsZmlsbDoge1xuICAgICAgY3R4OiBbXSxcbiAgICAgIGxhc3RuYW1lOiAnJyxcbiAgICAgIGZpcnN0bmFtZTogJycsXG4gICAgICBlbWFpbDogJycsXG4gICAgICBzaXRlR3JvdXA6IG51bGwsXG4gICAgICB1c2VySWQ6ICcnLFxuICAgIH0sXG4gICAgc2VydmljZToge1xuICAgICAgd2F0c29uOiBudWxsLFxuICAgIH0sXG4gICAgc2l0ZTogbnVsbCxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzYXZlLFxuICBsb2FkLFxufTtcbiIsImltcG9ydCB7IFJlc3VsdCwgQ29udGV4dHMsIEludGVudCwgRnVsZmlsbFJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcy51dGlsJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCAnLi4vY29uZmlnL2kxOG4nO1xuaW1wb3J0IGludGVudFJlZ2lzdGVyIGZyb20gJy4vZnVsZmlsbC9yZWdpc3Rlci5pbnRlbnQnO1xuaW1wb3J0IGludGVudERlZmF1bHQgZnJvbSAnLi9mdWxmaWxsL2RlZmF1bHQuaW50ZW50JztcbmltcG9ydCBpbnRlbnRJbmZvcyBmcm9tICcuL2Z1bGZpbGwvaW5mb3MuaW50ZW50JztcblxuZnVuY3Rpb24gY2xvbmUoc3JjOiBhbnkpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3JjKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXN1bHQ6IFJlc3VsdCxcbiAgY29udGV4dHM6IENvbnRleHRzLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgLy8gUmV0dXJuICdub3QgdW5kZXJzdGFuZCcgd2hlbiBubyBpbnRlbnRzXG4gIGlmIChyZXN1bHQuaW50ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gYXdhaXQgaW50ZW50RGVmYXVsdC5mYWxsYmFjayhudWxsLCBjb250ZXh0cywgMCwgcmVzdWx0LnF1ZXJ5LCB0eXBlcyk7XG4gIH1cbiAgLy8gR2V0IGFsbCBrbm93biBpbnRlbnRzXG4gIGNvbnN0IGludGVudHM6IEludGVudFtdID0gZ2V0Q29uZmlnKCk7XG4gIGNvbnN0IGludGVudE1hcCA9IG5ldyBNYXAoKTtcbiAgaW50ZW50cy5mb3JFYWNoKGludGVudCA9PiB7XG4gICAgaW50ZW50TWFwLnNldChpbnRlbnQubmFtZSwgaW50ZW50LmZ1bmMpO1xuICB9KTtcbiAgY29uc3QgaW50ZW50c1JlczogRnVsZmlsbFJlc3BvbnNlW10gPSBbXTtcbiAgLy8gQ2hlY2sgYWxsIGludGVudHNcbiAgYXdhaXQgcmVzdWx0LmludGVudHMucmVkdWNlKGFzeW5jIChwcmV2aW91cywgZSkgPT4ge1xuICAgIGF3YWl0IHByZXZpb3VzO1xuICAgIGxldCByZXM6IEZ1bGZpbGxSZXNwb25zZTtcbiAgICBpZiAoIWludGVudE1hcC5oYXMoZS5uYW1lKSkge1xuICAgICAgaWYgKHJlc3VsdC5yZXNwb25zZSkge1xuICAgICAgICByZXMgPSB7XG4gICAgICAgICAgY29udGV4dHMsXG4gICAgICAgICAgcmVzcG9uc2U6IFt7IHRleHQ6IHJlc3VsdC5yZXNwb25zZS50ZXh0LCB0eXBlOiAndGV4dCcgfV0sXG4gICAgICAgICAgY29uZmlkZW5jZTogMC4wMSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJlcyA9IGF3YWl0IGludGVudERlZmF1bHQuZmFsbGJhY2soXG4gICAgICAgIG51bGwsXG4gICAgICAgIGNvbnRleHRzLFxuICAgICAgICAwLFxuICAgICAgICByZXN1bHQucXVlcnksXG4gICAgICAgIHR5cGVzLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYzogQ29udGV4dHMgPSBjbG9uZShjb250ZXh0cyk7XG4gICAgICByZXMgPSBhd2FpdCBpbnRlbnRNYXAuZ2V0KGUubmFtZSkoXG4gICAgICAgIHJlc3VsdC5lbnRpdGllcyxcbiAgICAgICAgYyxcbiAgICAgICAgZS5jb25maWRlbmNlLFxuICAgICAgICByZXN1bHQucXVlcnksXG4gICAgICAgIHR5cGVzLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHJlcykge1xuICAgICAgaW50ZW50c1Jlcy5wdXNoKHJlcyk7XG4gICAgfVxuICB9LCBQcm9taXNlLnJlc29sdmUoKSk7XG4gIGxldCByZXNwb25zZSA9IGludGVudHNSZXNbMF07XG4gIC8vIEdldCB0aGUgbW9zdCBwcm9iYWJsZSBvbmVcbiAgaW50ZW50c1Jlcy5mb3JFYWNoKGUgPT4ge1xuICAgIGlmIChlICYmIHJlc3BvbnNlLmNvbmZpZGVuY2UgPCBlLmNvbmZpZGVuY2UpIHtcbiAgICAgIHJlc3BvbnNlID0gZTtcbiAgICB9XG4gIH0pO1xuICAvLyBSZXR1cm4gaXRcbiAgcmV0dXJuIHJlc3BvbnNlO1xufVxuXG5mdW5jdGlvbiBnZXRDb25maWcoKSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMucmVnaXN0ZXIsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3RlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVybWFpbCxcbiAgICAgIGZ1bmM6IGludGVudFJlZ2lzdGVyLnJlZ2lzdGVyTWFpbCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVybmFtZSxcbiAgICAgIGZ1bmM6IGludGVudFJlZ2lzdGVyLnJlZ2lzdGVyTmFtZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVyY29kZSxcbiAgICAgIGZ1bmM6IGludGVudFJlZ2lzdGVyLnJlZ2lzdGVyQ29kZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLm9wZW5pbmd0aW1lLFxuICAgICAgZnVuYzogaW50ZW50SW5mb3Mub3BlbnRpbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5jb250YWN0LFxuICAgICAgZnVuYzogaW50ZW50SW5mb3MuY29udGFjdCxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnNlcnZpY2VzLFxuICAgICAgZnVuYzogaW50ZW50SW5mb3Muc2VydmljZXMsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWxhaXNjb2xpcyxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLnJlbGFpc2NvbGlzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMuZmFsbGJhY2ssXG4gICAgICBmdW5jOiBpbnRlbnREZWZhdWx0LmZhbGxiYWNrLFxuICAgIH0sXG4gIF07XG59XG4iLCJpbXBvcnQgdCBmcm9tICcuLi90cmFuc2xhdGUudXRpbCc7XG5pbXBvcnQgeyBSZXN1bHRFbnRpdHksIENvbnRleHRzLCBGdWxmaWxsUmVzcG9uc2UgfSBmcm9tICcuLi90eXBlcy51dGlsJztcblxuYXN5bmMgZnVuY3Rpb24gZmFsbGJhY2soXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSB8IG51bGwsXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IHQoJ2ludGVudC5kZWZhdWx0Lm5vdHVuZGVyc3RhbmQnKSxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZhbGxiYWNrLFxufTtcbiIsImltcG9ydCB0IGZyb20gJy4uL3RyYW5zbGF0ZS51dGlsJztcbmltcG9ydCB7IFJlc3VsdEVudGl0eSwgQ29udGV4dHMsIEZ1bGZpbGxSZXNwb25zZSB9IGZyb20gJy4uL3R5cGVzLnV0aWwnO1xuaW1wb3J0IEVjbCBmcm9tICcuLi8uLi9tb2RlbHMvZWNsJztcblxuYXN5bmMgZnVuY3Rpb24gb3BlbnRpbWUoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGxldCB0eHQgPSB0KCdpbnRlbnQuaW5mb3Muc2NoZWR1bGVub3Rmb3VuZCcpO1xuICBpZiAoYy5zaXRlKSB7XG4gICAgdHh0ID0gdCgnaW50ZW50LmluZm9zLnNjaGVkdWxlJywge1xuICAgICAgY291bnQ6IGMuc2l0ZS5jb25jaWVyZ2VzLmxlbmd0aCxcbiAgICAgIGNvbmNpZXJnZUdpdmVuTmFtZTogRWNsLmdldFByZW5vbUNvbmNpZXJnZShjLnNpdGUuY29uY2llcmdlcyksXG4gICAgICBzaXRlc1NjaGVkdWxlczogYy5zaXRlLnNpdGUuaG9yYWlyZXMsXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZTogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiB0eHQsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29udGFjdChcbiAgZW50aXRpZXM6IFJlc3VsdEVudGl0eVtdLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgbGV0IHR4dCA9IHQoJ2ludGVudC5pbmZvcy5jb250YWN0bm90Zm91bmQnKTtcbiAgaWYgKGMuc2l0ZSkge1xuICAgIHR4dCA9IHQoJ2ludGVudC5pbmZvcy5jb250YWN0Jywge1xuICAgICAgY291bnQ6IGMuc2l0ZS5jb25jaWVyZ2VzLmxlbmd0aCxcbiAgICAgIGNvbmNpZXJnZUdpdmVuTmFtZTogRWNsLmdldFByZW5vbUNvbmNpZXJnZShjLnNpdGUuY29uY2llcmdlcyksXG4gICAgICBzaXRlRW1haWw6IGMuc2l0ZS5zaXRlLmVtYWlsLFxuICAgICAgc2l0ZVRlbGVwaG9uZTogYy5zaXRlLnNpdGUudGVsZXBob25lLFxuICAgICAgc2l0ZVNjaGVkdWxlczogYy5zaXRlLnNpdGUuaG9yYWlyZXMsXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZTogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiB0eHQsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VydmljZXMoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGxldCB0eHQgPSB0KCdpbnRlbnQuaW5mb3Muc2VydmljZXNub3Rmb3VuZCcpO1xuICBpZiAoYy5zaXRlKSB7XG4gICAgdHh0ID0gdCgnaW50ZW50LmluZm9zLnNlcnZpY2VzJywge1xuICAgICAgc2l0ZVNlcnZpY2VzOiBjLnNpdGUuc2l0ZS5ndWlkZVNlcnZpY2VzLFxuICAgIH0pO1xuICB9XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogdHh0LFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICB9LFxuICAgIF0sXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbGFpc2NvbGlzKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBsZXQgdHh0ID0gdCgnaW50ZW50LmluZm9zLnJlbGFpc2NvbGlzbm90Zm91bmQnKTtcbiAgaWYgKGMuc2l0ZSkge1xuICAgIHR4dCA9IHQoJ2ludGVudC5pbmZvcy5yZWxhaXNjb2xpcycsIHtcbiAgICAgIGNvdW50OiBjLnNpdGUuY29uY2llcmdlcy5sZW5ndGgsXG4gICAgICBjb25jaWVyZ2VHaXZlbk5hbWU6IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMpLFxuICAgICAgc2l0ZVJlbGFpc0NvbGlzOiBjLnNpdGUuc2l0ZS5yZWxhaXNDb2xpcyxcbiAgICB9KTtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IHR4dCxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9wZW50aW1lLFxuICBjb250YWN0LFxuICBzZXJ2aWNlcyxcbiAgcmVsYWlzY29saXMsXG59O1xuIiwiaW1wb3J0IHtcbiAgQ29udGV4dHMsXG4gIFJlc3VsdEVudGl0eSxcbiAgRnVsZmlsbFJlc3BvbnNlLFxuICBGdWxmaWxsUmVzcG9uc2VSZXNwb25zZSxcbn0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgdCBmcm9tICcuLi90cmFuc2xhdGUudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgRWNsLCB7IFNpdGVHcm91cCB9IGZyb20gJy4uLy4uL21vZGVscy9lY2wnO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2UgfSBmcm9tICcuLi9tZXNzYWdlLnV0aWwnO1xuXG5jb25zdCBlY2wgPSBuZXcgRWNsKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdHJhdGlvbihjOiBDb250ZXh0cywgc2l0ZUdyb3VwOiBTaXRlR3JvdXAgfCBudWxsKSB7XG4gIGlmICghYy5zaXRlIHx8ICFjLmZ1bGZpbGwgfHwgIXNpdGVHcm91cCkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgLy8gU3RvcmUgcmVnaXN0cmF0aW9uIHJlcXVlc3QgaW4gZGF0YWJhc2VcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGVjbC5zYXZlUmVnaXN0cmF0aW9uKFxuICAgICAgYy5zaXRlLnNpdGUsXG4gICAgICBjLmZ1bGZpbGwudXNlcklkIHx8ICc/JyxcbiAgICAgIGMuZnVsZmlsbC5lbWFpbCxcbiAgICAgIGMuZnVsZmlsbC5sYXN0bmFtZSxcbiAgICAgIGMuZnVsZmlsbC5maXJzdG5hbWUsXG4gICAgICBzaXRlR3JvdXAsXG4gICAgKTtcbiAgICBjb25zdCBsaW5rID0gYCR7Y29uZmlnLkVDTC51cmx9L2luc2NyaXB0aW9uL3ZlcmlmX2VtYWlsLnBocD90b2s9JHt0b2tlbn1gO1xuICAgIGF3YWl0IHNlbmRNZXNzYWdlKHtcbiAgICAgIGZyb206IGMuc2l0ZS5zaXRlLmVtYWlsLFxuICAgICAgdG86IGMuZnVsZmlsbC5lbWFpbCxcbiAgICAgIHN1YmplY3Q6ICdWb3RyZSBpbnNjcmlwdGlvbiDDoCBsYSBDb25jaWVyZ2VyaWUnLFxuICAgICAgaHRtbDpcbiAgICAgICAgJzxodG1sPicgK1xuICAgICAgICAnPGhlYWQ+JyArXG4gICAgICAgICcgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPicgK1xuICAgICAgICAnICAgcCB7JyArXG4gICAgICAgICcgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7JyArXG4gICAgICAgICcgICAgIGZvbnQtZmFtaWx5OkNhbGlicmksIHNhbnMtc2VyaWY7JyArXG4gICAgICAgICcgICB9JyArXG4gICAgICAgICcgPC9zdHlsZT4nICtcbiAgICAgICAgJzwvaGVhZD4nICtcbiAgICAgICAgJzxib2R5PicgK1xuICAgICAgICBgIDxwPkJvbmpvdXIgJHtjLmZ1bGZpbGwuZmlyc3RuYW1lfSw8L3A+PGJyIC8+YCArXG4gICAgICAgICcgPHA+Tm91cyBhdm9ucyBiaWVuIHByaXMgZW4gY29tcHRlIHZvdHJlIGluc2NyaXB0aW9uIMOgIGxhIGNvbmNpZXJnZXJpZS4gJyArXG4gICAgICAgICdBZmluIGRlIHbDqXJpZmllciB2b3RyZSBhZHJlc3NlIG1haWwsIG1lcmNpIGRlIGNsaXF1ZXIgc3VyIGxlIGxpZW4gc3VpdmFudDo8L3A+JyArXG4gICAgICAgIGAgPGEgaHJlZj1cIiR7bGlua31cIj5Ww6lyaWZpZXIgbW9uIGFkcmVzc2UgbWFpbDwvYT5gICtcbiAgICAgICAgJyA8cD5VbmUgZm9pcyB2b3RyZSBhZHJlc3NlIHbDqXJpZmnDqWUsIHZvdHJlIGNvbXB0ZSBzZXJhIGFjdGlmIGRhbnMgbGVzIGRldXggam91cnMgb3V2cmFibGVzIHN1aXZhbnQgdm90cmUgaW5zY3JpcHRpb24uPC9wPjxicj4nICtcbiAgICAgICAgJyA8cD7DgCB0csOocyBiaWVudMO0dCDDoCBsYSBjb25jaWVyZ2VyaWUgITwvcD4nICtcbiAgICAgICAgJyA8cD5BdSBwbGFpc2lyIGRlIHZvdXMgcmVuZHJlIHNlcnZpY2UuPC9wPicgK1xuICAgICAgICAnPC9ib2R5PicgK1xuICAgICAgICAnPC9odG1sPicsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gU2VuZCByZWdpc3RyYXRpb24gcmVxdWVzdCBieSBtYWlsIHRvIGNvbmNpZXJnZVxuICAgIGNvbnN0IG5vbUNvbmNpZXJnZSA9IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMsIGZhbHNlKTtcbiAgICBhd2FpdCBzZW5kTWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgZnJvbTogY29uZmlnLk1BSUwuc2VuZGVyLFxuICAgICAgICB0bzogYy5zaXRlLnNpdGUuZW1haWwsXG4gICAgICAgIHN1YmplY3Q6IGBbTGlmZWVdIE5vdXZlbGxlIGluc2NyaXB0aW9uIMOgIHNhaXNpcmAsXG4gICAgICAgIHRleHQ6IGBTYWx1dCAke25vbUNvbmNpZXJnZX0sIGMnZXN0IExpZmVlICFcXG5cXG5MJ3V0aWxpc2F0ZXVyIHN1aXZhbnQgc291aGFpdGUgcydpbnNjcmlyZTpcXG5cXG4gIFNvbiBub206ICR7XG4gICAgICAgICAgYy5mdWxmaWxsLmxhc3RuYW1lXG4gICAgICAgIH1cXG4gIFNvbiBQcsOpbm9tOiAke2MuZnVsZmlsbC5maXJzdG5hbWV9XFxuICBTb24gRW1haWw6ICR7XG4gICAgICAgICAgYy5mdWxmaWxsLmxhc3RuYW1lXG4gICAgICAgIH1cXG4gIFNvbiBOwrA6ICR7Yy5mdWxmaWxsLnVzZXJJZCB8fCAnPyd9XFxuICBTYSBjb25jaWVyZ2VyaWU6ICR7Yy5zaXRlXG4gICAgICAgICAgLnNpdGUubGliZWxsZSB8fCAnPyd9XFxuICBTb24gY29kZSBkZSByZWdyb3VwZW1lbnQ6ICR7XG4gICAgICAgICAgc2l0ZUdyb3VwID8gc2l0ZUdyb3VwLm5vbSA6ICc/J1xuICAgICAgICB9XFxuXFxuTWVyY2kgZGUgcHJvY8OpZGVyIMOgIHNvbiBpbnNjcmlwdGlvbi5cXG5cXG5Cb25uZSBqb3VybsOpZSAhYCxcbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGlmICghYy5mdWxmaWxsKSByZXR1cm4gbnVsbDtcbiAgYy5mdWxmaWxsLmN0eCA9IFtjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3Rlcl07XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogdCgnaW50ZW50LnJlZ2lzdGVyLmFza21haWwnKSxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck1haWwoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGlmICghYy5mdWxmaWxsKSByZXR1cm4gbnVsbDtcbiAgbGV0IGNvbmYgPSBjb25maWRlbmNlO1xuICBpZiAoXG4gICAgYy5mdWxmaWxsLmN0eCAmJlxuICAgIGMuZnVsZmlsbC5jdHguaW5jbHVkZXMoY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXIpICYmXG4gICAgZW50aXRpZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSAnYnVpbHRpbi5lbWFpbCcpLmxlbmd0aCA+IDBcbiAgKSB7XG4gICAgYy5mdWxmaWxsLmVtYWlsID0gZW50aXRpZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSAnYnVpbHRpbi5lbWFpbCcpWzBdLnZhbHVlO1xuICAgIGMuZnVsZmlsbC5jdHggPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJtYWlsXTtcbiAgfSBlbHNlIHtcbiAgICBjb25mID0gMDtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZTogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiB0KCdpbnRlbnQucmVnaXN0ZXIuYXNrZmlyc3RuYW1lJyksXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjb25maWRlbmNlOiBjb25mLFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZWdpc3Rlck5hbWUoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGlmICghYy5mdWxmaWxsKSByZXR1cm4gbnVsbDtcbiAgbGV0IGNvbmYgPSBjb25maWRlbmNlO1xuICBjb25zdCByZXNwb25zZTogRnVsZmlsbFJlc3BvbnNlUmVzcG9uc2UgPSB7XG4gICAgdGV4dDogJycsXG4gICAgdHlwZTogJ3RleHQnLFxuICAgIHBhcmFtczogbnVsbCxcbiAgfTtcbiAgY29uc3QgbmFtZXMgPSBlbnRpdGllcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09ICduYW1lJyk7XG4gIGxldCBuYW1lID0gbnVsbDtcbiAgaWYgKG5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICBuYW1lID0gbmFtZXNbMF0udmFsdWU7XG4gIH0gZWxzZSBpZiAocXVlcnkuc3BsaXQoJyAnKS5sZW5ndGggPT09IDEpIHtcbiAgICBuYW1lID0gcXVlcnk7XG4gIH1cbiAgaWYgKFxuICAgIGMuZnVsZmlsbC5jdHggJiZcbiAgICBjLmZ1bGZpbGwuY3R4LmluY2x1ZGVzKGNvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVybWFpbCkgJiZcbiAgICBuYW1lXG4gICkge1xuICAgIGMuZnVsZmlsbC5jdHggPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJtYWlsXTtcbiAgICBpZiAoYy5mdWxmaWxsLmZpcnN0bmFtZSkge1xuICAgICAgYy5mdWxmaWxsLmxhc3RuYW1lID0gbmFtZTtcbiAgICAgIGlmIChjLnNpdGUpIHtcbiAgICAgICAgLy8gVXNlciBzaXRlIGdyb3VwIGlzIG5lZWRlZFxuICAgICAgICBjb25zdCBncm91cHMgPSBhd2FpdCBlY2wuZ2V0U2l0ZUdyb3VwcyhjLnNpdGUuc2l0ZS5pZCk7XG4gICAgICAgIGlmIChncm91cHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGMuZnVsZmlsbC5jdHggPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJjb2RlXTtcbiAgICAgICAgICByZXNwb25zZS50ZXh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmFza2NvZGUnLCB7XG4gICAgICAgICAgICBmaXJzdG5hbWU6IGMuZnVsZmlsbC5maXJzdG5hbWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHR5cGVzLmluY2x1ZGVzKCdkcm9wZG93bicpKSB7XG4gICAgICAgICAgICByZXNwb25zZS50eXBlID0gJ2Ryb3Bkb3duJztcbiAgICAgICAgICAgIHJlc3BvbnNlLnBhcmFtcyA9IFtdO1xuICAgICAgICAgICAgcmVzcG9uc2UudmFsdWUgPSBgJHtjb25maWcuSU5URU5UUy5yZWdpc3RlcmNvZGV9IGJ1aWx0aW4ubnVtYmVyYDtcbiAgICAgICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdiA9IGluZGV4ICsgMTtcbiAgICAgICAgICAgICAgY29uc3QgbCA9IHYudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgcmVzcG9uc2UucGFyYW1zLnB1c2goe1xuICAgICAgICAgICAgICAgIHRleHQ6IGdyb3VwLm5vbSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogbCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICByZXNwb25zZS50ZXh0ICs9IHQoJ2ludGVudC5yZWdpc3Rlci5naXZlX3NpdGVfZ3JvdXBfY2hvaWNlJywge1xuICAgICAgICAgICAgICAgIG51bWJlcjogaW5kZXggKyAxLFxuICAgICAgICAgICAgICAgIG5hbWU6IGdyb3VwLm5vbSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYy5mdWxmaWxsLmN0eCA9IFtdO1xuICAgICAgICAgIGlmIChyZWdpc3RyYXRpb24oYywgZ3JvdXBzLmxlbmd0aCA/IGdyb3Vwc1swXSA6IG51bGwpKSB7XG4gICAgICAgICAgICByZXNwb25zZS50ZXh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmRvbmVfYWZ0ZXJfdmFsaWRhdGlvbicsIHtcbiAgICAgICAgICAgICAgY291bnQ6IGMuc2l0ZS5jb25jaWVyZ2VzLmxlbmd0aCxcbiAgICAgICAgICAgICAgY29uY2llcmdlR2l2ZW5OYW1lOiBFY2wuZ2V0UHJlbm9tQ29uY2llcmdlKGMuc2l0ZS5jb25jaWVyZ2VzKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZS50ZXh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmRvbmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMuZnVsZmlsbC5jdHggPSBbY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJjb2RlXTtcbiAgICAgICAgcmVzcG9uc2UudGV4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5hc2tjb2RlJywge1xuICAgICAgICAgIGZpcnN0bmFtZTogYy5mdWxmaWxsLmZpcnN0bmFtZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGMuZnVsZmlsbC5maXJzdG5hbWUgPSBuYW1lO1xuICAgICAgcmVzcG9uc2UudGV4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5hc2tsYXN0bmFtZScsIHtcbiAgICAgICAgZmlyc3RuYW1lOiBjLmZ1bGZpbGwuZmlyc3RuYW1lLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbmYgPSAwLjk7XG4gIH0gZWxzZSB7XG4gICAgY29uZiA9IDA7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgcmVzcG9uc2U6IFtyZXNwb25zZV0sXG4gICAgY29udGV4dHM6IGMsXG4gICAgY29uZmlkZW5jZTogY29uZixcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJDb2RlKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBpZiAoIWMuZnVsZmlsbCkgcmV0dXJuIG51bGw7XG4gIGxldCBjb25mID0gY29uZmlkZW5jZTtcbiAgbGV0IHR4dCA9ICcnO1xuICBpZiAoXG4gICAgYy5mdWxmaWxsLmN0eCAmJlxuICAgIGMuZnVsZmlsbC5jdHguaW5jbHVkZXMoY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJjb2RlKSAmJlxuICAgIGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4ubnVtYmVyJykubGVuZ3RoID4gMCAmJlxuICAgIGMuc2l0ZVxuICApIHtcbiAgICBjb25zdCBzaXRlR3JvdXBOdW1iZXIgPSBwYXJzZUludChcbiAgICAgIGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4ubnVtYmVyJylbMF0udmFsdWUsXG4gICAgICAxMCxcbiAgICApO1xuICAgIC8vIENoZWNrIGdpdmVuIG51bWJlciBleGlzdHMgaW4gRUNMXG4gICAgY29uc3QgZ3JvdXBzID0gYXdhaXQgZWNsLmdldFNpdGVHcm91cHMoYy5zaXRlLnNpdGUuaWQpO1xuICAgIGNvbnN0IHNpdGVHcm91cCA9XG4gICAgICBzaXRlR3JvdXBOdW1iZXIgJiYgc2l0ZUdyb3VwTnVtYmVyID4gMCAmJiBzaXRlR3JvdXBOdW1iZXIgPD0gZ3JvdXBzLmxlbmd0aFxuICAgICAgICA/IGdyb3Vwc1tzaXRlR3JvdXBOdW1iZXIgLSAxXVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICBpZiAoIXNpdGVHcm91cCkge1xuICAgICAgdHh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmFza19zaXRlX2dyb3VwX2FnYWluJywge1xuICAgICAgICBtYXg6IGdyb3Vwcy5sZW5ndGgsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYy5mdWxmaWxsLmN0eCA9IFtdO1xuICAgICAgYy5mdWxmaWxsLnNpdGVHcm91cCA9IHNpdGVHcm91cE51bWJlcjtcbiAgICAgIGlmIChyZWdpc3RyYXRpb24oYywgc2l0ZUdyb3VwKSkge1xuICAgICAgICB0eHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuZG9uZV9hZnRlcl92YWxpZGF0aW9uJywge1xuICAgICAgICAgIGNvdW50OiBjLnNpdGUuY29uY2llcmdlcy5sZW5ndGgsXG4gICAgICAgICAgY29uY2llcmdlR2l2ZW5OYW1lOiBFY2wuZ2V0UHJlbm9tQ29uY2llcmdlKGMuc2l0ZS5jb25jaWVyZ2VzKSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuZG9uZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25mID0gMC45O1xuICB9IGVsc2Uge1xuICAgIGNvbmYgPSAwO1xuICB9XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IHR4dCxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIGNvbmZpZGVuY2U6IGNvbmYsXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmVnaXN0ZXIsXG4gIHJlZ2lzdGVyTWFpbCxcbiAgcmVnaXN0ZXJOYW1lLFxuICByZWdpc3RlckNvZGUsXG59O1xuIiwiaW1wb3J0IHdhdHNvbiBmcm9tICcuL3NlcnZpY2VzL3dhdHNvbi51dGlsJztcbmltcG9ydCBsdWlzIGZyb20gJy4vc2VydmljZXMvbHVpcy51dGlsJztcbmltcG9ydCB3aXQgZnJvbSAnLi9zZXJ2aWNlcy93aXQudXRpbCc7XG5pbXBvcnQgc2FwIGZyb20gJy4vc2VydmljZXMvc2FwLnV0aWwnO1xuXG5pbXBvcnQgZnVsZmlsbCBmcm9tICcuL2Z1bGZpbGwudXRpbCc7XG5pbXBvcnQgQ29udGV4dHNNYW5hZ2VyIGZyb20gJy4vY29udGV4dHNtYW5hZ2VyLnV0aWwnO1xuaW1wb3J0IGVjbCBmcm9tICcuLi9tb2RlbHMvZWNsJztcbmltcG9ydCB7IFNpdGVDb250ZXh0cywgQ29udGV4dHMsIEZ1bGZpbGxSZXNwb25zZSwgUmVzdWx0IH0gZnJvbSAnLi90eXBlcy51dGlsJztcbmltcG9ydCBpMThuIGZyb20gJ2kxOG5leHQnO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRTaXRlQ29udGV4dHMoXG4gIHRvOiBzdHJpbmcsXG4gIHBsYXRmb3JtOiBzdHJpbmcsXG4pOiBQcm9taXNlPFNpdGVDb250ZXh0cz4ge1xuICBsZXQgc2VydmljZSA9ICd0d2lsaW8nO1xuICBpZiAocGxhdGZvcm0gPT09ICdzbGFjaycpIHtcbiAgICBzZXJ2aWNlID0gJ3NsYWNrJztcbiAgfVxuICBpZiAoIXRvKSB0aHJvdyBFcnJvcihgVW5rbm93biB0byBmb3Igc2VydmljZSAke3NlcnZpY2V9YCk7XG4gIGNvbnN0IEVjbCA9IG5ldyBlY2woKTtcbiAgY29uc3Qgc2l0ZSA9IGF3YWl0IEVjbC5nZXRTaXRlSW5mb3Moc2VydmljZSwgdG8pO1xuICBpZiAoIXNpdGUpIHRocm93IEVycm9yKGBVbmtub3duIFNpdGUgZm9yIHNlcnZpY2UgJHtzZXJ2aWNlfSB3aXRoIGlkICR7dG99YCk7XG5cbiAgY29uc3QgY29uY2llcmdlcyA9IGF3YWl0IEVjbC5nZXRDb25jaWVyZ2VMaXN0KHNpdGUuY29kZSk7XG4gIHJldHVybiB7XG4gICAgY29uY2llcmdlcyxcbiAgICBzaXRlLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihcbiAgbXNnOiBzdHJpbmcsXG4gIGZyb206IHN0cmluZyxcbiAgdG86IHN0cmluZyxcbiAgc2VydmljZTogc3RyaW5nLFxuICBwbGF0Zm9ybTogc3RyaW5nLFxuKSB7XG4gIC8qIEdldCBjb250ZXh0cyAqL1xuICBsZXQgY29udGV4dHM6IENvbnRleHRzID0gYXdhaXQgQ29udGV4dHNNYW5hZ2VyLmxvYWQoZnJvbSk7XG4gIGNvbnN0IGE6IFNpdGVDb250ZXh0cyA9IGF3YWl0IGdldFNpdGVDb250ZXh0cyh0bywgcGxhdGZvcm0pO1xuICBjb250ZXh0cy5zaXRlID0gYTtcblxuICAvKiBHZXQgc2VydmljZSBSZXN1bHQgKi9cbiAgbGV0IHJlc3VsdDtcbiAgc3dpdGNoIChzZXJ2aWNlKSB7XG4gICAgY2FzZSAnd2F0c29uJzpcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHdhdHNvbihtc2csIGNvbnRleHRzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2x1aXMnOlxuICAgICAgcmVzdWx0ID0gYXdhaXQgbHVpcyhtc2csIGNvbnRleHRzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dpdCc6XG4gICAgICByZXN1bHQgPSBhd2FpdCB3aXQobXNnLCBjb250ZXh0cyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzYXAnOlxuICAgICAgcmVzdWx0ID0gYXdhaXQgc2FwKG1zZywgY29udGV4dHMpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgY29udGV4dHMsXG4gICAgICAgIHJlc3VsdDoge1xuICAgICAgICAgIHJlc3BvbnNlOiBudWxsLFxuICAgICAgICAgIGludGVudHM6IFtdLFxuICAgICAgICAgIGVudGl0aWVzOiBbXSxcbiAgICAgICAgICBxdWVyeTogbXNnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgfVxuICBjb250ZXh0cyA9IHJlc3VsdC5jb250ZXh0cztcbiAgLyogQ2hhbmdlIGxhbmd1YWdlICovXG4gIGlmICh0byA9PT0gJyszMzc1NTUzNjkxMCcpIHtcbiAgICBhd2FpdCBpMThuLmNoYW5nZUxhbmd1YWdlKCdmci12cycpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGkxOG4uY2hhbmdlTGFuZ3VhZ2UoJ2ZyLXR1Jyk7XG4gIH1cbiAgLyogRGVmaW5lcyBhY2NlcHRlZCB0eXBlIGZvciB0aGUgcGxhdGZvcm0gKi9cbiAgbGV0IHR5cGVzID0gW107XG4gIHN3aXRjaCAocGxhdGZvcm0pIHtcbiAgICBjYXNlICdzbGFjayc6XG4gICAgICB0eXBlcyA9IFsnYnV0dG9ucycsICdkcm9wZG93bicsICd0ZXh0J107XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZWwnOlxuICAgICAgdHlwZXMgPSBbJ3RleHQnXTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0eXBlcyA9IFsndGV4dCddO1xuICB9XG4gIC8qIEdldCBmdWxmaWxsIFJlc3BvbnNlICovXG4gIGNvbnN0IHJlc3BvbnNlOiBGdWxmaWxsUmVzcG9uc2UgPSBhd2FpdCBmdWxmaWxsKFxuICAgIHJlc3VsdC5yZXN1bHQsXG4gICAgY29udGV4dHMsXG4gICAgdHlwZXMsXG4gICk7XG4gIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgLyogU2F2ZSBjb250ZXh0cyAqL1xuICBhd2FpdCBDb250ZXh0c01hbmFnZXIuc2F2ZShmcm9tLCByZXNwb25zZS5jb250ZXh0cyk7XG4gIC8qIFJldHVybiByZXNwb25zZSB0ZXh0ICovXG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1zZ1dpdGhvdXRTZXJ2aWNlKFxuICBtc2c6IHN0cmluZyxcbiAgZnJvbTogc3RyaW5nLFxuICB0bzogc3RyaW5nLFxuICBwbGF0Zm9ybTogc3RyaW5nLFxuICByZXN1bHQ6IFJlc3VsdCxcbikge1xuICAvKiBHZXQgY29udGV4dHMgKi9cbiAgY29uc3QgY29udGV4dHM6IENvbnRleHRzID0gYXdhaXQgQ29udGV4dHNNYW5hZ2VyLmxvYWQoZnJvbSk7XG4gIGNvbnN0IGE6IFNpdGVDb250ZXh0cyA9IGF3YWl0IGdldFNpdGVDb250ZXh0cyh0bywgcGxhdGZvcm0pO1xuICBjb250ZXh0cy5zaXRlID0gYTtcbiAgLyogQ2hhbmdlIGxhbmd1YWdlICovXG4gIGlmICh0byA9PT0gJyszMzc1NTUzNjkxMCcpIHtcbiAgICBhd2FpdCBpMThuLmNoYW5nZUxhbmd1YWdlKCdmci12cycpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IGkxOG4uY2hhbmdlTGFuZ3VhZ2UoJ2ZyLXR1Jyk7XG4gIH1cbiAgLyogRGVmaW5lcyBhY2NlcHRlZCB0eXBlIGZvciB0aGUgcGxhdGZvcm0gKi9cbiAgbGV0IHR5cGVzID0gW107XG4gIHN3aXRjaCAocGxhdGZvcm0pIHtcbiAgICBjYXNlICdzbGFjayc6XG4gICAgICB0eXBlcyA9IFsnYnV0dG9ucycsICdkcm9wZG93bicsICd0ZXh0J107XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZWwnOlxuICAgICAgdHlwZXMgPSBbJ3RleHQnXTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0eXBlcyA9IFsndGV4dCddO1xuICB9XG4gIC8qIEdldCBmdWxmaWxsIFJlc3BvbnNlICovXG4gIGNvbnN0IHJlc3BvbnNlOiBGdWxmaWxsUmVzcG9uc2UgPSBhd2FpdCBmdWxmaWxsKHJlc3VsdCwgY29udGV4dHMsIHR5cGVzKTtcbiAgLyogU2F2ZSBjb250ZXh0cyAqL1xuICBhd2FpdCBDb250ZXh0c01hbmFnZXIuc2F2ZShmcm9tLCByZXNwb25zZS5jb250ZXh0cyk7XG4gIC8qIFJldHVybiByZXNwb25zZSB0ZXh0ICovXG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cbiIsImltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy8nO1xuXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgaG9zdDogY29uZmlnLk1BSUwuaG9zdCxcbiAgcG9ydDogMjUsXG4gIHNlY3VyZTogY29uZmlnLk1BSUwuc2VjdXJlLFxuICAvLyBhdXRoOiB7XG4gIC8vICAgICB1c2VyOiAneHh4QHh4LmNvbScsXG4gIC8vICAgICBwYXNzOiAneHh4eCdcbiAgLy8gfSxcbiAgdGxzOiB7IHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UgfSxcbn0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1haWxPcHRpb25zIHtcbiAgZnJvbTogc3RyaW5nO1xuICB0bzogc3RyaW5nIHwgc3RyaW5nW107XG4gIGNjPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIGJjYz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICByZXBseVRvPzogc3RyaW5nO1xuICBzdWJqZWN0OiBzdHJpbmc7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIGh0bWw/OiBzdHJpbmc7XG4gIGF0dGFjaG1lbnRzPzogYW55W107XG59XG5cbmV4cG9ydCBjb25zdCBzZW5kTWVzc2FnZSA9IGFzeW5jIChcbiAgb3B0aW9uczogTWFpbE9wdGlvbnMsXG4gIHRocm93RXJyb3I6IGJvb2xlYW4gPSB0cnVlLFxuKSA9PiB7XG4gIHRyeSB7XG4gICAgaWYgKGNvbmZpZy5NQUlMLmVuYWJsZSkge1xuICAgICAgY29uc3QgbWFpbE9wdGlvbnMgPSB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIHRvOiBjb25maWcuTUFJTC5yZWNpcGllbnQgfHwgb3B0aW9ucy50byxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsT3B0aW9ucyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHRocm93RXJyb3IpIHRocm93IGU7XG4gIH1cbn07XG4iLCJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBSZXN1bHQsIENvbnRleHRzIH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgeyBleGVjcmVxdWVzdCB9IGZyb20gJy4uL2FzeW5jLnV0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtc2c6IHN0cmluZywgY29udGV4dHM6IENvbnRleHRzKSB7XG4gIGNvbnN0IHJlc3VsdDogUmVzdWx0ID0ge1xuICAgIHJlc3BvbnNlOiBudWxsLFxuICAgIGludGVudHM6IFtdLFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBxdWVyeTogbXNnLFxuICB9O1xuICB0cnkge1xuICAgIGNvbnN0IGVuZHBvaW50ID1cbiAgICAgICdodHRwczovL3dlc3R1cy5hcGkuY29nbml0aXZlLm1pY3Jvc29mdC5jb20vbHVpcy92Mi4wL2FwcHMvJztcbiAgICBjb25zdCBhcHBJZCA9IGNvbmZpZy5MVUlTLmFwcElkO1xuICAgIGNvbnN0IGVuZHBvaW50a2V5ID0gY29uZmlnLkxVSVMuZW5kcG9pbnRLZXk7XG4gICAgY29uc3QgcXVlcnlQYXJhbXMgPSB7XG4gICAgICB2ZXJib3NlOiB0cnVlLFxuICAgICAgcTogbXNnLFxuICAgICAgJ3N1YnNjcmlwdGlvbi1rZXknOiBlbmRwb2ludGtleSxcbiAgICB9O1xuICAgIGNvbnN0IHJlcSA9IGAke2VuZHBvaW50fSR7YXBwSWR9PyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KHF1ZXJ5UGFyYW1zKX1gO1xuICAgIGxldCByZXMgPSBhd2FpdCBleGVjcmVxdWVzdChyZXEpO1xuICAgIHJlcyA9IEpTT04ucGFyc2UocmVzLmJvZHkpO1xuICAgIHJlcy5pbnRlbnRzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmludGVudHMucHVzaCh7XG4gICAgICAgIG5hbWU6IGUuaW50ZW50LFxuICAgICAgICBjb25maWRlbmNlOiBlLnNjb3JlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmVzdWx0LmVudGl0aWVzID0gW107XG4gICAgcmVzLmVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBlLnR5cGUsXG4gICAgICAgIHZhbHVlOiBlLmVudGl0eSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7IHJlc3VsdCwgY29udGV4dHMgfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHsgcmVzdWx0LCBjb250ZXh0cyB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb250ZXh0cywgUmVzdWx0IH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBleGVjcmVxdWVzdCB9IGZyb20gJy4uL2FzeW5jLnV0aWwnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihtc2c6IHN0cmluZywgY29udGV4dHM6IENvbnRleHRzKSB7XG4gIGNvbnN0IHJlc3VsdDogUmVzdWx0ID0ge1xuICAgIHJlc3BvbnNlOiBudWxsLFxuICAgIGludGVudHM6IFtdLFxuICAgIGVudGl0aWVzOiBbXSxcbiAgICBxdWVyeTogbXNnLFxuICB9O1xuXG4gIHRyeSB7XG4gICAgbGV0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHtcbiAgICAgIHVybDogJ2h0dHBzOi8vYXBpLmNhaS50b29scy5zYXAvYnVpbGQvdjEvZGlhbG9nJyxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgVG9rZW4gJHtjb25maWcuU0FQLnRva2VufWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICB9LFxuICAgICAganNvbjoge1xuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgY29udGVudDogbXNnLFxuICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgfSxcbiAgICAgICAgY29udmVyc2F0aW9uX2lkOiB1dWlkKCksXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJlcyA9IHJlcy5ib2R5LnJlc3VsdHMubmxwO1xuICAgIHJlcy5pbnRlbnRzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmludGVudHMucHVzaCh7XG4gICAgICAgIG5hbWU6IGUuc2x1ZyxcbiAgICAgICAgY29uZmlkZW5jZTogZS5jb25maWRlbmNlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgbGV0IGtleTogc3RyaW5nO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZm9yaW5cbiAgICBmb3IgKGtleSBpbiByZXMuZW50aXRpZXMpIHtcbiAgICAgIHJlcy5lbnRpdGllc1trZXldLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICByZXN1bHQuZW50aXRpZXMucHVzaCh7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHZhbHVlOiBlLnJhdyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHsgcmVzdWx0LCBjb250ZXh0cyB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgcmVzdWx0LCBjb250ZXh0cyB9O1xuICB9XG59XG4iLCJpbXBvcnQgd2F0c29uIGZyb20gJ3dhdHNvbi1kZXZlbG9wZXItY2xvdWQvYXNzaXN0YW50L3YyJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IFJlc3VsdCwgQ29udGV4dHMgfSBmcm9tICcuLi90eXBlcy51dGlsJztcblxuY29uc3QgY3JlYXRlU2Vzc2lvbjogYW55ID0gYXN5bmMgKGFzc2lzdGFudDogYW55LCBvYmo6IGFueSkgPT4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXNzaXN0YW50LmNyZWF0ZVNlc3Npb24ob2JqLCAoZXJyOiBhbnksIHJlczogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHNlbmRNZXNzYWdlOiBhbnkgPSBhc3luYyAoYXNzaXN0YW50OiBhbnksIG9iajogYW55KSA9PiB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW51c2VkLWV4cHJlc3Npb25cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBhc3Npc3RhbnQubWVzc2FnZShvYmosIChlcnI6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1zZzogc3RyaW5nLCBjb250ZXh0czogQ29udGV4dHMpIHtcbiAgY29uc3QgcmVzdWx0OiBSZXN1bHQgPSB7XG4gICAgcmVzcG9uc2U6IG51bGwsXG4gICAgaW50ZW50czogW10sXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIHF1ZXJ5OiBtc2csXG4gIH07XG4gIHRyeSB7XG4gICAgLy8gQ3JlYXRlIGFzc2lzdGFudFxuICAgIGNvbnN0IGFzc2lzdGFudCA9IG5ldyB3YXRzb24oe1xuICAgICAgaWFtX2FwaWtleTogY29uZmlnLldBVFNPTi5hcGlLZXksXG4gICAgICB2ZXJzaW9uOiAnMjAxOC0wOS0yMCcsXG4gICAgICB1cmw6ICdodHRwczovL2dhdGV3YXktbG9uLndhdHNvbnBsYXRmb3JtLm5ldC9hc3Npc3RhbnQvYXBpJyxcbiAgICB9KTtcbiAgICBjb25zdCBhc3Npc3RhbnRJZCA9IGNvbmZpZy5XQVRTT04uYXNzaXN0YW50SWQ7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGNyZWF0ZVNlc3Npb24oYXNzaXN0YW50LCB7XG4gICAgICBhc3Npc3RhbnRfaWQ6IGFzc2lzdGFudElkLFxuICAgIH0pO1xuICAgIGNvbnN0IHNlc3Npb25JZCA9IHNlc3Npb24uc2Vzc2lvbl9pZDtcbiAgICBjb250ZXh0cy5zZXJ2aWNlLndhdHNvbklkID0gc2Vzc2lvbklkO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IHNlbmRNZXNzYWdlKGFzc2lzdGFudCwge1xuICAgICAgYXNzaXN0YW50X2lkOiBhc3Npc3RhbnRJZCxcbiAgICAgIHNlc3Npb25faWQ6IHNlc3Npb25JZCxcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1lc3NhZ2VfdHlwZTogJ3RleHQnLFxuICAgICAgICB0ZXh0OiBtc2csXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXR1cm5fY29udGV4dDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjb250ZXh0czogY29udGV4dHMuc2VydmljZS53YXRzb24sXG4gICAgfSk7XG4gICAgY29udGV4dHMuc2VydmljZS53YXRzb24gPSByZXMuY29udGV4dDtcbiAgICByZXN1bHQucmVzcG9uc2UgPSB7XG4gICAgICB0eXBlOiByZXMub3V0cHV0LmdlbmVyaWNbMF0ucmVzcG9uc2VfdHlwZSxcbiAgICAgIHRleHQ6IHJlcy5vdXRwdXQuZ2VuZXJpY1swXS50ZXh0LFxuICAgIH07XG4gICAgcmVzLm91dHB1dC5pbnRlbnRzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmludGVudHMucHVzaCh7XG4gICAgICAgIGNvbmZpZGVuY2U6IGUuY29uZmlkZW5jZSxcbiAgICAgICAgbmFtZTogZS5pbnRlbnQsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXN1bHQuZW50aXRpZXMgPSBbXTtcbiAgICByZXMub3V0cHV0LmVudGl0aWVzLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBlLmVudGl0eSxcbiAgICAgICAgdmFsdWU6IG1zZy5zdWJzdHJpbmcoZS5sb2NhdGlvblswXSwgZS5sb2NhdGlvblsxXSksXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4geyByZXN1bHQsIGNvbnRleHRzIH07XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB7IHJlc3VsdCwgY29udGV4dHMgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgV2l0IH0gZnJvbSAnbm9kZS13aXQnO1xuXG5pbXBvcnQgeyBDb250ZXh0cywgUmVzdWx0IH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1zZzogc3RyaW5nLCBjb250ZXh0czogQ29udGV4dHMpIHtcbiAgY29uc3QgcmVzdWx0OiBSZXN1bHQgPSB7XG4gICAgcmVzcG9uc2U6IG51bGwsXG4gICAgaW50ZW50czogW10sXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIHF1ZXJ5OiBtc2csXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnQgPSBuZXcgV2l0KHsgYWNjZXNzVG9rZW46IGNvbmZpZy5XSVQuYWNjZXNzdG9rZW4gfSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgY2xpZW50Lm1lc3NhZ2UobXNnLCB7fSk7XG4gICAgbGV0IGtleTogc3RyaW5nO1xuICAgIGZvciAoa2V5IGluIHJlcy5lbnRpdGllcykge1xuICAgICAgaWYgKGtleSA9PT0gJ2ludGVudCcpIHtcbiAgICAgICAgcmVzLmVudGl0aWVzLmludGVudC5mb3JFYWNoKChlOiBhbnkpID0+IHtcbiAgICAgICAgICByZXN1bHQuaW50ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGUudmFsdWUsXG4gICAgICAgICAgICBjb25maWRlbmNlOiBlLmNvbmZpZGVuY2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLmVudGl0aWVzW2tleV0uZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICAgICAgcmVzdWx0LmVudGl0aWVzLnB1c2goe1xuICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgdmFsdWU6IGUudmFsdWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyByZXN1bHQsIGNvbnRleHRzIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4geyByZXN1bHQsIGNvbnRleHRzIH07XG4gIH1cbn1cbiIsImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihrZXk6IHN0cmluZywgcGFyYW1zOiBhbnkgPSBudWxsKSB7XG4gIGxldCBwYXJhbWV0ZXJzID0gcGFyYW1zO1xuICBpZiAoIXBhcmFtZXRlcnMpIHtcbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cbiAgcGFyYW1ldGVycy5yZXR1cm5PYmplY3RzID0gdHJ1ZTtcbiAgY29uc3QgcG9zc2liaWxpdGllcyA9IGkxOG5leHQudChrZXksIHBhcmFtZXRlcnMpO1xuICBpZiAoQXJyYXkuaXNBcnJheShwb3NzaWJpbGl0aWVzKSkge1xuICAgIHJldHVybiBwb3NzaWJpbGl0aWVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmlsaXRpZXMubGVuZ3RoKV07XG4gIH1cbiAgcmV0dXJuIHBvc3NpYmlsaXRpZXM7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImkxOG5leHQtbm9kZS1mcy1iYWNrZW5kXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbWVudFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZWRiXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtd2l0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGVtYWlsZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVxdWVzdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXF1ZWxpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3YXRzb24tZGV2ZWxvcGVyLWNsb3VkL2Fzc2lzdGFudC92MlwiKTsiXSwic291cmNlUm9vdCI6IiJ9