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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./BaseAuthenticationClient", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MfaAuthenticationClient = void 0;
    var BaseAuthenticationClient_1 = require("./BaseAuthenticationClient");
    var utils_1 = require("../utils");
    /**
     * @class MfaAuthenticationClient 多因素认证模块
     * @description 此模块用于进行绑定 TOTP MFA 认证器、解绑 TOTP MFA 认证器、绑定用户人脸、解绑人脸、用户二次认证。
     *
     * 请求绑定 TOTP MFA 认证器：
     *
     * \`\`\`javascript
     * import { AuthenticationClient } from "authing-js-sdk"
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * await authenticationClient.mfa.assosicateMfaAuthenticator({authenticatorType: 'totp'})
     * \`\`\`
     *
     * 验证 MFA 二次口令：
     *
     * \`\`\`javascript
     * import { AuthenticationClient } from "authing-js-sdk"
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * await authenticationClient.mfa.verifyTotpMfa({totp: '112233', mfaToken: 'xxx'})
     * \`\`\`
     *
     * @name MfaAuthenticationClient
     */
    var MfaAuthenticationClient = /** @class */ (function () {
        function MfaAuthenticationClient(options, tokenProvider, httpClient) {
            this.options = options;
            this.tokenProvider = tokenProvider;
            this.httpClient = httpClient;
            this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(options);
        }
        /**
         * @name getMfaAuthenticators
         * @name_zh 获取 MFA 认证器
         * @description 获取 MFA 认证器
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.getMfaAuthenticators({ type: 'totp' })
         *
         * @returns {Promise<IMfaAuthenticators>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.getMfaAuthenticators = function (options) {
            if (options === void 0) { options = { type: 'totp', source: 'SELF' }; }
            return __awaiter(this, void 0, void 0, function () {
                var type, mfaToken, source, api, headers, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            type = options.type, mfaToken = options.mfaToken, source = options.source;
                            api = this.baseClient.appHost + "/api/v2/mfa/authenticator";
                            headers = {};
                            if (mfaToken) {
                                headers.authorization = "Bearer " + mfaToken;
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'GET',
                                    url: api,
                                    params: {
                                        type: type,
                                        source: source
                                    },
                                    headers: headers
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name assosicateMfaAuthenticator
         * @name_zh 请求 MFA 二维码和密钥信息
         * @description 请求 MFA 二维码和密钥信息
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.assosicateMfaAuthenticator({ authenticatorType: 'totp' })
         *
         * @returns {Promise<IMfaAssociation>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.assosicateMfaAuthenticator = function (options) {
            if (options === void 0) { options = { authenticatorType: 'totp', source: 'SELF' }; }
            return __awaiter(this, void 0, void 0, function () {
                var authenticatorType, mfaToken, source, headers, api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authenticatorType = options.authenticatorType, mfaToken = options.mfaToken, source = options.source;
                            headers = {};
                            if (mfaToken) {
                                headers.authorization = "Bearer " + mfaToken;
                            }
                            api = this.baseClient.appHost + "/api/v2/mfa/totp/associate";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        authenticator_type: authenticatorType,
                                        source: source
                                    },
                                    headers: headers
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name deleteMfaAuthenticator
         * @name_zh 解绑 MFA
         * @description 解绑 MFA
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.deleteMfaAuthenticator()
         *
         * @returns {Promise<IMfaDeleteAssociation>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.deleteMfaAuthenticator = function () {
            return __awaiter(this, void 0, void 0, function () {
                var api;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/mfa/totp/associate";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'DELETE',
                                    url: api
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    code: 200,
                                    message: 'TOTP MFA 解绑成功'
                                }];
                    }
                });
            });
        };
        /**
         * @name confirmAssosicateMfaAuthenticator
         * @name_zh 确认绑定 MFA
         * @description 确认绑定 MFA
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.confirmAssosicateMfaAuthenticator({ authenticatorType: 'totp', totp: '112233' })
         *
         * @returns {Promise<IMfaConfirmAssociation>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.confirmAssosicateMfaAuthenticator = function (options) {
            if (options === void 0) { options = { authenticatorType: 'totp', source: 'SELF' }; }
            return __awaiter(this, void 0, void 0, function () {
                var api, authenticatorType, totp, source, mfaToken, headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/mfa/totp/associate/confirm";
                            authenticatorType = options.authenticatorType, totp = options.totp, source = options.source, mfaToken = options.mfaToken;
                            headers = {};
                            if (mfaToken) {
                                headers.authorization = "Bearer " + mfaToken;
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        authenticator_type: authenticatorType,
                                        totp: totp,
                                        source: source
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: 'TOTP MFA 绑定成功' }];
                    }
                });
            });
        };
        /**
         * @name verifyTotpMfa
         * @name_zh 检验二次验证 MFA 口令
         * @description 检验二次验证 MFA 口令
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.verifyTotpMfa({ authenticatorType: 'totp', totp: '112233' })
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.verifyTotpMfa = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/mfa/totp/verify";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        totp: options.totp
                                    },
                                    headers: {
                                        authorization: 'Bearer ' + options.mfaToken
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name verifyAppSmsMfa
         * @name_zh 检验二次验证 MFA 短信验证码
         * @description 检验二次验证 MFA 短信验证码
         *
         * @param {object} options
         * @param {string} options.phone 用户手机号
         * @param {string} options.code 手机验证码
         * @param {string} options.token 登录接口返回的 mfaToken
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.verifySmsMfa({ mfaToken: 'xxxxxx', phone: '173xxxxxxxx' })
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.verifyAppSmsMfa = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/applications/mfa/sms/verify";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        phone: options.phone,
                                        code: options.code
                                    },
                                    headers: {
                                        authorization: 'Bearer ' + options.mfaToken
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name verifyAppEmailMfa
         * @name_zh 检验二次验证 MFA 邮箱验证码
         * @description 检验二次验证 MFA 邮箱验证码
         *
         * @param {object} options
         * @param {string} options.email 用户邮箱
         * @param {string} options.code 邮箱验证码
         * @param {string} options.token 登录接口返回的 mfaToken
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.verifyAppEmailMfa({ mfaToken: 'xxxx', email: 'example@authing.com' })
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.verifyAppEmailMfa = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/applications/mfa/email/verify";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        email: options.email,
                                        code: options.code
                                    },
                                    headers: {
                                        authorization: 'Bearer ' + options.mfaToken
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name phoneOrEmailBindable
         * @name_zh 检测手机号或邮箱是否已被绑定
         * @description 当需要手机或邮箱 MFA 登录，而用户未绑定手机或邮箱时，可先让用户输入手机号或邮箱，用此接口先检测手机或邮箱是否可绑定，再进行 MFA 验证
         *
         * @param {object} options
         * @param {string} [options.mfaToken] 后端返回的 mfaToken
         * @param {string} [options.phone] 需要检测的手机号
         * @param {string} [options.email] 需要检测的邮箱
         *
         * @example
         *
         * authenticationClient.phoneOrEmailBindable({
         *  phone: '173xxxxxxxx',
         *  mfaToken: 'xxxxx'
         * })
         *
         * @returns {Promise<boolean>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.phoneOrEmailBindable = function (_a) {
            var phone = _a.phone, email = _a.email, mfaToken = _a.mfaToken;
            return __awaiter(this, void 0, void 0, function () {
                var api;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/applications/mfa/check";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        email: email,
                                        phone: phone
                                    },
                                    headers: {
                                        authorization: 'Bearer ' + mfaToken
                                    }
                                })];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        /**
         * @name verifyTotpRecoveryCode
         * @name_zh 检验二次验证 MFA 恢复代码
         * @description 检验二次验证 MFA 恢复代码
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const authenticators = await authenticationClient.mfa.verifyTotpRecoveryCode({ authenticatorType: 'totp', totp: '112233' })
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.verifyTotpRecoveryCode = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/mfa/totp/recovery";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        recoveryCode: options.recoveryCode
                                    },
                                    headers: {
                                        authorization: 'Bearer ' + options.mfaToken
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name associateFaceByUrl
         * @name_zh 通过图片 URL 方式绑定人脸
         * @description 通过图片 URL 方式绑定人脸
         *
         * @param {object} options
         * @param {string} options.baseFace 基础人脸照片
         * @param {string} options.compareFace 用于对比的人脸照片地址
         * @param {string} [options.mfaToken] 若是在二次认证时绑定人脸，需要传入 mfaToken
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const user = await authenticationClient.mfa.associateFace({ photoA: 'http://example.com/photo/imgA.jpg', photoB: 'http://example.com/photo/imgB.jpg', mfaToken: 'xxxxxxxxxxxx' })
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.associateFaceByUrl = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var baseFace, compareFace, mfaToken, headers, api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            baseFace = options.baseFace, compareFace = options.compareFace, mfaToken = options.mfaToken;
                            headers = {};
                            if (mfaToken) {
                                headers.authorization = "Bearer " + mfaToken;
                            }
                            api = this.baseClient.appHost + "/api/v2/mfa/face/associate";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        photoA: baseFace,
                                        photoB: compareFace,
                                        isExternal: true
                                    },
                                    headers: headers
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name associateFaceByLocalFile
         * @name_zh 通过上传本地文件的方式绑定人脸
         * @description 通过上传本地文件的方式绑定人脸
         *
         * @param {string} [mfaToken] 若是在二次认证时绑定人脸，需要传入 mfaToken
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const user = await authenticationClient.mfa.associateFaceByLocalFile('xxxxxxxxxxx')
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.associateFaceByLocalFile = function (mfaToken) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, uploadedKey, key, e_1, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            headers = {};
                            if (mfaToken) {
                                headers.authorization = "Bearer " + mfaToken;
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, utils_1.uploadFile({
                                    // 阿里云支持这些
                                    accept: '.jpeg,.jpg,.png,.bmp',
                                    url: this.baseClient.appHost + "/api/v2/upload?folder=face-photo&private=true"
                                })];
                        case 2:
                            key = (_a.sent()).key;
                            uploadedKey = key;
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            this.options.onError(e_1.code, e_1.message);
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.baseClient.appHost + "/api/v2/mfa/face/associate",
                                data: {
                                    photoA: uploadedKey,
                                    photoB: uploadedKey
                                },
                                headers: headers
                            })];
                        case 5:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name associateFaceByBlob
         * @name_zh 通过传入 Blob 对象绑定人脸
         * @description 通过传入 Blob 对象绑定人脸
         *
         * @param {object} options
         * @param {string} options.baseFace 基础人脸数据 Blob 对象
         * @param {string} options.compareFace 用于对比的人脸数据 Blob 对象
         * @param {string} [options.mfaToken] 若是在二次认证时绑定人脸，需要传入 mfaToken
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const user = await authenticationClient.mfa.associateFaceByBlob({blobA: Blob, blobB: Blob, mfaToken: 'xxx'})
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.associateFaceByBlob = function (opts) {
            return __awaiter(this, void 0, void 0, function () {
                var baseFace, compareFace, mfaToken, headers, photoA, photoB, uploadUrl, keyA, keyB, e_2, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            baseFace = opts.baseFace, compareFace = opts.compareFace, mfaToken = opts.mfaToken;
                            headers = {};
                            if (mfaToken) {
                                headers.authorization = "Bearer " + mfaToken;
                            }
                            uploadUrl = this.baseClient.appHost + "/api/v2/upload?folder=face-photo&private=true";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            return [4 /*yield*/, utils_1.xhrUpload(baseFace, uploadUrl)];
                        case 2:
                            keyA = (_a.sent()).key;
                            photoA = keyA;
                            if (!compareFace) return [3 /*break*/, 4];
                            return [4 /*yield*/, utils_1.xhrUpload(compareFace, uploadUrl)];
                        case 3:
                            keyB = (_a.sent()).key;
                            photoB = keyB;
                            return [3 /*break*/, 5];
                        case 4:
                            photoB = keyA;
                            _a.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_2 = _a.sent();
                            this.options.onError(e_2.code, e_2.message);
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.baseClient.appHost + "/api/v2/mfa/face/associate",
                                data: {
                                    photoA: photoA,
                                    photoB: photoB
                                },
                                headers: headers
                            })];
                        case 8:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name verifyFaceMfa
         * @name_zh 检测二次登录人脸验证
         * @description 检测二次登录人脸验证
         *
         * @param {string} photo 人脸照片地址
         * @param {string} mfaToken 二次校验时 Authing 返回的 mfaToken
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const user = await authenticationClient.mfa.verifyFaceMfa('http://example.com/photo/photo.jpg')
         *
         * @returns {Promise<User>}
         * @memberof MfaAuthenticationClient
         */
        MfaAuthenticationClient.prototype.verifyFaceMfa = function (photo, mfaToken) {
            return __awaiter(this, void 0, void 0, function () {
                var api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/mfa/face/verify";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        photo: photo
                                    },
                                    headers: {
                                        authorization: "Bearer " + mfaToken
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        return MfaAuthenticationClient;
    }());
    exports.MfaAuthenticationClient = MfaAuthenticationClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWZhQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL01mYUF1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVdBLHVFQUFzRTtJQUV0RSxrQ0FBaUQ7SUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSDtRQU1FLGlDQUNFLE9BQW9DLEVBQ3BDLGFBQTBDLEVBQzFDLFVBQXNCO1lBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxtREFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLHNEQUFvQixHQUExQixVQUNFLE9BSW9DO1lBSnBDLHdCQUFBLEVBQUEsWUFJTSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7Ozs7Ozs0QkFFNUIsSUFBSSxHQUF1QixPQUFPLEtBQTlCLEVBQUUsUUFBUSxHQUFhLE9BQU8sU0FBcEIsRUFBRSxNQUFNLEdBQUssT0FBTyxPQUFaLENBQWE7NEJBRXJDLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sOEJBQTJCLENBQUM7NEJBQzVELE9BQU8sR0FBa0MsRUFBRSxDQUFDOzRCQUNsRCxJQUFJLFFBQVEsRUFBRTtnQ0FDWixPQUFPLENBQUMsYUFBYSxHQUFHLFlBQVUsUUFBVSxDQUFDOzZCQUM5Qzs0QkFDZ0MscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQzdE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