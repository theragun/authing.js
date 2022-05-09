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
import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import { bindEmail, bindPhone, checkLoginStatus, checkPasswordStrength, getUserDepartments, getUserRoles, isUserExists, listUserAuthorizedResources, loginByEmail, loginByPhoneCode, loginByPhonePassword, loginBySubAccount, loginByUsername, refreshToken, registerByEmail, registerByPhoneCode, registerByUsername, removeUdv, resetPassword, resetPasswordByFirstLoginToken, resetPasswordByForceResetToken, sendEmail, setUdv, setUdvBatch, udv, unbindEmail, unbindPhone, updateEmail, updatePassword, updatePhone, updateUser, user } from '../graphqlapi';
import { GraphqlClient } from '../common/GraphqlClient';
import { PasswordSecurityLevel } from './types';
import { UdfTargetType } from '../../types/graphql.v2';
import { QrCodeAuthenticationClient } from './QrCodeAuthenticationClient';
import { MfaAuthenticationClient } from './MfaAuthenticationClient';
import { HttpClient, NaiveHttpClient } from '../common/HttpClient';
import { convertObjectToKeyValueList, convertUdv, convertUdvToKeyValuePair, encrypt, formatAuthorizedResources, generateRandomString, serialize, uploadFile } from '../utils';
import jwtDecode from 'jwt-decode';
import { SocialAuthenticationClient } from './SocialAuthenticationClient';
import { PublicKeyManager } from '../common/PublicKeyManager';
import { EnterpriseAuthenticationClient } from './EnterpriseAuthenticationClient';
import { BaseAuthenticationClient } from './BaseAuthenticationClient';
import { PrincipalAuthenticationClient } from './PrincipalAuthentication';
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
    encryptFunction: encrypt,
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
        this.baseClient = new BaseAuthenticationClient(this.options);
        var graphqlEndpoint = this.baseClient.appHost + "/graphql/v2";
        // 子模块初始化顺序: GraphqlClient -> ManagementTokenProvider -> Others
        this.graphqlClient = new (this.options.graphqlClient || GraphqlClient)(graphqlEndpoint, this.options);
        this.tokenProvider = new (this.options.tokenProvider ||
            AuthenticationTokenProvider)(this.options);
        this.httpClient = new (this.options.httpClient || HttpClient)(this.options, this.tokenProvider);
        this.naiveHttpClient = new NaiveHttpClient(this.options, this.tokenProvider);
        this.publicKeyManager = new PublicKeyManager(this.options, this.httpClient);
        this.wxqrcode = new QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'WXAPP_AUTH');
        this.qrcode = new QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'APP_AUTH');
        this.wechatmpqrcode = new QrCodeAuthenticationClient(this.options, this.tokenProvider, this.httpClient, 'WECHATMP_AUTH');
        this.mfa = new MfaAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
        this.social = new SocialAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
        this.enterprise = new EnterpriseAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
        this.principal = new PrincipalAuthenticationClient(this.options, this.tokenProvider, this.httpClient);
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
        var decoded = jwtDecode(token);
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, registerByEmail(this.graphqlClient, this.tokenProvider, {
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, registerByUsername(this.graphqlClient, this.tokenProvider, {
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, registerByPhoneCode(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, checkPasswordStrength(this.graphqlClient, this.tokenProvider, { password: password })];
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, loginByEmail(this.graphqlClient, this.tokenProvider, {
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
                            user.customData = convertUdvToKeyValuePair(user.customData);
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, loginByUsername(this.graphqlClient, this.tokenProvider, {
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
                            user.customData = convertUdvToKeyValuePair(user.customData);
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, loginByPhoneCode(this.graphqlClient, this.tokenProvider, {
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
                            user.customData = convertUdvToKeyValuePair(user.customData);
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
                            extraParams = JSON.stringify(convertObjectToKeyValueList(customData));
                        }
                        else if (params) {
                            extraParams = JSON.stringify(params);
                        }
                        extraContext = null;
                        if (context) {
                            extraContext = JSON.stringify(context);
                        }
                        return [4 /*yield*/, loginByPhonePassword(this.graphqlClient, this.tokenProvider, {
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
                            user.customData = convertUdvToKeyValuePair(user.customData);
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
                        return [4 /*yield*/, loginBySubAccount(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, checkLoginStatus(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, sendEmail(this.graphqlClient, this.tokenProvider, { email: email, scene: scene })];
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
                        return [4 /*yield*/, resetPassword(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, resetPassword(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, resetPasswordByFirstLoginToken(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, resetPasswordByForceResetToken(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, updateUser(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, updatePassword(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, updatePhone(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, updateEmail(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, refreshToken(this.graphqlClient, this.tokenProvider, {})];
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
                    case 0: return [4 /*yield*/, bindPhone(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, unbindPhone(this.graphqlClient, this.tokenProvider, {})];
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
                    case 0: return [4 /*yield*/, bindEmail(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, unbindEmail(this.graphqlClient, this.tokenProvider, {})];
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
                        return [4 /*yield*/, user(this.graphqlClient, this.tokenProvider, {})];
                    case 1:
                        data = (_b.sent()).user;
                        if (data.customData) {
                            // @ts-ignore
                            data.customData = convertUdvToKeyValuePair(data.customData);
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
                        return [4 /*yield*/, udv(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                targetId: userId
                            })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, convertUdv(list)];
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
                        return [4 /*yield*/, setUdv(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                targetId: userId,
                                key: key,
                                value: value
                            })];
                    case 1:
                        list = (_a.sent()).setUdv;
                        return [2 /*return*/, convertUdv(list)];
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
                        return [4 /*yield*/, removeUdv(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                targetId: userId,
                                key: key
                            })];
                    case 1:
                        list = (_a.sent()).removeUdv;
                        return [2 /*return*/, convertUdv(list)];
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
                        return [4 /*yield*/, getUserDepartments(this.graphqlClient, this.tokenProvider, {
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
        uploadFile({
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
                        return [4 /*yield*/, udv(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
                                targetId: userId
                            })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, convertUdvToKeyValuePair(list)];
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
                        return [4 /*yield*/, setUdvBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
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
                        return [4 /*yield*/, removeUdv(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.User,
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
                        return [4 /*yield*/, listUserAuthorizedResources(this.graphqlClient, this.tokenProvider, {
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
                        list = formatAuthorizedResources(list);
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
                        return [4 /*yield*/, isUserExists(this.graphqlClient, this.tokenProvider, {
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
            return PasswordSecurityLevel.HIGH;
        }
        if (password.match(middleLevel) !== null) {
            return PasswordSecurityLevel.MIDDLE;
        }
        return PasswordSecurityLevel.LOW;
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
        return generateRandomString(43);
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
            return sha256(options.codeChallenge)
                .toString(CryptoJS.enc.Base64)
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
                                data: serialize({
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
                    case 0: return [4 /*yield*/, getUserRoles(this.graphqlClient, this.tokenProvider, {
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
export { AuthenticationClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL0F1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFNNUUsT0FBTyxNQUFNLE1BQU0sa0JBQWtCLENBQUM7QUFDdEMsT0FBTyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBRWpDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixZQUFZLEVBQ1osMkJBQTJCLEVBQzNCLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxhQUFhLEVBQ2IsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5QixTQUFTLEVBQ1QsTUFBTSxFQUNOLFdBQVcsRUFDWCxHQUFHLEVBQ0gsV0FBVyxFQUNYLFdBQVcsRUFDWCxXQUFXLEVBQ1gsY0FBYyxFQUNkLFdBQVcsRUFDWCxVQUFVLEVBQ1YsSUFBSSxFQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBTUwscUJBQXFCLEVBR3RCLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQU8sRUFTTCxhQUFhLEVBR2QsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUs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