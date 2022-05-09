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
import { allow, authorizeResource, isAllowed, listAuthorizedResources, authorizedTargets } from '../graphqlapi';
import { formatAuthorizedResources, serialize } from '../utils';
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
                    case 0: return [4 /*yield*/, allow(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, isAllowed(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, listAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                targetType: targetType,
                                targetIdentifier: targetIdentifier,
                                namespace: namespace,
                                resourceType: resourceType
                            })];
                    case 1:
                        _a = (_b.sent()).authorizedResources, list = _a.list, totalCount = _a.totalCount;
                        list = formatAuthorizedResources(list);
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
                        return [4 /*yield*/, authorizeResource(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, authorizedTargets(this.graphqlClient, this.tokenProvider, {
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
                                serialize({
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
export { AclManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNsTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9BY2xNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBUXZCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNIO0lBTUUsNkJBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsVUFBc0IsRUFDdEIsYUFBc0M7UUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxnQ0FBWSxHQUExQixVQUEyQixXQUF3QjtRQUF4Qiw0QkFBQSxFQUFBLGdCQUF3QjtRQUNqRCxXQUFXLEdBQUcsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUVoQyxJQUFNLENBQUMsR0FBRyw2QkFBNkIsQ0FBQztRQUN4QyxJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUVYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMs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