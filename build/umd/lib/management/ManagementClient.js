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
        define(["require", "exports", "./OrgManagementClient", "../common/GraphqlClient", "./ManagementTokenProvider", "./UserpoolManagementClient", "./UsersManagementClient", "../graphqlapi", "../common/HttpClient", "axios", "./RolesManagementClient", "./PoliciesManagementClient", "./UdfManagementClient", "./GroupsManagementClient", "./AclManagementClient", "./WhitelistManagementClient", "./StatisticsManagementClient", "jwt-decode", "../utils", "../common/PublicKeyManager", "./UserActionManagementClient", "./ApplicationsManagementClient", "./MFAManagementClient", "./PrincipalManagement", "./TenantManagementClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManagementClient = void 0;
    var OrgManagementClient_1 = require("./OrgManagementClient");
    var GraphqlClient_1 = require("../common/GraphqlClient");
    var ManagementTokenProvider_1 = require("./ManagementTokenProvider");
    var UserpoolManagementClient_1 = require("./UserpoolManagementClient");
    var UsersManagementClient_1 = require("./UsersManagementClient");
    var graphqlapi_1 = require("../graphqlapi");
    var HttpClient_1 = require("../common/HttpClient");
    var axios_1 = __importDefault(require("axios"));
    var RolesManagementClient_1 = require("./RolesManagementClient");
    var PoliciesManagementClient_1 = require("./PoliciesManagementClient");
    var UdfManagementClient_1 = require("./UdfManagementClient");
    var GroupsManagementClient_1 = require("./GroupsManagementClient");
    var AclManagementClient_1 = require("./AclManagementClient");
    var WhitelistManagementClient_1 = require("./WhitelistManagementClient");
    var StatisticsManagementClient_1 = require("./StatisticsManagementClient");
    var jwt_decode_1 = __importDefault(require("jwt-decode"));
    var utils_1 = require("../utils");
    var PublicKeyManager_1 = require("../common/PublicKeyManager");
    var UserActionManagementClient_1 = require("./UserActionManagementClient");
    var ApplicationsManagementClient_1 = require("./ApplicationsManagementClient");
    var MFAManagementClient_1 = require("./MFAManagementClient");
    var PrincipalManagement_1 = require("./PrincipalManagement");
    var TenantManagementClient_1 = require("./TenantManagementClient");
    var DEFAULT_OPTIONS = {
        timeout: 10000,
        onError: function (code, message) {
            throw { code: code, message: message };
        },
        host: 'https://core.authing.cn',
        requestFrom: 'sdk',
        encryptFunction: utils_1.encrypt,
        headers: {
            'userpool-id': 'x-authing-userpool-id',
            'app-id': 'x-authing-app-id',
            'tenant-id': 'x-authing-app-tenant-id',
            'request-from': 'x-authing-request-from',
            'sdk-version': 'x-authing-sdk-version',
            lang: 'x-authing-lang'
        },
        lang: 'zh-CN'
    };
    var ManagementClient = /** @class */ (function () {
        function ManagementClient(options) {
            Object.keys(options).forEach(function (i) { return !options[i] && delete options[i]; });
            this.options = Object.assign({}, DEFAULT_OPTIONS, options);
            if (!this.options.userPoolId && !this.options.appId)
                throw new Error('请提供 userPoolId 或者 appId!');
            var graphqlApiEndpointV2 = this.options.host + "/graphql/v2";
            if (!this.options.secret && !this.options.accessToken) {
                this.options.onError(1000, 'Init Management Client failed, must provide at least secret or accessToken !');
            }
            axios_1.default.defaults.baseURL = this.options.host;
            this.graphqlClient = new (this.options.graphqlClient || GraphqlClient_1.GraphqlClient)(graphqlApiEndpointV2, this.options);
            this.tokenProvider = new ManagementTokenProvider_1.ManagementTokenProvider(this.options, this.graphqlClient);
            this.httpClient = new (this.options.httpClient || HttpClient_1.HttpClient)(this.options, this.tokenProvider);
            this.fastHttpClient = new (this.options.fastHttpClient || HttpClient_1.FastHttpClient)(this.options, this.tokenProvider);
            this.publicKeyManager = new PublicKeyManager_1.PublicKeyManager(this.options, this.httpClient);
            this.users = new UsersManagementClient_1.UsersManagementClient(this.options, this.graphqlClient, this.httpClient, this.fastHttpClient, this.tokenProvider, this.publicKeyManager);
            this.userpool = new UserpoolManagementClient_1.UserPoolManagementClient(this.options, this.httpClient, this.graphqlClient, this.tokenProvider);
            this.org = new OrgManagementClient_1.OrgManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
            this.roles = new RolesManagementClient_1.RolesManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
            this.policies = new PoliciesManagementClient_1.PoliciesManagementClient(this.options, this.graphqlClient, this.tokenProvider);
            this.udf = new UdfManagementClient_1.UdfManagementClient(this.options, this.graphqlClient, this.tokenProvider);
            this.acl = new AclManagementClient_1.AclManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
            this.whitelist = new WhitelistManagementClient_1.WhitelistManagementClient(this.options, this.graphqlClient, this.tokenProvider);
            this.groups = new GroupsManagementClient_1.GroupsManagementClient(this.options, this.graphqlClient, this.tokenProvider);
            this.statistics = new StatisticsManagementClient_1.StatisticsManagementClient(this.options, this.httpClient, this.tokenProvider);
            this.userAction = new UserActionManagementClient_1.UserActionManagementClient(this.options, this.httpClient, this.tokenProvider);
            this.applications = new ApplicationsManagementClient_1.ApplicationsManagementClient(this.options, this.httpClient, this.graphqlClient, this.tokenProvider);
            this.mfa = new MFAManagementClient_1.MFAManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
            this.principal = new PrincipalManagement_1.PrincipalManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
            this.tenant = new TenantManagementClient_1.TenantManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        }
        /**
         * @description 发送邮件
         * @param email: 邮件
         * @param scene: 发送场景
         *
         */
        ManagementClient.prototype.sendEmail = function (email, scene) {
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
         * @description 检测登录状态
         *
         */
        ManagementClient.prototype.checkLoginStatus = function (token, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, fetchUserDetail, decoded, data, id, user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            options = options || {};
                            _a = options.fetchUserDetail, fetchUserDetail = _a === void 0 ? false : _a;
                            if (!token)
                                return [2 /*return*/, null];
                            decoded = null;
                            try {
                                decoded = jwt_decode_1.default(token);
                            }
                            catch (error) {
                                return [2 /*return*/, null];
                            }
                            data = decoded.data;
                            if (!!fetchUserDetail) return [3 /*break*/, 1];
                            return [2 /*return*/, data];
                        case 1:
                            id = data.id;
                            return [4 /*yield*/, this.users.detail(id)];
                        case 2:
                            user = _b.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * @name isPasswordValid
         * @name_zh 检测密码是否合法
         * @description 检测密码是否合法
         *
         * @param {string} password 密码
         *
         * @example
         *
         * const envList = await managementClient.isPasswordValid('xxxxxx')
         *
         * @returns {Promise<{
         *  valid: boolean
         *  message: string
         * }>} 返回检测结果
         * @memberof ManagementClient
         */
        ManagementClient.prototype.isPasswordValid = function (password) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/password/check",
                                data: {
                                    password: password
                                }
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * @description 设置语言
         */
        ManagementClient.prototype.setLang = function (lang) {
            this.options.lang = lang;
        };
        /**
         * @description 执行 GraphQL 请求
         */
        ManagementClient.prototype.makeGraphqlRequest = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var query, variables, token, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = options.query, variables = options.variables;
                            return [4 /*yield*/, this.tokenProvider.getToken()];
                        case 1:
                            token = _a.sent();
                            return [4 /*yield*/, this.graphqlClient.request({
                                    query: query,
                                    variables: variables,
                                    token: token
                                })];
                        case 2:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @description 执行 RESTful 请求
         */
        ManagementClient.prototype.makeRestRequest = function (config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request(config)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return ManagementClient;
    }());
    exports.ManagementClient = ManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9NYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLDZEQUE0RDtJQUM1RCx5REFBd0Q7SUFDeEQscUVBQW9FO0lBRXBFLHVFQUFzRTtJQUN0RSxpRUFBZ0U7SUFDaEUsNENBQTBDO0lBRzFDLG1EQUFrRTtJQUNsRSxnREFBa0Q7SUFDbEQsaUVBQWdFO0lBQ2hFLHVFQUFzRTtJQUN0RSw2REFBNEQ7SUFDNUQsbUVBQWtFO0lBQ2xFLDZEQUE0RDtJQUM1RCx5RUFBd0U7SUFDeEUsMkVBQTBFO0lBQzFFLDBEQUFtQztJQUNuQyxrQ0FBbUM7SUFDbkMsK0RBQThEO0lBQzlELDJFQUEwRTtJQUMxRSwrRUFBOEU7SUFDOUUsNkRBQTREO0lBRTVELDZEQUFrRTtJQUNsRSxtRUFBa0U7SUFFbEUsSUFBTSxlQUFlLEdBQTRCO1FBQy9DLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLFVBQUMsSUFBWSxFQUFFLE9BQWU7WUFDckMsTUFBTSxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksRUFBRSx5QkFBeUI7UUFDL0IsV0FBVyxFQUFFLEtBQUs7UUFDbEIsZUFBZSxFQUFFLGVBQU87UUFDeEIsT0FBTyxFQUFFO1lBQ1AsYUFBYSxFQUFFLHVCQUF1QjtZQUN0QyxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsY0FBYyxFQUFFLHdCQUF3QjtZQUN4QyxhQUFhLEVBQUUsdUJBQXVCO1lBQ3RDLElBQUksRUFBRSxnQkFBZ0I7U0FDdkI7UUFDRCxJQUFJLEVBQUUsT0FBTztLQUNkLENBQUM7SUFFRjtRQTJCRSww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