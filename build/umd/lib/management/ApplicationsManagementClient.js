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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./AclManagementClient", "./RolesManagementClient", "./AgreementManagementClient"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9BcHBsaWNhdGlvbnNNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBWUEsNkRBQTREO0lBRTVELGlFQUFnRTtJQUVoRSx5RUFBd0U7SUFFeEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNIO1FBU0Usc0NBQ0UsT0FBZ0MsRUFDaEMsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIsYUFBc0M7WUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLHlDQUFtQixDQUNoQyxPQUFPLEVBQ1AsYUFBYSxFQUNiLFVBQVUsRUFDVixhQUFhLENBQ2QsQ0FBQztZQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSw2Q0FBcUIsQ0FDcEMsT0FBTyxFQUNQLGFBQWEsRUFDYixVQUFVLEVBQ1YsYUFBYSxDQUNkLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscURBQXlCLENBQzdDLE9BQU8sRUFDUCxhQUFhLEVBQ2IsVUFBVSxFQUNWLGFBQWEsQ0FDZCxDQUFDO1FBQ0osQ0FBQztRQUVEOzs7V0FHRztRQUNVLDJDQUFJLEdBQWpCLFVBQWtCLE1BR2pCOzs7Ozs7NEJBSU8sS0FBMkIsTUFBTSxJQUFJLEVBQUUsRUFBckMsWUFBUSxFQUFSLElBQUksbUJBQUcsQ0FBQyxLQUFBLEVBQUUsYUFBVSxFQUFWLEtB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