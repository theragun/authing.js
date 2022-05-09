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
exports.SocialAuthenticationClient = void 0;
var utils_1 = require("../utils");
var BaseAuthenticationClient_1 = require("./BaseAuthenticationClient");
/**
 * @class SocialAuthenticationClient 社会化登录模块
 * @description 此模块封装了社会化登录的功能，可以通过简洁的 API 快速使用社会化登录获取用户信息。
 *
 * 发起社会化登录授权请求：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.social.authorize("github", {
 *    onSuccess: (user) => { console.log(user) },
 *    onError: (code, message) => {  }
 * })
 * \`\`\`
 *
 *
 * @name SocialAuthenticationClient
 */
var SocialAuthenticationClient = /** @class */ (function () {
    function SocialAuthenticationClient(options, tokenProvider, httpClient) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
        this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(options);
    }
    /**
     * @name authorize
     * @name_zh 发送授权登录请求
     * @description 发送授权登录请求，该方法会直接打开一个新窗口，跳转到第三方社会化登录服务商（如 GitHub、微信、钉钉等）的登录授权页面，用户
     * 完成授权之后，会自动关闭此窗口，并触发 onSuccess 回调函数，通过此函数，你可以获取到用户信息。
     *
     * @param {string} provider 社会化登录服务商的标志。
     * @param {object} [options]
     * @param {boolean} [options.popup=true] 是否通过弹窗的方式打开社会化登录窗口，如果设置为 false，将会以 window.open 的方式打开一个新的浏览器  tab 。
     * @param {Function} [options.onSuccess] 用户同意授权事件回调函数，第一个参数为用户信息。
     * @param {Function} [options.onError] 社会化登录失败事件回调函数，第一个参数 code 为错误码，第二个参数 message 为错误提示。详细的错误码列表请见：详细说明请见：[Authing 错误代码列表](https://docs.authing.co/advanced/error-code.html)
     * @param {object} [options.position] 只有当 options.popup 为 ture 的时候有效，弹出窗口的位置，默认为 { w: 585, h: 649 } 。
     * @param {object} [options.authorizationParams] 请求时的额外参数
     *
     * @example
     *
     * // 使用 GitHub 登录
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.social.authorize("github", {
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
     * await authenticationClient.social.authorize("github", {
     *    popup: false,
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     * })
     *
     * @memberof SocialAuthenticationClient
     */
    SocialAuthenticationClient.prototype.authorize = function (provider, options) {
        return __awaiter(this, void 0, void 0, function () {
            var position, _a, popup, onSuccess, onError, authorization_params, authorizationParams, context, customData, _b, withIdentities, _c, protocol, uuid, _d, withCustomData, query, url, onMessage;
            var _this = this;
            return __generator(this, function (_e) {
                options = options || {};
                position = options.position, _a = options.popup, popup = _a === void 0 ? true : _a, onSuccess = options.onSuccess, onError = options.onError, authorization_params = options.authorization_params, authorizationParams = options.authorizationParams, context = options.context, customData = options.customData, _b = options.withIdentities, withIdentities = _b === void 0 ? false : _b, _c = options.protocol, protocol = _c === void 0 ? 'oidc' : _c, uuid = options.uuid, _d = options.withCustomData, withCustomData = _d === void 0 ? false : _d;
                if (!uuid) {
                    uuid = utils_1.generateRandomString(20);
                }
                query = {
                    from_guard: '1',
                    app_id: this.options.appId,
                    authorization_params: JSON.stringify(authorization_params || authorizationParams),
                    with_identities: withIdentities ? '1' : '0',
                    with_custom_data: withCustomData ? '1' : '0',
                    protocol: protocol,
                    uuid: uuid
                };
                if (context) {
                    query.context = JSON.stringify(context);
                }
                if (this.options.tenantId) {
                    query.tenant_id = this.options.tenantId;
                }
                if (customData) {
                    query.custom_data = JSON.stringify(customData);
                }
                url = this.baseClient.appHost + "/connections/social/" + provider + "?" + utils_1.serialize(query);
                onMessage = function (e) {
                    var _a = e.data, code = _a.code, message = _a.message, userInfo = _a.data, event = _a.event;
                    event = event || {};
                    var source = event.source, eventType = event.eventType;
                    if (source !== 'authing' || eventType !== 'socialLogin') {
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
                if (utils_1.isMobileBrowser()) {
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
            });
        });
    };
    return SocialAuthenticationClient;
}());
exports.SocialAuthenticationClient = SocialAuthenticationClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29jaWFsQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL1NvY2lhbEF1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtDQUtrQjtBQUVsQix1RUFBc0U7QUFFdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSDtJQU1FLG9DQUNFLE9BQW9DLEVBQ3BDLGFBQTBDLEVBQzFDLFVBQXNCO1FBRXRCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxtREFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BK0NHO0lBQ0csOENBQVMsR0FBZixVQUNFLFFBQWdCLEVBQ2hCLE9BK0JDOzs7OztnQkFFRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFFdEIsUUFBUSxHQVlOLE9BQU8sU0FaRCxFQUNSLEtBV0UsT0FBTyxNQVhHLEVBQVosS0FBSyxtQkFBRyxJQUFJLEtBQUEsRUFDWixTQUFTLEdBVVAsT0FBTyxVQVZBLEVBQ1QsT0FBTyxHQVNMLE9BQU8sUUFURixFQUNQLG9CQUFvQixHQVFsQixPQUFPLHFCQVJXLEVBQ3BCLG1CQUFtQixHQU9qQixPQUFPLG9CQVBVLEVBQ25CLE9BQU8sR0FNTCxPQUFPLFFBTkYsRUFDUCxVQUFVLEdBS1IsT0FBTyxXQUxDLEVBQ1YsS0FJRSxPQUFPLGVBSmEsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtB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