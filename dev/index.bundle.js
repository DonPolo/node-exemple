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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlemessage_util_1 = __importDefault(__webpack_require__(/*! ../utils/handlemessage.util */ "./src/utils/handlemessage.util.ts"));
const web_api_1 = __webpack_require__(/*! @slack/web-api */ "@slack/web-api");
const config_1 = __importDefault(__webpack_require__(/*! ../config */ "./src/config/index.ts"));
async function default_1(req, res, next) {
    console.log('New request');
    if (req.body.event.type === 'message' && !req.body.event.bot_id) {
        const msg = req.body.event.text;
        const from = req.body.event.user;
        const to = req.body.event.channel;
        const response = await handlemessage_util_1.default(msg, from, to, 'luis', 'slack');
        if (response) {
            const res = {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: response.text,
                },
                accessory: {},
            };
            if (response.type === 'dropdown') {
                res.accessory = {
                    type: 'static_select',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Sélectionnez un item',
                        emoji: true,
                    },
                    options: [],
                };
                response.params.forEach((e) => {
                    res.accessory.options.push({
                        text: {
                            type: 'plain_text',
                            text: e.text,
                            emoji: true,
                        },
                        value: e.value,
                    });
                });
            }
            const web = new web_api_1.WebClient(config_1.default.SLACK.apiToken);
            await web.chat.postMessage({
                text: response,
                channel: req.body.event.channel,
            });
        }
    }
    console.log(req.body);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(req.body.challenge);
}
exports.default = default_1;


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
const controllers_1 = __importDefault(__webpack_require__(/*! ../controllers */ "./src/controllers/index.ts"));
const ajax_controller_1 = __importDefault(__webpack_require__(/*! ../controllers/ajax.controller */ "./src/controllers/ajax.controller.ts"));
const slack_controller_1 = __importDefault(__webpack_require__(/*! ../controllers/slack.controller */ "./src/controllers/slack.controller.ts"));
const routes = express_1.default.Router();
routes.all('/', controllers_1.default);
routes.get('/ajax/sendmessage', ajax_controller_1.default);
routes.post('/slack', slack_controller_1.default);
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
async function load(user) {
    await deleteOld();
    const contexts = await findone({ user });
    if (contexts) {
        contexts.contexts.site = null;
        return contexts.contexts;
    }
    return {
        fulfill: null,
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
        response: {
            text: translate_util_1.default('intent.default.notunderstand'),
            type: 'text',
        },
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
        response: {
            text: txt,
            type: 'text',
        },
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
        response: {
            text: txt,
            type: 'text',
        },
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
        response: {
            text: txt,
            type: 'text',
        },
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
        response: {
            text: txt,
            type: 'text',
        },
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
        response: {
            text: translate_util_1.default('intent.register.askmail'),
            type: 'text',
        },
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
        response: {
            text: translate_util_1.default('intent.register.askfirstname'),
            type: 'text',
        },
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
                        groups.forEach((group, index) => {
                            response.params.push({
                                text: group.nom,
                                value: index + 1,
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
        response,
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
        response: {
            text: txt,
            type: 'text',
        },
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
async function getSiteContexts(to) {
    const service = 'twilio';
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
    if (platform !== 'slack') {
        const a = await getSiteContexts(to);
        contexts.site = a;
    }
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
const request_1 = __importDefault(__webpack_require__(/*! request */ "request"));
const querystring_1 = __importDefault(__webpack_require__(/*! querystring */ "querystring"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/config/index.ts"));
const execrequest = async (req) => {
    // tslint:disable-next-line: no-unused-expression
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
        let res = await execrequest(req);
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

/***/ "@slack/web-api":
/*!*********************************!*\
  !*** external "@slack/web-api" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@slack/web-api");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2svYm9vdHN0cmFwIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpMThuLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcY29uZmlnXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXGNvbnRyb2xsZXJzXFxhamF4LmNvbnRyb2xsZXIudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcaW5kZXgudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFxjb250cm9sbGVyc1xcc2xhY2suY29udHJvbGxlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXG1vZGVsc1xcZWNsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xccm91dGVzXFxpbmRleC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHNlcnZlci50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxjb250ZXh0c21hbmFnZXIudXRpbC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxmdWxmaWxsLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcZnVsZmlsbFxcZGVmYXVsdC5pbnRlbnQudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcZnVsZmlsbFxcaW5mb3MuaW50ZW50LnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXGZ1bGZpbGxcXHJlZ2lzdGVyLmludGVudC50cyIsIkM6XFxVc2Vyc1xcVmlzaXRldXJcXERvY3VtZW50c1xcTGlmZWVcXGxpZmVlXFxzcmNcXHV0aWxzXFxoYW5kbGVtZXNzYWdlLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcbWVzc2FnZS51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXHNlcnZpY2VzXFxsdWlzLnV0aWwudHMiLCJDOlxcVXNlcnNcXFZpc2l0ZXVyXFxEb2N1bWVudHNcXExpZmVlXFxsaWZlZVxcc3JjXFx1dGlsc1xcc2VydmljZXNcXHdhdHNvbi51dGlsLnRzIiwiQzpcXFVzZXJzXFxWaXNpdGV1clxcRG9jdW1lbnRzXFxMaWZlZVxcbGlmZWVcXHNyY1xcdXRpbHNcXHRyYW5zbGF0ZS51dGlsLnRzIiwiZXh0ZXJuYWwgXCJAc2xhY2svd2ViLWFwaVwiIiwiZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwiZXh0ZXJuYWwgXCJkb3RlbnZcIiIsImV4dGVybmFsIFwiZXhwcmVzc1wiIiwiZXh0ZXJuYWwgXCJmc1wiIiwiZXh0ZXJuYWwgXCJpMThuZXh0XCIiLCJleHRlcm5hbCBcImkxOG5leHQtbm9kZS1mcy1iYWNrZW5kXCIiLCJleHRlcm5hbCBcIm1vbWVudFwiIiwiZXh0ZXJuYWwgXCJuZWRiXCIiLCJleHRlcm5hbCBcIm5vZGVtYWlsZXJcIiIsImV4dGVybmFsIFwicXVlcnlzdHJpbmdcIiIsImV4dGVybmFsIFwicmVxdWVzdFwiIiwiZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsImV4dGVybmFsIFwidXVpZFwiIiwiZXh0ZXJuYWwgXCJ3YXRzb24tZGV2ZWxvcGVyLWNsb3VkL2Fzc2lzdGFudC92MlwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsaUZBQTJCO0FBQzNCLGlJQUFxRDtBQUNyRCw4RUFBNEI7QUFFNUIsTUFBTSxLQUFLLEdBQUcsYUFBb0IsS0FBSyxhQUFhLENBQUM7QUFFckQsaUJBQUksQ0FBQyxHQUFHLENBQUMsaUNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM1QixHQUFHLEVBQUUsT0FBTztJQUNaLFdBQVcsRUFBRSxPQUFPO0lBQ3BCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNsQixXQUFXLEVBQUUsSUFBSTtJQUNqQixLQUFLLEVBQUUsS0FBSztJQUNaLGFBQWEsRUFBRTtRQUNiLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxN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T0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQVhELDRCQVdDOzs7Ozs7Ozs7Ozs7QUNiRCwyQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSx1Qzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxnRSIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zZXJ2ZXIudHNcIik7XG4iLCJpbXBvcnQgaTE4biBmcm9tICdpMThuZXh0JztcbmltcG9ydCBpMThuZXh0QmFja2VuZCBmcm9tICdpMThuZXh0LW5vZGUtZnMtYmFja2VuZCc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IGlzRGV2ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCc7XG5cbmkxOG4udXNlKGkxOG5leHRCYWNrZW5kKS5pbml0KHtcbiAgbG5nOiAnZnItdHUnLFxuICBmYWxsYmFja0xuZzogJ2ZyLXR1JyxcbiAgcHJlbG9hZDogWydmci10dSddLFxuICBzYXZlTWlzc2luZzogdHJ1ZSxcbiAgZGVidWc6IGlzRGV2LFxuICBpbnRlcnBvbGF0aW9uOiB7XG4gICAgZm9ybWF0OiAodmFsdWUsIGZvcm1hdCAvKiAsIGxuZyAqLykgPT4ge1xuICAgICAgaWYgKGZvcm1hdCA9PT0gJ2NhcGl0YWxpemUnKVxuICAgICAgICByZXR1cm4gdmFsdWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHJldHVybiBtb21lbnQodmFsdWUpLmZvcm1hdChmb3JtYXQpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gIH0sXG4gIGJhY2tlbmQ6IHtcbiAgICAvLyBwYXRoIHdoZXJlIHJlc291cmNlcyBnZXQgbG9hZGVkIGZyb21cbiAgICBsb2FkUGF0aDogJ2xvY2FsZXMve3tsbmd9fS97e25zfX0uanNvbicsXG4gICAgLy8gcGF0aCB0byBwb3N0IG1pc3NpbmcgcmVzb3VyY2VzXG4gICAgYWRkUGF0aDogJ2xvY2FsZXMve3tsbmd9fS97e25zfX0ubWlzc2luZy5qc29uJyxcbiAgICAvLyBqc29uSW5kZW50IHRvIHVzZSB3aGVuIHN0b3JpbmcganNvbiBmaWxlc1xuICAgIGpzb25JbmRlbnQ6IDIsXG4gIH0sXG59KTtcbiIsImltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZyh7IGRlYnVnOiB0cnVlIH0pO1xuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgUE9SVDogcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwLFxuICBERUJVRzogcHJvY2Vzcy5lbnYuREVCVUcgfHwgZmFsc2UsXG4gIEVDTDoge1xuICAgIHVybDogcHJvY2Vzcy5lbnYuRUNMX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdCcsXG4gIH0sXG4gIERCX0xPR0dJTkc6IGlzRGV2LFxuICBBUElfQUNDRVNTX1VTRVJOQU1FOiBwcm9jZXNzLmVudi5BUElfQUNDRVNTX1VTRVJOQU1FIHx8IG51bGwsXG4gIEFQSV9BQ0NFU1NfUEFTU1dPUkQ6IHByb2Nlc3MuZW52LkFQSV9BQ0NFU1NfUEFTU1dPUkQgfHwgbnVsbCxcbiAgREI6IHtcbiAgICB1c2VybmFtZTogcHJvY2Vzcy5lbnYuREJfVVNFUk5BTUUgfHwgJ2FkbWluJyxcbiAgICBwYXNzd29yZDogcHJvY2Vzcy5lbnYuREJfUEFTU1dPUkQgfHwgJ3Bhc3N3b3JkJyxcbiAgICBkYXRhYmFzZTogcHJvY2Vzcy5lbnYuREJfREFUQUJBU0UgfHwgJ2RhdGFiYXNlJyxcbiAgICBob3N0OiBwcm9jZXNzLmVudi5EQl9IT1NUIHx8ICdsb2NhbGhvc3QnLFxuICAgIG9wdGlvbnM6IHsgZW5jcnlwdDogdHJ1ZSB9LFxuICAgIG9wZXJhdG9yc0FsaWFzZXM6IGZhbHNlLFxuICB9LFxuICBJTlRFTlRTOiB7XG4gICAgcmVnaXN0ZXI6IHByb2Nlc3MuZW52LklOVEVOVF9SRUdJU1RFUiB8fCAnJyxcbiAgICByZWdpc3Rlcm1haWw6IHByb2Nlc3MuZW52LklOVEVOVF9SRUdJU1RFUk1BSUwgfHwgJycsXG4gICAgcmVnaXN0ZXJuYW1lOiBwcm9jZXNzLmVudi5JTlRFTlRfUkVHSVNURVJOQU1FIHx8ICcnLFxuICAgIHJlZ2lzdGVyY29kZTogcHJvY2Vzcy5lbnYuSU5URU5UX1JFR0lTVEVSQ09ERSB8fCAnJyxcbiAgICBvcGVuaW5ndGltZTogcHJvY2Vzcy5lbnYuSU5URU5UX09QRU5USU1FIHx8ICcnLFxuICAgIGNvbnRhY3Q6IHByb2Nlc3MuZW52LklOVEVOVF9DT05UQUNUIHx8ICcnLFxuICAgIHNlcnZpY2VzOiBwcm9jZXNzLmVudi5JTlRFTlRfU0VSVklDRVMgfHwgJycsXG4gICAgcmVsYWlzY29saXM6IHByb2Nlc3MuZW52LklOVEVOVF9SRUxBSVNDT0xJUyB8fCAnJyxcbiAgICBmYWxsYmFjazogcHJvY2Vzcy5lbnYuSU5URU5UX0ZBTExCQUNLIHx8ICcnLFxuICB9LFxuICBDT05URVhUUzoge1xuICAgIEZVTEZJTEw6IHtcbiAgICAgIHJlZ2lzdGVyOiBwcm9jZXNzLmVudi5DT05URVhUX0ZVTEZJTExfUkVHSVNURVIgfHwgJycsXG4gICAgICByZWdpc3Rlcm1haWw6IHByb2Nlc3MuZW52LkNPTlRFWFRfRlVMRklMTF9SRUdJU1RFUk1BSUwgfHwgJycsXG4gICAgICByZWdpc3RlcmNvZGU6IHByb2Nlc3MuZW52LkNPTlRFWFRfRlVMRklMTF9SRUdJU1RFUkNPREUgfHwgJycsXG4gICAgfSxcbiAgfSxcbiAgTFVJUzoge1xuICAgIGFwcElkOiBwcm9jZXNzLmVudi5MVUlTX0FQUF9JRCB8fCAnJyxcbiAgICBlbmRwb2ludEtleTogcHJvY2Vzcy5lbnYuTFVJU19FTkRQT0lOVF9LRVkgfHwgJycsXG4gIH0sXG4gIFdBVFNPTjoge1xuICAgIGFwaUtleTogcHJvY2Vzcy5lbnYuV0FUU09OX0FQSV9LRVkgfHwgJycsXG4gICAgYXNzaXN0YW50SWQ6IHByb2Nlc3MuZW52LldBVFNPTl9BU1NJU1RBTlRfSUQgfHwgJycsXG4gIH0sXG4gIFRXSUxJTzoge1xuICAgIGFjY291bnRJZDogcHJvY2Vzcy5lbnYuVFdJTElPX0FDQ09VTlRfSUQgfHwgJ3R3aWxpb19hY2NvdW50JyxcbiAgICBhdXRoVG9rZW46IHByb2Nlc3MuZW52LlRXSUxJT19BVVRIX1RPS0VOIHx8ICdhdXRoX3Rva2VuJyxcbiAgfSxcbiAgUExJVk86IHtcbiAgICBhY2NvdW50SWQ6IHByb2Nlc3MuZW52LlBMSVZPX0FDQ09VTlRfSUQgfHwgJ3BsaXZvX2FjY291bnQnLFxuICAgIGF1dGhUb2tlbjogcHJvY2Vzcy5lbnYuUExJVk9fQVVUSF9UT0tFTiB8fCAnYXV0aF90b2tlbicsXG4gIH0sXG4gIE5FWE1POiB7XG4gICAgYXBpS2V5OiBwcm9jZXNzLmVudi5ORVhNT19BUElfS0VZIHx8ICduZXhtb19hcGlfa2V5JyxcbiAgICBhcGlTZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWE1PX0FQSV9TRUNSRVQgfHwgJ25leG1vX2FwaV9zZWNyZXQnLFxuICB9LFxuICBESUFMT0dfRkxPVzoge1xuICAgIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfUFJPSkVDVF9JRCB8fCAnYWdlbnQnLFxuICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19FTlZJUk9OTUVOVCB8fCAnZHJhZnQnLFxuICAgIGxhbmd1YWdlQ29kZTogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfTEFOR1VBR0VfQ09ERSB8fCAnZW4nLFxuICAgIHVzZXJuYW1lOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19VU0VSTkFNRSB8fCBudWxsLFxuICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19QQVNTV09SRCB8fCBudWxsLFxuICAgIGNvbnNvbGVTZXJ2aWNlOiBwcm9jZXNzLmVudi5ESUFMT0dfRkxPV19DT05TT0xFX1NFUlZJQ0UgfHwgJ2NvbnNvbGUnLFxuICAgIGNvbnNvbGVTZXJ2aWNlSWQ6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX0NPTlNPTEVfU0VSVklDRV9JRCB8fCAnNjkxMCcsXG4gICAgY29uc29sZVVzZXJJZDogcHJvY2Vzcy5lbnYuRElBTE9HX0ZMT1dfQ09OU09MRV9VU0VSX0lEIHx8ICcwREhTRU5KUDlaJyxcbiAgICBjb25zb2xlVXNlclR5cGU6IHByb2Nlc3MuZW52LkRJQUxPR19GTE9XX1VTRVJfVFlQRSB8fCAndXNlcklkJyxcbiAgfSxcbiAgU0xBQ0s6IHtcbiAgICBhcGlUb2tlbjogcHJvY2Vzcy5lbnYuU0xBQ0tfQVBJX1RPS0VOIHx8ICdzbGFja190b2tlbicsXG4gIH0sXG4gIE1BSUw6IHtcbiAgICBlbmFibGU6IHByb2Nlc3MuZW52Lk1BSUxfRU5BQkxFID09PSAndHJ1ZScgfHwgZmFsc2UsXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuTUFJTF9TTVRQX1NFUlZFUiB8fCAnbG9jYWxob3N0JyxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5NQUlMX1NNVFBfUE9SVCB8fCAyNSxcbiAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk1BSUxfU01UUF9TRUNVUkUgPT09ICd0cnVlJyB8fCBmYWxzZSxcbiAgICByZWNpcGllbnQ6IHByb2Nlc3MuZW52Lk1BSUxfUkVDSVBJRU5UIHx8IHVuZGVmaW5lZCxcbiAgICBzZW5kZXI6IHByb2Nlc3MuZW52Lk1BSUxfU0VOREVSIHx8ICcnLFxuICAgIHNhdjogcHJvY2Vzcy5lbnYuTUFJTF9TQVYgfHwgJ3NlcnZpY2Utc2lAZWFzeS1saWZlLmZyJyxcbiAgfSxcbiAgTkVEQjoge1xuICAgIHR0bDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuTkVEQl9UVEwgfHwgJzAnLCAxMCksXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0Q29uZmlnO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaGFuZGxlbWVzc2FnZSBmcm9tICcuLi91dGlscy9oYW5kbGVtZXNzYWdlLnV0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihcbiAgcmVxOiBleHByZXNzLlJlcXVlc3QsXG4gIHJlczogZXhwcmVzcy5SZXNwb25zZSxcbiAgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24sXG4pIHtcbiAgdHJ5IHtcbiAgICBpZiAocmVxLnF1ZXJ5Lm1zZyAmJiByZXEucXVlcnkuZnJvbSkge1xuICAgICAgY29uc3QgbXNnID0gcmVxLnF1ZXJ5Lm1zZztcbiAgICAgIGNvbnN0IGZyb20gPSByZXEucXVlcnkuZnJvbTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlbWVzc2FnZShcbiAgICAgICAgbXNnLFxuICAgICAgICBmcm9tLFxuICAgICAgICAnKzMzNzU1NTM2OTEwJyxcbiAgICAgICAgJ2x1aXMnLFxuICAgICAgICAndGVsJyxcbiAgICAgICk7XG4gICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nIH0pO1xuICAgICAgcmV0dXJuIHJlcy5lbmQocmVzcG9uc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXMud3JpdGVIZWFkKDUwMCk7XG4gICAgcmV0dXJuIHJlcy5lbmQoJ0Vycm9yJyk7XG4gIH1cbiAgcmVzLndyaXRlSGVhZCg0MDQpO1xuICByZXR1cm4gcmVzLmVuZCgnTWlzc2luZyBcIm1zZ1wiIG9yIFwiZnJvbVwiJyk7XG59XG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcgfSk7XG4gIGNvbnN0IGh0bWwgPSBmcy5yZWFkRmlsZVN5bmMoXG4gICAgYEM6L1VzZXJzL1Zpc2l0ZXVyL0RvY3VtZW50cy9MaWZlZS90ZXN0cy9UZW1wbGF0ZXMvaW5kZXguaHRtbGAsXG4gICk7XG4gIHJldHVybiByZXMuZW5kKGh0bWwpO1xufVxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaGFuZGxlbWVzc2FnZSBmcm9tICcuLi91dGlscy9oYW5kbGVtZXNzYWdlLnV0aWwnO1xuaW1wb3J0IHsgV2ViQ2xpZW50IH0gZnJvbSAnQHNsYWNrL3dlYi1hcGknO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXE6IGV4cHJlc3MuUmVxdWVzdCxcbiAgcmVzOiBleHByZXNzLlJlc3BvbnNlLFxuICBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbixcbikge1xuICBjb25zb2xlLmxvZygnTmV3IHJlcXVlc3QnKTtcbiAgaWYgKHJlcS5ib2R5LmV2ZW50LnR5cGUgPT09ICdtZXNzYWdlJyAmJiAhcmVxLmJvZHkuZXZlbnQuYm90X2lkKSB7XG4gICAgY29uc3QgbXNnID0gcmVxLmJvZHkuZXZlbnQudGV4dDtcbiAgICBjb25zdCBmcm9tID0gcmVxLmJvZHkuZXZlbnQudXNlcjtcbiAgICBjb25zdCB0byA9IHJlcS5ib2R5LmV2ZW50LmNoYW5uZWw7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBoYW5kbGVtZXNzYWdlKG1zZywgZnJvbSwgdG8sICdsdWlzJywgJ3NsYWNrJyk7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICBjb25zdCByZXMgPSB7XG4gICAgICAgIHR5cGU6ICdzZWN0aW9uJyxcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgIHR5cGU6ICdtcmtkd24nLFxuICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLnRleHQsXG4gICAgICAgIH0sXG4gICAgICAgIGFjY2Vzc29yeToge30sXG4gICAgICB9O1xuICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT09ICdkcm9wZG93bicpIHtcbiAgICAgICAgcmVzLmFjY2Vzc29yeSA9IHtcbiAgICAgICAgICB0eXBlOiAnc3RhdGljX3NlbGVjdCcsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICdwbGFpbl90ZXh0JyxcbiAgICAgICAgICAgIHRleHQ6ICdTw6lsZWN0aW9ubmV6IHVuIGl0ZW0nLFxuICAgICAgICAgICAgZW1vamk6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgfTtcbiAgICAgICAgcmVzcG9uc2UucGFyYW1zLmZvckVhY2goKGU6IGFueSkgPT4ge1xuICAgICAgICAgIHJlcy5hY2Nlc3Nvcnkub3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgICAgdHlwZTogJ3BsYWluX3RleHQnLFxuICAgICAgICAgICAgICB0ZXh0OiBlLnRleHQsXG4gICAgICAgICAgICAgIGVtb2ppOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbHVlOiBlLnZhbHVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdlYiA9IG5ldyBXZWJDbGllbnQoY29uZmlnLlNMQUNLLmFwaVRva2VuKTtcbiAgICAgIGF3YWl0IHdlYi5jaGF0LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdGV4dDogcmVzcG9uc2UsXG4gICAgICAgIGNoYW5uZWw6IHJlcS5ib2R5LmV2ZW50LmNoYW5uZWwsXG4gICAgICB9IGFzIGFueSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHJlcS5ib2R5KTtcbiAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJyB9KTtcbiAgcmVzLmVuZChyZXEuYm9keS5jaGFsbGVuZ2UpO1xufVxuIiwiLy8gQGZsb3dcblxuaW1wb3J0IHsgU2VxdWVsaXplLCBEYXRhVHlwZXMgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB0IGZyb20gJy4uL3V0aWxzL3RyYW5zbGF0ZS51dGlsJztcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcblxuLypjb25zdCBlY2wgPSBuZXcgU2VxdWVsaXplKFxuICAnbXlzcWw6Ly9jbHQxMzI5LWRldjpFYXN5bGlmZTIwMTBAMTk1LjIwMC43OC4yNTIvY2x0MTMyOV9kZXYnLFxuKTsqL1xuY29uc3QgZWNsID0gbmV3IFNlcXVlbGl6ZShcbiAgY29uZmlnLkRCLmRhdGFiYXNlLFxuICBjb25maWcuREIudXNlcm5hbWUsXG4gIGNvbmZpZy5EQi5wYXNzd29yZCxcbiAge1xuICAgIC4uLmNvbmZpZy5EQixcbiAgICBkaWFsZWN0OiAnbXlzcWwnLFxuICAgIGRpYWxlY3RPcHRpb25zOiB7XG4gICAgICBjaGFyc2V0OiAnbGF0aW4xJyxcbiAgICAgIGVuY3J5cHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbG9nZ2luZzogaXNEZXYsXG4gIH0sXG4pO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpdGUge1xuICBpZDogc3RyaW5nO1xuICBjb2RlOiBzdHJpbmc7XG4gIGxpYmVsbGU6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgdGVsZXBob25lOiBzdHJpbmc7XG4gIGJvdE51bWJlcjogc3RyaW5nO1xuICBob3JhaXJlczogc3RyaW5nO1xuICBpbmZvczogc3RyaW5nO1xuICBndWlkZVNlcnZpY2VzOiBzdHJpbmc7XG4gIHJlbGFpc0NvbGlzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2l0ZUdyb3VwIHtcbiAgaWQ6IHN0cmluZztcbiAgbm9tOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uY2llcmdlIHtcbiAgcHJlbm9tOiBzdHJpbmc7XG4gIG5vbTogc3RyaW5nO1xuICB0cmlncmFtbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgaWQ6IHN0cmluZztcbiAgbm9tOiBzdHJpbmc7XG4gIHByZW5vbTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICB0ZWxlcGhvbmU6IHN0cmluZztcbn1cblxudHlwZSBSZXF1ZXN0VHlwZSA9ICdTTVMnIHwgJ2Nhc2llcic7XG5cbmludGVyZmFjZSBSZXF1ZXN0IHtcbiAgdGV4dDogc3RyaW5nO1xuICB0eXBlOiBSZXF1ZXN0VHlwZTtcbiAgbnVtTG9ja2VyPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFY2wge1xuICBzdGF0aWMgZ2V0UHJlbm9tQ29uY2llcmdlKFxuICAgIGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBmb3JVc2VyOiBib29sZWFuID0gdHJ1ZSxcbiAgKSB7XG4gICAgaWYgKCFjb25jaWVyZ2VzIHx8ICFjb25jaWVyZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZvclVzZXIgPyB0KCdpbmZvcy5jb25jaWVyZ2UnKSA6ICcnO1xuICAgIH1cbiAgICBpZiAoY29uY2llcmdlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBjb25jaWVyZ2VzWzBdLnByZW5vbTtcbiAgICB9XG4gICAgaWYgKGNvbmNpZXJnZXMubGVuZ3RoID09PSAyKVxuICAgICAgcmV0dXJuIGAke2NvbmNpZXJnZXNbMF0ucHJlbm9tfSBldCAke2NvbmNpZXJnZXNbMV0ucHJlbm9tfWA7XG4gICAgcmV0dXJuIGZvclVzZXIgPyB0KCdpbmZvcy5jb25jaWVyZ2VzJykgOiAnJztcbiAgfVxuXG4gIHN0YXRpYyBpc011bHRpcGxlQ29uY2llcmdlcyhjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gY29uY2llcmdlcyAmJiBjb25jaWVyZ2VzLmxlbmd0aCA+IDE7XG4gIH1cblxuICBzdGF0aWMgZ2V0VHJpZ3JhbW1lQ29uY2llcmdlKGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIGlmICghY29uY2llcmdlcyB8fCAhY29uY2llcmdlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjb25jaWVyZ2VzWzBdLnRyaWdyYW1tZTtcbiAgfVxuICBlY2w6IFNlcXVlbGl6ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVjbCA9IGVjbDtcbiAgfVxuXG4gIGFzeW5jIGdldFNpdGVJbmZvcyhzZXJ2aWNlOiBzdHJpbmcsIHNlcnZpY2VJZDogc3RyaW5nKSB7XG4gICAgbGV0IHNlcnZpY2VDb2x1bW47XG4gICAgLy8gQ2FzIGRlIGxhIGNvbnNvbGUuIE9uIGZhaXQgdW4gcmVtcGxhY2VtZW50IGRlIHZhbGV1ciBwb3VyIGFsbGVyIGNoZXJjaGVyIHVuIGNvZGUgc2l0ZVxuICAgIGlmIChzZXJ2aWNlID09PSAnY29uc29sZScpIHNlcnZpY2VDb2x1bW4gPSAnY29ycmVzcF8wNCc7XG4gICAgZWxzZSBzZXJ2aWNlQ29sdW1uID0gc2VydmljZTtcbiAgICBjb25zdCBzaXRlczogU2l0ZVtdID0gYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIGBpZF9yZV8wM2AgQVMgYGlkYCAsIGBjb3JyZXNwXzA0YCBBUyBgY29kZWAgLCBgY2xfbGJfMDFgIEFTIGBsaWJlbGxlYCAsIGBjbF9yZV8wMV91YCBBUyBgZW1haWxgLCBgc2l0ZV90ZWxlcGhvbmVgIEFTIGB0ZWxlcGhvbmVgLCBgc2l0ZV9ob3JhaXJlc2AgQVMgYGhvcmFpcmVzYCwgYGJvdEluZm9gIEFTIGBpbmZvc2AsIGBib3ROdW1iZXJgIEZST00gYGNsaWVudGAgJyArXG4gICAgICAgIGBXSEVSRSAke3NlcnZpY2VDb2x1bW59ID0gOnNlcnZpY2VJZCBMSU1JVCAxYCxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2VydmljZUlkIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHNpdGVzICYmIHNpdGVzLmxlbmd0aClcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNpdGVzWzBdLFxuICAgICAgICBndWlkZVNlcnZpY2VzOiBgaHR0cDovL2VjbC5lYXN5LWxpZmUuZnIvZ2RzLyR7c2l0ZXNbMF0uY29kZX0ucGRmYCxcbiAgICAgICAgcmVsYWlzQ29saXM6IGBodHRwOi8vZWNsLmVhc3ktbGlmZS5mci9nZHMvJHtzaXRlc1swXS5jb2RlfV9SQy5wZGZgLFxuICAgICAgfTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2l0ZUdyb3VwcyhzaXRlSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGdyb3VwczogU2l0ZUdyb3VwW10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGNvcnJlc3BfMDFgIGFzIGlkLCBgY29ycmVzcF8wMmAgYXMgbm9tIEZST00gYGNvcnJlc3BvbmRhbmNlX2NsaWVudGAgV0hFUkUgYGlkX3JlXzAzYD06c2l0ZUlkJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2l0ZUlkIH0sXG4gICAgICB9LFxuICAgICk7XG4gICAgcmV0dXJuIGdyb3VwcztcbiAgfVxuXG4gIGFzeW5jIGdldENvbmNpZXJnZUxpc3Qoc2l0ZUNvZGU6IHN0cmluZyk6IFByb21pc2U8Q29uY2llcmdlW10+IHtcbiAgICAvLyAnTEVGVCBKT0lOIGBjbGllbnRgIE9OIGBjbGllbnRgLmBpZF9yZV8wM2A9YGNvb3JkYC5gaWRfcmVfMDNGS2AgJyArXG4gICAgLy8gJ1dIRVJFIGBjbGllbnRgLmBjb3JyZXNwXzA0YD06c2l0ZUNvZGUgYW5kIGBjb29yZGAuYGNvX2dlXzAzYD0wJyxcbiAgICBjb25zdCBjb25jaWVyZ2VzOiBDb25jaWVyZ2VbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgY29vcmRgLmBjb19yZV8wM191YCBhcyBwcmVub20sIGBjb29yZGAuYGNvX3JlXzAyX3VgIGFzIG5vbSwgYGNvb3JkYC5gY29fcmVfMDFgIGFzIHRyaWdyYW1tZSAnICtcbiAgICAgICAgJ0ZST00gYGNvb3JkaW5hdGV1cmAgYXMgYGNvb3JkYCAnICtcbiAgICAgICAgJ0xFRlQgSk9JTiBgY2xpZW50YCBPTiBgY2xpZW50YC5gY29fcmVfMDFgPWBjb29yZGAuYGNvX3JlXzAxYCAnICtcbiAgICAgICAgXCJBTkQgKGBjbGllbnRgLmBjbF9yZV8wM2AgPSAnMDAwMC0wMC0wMCcgT1IgYGNsaWVudGAuYGNsX3JlXzAzYCBJUyBOVUxMKSBcIiArXG4gICAgICAgICdXSEVSRSBgY2xpZW50YC5gY29ycmVzcF8wNGA9OnNpdGVDb2RlJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgc2l0ZUNvZGUgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gY29uY2llcmdlcztcbiAgfVxuXG4gIGFzeW5jIGdldFVzZXIoXG4gICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgc2l0ZTogU2l0ZSxcbiAgKTogUHJvbWlzZTxVc2VyIHwgbnVsbD4ge1xuICAgIGxldCB3aGVyZTtcbiAgICBzd2l0Y2ggKGlkZW50aWZpZXIpIHtcbiAgICAgIGNhc2UgJ3VzZXJJZCc6XG4gICAgICAgIHdoZXJlID0gJ2B1dGlsaXNhdGV1cmAuYGlkX3JlXzA0YD06dmFsdWUnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vYmlsZSc6XG4gICAgICAgIHdoZXJlID0gJ2B1dGlsaXNhdGV1cmAuYGlkX2NvXzA2X3VgPTp2YWx1ZSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICB3aGVyZSA9ICdsb3dlcihgdXRpbGlzYXRldXJgLmBpZF9yZV8wMV91YCkgPSBsb3dlcig6dmFsdWUpJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXJzOiBVc2VyW10gPSBhd2FpdCB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdTRUxFQ1QgYGlkX3JlXzAxX3VgIEFTIGBlbWFpbGAgLCBgaWRfcmVfMDZfdWAgQVMgYG5vbWAgLCBgaWRfcmVfMDdfdWAgQVMgYHByZW5vbWAgLCAnICtcbiAgICAgICAgJ2BpZF9jb18wNl91YCBBUyBgdGVsZXBob25lYCwgYGlkX3JlXzA0YCBBUyBgaWRgICcgK1xuICAgICAgICAnRlJPTSBgdXRpbGlzYXRldXJgICcgK1xuICAgICAgICAnSk9JTiBgY2xpZW50YCBPTiBgdXRpbGlzYXRldXJgLmBpZF9yZV8wM2AgPSBgY2xpZW50YC5gaWRfcmVfMDNgICcgK1xuICAgICAgICAnV0hFUkUgYGNsaWVudGAuYGNvcnJlc3BfMDRgPTpzaXRlQ29kZSAnICtcbiAgICAgICAgYCR7d2hlcmUgPyBgQU5EICR7d2hlcmV9YCA6ICcnfTtgLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyB2YWx1ZSwgc2l0ZUNvZGU6IHNpdGUuY29kZSB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHVzZXJzWzBdO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB1c2VyIHJlZ2lzdHJhdGlvblxuICAgKiBAcmV0dXJuIHRva2VuIHRvIGJlIHVzZWQgaW4gdXNlciBtYWlsIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIHsqfSBzaXRlXG4gICAqIEBwYXJhbSB7Kn0gdXNlcklkXG4gICAqIEBwYXJhbSB7Kn0gZW1haWxcbiAgICogQHBhcmFtIHsqfSBsYXN0TmFtZVxuICAgKiBAcGFyYW0geyp9IGdpdmVuTmFtZVxuICAgKiBAcGFyYW0geyp9IHNpdGVHcm91cFxuICAgKi9cbiAgYXN5bmMgc2F2ZVJlZ2lzdHJhdGlvbihcbiAgICBzaXRlOiBTaXRlLFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGVtYWlsOiBzdHJpbmcsXG4gICAgbGFzdE5hbWU6IHN0cmluZyxcbiAgICBnaXZlbk5hbWU6IHN0cmluZyxcbiAgICBzaXRlR3JvdXA6IFNpdGVHcm91cCB8IG51bGwgfCB1bmRlZmluZWQsXG4gICkge1xuICAgIC8vIEdldCBuZWVkZWQgc2l0ZSBpbmZvXG4gICAgY29uc3Qgc2l0ZXNJbmZvOiBhbnlbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBgaWRfcmVfMDNgIGFzIGlkLCBgZmlfZGVfMDNgIGFzIGBjYXRlZ29yeWAsIGBmaV9kZV8wNGAgYXMgYGdyb3VwYCBGUk9NIGBmb3JtX2luc2NyaXB0aW9uYCBXSEVSRSBgaWRfcmVfMDNgPTpzaXRlSWQnLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5TRUxFQ1QsXG4gICAgICAgIHJlcGxhY2VtZW50czogeyBzaXRlSWQ6IHNpdGUuaWQgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAoIXNpdGVzSW5mby5sZW5ndGggJiYgIXNpdGVzSW5mbylcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBgQ2Fubm90IHNhdmUgcmVnaXN0cmF0aW9uOiB1bmFibGUgdG8gZmluZCBzaXRlIGluZm8gZm9yICcke3NpdGUuaWR9J2AsXG4gICAgICApO1xuXG4gICAgY29uc3Qgc2l0ZUluZm8gPSBzaXRlc0luZm9bMF07XG4gICAgLy8gR2VuZXJhdGUgYSB0b2tlbiBmb3IgdXNlciBtYWlsIHZhbGlkYXRpb25cbiAgICBjb25zdCB0b2tlbiA9IHV1aWQudjQoKTtcbiAgICAvLyBJbnNlcnQgcmVnaXN0cmF0aW9uIGluIGRhdGFiYXNlXG4gICAgYXdhaXQgdGhpcy5lY2wucXVlcnkoXG4gICAgICAnSU5TRVJUIElOVE8gYGZvcm1faW5zY3JpcHRpb25fdXRpbGAoYGlkX3JlXzAzYCxgaWRfcmVfMDFfdWAsYGlkX3JlXzA2X3VgLGBpZF9yZV8wN191YCxgaWRfcmVfMDhgLGBpZF9jb18wNl91YCxgaWRfZ2VfMDRgLGBpdV90b18wMWAsYGlkX3JlXzEwYCxgaWRfaW5fMDFgLGBpZF9pbl8wMmAsYGlkX2NvXzAyX3VgKSAnICtcbiAgICAgICAgJ1ZBTFVFUyAoOnNpdGVJZCw6ZW1haWwsOmxhc3ROYW1lLDpnaXZlbk5hbWUsOmZ1bGxOYW1lLDptb2JpbGUsREFURV9GT1JNQVQoTk9XKCksIFwiJVktJW0tJWRcIiksOnRva2VuLDpjbGllbnQsOmNhdGVnb3J5LDpncm91cCw6Y3ApJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuSU5TRVJULFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICB0b2tlbixcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBzaXRlSWQ6IHNpdGUuaWQsXG4gICAgICAgICAgbGFzdE5hbWU6IGxhc3ROYW1lLnRyaW0oKS50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgIGdpdmVuTmFtZTogZ2l2ZW5OYW1lLnRyaW0oKSxcbiAgICAgICAgICBmdWxsTmFtZTogYCR7bGFzdE5hbWUudHJpbSgpLnRvVXBwZXJDYXNlKCl9ICR7Z2l2ZW5OYW1lLnRyaW0oKX1gLFxuICAgICAgICAgIG1vYmlsZTogdXNlcklkLFxuICAgICAgICAgIGNsaWVudDogc2l0ZUdyb3VwID8gc2l0ZUdyb3VwLm5vbSA6IG51bGwsXG4gICAgICAgICAgY2F0ZWdvcnk6IHNpdGVJbmZvLmNhdGVnb3J5LFxuICAgICAgICAgIGdyb3VwOiBzaXRlSW5mby5ncm91cCxcbiAgICAgICAgICBjcDogYCR7c2l0ZS5jb2RlLnN1YnN0cigwLCAyKX0wMDBgLCAvLyBUYWtlIHRoZSBkZXBhcnRtZW50IGZyb20gc2l0ZSBjb2RlIGFuZCBhZGQgdGhyZWUgMFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVVzZXJNb2JpbGUodXNlcjogVXNlcikge1xuICAgIHJldHVybiB0aGlzLmVjbC5xdWVyeShcbiAgICAgICdVUERBVEUgYHV0aWxpc2F0ZXVyYCBTRVQgJyArXG4gICAgICAgICdgaWRfY29fMDZfdWA9OnRlbGVwaG9uZSAnICtcbiAgICAgICAgJ1dIRVJFIGBpZF9yZV8wNGA9OmlkJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICB0ZWxlcGhvbmU6IHVzZXIudGVsZXBob25lLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVJlcXVlc3QoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICBzaXRlOiBTaXRlLFxuICAgIGNvbmNpZXJnZXM6IENvbmNpZXJnZVtdLFxuICAgIHVzZXI6IFVzZXIsXG4gICkge1xuICAgIGxldCByZXF1ZXN0TnVtOiBhbnlbXSA9IGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ1NFTEVDVCBDT1VOVChgZGVfcmVfMDdfdWApIEFTIGNvdW50IEZST00gYGRlbWFuZGVgICcgK1xuICAgICAgICBcIldIRVJFIGBkZV9yZV8wMV91YD06ZGF0ZSBBTkQgYGRlX3JlXzA1X3VgPD4nYWJhbmRvbl9wMSdcIixcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuU0VMRUNULFxuICAgICAgICByZXBsYWNlbWVudHM6IHsgZGF0ZTogbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJykgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAoIXJlcXVlc3ROdW0gfHwgIXJlcXVlc3ROdW0ubGVuZ3RoKVxuICAgICAgdGhyb3cgRXJyb3IoJ0Nhbm5vdCBzYXZlIHJlcXVlc3Q6IHVuYWJsZSB0byBmaW5kIGEgbmV3IHJlcXVlc3QgbnVtYmVyJyk7XG4gICAgcmVxdWVzdE51bSA9IHJlcXVlc3ROdW1bMF0uY291bnQgKyAxO1xuXG4gICAgbGV0IHJlcXVlc3RUeXBlO1xuICAgIGxldCByZXF1ZXN0VHlwZTI7XG4gICAgbGV0IHR5cGVDb2RlO1xuICAgIGxldCBkZXRhaWw7XG4gICAgbGV0IGFkZGl0aW9uO1xuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XG4gICAgICBjYXNlICdjYXNpZXInOlxuICAgICAgICByZXF1ZXN0VHlwZSA9ICdEZW1hbmRlIGNhc2llcic7XG4gICAgICAgIHJlcXVlc3RUeXBlMiA9IHJlcXVlc3QudHlwZTtcbiAgICAgICAgdHlwZUNvZGUgPSAnY2FzaSc7XG4gICAgICAgIGRldGFpbCA9IHJlcXVlc3QubnVtTG9ja2VyXG4gICAgICAgICAgPyBgY2FzaWVyOiR7cmVxdWVzdC5udW1Mb2NrZXJ9ICR7cmVxdWVzdC50ZXh0fWBcbiAgICAgICAgICA6IHJlcXVlc3QudGV4dDtcbiAgICAgICAgYWRkaXRpb24gPSByZXF1ZXN0Lm51bUxvY2tlclxuICAgICAgICAgID8gYGNhc2llcjoke3JlcXVlc3QubnVtTG9ja2VyfSAke3JlcXVlc3QudGV4dH1gXG4gICAgICAgICAgOiByZXF1ZXN0LnRleHQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnU01TJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlcXVlc3RUeXBlID0gJ0F1dHJlJztcbiAgICAgICAgcmVxdWVzdFR5cGUyID0gcmVxdWVzdC50eXBlO1xuICAgICAgICB0eXBlQ29kZSA9ICdzbXMnO1xuICAgICAgICBkZXRhaWwgPSByZXF1ZXN0LnRleHQ7XG4gICAgICAgIGFkZGl0aW9uID0gcmVxdWVzdC50ZXh0O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0UmVmID0gW1xuICAgICAgc2l0ZS5jb2RlLFxuICAgICAgbW9tZW50KCkuZm9ybWF0KCdERE1NWVlZWScpLFxuICAgICAgdHlwZUNvZGUsXG4gICAgICByZXF1ZXN0TnVtLFxuICAgIF1cbiAgICAgIC5qb2luKCdfJylcbiAgICAgIC5yZXBsYWNlKC9cXHMvZywgJ18nKTtcblxuICAgIGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgJ0lOU0VSVCBJTlRPIGBkZW1hbmRlYChgZGVfcmVfMDNfdWAsIGBkZV9yZV8wMV91YCwgYGRlX3JlXzAyX3VgLCBgZGVfcmVfMDRfdWAsICcgK1xuICAgICAgICAnYGRlX3JlXzA1X3VgLCBgZGVfcmVfMDZfdWAsIGBkZV9yZV8wN191YCwgYGRlX3JlXzA4X3VgLCBgZGVfcmVfMDlfdWAsICcgK1xuICAgICAgICAnYGRlX3JlXzEwX3VgLCBgZGVfcmVfMTRgLCBgaWRfcmVfMDRgLCBgZGVfY2FfMDFfdWApICcgK1xuICAgICAgICBcIlZBTFVFUyg6cmVxdWVzdFJlZiwgOmRhdGUsIDp0aW1lLCA6dHJpZ3JhbSwgJ0RlbWFuZGUgZW4gY291cnMgZGUgdHJhaXRlbWVudCcsIDpyZXF1ZXN0VHlwZSwgOnJlcXVlc3RUeXBlMiwgOmRldGFpbCwgOmFkZGl0aW9uLCAxLCAwLCA6dXNlcklkLCA6bnVtTG9ja2VyKVwiLFxuICAgICAge1xuICAgICAgICB0eXBlOiBTZXF1ZWxpemUuUXVlcnlUeXBlcy5JTlNFUlQsXG4gICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgIHJlcXVlc3RUeXBlLFxuICAgICAgICAgIHJlcXVlc3RUeXBlMixcbiAgICAgICAgICBkZXRhaWwsXG4gICAgICAgICAgYWRkaXRpb24sXG4gICAgICAgICAgcmVxdWVzdFJlZixcbiAgICAgICAgICBkYXRlOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQnKSxcbiAgICAgICAgICB0aW1lOiBtb21lbnQoKS5mb3JtYXQoJ0hIOm1tOnNzJyksXG4gICAgICAgICAgdHJpZ3JhbTogRWNsLmdldFRyaWdyYW1tZUNvbmNpZXJnZShjb25jaWVyZ2VzKSxcbiAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgICAgICAgbnVtTG9ja2VyOiByZXF1ZXN0Lm51bUxvY2tlciB8fCAnJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIHJldHVybiByZXF1ZXN0UmVmO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlUmVxdWVzdChyZXF1ZXN0UmVmOiBzdHJpbmcsIHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICBmdW5jdGlvbiBhZGROdW1Mb2NrZXIoZmllbGQ6IGFueSwgbnVtTG9ja2VyOiBhbnkpIHtcbiAgICAgIHJldHVybiBgXFxgJHtmaWVsZH1cXGA9Q09OQ0FUKCdjYXNpZXI6JHtudW1Mb2NrZXIgfHwgJyd9ICcsIFxcYCR7ZmllbGR9XFxgKWA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZERldGFpbHMoZmllbGQ6IGFueSwgcGFyYW1OYW1lOiBhbnkpIHtcbiAgICAgIHJldHVybiBgXFxgJHtmaWVsZH1cXGA9Q09OQ0FUKFxcYCR7ZmllbGR9XFxgLCAnICcsICR7cGFyYW1OYW1lfSlgO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgbnVtIGxvY2tlciBpZiBhZGRlZCBpbiByZXF1ZXN0IGRldGFpbHNcbiAgICBpZiAocmVxdWVzdC5udW1Mb2NrZXIpIHtcbiAgICAgIGF3YWl0IHRoaXMuZWNsLnF1ZXJ5KFxuICAgICAgICAnVVBEQVRFIGBkZW1hbmRlYCBTRVQgJyArXG4gICAgICAgICAgYCR7YWRkTnVtTG9ja2VyKCdkZV9yZV8wOF91JywgcmVxdWVzdC5udW1Mb2NrZXIpfSwgYCArXG4gICAgICAgICAgYCR7YWRkTnVtTG9ja2VyKCdkZV9yZV8wOV91JywgcmVxdWVzdC5udW1Mb2NrZXIpfSwgYCArXG4gICAgICAgICAgXCJgZGVfcmVfMDZfdWA9J0RlbWFuZGUgY2FzaWVyJywgXCIgK1xuICAgICAgICAgIFwiYGRlX3JlXzA3X3VgPSdjYXNpZXInLCBcIiArXG4gICAgICAgICAgJ2BkZV9jYV8wMV91YD06bnVtTG9ja2VyICcgK1xuICAgICAgICAgICdXSEVSRSBgZGVfcmVfMDNfdWA9OnJlcXVlc3RSZWYnLFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgICAgIHJlcGxhY2VtZW50czoge1xuICAgICAgICAgICAgcmVxdWVzdFJlZixcbiAgICAgICAgICAgIG51bUxvY2tlcjogcmVxdWVzdC5udW1Mb2NrZXIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIEFkZCByZXF1ZXN0IGRldGFpbHNcbiAgICByZXR1cm4gdGhpcy5lY2wucXVlcnkoXG4gICAgICAnVVBEQVRFIGBkZW1hbmRlYCBTRVQgJyArXG4gICAgICAgIGAke2FkZERldGFpbHMoJ2RlX3JlXzA4X3UnLCAnOmRldGFpbHMnKX0sIGAgK1xuICAgICAgICBgJHthZGREZXRhaWxzKCdkZV9yZV8wOV91JywgJzpkZXRhaWxzJyl9IGAgK1xuICAgICAgICAnV0hFUkUgYGRlX3JlXzAzX3VgPTpyZXF1ZXN0UmVmJyxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogU2VxdWVsaXplLlF1ZXJ5VHlwZXMuVVBEQVRFLFxuICAgICAgICByZXBsYWNlbWVudHM6IHtcbiAgICAgICAgICByZXF1ZXN0UmVmLFxuICAgICAgICAgIGRldGFpbHM6IHJlcXVlc3QudGV4dCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGdldFNpdGVVc2VycyhzaXRlczogc3RyaW5nW10pIHtcbiAgICBjb25zdCB3aGVyZUluID0gYCcke3NpdGVzLmpvaW4oXCInLCdcIil9J2A7XG5cbiAgICByZXR1cm4gdGhpcy5lY2wucXVlcnkoXG4gICAgICAnU0VMRUNUIERJU1RJTkNUICh1LmBpZF9jb18wNl91YCkgQVMgdGVsLCBjLnR3aWxpbyBBUyB0d2lsaW8gJyArXG4gICAgICAgICdGUk9NIGB1dGlsaXNhdGV1cmAgQVMgdSAnICtcbiAgICAgICAgJ0lOTkVSIEpPSU4gYGNsaWVudGAgQVMgYyBPTiBjLmBpZF9yZV8wM2AgPSB1LmBpZF9yZV8wM2AgJyArXG4gICAgICAgICdXSEVSRSB1LmBpZF9yZV8wM2AgSU4gJyArXG4gICAgICAgIGAoJHt3aGVyZUlufSkgYCArXG4gICAgICAgIFwiQU5EIHUuYGlkX2NvXzA2X3VgICE9ICcnIFwiICtcbiAgICAgICAgJ0FORCB1LmBpZF9jb18wNl91YCBJUyBOT1QgTlVMTCAnICtcbiAgICAgICAgXCJBTkQgKHUuYGlkX2dlXzAyYCA9ICcwMDAwLTAwLTAwJyBPUiB1LmBpZF9nZV8wMmAgSVMgTlVMTCk7XCIsXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFNlcXVlbGl6ZS5RdWVyeVR5cGVzLlNFTEVDVCxcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgVGVzdENvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMnO1xuaW1wb3J0IFNlbmRNZXNzYWdlQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9hamF4LmNvbnRyb2xsZXInO1xuaW1wb3J0IFNsYWNrQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9zbGFjay5jb250cm9sbGVyJztcbmNvbnN0IHJvdXRlcyA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnJvdXRlcy5hbGwoJy8nLCBUZXN0Q29udHJvbGxlcik7XG5yb3V0ZXMuZ2V0KCcvYWpheC9zZW5kbWVzc2FnZScsIFNlbmRNZXNzYWdlQ29udHJvbGxlcik7XG5yb3V0ZXMucG9zdCgnL3NsYWNrJywgU2xhY2tDb250cm9sbGVyKTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVzO1xuIiwiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgVGVzdFJvdXRlcyBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5cbmltcG9ydCAnLi9tb2RlbHMvZWNsJztcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG5hcHAudXNlKCcvJywgVGVzdFJvdXRlcyk7XG5cbmFwcC5saXN0ZW4oODA4MCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCBEYXRhc3RvcmUgZnJvbSAnbmVkYic7XG5pbXBvcnQgeyBDb250ZXh0cyB9IGZyb20gJy4vdHlwZXMudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XG5cbmNvbnN0IGRiID0gbmV3IERhdGFzdG9yZSh7IGZpbGVuYW1lOiAnREIvY29udGV4dHMnLCBhdXRvbG9hZDogdHJ1ZSB9KTtcblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlT2xkKCkge1xuICBjb25zdCB0dGwgPSBEYXRlLm5vdygpIC0gY29uZmlnLk5FREIudHRsICogODY0MDAwMDA7XG4gIGF3YWl0IGRiLnJlbW92ZSh7IGNyZWF0ZVRpbWU6IHsgJGx0OiB0dGwgfSB9LCB7IG11bHRpOiB0cnVlIH0pO1xufVxuXG5jb25zdCBjb3VudDogYW55ID0gYXN5bmMgKHF1ZXJ5OiBhbnkpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBkYi5jb3VudChxdWVyeSwgKGVycjogYW55LCBuYjogYW55KSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShuYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgaW5zZXJ0OiBhbnkgPSBhc3luYyAocXVlcnk6IGFueSkgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGRiLmluc2VydChxdWVyeSwgKGVycjogYW55LCBuZXdEb2M6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobmV3RG9jKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGU6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIudXBkYXRlKFxuICAgICAgeyB1c2VyOiBxdWVyeS51c2VyIH0sXG4gICAgICB7ICRzZXQ6IHsgY29udGV4dHM6IHF1ZXJ5LmNvbnRleHRzIH0gfSxcbiAgICAgIHt9LFxuICAgICAgKGVycjogYW55LCBudW1SZXBsYWNlZDogYW55KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKG51bVJlcGxhY2VkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9KTtcbn07XG5cbmNvbnN0IGZpbmRvbmU6IGFueSA9IGFzeW5jIChxdWVyeTogYW55KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgZGIuZmluZE9uZShxdWVyeSwgKGVycjogYW55LCBkb2M6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZG9jKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiBzYXZlKHVzZXI6IHN0cmluZywgYzogQ29udGV4dHMpIHtcbiAgYXdhaXQgZGVsZXRlT2xkKCk7XG4gIGNvbnN0IG5iID0gYXdhaXQgZmluZG9uZSh7IHVzZXIgfSk7XG4gIGNvbnN0IGNvbnRleHRzID0ge1xuICAgIGZ1bGZpbGw6IGMuZnVsZmlsbCxcbiAgICBzZXJ2aWNlOiBjLnNlcnZpY2UsXG4gIH07XG4gIGlmICghbmIpIHtcbiAgICAvLyBJbnNlcnRpbmcgY29udGV4dFxuICAgIGF3YWl0IGluc2VydCh7IHVzZXIsIGNvbnRleHRzLCBjcmVhdGVUaW1lOiBEYXRlLm5vdygpIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIFVwZGF0aW5nIGNvbnRleHRcbiAgICBhd2FpdCB1cGRhdGUoeyB1c2VyLCBjb250ZXh0cyB9KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkKHVzZXI6IHN0cmluZyk6IFByb21pc2U8Q29udGV4dHM+IHtcbiAgYXdhaXQgZGVsZXRlT2xkKCk7XG4gIGNvbnN0IGNvbnRleHRzID0gYXdhaXQgZmluZG9uZSh7IHVzZXIgfSk7XG4gIGlmIChjb250ZXh0cykge1xuICAgIGNvbnRleHRzLmNvbnRleHRzLnNpdGUgPSBudWxsO1xuICAgIHJldHVybiBjb250ZXh0cy5jb250ZXh0cztcbiAgfVxuICByZXR1cm4ge1xuICAgIGZ1bGZpbGw6IG51bGwsXG4gICAgc2VydmljZToge1xuICAgICAgd2F0c29uOiBudWxsLFxuICAgIH0sXG4gICAgc2l0ZTogbnVsbCxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzYXZlLFxuICBsb2FkLFxufTtcbiIsImltcG9ydCB7IFJlc3VsdCwgQ29udGV4dHMsIEludGVudCwgRnVsZmlsbFJlc3BvbnNlIH0gZnJvbSAnLi90eXBlcy51dGlsJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCAnLi4vY29uZmlnL2kxOG4nO1xuaW1wb3J0IGludGVudFJlZ2lzdGVyIGZyb20gJy4vZnVsZmlsbC9yZWdpc3Rlci5pbnRlbnQnO1xuaW1wb3J0IGludGVudERlZmF1bHQgZnJvbSAnLi9mdWxmaWxsL2RlZmF1bHQuaW50ZW50JztcbmltcG9ydCBpbnRlbnRJbmZvcyBmcm9tICcuL2Z1bGZpbGwvaW5mb3MuaW50ZW50JztcblxuZnVuY3Rpb24gY2xvbmUoc3JjOiBhbnkpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3JjKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKFxuICByZXN1bHQ6IFJlc3VsdCxcbiAgY29udGV4dHM6IENvbnRleHRzLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgLy8gUmV0dXJuICdub3QgdW5kZXJzdGFuZCcgd2hlbiBubyBpbnRlbnRzXG4gIGlmIChyZXN1bHQuaW50ZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gYXdhaXQgaW50ZW50RGVmYXVsdC5mYWxsYmFjayhudWxsLCBjb250ZXh0cywgMCwgcmVzdWx0LnF1ZXJ5LCB0eXBlcyk7XG4gIH1cbiAgLy8gR2V0IGFsbCBrbm93biBpbnRlbnRzXG4gIGNvbnN0IGludGVudHM6IEludGVudFtdID0gZ2V0Q29uZmlnKCk7XG4gIGNvbnN0IGludGVudE1hcCA9IG5ldyBNYXAoKTtcbiAgaW50ZW50cy5mb3JFYWNoKGludGVudCA9PiB7XG4gICAgaW50ZW50TWFwLnNldChpbnRlbnQubmFtZSwgaW50ZW50LmZ1bmMpO1xuICB9KTtcbiAgY29uc3QgaW50ZW50c1JlczogRnVsZmlsbFJlc3BvbnNlW10gPSBbXTtcbiAgLy8gQ2hlY2sgYWxsIGludGVudHNcbiAgYXdhaXQgcmVzdWx0LmludGVudHMucmVkdWNlKGFzeW5jIChwcmV2aW91cywgZSkgPT4ge1xuICAgIGF3YWl0IHByZXZpb3VzO1xuICAgIGxldCByZXM6IEZ1bGZpbGxSZXNwb25zZTtcbiAgICBpZiAoIWludGVudE1hcC5oYXMoZS5uYW1lKSkge1xuICAgICAgaWYgKHJlc3VsdC5yZXNwb25zZSkge1xuICAgICAgICByZXMgPSB7XG4gICAgICAgICAgY29udGV4dHMsXG4gICAgICAgICAgcmVzcG9uc2U6IHsgdGV4dDogcmVzdWx0LnJlc3BvbnNlLnRleHQsIHR5cGU6ICd0ZXh0JyB9LFxuICAgICAgICAgIGNvbmZpZGVuY2U6IDAuMDEsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXMgPSBhd2FpdCBpbnRlbnREZWZhdWx0LmZhbGxiYWNrKFxuICAgICAgICBudWxsLFxuICAgICAgICBjb250ZXh0cyxcbiAgICAgICAgMCxcbiAgICAgICAgcmVzdWx0LnF1ZXJ5LFxuICAgICAgICB0eXBlcyxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGM6IENvbnRleHRzID0gY2xvbmUoY29udGV4dHMpO1xuICAgICAgcmVzID0gYXdhaXQgaW50ZW50TWFwLmdldChlLm5hbWUpKFxuICAgICAgICByZXN1bHQuZW50aXRpZXMsXG4gICAgICAgIGMsXG4gICAgICAgIGUuY29uZmlkZW5jZSxcbiAgICAgICAgcmVzdWx0LnF1ZXJ5LFxuICAgICAgICB0eXBlcyxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChyZXMpIHtcbiAgICAgIGludGVudHNSZXMucHVzaChyZXMpO1xuICAgIH1cbiAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xuICBsZXQgcmVzcG9uc2UgPSBpbnRlbnRzUmVzWzBdO1xuICAvLyBHZXQgdGhlIG1vc3QgcHJvYmFibGUgb25lXG4gIGludGVudHNSZXMuZm9yRWFjaChlID0+IHtcbiAgICBpZiAoZSAmJiByZXNwb25zZS5jb25maWRlbmNlIDwgZS5jb25maWRlbmNlKSB7XG4gICAgICByZXNwb25zZSA9IGU7XG4gICAgfVxuICB9KTtcbiAgLy8gUmV0dXJuIGl0XG4gIHJldHVybiByZXNwb25zZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29uZmlnKCkge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLnJlZ2lzdGVyLFxuICAgICAgZnVuYzogaW50ZW50UmVnaXN0ZXIucmVnaXN0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWdpc3Rlcm1haWwsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3Rlck1haWwsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWdpc3Rlcm5hbWUsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3Rlck5hbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5yZWdpc3RlcmNvZGUsXG4gICAgICBmdW5jOiBpbnRlbnRSZWdpc3Rlci5yZWdpc3RlckNvZGUsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5vcGVuaW5ndGltZSxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLm9wZW50aW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMuY29udGFjdCxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLmNvbnRhY3QsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBjb25maWcuSU5URU5UUy5zZXJ2aWNlcyxcbiAgICAgIGZ1bmM6IGludGVudEluZm9zLnNlcnZpY2VzLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogY29uZmlnLklOVEVOVFMucmVsYWlzY29saXMsXG4gICAgICBmdW5jOiBpbnRlbnRJbmZvcy5yZWxhaXNjb2xpcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IGNvbmZpZy5JTlRFTlRTLmZhbGxiYWNrLFxuICAgICAgZnVuYzogaW50ZW50RGVmYXVsdC5mYWxsYmFjayxcbiAgICB9LFxuICBdO1xufVxuIiwiaW1wb3J0IHQgZnJvbSAnLi4vdHJhbnNsYXRlLnV0aWwnO1xuaW1wb3J0IHsgUmVzdWx0RW50aXR5LCBDb250ZXh0cywgRnVsZmlsbFJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGZhbGxiYWNrKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10gfCBudWxsLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZToge1xuICAgICAgdGV4dDogdCgnaW50ZW50LmRlZmF1bHQubm90dW5kZXJzdGFuZCcpLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZmFsbGJhY2ssXG59O1xuIiwiaW1wb3J0IHQgZnJvbSAnLi4vdHJhbnNsYXRlLnV0aWwnO1xuaW1wb3J0IHsgUmVzdWx0RW50aXR5LCBDb250ZXh0cywgRnVsZmlsbFJlc3BvbnNlIH0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgRWNsIGZyb20gJy4uLy4uL21vZGVscy9lY2wnO1xuXG5hc3luYyBmdW5jdGlvbiBvcGVudGltZShcbiAgZW50aXRpZXM6IFJlc3VsdEVudGl0eVtdLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgbGV0IHR4dCA9IHQoJ2ludGVudC5pbmZvcy5zY2hlZHVsZW5vdGZvdW5kJyk7XG4gIGlmIChjLnNpdGUpIHtcbiAgICB0eHQgPSB0KCdpbnRlbnQuaW5mb3Muc2NoZWR1bGUnLCB7XG4gICAgICBjb3VudDogYy5zaXRlLmNvbmNpZXJnZXMubGVuZ3RoLFxuICAgICAgY29uY2llcmdlR2l2ZW5OYW1lOiBFY2wuZ2V0UHJlbm9tQ29uY2llcmdlKGMuc2l0ZS5jb25jaWVyZ2VzKSxcbiAgICAgIHNpdGVzU2NoZWR1bGVzOiBjLnNpdGUuc2l0ZS5ob3JhaXJlcyxcbiAgICB9KTtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICB0ZXh0OiB0eHQsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gY29udGFjdChcbiAgZW50aXRpZXM6IFJlc3VsdEVudGl0eVtdLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgbGV0IHR4dCA9IHQoJ2ludGVudC5pbmZvcy5jb250YWN0bm90Zm91bmQnKTtcbiAgaWYgKGMuc2l0ZSkge1xuICAgIHR4dCA9IHQoJ2ludGVudC5pbmZvcy5jb250YWN0Jywge1xuICAgICAgY291bnQ6IGMuc2l0ZS5jb25jaWVyZ2VzLmxlbmd0aCxcbiAgICAgIGNvbmNpZXJnZUdpdmVuTmFtZTogRWNsLmdldFByZW5vbUNvbmNpZXJnZShjLnNpdGUuY29uY2llcmdlcyksXG4gICAgICBzaXRlRW1haWw6IGMuc2l0ZS5zaXRlLmVtYWlsLFxuICAgICAgc2l0ZVRlbGVwaG9uZTogYy5zaXRlLnNpdGUudGVsZXBob25lLFxuICAgICAgc2l0ZVNjaGVkdWxlczogYy5zaXRlLnNpdGUuaG9yYWlyZXMsXG4gICAgfSk7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29uZmlkZW5jZSxcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZToge1xuICAgICAgdGV4dDogdHh0LFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgIH0sXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlcnZpY2VzKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBsZXQgdHh0ID0gdCgnaW50ZW50LmluZm9zLnNlcnZpY2Vzbm90Zm91bmQnKTtcbiAgaWYgKGMuc2l0ZSkge1xuICAgIHR4dCA9IHQoJ2ludGVudC5pbmZvcy5zZXJ2aWNlcycsIHtcbiAgICAgIHNpdGVTZXJ2aWNlczogYy5zaXRlLnNpdGUuZ3VpZGVTZXJ2aWNlcyxcbiAgICB9KTtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb25maWRlbmNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIHJlc3BvbnNlOiB7XG4gICAgICB0ZXh0OiB0eHQsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVsYWlzY29saXMoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGxldCB0eHQgPSB0KCdpbnRlbnQuaW5mb3MucmVsYWlzY29saXNub3Rmb3VuZCcpO1xuICBpZiAoYy5zaXRlKSB7XG4gICAgdHh0ID0gdCgnaW50ZW50LmluZm9zLnJlbGFpc2NvbGlzJywge1xuICAgICAgY291bnQ6IGMuc2l0ZS5jb25jaWVyZ2VzLmxlbmd0aCxcbiAgICAgIGNvbmNpZXJnZUdpdmVuTmFtZTogRWNsLmdldFByZW5vbUNvbmNpZXJnZShjLnNpdGUuY29uY2llcmdlcyksXG4gICAgICBzaXRlUmVsYWlzQ29saXM6IGMuc2l0ZS5zaXRlLnJlbGFpc0NvbGlzLFxuICAgIH0pO1xuICB9XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgIHRleHQ6IHR4dCxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICB9LFxuICB9O1xuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG9wZW50aW1lLFxuICBjb250YWN0LFxuICBzZXJ2aWNlcyxcbiAgcmVsYWlzY29saXMsXG59O1xuIiwiaW1wb3J0IHtcbiAgQ29udGV4dHMsXG4gIFJlc3VsdEVudGl0eSxcbiAgRnVsZmlsbFJlc3BvbnNlLFxuICBGdWxmaWxsUmVzcG9uc2VSZXNwb25zZSxcbn0gZnJvbSAnLi4vdHlwZXMudXRpbCc7XG5pbXBvcnQgdCBmcm9tICcuLi90cmFuc2xhdGUudXRpbCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgRWNsLCB7IFNpdGVHcm91cCB9IGZyb20gJy4uLy4uL21vZGVscy9lY2wnO1xuaW1wb3J0IHsgc2VuZE1lc3NhZ2UgfSBmcm9tICcuLi9tZXNzYWdlLnV0aWwnO1xuXG5jb25zdCBlY2wgPSBuZXcgRWNsKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdHJhdGlvbihjOiBDb250ZXh0cywgc2l0ZUdyb3VwOiBTaXRlR3JvdXAgfCBudWxsKSB7XG4gIGlmICghYy5zaXRlIHx8ICFjLmZ1bGZpbGwgfHwgIXNpdGVHcm91cCkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgLy8gU3RvcmUgcmVnaXN0cmF0aW9uIHJlcXVlc3QgaW4gZGF0YWJhc2VcbiAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGVjbC5zYXZlUmVnaXN0cmF0aW9uKFxuICAgICAgYy5zaXRlLnNpdGUsXG4gICAgICBjLmZ1bGZpbGwudXNlcklkIHx8ICc/JyxcbiAgICAgIGMuZnVsZmlsbC5lbWFpbCxcbiAgICAgIGMuZnVsZmlsbC5sYXN0bmFtZSxcbiAgICAgIGMuZnVsZmlsbC5maXJzdG5hbWUsXG4gICAgICBzaXRlR3JvdXAsXG4gICAgKTtcbiAgICBjb25zdCBsaW5rID0gYCR7Y29uZmlnLkVDTC51cmx9L2luc2NyaXB0aW9uL3ZlcmlmX2VtYWlsLnBocD90b2s9JHt0b2tlbn1gO1xuICAgIGF3YWl0IHNlbmRNZXNzYWdlKHtcbiAgICAgIGZyb206IGMuc2l0ZS5zaXRlLmVtYWlsLFxuICAgICAgdG86IGMuZnVsZmlsbC5lbWFpbCxcbiAgICAgIHN1YmplY3Q6ICdWb3RyZSBpbnNjcmlwdGlvbiDDoCBsYSBDb25jaWVyZ2VyaWUnLFxuICAgICAgaHRtbDpcbiAgICAgICAgJzxodG1sPicgK1xuICAgICAgICAnPGhlYWQ+JyArXG4gICAgICAgICcgPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPicgK1xuICAgICAgICAnICAgcCB7JyArXG4gICAgICAgICcgICAgIHRleHQtYWxpZ246IGp1c3RpZnk7JyArXG4gICAgICAgICcgICAgIGZvbnQtZmFtaWx5OkNhbGlicmksIHNhbnMtc2VyaWY7JyArXG4gICAgICAgICcgICB9JyArXG4gICAgICAgICcgPC9zdHlsZT4nICtcbiAgICAgICAgJzwvaGVhZD4nICtcbiAgICAgICAgJzxib2R5PicgK1xuICAgICAgICBgIDxwPkJvbmpvdXIgJHtjLmZ1bGZpbGwuZmlyc3RuYW1lfSw8L3A+PGJyIC8+YCArXG4gICAgICAgICcgPHA+Tm91cyBhdm9ucyBiaWVuIHByaXMgZW4gY29tcHRlIHZvdHJlIGluc2NyaXB0aW9uIMOgIGxhIGNvbmNpZXJnZXJpZS4gJyArXG4gICAgICAgICdBZmluIGRlIHbDqXJpZmllciB2b3RyZSBhZHJlc3NlIG1haWwsIG1lcmNpIGRlIGNsaXF1ZXIgc3VyIGxlIGxpZW4gc3VpdmFudDo8L3A+JyArXG4gICAgICAgIGAgPGEgaHJlZj1cIiR7bGlua31cIj5Ww6lyaWZpZXIgbW9uIGFkcmVzc2UgbWFpbDwvYT5gICtcbiAgICAgICAgJyA8cD5VbmUgZm9pcyB2b3RyZSBhZHJlc3NlIHbDqXJpZmnDqWUsIHZvdHJlIGNvbXB0ZSBzZXJhIGFjdGlmIGRhbnMgbGVzIGRldXggam91cnMgb3V2cmFibGVzIHN1aXZhbnQgdm90cmUgaW5zY3JpcHRpb24uPC9wPjxicj4nICtcbiAgICAgICAgJyA8cD7DgCB0csOocyBiaWVudMO0dCDDoCBsYSBjb25jaWVyZ2VyaWUgITwvcD4nICtcbiAgICAgICAgJyA8cD5BdSBwbGFpc2lyIGRlIHZvdXMgcmVuZHJlIHNlcnZpY2UuPC9wPicgK1xuICAgICAgICAnPC9ib2R5PicgK1xuICAgICAgICAnPC9odG1sPicsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gU2VuZCByZWdpc3RyYXRpb24gcmVxdWVzdCBieSBtYWlsIHRvIGNvbmNpZXJnZVxuICAgIGNvbnN0IG5vbUNvbmNpZXJnZSA9IEVjbC5nZXRQcmVub21Db25jaWVyZ2UoYy5zaXRlLmNvbmNpZXJnZXMsIGZhbHNlKTtcbiAgICBhd2FpdCBzZW5kTWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgZnJvbTogY29uZmlnLk1BSUwuc2VuZGVyLFxuICAgICAgICB0bzogYy5zaXRlLnNpdGUuZW1haWwsXG4gICAgICAgIHN1YmplY3Q6IGBbTGlmZWVdIE5vdXZlbGxlIGluc2NyaXB0aW9uIMOgIHNhaXNpcmAsXG4gICAgICAgIHRleHQ6IGBTYWx1dCAke25vbUNvbmNpZXJnZX0sIGMnZXN0IExpZmVlICFcXG5cXG5MJ3V0aWxpc2F0ZXVyIHN1aXZhbnQgc291aGFpdGUgcydpbnNjcmlyZTpcXG5cXG4gIFNvbiBub206ICR7XG4gICAgICAgICAgYy5mdWxmaWxsLmxhc3RuYW1lXG4gICAgICAgIH1cXG4gIFNvbiBQcsOpbm9tOiAke2MuZnVsZmlsbC5maXJzdG5hbWV9XFxuICBTb24gRW1haWw6ICR7XG4gICAgICAgICAgYy5mdWxmaWxsLmxhc3RuYW1lXG4gICAgICAgIH1cXG4gIFNvbiBOwrA6ICR7Yy5mdWxmaWxsLnVzZXJJZCB8fCAnPyd9XFxuICBTYSBjb25jaWVyZ2VyaWU6ICR7Yy5zaXRlXG4gICAgICAgICAgLnNpdGUubGliZWxsZSB8fCAnPyd9XFxuICBTb24gY29kZSBkZSByZWdyb3VwZW1lbnQ6ICR7XG4gICAgICAgICAgc2l0ZUdyb3VwID8gc2l0ZUdyb3VwLm5vbSA6ICc/J1xuICAgICAgICB9XFxuXFxuTWVyY2kgZGUgcHJvY8OpZGVyIMOgIHNvbiBpbnNjcmlwdGlvbi5cXG5cXG5Cb25uZSBqb3VybsOpZSAhYCxcbiAgICAgIH0sXG4gICAgICB0cnVlLFxuICAgICk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXIoXG4gIGVudGl0aWVzOiBSZXN1bHRFbnRpdHlbXSxcbiAgYzogQ29udGV4dHMsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbiAgcXVlcnk6IHN0cmluZyxcbiAgdHlwZXM6IHN0cmluZ1tdLFxuKSB7XG4gIGlmICghYy5mdWxmaWxsKSByZXR1cm4gbnVsbDtcbiAgYy5mdWxmaWxsLmN0eCA9IFtjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3Rlcl07XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIGNvbmZpZGVuY2UsXG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgIHRleHQ6IHQoJ2ludGVudC5yZWdpc3Rlci5hc2ttYWlsJyksXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJNYWlsKFxuICBlbnRpdGllczogUmVzdWx0RW50aXR5W10sXG4gIGM6IENvbnRleHRzLFxuICBjb25maWRlbmNlOiBudW1iZXIsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHR5cGVzOiBzdHJpbmdbXSxcbikge1xuICBpZiAoIWMuZnVsZmlsbCkgcmV0dXJuIG51bGw7XG4gIGxldCBjb25mID0gY29uZmlkZW5jZTtcbiAgaWYgKFxuICAgIGMuZnVsZmlsbC5jdHggJiZcbiAgICBjLmZ1bGZpbGwuY3R4LmluY2x1ZGVzKGNvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVyKSAmJlxuICAgIGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4uZW1haWwnKS5sZW5ndGggPiAwXG4gICkge1xuICAgIGMuZnVsZmlsbC5lbWFpbCA9IGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ2J1aWx0aW4uZW1haWwnKVswXS52YWx1ZTtcbiAgICBjLmZ1bGZpbGwuY3R4ID0gW2NvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVybWFpbF07XG4gIH0gZWxzZSB7XG4gICAgY29uZiA9IDA7XG4gIH1cbiAgY29uc3QgcmVzOiBGdWxmaWxsUmVzcG9uc2UgPSB7XG4gICAgY29udGV4dHM6IGMsXG4gICAgcmVzcG9uc2U6IHtcbiAgICAgIHRleHQ6IHQoJ2ludGVudC5yZWdpc3Rlci5hc2tmaXJzdG5hbWUnKSxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICB9LFxuICAgIGNvbmZpZGVuY2U6IGNvbmYsXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyTmFtZShcbiAgZW50aXRpZXM6IFJlc3VsdEVudGl0eVtdLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgaWYgKCFjLmZ1bGZpbGwpIHJldHVybiBudWxsO1xuICBsZXQgY29uZiA9IGNvbmZpZGVuY2U7XG4gIGNvbnN0IHJlc3BvbnNlOiBGdWxmaWxsUmVzcG9uc2VSZXNwb25zZSA9IHtcbiAgICB0ZXh0OiAnJyxcbiAgICB0eXBlOiAndGV4dCcsXG4gICAgcGFyYW1zOiBudWxsLFxuICB9O1xuICBjb25zdCBuYW1lcyA9IGVudGl0aWVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gJ25hbWUnKTtcbiAgbGV0IG5hbWUgPSBudWxsO1xuICBpZiAobmFtZXMubGVuZ3RoID4gMCkge1xuICAgIG5hbWUgPSBuYW1lc1swXS52YWx1ZTtcbiAgfSBlbHNlIGlmIChxdWVyeS5zcGxpdCgnICcpLmxlbmd0aCA9PT0gMSkge1xuICAgIG5hbWUgPSBxdWVyeTtcbiAgfVxuICBpZiAoXG4gICAgYy5mdWxmaWxsLmN0eCAmJlxuICAgIGMuZnVsZmlsbC5jdHguaW5jbHVkZXMoY29uZmlnLkNPTlRFWFRTLkZVTEZJTEwucmVnaXN0ZXJtYWlsKSAmJlxuICAgIG5hbWVcbiAgKSB7XG4gICAgYy5mdWxmaWxsLmN0eCA9IFtjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3Rlcm1haWxdO1xuICAgIGlmIChjLmZ1bGZpbGwuZmlyc3RuYW1lKSB7XG4gICAgICBjLmZ1bGZpbGwubGFzdG5hbWUgPSBuYW1lO1xuICAgICAgaWYgKGMuc2l0ZSkge1xuICAgICAgICAvLyBVc2VyIHNpdGUgZ3JvdXAgaXMgbmVlZGVkXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IGF3YWl0IGVjbC5nZXRTaXRlR3JvdXBzKGMuc2l0ZS5zaXRlLmlkKTtcbiAgICAgICAgaWYgKGdyb3Vwcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgYy5mdWxmaWxsLmN0eCA9IFtjb25maWcuQ09OVEVYVFMuRlVMRklMTC5yZWdpc3RlcmNvZGVdO1xuICAgICAgICAgIHJlc3BvbnNlLnRleHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuYXNrY29kZScsIHtcbiAgICAgICAgICAgIGZpcnN0bmFtZTogYy5mdWxmaWxsLmZpcnN0bmFtZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAodHlwZXMuaW5jbHVkZXMoJ2Ryb3Bkb3duJykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlLnR5cGUgPSAnZHJvcGRvd24nO1xuICAgICAgICAgICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICByZXNwb25zZS5wYXJhbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGV4dDogZ3JvdXAubm9tLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpbmRleCArIDEsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgcmVzcG9uc2UudGV4dCArPSB0KCdpbnRlbnQucmVnaXN0ZXIuZ2l2ZV9zaXRlX2dyb3VwX2Nob2ljZScsIHtcbiAgICAgICAgICAgICAgICBudW1iZXI6IGluZGV4ICsgMSxcbiAgICAgICAgICAgICAgICBuYW1lOiBncm91cC5ub20sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGMuZnVsZmlsbC5jdHggPSBbXTtcbiAgICAgICAgICBpZiAocmVnaXN0cmF0aW9uKGMsIGdyb3Vwcy5sZW5ndGggPyBncm91cHNbMF0gOiBudWxsKSkge1xuICAgICAgICAgICAgcmVzcG9uc2UudGV4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5kb25lX2FmdGVyX3ZhbGlkYXRpb24nLCB7XG4gICAgICAgICAgICAgIGNvdW50OiBjLnNpdGUuY29uY2llcmdlcy5sZW5ndGgsXG4gICAgICAgICAgICAgIGNvbmNpZXJnZUdpdmVuTmFtZTogRWNsLmdldFByZW5vbUNvbmNpZXJnZShjLnNpdGUuY29uY2llcmdlcyksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UudGV4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5kb25lJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjLmZ1bGZpbGwuY3R4ID0gW2NvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVyY29kZV07XG4gICAgICAgIHJlc3BvbnNlLnRleHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuYXNrY29kZScsIHtcbiAgICAgICAgICBmaXJzdG5hbWU6IGMuZnVsZmlsbC5maXJzdG5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjLmZ1bGZpbGwuZmlyc3RuYW1lID0gbmFtZTtcbiAgICAgIHJlc3BvbnNlLnRleHQgPSB0KCdpbnRlbnQucmVnaXN0ZXIuYXNrbGFzdG5hbWUnLCB7XG4gICAgICAgIGZpcnN0bmFtZTogYy5mdWxmaWxsLmZpcnN0bmFtZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25mID0gMC45O1xuICB9IGVsc2Uge1xuICAgIGNvbmYgPSAwO1xuICB9XG4gIGNvbnN0IHJlczogRnVsZmlsbFJlc3BvbnNlID0ge1xuICAgIHJlc3BvbnNlLFxuICAgIGNvbnRleHRzOiBjLFxuICAgIGNvbmZpZGVuY2U6IGNvbmYsXG4gIH07XG4gIHJldHVybiByZXM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyQ29kZShcbiAgZW50aXRpZXM6IFJlc3VsdEVudGl0eVtdLFxuICBjOiBDb250ZXh0cyxcbiAgY29uZmlkZW5jZTogbnVtYmVyLFxuICBxdWVyeTogc3RyaW5nLFxuICB0eXBlczogc3RyaW5nW10sXG4pIHtcbiAgaWYgKCFjLmZ1bGZpbGwpIHJldHVybiBudWxsO1xuICBsZXQgY29uZiA9IGNvbmZpZGVuY2U7XG4gIGxldCB0eHQgPSAnJztcbiAgaWYgKFxuICAgIGMuZnVsZmlsbC5jdHggJiZcbiAgICBjLmZ1bGZpbGwuY3R4LmluY2x1ZGVzKGNvbmZpZy5DT05URVhUUy5GVUxGSUxMLnJlZ2lzdGVyY29kZSkgJiZcbiAgICBlbnRpdGllcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09ICdidWlsdGluLm51bWJlcicpLmxlbmd0aCA+IDAgJiZcbiAgICBjLnNpdGVcbiAgKSB7XG4gICAgY29uc3Qgc2l0ZUdyb3VwTnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICBlbnRpdGllcy5maWx0ZXIoZSA9PiBlLm5hbWUgPT09ICdidWlsdGluLm51bWJlcicpWzBdLnZhbHVlLFxuICAgICAgMTAsXG4gICAgKTtcbiAgICAvLyBDaGVjayBnaXZlbiBudW1iZXIgZXhpc3RzIGluIEVDTFxuICAgIGNvbnN0IGdyb3VwcyA9IGF3YWl0IGVjbC5nZXRTaXRlR3JvdXBzKGMuc2l0ZS5zaXRlLmlkKTtcbiAgICBjb25zdCBzaXRlR3JvdXAgPVxuICAgICAgc2l0ZUdyb3VwTnVtYmVyICYmIHNpdGVHcm91cE51bWJlciA+IDAgJiYgc2l0ZUdyb3VwTnVtYmVyIDw9IGdyb3Vwcy5sZW5ndGhcbiAgICAgICAgPyBncm91cHNbc2l0ZUdyb3VwTnVtYmVyIC0gMV1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKCFzaXRlR3JvdXApIHtcbiAgICAgIHR4dCA9IHQoJ2ludGVudC5yZWdpc3Rlci5hc2tfc2l0ZV9ncm91cF9hZ2FpbicsIHtcbiAgICAgICAgbWF4OiBncm91cHMubGVuZ3RoLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGMuZnVsZmlsbC5jdHggPSBbXTtcbiAgICAgIGMuZnVsZmlsbC5zaXRlR3JvdXAgPSBzaXRlR3JvdXBOdW1iZXI7XG4gICAgICBpZiAocmVnaXN0cmF0aW9uKGMsIHNpdGVHcm91cCkpIHtcbiAgICAgICAgdHh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmRvbmVfYWZ0ZXJfdmFsaWRhdGlvbicsIHtcbiAgICAgICAgICBjb3VudDogYy5zaXRlLmNvbmNpZXJnZXMubGVuZ3RoLFxuICAgICAgICAgIGNvbmNpZXJnZUdpdmVuTmFtZTogRWNsLmdldFByZW5vbUNvbmNpZXJnZShjLnNpdGUuY29uY2llcmdlcyksXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHh0ID0gdCgnaW50ZW50LnJlZ2lzdGVyLmRvbmUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uZiA9IDAuOTtcbiAgfSBlbHNlIHtcbiAgICBjb25mID0gMDtcbiAgfVxuICBjb25zdCByZXM6IEZ1bGZpbGxSZXNwb25zZSA9IHtcbiAgICBjb250ZXh0czogYyxcbiAgICByZXNwb25zZToge1xuICAgICAgdGV4dDogdHh0LFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgIH0sXG4gICAgY29uZmlkZW5jZTogY29uZixcbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICByZWdpc3RlcixcbiAgcmVnaXN0ZXJNYWlsLFxuICByZWdpc3Rlck5hbWUsXG4gIHJlZ2lzdGVyQ29kZSxcbn07XG4iLCJpbXBvcnQgd2F0c29uIGZyb20gJy4vc2VydmljZXMvd2F0c29uLnV0aWwnO1xuaW1wb3J0IGx1aXMgZnJvbSAnLi9zZXJ2aWNlcy9sdWlzLnV0aWwnO1xuaW1wb3J0IGZ1bGZpbGwgZnJvbSAnLi9mdWxmaWxsLnV0aWwnO1xuaW1wb3J0IENvbnRleHRzTWFuYWdlciBmcm9tICcuL2NvbnRleHRzbWFuYWdlci51dGlsJztcbmltcG9ydCBlY2wgZnJvbSAnLi4vbW9kZWxzL2VjbCc7XG5pbXBvcnQgeyBTaXRlQ29udGV4dHMsIENvbnRleHRzLCBGdWxmaWxsUmVzcG9uc2UgfSBmcm9tICcuL3R5cGVzLnV0aWwnO1xuaW1wb3J0IGkxOG4gZnJvbSAnaTE4bmV4dCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFNpdGVDb250ZXh0cyh0bzogc3RyaW5nKTogUHJvbWlzZTxTaXRlQ29udGV4dHM+IHtcbiAgY29uc3Qgc2VydmljZSA9ICd0d2lsaW8nO1xuICBpZiAoIXRvKSB0aHJvdyBFcnJvcihgVW5rbm93biB0byBmb3Igc2VydmljZSAke3NlcnZpY2V9YCk7XG4gIGNvbnN0IEVjbCA9IG5ldyBlY2woKTtcbiAgY29uc3Qgc2l0ZSA9IGF3YWl0IEVjbC5nZXRTaXRlSW5mb3Moc2VydmljZSwgdG8pO1xuICBpZiAoIXNpdGUpIHRocm93IEVycm9yKGBVbmtub3duIFNpdGUgZm9yIHNlcnZpY2UgJHtzZXJ2aWNlfSB3aXRoIGlkICR7dG99YCk7XG5cbiAgY29uc3QgY29uY2llcmdlcyA9IGF3YWl0IEVjbC5nZXRDb25jaWVyZ2VMaXN0KHNpdGUuY29kZSk7XG4gIHJldHVybiB7XG4gICAgY29uY2llcmdlcyxcbiAgICBzaXRlLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbihcbiAgbXNnOiBzdHJpbmcsXG4gIGZyb206IHN0cmluZyxcbiAgdG86IHN0cmluZyxcbiAgc2VydmljZTogc3RyaW5nLFxuICBwbGF0Zm9ybTogc3RyaW5nLFxuKSB7XG4gIC8qIEdldCBjb250ZXh0cyAqL1xuICBsZXQgY29udGV4dHM6IENvbnRleHRzID0gYXdhaXQgQ29udGV4dHNNYW5hZ2VyLmxvYWQoZnJvbSk7XG4gIGlmIChwbGF0Zm9ybSAhPT0gJ3NsYWNrJykge1xuICAgIGNvbnN0IGE6IFNpdGVDb250ZXh0cyA9IGF3YWl0IGdldFNpdGVDb250ZXh0cyh0byk7XG4gICAgY29udGV4dHMuc2l0ZSA9IGE7XG4gIH1cbiAgLyogR2V0IHNlcnZpY2UgUmVzdWx0ICovXG4gIGxldCByZXN1bHQ7XG4gIHN3aXRjaCAoc2VydmljZSkge1xuICAgIGNhc2UgJ3dhdHNvbic6XG4gICAgICByZXN1bHQgPSBhd2FpdCB3YXRzb24obXNnLCBjb250ZXh0cyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsdWlzJzpcbiAgICAgIHJlc3VsdCA9IGF3YWl0IGx1aXMobXNnLCBjb250ZXh0cyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBjb250ZXh0cyxcbiAgICAgICAgcmVzdWx0OiB7XG4gICAgICAgICAgcmVzcG9uc2U6IG51bGwsXG4gICAgICAgICAgaW50ZW50czogW10sXG4gICAgICAgICAgZW50aXRpZXM6IFtdLFxuICAgICAgICAgIHF1ZXJ5OiBtc2csXG4gICAgICAgIH0sXG4gICAgICB9O1xuICB9XG4gIGNvbnRleHRzID0gcmVzdWx0LmNvbnRleHRzO1xuICAvKiBDaGFuZ2UgbGFuZ3VhZ2UgKi9cbiAgaWYgKHRvID09PSAnKzMzNzU1NTM2OTEwJykge1xuICAgIGF3YWl0IGkxOG4uY2hhbmdlTGFuZ3VhZ2UoJ2ZyLXZzJyk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgaTE4bi5jaGFuZ2VMYW5ndWFnZSgnZnItdHUnKTtcbiAgfVxuICAvKiBEZWZpbmVzIGFjY2VwdGVkIHR5cGUgZm9yIHRoZSBwbGF0Zm9ybSAqL1xuICBsZXQgdHlwZXMgPSBbXTtcbiAgc3dpdGNoIChwbGF0Zm9ybSkge1xuICAgIGNhc2UgJ3NsYWNrJzpcbiAgICAgIHR5cGVzID0gWydidXR0b25zJywgJ2Ryb3Bkb3duJywgJ3RleHQnXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3RlbCc6XG4gICAgICB0eXBlcyA9IFsndGV4dCddO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHR5cGVzID0gWyd0ZXh0J107XG4gIH1cbiAgLyogR2V0IGZ1bGZpbGwgUmVzcG9uc2UgKi9cbiAgY29uc3QgcmVzcG9uc2U6IEZ1bGZpbGxSZXNwb25zZSA9IGF3YWl0IGZ1bGZpbGwocmVzdWx0LnJlc3VsdCwgY29udGV4dHMsIHR5cGVzKTtcbiAgLyogU2F2ZSBjb250ZXh0cyAqL1xuICBhd2FpdCBDb250ZXh0c01hbmFnZXIuc2F2ZShmcm9tLCByZXNwb25zZS5jb250ZXh0cyk7XG4gIC8qIFJldHVybiByZXNwb25zZSB0ZXh0ICovXG4gIHJldHVybiByZXNwb25zZS5yZXNwb25zZTtcbn1cbiIsImltcG9ydCAqIGFzIG5vZGVtYWlsZXIgZnJvbSAnbm9kZW1haWxlcic7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy8nO1xuXG5jb25zdCB0cmFuc3BvcnRlciA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcbiAgaG9zdDogY29uZmlnLk1BSUwuaG9zdCxcbiAgcG9ydDogY29uZmlnLk1BSUwucG9ydCxcbiAgc2VjdXJlOiBjb25maWcuTUFJTC5zZWN1cmUsXG4gIC8vIGF1dGg6IHtcbiAgLy8gICAgIHVzZXI6ICd4eHhAeHguY29tJyxcbiAgLy8gICAgIHBhc3M6ICd4eHh4J1xuICAvLyB9LFxuICB0bHM6IHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9LFxufSk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbE9wdGlvbnMge1xuICBmcm9tOiBzdHJpbmc7XG4gIHRvOiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgY2M/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgYmNjPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIHJlcGx5VG8/OiBzdHJpbmc7XG4gIHN1YmplY3Q6IHN0cmluZztcbiAgdGV4dD86IHN0cmluZztcbiAgaHRtbD86IHN0cmluZztcbiAgYXR0YWNobWVudHM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKFxuICBvcHRpb25zOiBNYWlsT3B0aW9ucyxcbiAgdGhyb3dFcnJvcjogYm9vbGVhbiA9IHRydWUsXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBpZiAoY29uZmlnLk1BSUwuZW5hYmxlKSB7XG4gICAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgdG86IGNvbmZpZy5NQUlMLnJlY2lwaWVudCB8fCBvcHRpb25zLnRvLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRyYW5zcG9ydGVyLnNlbmRNYWlsKG1haWxPcHRpb25zKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAodGhyb3dFcnJvcikgdGhyb3cgZTtcbiAgfVxufTtcbiIsImltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnJztcbmltcG9ydCB7IFJlc3VsdCwgQ29udGV4dHMgfSBmcm9tICcuLi90eXBlcy51dGlsJztcblxuY29uc3QgZXhlY3JlcXVlc3Q6IGFueSA9IGFzeW5jIChyZXE6IHN0cmluZykgPT4ge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXVudXNlZC1leHByZXNzaW9uXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdChyZXEsIChlcnI6IGFueSwgcmVzOiBhbnksIGJvZHk6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoeyByZXMsIGJvZHkgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uKG1zZzogc3RyaW5nLCBjb250ZXh0czogQ29udGV4dHMpIHtcbiAgY29uc3QgcmVzdWx0OiBSZXN1bHQgPSB7XG4gICAgcmVzcG9uc2U6IG51bGwsXG4gICAgaW50ZW50czogW10sXG4gICAgZW50aXRpZXM6IFtdLFxuICAgIHF1ZXJ5OiBtc2csXG4gIH07XG4gIHRyeSB7XG4gICAgY29uc3QgZW5kcG9pbnQgPVxuICAgICAgJ2h0dHBzOi8vd2VzdHVzLmFwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9sdWlzL3YyLjAvYXBwcy8nO1xuICAgIGNvbnN0IGFwcElkID0gY29uZmlnLkxVSVMuYXBwSWQ7XG4gICAgY29uc3QgZW5kcG9pbnRrZXkgPSBjb25maWcuTFVJUy5lbmRwb2ludEtleTtcbiAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHtcbiAgICAgIHZlcmJvc2U6IHRydWUsXG4gICAgICBxOiBtc2csXG4gICAgICAnc3Vic2NyaXB0aW9uLWtleSc6IGVuZHBvaW50a2V5LFxuICAgIH07XG4gICAgY29uc3QgcmVxID0gYCR7ZW5kcG9pbnR9JHthcHBJZH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkocXVlcnlQYXJhbXMpfWA7XG4gICAgbGV0IHJlcyA9IGF3YWl0IGV4ZWNyZXF1ZXN0KHJlcSk7XG4gICAgcmVzID0gSlNPTi5wYXJzZShyZXMuYm9keSk7XG4gICAgcmVzLmludGVudHMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuaW50ZW50cy5wdXNoKHtcbiAgICAgICAgbmFtZTogZS5pbnRlbnQsXG4gICAgICAgIGNvbmZpZGVuY2U6IGUuc2NvcmUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXN1bHQuZW50aXRpZXMgPSBbXTtcbiAgICByZXMuZW50aXRpZXMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuZW50aXRpZXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGUudHlwZSxcbiAgICAgICAgdmFsdWU6IGUuZW50aXR5LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgcmVzdWx0LCBjb250ZXh0cyB9O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4geyByZXN1bHQsIGNvbnRleHRzIH07XG4gIH1cbn1cbiIsImltcG9ydCB3YXRzb24gZnJvbSAnd2F0c29uLWRldmVsb3Blci1jbG91ZC9hc3Npc3RhbnQvdjInO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0IHsgUmVzdWx0LCBDb250ZXh0cyB9IGZyb20gJy4uL3R5cGVzLnV0aWwnO1xuXG5jb25zdCBjcmVhdGVTZXNzaW9uOiBhbnkgPSBhc3luYyAoYXNzaXN0YW50OiBhbnksIG9iajogYW55KSA9PiB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW51c2VkLWV4cHJlc3Npb25cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBhc3Npc3RhbnQuY3JlYXRlU2Vzc2lvbihvYmosIChlcnI6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3Qgc2VuZE1lc3NhZ2U6IGFueSA9IGFzeW5jIChhc3Npc3RhbnQ6IGFueSwgb2JqOiBhbnkpID0+IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnVzZWQtZXhwcmVzc2lvblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGFzc2lzdGFudC5tZXNzYWdlKG9iaiwgKGVycjogYW55LCByZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24obXNnOiBzdHJpbmcsIGNvbnRleHRzOiBDb250ZXh0cykge1xuICBjb25zdCByZXN1bHQ6IFJlc3VsdCA9IHtcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICBpbnRlbnRzOiBbXSxcbiAgICBlbnRpdGllczogW10sXG4gICAgcXVlcnk6IG1zZyxcbiAgfTtcbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgYXNzaXN0YW50XG4gICAgY29uc3QgYXNzaXN0YW50ID0gbmV3IHdhdHNvbih7XG4gICAgICBpYW1fYXBpa2V5OiBjb25maWcuV0FUU09OLmFwaUtleSxcbiAgICAgIHZlcnNpb246ICcyMDE4LTA5LTIwJyxcbiAgICAgIHVybDogJ2h0dHBzOi8vZ2F0ZXdheS1sb24ud2F0c29ucGxhdGZvcm0ubmV0L2Fzc2lzdGFudC9hcGknLFxuICAgIH0pO1xuICAgIGNvbnN0IGFzc2lzdGFudElkID0gY29uZmlnLldBVFNPTi5hc3Npc3RhbnRJZDtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgY3JlYXRlU2Vzc2lvbihhc3Npc3RhbnQsIHtcbiAgICAgIGFzc2lzdGFudF9pZDogYXNzaXN0YW50SWQsXG4gICAgfSk7XG4gICAgY29uc3Qgc2Vzc2lvbklkID0gc2Vzc2lvbi5zZXNzaW9uX2lkO1xuICAgIGNvbnRleHRzLnNlcnZpY2Uud2F0c29uSWQgPSBzZXNzaW9uSWQ7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgc2VuZE1lc3NhZ2UoYXNzaXN0YW50LCB7XG4gICAgICBhc3Npc3RhbnRfaWQ6IGFzc2lzdGFudElkLFxuICAgICAgc2Vzc2lvbl9pZDogc2Vzc2lvbklkLFxuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgbWVzc2FnZV90eXBlOiAndGV4dCcsXG4gICAgICAgIHRleHQ6IG1zZyxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHJldHVybl9jb250ZXh0OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNvbnRleHRzOiBjb250ZXh0cy5zZXJ2aWNlLndhdHNvbixcbiAgICB9KTtcbiAgICBjb250ZXh0cy5zZXJ2aWNlLndhdHNvbiA9IHJlcy5jb250ZXh0O1xuICAgIHJlc3VsdC5yZXNwb25zZSA9IHtcbiAgICAgIHR5cGU6IHJlcy5vdXRwdXQuZ2VuZXJpY1swXS5yZXNwb25zZV90eXBlLFxuICAgICAgdGV4dDogcmVzLm91dHB1dC5nZW5lcmljWzBdLnRleHQsXG4gICAgfTtcbiAgICByZXMub3V0cHV0LmludGVudHMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuaW50ZW50cy5wdXNoKHtcbiAgICAgICAgY29uZmlkZW5jZTogZS5jb25maWRlbmNlLFxuICAgICAgICBuYW1lOiBlLmludGVudCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJlc3VsdC5lbnRpdGllcyA9IFtdO1xuICAgIHJlcy5vdXRwdXQuZW50aXRpZXMuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICByZXN1bHQuZW50aXRpZXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGUuZW50aXR5LFxuICAgICAgICB2YWx1ZTogbXNnLnN1YnN0cmluZyhlLmxvY2F0aW9uWzBdLCBlLmxvY2F0aW9uWzFdKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB7IHJlc3VsdCwgY29udGV4dHMgfTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHsgcmVzdWx0LCBjb250ZXh0cyB9O1xuICB9XG59XG4iLCJpbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oa2V5OiBzdHJpbmcsIHBhcmFtczogYW55ID0gbnVsbCkge1xuICBsZXQgcGFyYW1ldGVycyA9IHBhcmFtcztcbiAgaWYgKCFwYXJhbWV0ZXJzKSB7XG4gICAgcGFyYW1ldGVycyA9IHt9O1xuICB9XG4gIHBhcmFtZXRlcnMucmV0dXJuT2JqZWN0cyA9IHRydWU7XG4gIGNvbnN0IHBvc3NpYmlsaXRpZXMgPSBpMThuZXh0LnQoa2V5LCBwYXJhbWV0ZXJzKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocG9zc2liaWxpdGllcykpIHtcbiAgICByZXR1cm4gcG9zc2liaWxpdGllc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJpbGl0aWVzLmxlbmd0aCldO1xuICB9XG4gIHJldHVybiBwb3NzaWJpbGl0aWVzO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQHNsYWNrL3dlYi1hcGlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYm9keS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaTE4bmV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpMThuZXh0LW5vZGUtZnMtYmFja2VuZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb21lbnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmVkYlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlbWFpbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInF1ZXJ5c3RyaW5nXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlcXVlc3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2F0c29uLWRldmVsb3Blci1jbG91ZC9hc3Npc3RhbnQvdjJcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==