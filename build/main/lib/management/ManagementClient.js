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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9NYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUE0RDtBQUM1RCx5REFBd0Q7QUFDeEQscUVBQW9FO0FBRXBFLHVFQUFzRTtBQUN0RSxpRUFBZ0U7QUFDaEUsNENBQTBDO0FBRzFDLG1EQUFrRTtBQUNsRSxnREFBa0Q7QUFDbEQsaUVBQWdFO0FBQ2hFLHVFQUFzRTtBQUN0RSw2REFBNEQ7QUFDNUQsbUVBQWtFO0FBQ2xFLDZEQUE0RDtBQUM1RCx5RUFBd0U7QUFDeEUsMkVBQTBFO0FBQzFFLDBEQUFtQztBQUNuQyxrQ0FBbUM7QUFDbkMsK0RBQThEO0FBQzlELDJFQUEwRTtBQUMxRSwrRUFBOEU7QUFDOUUsNkRBQTREO0FBRTVELDZEQUFrRTtBQUNsRSxtRUFBa0U7QUFFbEUsSUFBTSxlQUFlLEdBQTRCO0lBQy9DLE9BQU8sRUFBRSxLQUFLO0lBQ2QsT0FBTyxFQUFFLFVBQUMsSUFBWSxFQUFFLE9BQWU7UUFDckMsTUFBTSxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksRUFBRSx5QkFBeUI7SUFDL0IsV0FBVyxFQUFFLEtBQUs7SUFDbEIsZUFBZSxFQUFFLGVBQU87SUFDeEIsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLHVCQUF1QjtRQUN0QyxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSx5QkFBeUI7UUFDdEMsY0FBYyxFQUFFLHdCQUF3QjtRQUN4QyxhQUFhLEVBQUUsdUJBQXVCO1FBQ3RDLElBQUksRUFBRSxnQkFBZ0I7S0FDdkI7SUFDRCxJQUFJLEVBQUUsT0FBTztDQUNkLENBQUM7QUFFRjtJQTJCRSwwQkFBWSxPQUFn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