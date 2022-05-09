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
import { OrgManagementClient } from './OrgManagementClient';
import { GraphqlClient } from '../common/GraphqlClient';
import { ManagementTokenProvider } from './ManagementTokenProvider';
import { UserPoolManagementClient } from './UserpoolManagementClient';
import { UsersManagementClient } from './UsersManagementClient';
import { sendEmail } from '../graphqlapi';
import { FastHttpClient, HttpClient } from '../common/HttpClient';
import Axios from 'axios';
import { RolesManagementClient } from './RolesManagementClient';
import { PoliciesManagementClient } from './PoliciesManagementClient';
import { UdfManagementClient } from './UdfManagementClient';
import { GroupsManagementClient } from './GroupsManagementClient';
import { AclManagementClient } from './AclManagementClient';
import { WhitelistManagementClient } from './WhitelistManagementClient';
import { StatisticsManagementClient } from './StatisticsManagementClient';
import jwtDecode from 'jwt-decode';
import { encrypt } from '../utils';
import { PublicKeyManager } from '../common/PublicKeyManager';
import { UserActionManagementClient } from './UserActionManagementClient';
import { ApplicationsManagementClient } from './ApplicationsManagementClient';
import { MFAManagementClient } from './MFAManagementClient';
import { PrincipalManagementClient } from './PrincipalManagement';
import { TenantManagementClient } from './TenantManagementClient';
var DEFAULT_OPTIONS = {
    timeout: 10000,
    onError: function (code, message) {
        throw { code: code, message: message };
    },
    host: 'https://core.authing.cn',
    requestFrom: 'sdk',
    encryptFunction: encrypt,
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
        Axios.defaults.baseURL = this.options.host;
        this.graphqlClient = new (this.options.graphqlClient || GraphqlClient)(graphqlApiEndpointV2, this.options);
        this.tokenProvider = new ManagementTokenProvider(this.options, this.graphqlClient);
        this.httpClient = new (this.options.httpClient || HttpClient)(this.options, this.tokenProvider);
        this.fastHttpClient = new (this.options.fastHttpClient || FastHttpClient)(this.options, this.tokenProvider);
        this.publicKeyManager = new PublicKeyManager(this.options, this.httpClient);
        this.users = new UsersManagementClient(this.options, this.graphqlClient, this.httpClient, this.fastHttpClient, this.tokenProvider, this.publicKeyManager);
        this.userpool = new UserPoolManagementClient(this.options, this.httpClient, this.graphqlClient, this.tokenProvider);
        this.org = new OrgManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.roles = new RolesManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.policies = new PoliciesManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.udf = new UdfManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.acl = new AclManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.whitelist = new WhitelistManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.groups = new GroupsManagementClient(this.options, this.graphqlClient, this.tokenProvider);
        this.statistics = new StatisticsManagementClient(this.options, this.httpClient, this.tokenProvider);
        this.userAction = new UserActionManagementClient(this.options, this.httpClient, this.tokenProvider);
        this.applications = new ApplicationsManagementClient(this.options, this.httpClient, this.graphqlClient, this.tokenProvider);
        this.mfa = new MFAManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.principal = new PrincipalManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
        this.tenant = new TenantManagementClient(this.options, this.graphqlClient, this.httpClient, this.tokenProvider);
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
                    case 0: return [4 /*yield*/, sendEmail(this.graphqlClient, this.tokenProvider, { email: email, scene: scene })];
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
                            decoded = jwtDecode(token);
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
export { ManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9NYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxLQUE2QixNQUFNLE9BQU8sQ0FBQztBQUNsRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFFLE9BQU8sRUFB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