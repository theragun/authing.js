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
import { BaseAuthenticationClient } from './BaseAuthenticationClient';
import { uploadFile, xhrUpload } from '../utils';
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
        this.baseClient = new BaseAuthenticationClient(options);
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
                        return [4 /*yield*/, uploadFile({
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
                        return [4 /*yield*/, xhrUpload(baseFace, uploadUrl)];
                    case 2:
                        keyA = (_a.sent()).key;
                        photoA = keyA;
                        if (!compareFace) return [3 /*break*/, 4];
                        return [4 /*yield*/, xhrUpload(compareFace, uploadUrl)];
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
export { MfaAuthenticationClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWZhQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL01mYUF1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0g7SUFNRSxpQ0FDRSxPQUFvQyxFQUNwQyxhQUEwQyxFQUMxQyxVQUFzQjtRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDRyxzREFBb0IsR0FBMUIsVUFDRSxPQUlvQztRQUpwQyx3QkFBQSxFQUFBLFlBSU0sSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFOzs7Ozs7d0JBRTVCLElBQUksR0FBdUIsT0FBTyxLQUE5QixFQUFFLFFBQVEsR0FBYSxPQUFPLFNBQXBCLEVBQUUsTUFBTSxHQUFLLE9BQU8sT0FBWixDQUFhO3dCQUVyQyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLDhCQUEyQixDQUFDO3dCQUM1RCxPQUFPLEdBQWtDLEVBQUUsQ0FBQzt3QkFDbEQsSUFBSSxRQUFRLEVBQUU7NEJBQ1osT0FBTyxDQUFDLGFBQWEsR0FBRyxZQUFVLFFBQVUsQ0FB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