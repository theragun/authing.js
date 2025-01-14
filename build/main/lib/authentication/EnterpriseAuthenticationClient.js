"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseAuthenticationClient = void 0;
var types_1 = require("./types");
var utils_1 = require("../utils");
var utils_2 = require("../utils");
var BaseAuthenticationClient_1 = require("./BaseAuthenticationClient");
/**
 * @class EnterpriseAuthenticationClient 企业身份源登录模块
 * @description 此模块封装了企业身份源登录的功能，可以通过简洁的 API 快速使用企业身份源登录获取用户信息。
 *
 * 发起企业身份源登录授权请求：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.enterprise.authorize("oidc", "identifierxxx" {
 *    onSuccess: (user) => { console.log(user) },
 *    onError: (code, message) => {  }
 * })
 * \`\`\`
 *
 *
 * @name EnterpriseAuthenticationClient
 */
var EnterpriseAuthenticationClient = /** @class */ (function () {
    function EnterpriseAuthenticationClient(options, tokenProvider, httpClient) {
        this.options = options;
        this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(options);
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
    }
    //  TODO，跟着 user-portal 逻辑走的，后续应该优化
    EnterpriseAuthenticationClient.prototype.initProviderContext = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var appConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.baseClient.appHost + "/api/v2/applications/" + appId + "/public-config"
                        })];
                    case 1:
                        appConfig = _a.sent();
                        return [2 /*return*/, appConfig];
                }
            });
        });
    };
    EnterpriseAuthenticationClient.prototype.getProviderConfigAndError = function (protocol, appConfig, identifier) {
        var _a, _b;
        var providerConfig = (_b = (_a = appConfig.identityProviders) === null || _a === void 0 ? void 0 : _a.find(function (item) { return item.protocol === protocol && item.identifier === identifier; })) === null || _b === void 0 ? void 0 : _b.config;
        if (!providerConfig) {
            throw new Error('身份源配置不存在');
        }
        return providerConfig;
    };
    EnterpriseAuthenticationClient.prototype.getLoginUrl = function (protocol, appConfig, identifier, state) {
        var config = this.getProviderConfigAndError(protocol, appConfig, identifier);
        switch (protocol) {
            case types_1.Protocol.OIDC:
                config = config;
                var query = utils_1.serialize({
                    state: state,
                    client_id: config.clientId,
                    redirect_uri: config.redirectUri,
                    scope: config.scopes,
                    response_type: config.responseType,
                    nonce: utils_2.generateUidKey(32)
                });
                return config.authorizationEdpoint + "?" + query;
            case types_1.Protocol.SAML:
                config = config;
                return config.samlRequest;
            case types_1.Protocol.CAS:
                config = config;
                return config.casConnectionLoginUrl;
            case types_1.Protocol.OAUTH:
                config = config;
                return config.authUrl;
            case types_1.Protocol.AZURE_AD:
                config = config;
                return config.authorizationUrl;
            default:
                return '';
        }
    };
    /**
     * @name authorize
     * @name_zh 发送授权登录请求
     * @description 发送授权登录请求，该方法会直接打开一个新窗口，跳转到企业身份源（如 OIDC、SAML 等）的登录授权页面，用户
     * 完成授权之后，会自动关闭此窗口，并触发 onSuccess 回调函数，通过此函数，你可以获取到用户信息。
     *
     * @param {Protocol} protocol: 企业身份源协议
     * @param {string} provider 企业身份源的唯一标志。
     * @param {object} [options]
     * @param {boolean} [options.popup=true] 是否通过弹窗的方式打开社会化登录窗口，如果设置为 false，将会以 window.open 的方式打开一个新的浏览器  tab 。
     * @param {Function} [options.onSuccess] 用户同意授权事件回调函数，第一个参数为用户信息。
     * @param {Function} [options.onError] 企业身份源失败事件回调函数，第一个参数 code 为错误码，第二个参数 message 为错误提示。详细的错误码列表请见：详细说明请见：[Authing 错误代码列表](https://docs.authing.co/advanced/error-code.html)
     * @param {object} [options.position] 只有当 options.popup 为 ture 的时候有效，弹出窗口的位置，默认为 { w: 585, h: 649 } 。
     *
     * @example
     *
     * // 使用身份源标识符为 'oidc1' 的 OIDC 身份源登录
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.enterprise.authorize("oidc", "oidc1" {
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     *    // 自定义弹出窗口的位置
     *    position: {
     *      w: 100,
     *      h: 100
     *    }
     * })
     *
     * @example
     *
     * // 使用新建浏览器 tab 的形式打开社会化登录页面
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.enterprise.authorize("oidc", "oidc1", {
     *    popup: false,
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     * })
     *
     * @memberof EnterpriseAuthenticationClient
     */
    EnterpriseAuthenticationClient.prototype.authorize = function (protocol, identifier, options) {
        return __awaiter(this, void 0, void 0, function () {
            var position, _a, popup, onSuccess, onError, appId, appConfig, state, url, onMessage;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        options = options || {};
                        position = options.position, _a = options.popup, popup = _a === void 0 ? true : _a, onSuccess = options.onSuccess, onError = options.onError;
                        appId = this.options.appId;
                        return [4 /*yield*/, this.initProviderContext(appId)];
                    case 1:
                        appConfig = _b.sent();
                        state = utils_2.generateUidKey(32);
                        if (!(protocol === types_1.Protocol.OIDC)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.baseClient.appHost + "/api/v2/connections/oidc/start-interaction",
                                data: {
                                    state: state,
                                    protocol: protocol,
                                    userPoolId: appConfig.userPoolId,
                                    appId: appId,
                                    referer: window.location.href,
                                    connection: { providerIentifier: identifier }
                                }
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        url = this.getLoginUrl(protocol, appConfig, identifier, state);
                        onMessage = function (e) {
                            var _a = e.data, code = _a.code, message = _a.message, userInfo = _a.data, event = _a.event;
                            event = event || {};
                            var source = event.source, eventType = event.eventType;
                            if (source !== 'authing' || eventType !== 'enterpriseLogin') {
                                return;
                            }
                            try {
                                var parsedMsg = JSON.parse(message);
                                message = parsedMsg.message;
                                code = parsedMsg.code;
                            }
                            catch (e) {
                                // do nothing...
                            }
                            if (code === 200) {
                                // 保存用户的 token
                                _this.tokenProvider.setUser(userInfo);
                                onSuccess && onSuccess(userInfo);
                            }
                            else {
                                onError && onError(code, message);
                            }
                            window.removeEventListener('message', onMessage);
                        };
                        window.addEventListener('message', onMessage);
                        if (utils_1.isWechatBrowser()) {
                            // 在微信内直接打开
                            window.location.href = url;
                        }
                        else if (popup) {
                            utils_1.popupCenter(url, position);
                        }
                        else {
                            window.open(url);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return EnterpriseAuthenticationClient;
}());
exports.EnterpriseAuthenticationClient = EnterpriseAuthenticationClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW50ZXJwcmlzZUF1dGhlbnRpY2F0aW9uQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9FbnRlcnByaXNlQXV0aGVudGljYXRpb25DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBU2lCO0FBRWpCLGtDQUFtRTtBQUVuRSxrQ0FBMEM7QUFDMUMsdUVBQXNFO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0g7SUFNRSx3Q0FDRSxPQUFvQyxFQUNwQyxhQUEwQyxFQUMxQyxVQUFzQjtRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksbURBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELG1DQUFtQztJQUNyQiw0REFBbUIsR0FBakMsVUFBa0MsS0FBYTs7Ozs7NEJBRVIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQ2pFLE1BQU0sRUFBRSxLQUFLOzRCQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sNkJBQXdCLEtBQUssbUJBQWdCO3lCQUM3RSxDQUFDLEVBQUE7O3dCQUhJLFNBQVMsR0FBc0IsU0FHbkM7d0JBRUYsc0JBQU8sU0FBUyxFQUFDOzs7O0tBQ2xCO0lBRU8sa0VBQXlCLEdBQWpDLFVBQ0UsUUFBa0IsRUFDbEIsU0FBNEIsRUFDNUIsVUFBa0I7O1FBRWxCLElBQU0sY0FBYyxHQUFHLE1BQUEsTUFBQSxTQUFTLENBQUMsaUJBQWlCLDBDQUFFLElBQUksQ0FDdEQsVUFBQSxJQUFJLElBQUksT0FB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