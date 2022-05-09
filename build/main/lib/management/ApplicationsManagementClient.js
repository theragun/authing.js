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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsManagementClient = void 0;
var AclManagementClient_1 = require("./AclManagementClient");
var RolesManagementClient_1 = require("./RolesManagementClient");
var AgreementManagementClient_1 = require("./AgreementManagementClient");
/**
 * @class ApplicationsManagementClient 管理分组
 * @description 此模块用于管理 Authing 分组，可以进行分组的增删改查、分组添加/删除用户、分组添加/删除策略 等操作。
 *
 * @example
 *
 * 请使用以下方式使用该模块，而不要直接初始化该模块：
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.applications.list // 获取应用列表
 * managementClient.applications.findById // 通过 ID 获取应用详情
 * \`\`\`
 *
 * @name ApplicationsManagementClient
 */
var ApplicationsManagementClient = /** @class */ (function () {
    function ApplicationsManagementClient(options, httpClient, graphqlClient, tokenProvider) {
        this.options = options;
        this.httpClient = httpClient;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
        this.acl = new AclManagementClient_1.AclManagementClient(options, graphqlClient, httpClient, tokenProvider);
        this.roles = new RolesManagementClient_1.RolesManagementClient(options, graphqlClient, httpClient, tokenProvider);
        this.agreements = new AgreementManagementClient_1.AgreementManagementClient(options, graphqlClient, httpClient, tokenProvider);
    }
    /**
     * @description 获取用户池应用列表
     *
     */
    ApplicationsManagementClient.prototype.list = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = params || {}, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        return [4 /*yield*/, this.httpClient.request({
                                url: this.options.host + "/api/v2/applications",
                                method: 'GET',
                                params: {
                                    page: page,
                                    limit: limit
                                }
                            })];
                    case 1:
                        data = _d.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 创建应用
     * @param options.name 应用名称
     * @param options.identifier 应用认证地址
     * @param options.redirectUris 应用回调链接
     * @param options.logo 应用 logo
     * @returns Promise<Application>
     */
    ApplicationsManagementClient.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'POST',
                            url: this.options.host + "/api/v2/applications",
                            data: __assign({}, options)
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 删除应用
     * @param appId 应用 ID
     * @returns Promise<boolean>
     */
    ApplicationsManagementClient.prototype.delete = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/applications/" + appId
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description 通过 ID 获取应用详情
     * @param id 应用 ID
     */
    ApplicationsManagementClient.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error('params id is required!');
                        }
                        return [4 /*yield*/, this.httpClient.request({
                                url: this.options.host + "/api/v2/applications/" + id,
                                method: 'GET'
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.listResources = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.getResources(__assign(__assign({}, options), { namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.createResource = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.createResource(__assign(__assign({}, options), { namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.updateResource = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.updateResource(options.code, __assign(__assign({}, options), { namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.deleteResource = function (appId, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.deleteResource(code, appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 获取应用访问控制策略
     * @param appId
     * @param options
     */
    ApplicationsManagementClient.prototype.getAccessPolicies = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.getApplicationAccessPolicies(__assign(__assign({}, options), { appId: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 启用针对某个用户、角色、分组、组织机构的应用访问控制策略
     * @param appId
     * @param options
     */
    ApplicationsManagementClient.prototype.enableAccessPolicy = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.enableApplicationAccessPolicy(__assign(__assign({}, options), { appId: appId, namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 停用针对某个用户、角色、分组、组织机构的应用访问控制策略
     * @param appId
     * @param options
     */
    ApplicationsManagementClient.prototype.disableAccessPolicy = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.disableApplicationAccessPolicy(__assign(__assign({}, options), { appId: appId, namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 删除针对某个用户、角色、分组、组织机构的应用访问控制策略
     * @param appId
     * @param options
     */
    ApplicationsManagementClient.prototype.deleteAccessPolicy = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.deleteApplicationAccessPolicy(__assign(__assign({}, options), { appId: appId, namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
     * @param appId
     * @param options
     */
    ApplicationsManagementClient.prototype.allowAccess = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.allowAccessApplication(__assign(__assign({}, options), { appId: appId, namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
     * @param appId
     * @param options
     */
    ApplicationsManagementClient.prototype.denyAccess = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.denyAccessApplication(__assign(__assign({}, options), { appId: appId, namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @description 更改默认应用访问策略
     * @param appId
     * @param defaultStrategy
     */
    ApplicationsManagementClient.prototype.updateDefaultAccessPolicy = function (appId, defaultStrategy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acl.updateDefaultApplicationAccessPolicy({
                            appId: appId,
                            defaultStrategy: defaultStrategy
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.createRole = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.create(options.code, options.description, appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.deleteRole = function (appId, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.delete(code, appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.deleteRoles = function (appId, codes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.deleteMany(codes, appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.updateRole = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.update(options.code, __assign(__assign({}, options), { namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.findRole = function (appId, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.roles.detail(code, appId)];
            });
        });
    };
    ApplicationsManagementClient.prototype.getRoles = function (appId, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.list(__assign(__assign({}, options), { namespace: appId }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.getUsersByRoleCode = function (appId, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.listUsers(code, {
                            namespace: appId
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.addUsersToRole = function (appId, code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.addUsers(code, userIds, appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.removeUsersFromRole = function (appId, code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.removeUsers(code, userIds, appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.listAuthorizedResourcesByRole = function (appId, code, resourceType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.roles.listAuthorizedResources(code, appId, {
                            resourceType: resourceType
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.createAgreement = function (appId, agreement) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agreements.create(appId, agreement)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.deleteAgreement = function (appId, agreementId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agreements.delete(appId, agreementId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.modifyAgreement = function (appId, agreementId, updates) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agreements.modify(appId, agreementId, updates)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.listAgreement = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agreements.list(appId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApplicationsManagementClient.prototype.sortAgreement = function (appId, order) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agreements.sort(appId, order)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查看应用下已登录用户
     * @param appId 应用 ID
     * @param page 当前页数
     * @param limit 每页显示条数
     * @returns Promise<Application>
     */
    ApplicationsManagementClient.prototype.activeUsers = function (appId, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/applications/" + appId + "/active-users?page=" + page + "&limit=" + limit
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 刷新应用密钥
     * @param appId 应用 ID
     * @returns Promise<Application>
     */
    ApplicationsManagementClient.prototype.refreshApplicationSecret = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'PATCH',
                            url: this.options.host + "/api/v2/application/" + appId + "/refresh-secret"
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 更改应用类型
     * @param appId 应用ID
     * @param type 应用类型
     */
    ApplicationsManagementClient.prototype.changeApplicationType = function (appId, type) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'POST',
                            url: this.options.host + "/api/v2/applications/" + appId,
                            data: {
                                appType: type.toString()
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
     * 获取应用关联租户
     * @param appId 应用ID
     */
    ApplicationsManagementClient.prototype.applicationTenants = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpClient.request({
                            method: 'GET',
                            url: this.options.host + "/api/v2/application/" + appId + "/tenants",
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ApplicationsManagementClient;
}());
exports.ApplicationsManagementClient = ApplicationsManagementClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9BcHBsaWNhdGlvbnNNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsNkRBQTREO0FBRTVELGlFQUFnRTtBQUVoRSx5RUFBd0U7QUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNIO0lBU0Usc0NBQ0UsT0FBZ0MsRUFDaEMsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIsYUFBc0M7UUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLHlDQUFtQixDQUNoQyxPQUFPLEVBQ1AsYUFBYSxFQUNiLFVBQVUsRUFDVixhQUFhLENBQ2QsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2Q0FBcUIsQ0FDcEMsT0FBTyxFQUNQLGFBQWEsRUFDYixVQUFVLEVBQ1YsYUFBYSxDQUNkLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscURBQXlCLENBQzdDLE9BQU8sRUFDUCxhQUFhLEVBQ2IsVUFBVSxFQUNWLGFBQWEsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNVLDJDQUFJLEdBQWpCLFVBQWtCLE1BR2pCOzs7Ozs7d0JBSU8sS0FBMkIsTUFBTSxJQUFJLEVBQUUsRUFBckMsWUFBUSxFQUFSLElBQUksbUJBQUcsQ0FBQyxLQUFBLEVBQUUsYUFBVSxFQUFWLEtBQUssbUJBQUcs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