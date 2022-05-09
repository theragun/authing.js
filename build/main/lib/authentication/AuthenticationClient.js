"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL0F1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkVBQTRFO0FBTTVFLDREQUFzQztBQUN0Qyx3REFBaUM7QUFFakMsNENBaUN1QjtBQUN2Qix5REFBd0Q7QUFDeEQsaUNBU2lCO0FBQ2pCLHFEQVlnQztBQUVoQywyRUFBMEU7QUFDMUUscUVBQW9FO0FBQ3BFLG1EQUFtRTtBQUNuRSxrQ0FTa0I7QUFDbEIsMERBQW1DO0FBRW5DLDJFQUEwRTtBQUMxRSwrREFBOEQ7QUFFOUQsbUZBQWtGO0FBQ2xGLHVFQUFzRTtBQUV0RSxxRUFBMEU7QUFFMUUsSUFBTSxlQUFlLEdBQWdDO0lBQ25ELEtBQUssRUFBRSxTQUFTO0lBQ2hCLFFBQVEsRUFBRSxTQUFTO0lBQ25CLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLHVCQUF1QixFQUFFLG9CQUFvQjtJQUM3QywrQkFBK0IsRUFBRSxvQkFBb0I7SUFDckQsNEJBQTRCLEVBQUUsb0JBQW9CO0lBQ2xELE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTyxFQUFFLFVBQUMsSUFBWSxFQUFFLE9BQWUsRUFBRSxJQUFTO1FBQ2hELE1BQU0sRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxXQUFXLEVBQUUsS0FBSztJQUNsQixlQUFlLEVBQUUsZUFBTztJQUN4QixJQUFJLEVBQUUseUJBQXlCO0lBQy9CLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSx1QkFBdUI7UUFDdEMsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixjQUFjLEVBQUUsd0JB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