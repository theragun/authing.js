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
        define(["require", "exports", "../graphqlapi", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AclManagementClient = void 0;
    var graphqlapi_1 = require("../graphqlapi");
    var utils_1 = require("../utils");
    /**
     * @class AclManagementClient 管理权限、访问控制
     * @description Authing 基于 PBAC（Policy Based Access Control，基于策略的访问控制）构建权限模型，
     * 可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。
     * 此模块将此模型抽象成了两个方法: allow, isAllowed。
     *
     * @example
     *
     * 请使用以下方式使用该模块，而不要直接初始化该模块：
     *
     * \`\`\`javascript
     * import { ManagementClient } from "authing-js-sdk"
     * const managementClient = new ManagementClient({
     *    userPoolId: "YOUR_USERPOOL_ID",
     *    secret: "YOUR_USERPOOL_SECRET",
     * })
     * managementClient.acl.allow // 允许某个用户对某个资源进行某个操作
     * managementClient.acl.isAllowed // 判断某个用户是否对某个资源有某个操作权限
     * \`\`\`
     *
     * @name AclManagementClient
     */
    var AclManagementClient = /** @class */ (function () {
        function AclManagementClient(options, graphqlClient, httpClient, tokenProvider) {
            this.options = options;
            this.graphqlClient = graphqlClient;
            this.httpClient = httpClient;
            this.tokenProvider = tokenProvider;
        }
        /**
         * 生成随机字符串
         * @param randomLenth 随机长度
         * @returns string
         */
        AclManagementClient.randomString = function (randomLenth) {
            if (randomLenth === void 0) { randomLenth = 32; }
            randomLenth = randomLenth || 32;
            var t = 'abcdefhijkmnprstwxyz2345678';
            var a = t.length;
            var n = '';
            for (var i = 0; i < randomLenth; i++) {
                n += t.charAt(Math.floor(Math.random() * a));
            }
            return n;
        };
        /**
         * @name allow
         * @name_zh 允许某个用户对某个资源进行某个操作
         *
         * @description 允许某个用户对某个资源进行某个操作
         *
         * @param {string} userId 用户 ID
         * @param {string} action 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
         * @param {string} resource 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 *, 如 `*`, `books:123`, `books:*`
         * @example
         * managementClient.acl.allow('USERID1', 'books:123', 'books:read')
         * managementClient.acl.isAllowed('USERID1', 'books:123', 'books:read') // true
         * managementClient.acl.isAllowed('USERID1', 'books:123', 'books:edit') // false
         *
         * @example
         * managementClient.acl.allow('USERID2', 'books:*', 'books:*')
         * managementClient.acl.isAllowed('USERID2', 'books:123', 'books:read') // true
         * managementClient.acl.isAllowed('USERID2', 'books:124', 'books:edit') // true
         *
         * @returns {Promise<CommonMessage>}
         * @memberof AclManagementClient
         */
        AclManagementClient.prototype.allow = function (userId, resource, action, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.allow(this.graphqlClient, this.tokenProvider, {
                                resource: resource,
                                action: action,
                                userId: userId,
                                namespace: namespace
                            })];
                        case 1:
                            data = (_a.sent()).allow;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name isAllowed
         * @name_zh 判断某个用户是否对某个资源有某个操作权限
         *
         * @description 判断某个用户是否对某个资源有某个操作权限
         *
         * @param {string} userId 用户ID
         * @param {string} action 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
         * @param {string} resource 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 *, 如 `*`, `books:123`, `books:*`
         * @example
         * managementClient.acl.isAllowed('USERID', 'books:*', 'books:edit')
         *
         * @returns {Promise<boolean>} 是否具备操作权限
         * @memberof AclManagementClient
         *
         */
        AclManagementClient.prototype.isAllowed = function (userId, resource, action, opts) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, isActionAllowed;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            namespace = (opts || {}).namespace;
                            return [4 /*yield*/, graphqlapi_1.isAllowed(this.graphqlClient, this.tokenProvider, {
                                    resource: resource,
                                    action: action,
                                    userId: userId,
                                    namespace: namespace
                                })];
                        case 1:
                            isActionAllowed = (_a.sent()).isActionAllowed;
                            return [2 /*return*/, isActionAllowed];
                    }
                });
            });
        };
        /**
         * @description 获取用户被授权的所有资源
         *
         * @param userId
         * @param namespace
         */
        AclManagementClient.prototype.listAuthorizedResources = function (targetType, targetIdentifier, namespace, options) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceType, _a, list, totalCount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resourceType = (options || {}).resourceType;
                            return [4 /*yield*/, graphqlapi_1.listAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                    targetType: targetType,
                                    targetIdentifier: targetIdentifier,
                                    namespace: namespace,
                                    resourceType: resourceType
                                })];
                        case 1:
                            _a = (_b.sent()).authorizedResources, list = _a.list, totalCount = _a.totalCount;
                            list = utils_1.formatAuthorizedResources(list);
                            return [2 /*return*/, {
                                    list: list,
                                    totalCount: totalCount
                                }];
                    }
                });
            });
        };
        /**
         * @description 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限。
         *
         */
        AclManagementClient.prototype.authorizeResource = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, resource, opts, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            namespace = params.namespace, resource = params.resource, opts = params.opts;
                            return [4 /*yield*/, graphqlapi_1.authorizeResource(this.graphqlClient, this.tokenProvider, {
                                    namespace: namespace,
                                    resource: resource,
                                    opts: opts
                                })];
                        case 1:
                            data = (_a.sent()).authorizeResource;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        AclManagementClient.prototype.revokeResource = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, resource, opts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            namespace = params.namespace, resource = params.resource, opts = params.opts;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/acl/revoke-resource",
                                    data: {
                                        namespace: namespace,
                                        resource: resource,
                                        opts: opts
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @description 获取具备某个（类）资源操作权限的用户、分组、角色、组织机构。
         * @param namespace {string} 权限分组标识
         * @param resource {string} 资源标识
         * @param actions {string[]} 资源操作标识
         * @param targetType {string} 筛选项，指定返回主体的类型，可选值为 'USER'、'ROLE'、'ORG'、'GROUP'
         */
        AclManagementClient.prototype.getAuthorizedTargets = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options) {
                                throw new Error('请传入 options.namespace、options.resource、options.actions，含义为权限分组标识、资源标识、资源操作标识');
                            }
                            if (!options.namespace) {
                                throw new Error('请传入 options.namespace，含义为权限分组标识');
                            }
                            if (!options.resource) {
                                throw new Error('请传入 options.resource，含义为资源标识');
                            }
                            if (!options.resourceType) {
                                throw new Error('请传入 options.resourceType，含义为资源类型');
                            }
                            return [4 /*yield*/, graphqlapi_1.authorizedTargets(this.graphqlClient, this.tokenProvider, {
                                    namespace: options.namespace,
                                    resourceType: options.resourceType,
                                    resource: options.resource,
                                    targetType: options.targetType,
                                    actions: options.actions
                                })];
                        case 1:
                            data = (_a.sent()).authorizedTargets;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        AclManagementClient.prototype.listResources = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/resources",
                                params: {
                                    namespace: (options === null || options === void 0 ? void 0 : options.namespace) || (options === null || options === void 0 ? void 0 : options.namespaceCode),
                                    type: options === null || options === void 0 ? void 0 : options.type,
                                    limit: (options === null || options === void 0 ? void 0 : options.limit) || 10,
                                    page: (options === null || options === void 0 ? void 0 : options.page) || 1
                                }
                            })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AclManagementClient.prototype.getResourceById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/resources/detail",
                                params: {
                                    id: id
                                }
                            })];
                        case 1:
                            data = _a.sent();
                            if (!data) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        AclManagementClient.prototype.getResourceByCode = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, code, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            namespace = options.namespace, code = options.code;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'GET',
                                    url: this.options.host + "/api/v2/resources/detail",
                                    params: {
                                        namespace: namespace,
                                        code: code
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            if (!data) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @deprecated use listResources
         * @param options
         */
        AclManagementClient.prototype.getResources = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.listResources(options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AclManagementClient.prototype.createResource = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!options) {
                                throw new Error('请传入资源数据');
                            }
                            if (!options.code) {
                                throw new Error('请为资源设定一个资源标识符');
                            }
                            if (!options.actions || (options === null || options === void 0 ? void 0 : options.actions.length) === 0) {
                                throw new Error('请至少定义一个资源操作');
                            }
                            if (!options.namespace) {
                                throw new Error('请传入权限分组标识符');
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/resources",
                                    data: options
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AclManagementClient.prototype.updateResource = function (code, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!code) {
                                throw new Error('请传入资源标识符');
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/resources/" + code,
                                    data: options
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AclManagementClient.prototype.deleteResource = function (code, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!code) {
                                throw new Error('请传入资源标识符');
                            }
                            if (!namespace) {
                                throw new Error('请传入权限分组标识符');
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'DELETE',
                                    url: this.options.host + "/api/v2/resources/" + code,
                                    params: {
                                        namespace: namespace
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        AclManagementClient.prototype.getApplicationAccessPolicies = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var appId, page, limit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入 appId');
                            }
                            appId = options.appId, page = options.page, limit = options.limit;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'GET',
                                    url: this.options.host + "/api/v2/applications/" + appId + "/authorization/records",
                                    params: {
                                        page: page,
                                        limit: limit
                                    }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AclManagementClient.prototype.enableApplicationAccessPolicy = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, targetIdentifiers, targetType, appId, inheritByChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入 appId');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetType)) {
                                throw new Error('请传入主体类型，可选值为 USER、ROLE、ORG、GROUP，含义为用户、角色、组织机构节点、用户分组');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetIdentifiers)) {
                                throw new Error('请传入主体 id');
                            }
                            namespace = options.namespace, targetIdentifiers = options.targetIdentifiers, targetType = options.targetType, appId = options.appId, inheritByChildren = options.inheritByChildren;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/applications/" + appId + "/authorization/enable-effect",
                                    data: {
                                        targetType: targetType,
                                        namespace: namespace,
                                        targetIdentifiers: targetIdentifiers,
                                        inheritByChildren: inheritByChildren
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '启用应用访问控制策略成功' }];
                    }
                });
            });
        };
        AclManagementClient.prototype.disableApplicationAccessPolicy = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, targetIdentifiers, targetType, appId, inheritByChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入 appId');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetType)) {
                                throw new Error('请传入主体类型，可选值为 USER、ROLE、ORG、GROUP，含义为用户、角色、组织机构节点、用户分组');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetIdentifiers)) {
                                throw new Error('请传入主体 id');
                            }
                            namespace = options.namespace, targetIdentifiers = options.targetIdentifiers, targetType = options.targetType, appId = options.appId, inheritByChildren = options.inheritByChildren;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/applications/" + appId + "/authorization/disable-effect",
                                    data: {
                                        targetType: targetType,
                                        namespace: namespace,
                                        targetIdentifiers: targetIdentifiers,
                                        inheritByChildren: inheritByChildren
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '停用应用访问控制策略成功' }];
                    }
                });
            });
        };
        AclManagementClient.prototype.deleteApplicationAccessPolicy = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, targetIdentifiers, targetType, appId, inheritByChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入 appId');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetType)) {
                                throw new Error('请传入主体类型，可选值为 USER、ROLE、ORG、GROUP，含义为用户、角色、组织机构节点、用户分组');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetIdentifiers)) {
                                throw new Error('请传入主体 id');
                            }
                            namespace = options.namespace, targetIdentifiers = options.targetIdentifiers, targetType = options.targetType, appId = options.appId, inheritByChildren = options.inheritByChildren;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/applications/" + appId + "/authorization/revoke",
                                    data: {
                                        targetType: targetType,
                                        namespace: namespace,
                                        targetIdentifiers: targetIdentifiers,
                                        inheritByChildren: inheritByChildren
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '删除应用访问控制策略成功' }];
                    }
                });
            });
        };
        AclManagementClient.prototype.allowAccessApplication = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, targetIdentifiers, targetType, appId, inheritByChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入 appId');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetType)) {
                                throw new Error('请传入主体类型，可选值为 USER、ROLE、ORG、GROUP，含义为用户、角色、组织机构节点、用户分组');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetIdentifiers)) {
                                throw new Error('请传入主体 id');
                            }
                            namespace = options.namespace, targetIdentifiers = options.targetIdentifiers, targetType = options.targetType, appId = options.appId, inheritByChildren = options.inheritByChildren;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/applications/" + appId + "/authorization/allow",
                                    data: {
                                        targetType: targetType,
                                        namespace: namespace,
                                        targetIdentifiers: targetIdentifiers,
                                        inheritByChildren: inheritByChildren
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '允许主体访问应用的策略配置已生效' }];
                    }
                });
            });
        };
        AclManagementClient.prototype.denyAccessApplication = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var namespace, targetIdentifiers, targetType, appId, inheritByChildren;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入 appId');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetType)) {
                                throw new Error('请传入主体类型，可选值为 USER、ROLE、ORG、GROUP，含义为用户、角色、组织机构节点、用户分组');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.targetIdentifiers)) {
                                throw new Error('请传入主体 id');
                            }
                            namespace = options.namespace, targetIdentifiers = options.targetIdentifiers, targetType = options.targetType, appId = options.appId, inheritByChildren = options.inheritByChildren;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/applications/" + appId + "/authorization/deny",
                                    data: {
                                        targetType: targetType,
                                        namespace: namespace,
                                        targetIdentifiers: targetIdentifiers,
                                        inheritByChildren: inheritByChildren
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { code: 200, message: '拒绝主体访问应用的策略配置已生效' }];
                    }
                });
            });
        };
        AclManagementClient.prototype.updateDefaultApplicationAccessPolicy = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(options === null || options === void 0 ? void 0 : options.appId)) {
                                throw new Error('请传入应用 id');
                            }
                            if (!(options === null || options === void 0 ? void 0 : options.defaultStrategy)) {
                                throw new Error('请传入默认策略，可选值为 ALLOW_ALL、DENY_ALL，含义为默认允许所有用户登录应用、默认拒绝所有用户登录应用');
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/applications/" + options.appId,
                                    data: {
                                        permissionStrategy: { defaultStrategy: options.defaultStrategy }
                                    }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * 编程访问账号列表
         * @param appId 应用 ID
         * @param page 当前页数
         * @param limit 每页显示条数
         * @returns Promise<ProgrammaticAccessAccountList>
         */
        AclManagementClient.prototype.programmaticAccessAccountList = function (appId, page, limit) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 10; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/applications/" + appId + "/programmatic-access-accounts?limit=" + limit + "&page=" + page
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 添加编程访问账号
         * @param appId 应用 ID
         * @param options.tokenLifetime AccessToken 过期时间（秒）
         * @param options.remarks 备注
         * @returns Promise<ProgrammaticAccessAccount>
         */
        AclManagementClient.prototype.createProgrammaticAccessAccount = function (appId, options) {
            if (options === void 0) { options = {
                tokenLifetime: 600
            }; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/applications/" + appId + "/programmatic-access-accounts",
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
         * 添加编程访问账号
         * @param programmaticAccessAccountId 编程访问账号 ID
         * @returns Promise<boolean>
         */
        AclManagementClient.prototype.deleteProgrammaticAccessAccount = function (programmaticAccessAccountId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'DELETE',
                                    url: this.options.host + "/api/v2/applications/programmatic-access-accounts?id=" + programmaticAccessAccountId
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
         * 刷新编程访问账号密钥
         * @param programmaticAccessAccountId 编程访问账号 ID
         * @param programmaticAccessAccountSecret 编程访问账号 Secret
         * @returns Promise<ProgrammaticAccessAccount>
         */
        AclManagementClient.prototype.refreshProgrammaticAccessAccountSecret = function (programmaticAccessAccountId, programmaticAccessAccountSecret) {
            if (programmaticAccessAccountSecret === void 0) { programmaticAccessAccountSecret = AclManagementClient.randomString(32); }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'PATCH',
                                url: this.options.host + "/api/v2/applications/programmatic-access-accounts",
                                data: {
                                    id: programmaticAccessAccountId,
                                    secret: programmaticAccessAccountSecret
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
         * 启用编程访问账号
         * @param programmaticAccessAccountId 编程访问账号 ID
         * @returns Promise<ProgrammaticAccessAccount>
         */
        AclManagementClient.prototype.enableProgrammaticAccessAccount = function (programmaticAccessAccountId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'PATCH',
                                url: this.options.host + "/api/v2/applications/programmatic-access-accounts",
                                data: {
                                    id: programmaticAccessAccountId,
                                    enabled: true
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
         * 禁用编程访问账号
         * @param programmaticAccessAccountId 编程访问账号 ID
         * @returns Promise<ProgrammaticAccessAccount>
         */
        AclManagementClient.prototype.disableProgrammaticAccessAccount = function (programmaticAccessAccountId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'PATCH',
                                url: this.options.host + "/api/v2/applications/programmatic-access-accounts",
                                data: {
                                    id: programmaticAccessAccountId,
                                    enabled: false
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
         * 权限分组列表
         * @param page 当前页数
         * @param limit 每页显示条数
         * @returns Promise<Resources>
         */
        AclManagementClient.prototype.listNamespaces = function (page, limit) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 10; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/resource-namespace/" + this.options.userPoolId + "?" +
                                    utils_1.serialize({
                                        page: page === null || page === void 0 ? void 0 : page.toString(),
                                        limit: limit === null || limit === void 0 ? void 0 : limit.toString()
                                    })
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        /**
         * 删除权限分组
         * @param code 权限分组 Code
         * @returns Promise<boolean>
         */
        AclManagementClient.prototype.deleteNamespace = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'DELETE',
                                    url: this.options.host + "/api/v2/resource-namespace/" + this.options.userPoolId + "/code/" + code
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            error_2 = _a.sent();
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 创建权限分组
         * @param code 权限分组 Code
         * @param name 权限分组名称
         * @param description 权限分组描述
         * @returns Promise<boolean>
         */
        AclManagementClient.prototype.createNamespace = function (code, name, description) {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/resource-namespace/" + this.options.userPoolId,
                                    data: {
                                        name: name,
                                        code: code,
                                        description: description
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                        case 2:
                            error_3 = _a.sent();
                            throw error_3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 修改权限分组
         * @param code 权限分组 Code
         * @param name 权限分组名称
         * @param code 权限分组 Code
         * @param description 权限分组描述
         * @returns Promise<boolean>
         */
        AclManagementClient.prototype.updateNamespace = function (code, updates) {
            return __awaiter(this, void 0, void 0, function () {
                var data, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'PUT',
                                    url: this.options.host + "/api/v2/resource-namespace/" + this.options.userPoolId + "/code/" + code,
                                    data: {
                                        name: updates.name,
                                        code: updates.code,
                                        description: updates.description
                                    }
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                        case 2:
                            error_4 = _a.sent();
                            throw error_4;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return AclManagementClient;
    }());
    exports.AclManagementClient = AclManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNsTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9BY2xNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUJBLDRDQU11QjtJQVF2QixrQ0FBZ0U7SUFHaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNIO1FBTUUsNkJBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsVUFBc0IsRUFDdEIsYUFBc0M7WUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7O1dBSUc7UUFDVyxnQ0FBWSxHQUExQixVQUEyQixXQUF3QjtZQUF4Qiw0QkFBQSxFQUFBLGdCQUF3QjtZQUNqRCxXQUFXLEdBQUcsV0FBVyxJQUFJLEVBQUUsQ0FBQztZQUVoQyxJQUFNLENBQUMsR0FBRyw2QkFBNkIsQ0FBQztZQUN4QyxJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUM7WUFFRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUM7UUFF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