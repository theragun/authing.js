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
        define(["require", "exports", "../graphqlapi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserPoolManagementClient = void 0;
    var graphqlapi_1 = require("../graphqlapi");
    /**
     * @name UserPoolManagementClient
     * @description Authing 用户池配置管理模块。
     *
     * 此模块可以通过使用 API 管理用户池配置，以及管理环境变量（详细文档请见）。
     *
     * @example
     *
     * 请使用以下方式使用该模块：
     * \`\`\`javascript
     * import { ManagementClient } from "authing-js-sdk"
     * const managementClient = new ManagementClient({
     *    userPoolId: "YOUR_USERPOOL_ID",
     *    secret: "YOUR_USERPOOL_SECRET",
     * })
     *
     * managementClient.userpool.detail // 获取用户池配置
     * managementClient.userpool.update // 修改用户池配置
     * managementClient.userpool.env // 获取用户池配置的环境变量列表
     * \`\`\`
     *
     * @class UsersManagementClient 管理用户池配置
     */
    var UserPoolManagementClient = /** @class */ (function () {
        function UserPoolManagementClient(options, httpClient, graphqlClient, tokenProvider) {
            this.options = options;
            this.httpClient = httpClient;
            this.graphqlClient = graphqlClient;
            this.tokenProvider = tokenProvider;
        }
        /**@name detail
         * @name_zh 查询用户池配置
         * @description 查询用户池配置
         *
         * @example
         *
         * const userpool = await managementClient.userpool.detail()
         *
         * @returns {Promise<UserPool>}
         * @memberof UserPoolManagementClient
         */
        UserPoolManagementClient.prototype.detail = function () {
            return __awaiter(this, void 0, void 0, function () {
                var userPool;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/userpools/detail"
                            })];
                        case 1:
                            userPool = _a.sent();
                            return [2 /*return*/, userPool];
                    }
                });
            });
        };
        /**
         * @name update
         * @name_zh 更新用户池配置
         * @description 更新用户池配置
         *
         * @param {UpdateUserpoolInput} updates
         * @param {string} [updates.name] 用户池名称
         * @param {string} [updates.logo] 用户池 logo
         * @param {string} [updates.domain] 用户池企业应用面板二级域名
         * @param {string} [updates.description] 描述信息
         * @param {boolean} [updates.emailVerifiedDefault] 设置邮箱默认为已验证状态（用户的 emailVerified 字段为 true）
         * @param {boolean} [updates.appSsoEnabled] 开启用户池下的应用之间单点登录
         * @param {boolean} [updates.sendWelcomeEmail] 用户注册之后是否发送欢迎邮件
         * @param {boolean} [updates.registerDisabled] 是否关闭注册，当用户池关闭注册之后，普通用户将无法注册账号，只有管理员能够手动创建账号。
         * @param {string} [updates.allowedOrigins] 安全域配置，安全域（Allowed Origins） 是允许从 JavaScript 向 Authing API 发出请求的 URL（通常与 CORS 一起使用）。 默认情况下，系统会允许你使用所有网址。 如果需要，此字段允许你输入其他来源。 你可以通过逐行分隔多个有效 URL，并在子域级别使用通配符（例如：https://*.sample.com）。
         * 验证这些 URL 时不考虑查询字符串和哈希信息，如果带上了查询字符串和哈希信息系统会自动忽略整个域名。
         * 如果有多条请以换行符分隔。
         * @param {Object} [updates.whitelist] 用户池白名单配置
         * @param {boolean} [updates.whitelist.phoneEnabled] 是否开启手机号白名单
         * @param {boolean} [updates.whitelist.emailEnabled] 是否开启邮箱白名单
         * @param {boolean} [updates.whitelist.usernameEnabled] 是否开启用户名白名单
         * @param {number} [updates.tokenExpiresAfter] token 过期时间
         * @param {Object} [updates.loginFailCheck] 频繁登录失败限制，开启之后，在规定时间内超过次数后再次登录需要验证码。如果你的业务存在同一区域同一时间段并发登录的场景，请将此检测关闭。
         * @param {boolean} [updates.loginFailCheck.enabled] 是否开启
         * @param {number} [updates.loginFailCheck.timeInterval] 检测周期，单位为秒。
         * @param {number} [updates.loginFailCheck.limit] 同一 IP 登录失败次数达到多少次的时候会触发限制条件。
         * @param {Object} [updates.frequentRegisterCheck] 频率注册限制，开启之后同一 IP 频繁注册账号时会触发频率限制，需要等一段时间之后才能重新注册。如果你的业务存在同一区域同一时间段并发注册的场景，请将此检测关闭。
         * @param {boolean} [updates.frequentRegisterCheck.enabled] 是否开启
         * @param {Object} [updates.frequentRegisterCheck.timeInterval] 检测周期，单位为秒。
         * @param {Object} [updates.frequentRegisterCheck.limit] 同一个周期内同一 IP 注册次数达到此数目时会触发频率限制。
         *
         *
         * @example
         *
         * const userpool = await managementClient.userpool.update({
         *    registerDisabled: true // 关闭系统注册
         * })
         *
         * @returns {Promise<UserPool>}
         * @memberof UserPoolManagementClient
         */
        UserPoolManagementClient.prototype.update = function (updates) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.updateUserpool(this.graphqlClient, this.tokenProvider, {
                                input: updates
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.updateUserpool];
                    }
                });
            });
        };
        /**
         * @name listEnv
         * @name_zh 获取环境变量列表
         * @description 获取用户池环境变量列表。用户池配置的环境变量可以在 pipeline 场景下使用，详情请见：https://docs.authing.co/extensibility/pipeline/env.html
         *
         * @example
         *
         * const envList = await managementClient.userpool.listEnv()
         *
         * @returns {Promise<Env[]>}
         * @memberof UserPoolManagementClient
         */
        UserPoolManagementClient.prototype.listEnv = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/env"
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @name addEnv
         * @name_zh 添加环境变量
         * @description 添加环境变量
         *
         * @param {string} key 环境变量键
         * @param {any} value 环境变量值
         *
         * @example
         *
         * const envList = await managementClient.userpool.addEnv('LARK_WEBHOOK', 'xxxxxxx') // 添加一个飞书群机器人 webhook 地址，之后可以在 pipeline 函数中使用（详细请见: https://docs.authing.co/extensibility/pipeline/usage.html）
         *
         * @returns {Promise<Env[]>} 返回最新的环境变量列表
         * @memberof UserPoolManagementClient
         */
        UserPoolManagementClient.prototype.addEnv = function (key, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/env",
                                data: {
                                    key: key,
                                    value: value
                                }
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @name removeEnv
         * @name_zh 删除环境变量
         * @description 删除环境变量
         *
         * @param {string} key 环境变量键
         *
         * @example
         *
         * const envList = await managementClient.userpool.removeEnv('LARK_WEBHOOK')
         *
         * @returns {Promise<Env[]>} 返回最新的环境变量列表
         * @memberof UserPoolManagementClient
         */
        UserPoolManagementClient.prototype.removeEnv = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/env/" + key
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return UserPoolManagementClient;
    }());
    exports.UserPoolManagementClient = UserPoolManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnBvb2xNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1VzZXJwb29sTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQSw0Q0FBK0M7SUFJL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSDtRQU1FLGtDQUNFLE9BQWdDLEVBQ2hDLFVBQXNCLEVBQ3RCLGFBQTRCLEVBQzVCLGFBQXNDO1lBRXRDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0cseUNBQU0sR0FBWjs7Ozs7Z0NBQ21CLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUM3QyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDZCQUEwQjs2QkFDcEQsQ0FBQyxFQUFBOzs0QkFISSxRQUFRLEdBQUcsU0FHZjs0QkFFRixzQkFBTyxRQUFRLEVBQUM7Ozs7U0FDakI7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXdDRztRQUNHLHlDQUFNLEdBQVosVUFBYSxPQUE0Qjs7Ozs7Z0NBQzNCLHFCQUFNLDJCQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUN2RSxLQUFLLEVBQUUsT0FBTzs2QkFDZixDQUFDLEVBQUE7OzRCQUZJLEdBQUcsR0FBRyxTQUVWOzRCQUNGLHNCQUFPLEdBQUcsQ0FBQyxjQUFjLEVBQUM7Ozs7U0FDM0I7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNHLDBDQUFPLEdBQWI7Ozs7Z0NBQ1MscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQ25DLE1BQU0sRUFBRSxLQUFLO2dDQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZ0JBQWE7NkJBQ3ZDLENBQUMsRUFBQTtnQ0FIRixzQkFBTyxTQUdMLEVBQUM7Ozs7U0FDSjtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0cseUNBQU0sR0FBWixVQUNFLEdBQVcsRUFDWCxLQUFVOzs7O2dDQUVILHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUNuQyxNQUFNLEVBQUUsTUFBTTtnQ0FDZCxHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFhO2dDQUN0QyxJQUFJLEVBQUU7b0NBQ0osR0FBRyxLQUFBO29DQUNILEtBQUssT0FBQTtpQ0FDTjs2QkFDRixDQUFDLEVBQUE7Z0NBUEYsc0JBQU8sU0FPTCxFQUFDOzs7O1NBQ0o7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csNENBQVMsR0FBZixVQUFnQixHQUFXOzs7O2dDQUNsQixxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQ0FDbkMsTUFBTSxFQUFFLFFBQVE7Z0NBQ2hCLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksb0JBQWUsR0FBSzs2QkFDOUMsQ0FBQyxFQUFBO2dDQUhGLHNCQUFPLFNBR0wsRUFBQzs7OztTQUNKO1FBQ0gsK0JBQUM7SUFBRCxDQUFDLEFBMUpELElBMEpDO0lBMUpZLDREQUF3QiJ9