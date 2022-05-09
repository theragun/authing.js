var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AuthenticationTokenProvider", "crypto-js/sha256", "crypto-js", "../graphqlapi", "../common/GraphqlClient", "./types", "../../types/graphql.v2", "./QrCodeAuthenticationClient", "./MfaAuthenticationClient", "../common/HttpClient", "../utils", "jwt-decode", "./SocialAuthenticationClient", "../common/PublicKeyManager", "./EnterpriseAuthenticationClient", "./BaseAuthenticationClient", "./PrincipalAuthentication"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthenticationClient = void 0;
    var AuthenticationTokenProvider_1 = require("./AuthenticationTokenProvider");
    var sha256_1 = __importDefault(require("crypto-js/sha256"));
    var crypto_js_1 = __importDefault(require("crypto-js"));
    var graphqlapi_1 = require("../graphqlapi");
    var GraphqlClient_1 = require("../common/GraphqlClient");
    var types_1 = require("./types");
    var graphql_v2_1 = require("../../types/graphql.v2");
    var QrCodeAuthenticationClient_1 = require("./QrCodeAuthenticationClient");
    var MfaAuthenticationClient_1 = require("./MfaAuthenticationClient");
    var HttpClient_1 = require("../common/HttpClient");
    var utils_1 = require("../utils");
    var jwt_decode_1 = __importDefault(require("jwt-decode"));
    var SocialAuthenticationClient_1 = require("./SocialAuthenticationClient");
    var PublicKeyManager_1 = require("../common/PublicKeyManager");
    var EnterpriseAuthenticationClient_1 = require("./EnterpriseAuthenticationClient");
    var BaseAuthenticationClient_1 = require("./BaseAuthenticationClient");
    var PrincipalAuthentication_1 = require("./PrincipalAuthentication");
    var DEFAULT_OPTIONS = {
        appId: undefined,
        tenantId: undefined,
        appHost: undefined,
        protocol: 'oidc',
        tokenEndPointAuthMethod: 'client_secret_post',
        introspectionEndPointAuthMethod: 'client_secret_post',
        revocationEndPointAuthMethod: 'client_secret_post',
        timeout: 10000,
        onError: function (code, message, data) {
            throw { code: code, message: message, data: data };
        },
        requestFrom: 'sdk',
        encryptFunction: utils_1.encrypt,
        host: 'https://core.authing.cn',
        headers: {
            'userpool-id': 'x-authing-userpool-id',
            'app-id': 'x-authing-app-id',
            'request-from': 'x-authing-request-from',
            'sdk-version': 'x-authing-sdk-version',
            'tenant-id': 'x-authing-app-tenant-id',
            lang: 'x-authing-lang'
        },
        lang: 'zh-CN'
    };
    /**
     * @class AuthenticationClient 认证核心模块
     * @description 此模块包含注册登录、重置手机号邮箱、修改账号信息等方法，是以你的终端用户（End User）的身份进行请求，适合在需要验证用户身份的情况下使用。
     *
     * @example
     *
     * 使用方法：
     *
     * \`\`\`javascript
     * import { AuthenticationClient } from "authing-js-sdk"
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * authenticationClient.registerByEmail // 使用邮箱注册
     * authenticationClient.loginByEmail // 使用邮箱登录
     * \`\`\`
     *
     *
     * @name AuthenticationClient
     */
    var AuthenticationClient = /** @class */ (function () {
        function AuthenticationClient(options) {
            Object.keys(options).forEach(function (i) { return !options[i] && delete options[i]; });
            this.options = Object.assign({}, DEFAULT_OPTIONS, options);
            this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(this.options);
            var graphqlEndpoint = this.baseClient.appHost + "/graphql/v2";
            // 子模块初始化顺序: GraphqlClient -> ManagementTokenProvider -> Others
            this.graphqlClient = new (this.options.graphqlClient || GraphqlClient_1.GraphqlClient)(graphqlEndpoint, this.options);
            this.tokenProvider = new (this.options.tokenProvider ||
                AuthenticationTokenProvider_1.AuthenticationTokenProvider)(this.options);
            this.httpClient = new (this.options.httpClient || HttpClient_1.HttpClient)(this.options, this.tokenProvider);
            this.naiveHttpClient = new HttpClient_1.NaiveHttpClient(this.options, this.tokenProvider);
            this.publicKeyManager = new PublicKeyManager_1.PublicKeyManager(this.options, this.httpClient);
            this.wxqrcode = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'WXAPP_AUTH');
            this.qrcode = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'APP_AUTH');
            this.wechatmpqrcode = new QrCodeAuthenticationClient_1.QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'WECHATMP_AUTH');
            this.mfa = new MfaAuthenticationClient_1.MfaAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
            this.social = new SocialAuthenticationClient_1.SocialAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
            this.enterprise = new EnterpriseAuthenticationClient_1.EnterpriseAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
            this.principal = new PrincipalAuthentication_1.PrincipalAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
            if (this.options.token) {
                this.setToken(this.options.token);
            }
        }
        AuthenticationClient.prototype.checkLoggedIn = function () {
            var _a;
            var user = this.tokenProvider.getUser();
            if (user) {
                return user.id;
            }
            var token = this.tokenProvider.getToken();
            if (!token) {
                throw new Error('请先登录！');
            }
            var decoded = jwt_decode_1.default(token);
            var userId = decoded.sub || ((_a = decoded.data) === null || _a === void 0 ? void 0 : _a.id);
            if (!userId) {
                throw new Error('不合法的 accessToken');
            }
            return userId;
        };
        AuthenticationClient.prototype.setCurrentUser = function (user) {
            this.tokenProvider.setUser(user);
        };
        AuthenticationClient.prototype.setToken = function (token) {
            this.tokenProvider.setToken(token);
        };
        /**
         * @name registerByEmail
         * @name_zh 使用邮箱注册
         * @description 使用邮箱注册，此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
         *
         * @param {string} email 邮箱
         * @param {string} password 密码
         * @param {RegisterProfile} [profile] 用户资料
         * @param {Object} [options]
         * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
         * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         * @example
         *
         * authenticationClient.registerByEmail(
         *  'test@example.com',
         *  'passw0rd',
         *  {
         *    nickname: 'Nick'
         *  },
         *  {
         *    generateToken: true
         *  }
         * )
         *
         * @example
         * authenticationClient.registerByEmail('test@example.com', 'passw0rd')
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.registerByEmail = function (email, password, profile, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, forceLogin, _b, generateToken, clientIp, params, context, customData, phoneToken, _c, _d, _e, extraParams, extraContext, user;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            options = options || {};
                            profile = profile || {};
                            _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b, clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData, phoneToken = options.phoneToken;
                            _d = (_c = this.options).encryptFunction;
                            _e = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _d.apply(_c, _e.concat([_f.sent(), this.options.encryption]))];
                        case 2:
                            password = _f.sent();
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.registerByEmail(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        email: email,
                                        password: password,
                                        profile: profile,
                                        forceLogin: forceLogin,
                                        generateToken: generateToken,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext,
                                        phoneToken: phoneToken
                                    }
                                })];
                        case 3:
                            user = (_f.sent()).registerByEmail;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name registerByUsername
         * @name_zh 使用用户名注册
         * @description 使用用户名注册
         *
         * @param {string} username 用户名
         * @param {string} password 密码
         * @param {RegisterProfile} [profile] 用户资料
         * @param {Object} [options]
         * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
         * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         *
         * @example
         *
         * authenticationClient.registerByUsername(
         *  'bob',
         *  'passw0rd',
         *  {
         *    nickname: 'Nick'
         *  },
         *  {
         *    generateToken: true
         *  }
         * )
         *
         * @example
         * authenticationClient.registerByUsername('bob', 'passw0rd')
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.registerByUsername = function (username, password, profile, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, forceLogin, _b, generateToken, clientIp, params, context, customData, phoneToken, emailToken, _c, _d, _e, extraParams, extraContext, user;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            options = options || {};
                            profile = profile || {};
                            _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b, clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData, phoneToken = options.phoneToken, emailToken = options.emailToken;
                            _d = (_c = this.options).encryptFunction;
                            _e = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _d.apply(_c, _e.concat([_f.sent(), this.options.encryption]))];
                        case 2:
                            password = _f.sent();
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.registerByUsername(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        username: username,
                                        password: password,
                                        profile: profile,
                                        forceLogin: forceLogin,
                                        generateToken: generateToken,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext,
                                        phoneToken: phoneToken,
                                        emailToken: emailToken
                                    }
                                })];
                        case 3:
                            user = (_f.sent()).registerByUsername;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name registerByPhoneCode
         * @name_zh 使用手机号注册
         * @description 使用手机号注册，你可以同时设置该账号的初始密码。发送短信的接口请见 sendSmsCode
         *
         * @param {string} phone 手机号
         * @param {string} code 短信验证码
         * @param {string} password 初始密码
         * @param {RegisterProfile} [profile] 用户资料
         * @param {Object} [options]
         * @param {boolean} [options.forceLogin] 是否走一遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
         * @param {boolean} [options.generateToken] 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         * @example
         *
         * authenticationClient.registerByPhoneCode(
         *  '176xxxx7041',
         *  '1234',
         *  'passw0rd',
         *  {
         *    nickname: 'Nick'
         *  },
         *  {
         *    generateToken: true
         *  }
         * )
         *
         * @example
         * authenticationClient.registerByPhoneCode('176xxxx7041', '1234')
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.registerByPhoneCode = function (phone, code, password, profile, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, forceLogin, _b, generateToken, clientIp, params, context, customData, phoneCountryCode, emailToken, _c, _d, _e, extraParams, extraContext, user;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            options = options || {};
                            profile = profile || {};
                            _a = options.forceLogin, forceLogin = _a === void 0 ? false : _a, _b = options.generateToken, generateToken = _b === void 0 ? false : _b, clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData, phoneCountryCode = options.phoneCountryCode, emailToken = options.emailToken;
                            if (!password) return [3 /*break*/, 3];
                            _d = (_c = this.options).encryptFunction;
                            _e = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _d.apply(_c, _e.concat([_f.sent(), this.options.encryption]))];
                        case 2:
                            password = _f.sent();
                            _f.label = 3;
                        case 3:
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.registerByPhoneCode(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        phone: phone,
                                        code: code,
                                        phoneCountryCode: phoneCountryCode,
                                        password: password,
                                        profile: profile,
                                        forceLogin: forceLogin,
                                        generateToken: generateToken,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext,
                                        emailToken: emailToken
                                    }
                                })];
                        case 4:
                            user = (_f.sent()).registerByPhoneCode;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name checkPasswordStrength
         * @name_zh 检查密码强度
         * @description 检查密码强度，详情请见: https://docs.authing.co/v2/guides/security/config-password.html
         *
         * @param {string} password
         * @example
         * authenticationClient.checkPasswordStrength('weak')
         *
         * @example
         * authenticationClient.checkPasswordStrength('strongPassw0rd!')
         *
         * @returns {Promise<CheckPasswordStrengthResult>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.checkPasswordStrength = function (password) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.checkPasswordStrength(this.graphqlClient, this.tokenProvider, { password: password })];
                        case 1:
                            result = (_a.sent()).checkPasswordStrength;
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @name sendSmsCode
         * @name_zh 发送短信验证码
         * @description 发送短信验证码, 短信验证码的有效时间为 60 s。
         *
         * @param {string} phone
         * @example
         * authenticationClient.sendSmsCode('176xxxx6754')
         *
         * @returns {Promise<CommonMessage>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.sendSmsCode = function (phone, phoneCountryCode) {
            return __awaiter(this, void 0, void 0, function () {
                var api, params, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/sms/send";
                            params = { phone: phone };
                            if (phoneCountryCode) {
                                params.phoneCountryCode = phoneCountryCode;
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: params,
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name loginByEmail
         * @name_zh 使用邮箱登录
         * @description 使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，可以使用 pipeline 对此类请求进行拦截。
         *
         * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
         *
         * @param {string} email 邮箱
         * @param {string} password 密码
         * @param {Object} [options]
         * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
         * @param {string} [options.captchaCode] 图形验证码
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         * @example
         *
         * authenticationClient.loginByEmail(
         *  'test@example.com',
         *  'passw0rd',
         *  {
         *    autoRegister: true，
         *    captchaCode: 'xj72'
         *  }
         * )
         *
         * @example
         * authenticationClient.loginByEmail('test@example.com', 'passw0rd')
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.loginByEmail = function (email, password, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, autoRegister, captchaCode, clientIp, params, context, customData, _b, _c, _d, extraParams, extraContext, user;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            options = options || {};
                            _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode, clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData;
                            _c = (_b = this.options).encryptFunction;
                            _d = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), this.options.encryption]))];
                        case 2:
                            password = _e.sent();
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.loginByEmail(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        email: email,
                                        password: password,
                                        autoRegister: autoRegister,
                                        captchaCode: captchaCode,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext
                                    }
                                })];
                        case 3:
                            user = (_e.sent()).loginByEmail;
                            if (user.customData) {
                                // @ts-ignore
                                user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                            }
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name loginByUsername
         * @name_zh 使用用户名登录
         * @description 使用用户名登录。
         *
         * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
         *
         * @param {string} username 用户名
         * @param {string} password 密码
         * @param {Object} [options]
         * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
         * @param {string} [options.captchaCode] 图形验证码
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         *
         * @example
         *
         * authenticationClient.loginByEmail(
         *  'test@example.com',
         *  'passw0rd',
         *  {
         *    autoRegister: true，
         *    captchaCode: 'xj72'
         *  }
         * )
         *
         * @example
         * authenticationClient.loginByEmail('test@example.com', 'passw0rd')
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.loginByUsername = function (username, password, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, autoRegister, captchaCode, clientIp, params, context, customData, _b, _c, _d, extraParams, extraContext, user;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            options = options || {};
                            _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, captchaCode = options.captchaCode, clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData;
                            _c = (_b = this.options).encryptFunction;
                            _d = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), this.options.encryption]))];
                        case 2:
                            password = _e.sent();
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.loginByUsername(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        username: username,
                                        password: password,
                                        autoRegister: autoRegister,
                                        captchaCode: captchaCode,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext
                                    }
                                })];
                        case 3:
                            user = (_e.sent()).loginByUsername;
                            if (user.customData) {
                                // @ts-ignore
                                user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                            }
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name loginByPhoneCode
         * @name_zh 使用手机号验证码登录
         * @description 使用手机号验证码登录。
         *
         *
         * @param {string} phone 手机号
         * @param {string} code 短信验证码
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         * @example
         *
         * authenticationClient.loginByPhoneCode(
         *  '176xxxx7041',
         *  '1234',
         * )
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.loginByPhoneCode = function (phone, code, options) {
            return __awaiter(this, void 0, void 0, function () {
                var clientIp, params, context, customData, phoneCountryCode, extraParams, extraContext, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options || {};
                            clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData, phoneCountryCode = options.phoneCountryCode;
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.loginByPhoneCode(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        phone: phone,
                                        code: code,
                                        phoneCountryCode: phoneCountryCode,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext
                                    }
                                })];
                        case 1:
                            user = (_a.sent()).loginByPhoneCode;
                            if (user.customData) {
                                // @ts-ignore
                                user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                            }
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name loginByPhonePassword
         * @name_zh 使用手机号密码登录
         * @description 使用手机号密码登录。
         *
         *
         * @param {string} phone 手机号
         * @param {string} password 密码
         * @param {Object} [options]
         * @param {string} [options.captchaCode] 图形验证码
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         * @example
         *
         * authenticationClient.loginByPhonePassword(
         *  '176xxxx7041',
         *  'passw0rd',
         *  {
         *    captchaCode: 'xj72'
         *  }
         * )
         *
         * @example
         * authenticationClient.loginByPhonePassword('176xxxx7041', 'passw0rd')
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.loginByPhonePassword = function (phone, password, options) {
            return __awaiter(this, void 0, void 0, function () {
                var captchaCode, _a, autoRegister, clientIp, params, context, customData, _b, _c, _d, extraParams, extraContext, user;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            options = options || {};
                            captchaCode = options.captchaCode, _a = options.autoRegister, autoRegister = _a === void 0 ? false : _a, clientIp = options.clientIp, params = options.params, context = options.context, customData = options.customData;
                            _c = (_b = this.options).encryptFunction;
                            _d = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent(), this.options.encryption]))];
                        case 2:
                            password = _e.sent();
                            extraParams = null;
                            if (customData) {
                                extraParams = JSON.stringify(utils_1.convertObjectToKeyValueList(customData));
                            }
                            else if (params) {
                                extraParams = JSON.stringify(params);
                            }
                            extraContext = null;
                            if (context) {
                                extraContext = JSON.stringify(context);
                            }
                            return [4 /*yield*/, graphqlapi_1.loginByPhonePassword(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        phone: phone,
                                        password: password,
                                        captchaCode: captchaCode,
                                        autoRegister: autoRegister,
                                        clientIp: clientIp,
                                        params: extraParams,
                                        context: extraContext
                                    }
                                })];
                        case 3:
                            user = (_e.sent()).loginByPhonePassword;
                            if (user.customData) {
                                // @ts-ignore
                                user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                            }
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        AuthenticationClient.prototype.loginBySubAccount = function (account, password, options) {
            return __awaiter(this, void 0, void 0, function () {
                var captchaCode, clientIp, _a, _b, _c, user;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            options = options || {};
                            captchaCode = options.captchaCode, clientIp = options.clientIp;
                            _b = (_a = this.options).encryptFunction;
                            _c = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent(), this.options.encryption]))];
                        case 2:
                            password = _d.sent();
                            return [4 /*yield*/, graphqlapi_1.loginBySubAccount(this.graphqlClient, this.tokenProvider, {
                                    account: account,
                                    password: password,
                                    captchaCode: captchaCode,
                                    clientIp: clientIp
                                })];
                        case 3:
                            user = (_d.sent()).loginBySubAccount;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name checkLoginStatus
         * @name_zh 检测 Token 登录状态
         * @description 检测 Token 登录状态
         *
         * @param {string} token 用户的登录凭证 token
         *
         * @example
         *
         * authenticationClient.checkLoginStatus('TOKEN')
         *
         * @returns {Promise<JwtTokenStatus>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.checkLoginStatus = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.checkLoginStatus(this.graphqlClient, this.tokenProvider, {
                                token: token
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.checkLoginStatus];
                    }
                });
            });
        };
        /**
         * @name sendEmail
         * @name_zh 发送邮件
         * @description 发送邮件
         *
         * @param {string} email 邮箱
         * @param {EmailScene} scene 发送场景，可选值为 RESET_PASSWORD（发送重置密码邮件，邮件中包含验证码）、VerifyEmail（发送验证邮箱的邮件）、ChangeEmail（发送修改邮箱邮件，邮件中包含验证码）
         *
         * @example
         *
         * import { EmailScene } from "authing-js-sdk"
         * authenticationClient.sendEmail('test@example.com', EmailScene.RESET_PASSWORD)
         *
         * @returns {Promise<CommonMessage>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.sendEmail = function (email, scene) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.sendEmail(this.graphqlClient, this.tokenProvider, { email: email, scene: scene })];
                        case 1:
                            data = (_a.sent()).sendEmail;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name resetPasswordByPhoneCode
         * @name_zh 通过短信验证码重置密码
         * @description 通过短信验证码重置密码，你需要先调用 sendSmsCode 接口发送重置密码邮件。
         *
         * @param {string} phone 手机号
         * @param {string} code 验证码
         * @param {string} newPassword 新的密码
         *
         * @example
         *
         * authenticationClient.resetPasswordByPhoneCode('176xxxx7041', '1234', 'passw0rd')
         *
         * @returns {Promise<CommonMessage>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.resetPasswordByPhoneCode = function (phone, code, newPassword, phoneCountryCode) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, data;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.options).encryptFunction;
                            _c = [newPassword];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent(), this.options.encryption]))];
                        case 2:
                            newPassword = _d.sent();
                            return [4 /*yield*/, graphqlapi_1.resetPassword(this.graphqlClient, this.tokenProvider, {
                                    phone: phone,
                                    code: code,
                                    newPassword: newPassword,
                                    phoneCountryCode: phoneCountryCode,
                                })];
                        case 3:
                            data = (_d.sent()).resetPassword;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name resetPasswordByEmailCode
         * @name_zh 通过邮件验证码重置密码
         * @description 通过邮件验证码重置密码，你需要先调用 sendEmail 接口发送重置密码邮件。
         *
         * @param {string} phone 手机号
         * @param {string} code 验证码
         * @param {string} newPassword 新的密码
         *
         * @example
         *
         * authenticationClient.resetPasswordByEmailCode('test@example.com', '1234', 'passw0rd')
         *
         * @returns {Promise<CommonMessage>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.resetPasswordByEmailCode = function (email, code, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, data;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.options).encryptFunction;
                            _c = [newPassword];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent(), this.options.encryption]))];
                        case 2:
                            newPassword = _d.sent();
                            return [4 /*yield*/, graphqlapi_1.resetPassword(this.graphqlClient, this.tokenProvider, {
                                    email: email,
                                    code: code,
                                    newPassword: newPassword
                                })];
                        case 3:
                            data = (_d.sent()).resetPassword;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        AuthenticationClient.prototype.resetPasswordByFirstLoginToken = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var token, password, _a, _b, _c, data;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            token = params.token, password = params.password;
                            _b = (_a = this.options).encryptFunction;
                            _c = [password];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_d.sent(), this.options.encryption]))];
                        case 2:
                            password = _d.sent();
                            return [4 /*yield*/, graphqlapi_1.resetPasswordByFirstLoginToken(this.graphqlClient, this.tokenProvider, {
                                    token: token,
                                    password: password
                                })];
                        case 3:
                            data = (_d.sent()).resetPasswordByFirstLoginToken;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        AuthenticationClient.prototype.resetPasswordByForceResetToken = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var token, newPassword, oldPassword, _a, _b, _c, _d, _e, _f, data;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            token = params.token, newPassword = params.newPassword, oldPassword = params.oldPassword;
                            _b = (_a = this.options).encryptFunction;
                            _c = [newPassword];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([_g.sent(), this.options.encryption]))];
                        case 2:
                            newPassword = _g.sent();
                            _e = (_d = this.options).encryptFunction;
                            _f = [oldPassword];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 3: return [4 /*yield*/, _e.apply(_d, _f.concat([_g.sent(), this.options.encryption]))];
                        case 4:
                            oldPassword = _g.sent();
                            return [4 /*yield*/, graphqlapi_1.resetPasswordByForceResetToken(this.graphqlClient, this.tokenProvider, {
                                    token: token,
                                    oldPassword: oldPassword,
                                    newPassword: newPassword
                                })];
                        case 5:
                            data = (_g.sent()).resetPasswordByForceResetToken;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name updateProfile
         * @name_zh 修改用户资料
         * @description 修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 updatePhone、updateEmail、updatePassword 接口。
         *
         * @param {UpdateUserInput} updates 修改的用户资料
         * @param {string} updates.username 用户名
         * @param {string} updates.nickname 昵称
         * @param {string} updates.photo 头像
         * @param {string} updates.company 公司
         * @param {string} updates.browser 浏览器
         * @param {string} updates.device 设备
         * @param {string} updates.lastIP 最近登录的 IP
         * @param {string} updates.name Name
         * @param {string} updates.givenName Given Name
         * @param {string} updates.familyName Family Name
         * @param {string} updates.middleName Middle Name
         * @param {string} updates.profile Profile Url
         * @param {string} updates.preferredUsername Preferred Name
         * @param {string} updates.website 个人网站
         * @param {string} updates.gender 性别, F 表示男性、W 表示女性、未知表示 U
         * @param {string} updates.birthdate 生日
         * @param {string} updates.zoneinfo 时区
         * @param {string} updates.locale 语言
         * @param {string} updates.address 地址
         * @param {string} updates.streetAddress 街道地址
         * @param {string} updates.locality
         * @param {string} updates.region 地域
         * @param {string} updates.postalCode 邮编
         * @param {string} updates.city 城市
         * @param {string} updates.province 省份
         * @param {string} updates.country 国家
         *
         * @example
         *
         * authenticationClient.updateProfile({
         *  nickname: "Nick",
         *  lastIp: "111.111.111.111"
         * })
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.updateProfile = function (updates, options) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, _a, emailToken, phoneToken, updated;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            _a = options || {}, emailToken = _a.emailToken, phoneToken = _a.phoneToken;
                            if (updates && updates.password) {
                                delete updates.password;
                            }
                            return [4 /*yield*/, graphqlapi_1.updateUser(this.graphqlClient, this.tokenProvider, {
                                    id: userId,
                                    input: updates,
                                    emailToken: emailToken,
                                    phoneToken: phoneToken
                                })];
                        case 1:
                            updated = (_b.sent()).updateUser;
                            this.setCurrentUser(updated);
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        /**
         * @name updatePassword
         * @name_zh 更新用户密码
         * @description 更新用户密码
         *
         * @param {string} newPassword 新密码
         * @param {string} [oldPassword] 旧密码，如果用户没有设置密码，可以不填。
         *
         * @example
         *
         * authenticationClient.updatePassword('passw0rd') // 由手机号、社会化登录等其他方式注册的，首次没有设置密码，oldPassword 留空。
         *
         * @example
         *
         * authenticationClient.updatePassword('passw0rd', 'oldPassw0rd') // 用户之前设置了密码
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.updatePassword = function (newPassword, oldPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, user;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            _a = newPassword;
                            if (!_a) return [3 /*break*/, 3];
                            _c = (_b = this.options).encryptFunction;
                            _d = [newPassword];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_j.sent(), this.options.encryption]))];
                        case 2:
                            _a = (_j.sent());
                            _j.label = 3;
                        case 3:
                            newPassword = _a;
                            _e = oldPassword;
                            if (!_e) return [3 /*break*/, 6];
                            _g = (_f = this.options).encryptFunction;
                            _h = [oldPassword];
                            return [4 /*yield*/, this.publicKeyManager.getPublicKey()];
                        case 4: return [4 /*yield*/, _g.apply(_f, _h.concat([_j.sent(), this.options.encryption]))];
                        case 5:
                            _e = (_j.sent());
                            _j.label = 6;
                        case 6:
                            oldPassword = _e;
                            return [4 /*yield*/, graphqlapi_1.updatePassword(this.graphqlClient, this.tokenProvider, {
                                    newPassword: newPassword,
                                    oldPassword: oldPassword
                                })];
                        case 7:
                            user = (_j.sent()).updatePassword;
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name updatePhone
         * @name_zh 更新用户手机号
         * @description 更新用户手机号。和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。
         * 也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。
         * 开发者也可以选择不开启 “验证原有手机号“ ，可以在 Authing 控制台 的 设置目录下的安全信息模块进行关闭。
         * 用户首次绑定手机号请使用 bindPhone 接口。
         *
         * @param {string} phone 新手机号
         * @param {string} phoneCode 新手机号的验证码
         * @param {string} [oldPhone] 旧手机号
         * @param {string} [oldPhoneCode] 旧手机号的验证码
         *
         * @example
         *
         * authenticationClient.updatePhone('176xxxx7041', '1234') // 关闭了“验证原有手机号“选项
         *
         * @example
         *
         * authenticationClient.updatePhone('176xxxx7041', '1234', '156xxxx9876', '1234') // 开启了“验证原有手机号“选项
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.updatePhone = function (phone, phoneCode, oldPhone, oldPhoneCode, phoneCountryCode, oldPhoneCountryCode) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.updatePhone(this.graphqlClient, this.tokenProvider, {
                                phone: phone,
                                phoneCode: phoneCode,
                                oldPhone: oldPhone,
                                oldPhoneCode: oldPhoneCode,
                                phoneCountryCode: phoneCountryCode,
                                oldPhoneCountryCode: oldPhoneCountryCode,
                            })];
                        case 1:
                            user = (_a.sent()).updatePhone;
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name updateEmail
         * @name_zh 更新用户邮箱
         * @description 如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。
         * 开发者也可以选择不开启 “验证原有邮箱“ ，可以在 Authing 控制台 的 设置目录下的安全信息模块进行关闭。
         * 用户首次绑定手机号请使用 bindEmail 接口。
         *
         * @param {string} email 新邮箱
         * @param {string} emailCode 新邮箱的验证码
         * @param {string} [oldEmail] 旧邮箱
         * @param {string} [oldEmailCode] 旧邮箱的验证码
         *
         * @example
         *
         * authenticationClient.updateEmail('test@example.com', '1234') // 关闭了“验证原有邮箱“选项
         *
         * @example
         *
         * authenticationClient.updateEmail('test@example.com', '1234', 'test2@example.com', '1234') // 开启了“验证原有邮箱“选项
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.updateEmail = function (email, emailCode, oldEmail, oldEmailCode) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.updateEmail(this.graphqlClient, this.tokenProvider, {
                                email: email,
                                emailCode: emailCode,
                                oldEmail: oldEmail,
                                oldEmailCode: oldEmailCode
                            })];
                        case 1:
                            user = (_a.sent()).updateEmail;
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name refreshToken
         * @name_zh 刷新当前用户的 token
         * @description 刷新当前用户的 token，调用此接口要求先登录。
         *
         * @example
         *
         * authenticationClient.updateEmail()
         *
         * @returns {Promise<RefreshToken>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.refreshToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.refreshToken(this.graphqlClient, this.tokenProvider, {})];
                        case 1:
                            data = (_a.sent()).refreshToken;
                            this.setToken(data.token);
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name linkAccount
         * @name_zh 关联账号
         * @description 将社交账号绑定到主账号（手机号、邮箱账号）。
         *
         * @param {Object} options
         * @param {string} options.primaryUserToken 主账号 Token
         * @param {string} options.secondaryUserToken 社交账号 Token
         *
         * @example
         *
         * authenticationClient.linkAccount({ primaryUserToken: '', secondaryUserToken: '' })
         *
         * @returns {{code: 200, message: "绑定成功"}}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.linkAccount = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.baseClient.appHost + "/api/v2/users/link",
                                data: {
                                    primaryUserToken: options.primaryUserToken,
                                    secondaryUserToken: options.secondaryUserToken
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '绑定成功' }];
                    }
                });
            });
        };
        /**
         * @name unLinkAccount
         * @name_zh 解除账号绑定
         * @description 将社交账号从主账号（手机号、邮箱账号）解绑。
         *
         * @param {Object} options
         * @param {string} options.primaryUserToken 主账号 Token
         * @param {string} options.provider 社交账号的提供商名称
         *
         * @example
         *
         * authenticationClient.unLinkAccount({ primaryUserToken: '', provider: 'wechat:pc' })
         *
         * @returns {{code: 200, message: "解绑成功"}}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.unLinkAccount = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.baseClient.appHost + "/api/v2/users/unlink",
                                data: {
                                    primaryUserToken: options.primaryUserToken,
                                    provider: options.provider
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '解绑成功' }];
                    }
                });
            });
        };
        /**
         * @name bindPhone
         * @name_zh 绑定手机号
         * @description 用户初次绑定手机号，如果需要修改手机号请使用 updatePhone 接口。
         *
         * @param {string} phone
         * @param {string} phoneCode
         *
         * @example
         *
         * authenticationClient.bindPhone('176xxxx7041', '1234')
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.bindPhone = function (phone, phoneCode, phoneCountryCode) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.bindPhone(this.graphqlClient, this.tokenProvider, {
                                phone: phone,
                                phoneCode: phoneCode,
                                phoneCountryCode: phoneCountryCode,
                            })];
                        case 1:
                            user = (_a.sent()).bindPhone;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name unbindPhone
         * @name_zh 解绑手机号
         * @description 用户解绑手机号
         *
         * @example
         *
         * authenticationClient.unbindPhone()
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.unbindPhone = function () {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.unbindPhone(this.graphqlClient, this.tokenProvider, {})];
                        case 1:
                            user = (_a.sent()).unbindPhone;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name bindEmail
         * @name_zh 绑定邮箱号
         * @description 用户邮箱号
         *
         * @param {string} email
         * @param {string} emailCode
         *
         * @example
         *
         * authenticationClient.bindEmail('test@example.com', '1234')
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.bindEmail = function (email, emailCode) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.bindEmail(this.graphqlClient, this.tokenProvider, {
                                email: email,
                                emailCode: emailCode
                            })];
                        case 1:
                            user = (_a.sent()).bindEmail;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name unbindEmail
         * @name_zh 解绑邮箱号
         * @description 用户解绑邮箱号
         *
         * @example
         *
         * authenticationClient.unbindPhone()
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.unbindEmail = function () {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.unbindEmail(this.graphqlClient, this.tokenProvider, {})];
                        case 1:
                            user = (_a.sent()).unbindEmail;
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name getCurrentUser
         * @name_zh 获取当前登录的用户信息
         * @description 获取当前登录的用户信息
         *
         * @example
         *
         * authenticationClient.getCurrentUser()
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.getCurrentUser = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, graphqlapi_1.user(this.graphqlClient, this.tokenProvider, {})];
                        case 1:
                            data = (_b.sent()).user;
                            if (data.customData) {
                                // @ts-ignore
                                data.customData = utils_1.convertUdvToKeyValuePair(data.customData);
                            }
                            this.setCurrentUser(data);
                            return [2 /*return*/, data];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name logout
         * @name_zh 退出登录
         * @description 退出登录，清空 localStorage 里的 user 和 token
         *
         * @example
         *
         * authenticationClient.logout()
         *
         * @returns {null}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.logout = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.baseClient.appHost + "/api/v2/logout?app_id=" + this.options.appId,
                                withCredentials: true
                            })];
                        case 1:
                            _a.sent();
                            this.tokenProvider.clearUser();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name listUdv
         * @name_zh 获取当前用户的自定义数据列表
         * @description 获取当前用户的自定义数据列表
         * @deprecated use getUdfValue instead
         *
         * @example
         *
         * authenticationClient.listUdv()
         *
         * @returns {Promise<Array<UserDefinedData>>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.listUdv = function () {
            return __awaiter(this, void 0, void 0, function () {
                var userId, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.User,
                                    targetId: userId
                                })];
                        case 1:
                            list = (_a.sent()).udv;
                            return [2 /*return*/, utils_1.convertUdv(list)];
                    }
                });
            });
        };
        /**
         * @name setUdv
         * @name_zh 添加自定义数据
         * @description 添加自定义数据
         *
         * @param {string} key 自定义字段的 key
         * @param {any} value 自定义数据的值，值的类型必须要和用户池定义的自定义字段类型一致。
         *
         * @example
         *
         * authenticationClient.setUdv('school', '清华大学') // 要求用户必须定义了 school 这个字段。
         *
         * @returns {Promise<Array<UserDefinedData>>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.setUdv = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            value = JSON.stringify(value);
                            return [4 /*yield*/, graphqlapi_1.setUdv(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.User,
                                    targetId: userId,
                                    key: key,
                                    value: value
                                })];
                        case 1:
                            list = (_a.sent()).setUdv;
                            return [2 /*return*/, utils_1.convertUdv(list)];
                    }
                });
            });
        };
        /**
         * @name removeUdv
         * @name_zh 删除自定义数据
         * @description 删除自定义数据
         *
         * @param key 自定义字段的 key
         *
         * @example
         *
         * authenticationClient.removeUdv('school')
         *
         *
         * @returns {Promise<Array<UserDefinedData>>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.removeUdv = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            return [4 /*yield*/, graphqlapi_1.removeUdv(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.User,
                                    targetId: userId,
                                    key: key
                                })];
                        case 1:
                            list = (_a.sent()).removeUdv;
                            return [2 /*return*/, utils_1.convertUdv(list)];
                    }
                });
            });
        };
        /**
         * @name listOrg
         * @name_zh 获取用户所在组织机构
         * @description 获取用户所在的组织机构立碑，以及他所属的节点在此组织机构内的完整路径。
         *
         * @example
         *
         * const data = await authenticationClient.listOrgs();
         *
         * @returns {Promise<UserOrgList>}
         *
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.listOrgs = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.baseClient.appHost + "/api/v2/users/me/orgs"
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @description 获取用户
         *
         */
        AuthenticationClient.prototype.listDepartments = function () {
            return __awaiter(this, void 0, void 0, function () {
                var userId, departments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            return [4 /*yield*/, graphqlapi_1.getUserDepartments(this.graphqlClient, this.tokenProvider, {
                                    id: userId
                                })];
                        case 1:
                            departments = (_a.sent()).user.departments;
                            return [2 /*return*/, departments];
                    }
                });
            });
        };
        /**
         * @name loginByLdap
         * @name_zh 使用 LDAP 用户名登录
         * @description 使用 LDAP 用户名登录。
         *
         * 如果你的用户池配置了登录失败检测，当同一  IP 下登录多次失败的时候会要求用户输入图形验证码（code 为 2000)。
         *
         * @param {string} username 用户名
         * @param {string} password 密码
         * @param {Object} [options]
         * @param {boolean} [options.autoRegister] 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
         * @param {string} [options.captchaCode] 图形验证码
         * @param {string} [options.clientIp] 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
         *
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *   appId: '应用 ID'
         * })
         *
         * authenticationClient.loginByLdap(
         *  'admin',
         *  'admin',
         * )
         *
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.loginByLdap = function (username, password, options) {
            return __awaiter(this, void 0, void 0, function () {
                var clientIp, withCustomData, api, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options || {};
                            clientIp = options.clientIp, withCustomData = options.withCustomData;
                            api = this.baseClient.appHost + "/api/v2/ldap/verify-user";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        username: username,
                                        password: password,
                                        clientIp: clientIp,
                                        withCustomData: withCustomData,
                                    }
                                })];
                        case 1:
                            user = _a.sent();
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name loginByAd
         * @name_zh 使用 AD 用户名登录
         * @description 使用 AD 用户名登录。
         *
         * @param {string} username 用户名
         * @param {string} password 密码
         *
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *   appId: '应用 ID'
         * })
         *
         * authenticationClient.loginByAd(
         *  'admin',
         *  'admin',
         * )
         *
         * @returns {Promise<User>}
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.loginByAd = function (username, password, options) {
            return __awaiter(this, void 0, void 0, function () {
                var clientIp, withCustomData, firstLevelDomain, websocketHost, api, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            options = options || {};
                            clientIp = options.clientIp, withCustomData = options.withCustomData;
                            firstLevelDomain = new URL(this.baseClient.appHost).hostname
                                .split('.')
                                .slice(1)
                                .join('.');
                            websocketHost = this.options.websocketHost || "https://ws." + firstLevelDomain;
                            api = websocketHost + "/api/v2/ad/verify-user";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        username: username,
                                        password: password,
                                        clientIp: clientIp,
                                        withCustomData: withCustomData
                                    }
                                })];
                        case 1:
                            user = _a.sent();
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @description 上传图片
         */
        AuthenticationClient.prototype.uploadPhoto = function (accept, cb) {
            accept = accept || 'image/*';
            var authing = this;
            utils_1.uploadFile({
                accept: accept,
                url: this.baseClient.appHost + "/api/v2/upload?folder=avatar"
            })
                .then(function (_a) {
                var url = _a.url;
                return cb(url);
            })
                .catch(function (_a) {
                var code = _a.code, message = _a.message;
                return authing.options.onError(code, message);
            });
        };
        /**
         * @deprecated use uploadAvatar instead
         * @description 更新用户头像
         */
        AuthenticationClient.prototype.updateAvatar = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.uploadAvatar(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @description 一键上传图片并更新用户头像
         *
         * @param {Object} options
         * @param {string} options.accept 支持的图片格式，默认为 'image/*'
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *   appId: 'APP_ID',
         *   appHost: 'https://xxx.authing.cn'
         * })
         *
         * // 会自动打开浏览器文件上传框，并自动完成图片文件上传 CDN、修改用户头像操作。
         * authenticationClient.uploadAvatar()
         *
         * // 只支持 png 格式图片
         * authenticationClient.uploadAvatar({
         *   accept: '.png'
         * })
         *
         * @returns
         */
        AuthenticationClient.prototype.uploadAvatar = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var accept, task, src, user;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            accept = (options || {}).accept;
                            this.checkLoggedIn();
                            task = new Promise(function (resolve) {
                                _this.uploadPhoto(accept, function (src) {
                                    resolve(src);
                                });
                            });
                            return [4 /*yield*/, task];
                        case 1:
                            src = _a.sent();
                            return [4 /*yield*/, this.updateProfile({ photo: src })];
                        case 2:
                            user = _a.sent();
                            this.setCurrentUser(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @description 获取当前用户的所有自定义数据
         *
         */
        AuthenticationClient.prototype.getUdfValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var userId, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.User,
                                    targetId: userId
                                })];
                        case 1:
                            list = (_a.sent()).udv;
                            return [2 /*return*/, utils_1.convertUdvToKeyValuePair(list)];
                    }
                });
            });
        };
        /**
         * @description 设置自定义字段值
         *
         */
        AuthenticationClient.prototype.setUdfValue = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (Object.keys(data).length === 0) {
                                throw new Error('empty udf value list');
                            }
                            userId = this.checkLoggedIn();
                            return [4 /*yield*/, graphqlapi_1.setUdvBatch(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.User,
                                    targetId: userId,
                                    udvList: Object.keys(data).map(function (key) { return ({
                                        key: key,
                                        value: JSON.stringify(data[key])
                                    }); })
                                })];
                        case 1:
                            result = (_a.sent()).setUdvBatch;
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * @description 删除用户自定义数据
         */
        AuthenticationClient.prototype.removeUdfValue = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            return [4 /*yield*/, graphqlapi_1.removeUdv(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.User,
                                    targetId: userId,
                                    key: key
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name getSecurityLevel
         * @name_zh 用户安全等级
         * @description 获取用户的安全等级评分
         *
         * @example
         *
         * const data = await authenticationClient.getSecurityLevel();
         *
         * @returns {Promise<SecurityLevel>}
         *
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.getSecurityLevel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.baseClient.appHost + "/api/v2/users/me/security-level"
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @description 获取用户被授权的所有资源
         *
         * @param userId
         * @param namespace
         */
        AuthenticationClient.prototype.listAuthorizedResources = function (namespace, options) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, resourceType, user, _a, list, totalCount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = this.checkLoggedIn();
                            resourceType = (options || {}).resourceType;
                            return [4 /*yield*/, graphqlapi_1.listUserAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                    id: userId,
                                    namespace: namespace,
                                    resourceType: resourceType
                                })];
                        case 1:
                            user = (_b.sent()).user;
                            if (!user) {
                                throw new Error('用户不存在');
                            }
                            _a = user.authorizedResources, list = _a.list, totalCount = _a.totalCount;
                            list = utils_1.formatAuthorizedResources(list);
                            return [2 /*return*/, {
                                    list: list,
                                    totalCount: totalCount
                                }];
                    }
                });
            });
        };
        /**
         * @description 检查用户是否存在
         */
        AuthenticationClient.prototype.isUserExists = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var username, email, phone, externalId, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            username = options.username, email = options.email, phone = options.phone, externalId = options.externalId;
                            return [4 /*yield*/, graphqlapi_1.isUserExists(this.graphqlClient, this.tokenProvider, {
                                    username: username,
                                    email: email,
                                    phone: phone,
                                    externalId: externalId
                                })];
                        case 1:
                            data = (_a.sent()).isUserExists;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name computedPasswordSecurityLevel
         * @name_zh 计算密码安全等级
         * @description 计算密码安全等级
         *
         * @example
         *
         * const data = authenticationClient.computedPasswordSecurityLevel('xxxxxxxx');
         *
         * @returns {PasswordSecurityLevel}
         *
         * @memberof AuthenticationClient
         */
        AuthenticationClient.prototype.computedPasswordSecurityLevel = function (password) {
            if (typeof password !== 'string') {
                throw 'password must be a `string`';
            }
            var highLevel = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,}$/g);
            var middleLevel = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)[^]{8,}$/g);
            if (password.match(highLevel) !== null) {
                return types_1.PasswordSecurityLevel.HIGH;
            }
            if (password.match(middleLevel) !== null) {
                return types_1.PasswordSecurityLevel.MIDDLE;
            }
            return types_1.PasswordSecurityLevel.LOW;
        };
        AuthenticationClient.prototype._generateTokenRequest = function (params) {
            var ret = {};
            // 删掉所有 undefined 的 kv
            Object.keys(params).map(function (key) {
                if (typeof params[key] !== 'undefined') {
                    ret[key] = params[key];
                }
            });
            var p = new URLSearchParams(ret);
            return p.toString();
        };
        AuthenticationClient.prototype._generateBasicAuthToken = function (appId, secret) {
            var id = appId || this.options.appId;
            var s = secret || this.options.secret;
            var token = 'Basic ' + Buffer.from(id + ':' + s).toString('base64');
            return token;
        };
        /**
         * @param {string} code 授权码 code
         * @param {string} codeVerifier 校验码 codeVerifier
         */
        AuthenticationClient.prototype._getAccessTokenByCodeWithClientSecretPost = function (code, codeVerifier) {
            return __awaiter(this, void 0, void 0, function () {
                var qstr, api, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                client_secret: this.options.secret,
                                grant_type: 'authorization_code',
                                code: code,
                                redirect_uri: this.options.redirectUri,
                                code_verifier: codeVerifier
                            });
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        /**
         * @param {string} code 授权码 code
         * @param {string} codeVerifier 校验码 codeVerifier
         */
        AuthenticationClient.prototype._getAccessTokenByCodeWithClientSecretBasic = function (code, codeVerifier) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            qstr = this._generateTokenRequest({
                                grant_type: 'authorization_code',
                                code: code,
                                redirect_uri: this.options.redirectUri,
                                code_verifier: codeVerifier
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    data: qstr,
                                    method: 'POST',
                                    url: api,
                                    headers: {
                                        Authorization: this._generateBasicAuthToken()
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        /**
         * @param {string} code 授权码 code
         * @param {string} codeVerifier 校验码 codeVerifier
         */
        AuthenticationClient.prototype._getAccessTokenByCodeWithNone = function (code, codeVerifier) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                grant_type: 'authorization_code',
                                code: code,
                                redirect_uri: this.options.redirectUri,
                                code_verifier: codeVerifier
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype.getAccessTokenByCode = function (code, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!['oauth', 'oidc'].includes(this.options.protocol)) {
                                throw new Error('初始化 AuthenticationClient 时传入的 protocol 参数必须为 oauth 或 oidc，请检查参数');
                            }
                            if (!this.options.secret &&
                                this.options.tokenEndPointAuthMethod !== 'none') {
                                throw new Error('请在初始化 AuthenticationClient 时传入 appId 和 secret 参数');
                            }
                            if (!(this.options.tokenEndPointAuthMethod === 'client_secret_post')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._getAccessTokenByCodeWithClientSecretPost(code, options === null || options === void 0 ? void 0 : options.codeVerifier)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!(this.options.tokenEndPointAuthMethod === 'client_secret_basic')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._getAccessTokenByCodeWithClientSecretBasic(code, options === null || options === void 0 ? void 0 : options.codeVerifier)];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4:
                            if (!(this.options.tokenEndPointAuthMethod === 'none')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this._getAccessTokenByCodeWithNone(code, options === null || options === void 0 ? void 0 : options.codeVerifier)];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        AuthenticationClient.prototype.generateCodeChallenge = function () {
            return utils_1.generateRandomString(43);
        };
        AuthenticationClient.prototype.getCodeChallengeDigest = function (options) {
            if (!options) {
                throw new Error('请提供 options 参数，options.codeChallenge 为一个长度大于等于 43 的字符串，options.method 可选值为 S256、plain');
            }
            if (!options.codeChallenge) {
                throw new Error('请提供 options.codeChallenge，值为一个长度大于等于 43 的字符串');
            }
            var _a = options.method, method = _a === void 0 ? 'S256' : _a;
            if (method === 'S256') {
                // url safe base64
                return sha256_1.default(options.codeChallenge)
                    .toString(crypto_js_1.default.enc.Base64)
                    .replace(/\+/g, '-')
                    .replace(/\//g, '_')
                    .replace(/=/g, '');
            }
            if (method === 'plain') {
                return options.codeChallenge;
            }
            throw new Error('不支持的 options.method，可选值为 S256、plain');
        };
        AuthenticationClient.prototype.getAccessTokenByClientCredentials = function (scope, options) {
            return __awaiter(this, void 0, void 0, function () {
                var i, s, qstr, api, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!scope) {
                                throw new Error('请传入 scope 参数，请看文档：https://docs.authing.cn/v2/guides/authorization/m2m-authz.html');
                            }
                            if (!options) {
                                throw new Error('请在调用本方法时传入 { accessKey: string, accessSecret: string }，请看文档：https://docs.authing.cn/v2/guides/authorization/m2m-authz.html'
                                // '请在初始化 AuthenticationClient 时传入 appId 和 secret 参数或者在调用本方法时传入 { accessKey: string, accessSecret: string }，请看文档：https://docs.authing.cn/v2/guides/authorization/m2m-authz.html'
                                );
                            }
                            i = (options === null || options === void 0 ? void 0 : options.accessKey) || this.options.appId;
                            s = (options === null || options === void 0 ? void 0 : options.accessSecret) || this.options.secret;
                            qstr = this._generateTokenRequest({
                                client_id: i,
                                client_secret: s,
                                grant_type: 'client_credentials',
                                scope: scope
                            });
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype.getUserInfoByAccessToken = function (accessToken, options) {
            return __awaiter(this, void 0, void 0, function () {
                var api, userInfo, userInfo, userInfo, userInfo, userInfo, userInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (options) {
                                if (options.method && !['POST', 'GET'].includes(options.method)) {
                                    throw new Error('options.method 参数的可选值为 POST、GET，请检查输入');
                                }
                                if (options.tokenPlace &&
                                    !['query', 'header', 'body'].includes(options.tokenPlace)) {
                                    throw new Error('options.tokenPlace 参数的可选值为 query、header、body，请检查输入');
                                }
                                if (options.method === 'GET' && options.tokenPlace === 'body') {
                                    throw new Error('options.method 参数为 GET 时，options.tokenPlace 参数不能为 body');
                                }
                                options.method = options.method || 'GET';
                                options.tokenPlace = options.tokenPlace || 'query';
                            }
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/me";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/me";
                            }
                            if (!((options === null || options === void 0 ? void 0 : options.method) === 'POST')) return [3 /*break*/, 7];
                            if (!((options === null || options === void 0 ? void 0 : options.tokenPlace) === 'header')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    headers: {
                                        Authorization: 'Bearer ' + accessToken
                                    }
                                })];
                        case 1:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                        case 2:
                            if (!((options === null || options === void 0 ? void 0 : options.tokenPlace) === 'query')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    params: {
                                        access_token: accessToken
                                    }
                                })];
                        case 3:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                        case 4:
                            if (!((options === null || options === void 0 ? void 0 : options.tokenPlace) === 'body')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: utils_1.serialize({
                                        access_token: accessToken
                                    })
                                })];
                        case 5:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                        case 6: return [3 /*break*/, 14];
                        case 7:
                            if (!((options === null || options === void 0 ? void 0 : options.method) === 'GET')) return [3 /*break*/, 12];
                            if (!((options === null || options === void 0 ? void 0 : options.tokenPlace) === 'header')) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'GET',
                                    url: api,
                                    headers: {
                                        Authorization: 'Bearer ' + accessToken
                                    }
                                })];
                        case 8:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                        case 9:
                            if (!((options === null || options === void 0 ? void 0 : options.tokenPlace) === 'query')) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'GET',
                                    url: api,
                                    params: {
                                        access_token: accessToken
                                    }
                                })];
                        case 10:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                        case 11: return [3 /*break*/, 14];
                        case 12: return [4 /*yield*/, this.naiveHttpClient.request({
                                method: 'GET',
                                url: api,
                                params: {
                                    access_token: accessToken
                                }
                            })];
                        case 13:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        AuthenticationClient.prototype.buildAuthorizeUrl = function (options) {
            if (!this.baseClient.appHost) {
                throw new Error('请在初始化 AuthenticationClient 时传入应用域名 appHost 参数，形如：https://app1.authing.cn');
            }
            if (this.options.protocol === 'oidc') {
                return this._buildOidcAuthorizeUrl(options);
            }
            if (this.options.protocol === 'oauth') {
                return this._buildOauthAuthorizeUrl(options);
            }
            if (this.options.protocol === 'saml') {
                return this._buildSamlAuthorizeUrl();
            }
            if (this.options.protocol === 'cas') {
                return this._buildCasAuthorizeUrl(options);
            }
            throw new Error('不支持的协议类型，请在初始化 AuthenticationClient 时传入 protocol 参数，可选值为 oidc、oauth、saml、cas');
        };
        AuthenticationClient.prototype._buildOidcAuthorizeUrl = function (options) {
            var map = {
                appId: 'client_id',
                scope: 'scope',
                state: 'state',
                nonce: 'nonce',
                responseMode: 'response_mode',
                responseType: 'response_type',
                redirectUri: 'redirect_uri',
                codeChallenge: 'code_challenge',
                codeChallengeMethod: 'code_challenge_method',
                tenantId: 'tenant_id',
            };
            var res = {
                nonce: Math.random()
                    .toString()
                    .slice(2),
                state: Math.random()
                    .toString()
                    .slice(2),
                scope: 'openid profile email phone address',
                client_id: this.options.appId,
                redirect_uri: this.options.redirectUri,
                response_type: 'code'
            };
            Object.keys(map).forEach(function (k) {
                if (options && options[k]) {
                    if (k === 'scope' && options.scope.includes('offline_access')) {
                        res.prompt = 'consent';
                    }
                    res[map[k]] = options[k];
                }
            });
            var params = new URLSearchParams(res);
            var authorizeUrl = this.baseClient.appHost + '/oidc/auth?' + params.toString();
            return authorizeUrl;
        };
        AuthenticationClient.prototype._buildOauthAuthorizeUrl = function (options) {
            var map = {
                appId: 'client_id',
                scope: 'scope',
                state: 'state',
                responseType: 'response_type',
                redirectUri: 'redirect_uri'
            };
            var res = {
                state: Math.random()
                    .toString()
                    .slice(2),
                scope: 'user',
                client_id: this.options.appId,
                redirect_uri: this.options.redirectUri,
                response_type: 'code'
            };
            Object.keys(map).forEach(function (k) {
                if (options && options[k]) {
                    res[map[k]] = options[k];
                }
            });
            var params = new URLSearchParams(res);
            var authorizeUrl = this.baseClient.appHost + '/oauth/auth?' + params.toString();
            return authorizeUrl;
        };
        AuthenticationClient.prototype._buildSamlAuthorizeUrl = function () {
            return this.baseClient.appHost + '/api/v2/saml-idp/' + this.options.appId;
        };
        AuthenticationClient.prototype._buildCasAuthorizeUrl = function (options) {
            if (options === null || options === void 0 ? void 0 : options.service) {
                return this.baseClient.appHost + "/cas-idp/" + this.options.appId + "?service=" + (options === null || options === void 0 ? void 0 : options.service);
            }
            return this.baseClient.appHost + "/cas-idp/" + this.options.appId;
        };
        AuthenticationClient.prototype._buildCasLogoutUrl = function (options) {
            if (options === null || options === void 0 ? void 0 : options.redirectUri) {
                return (this.baseClient.appHost + '/cas-idp/logout?url=' + options.redirectUri);
            }
            return this.baseClient.appHost + "/cas-idp/logout";
        };
        AuthenticationClient.prototype._buildOidcLogoutUrl = function (options) {
            if (options && !(options.idToken && options.redirectUri)) {
                throw new Error('必须同时传入 idToken 和 redirectUri 参数，或者同时都不传入');
            }
            if (options === null || options === void 0 ? void 0 : options.redirectUri) {
                return this.baseClient.appHost + "/oidc/session/end?id_token_hint=" + options.idToken + "&post_logout_redirect_uri=" + options.redirectUri;
            }
            return this.baseClient.appHost + "/oidc/session/end";
        };
        AuthenticationClient.prototype._buildEasyLogoutUrl = function (options) {
            if (options === null || options === void 0 ? void 0 : options.redirectUri) {
                return this.baseClient.appHost + "/login/profile/logout?redirect_uri=" + options.redirectUri;
            }
            return this.baseClient.appHost + "/login/profile/logout";
        };
        AuthenticationClient.prototype.buildLogoutUrl = function (options) {
            if (this.options.protocol === 'cas') {
                return this._buildCasLogoutUrl(options);
            }
            if (this.options.protocol === 'oidc' && (options === null || options === void 0 ? void 0 : options.expert)) {
                return this._buildOidcLogoutUrl(options);
            }
            return this._buildEasyLogoutUrl(options);
        };
        AuthenticationClient.prototype._getNewAccessTokenByRefreshTokenWithClientSecretPost = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var qstr, api, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                client_secret: this.options.secret,
                                grant_type: 'refresh_token',
                                refresh_token: refreshToken
                            });
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype._getNewAccessTokenByRefreshTokenWithClientSecretBasic = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            qstr = this._generateTokenRequest({
                                grant_type: 'refresh_token',
                                refresh_token: refreshToken
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    data: qstr,
                                    method: 'POST',
                                    url: api,
                                    headers: {
                                        Authorization: this._generateBasicAuthToken()
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype._getNewAccessTokenByRefreshTokenWithNone = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token";
                            }
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                grant_type: 'refresh_token',
                                refresh_token: refreshToken
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype.getNewAccessTokenByRefreshToken = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!['oauth', 'oidc'].includes(this.options.protocol)) {
                                throw new Error('初始化 AuthenticationClient 时传入的 protocol 参数必须为 oauth 或 oidc，请检查参数');
                            }
                            if (!this.options.secret &&
                                this.options.tokenEndPointAuthMethod !== 'none') {
                                throw new Error('请在初始化 AuthenticationClient 时传入 appId 和 secret 参数');
                            }
                            if (!(this.options.tokenEndPointAuthMethod === 'client_secret_post')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._getNewAccessTokenByRefreshTokenWithClientSecretPost(refreshToken)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!(this.options.tokenEndPointAuthMethod === 'client_secret_basic')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._getNewAccessTokenByRefreshTokenWithClientSecretBasic(refreshToken)];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4:
                            if (!(this.options.tokenEndPointAuthMethod === 'none')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this._getNewAccessTokenByRefreshTokenWithNone(refreshToken)];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        AuthenticationClient.prototype._revokeTokenWithClientSecretPost = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var qstr, api, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                client_secret: this.options.secret,
                                token: token
                            });
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token/revocation";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token/revocation";
                            }
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype._revokeTokenWithClientSecretBasic = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token/revocation";
                            }
                            else if (this.options.protocol === 'oauth') {
                                throw new Error('OAuth 2.0 暂不支持用 client_secret_basic 模式身份验证撤回 Token');
                                api = this.baseClient.appHost + "/oauth/token/revocation";
                            }
                            qstr = this._generateTokenRequest({
                                token: token
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    data: qstr,
                                    method: 'POST',
                                    url: api,
                                    headers: {
                                        Authorization: this._generateBasicAuthToken()
                                    }
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthenticationClient.prototype._revokeTokenWithNone = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token/revocation";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token/revocation";
                            }
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                token: token
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthenticationClient.prototype.revokeToken = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!['oauth', 'oidc'].includes(this.options.protocol)) {
                                throw new Error('初始化 AuthenticationClient 时传入的 protocol 参数必须为 oauth 或 oidc，请检查参数');
                            }
                            if (!this.options.secret &&
                                this.options.revocationEndPointAuthMethod !== 'none') {
                                throw new Error('请在初始化 AuthenticationClient 时传入 appId 和 secret 参数');
                            }
                            if (!(this.options.revocationEndPointAuthMethod === 'client_secret_post')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._revokeTokenWithClientSecretPost(token)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            if (!(this.options.revocationEndPointAuthMethod === 'client_secret_basic')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._revokeTokenWithClientSecretBasic(token)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 4:
                            if (!(this.options.revocationEndPointAuthMethod === 'none')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this._revokeTokenWithNone(token)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 6: throw new Error('初始化 AuthenticationClient 时传入的 revocationEndPointAuthMethod 参数可选值为 client_secret_base、client_secret_post、none，请检查参数');
                    }
                });
            });
        };
        AuthenticationClient.prototype._introspectTokenWithClientSecretPost = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var qstr, api, tokenSet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                client_secret: this.options.secret,
                                token: token
                            });
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token/introspection";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token/introspection";
                            }
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                })];
                        case 1:
                            tokenSet = _a.sent();
                            return [2 /*return*/, tokenSet];
                    }
                });
            });
        };
        AuthenticationClient.prototype._introspectTokenWithClientSecretBasic = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token/introspection";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token/introspection";
                            }
                            qstr = this._generateTokenRequest({
                                token: token
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    data: qstr,
                                    method: 'POST',
                                    url: api,
                                    headers: {
                                        Authorization: this._generateBasicAuthToken()
                                    }
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthenticationClient.prototype._introspectTokenWithNone = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var api, qstr, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = '';
                            if (this.options.protocol === 'oidc') {
                                api = this.baseClient.appHost + "/oidc/token/introspection";
                            }
                            else if (this.options.protocol === 'oauth') {
                                api = this.baseClient.appHost + "/oauth/token/introspection";
                            }
                            qstr = this._generateTokenRequest({
                                client_id: this.options.appId,
                                token: token
                            });
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: qstr
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthenticationClient.prototype.introspectToken = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!['oauth', 'oidc'].includes(this.options.protocol)) {
                                throw new Error('初始化 AuthenticationClient 时传入的 protocol 参数必须为 oauth 或 oidc，请检查参数');
                            }
                            if (!this.options.secret &&
                                this.options.introspectionEndPointAuthMethod !== 'none') {
                                throw new Error('请在初始化 AuthenticationClient 时传入 appId 和 secret 参数');
                            }
                            if (!(this.options.introspectionEndPointAuthMethod === 'client_secret_post')) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._introspectTokenWithClientSecretPost(token)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            if (!(this.options.introspectionEndPointAuthMethod === 'client_secret_basic')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this._introspectTokenWithClientSecretBasic(token)];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4:
                            if (!(this.options.introspectionEndPointAuthMethod === 'none')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this._introspectTokenWithNone(token)];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6: throw new Error('初始化 AuthenticationClient 时传入的 introspectionEndPointAuthMethod 参数可选值为 client_secret_base、client_secret_post、none，请检查参数');
                    }
                });
            });
        };
        AuthenticationClient.prototype.validateTicketV1 = function (ticket, service) {
            return __awaiter(this, void 0, void 0, function () {
                var api, result, valid;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/cas-idp/" + this.options.appId + "/validate";
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'GET',
                                    url: api,
                                    params: {
                                        service: service,
                                        ticket: ticket
                                    }
                                })];
                        case 1:
                            result = _a.sent();
                            valid = result.split('\n')[0];
                            return [2 /*return*/, __assign({ valid: valid === 'yes' }, (valid !== 'yes' && { message: 'ticket 不合法' }))];
                    }
                });
            });
        };
        AuthenticationClient.prototype.validateTicketV2 = function (ticket, service, format) {
            if (format === void 0) { format = 'JSON'; }
            return __awaiter(this, void 0, void 0, function () {
                var api, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!ticket) {
                                throw new Error('请传入 ticket 一次性票据');
                            }
                            if (!service) {
                                throw new Error('请传入 service 服务地址');
                            }
                            if (format !== 'XML' && format !== 'JSON') {
                                throw new Error('format 参数可选值为 XML、JSON，请检查输入');
                            }
                            api = this.baseClient.appHost + "/cas-idp/" + this.options.appId + "/serviceValidate";
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    method: 'GET',
                                    url: api,
                                    params: {
                                        service: service,
                                        ticket: ticket,
                                        format: format
                                    }
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 判断 "我" 是否有某个角色
         * @param roleCode 角色 Code
         * @param namespace 权限分组 ID
         */
        AuthenticationClient.prototype.hasRole = function (roleCode, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var user, roleList, hasRole;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.getUserRoles(this.graphqlClient, this.tokenProvider, {
                                id: this.checkLoggedIn(),
                                namespace: namespace
                            })];
                        case 1:
                            user = (_a.sent()).user;
                            if (!user) {
                                return [2 /*return*/, false];
                            }
                            roleList = user.roles;
                            if (roleList.totalCount < 1) {
                                return [2 /*return*/, false];
                            }
                            hasRole = false;
                            roleList.list.forEach(function (item) {
                                if (item.code === roleCode) {
                                    hasRole = true;
                                }
                            });
                            return [2 /*return*/, hasRole];
                    }
                });
            });
        };
        /**
         * @description 获取当前用户能够访问的应用
         */
        AuthenticationClient.prototype.listApplications = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, page, _c, limit, data;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = params || {}, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                            return [4 /*yield*/, this.httpClient.request({
                                    url: this.baseClient.appHost + "/api/v2/users/me/applications/allowed?page=" + page + "&limit=" + limit,
                                    method: 'GET'
                                })];
                        case 1:
                            data = _d.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @description 检验 idToken 或 accessToken
         */
        AuthenticationClient.prototype.validateToken = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var data, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options) {
                                throw new Error('请在传入的参数对象中包含 accessToken 或 idToken 字段');
                            }
                            if (options.accessToken && options.idToken) {
                                throw new Error('accessToken 和 idToken 只能传入一个，不能同时传入');
                            }
                            if (!options.idToken) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    url: this.baseClient.appHost + "/api/v2/oidc/validate_token",
                                    method: 'GET',
                                    params: {
                                        id_token: options.idToken
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                        case 2:
                            if (!options.accessToken) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.naiveHttpClient.request({
                                    url: this.baseClient.appHost + "/api/v2/oidc/validate_token",
                                    method: 'GET',
                                    params: {
                                        access_token: options.accessToken
                                    }
                                })];
                        case 3:
                            data = _a.sent();
                            return [2 /*return*/, data];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description sso 检测登录态
         */
        AuthenticationClient.prototype.trackSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.naiveHttpClient.request({
                                url: this.baseClient.appHost + "/cas/session",
                                method: 'GET'
                            })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /*
         * 在本地检验 ID Token 或 Access Token 的有效性，并返回其包含的内容。
         * 如果签名模式是 HS256，必须在初始化参数中传入 appSecret。
         * 如果开启了 Token 加密功能，请使用 decryptTokenLocally。
         * @param token 待检验的 Token
         * @returns Token 的内容
         */
        // async validateTokenLocally(token: string) {
        //   const { payload } = await compactVerify(token, (header: any) =>
        //     this.keyManager.getKeyFor({
        //       alg: header.alg,
        //       kid: header.kid
        //     })
        //   );
        //   return JSON.parse(new TextDecoder().decode(payload));
        // }
        /**
         * 在本地利用私钥解密 ID Token 或 Access Token ，检验其有效性并返回包含的内容。
         * 只在开启 Token 加密功能的情况下使用，反之请使用 validateTokenLocally。
         * 必须在初始化参数中传入 privateKeys。
         * @param token 待检验的 Token
         * @returns Token 的内容
         */
        // async decryptTokenLocally(token: string) {
        //   const { plaintext } = await compactDecrypt(token, (header: any) =>
        //     this.keyManager.getKeyFor({
        //       alg: header.alg,
        //       kid: header.kid
        //     })
        //   );
        //   return this.validateTokenLocally(new TextDecoder().decode(plaintext));
        // }
        /**
         * @description 设置语言
         */
        AuthenticationClient.prototype.setLang = function (lang) {
            this.options.lang = lang;
        };
        return AuthenticationClient;
    }());
    exports.AuthenticationClient = AuthenticationClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL0F1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsNkVBQTRFO0lBTTVFLDREQUFzQztJQUN0Qyx3REFBaUM7SUFFakMsNENBaUN1QjtJQUN2Qix5REFBd0Q7SUFDeEQsaUNBU2lCO0lBQ2pCLHFEQVlnQztJQUVoQywyRUFBMEU7SUFDMUUscUVBQW9FO0lBQ3BFLG1EQUFtRTtJQUNuRSxrQ0FTa0I7SUFDbEIsMERBQW1DO0lBRW5DLDJFQUEwRTtJQUMxRSwrREFBOEQ7SUFFOUQsbUZBQWtGO0lBQ2xGLHVFQUFzRTtJQUV0RSxxRUFBMEU7SUFFMUUsSUFBTSxlQUFlLEdBQWdDO1FBQ25ELEtBQUssRUFBRSxTQUFTO1FBQ2hCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLHVCQUF1QixFQUFFLG9CQUFvQjtRQUM3QywrQkFBK0IsRUFBRSxvQkFBb0I7UUFDckQsNEJBQTRCLEVBQUUsb0JBQW9CO1FBQ2xELE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLFVBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxJQUFTO1lBQ2hELE1BQU0sRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxXQUFXLEVBQUUsS0FBSztRQUNsQixlQUFlLEVBQUUsZUFBTztRQUN4QixJQUFJLEVBQUUseUJBQXlCO1FBQy9CLE9BQU8sRUFBRTtZQUNQLGFBQWEsRUFBRSx1QkFBdUI7WUFDdEMsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixjQUFjLEVBQUUsd0JBQXdCO1lBQ3hDLGFBQWEsRUFBRSx1QkFBdUI7WUFDdEMsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxJQUFJLEVBQUUsZ0JBQWdCO1NBQ3ZCO1FBQ0QsSUFBSSxFQUFFLE9BQU87S0FDZCxDQUFDO0lBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSDtRQWtCRSw4QkFBWSxPQUFvQztZQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FDMUIsVUFBQyxDQUFRLElBQUssT0FBQSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsQ0FDL0MsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxtREFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0QsSUFBTSxlQUFlLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGdCQUFhLENBQUM7WUFDaEUsK0RBQStEO1lBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLDZCQUFhLENBQUMsQ0FDcEUsZUFBZSxFQUNmLElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDbEQseURBQTJCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksdUJBQVUsQ0FBQyxDQUMzRCxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxhQUFhLENBQ25CLENBQUM7WUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksNEJBQWUsQ0FDeEMsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFDO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVEQUEwQixDQUM1QyxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQ2YsWUFBWSxDQUNiLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksdURBQTBCLENBQzFDLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsRUFDZixVQUFVLENBQ1gsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSx1REFBMEIsQ0FDbEQsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsVUFBVSxFQUNmLGVBQWUsQ0FDaEIsQ0FBQztZQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxpREFBdUIsQ0FDcEMsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsVUFBVSxDQUNoQixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVEQUEwQixDQUMxQyxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxVQUFVLENBQ2hCLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksK0RBQThCLENBQ2xELElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FDaEIsQ0FBQztZQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx1REFBNkIsQ0FDaEQsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsVUFBVSxDQUNoQixDQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQztRQUVELDRDQUFhLEdBQWI7O1lBQ0UsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUUxQyxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEI7WUFFRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtZQUNELElBQU0sT0FBTyxHQUF1QixvQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEtBQUksTUFBQSxPQUFPLENBQUMsSUFBSSwwQ0FBRSxFQUFFLENBQUEsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRCw2Q0FBYyxHQUFkLFVBQWUsSUFBVTtZQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsdUNBQVEsR0FBUixVQUFTLEtBQWE7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRztRQUNHLDhDQUFlLEdBQXJCLFVBQ0UsS0FBYSxFQUNiLFFBQWdCLEVBQ2hCLE9BQXlCLEVBQ3pCLE9BcUJDOzs7Ozs7NEJBRUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7NEJBQ3hCLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOzRCQUV0QixLQU9FLE9BQU8sV0FQUyxFQUFsQixVQUFVLG1CQUFHLEtBQUssS0FBQSxFQUNsQixLQU1FLE9BQU8sY0FOWSxFQUFyQixhQUFhLG1CQUFHLEtBQUssS0FBQSxFQUNyQixRQUFRLEdBS04sT0FBTyxTQUxELEVBQ1IsTUFBTSxHQUlKLE9BQU8sT0FKSCxFQUNOLE9BQU8sR0FHTCxPQUFPLFFBSEYsRUFDUCxVQUFVLEdBRVIsT0FBTyxXQUZDLEVBQ1YsVUFBVSxHQUNSLE9BQU8sV0FEQyxDQUNBOzRCQUNLLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzNDLFFBQVE7NEJBQ1IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUZqQyxxQkFBTSx3QkFFZixTQUEwQyxFQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsUUFBUSxHQUFHLFNBSVYsQ0FBQzs0QkFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLFVBQVUsRUFBRTtnQ0FDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzZCQUN2RTtpQ0FBTSxJQUFJLE1BQU0sRUFBRTtnQ0FDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3RDOzRCQUNHLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQ3hCLElBQUksT0FBTyxFQUFFO2dDQUNYLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDaUMscUJBQU0sNEJBQWUsQ0FDckQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxFQUFFO3dDQUNMLEtBQUssT0FBQTt3Q0FDTCxRQUFRLFVBQUE7d0NBQ1IsT0FBTyxTQUFBO3dDQUNQLFVBQVUsWUFBQTt3Q0FDVixhQUFhLGVBQUE7d0NBQ2IsUUFBUSxVQUFBO3dDQUNSLE1BQU0sRUFBRSxXQUFXO3dDQUNuQixPQUFPLEVBQUUsWUFBWTt3Q0FDckIsVUFBVSxZQUFBO3FDQUNYO2lDQUNGLENBQ0YsRUFBQTs7NEJBaEJ3QixJQUFJLEdBQUssQ0FBQSxTQWdCakMsQ0FBQSxnQkFoQjRCOzRCQWlCN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBaUNHO1FBQ0csaURBQWtCLEdBQXhCLFVBQ0UsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsT0FBeUIsRUFDekIsT0F3QkM7Ozs7Ozs0QkFFRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs0QkFDeEIsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7NEJBRXRCLEtBUUUsT0FBTyxXQVJTLEVBQWxCLFVBQVUsbUJBQUcsS0FBSyxLQUFBLEVBQ2xCLEtBT0UsT0FBTyxjQVBZLEVBQXJCLGFBQWEsbUJBQUcsS0FBSyxLQUFBLEVBQ3JCLFFBQVEsR0FNTixPQUFPLFNBTkQsRUFDUixNQUFNLEdBS0osT0FBTyxPQUxILEVBQ04sT0FBTyxHQUlMLE9BQU8sUUFKRixFQUNQLFVBQVUsR0FHUixPQUFPLFdBSEMsRUFDVixVQUFVLEdBRVIsT0FBTyxXQUZDLEVBQ1YsVUFBVSxHQUNSLE9BQU8sV0FEQyxDQUNBOzRCQUNLLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzNDLFFBQVE7NEJBQ1IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUZqQyxxQkFBTSx3QkFFZixTQUEwQyxFQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsUUFBUSxHQUFHLFNBSVYsQ0FBQzs0QkFFRSxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLFVBQVUsRUFBRTtnQ0FDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzZCQUN2RTtpQ0FBTSxJQUFJLE1BQU0sRUFBRTtnQ0FDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3RDOzRCQUNHLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQ3hCLElBQUksT0FBTyxFQUFFO2dDQUNYLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDb0MscUJBQU0sK0JBQWtCLENBQzNELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLEtBQUssRUFBRTt3Q0FDTCxRQUFRLFVBQUE7d0NBQ1IsUUFBUSxVQUFBO3dDQUNSLE9BQU8sU0FBQTt3Q0FDUCxVQUFVLFlBQUE7d0NBQ1YsYUFBYSxlQUFBO3dDQUNiLFFBQVEsVUFBQTt3Q0FDUixNQUFNLEVBQUUsV0FBVzt3Q0FDbkIsT0FBTyxFQUFFLFlBQVk7d0NBQ3JCLFVBQVUsWUFBQTt3Q0FDVixVQUFVLFlBQUE7cUNBQ1g7aUNBQ0YsQ0FDRixFQUFBOzs0QkFqQjJCLElBQUksR0FBSyxDQUFBLFNBaUJwQyxDQUFBLG1CQWpCK0I7NEJBa0JoQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBa0NHO1FBQ0csa0RBQW1CLEdBQXpCLFVBQ0UsS0FBYSxFQUNiLElBQVksRUFDWixRQUFpQixFQUNqQixPQUF5QixFQUN6QixPQXFCQzs7Ozs7OzRCQUVELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOzRCQUN4QixPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs0QkFFdEIsS0FRRSxPQUFPLFdBUlMsRUFBbEIsVUFBVSxtQkFBRyxLQUFLLEtBQUEsRUFDbEIsS0FPRSxPQUFPLGNBUFksRUFBckIsYUFBYSxtQkFBRyxLQUFLLEtBQUEsRUFDckIsUUFBUSxHQU1OLE9BQU8sU0FORCxFQUNSLE1BQU0sR0FLSixPQUFPLE9BTEgsRUFDTixPQUFPLEdBSUwsT0FBTyxRQUpGLEVBQ1AsVUFBVSxHQUdSLE9BQU8sV0FIQyxFQUNWLGdCQUFnQixHQUVkLE9BQU8saUJBRk8sRUFDaEIsVUFBVSxHQUNSLE9BQU8sV0FEQyxDQUNBO2lDQUNSLFFBQVEsRUFBUix3QkFBUTs0QkFDTyxLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsZUFBZSxDQUFBO2tDQUMzQyxRQUFROzRCQUNSLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsRUFBQTtnQ0FGakMscUJBQU0sd0JBRWYsU0FBMEMsRUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3RCLEVBQUE7OzRCQUpELFFBQVEsR0FBRyxTQUlWLENBQUM7Ozs0QkFFQSxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLFVBQVUsRUFBRTtnQ0FDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzZCQUN2RTtpQ0FBTSxJQUFJLE1BQU0sRUFBRTtnQ0FDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3RDOzRCQUNHLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQ3hCLElBQUksT0FBTyxFQUFFO2dDQUNYLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDcUMscUJBQU0sZ0NBQW1CLENBQzdELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLEtBQUssRUFBRTt3Q0FDTCxLQUFLLE9BQUE7d0NBQ0wsSUFBSSxNQUFBO3dDQUNKLGdCQUFnQixrQkFBQTt3Q0FDaEIsUUFBUSxVQUFBO3dDQUNSLE9BQU8sU0FBQTt3Q0FDUCxVQUFVLFlBQUE7d0NBQ1YsYUFBYSxlQUFBO3dDQUNiLFFBQVEsVUFBQTt3Q0FDUixNQUFNLEVBQUUsV0FBVzt3Q0FDbkIsT0FBTyxFQUFFLFlBQVk7d0NBQ3JCLFVBQVUsWUFBQTtxQ0FDWDtpQ0FDRixDQUNGLEVBQUE7OzRCQWxCNEIsSUFBSSxHQUFLLENBQUEsU0FrQnJDLENBQUEsb0JBbEJnQzs0QkFtQmpDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxvREFBcUIsR0FBM0IsVUFDRSxRQUFnQjs7Ozs7Z0NBRTBCLHFCQUFNLGtDQUFxQixDQUNuRSxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQixFQUFFLFFBQVEsVUFBQSxFQUFFLENBQ2IsRUFBQTs7NEJBSjhCLE1BQU0sR0FBSyxDQUFBLFNBSXpDLENBQUEsc0JBSm9DOzRCQUtyQyxzQkFBTyxNQUFNLEVBQUM7Ozs7U0FDZjtRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0csMENBQVcsR0FBakIsVUFBa0IsS0FBYSxFQUFFLGdCQUF5Qjs7Ozs7OzRCQUVsRCxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLHFCQUFrQixDQUFDOzRCQUNuRCxNQUFNLEdBQVEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDOzRCQUM5QixJQUFJLGdCQUFnQixFQUFFO2dDQUNwQixNQUFNLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7NkJBQzVDOzRCQUNZLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29DQUN6QyxNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixJQUFJLEVBQUUsTUFBTTtpQ0FDYixDQUFDLEVBQUE7OzRCQUpJLElBQUksR0FBRyxTQUlYOzRCQUVGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0ErQkc7UUFDRywyQ0FBWSxHQUFsQixVQUNFLEtBQWEsRUFDYixRQUFnQixFQUNoQixPQWdCQzs7Ozs7OzRCQUVELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOzRCQUV0QixLQU1FLE9BQU8sYUFOVyxFQUFwQixZQUFZLG1CQUFHLEtBQUssS0FBQSxFQUNwQixXQUFXLEdBS1QsT0FBTyxZQUxFLEVBQ1gsUUFBUSxHQUlOLE9BQU8sU0FKRCxFQUNSLE1BQU0sR0FHSixPQUFPLE9BSEgsRUFDTixPQUFPLEdBRUwsT0FBTyxRQUZGLEVBQ1AsVUFBVSxHQUNSLE9BQU8sV0FEQyxDQUNBOzRCQUNLLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzNDLFFBQVE7NEJBQ1IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUZqQyxxQkFBTSx3QkFFZixTQUEwQyxFQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsUUFBUSxHQUFHLFNBSVYsQ0FBQzs0QkFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLFVBQVUsRUFBRTtnQ0FDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzZCQUN2RTtpQ0FBTSxJQUFJLE1BQU0sRUFBRTtnQ0FDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3RDOzRCQUNHLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQ3hCLElBQUksT0FBTyxFQUFFO2dDQUNYLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDOEIscUJBQU0seUJBQVksQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxFQUFFO3dDQUNMLEtBQUssT0FBQTt3Q0FDTCxRQUFRLFVBQUE7d0NBQ1IsWUFBWSxjQUFBO3dDQUNaLFdBQVcsYUFBQTt3Q0FDWCxRQUFRLFVBQUE7d0NBQ1IsTUFBTSxFQUFFLFdBQVc7d0NBQ25CLE9BQU8sRUFBRSxZQUFZO3FDQUN0QjtpQ0FDRixDQUNGLEVBQUE7OzRCQWRxQixJQUFJLEdBQUssQ0FBQSxTQWM5QixDQUFBLGFBZHlCOzRCQWUxQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0NBQ25CLGFBQWE7Z0NBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQ0FBd0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7NkJBQzdEOzRCQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBZ0NHO1FBQ0csOENBQWUsR0FBckIsVUFDRSxRQUFnQixFQUNoQixRQUFnQixFQUNoQixPQWdCQzs7Ozs7OzRCQUVELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOzRCQUV0QixLQU1FLE9BQU8sYUFOVyxFQUFwQixZQUFZLG1CQUFHLEtBQUssS0FBQSxFQUNwQixXQUFXLEdBS1QsT0FBTyxZQUxFLEVBQ1gsUUFBUSxHQUlOLE9BQU8sU0FKRCxFQUNSLE1BQU0sR0FHSixPQUFPLE9BSEgsRUFDTixPQUFPLEdBRUwsT0FBTyxRQUZGLEVBQ1AsVUFBVSxHQUNSLE9BQU8sV0FEQyxDQUNBOzRCQUNLLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzNDLFFBQVE7NEJBQ1IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUZqQyxxQkFBTSx3QkFFZixTQUEwQyxFQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsUUFBUSxHQUFHLFNBSVYsQ0FBQzs0QkFDRSxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLFVBQVUsRUFBRTtnQ0FDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzZCQUN2RTtpQ0FBTSxJQUFJLE1BQU0sRUFBRTtnQ0FDakIsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3RDOzRCQUNHLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQ3hCLElBQUksT0FBTyxFQUFFO2dDQUNYLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDaUMscUJBQU0sNEJBQWUsQ0FDckQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxFQUFFO3dDQUNMLFFBQVEsVUFBQTt3Q0FDUixRQUFRLFVBQUE7d0NBQ1IsWUFBWSxjQUFBO3dDQUNaLFdBQVcsYUFBQTt3Q0FDWCxRQUFRLFVBQUE7d0NBQ1IsTUFBTSxFQUFFLFdBQVc7d0NBQ25CLE9BQU8sRUFBRSxZQUFZO3FDQUN0QjtpQ0FDRixDQUNGLEVBQUE7OzRCQWR3QixJQUFJLEdBQUssQ0FBQSxTQWNqQyxDQUFBLGdCQWQ0Qjs0QkFlN0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dDQUNuQixhQUFhO2dDQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUM3RDs0QkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CRztRQUNHLCtDQUFnQixHQUF0QixVQUNFLEtBQWEsRUFDYixJQUFZLEVBQ1osT0FlQzs7Ozs7OzRCQUVELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOzRCQUNoQixRQUFRLEdBQW9ELE9BQU8sU0FBM0QsRUFBRSxNQUFNLEdBQTRDLE9BQU8sT0FBbkQsRUFBRSxPQUFPLEdBQW1DLE9BQU8sUUFBMUMsRUFBRSxVQUFVLEdBQXVCLE9BQU8sV0FBOUIsRUFBRSxnQkFBZ0IsR0FBSyxPQUFPLGlCQUFaLENBQWE7NEJBQ3hFLFdBQVcsR0FBRyxJQUFJLENBQUM7NEJBQ3ZCLElBQUksVUFBVSxFQUFFO2dDQUNkLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1DQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NkJBQ3ZFO2lDQUFNLElBQUksTUFBTSxFQUFFO2dDQUNqQixXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDdEM7NEJBQ0csWUFBWSxHQUFHLElBQUksQ0FBQzs0QkFDeEIsSUFBSSxPQUFPLEVBQUU7Z0NBQ1gsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQ3hDOzRCQUNrQyxxQkFBTSw2QkFBZ0IsQ0FDdkQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxFQUFFO3dDQUNMLEtBQUssT0FBQTt3Q0FDTCxJQUFJLE1BQUE7d0NBQ0osZ0JBQWdCLGtCQUFBO3dDQUNoQixRQUFRLFVBQUE7d0NBQ1IsTUFBTSxFQUFFLFdBQVc7d0NBQ25CLE9BQU8sRUFBRSxZQUFZO3FDQUN0QjtpQ0FDRixDQUNGLEVBQUE7OzRCQWJ5QixJQUFJLEdBQUssQ0FBQSxTQWFsQyxDQUFBLGlCQWI2Qjs0QkFjOUIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dDQUNuQixhQUFhO2dDQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUM3RDs0QkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNEJHO1FBQ0csbURBQW9CLEdBQTFCLFVBQ0UsS0FBYSxFQUNiLFFBQWdCLEVBQ2hCLE9BZ0JDOzs7Ozs7NEJBRUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7NEJBRXRCLFdBQVcsR0FNVCxPQUFPLFlBTkUsRUFDWCxLQUtFLE9BQU8sYUFMVyxFQUFwQixZQUFZLG1CQUFHLEtBQUssS0FBQSxFQUNwQixRQUFRLEdBSU4sT0FBTyxTQUpELEVBQ1IsTUFBTSxHQUdKLE9BQU8sT0FISCxFQUNOLE9BQU8sR0FFTCxPQUFPLFFBRkYsRUFDUCxVQUFVLEdBQ1IsT0FBTyxXQURDLENBQ0E7NEJBQ0ssS0FBQSxDQUFBLEtBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLGVBQWUsQ0FBQTtrQ0FDM0MsUUFBUTs0QkFDUixxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEVBQUE7Z0NBRmpDLHFCQUFNLHdCQUVmLFNBQTBDLEVBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUN4QixFQUFBOzs0QkFKRCxRQUFRLEdBQUcsU0FJVixDQUFDOzRCQUNFLFdBQVcsR0FBRyxJQUFJLENBQUM7NEJBQ3ZCLElBQUksVUFBVSxFQUFFO2dDQUNkLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1DQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NkJBQ3ZFO2lDQUFNLElBQUksTUFBTSxFQUFFO2dDQUNqQixXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDdEM7NEJBQ0csWUFBWSxHQUFHLElBQUksQ0FBQzs0QkFDeEIsSUFBSSxPQUFPLEVBQUU7Z0NBQ1gsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQ3hDOzRCQUNzQyxxQkFBTSxpQ0FBb0IsQ0FDL0QsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxFQUFFO3dDQUNMLEtBQUssT0FBQTt3Q0FDTCxRQUFRLFVBQUE7d0NBQ1IsV0FBVyxhQUFBO3dDQUNYLFlBQVksY0FBQTt3Q0FDWixRQUFRLFVBQUE7d0NBQ1IsTUFBTSxFQUFFLFdBQVc7d0NBQ25CLE9BQU8sRUFBRSxZQUFZO3FDQUN0QjtpQ0FDRixDQUNGLEVBQUE7OzRCQWQ2QixJQUFJLEdBQUssQ0FBQSxTQWN0QyxDQUFBLHFCQWRpQzs0QkFlbEMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dDQUNuQixhQUFhO2dDQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0NBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUM3RDs0QkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVLLGdEQUFpQixHQUF2QixVQUNFLE9BQWUsRUFDZixRQUFnQixFQUNoQixPQUdDOzs7Ozs7NEJBRUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7NEJBQ2hCLFdBQVcsR0FBZSxPQUFPLFlBQXRCLEVBQUUsUUFBUSxHQUFLLE9BQU8sU0FBWixDQUFhOzRCQUN6QixLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsZUFBZSxDQUFBO2tDQUMzQyxRQUFROzRCQUNSLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsRUFBQTtnQ0FGakMscUJBQU0sd0JBRWYsU0FBMEMsRUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3hCLEVBQUE7OzRCQUpELFFBQVEsR0FBRyxTQUlWLENBQUM7NEJBQ2tDLHFCQUFNLDhCQUFpQixDQUN6RCxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxPQUFPLFNBQUE7b0NBQ1AsUUFBUSxVQUFBO29DQUNSLFdBQVcsYUFBQTtvQ0FDWCxRQUFRLFVBQUE7aUNBQ1QsQ0FDRixFQUFBOzs0QkFUMEIsSUFBSSxHQUFLLENBQUEsU0FTbkMsQ0FBQSxrQkFUOEI7NEJBVS9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLCtDQUFnQixHQUF0QixVQUF1QixLQUFjOzs7OztnQ0FDdkIscUJBQU0sNkJBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUN6RSxLQUFLLE9BQUE7NkJBQ04sQ0FBQyxFQUFBOzs0QkFGSSxHQUFHLEdBQUcsU0FFVjs0QkFDRixzQkFBTyxHQUFHLENBQUMsZ0JBQWdCLEVBQUM7Ozs7U0FDN0I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRyx3Q0FBUyxHQUFmLFVBQWdCLEtBQWEsRUFBRSxLQUFpQjs7Ozs7Z0NBQ2xCLHFCQUFNLHNCQUFTLENBQ3pDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLEVBQUUsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FDakIsRUFBQTs7NEJBSmtCLElBQUksR0FBSyxDQUFBLFNBSTNCLENBQUEsVUFKc0I7NEJBS3ZCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0csdURBQXdCLEdBQTlCLFVBQ0UsS0FBYSxFQUNiLElBQVksRUFDWixXQUFtQixFQUNuQixnQkFBeUI7Ozs7Ozs0QkFFTCxLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsZUFBZSxDQUFBO2tDQUM5QyxXQUFXOzRCQUNYLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsRUFBQTtnQ0FGOUIscUJBQU0sd0JBRWxCLFNBQTBDLEVBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUN4QixFQUFBOzs0QkFKRCxXQUFXLEdBQUcsU0FJYixDQUFDOzRCQUM4QixxQkFBTSwwQkFBYSxDQUNqRCxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxLQUFLLE9BQUE7b0NBQ0wsSUFBSSxNQUFBO29DQUNKLFdBQVcsYUFBQTtvQ0FDWCxnQkFBZ0Isa0JBQUE7aUNBQ2pCLENBQ0YsRUFBQTs7NEJBVHNCLElBQUksR0FBSyxDQUFBLFNBUy9CLENBQUEsY0FUMEI7NEJBVTNCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0csdURBQXdCLEdBQTlCLFVBQ0UsS0FBYSxFQUNiLElBQVksRUFDWixXQUFtQjs7Ozs7OzRCQUVDLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzlDLFdBQVc7NEJBQ1gscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUY5QixxQkFBTSx3QkFFbEIsU0FBMEMsRUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3hCLEVBQUE7OzRCQUpELFdBQVcsR0FBRyxTQUliLENBQUM7NEJBQzhCLHFCQUFNLDBCQUFhLENBQ2pELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLEtBQUssT0FBQTtvQ0FDTCxJQUFJLE1BQUE7b0NBQ0osV0FBVyxhQUFBO2lDQUNaLENBQ0YsRUFBQTs7NEJBUnNCLElBQUksR0FBSyxDQUFBLFNBUS9CLENBQUEsY0FSMEI7NEJBUzNCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRVksNkRBQThCLEdBQTNDLFVBQTRDLE1BRzNDOzs7Ozs7NEJBQ08sS0FBSyxHQUFlLE1BQU0sTUFBckIsRUFBRSxRQUFRLEdBQUssTUFBTSxTQUFYLENBQVk7NEJBQ2hCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzNDLFFBQVE7NEJBQ1IscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUZqQyxxQkFBTSx3QkFFZixTQUEwQyxFQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsUUFBUSxHQUFHLFNBSVYsQ0FBQzs0QkFHRSxxQkFBTSwyQ0FBOEIsQ0FDdEMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxPQUFBO29DQUNMLFFBQVEsVUFBQTtpQ0FDVCxDQUNGLEVBQUE7OzRCQVJpQyxJQUFJLEdBQ2xDLENBQUEsU0FPSCxDQUFBLCtCQVJxQzs0QkFTdEMsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFWSw2REFBOEIsR0FBM0MsVUFBNEMsTUFJM0M7Ozs7Ozs0QkFDTyxLQUFLLEdBQStCLE1BQU0sTUFBckMsRUFBRSxXQUFXLEdBQWtCLE1BQU0sWUFBeEIsRUFBRSxXQUFXLEdBQUssTUFBTSxZQUFYLENBQVk7NEJBQzdCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzlDLFdBQVc7NEJBQ1gscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUY5QixxQkFBTSx3QkFFbEIsU0FBMEMsRUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3hCLEVBQUE7OzRCQUpELFdBQVcsR0FBRyxTQUliLENBQUM7NEJBQ2tCLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQzlDLFdBQVc7NEJBQ1gscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUY5QixxQkFBTSx3QkFFbEIsU0FBMEMsRUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3hCLEVBQUE7OzRCQUpELFdBQVcsR0FBRyxTQUliLENBQUM7NEJBR0UscUJBQU0sMkNBQThCLENBQ3RDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLEtBQUssT0FBQTtvQ0FDTCxXQUFXLGFBQUE7b0NBQ1gsV0FBVyxhQUFBO2lDQUNaLENBQ0YsRUFBQTs7NEJBVGlDLElBQUksR0FDbEMsQ0FBQSxTQVFILENBQUEsK0JBVHFDOzRCQVV0QyxzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0EwQ0c7UUFDRyw0Q0FBYSxHQUFuQixVQUNFLE9BQXdCLEVBQ3hCLE9BR0M7Ozs7Ozs0QkFFSyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUM5QixLQUE2QixPQUFPLElBQUksRUFBRSxFQUF4QyxVQUFVLGdCQUFBLEVBQUUsVUFBVSxnQkFBQSxDQUFtQjs0QkFDakQsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtnQ0FDL0IsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDOzZCQUN6Qjs0QkFDK0IscUJBQU0sdUJBQVUsQ0FDOUMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsRUFBRSxFQUFFLE1BQU07b0NBQ1YsS0FBSyxFQUFFLE9BQU87b0NBQ2QsVUFBVSxZQUFBO29DQUNWLFVBQVUsWUFBQTtpQ0FDWCxDQUNGLEVBQUE7OzRCQVRtQixPQUFPLEdBQUssQ0FBQSxTQVMvQixDQUFBLFdBVDBCOzRCQVUzQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUM3QixzQkFBTyxPQUFPLEVBQUM7Ozs7U0FDaEI7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBa0JHO1FBQ0csNkNBQWMsR0FBcEIsVUFDRSxXQUFtQixFQUNuQixXQUFvQjs7Ozs7OzRCQUdsQixLQUFBLFdBQVcsQ0FBQTtxQ0FBWCx3QkFBVzs0QkFDSixLQUFBLENBQUEsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsZUFBZSxDQUFBO2tDQUNqQyxXQUFXOzRCQUNYLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsRUFBQTtnQ0FGM0MscUJBQU0sd0JBRUwsU0FBMEMsRUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQ3hCLEVBQUE7OzRCQUpELEtBQUEsQ0FBQyxTQUlBLENBQUMsQ0FBQTs7OzRCQU5KLFdBQVcsS0FNUCxDQUFDOzRCQUVILEtBQUEsV0FBVyxDQUFBO3FDQUFYLHdCQUFXOzRCQUNKLEtBQUEsQ0FBQSxLQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsQ0FBQyxlQUFlLENBQUE7a0NBQ2pDLFdBQVc7NEJBQ1gscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxFQUFBO2dDQUYzQyxxQkFBTSx3QkFFTCxTQUEwQyxFQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FDeEIsRUFBQTs7NEJBSkQsS0FBQSxDQUFDLFNBSUEsQ0FBQyxDQUFBOzs7NEJBTkosV0FBVyxLQU1QLENBQUM7NEJBRTRCLHFCQUFNLDJCQUFjLENBQ25ELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLFdBQVcsYUFBQTtvQ0FDWCxXQUFXLGFBQUE7aUNBQ1osQ0FDRixFQUFBOzs0QkFQdUIsSUFBSSxHQUFLLENBQUEsU0FPaEMsQ0FBQSxlQVAyQjs0QkFRNUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBd0JHO1FBQ0csMENBQVcsR0FBakIsVUFDRSxLQUFhLEVBQ2IsU0FBaUIsRUFDakIsUUFBaUIsRUFDakIsWUFBcUIsRUFDckIsZ0JBQXlCLEVBQ3pCLG1CQUE0Qjs7Ozs7Z0NBRUUscUJBQU0sd0JBQVcsQ0FDN0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsS0FBSyxPQUFBO2dDQUNMLFNBQVMsV0FBQTtnQ0FDVCxRQUFRLFVBQUE7Z0NBQ1IsWUFBWSxjQUFBO2dDQUNaLGdCQUFnQixrQkFBQTtnQ0FDaEIsbUJBQW1CLHFCQUFBOzZCQUNwQixDQUNGLEVBQUE7OzRCQVhvQixJQUFJLEdBQUssQ0FBQSxTQVc3QixDQUFBLFlBWHdCOzRCQVl6QixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXVCRztRQUNHLDBDQUFXLEdBQWpCLFVBQ0UsS0FBYSxFQUNiLFNBQWlCLEVBQ2pCLFFBQWlCLEVBQ2pCLFlBQXFCOzs7OztnQ0FFUyxxQkFBTSx3QkFBVyxDQUM3QyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxLQUFLLE9BQUE7Z0NBQ0wsU0FBUyxXQUFBO2dDQUNULFFBQVEsVUFBQTtnQ0FDUixZQUFZLGNBQUE7NkJBQ2IsQ0FDRixFQUFBOzs0QkFUb0IsSUFBSSxHQUFLLENBQUEsU0FTN0IsQ0FBQSxZQVR3Qjs0QkFVekIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNHLDJDQUFZLEdBQWxCOzs7OztnQ0FDaUMscUJBQU0seUJBQVksQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsRUFBRSxDQUNILEVBQUE7OzRCQUpxQixJQUFJLEdBQUssQ0FBQSxTQUk5QixDQUFBLGFBSnlCOzRCQUsxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRywwQ0FBVyxHQUFqQixVQUFrQixPQUdqQjs7OztnQ0FDQyxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQ0FDNUIsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsR0FBRyxFQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyx1QkFBb0I7Z0NBQ25ELElBQUksRUFBRTtvQ0FDSixnQkFBZ0IsRUFBRSxPQUFPLENBQUMsZ0JBQWdCO29DQUMxQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsa0JBQWtCO2lDQUMvQzs2QkFDRixDQUFDLEVBQUE7OzRCQVBGLFNBT0UsQ0FBQzs0QkFDSCxzQkFBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFDOzs7O1NBQ3ZDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0csNENBQWEsR0FBbkIsVUFBb0IsT0FHbkI7Ozs7Z0NBQ0MscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQzVCLE1BQU0sRUFBRSxNQUFNO2dDQUNkLEdBQUcsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8seUJBQXNCO2dDQUNyRCxJQUFJLEVBQUU7b0NBQ0osZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLGdCQUFnQjtvQ0FDMUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO2lDQUMzQjs2QkFDRixDQUFDLEVBQUE7OzRCQVBGLFNBT0UsQ0FBQzs0QkFDSCxzQkFBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFDOzs7O1NBQ3ZDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyx3Q0FBUyxHQUFmLFVBQ0UsS0FBYSxFQUNiLFNBQWlCLEVBQ2pCLGdCQUF5Qjs7Ozs7Z0NBRUcscUJBQU0sc0JBQVMsQ0FDekMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsS0FBSyxPQUFBO2dDQUNMLFNBQVMsV0FBQTtnQ0FDVCxnQkFBZ0Isa0JBQUE7NkJBQ2pCLENBQ0YsRUFBQTs7NEJBUmtCLElBQUksR0FBSyxDQUFBLFNBUTNCLENBQUEsVUFSc0I7NEJBU3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDRywwQ0FBVyxHQUFqQjs7Ozs7Z0NBQ2dDLHFCQUFNLHdCQUFXLENBQzdDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLEVBQUUsQ0FDSCxFQUFBOzs0QkFKb0IsSUFBSSxHQUFLLENBQUEsU0FJN0IsQ0FBQSxZQUp3Qjs0QkFLekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNHLHdDQUFTLEdBQWYsVUFBZ0IsS0FBYSxFQUFFLFNBQWlCOzs7OztnQ0FDbEIscUJBQU0sc0JBQVMsQ0FDekMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsS0FBSyxPQUFBO2dDQUNMLFNBQVMsV0FBQTs2QkFDVixDQUNGLEVBQUE7OzRCQVBrQixJQUFJLEdBQUssQ0FBQSxTQU8zQixDQUFBLFVBUHNCOzRCQVF2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0csMENBQVcsR0FBakI7Ozs7O2dDQUNnQyxxQkFBTSx3QkFBVyxDQUM3QyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQixFQUFFLENBQ0gsRUFBQTs7NEJBSm9CLElBQUksR0FBSyxDQUFBLFNBSTdCLENBQUEsWUFKd0I7NEJBS3pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDRyw2Q0FBYyxHQUFwQjs7Ozs7Ozs0QkFHMkIscUJBQU0saUJBQUksQ0FDL0IsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsRUFBRSxDQUNILEVBQUE7OzRCQUphLElBQUksR0FBSyxDQUFBLFNBSXRCLENBQUEsS0FKaUI7NEJBS2xCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQ0FDbkIsYUFBYTtnQ0FDYixJQUFJLENBQUMsVUFBVSxHQUFHLGdDQUF3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs2QkFDN0Q7NEJBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sSUFBSSxFQUFDOzs7NEJBRVosc0JBQU8sSUFBSSxFQUFDOzs7OztTQUVmO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDVSxxQ0FBTSxHQUFuQjs7OztnQ0FDRSxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQ0FDNUIsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsR0FBRyxFQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyw4QkFBeUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFPO2dDQUM1RSxlQUFlLEVBQUUsSUFBSTs2QkFDdEIsQ0FBQyxFQUFBOzs0QkFKRixTQUlFLENBQUM7NEJBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7U0FDaEM7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDRyxzQ0FBTyxHQUFiOzs7Ozs7NEJBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDZCxxQkFBTSxnQkFBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQ0FDdEUsVUFBVSxFQUFFLDBCQUFhLENBQUMsSUFBSTtvQ0FDOUIsUUFBUSxFQUFFLE1BQU07aUNBQ2pCLENBQUMsRUFBQTs7NEJBSFcsSUFBSSxHQUFLLENBQUEsU0FHcEIsQ0FBQSxJQUhlOzRCQUlqQixzQkFBTyxrQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFDOzs7O1NBQ3pCO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyxxQ0FBTSxHQUFaLFVBQWEsR0FBVyxFQUFFLEtBQVU7Ozs7Ozs0QkFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDcEMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ0wscUJBQU0sbUJBQU0sQ0FDbkMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsVUFBVSxFQUFFLDBCQUFhLENBQUMsSUFBSTtvQ0FDOUIsUUFBUSxFQUFFLE1BQU07b0NBQ2hCLEdBQUcsS0FBQTtvQ0FDSCxLQUFLLE9BQUE7aUNBQ04sQ0FDRixFQUFBOzs0QkFUZSxJQUFJLEdBQUssQ0FBQSxTQVN4QixDQUFBLE9BVG1COzRCQVVwQixzQkFBTyxrQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFDOzs7O1NBQ3pCO1FBRUQ7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDRyx3Q0FBUyxHQUFmLFVBQWdCLEdBQVc7Ozs7Ozs0QkFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDUixxQkFBTSxzQkFBUyxDQUN6QyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxVQUFVLEVBQUUsMEJBQWEsQ0FBQyxJQUFJO29DQUM5QixRQUFRLEVBQUUsTUFBTTtvQ0FDaEIsR0FBRyxLQUFBO2lDQUNKLENBQ0YsRUFBQTs7NEJBUmtCLElBQUksR0FBSyxDQUFBLFNBUTNCLENBQUEsVUFSc0I7NEJBU3ZCLHNCQUFPLGtCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUM7Ozs7U0FDekI7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDRyx1Q0FBUSxHQUFkOzs7O2dDQUNTLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUNuQyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLDBCQUF1Qjs2QkFDdkQsQ0FBQyxFQUFBO2dDQUhGLHNCQUFPLFNBR0wsRUFBQzs7OztTQUNKO1FBRUQ7OztXQUdHO1FBQ1UsOENBQWUsR0FBNUI7Ozs7Ozs0QkFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUdoQyxxQkFBTSwrQkFBa0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7b0NBQ25FLEVBQUUsRUFBRSxNQUFNO2lDQUNYLENBQUMsRUFBQTs7NEJBSFEsV0FBVyxHQUNqQixDQUFBLFNBRUYsQ0FBQSxpQkFIbUI7NEJBSXJCLHNCQUFPLFdBQVcsRUFBQzs7OztTQUNwQjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBNEJHO1FBQ0csMENBQVcsR0FBakIsVUFDRSxRQUFnQixFQUNoQixRQUFnQixFQUNoQixPQUdDOzs7Ozs7NEJBRUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7NEJBQ2hCLFFBQVEsR0FBcUIsT0FBTyxTQUE1QixFQUFFLGNBQWMsR0FBSyxPQUFPLGVBQVosQ0FBYTs0QkFDdkMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyw2QkFBMEIsQ0FBQzs0QkFFcEQscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQ3pDLE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRTt3Q0FDSixRQUFRLFVBQUE7d0NBQ1IsUUFBUSxVQUFBO3dDQUNSLFFBQVEsVUFBQTt3Q0FDUixjQUFjLGdCQUFBO3FDQUNmO2lDQUNGLENBQUMsRUFBQTs7NEJBVEksSUFBSSxHQUFHLFNBU1g7NEJBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUJHO1FBQ0csd0NBQVMsR0FBZixVQUFnQixRQUFnQixFQUFFLFFBQWdCLEVBQUUsT0FHbkQ7Ozs7Ozs0QkFDQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs0QkFDaEIsUUFBUSxHQUFxQixPQUFPLFNBQTVCLEVBQUUsY0FBYyxHQUFLLE9BQU8sZUFBWixDQUFhOzRCQUN2QyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVE7aUNBQy9ELEtBQUssQ0FBQyxHQUFHLENBQUM7aUNBQ1YsS0FBSyxDQUFDLENBQUMsQ0FBQztpQ0FDUixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ1AsYUFBYSxHQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxnQkFBYyxnQkFBa0IsQ0FBQzs0QkFDM0QsR0FBRyxHQUFNLGFBQWEsMkJBQXdCLENBQUM7NEJBRXhDLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29DQUN6QyxNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixJQUFJLEVBQUU7d0NBQ0osUUFBUSxVQUFBO3dDQUNSLFFBQVEsVUFBQTt3Q0FDUixRQUFRLFVBQUE7d0NBQ1IsY0FBYyxnQkFBQTtxQ0FDZjtpQ0FDRixDQUFDLEVBQUE7OzRCQVRJLElBQUksR0FBRyxTQVNYOzRCQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7O1dBRUc7UUFDSywwQ0FBVyxHQUFuQixVQUFvQixNQUFjLEVBQUUsRUFBeUI7WUFDM0QsTUFBTSxHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUM7WUFDN0IsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLGtCQUFVLENBQUM7Z0JBQ1QsTUFBTSxRQUFBO2dCQUNOLEdBQUcsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8saUNBQThCO2FBQzlELENBQUM7aUJBQ0MsSUFBSSxDQUFDLFVBQUMsRUFBTztvQkFBTCxHQUFHLFNBQUE7Z0JBQU8sT0FBQSxFQUFFLENBQUMsR0FBRyxDQUFDO1lBQVAsQ0FBTyxDQUFDO2lCQUMxQixLQUFLLENBQUMsVUFBQyxFQUFpQjtvQkFBZixJQUFJLFVBQUEsRUFBRSxPQUFPLGFBQUE7Z0JBQU8sT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1lBQXRDLENBQXNDLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBRUQ7OztXQUdHO1FBQ1UsMkNBQVksR0FBekIsVUFBMEIsT0FBNkI7Ozs7Z0NBQzlDLHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUE7Z0NBQXZDLHNCQUFPLFNBQWdDLEVBQUM7Ozs7U0FDekM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBcUJHO1FBQ1UsMkNBQVksR0FBekIsVUFBMEIsT0FBNkI7Ozs7Ozs7NEJBQzdDLE1BQU0sR0FBSyxDQUFBLE9BQU8sSUFBSSxFQUFFLENBQUEsT0FBbEIsQ0FBbUI7NEJBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFHZixJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO2dDQUM5QixLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxVQUFBLEdBQUc7b0NBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDZixDQUFDLENBQUMsQ0FBQzs0QkFDTCxDQUFDLENBQUMsQ0FBQzs0QkFHaUIscUJBQU0sSUFBSSxFQUFBOzs0QkFBeEIsR0FBRyxHQUFXLFNBQVU7NEJBQ2pCLHFCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQTs7NEJBQS9DLElBQUksR0FBRyxTQUF3Qzs0QkFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7O1dBR0c7UUFDVSwwQ0FBVyxHQUF4Qjs7Ozs7OzRCQUNRLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ2QscUJBQU0sZ0JBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7b0NBQ3RFLFVBQVUsRUFBRSwwQkFBYSxDQUFDLElBQUk7b0NBQzlCLFFBQVEsRUFBRSxNQUFNO2lDQUNqQixDQUFDLEVBQUE7OzRCQUhXLElBQUksR0FBSyxDQUFBLFNBR3BCLENBQUEsSUFIZTs0QkFJakIsc0JBQU8sZ0NBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUM7Ozs7U0FDdkM7UUFFRDs7O1dBR0c7UUFDVSwwQ0FBVyxHQUF4QixVQUF5QixJQUFrQjs7Ozs7OzRCQUN6QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQ0FDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzZCQUN6Qzs0QkFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUNKLHFCQUFNLHdCQUFXLENBQy9DLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLFVBQVUsRUFBRSwwQkFBYSxDQUFDLElBQUk7b0NBQzlCLFFBQVEsRUFBRSxNQUFNO29DQUNoQixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDO3dDQUNyQyxHQUFHLEtBQUE7d0NBQ0gsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNqQyxDQUFDLEVBSG9DLENBR3BDLENBQUM7aUNBQ0osQ0FDRixFQUFBOzs0QkFYb0IsTUFBTSxHQUFLLENBQUEsU0FXL0IsQ0FBQSxZQVgwQjs0QkFZM0Isc0JBQU8sTUFBTSxFQUFDOzs7O1NBQ2Y7UUFFRDs7V0FFRztRQUNVLDZDQUFjLEdBQTNCLFVBQTRCLEdBQVc7Ozs7Ozs0QkFDL0IsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDcEMscUJBQU0sc0JBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7b0NBQ3RELFVBQVUsRUFBRSwwQkFBYSxDQUFDLElBQUk7b0NBQzlCLFFBQVEsRUFBRSxNQUFNO29DQUNoQixHQUFHLEtBQUE7aUNBQ0osQ0FBQyxFQUFBOzs0QkFKRixTQUlFLENBQUM7Ozs7O1NBQ0o7UUFFRDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDRywrQ0FBZ0IsR0FBdEI7Ozs7Z0NBQ1MscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQ25DLE1BQU0sRUFBRSxLQUFLO2dDQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sb0NBQWlDOzZCQUNqRSxDQUFDLEVBQUE7Z0NBSEYsc0JBQU8sU0FHTCxFQUFDOzs7O1NBQ0o7UUFFRDs7Ozs7V0FLRztRQUNVLHNEQUF1QixHQUFwQyxVQUNFLFNBQWlCLEVBQ2pCLE9BRUM7Ozs7Ozs0QkFFSyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUM1QixZQUFZLEdBQUssQ0FBQSxPQUFPLElBQUksRUFBRSxDQUFBLGFBQWxCLENBQW1COzRCQUN0QixxQkFBTSx3Q0FBMkIsQ0FDaEQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsRUFBRSxFQUFFLE1BQU07b0NBQ1YsU0FBUyxXQUFBO29DQUNULFlBQVksY0FBQTtpQ0FDYixDQUNGLEVBQUE7OzRCQVJPLElBQUksR0FBSyxDQUFBLFNBUWhCLENBQUEsS0FSVzs0QkFTWixJQUFJLENBQUMsSUFBSSxFQUFFO2dDQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7NkJBQzFCOzRCQUVDLEtBQ0UsSUFBSSxvQkFEbUMsRUFBbEIsSUFBSSxVQUFBLEVBQUUsVUFBVSxnQkFBQSxDQUNoQzs0QkFDVCxJQUFJLEdBQUcsaUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3ZDLHNCQUFPO29DQUNMLElBQUksTUFBQTtvQ0FDSixVQUFVLFlBQUE7aUNBQ1gsRUFBQzs7OztTQUNIO1FBRUQ7O1dBRUc7UUFDVSwyQ0FBWSxHQUF6QixVQUEwQixPQUt6Qjs7Ozs7OzRCQUNTLFFBQVEsR0FBK0IsT0FBTyxTQUF0QyxFQUFFLEtBQUssR0FBd0IsT0FBTyxNQUEvQixFQUFFLEtBQUssR0FBaUIsT0FBTyxNQUF4QixFQUFFLFVBQVUsR0FBSyxPQUFPLFdBQVosQ0FBYTs0QkFDeEIscUJBQU0seUJBQVksQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsUUFBUSxVQUFBO29DQUNSLEtBQUssT0FBQTtvQ0FDTCxLQUFLLE9BQUE7b0NBQ0wsVUFBVSxZQUFBO2lDQUNYLENBQ0YsRUFBQTs7NEJBVHFCLElBQUksR0FBSyxDQUFBLFNBUzlCLENBQUEsYUFUeUI7NEJBVTFCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0ksNERBQTZCLEdBQXBDLFVBQ0UsUUFBZ0I7WUFFaEIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLE1BQU0sNkJBQTZCLENBQUM7YUFDckM7WUFFRCxJQUFNLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1lBQzFFLElBQU0sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDbkUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDdEMsT0FBTyw2QkFBcUIsQ0FBQyxJQUFJLENBQUM7YUFDbkM7WUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN4QyxPQUFPLDZCQUFxQixDQUFDLE1BQU0sQ0FBQzthQUNyQztZQUNELE9BQU8sNkJBQXFCLENBQUMsR0FBRyxDQUFDO1FBQ25DLENBQUM7UUFDRCxvREFBcUIsR0FBckIsVUFBc0IsTUFBK0I7WUFDbkQsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO1lBQ2xCLHNCQUFzQjtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7Z0JBQ3pCLElBQUksT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxFQUFFO29CQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELHNEQUF1QixHQUF2QixVQUF3QixLQUFjLEVBQUUsTUFBZTtZQUNyRCxJQUFJLEVBQUUsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3RDLElBQUksS0FBSyxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNEOzs7V0FHRztRQUNHLHdFQUF5QyxHQUEvQyxVQUNFLElBQVksRUFDWixZQUFxQjs7Ozs7OzRCQUVmLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0NBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0NBQ2xDLFVBQVUsRUFBRSxvQkFBb0I7Z0NBQ2hDLElBQUksTUFBQTtnQ0FDSixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dDQUN0QyxhQUFhLEVBQUUsWUFBWTs2QkFDNUIsQ0FBQyxDQUFDOzRCQUNDLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7Z0NBQ3BDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sZ0JBQWEsQ0FBQzs2QkFDL0M7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8saUJBQWMsQ0FBQzs2QkFDaEQ7NEJBQ2MscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQ2hELE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRSxJQUFJO29DQUNWLE9BQU8sRUFBRTt3Q0FDUCxjQUFjLEVBQUUsbUNBQW1DO3FDQUNwRDtpQ0FDRixDQUFDLEVBQUE7OzRCQVBFLFFBQVEsR0FBRyxTQU9iOzRCQUNGLHNCQUFPLFFBQVEsRUFBQzs7OztTQUNqQjtRQUNEOzs7V0FHRztRQUNHLHlFQUEwQyxHQUFoRCxVQUNFLElBQVksRUFDWixZQUFxQjs7Ozs7OzRCQUVqQixHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dDQUNwQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGdCQUFhLENBQUM7NkJBQy9DO2lDQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dDQUM1QyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGlCQUFjLENBQUM7NkJBQ2hEOzRCQUNLLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0NBQ3RDLFVBQVUsRUFBRSxvQkFBb0I7Z0NBQ2hDLElBQUksTUFBQTtnQ0FDSixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dDQUN0QyxhQUFhLEVBQUUsWUFBWTs2QkFDNUIsQ0FBQyxDQUFDOzRCQUNZLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO29DQUNoRCxJQUFJLEVBQUUsSUFBSTtvQ0FDVixNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixPQUFPLEVBQUU7d0NBQ1AsYUFBYSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtxQ0FDOUM7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFQRSxRQUFRLEdBQUcsU0FPYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7Ozs7U0FDakI7UUFDRDs7O1dBR0c7UUFDRyw0REFBNkIsR0FBbkMsVUFBb0MsSUFBWSxFQUFFLFlBQXFCOzs7Ozs7NEJBQ2pFLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7Z0NBQ3BDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sZ0JBQWEsQ0FBQzs2QkFDL0M7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8saUJBQWMsQ0FBQzs2QkFDaEQ7NEJBQ0ssSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztnQ0FDN0IsVUFBVSxFQUFFLG9CQUFvQjtnQ0FDaEMsSUFBSSxNQUFBO2dDQUNKLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0NBQ3RDLGFBQWEsRUFBRSxZQUFZOzZCQUM1QixDQUFDLENBQUM7NEJBQ1kscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQ2hELE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRSxJQUFJO2lDQUNYLENBQUMsRUFBQTs7NEJBSkUsUUFBUSxHQUFHLFNBSWI7NEJBQ0Ysc0JBQU8sUUFBUSxFQUFDOzs7O1NBQ2pCO1FBQ0ssbURBQW9CLEdBQTFCLFVBQ0UsSUFBWSxFQUNaLE9BQW1DOzs7Ozs0QkFFbkMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dDQUN0RCxNQUFNLElBQUksS0FBSyxDQUNiLGlFQUFpRSxDQUNsRSxDQUFDOzZCQUNIOzRCQUNELElBQ0UsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0NBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEtBQUssTUFBTSxFQUMvQztnQ0FDQSxNQUFNLElBQUksS0FBSyxDQUNiLGtEQUFrRCxDQUNuRCxDQUFDOzZCQUNIO2lDQUNHLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsS0FBSyxvQkFBb0IsQ0FBQSxFQUE3RCx3QkFBNkQ7NEJBQ3hELHFCQUFNLElBQUksQ0FBQyx5Q0FBeUMsQ0FDekQsSUFBSSxFQUNKLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxZQUFZLENBQ3RCLEVBQUE7Z0NBSEQsc0JBQU8sU0FHTixFQUFDOztpQ0FFQSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEtBQUsscUJBQXFCLENBQUEsRUFBOUQsd0JBQThEOzRCQUN6RCxxQkFBTSxJQUFJLENBQUMsMENBQTBDLENBQzFELElBQUksRUFDSixPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsWUFBWSxDQUN0QixFQUFBO2dDQUhELHNCQUFPLFNBR04sRUFBQzs7aUNBRUEsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixLQUFLLE1BQU0sQ0FBQSxFQUEvQyx3QkFBK0M7NEJBQzFDLHFCQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FDN0MsSUFBSSxFQUNKLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxZQUFZLENBQ3RCLEVBQUE7Z0NBSEQsc0JBQU8sU0FHTixFQUFDOzs7OztTQUVMO1FBQ0Qsb0RBQXFCLEdBQXJCO1lBQ0UsT0FBTyw0QkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QscURBQXNCLEdBQXRCLFVBQXVCLE9BR3RCO1lBQ0MsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixNQUFNLElBQUksS0FBSyxDQUNiLHVGQUF1RixDQUN4RixDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtnQkFDMUIsTUFBTSxJQUFJLEtBQUssQ0FDYiw4Q0FBOEMsQ0FDL0MsQ0FBQzthQUNIO1lBQ08sSUFBQSxLQUFvQixPQUFPLE9BQVosRUFBZixNQUFNLG1CQUFHLE1BQU0sS0FBQSxDQUFhO1lBQ3BDLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtnQkFDckIsa0JBQWtCO2dCQUNsQixPQUFPLGdCQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztxQkFDakMsUUFBUSxDQUFDLG1CQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztxQkFDN0IsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7cUJBQ25CLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO3FCQUNuQixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUN0QixPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUM7YUFDOUI7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUNLLGdFQUFpQyxHQUF2QyxVQUNFLEtBQWEsRUFDYixPQUdDOzs7Ozs7NEJBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQ0FDVixNQUFNLElBQUksS0FBSyxDQUNiLGtGQUFrRixDQUNuRixDQUFDOzZCQUNIOzRCQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0NBQ1osTUFBTSxJQUFJLEtBQUssQ0FDYiw0SEFBNEg7Z0NBQzVILGdMQUFnTDtpQ0FDakwsQ0FBQzs2QkFDSDs0QkFDRyxDQUFDLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxLQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDOzRCQUM3QyxDQUFDLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsWUFBWSxLQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOzRCQUMvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dDQUN0QyxTQUFTLEVBQUUsQ0FBQztnQ0FDWixhQUFhLEVBQUUsQ0FBQztnQ0FDaEIsVUFBVSxFQUFFLG9CQUFvQjtnQ0FDaEMsS0FBSyxFQUFFLEtBQUs7NkJBQ2IsQ0FBQyxDQUFDOzRCQUNDLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7Z0NBQ3BDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sZ0JBQWEsQ0FBQzs2QkFDL0M7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8saUJBQWMsQ0FBQzs2QkFDaEQ7NEJBQ2MscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQ2hELE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRSxJQUFJO29DQUNWLE9BQU8sRUFBRTt3Q0FDUCxjQUFjLEVBQUUsbUNBQW1DO3FDQUNwRDtpQ0FDRixDQUFDLEVBQUE7OzRCQVBFLFFBQVEsR0FBRyxTQU9iOzRCQUNGLHNCQUFPLFFBQVEsRUFBQzs7OztTQUNqQjtRQUNLLHVEQUF3QixHQUE5QixVQUNFLFdBQW1CLEVBQ25CLE9BR0M7Ozs7Ozs0QkFFRCxJQUFJLE9BQU8sRUFBRTtnQ0FDWCxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29DQUMvRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7aUNBQzFEO2dDQUNELElBQ0UsT0FBTyxDQUFDLFVBQVU7b0NBQ2xCLENBQUMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQ3pEO29DQUNBLE1BQU0sSUFBSSxLQUFLLENBQ2Isb0RBQW9ELENBQ3JELENBQUM7aUNBQ0g7Z0NBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBRTtvQ0FDN0QsTUFBTSxJQUFJLEtBQUssQ0FDYix3REFBd0QsQ0FDekQsQ0FBQztpQ0FDSDtnQ0FDRCxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO2dDQUN6QyxPQUFPLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDOzZCQUNwRDs0QkFDRyxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dDQUNwQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGFBQVUsQ0FBQzs2QkFDNUM7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sY0FBVyxDQUFDOzZCQUM3QztpQ0FDRyxDQUFBLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sTUFBSyxNQUFNLENBQUEsRUFBMUIsd0JBQTBCO2lDQUN4QixDQUFBLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsTUFBSyxRQUFRLENBQUEsRUFBaEMsd0JBQWdDOzRCQUNuQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDaEQsTUFBTSxFQUFFLE1BQU07b0NBQ2QsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsT0FBTyxFQUFFO3dDQUNQLGFBQWEsRUFBRSxTQUFTLEdBQUcsV0FBVztxQ0FDdkM7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFORSxRQUFRLEdBQUcsU0FNYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7O2lDQUNQLENBQUEsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsVUFBVSxNQUFLLE9BQU8sQ0FBQSxFQUEvQix3QkFBK0I7NEJBQ3pCLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO29DQUNoRCxNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixNQUFNLEVBQUU7d0NBQ04sWUFBWSxFQUFFLFdBQVc7cUNBQzFCO2lDQUNGLENBQUMsRUFBQTs7NEJBTkUsUUFBUSxHQUFHLFNBTWI7NEJBQ0Ysc0JBQU8sUUFBUSxFQUFDOztpQ0FDUCxDQUFBLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsTUFBSyxNQUFNLENBQUEsRUFBOUIsd0JBQThCOzRCQUN4QixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDaEQsTUFBTSxFQUFFLE1BQU07b0NBQ2QsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsSUFBSSxFQUFFLGlCQUFTLENBQUM7d0NBQ2QsWUFBWSxFQUFFLFdBQVc7cUNBQzFCLENBQUM7aUNBQ0gsQ0FBQyxFQUFBOzs0QkFORSxRQUFRLEdBQUcsU0FNYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7OztpQ0FFVCxDQUFBLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sTUFBSyxLQUFLLENBQUEsRUFBekIseUJBQXlCO2lDQUM5QixDQUFBLENBQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsTUFBSyxRQUFRLENBQUEsRUFBaEMsd0JBQWdDOzRCQUNuQixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDaEQsTUFBTSxFQUFFLEtBQUs7b0NBQ2IsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsT0FBTyxFQUFFO3dDQUNQLGFBQWEsRUFBRSxTQUFTLEdBQUcsV0FBVztxQ0FDdkM7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFORSxRQUFRLEdBQUcsU0FNYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7O2lDQUNQLENBQUEsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsVUFBVSxNQUFLLE9BQU8sQ0FBQSxFQUEvQix5QkFBK0I7NEJBQ3pCLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO29DQUNoRCxNQUFNLEVBQUUsS0FBSztvQ0FDYixHQUFHLEVBQUUsR0FBRztvQ0FDUixNQUFNLEVBQUU7d0NBQ04sWUFBWSxFQUFFLFdBQVc7cUNBQzFCO2lDQUNGLENBQUMsRUFBQTs7NEJBTkUsUUFBUSxHQUFHLFNBTWI7NEJBQ0Ysc0JBQU8sUUFBUSxFQUFDOztpQ0FJSCxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztnQ0FDaEQsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsR0FBRyxFQUFFLEdBQUc7Z0NBQ1IsTUFBTSxFQUFFO29DQUNOLFlBQVksRUFBRSxXQUFXO2lDQUMxQjs2QkFDRixDQUFDLEVBQUE7OzRCQU5FLFFBQVEsR0FBRyxTQU1iOzRCQUNGLHNCQUFPLFFBQVEsRUFBQzs7Ozs7U0FFbkI7UUFDRCxnREFBaUIsR0FBakIsVUFBa0IsT0FBaUQ7WUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO2dCQUM1QixNQUFNLElBQUksS0FBSyxDQUNiLDBFQUEwRSxDQUMzRSxDQUFDO2FBQ0g7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtnQkFDcEMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBc0IsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQXVCLENBQUMsQ0FBQzthQUM5RDtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dCQUNwQyxPQUFPLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQXFCLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sSUFBSSxLQUFLLENBQ2IsOEVBQThFLENBQy9FLENBQUM7UUFDSixDQUFDO1FBQ0QscURBQXNCLEdBQXRCLFVBQXVCLE9BQW9CO1lBQ3pDLElBQUksR0FBRyxHQUFRO2dCQUNiLEtBQUssRUFBRSxXQUFXO2dCQUNsQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxZQUFZLEVBQUUsZUFBZTtnQkFDN0IsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLFdBQVcsRUFBRSxjQUFjO2dCQUMzQixhQUFhLEVBQUUsZ0JBQWdCO2dCQUMvQixtQkFBbUIsRUFBRSx1QkFBdUI7Z0JBQzVDLFFBQVEsRUFBRSxXQUFXO2FBQ3RCLENBQUM7WUFDRixJQUFJLEdBQUcsR0FBUTtnQkFDYixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDakIsUUFBUSxFQUFFO3FCQUNWLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ2pCLFFBQVEsRUFBRTtxQkFDVixLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUssRUFBRSxvQ0FBb0M7Z0JBQzNDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQzdCLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ3RDLGFBQWEsRUFBRSxNQUFNO2FBQ3RCLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ3hCLElBQUksT0FBTyxJQUFLLE9BQWUsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7d0JBQzdELEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO3FCQUN4QjtvQkFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUksT0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxZQUFZLEdBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM5RCxPQUFPLFlBQVksQ0FBQztRQUN0QixDQUFDO1FBQ0Qsc0RBQXVCLEdBQXZCLFVBQXdCLE9BQXFCO1lBQzNDLElBQUksR0FBRyxHQUFRO2dCQUNiLEtBQUssRUFBRSxXQUFXO2dCQUNsQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsT0FBTztnQkFDZCxZQUFZLEVBQUUsZUFBZTtnQkFDN0IsV0FBVyxFQUFFLGNBQWM7YUFDNUIsQ0FBQztZQUNGLElBQUksR0FBRyxHQUFRO2dCQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO3FCQUNqQixRQUFRLEVBQUU7cUJBQ1YsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsTUFBTTtnQkFDYixTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUM3QixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUN0QyxhQUFhLEVBQUUsTUFBTTthQUN0QixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUN4QixJQUFJLE9BQU8sSUFBSyxPQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSSxPQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0QyxJQUFJLFlBQVksR0FDZCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQy9ELE9BQU8sWUFBWSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxxREFBc0IsR0FBdEI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzVFLENBQUM7UUFDRCxvREFBcUIsR0FBckIsVUFBc0IsT0FBbUI7WUFDdkMsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxFQUFFO2dCQUNwQixPQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxpQkFBWSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssa0JBQVksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBRSxDQUFDO2FBQy9GO1lBQ0QsT0FBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8saUJBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFPLENBQUM7UUFDcEUsQ0FBQztRQUNELGlEQUFrQixHQUFsQixVQUFtQixPQUFzQjtZQUN2QyxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUN2RSxDQUFDO2FBQ0g7WUFDRCxPQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxvQkFBaUIsQ0FBQztRQUNyRCxDQUFDO1FBQ0Qsa0RBQW1CLEdBQW5CLFVBQW9CLE9BQXNCO1lBQ3hDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDeEQsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsQ0FDM0MsQ0FBQzthQUNIO1lBQ0QsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsV0FBVyxFQUFFO2dCQUN4QixPQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyx3Q0FBbUMsT0FBTyxDQUFDLE9BQU8sa0NBQTZCLE9BQU8sQ0FBQyxXQUFhLENBQUM7YUFDdkk7WUFDRCxPQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxzQkFBbUIsQ0FBQztRQUN2RCxDQUFDO1FBQ0Qsa0RBQW1CLEdBQW5CLFVBQW9CLE9BQXVCO1lBQ3pDLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsRUFBRTtnQkFDeEIsT0FBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sMkNBQXNDLE9BQU8sQ0FBQyxXQUFhLENBQUM7YUFDOUY7WUFDRCxPQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTywwQkFBdUIsQ0FBQztRQUMzRCxDQUFDO1FBQ0QsNkNBQWMsR0FBZCxVQUFlLE9BQXVCO1lBQ3BDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUNuQyxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6QztZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxLQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLENBQUEsRUFBRTtnQkFDdkQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUM7WUFDRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0ssbUZBQW9ELEdBQTFELFVBQ0UsWUFBb0I7Ozs7Ozs0QkFFZCxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dDQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dDQUM3QixhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dDQUNsQyxVQUFVLEVBQUUsZUFBZTtnQ0FDM0IsYUFBYSxFQUFFLFlBQVk7NkJBQzVCLENBQUMsQ0FBQzs0QkFDQyxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dDQUNwQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGdCQUFhLENBQUM7NkJBQy9DO2lDQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dDQUM1QyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGlCQUFjLENBQUM7NkJBQ2hEOzRCQUNjLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO29DQUNoRCxNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixJQUFJLEVBQUUsSUFBSTtvQ0FDVixPQUFPLEVBQUU7d0NBQ1AsY0FBYyxFQUFFLG1DQUFtQztxQ0FDcEQ7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFQRSxRQUFRLEdBQUcsU0FPYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7Ozs7U0FDakI7UUFDSyxvRkFBcUQsR0FBM0QsVUFDRSxZQUFvQjs7Ozs7OzRCQUVoQixHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dDQUNwQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGdCQUFhLENBQUM7NkJBQy9DO2lDQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dDQUM1QyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGlCQUFjLENBQUM7NkJBQ2hEOzRCQUNLLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0NBQ3RDLFVBQVUsRUFBRSxlQUFlO2dDQUMzQixhQUFhLEVBQUUsWUFBWTs2QkFDNUIsQ0FBQyxDQUFDOzRCQUNZLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO29DQUNoRCxJQUFJLEVBQUUsSUFBSTtvQ0FDVixNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixPQUFPLEVBQUU7d0NBQ1AsYUFBYSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtxQ0FDOUM7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFQRSxRQUFRLEdBQUcsU0FPYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7Ozs7U0FDakI7UUFDSyx1RUFBd0MsR0FBOUMsVUFBK0MsWUFBb0I7Ozs7Ozs0QkFDN0QsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtnQ0FDcEMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxnQkFBYSxDQUFDOzZCQUMvQztpQ0FBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtnQ0FDNUMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxpQkFBYyxDQUFDOzZCQUNoRDs0QkFDSyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dDQUN0QyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dDQUM3QixVQUFVLEVBQUUsZUFBZTtnQ0FDM0IsYUFBYSxFQUFFLFlBQVk7NkJBQzVCLENBQUMsQ0FBQzs0QkFDWSxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDaEQsTUFBTSxFQUFFLE1BQU07b0NBQ2QsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsSUFBSSxFQUFFLElBQUk7aUNBQ1gsQ0FBQyxFQUFBOzs0QkFKRSxRQUFRLEdBQUcsU0FJYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7Ozs7U0FDakI7UUFDSyw4REFBK0IsR0FBckMsVUFBc0MsWUFBb0I7Ozs7OzRCQUN4RCxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ3RELE1BQU0sSUFBSSxLQUFLLENBQ2IsaUVBQWlFLENBQ2xFLENBQUM7NkJBQ0g7NEJBQ0QsSUFDRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsS0FBSyxNQUFNLEVBQy9DO2dDQUNBLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0RBQWtELENBQ25ELENBQUM7NkJBQ0g7aUNBQ0csQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixLQUFLLG9CQUFvQixDQUFBLEVBQTdELHdCQUE2RDs0QkFDeEQscUJBQU0sSUFBSSxDQUFDLG9EQUFvRCxDQUNwRSxZQUFZLENBQ2IsRUFBQTtnQ0FGRCxzQkFBTyxTQUVOLEVBQUM7O2lDQUVBLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsS0FBSyxxQkFBcUIsQ0FBQSxFQUE5RCx3QkFBOEQ7NEJBQ3pELHFCQUFNLElBQUksQ0FBQyxxREFBcUQsQ0FDckUsWUFBWSxDQUNiLEVBQUE7Z0NBRkQsc0JBQU8sU0FFTixFQUFDOztpQ0FFQSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEtBQUssTUFBTSxDQUFBLEVBQS9DLHdCQUErQzs0QkFDMUMscUJBQU0sSUFBSSxDQUFDLHdDQUF3QyxDQUFDLFlBQVksQ0FBQyxFQUFBO2dDQUF4RSxzQkFBTyxTQUFpRSxFQUFDOzs7OztTQUU1RTtRQUVLLCtEQUFnQyxHQUF0QyxVQUF1QyxLQUFhOzs7Ozs7NEJBQzVDLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0NBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07Z0NBQ2xDLEtBQUssT0FBQTs2QkFDTixDQUFDLENBQUM7NEJBQ0MsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtnQ0FDcEMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTywyQkFBd0IsQ0FBQzs2QkFDMUQ7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sNEJBQXlCLENBQUM7NkJBQzNEOzRCQUNjLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO29DQUNoRCxNQUFNLEVBQUUsTUFBTTtvQ0FDZCxHQUFHLEVBQUUsR0FBRztvQ0FDUixJQUFJLEVBQUUsSUFBSTtvQ0FDVixPQUFPLEVBQUU7d0NBQ1AsY0FBYyxFQUFFLG1DQUFtQztxQ0FDcEQ7aUNBQ0YsQ0FBQyxFQUFBOzs0QkFQRSxRQUFRLEdBQUcsU0FPYjs0QkFDRixzQkFBTyxRQUFRLEVBQUM7Ozs7U0FDakI7UUFDSyxnRUFBaUMsR0FBdkMsVUFBd0MsS0FBYTs7Ozs7OzRCQUMvQyxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dDQUNwQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLDJCQUF3QixDQUFDOzZCQUMxRDtpQ0FBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtnQ0FDNUMsTUFBTSxJQUFJLEtBQUssQ0FDYixvREFBb0QsQ0FDckQsQ0FBQztnQ0FDRixHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLDRCQUF5QixDQUFDOzZCQUMzRDs0QkFDSyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dDQUN0QyxLQUFLLEVBQUUsS0FBSzs2QkFDYixDQUFDLENBQUM7NEJBQ1UscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQzlDLElBQUksRUFBRSxJQUFJO29DQUNWLE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLE9BQU8sRUFBRTt3Q0FDUCxhQUFhLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFO3FDQUM5QztpQ0FDRixDQUFDLEVBQUE7OzRCQVBFLE1BQU0sR0FBRyxTQU9YOzRCQUNGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBQ0ssbURBQW9CLEdBQTFCLFVBQTJCLEtBQWE7Ozs7Ozs0QkFDbEMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtnQ0FDcEMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTywyQkFBd0IsQ0FBQzs2QkFDMUQ7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sNEJBQXlCLENBQUM7NkJBQzNEOzRCQUNLLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0NBQzdCLEtBQUssRUFBRSxLQUFLOzZCQUNiLENBQUMsQ0FBQzs0QkFDVSxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDOUMsTUFBTSxFQUFFLE1BQU07b0NBQ2QsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsSUFBSSxFQUFFLElBQUk7aUNBQ1gsQ0FBQyxFQUFBOzs0QkFKRSxNQUFNLEdBQUcsU0FJWDs0QkFDRixzQkFBTyxNQUFNLEVBQUM7Ozs7U0FDZjtRQUNLLDBDQUFXLEdBQWpCLFVBQWtCLEtBQWE7Ozs7OzRCQUM3QixJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ3RELE1BQU0sSUFBSSxLQUFLLENBQ2IsaUVBQWlFLENBQ2xFLENBQUM7NkJBQ0g7NEJBQ0QsSUFDRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsS0FBSyxNQUFNLEVBQ3BEO2dDQUNBLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0RBQWtELENBQ25ELENBQUM7NkJBQ0g7aUNBQ0csQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixLQUFLLG9CQUFvQixDQUFBLEVBQWxFLHdCQUFrRTs0QkFDcEUscUJBQU0sSUFBSSxDQUFDLGdDQUFnQyxDQUFDLEtBQUssQ0FBQyxFQUFBOzs0QkFBbEQsU0FBa0QsQ0FBQzs0QkFDbkQsc0JBQU8sSUFBSSxFQUFDOztpQ0FFVixDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEtBQUsscUJBQXFCLENBQUEsRUFBbkUsd0JBQW1FOzRCQUNyRSxxQkFBTSxJQUFJLENBQUMsaUNBQWlDLENBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUFuRCxTQUFtRCxDQUFDOzRCQUNwRCxzQkFBTyxJQUFJLEVBQUM7O2lDQUVWLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsS0FBSyxNQUFNLENBQUEsRUFBcEQsd0JBQW9EOzRCQUN0RCxxQkFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEVBQUE7OzRCQUF0QyxTQUFzQyxDQUFDOzRCQUN2QyxzQkFBTyxJQUFJLEVBQUM7Z0NBRWQsTUFBTSxJQUFJLEtBQUssQ0FDYixvSEFBb0gsQ0FDckgsQ0FBQzs7OztTQUNIO1FBRUssbUVBQW9DLEdBQTFDLFVBQTJDLEtBQWE7Ozs7Ozs0QkFDaEQsSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztnQ0FDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQ0FDbEMsS0FBSyxPQUFBOzZCQUNOLENBQUMsQ0FBQzs0QkFDQyxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO2dDQUNwQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLDhCQUEyQixDQUFDOzZCQUM3RDtpQ0FBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtnQ0FDNUMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTywrQkFBNEIsQ0FBQzs2QkFDOUQ7NEJBQ2MscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQ2hELE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRSxJQUFJO29DQUNWLE9BQU8sRUFBRTt3Q0FDUCxjQUFjLEVBQUUsbUNBQW1DO3FDQUNwRDtpQ0FDRixDQUFDLEVBQUE7OzRCQVBFLFFBQVEsR0FBRyxTQU9iOzRCQUNGLHNCQUFPLFFBQVEsRUFBQzs7OztTQUNqQjtRQUNLLG9FQUFxQyxHQUEzQyxVQUE0QyxLQUFhOzs7Ozs7NEJBQ25ELEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7Z0NBQ3BDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sOEJBQTJCLENBQUM7NkJBQzdEO2lDQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO2dDQUM1QyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLCtCQUE0QixDQUFDOzZCQUM5RDs0QkFDSyxJQUFJLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO2dDQUN0QyxLQUFLLEVBQUUsS0FBSzs2QkFDYixDQUFDLENBQUM7NEJBQ1UscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQzlDLElBQUksRUFBRSxJQUFJO29DQUNWLE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLE9BQU8sRUFBRTt3Q0FDUCxhQUFhLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixFQUFFO3FDQUM5QztpQ0FDRixDQUFDLEVBQUE7OzRCQVBFLE1BQU0sR0FBRyxTQU9YOzRCQUNGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBQ0ssdURBQXdCLEdBQTlCLFVBQStCLEtBQWE7Ozs7Ozs0QkFDdEMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs0QkFDYixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtnQ0FDcEMsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyw4QkFBMkIsQ0FBQzs2QkFDN0Q7aUNBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7Z0NBQzVDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sK0JBQTRCLENBQUM7NkJBQzlEOzRCQUNLLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7Z0NBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0NBQzdCLEtBQUssRUFBRSxLQUFLOzZCQUNiLENBQUMsQ0FBQzs0QkFDVSxxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDOUMsTUFBTSxFQUFFLE1BQU07b0NBQ2QsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsSUFBSSxFQUFFLElBQUk7aUNBQ1gsQ0FBQyxFQUFBOzs0QkFKRSxNQUFNLEdBQUcsU0FJWDs0QkFDRixzQkFBTyxNQUFNLEVBQUM7Ozs7U0FDZjtRQUNLLDhDQUFlLEdBQXJCLFVBQXNCLEtBQWE7Ozs7OzRCQUNqQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ3RELE1BQU0sSUFBSSxLQUFLLENBQ2IsaUVBQWlFLENBQ2xFLENBQUM7NkJBQ0g7NEJBQ0QsSUFDRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsS0FBSyxNQUFNLEVBQ3ZEO2dDQUNBLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0RBQWtELENBQ25ELENBQUM7NkJBQ0g7aUNBQ0csQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixLQUFLLG9CQUFvQixDQUFBLEVBQXJFLHdCQUFxRTs0QkFDaEUscUJBQU0sSUFBSSxDQUFDLG9DQUFvQyxDQUFDLEtBQUssQ0FBQyxFQUFBO2dDQUE3RCxzQkFBTyxTQUFzRCxFQUFDOztpQ0FHOUQsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixLQUFLLHFCQUFxQixDQUFBLEVBQXRFLHdCQUFzRTs0QkFFL0QscUJBQU0sSUFBSSxDQUFDLHFDQUFxQyxDQUFDLEtBQUssQ0FBQyxFQUFBO2dDQUE5RCxzQkFBTyxTQUF1RCxFQUFDOztpQ0FFN0QsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixLQUFLLE1BQU0sQ0FBQSxFQUF2RCx3QkFBdUQ7NEJBQ2xELHFCQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFBQTtnQ0FBakQsc0JBQU8sU0FBMEMsRUFBQztnQ0FFcEQsTUFBTSxJQUFJLEtBQUssQ0FDYix1SEFBdUgsQ0FDeEgsQ0FBQzs7OztTQUNIO1FBQ0ssK0NBQWdCLEdBQXRCLFVBQXVCLE1BQWMsRUFBRSxPQUFlOzs7Ozs7NEJBQzlDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8saUJBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLGNBQVcsQ0FBQzs0QkFDbkUscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQzlDLE1BQU0sRUFBRSxLQUFLO29DQUNiLEdBQUcsRUFBRSxHQUFHO29DQUNSLE1BQU0sRUFBRTt3Q0FDTixPQUFPLFNBQUE7d0NBQ1AsTUFBTSxRQUFBO3FDQUNQO2lDQUNGLENBQUMsRUFBQTs7NEJBUEUsTUFBTSxHQUFHLFNBT1g7NEJBQ0ssS0FBSyxHQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQXRCLENBQXVCOzRCQUNuQyxpQ0FDRSxLQUFLLEVBQUUsS0FBSyxLQUFLLEtBQUssSUFDbkIsQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDLEdBQ2pEOzs7O1NBQ0g7UUFDSywrQ0FBZ0IsR0FBdEIsVUFDRSxNQUFjLEVBQ2QsT0FBZSxFQUNmLE1BQStCO1lBQS9CLHVCQUFBLEVBQUEsZUFBK0I7Ozs7Ozs0QkFJL0IsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQ0FDWCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7NkJBQ3JDOzRCQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0NBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzZCQUNyQzs0QkFDRCxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRTtnQ0FDekMsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDOzZCQUNqRDs0QkFDSyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGlCQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxxQkFBa0IsQ0FBQzs0QkFDMUUscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQzlDLE1BQU0sRUFBRSxLQUFLO29DQUNiLEdBQUcsRUFBRSxHQUFHO29DQUNSLE1BQU0sRUFBRTt3Q0FDTixPQUFPLFNBQUE7d0NBQ1AsTUFBTSxRQUFBO3dDQUNOLE1BQU0sUUFBQTtxQ0FDUDtpQ0FDRixDQUFDLEVBQUE7OzRCQVJFLE1BQU0sR0FBRyxTQVFYOzRCQUNGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBRUQ7Ozs7V0FJRztRQUNVLHNDQUFPLEdBQXBCLFVBQXFCLFFBQWdCLEVBQUUsU0FBa0I7Ozs7O2dDQUN0QyxxQkFBTSx5QkFBWSxDQUNqQyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDeEIsU0FBUyxXQUFBOzZCQUNWLENBQ0YsRUFBQTs7NEJBUE8sSUFBSSxHQUFLLENBQUEsU0FPaEIsQ0FBQSxLQVBXOzRCQVFaLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0NBQ1Qsc0JBQU8sS0FBSyxFQUFDOzZCQUNkOzRCQUVLLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUU1QixJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFO2dDQUMzQixzQkFBTyxLQUFLLEVBQUM7NkJBQ2Q7NEJBRUcsT0FBTyxHQUFZLEtBQUssQ0FBQzs0QkFFN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dDQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29DQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO2lDQUNoQjs0QkFDSCxDQUFDLENBQUMsQ0FBQzs0QkFFSCxzQkFBTyxPQUFPLEVBQUM7Ozs7U0FDaEI7UUFFRDs7V0FFRztRQUNVLCtDQUFnQixHQUE3QixVQUE4QixNQUc3Qjs7Ozs7OzRCQUlPLEtBQTJCLE1BQU0sSUFBSSxFQUFFLEVBQXJDLFlBQVEsRUFBUixJQUFJLG1CQUFHLENBQUMsS0FBQSxFQUFFLGFBQVUsRUFBVixLQUFLLG1CQUFHLEVBQUUsS0FBQSxDQUFrQjs0QkFDakMscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQ3pDLEdBQUcsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sbURBQThDLElBQUksZUFBVSxLQUFPO29DQUNsRyxNQUFNLEVBQUUsS0FBSztpQ0FDZCxDQUFDLEVBQUE7OzRCQUhJLElBQUksR0FBRyxTQUdYOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7O1dBRUc7UUFDRyw0Q0FBYSxHQUFuQixVQUFvQixPQUFtRDs7Ozs7OzRCQUNyRSxJQUFJLENBQUMsT0FBTyxFQUFFO2dDQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQzs2QkFDMUQ7NEJBQ0QsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0NBQzFDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQzs2QkFDeEQ7aUNBQ0csT0FBTyxDQUFDLE9BQU8sRUFBZix3QkFBZTs0QkFDSixxQkFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztvQ0FDOUMsR0FBRyxFQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxnQ0FBNkI7b0NBQzVELE1BQU0sRUFBRSxLQUFLO29DQUNiLE1BQU0sRUFBRTt3Q0FDTixRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU87cUNBQzFCO2lDQUNGLENBQUMsRUFBQTs7NEJBTkksSUFBSSxHQUFHLFNBTVg7NEJBQ0Ysc0JBQU8sSUFBSSxFQUFDOztpQ0FDSCxPQUFPLENBQUMsV0FBVyxFQUFuQix3QkFBbUI7NEJBQ2YscUJBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7b0NBQzlDLEdBQUcsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sZ0NBQTZCO29DQUM1RCxNQUFNLEVBQUUsS0FBSztvQ0FDYixNQUFNLEVBQUU7d0NBQ04sWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXO3FDQUNsQztpQ0FDRixDQUFDLEVBQUE7OzRCQU5JLElBQUksR0FBRyxTQU1YOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7Ozs7U0FFZjtRQUVEOztXQUVHO1FBQ0csMkNBQVksR0FBbEI7Ozs7O2dDQUllLHFCQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO2dDQUM5QyxHQUFHLEVBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGlCQUFjO2dDQUM3QyxNQUFNLEVBQUUsS0FBSzs2QkFDZCxDQUFDLEVBQUE7OzRCQUhJLElBQUksR0FBRyxTQUdYOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBQ0Q7Ozs7OztXQU1HO1FBQ0gsOENBQThDO1FBQzlDLG9FQUFvRTtRQUNwRSxrQ0FBa0M7UUFDbEMseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4QixTQUFTO1FBQ1QsT0FBTztRQUNQLDBEQUEwRDtRQUMxRCxJQUFJO1FBRUo7Ozs7OztXQU1HO1FBQ0gsNkNBQTZDO1FBQzdDLHVFQUF1RTtRQUN2RSxrQ0FBa0M7UUFDbEMseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4QixTQUFTO1FBQ1QsT0FBTztRQUNQLDJFQUEyRTtRQUMzRSxJQUFJO1FBRUo7O1dBRUc7UUFDSCxzQ0FBTyxHQUFQLFVBQVEsSUFBVTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQUNILDJCQUFDO0lBQUQsQ0FBQyxBQXh6RkQsSUF3ekZDO0lBeHpGWSxvREFBb0IifQ==