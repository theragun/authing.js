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
        define(["require", "exports", "../../types/graphql.v2", "../graphqlapi", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RolesManagementClient = void 0;
    var graphql_v2_1 = require("../../types/graphql.v2");
    var graphqlapi_1 = require("../graphqlapi");
    var utils_1 = require("../utils");
    /**
     * @class RolesManagementClient 管理角色
     * @description 此模块用于管理 Authing 角色，可以进行角色的增删改查、角色添加/删除用户、角色添加/删除策略 等操作。
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
     * managementClient.roles.list // 获取角色列表
     * managementClient.roles.create // 创建角色
     * managementClient.roles.listUsers // 获取角色用户列表
     * \`\`\`
     *
     * @name RolesManagementClient
     */
    var RolesManagementClient = /** @class */ (function () {
        function RolesManagementClient(options, graphqlClient, httpClient, tokenProvider) {
            this.options = options;
            this.graphqlClient = graphqlClient;
            this.httpClient = httpClient;
            this.tokenProvider = tokenProvider;
        }
        /**
         * @name create
         * @name_zh 创建角色
         * @description 创建角色
         *
         * @param {string} code 角色唯一标志符
         * @param {string} [options.description] 描述
         * @param {string} [options.namespace] 该角色所在的 namespace，默认为 default
         *
         * @example
         * managementClient.roles.create('rolea', 'RoleA')
         *
         * @returns {Promise<DeepPartial<Role>>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.create = function (code, description, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.addRole(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                description: description,
                                namespace: namespace
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.createRole];
                    }
                });
            });
        };
        /**
         * @name delete
         * @name_zh 删除角色
         * @description 删除角色
         *
         * @param {string} code 角色唯一标志符
         * @param {string} [namespace] 角色所属的 Namespace code，默认值为 'default'
         *
         * @example
         * managementClient.roles.delete('rolea')
         *
         * @returns {Promise<CommonMessage>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.delete = function (code, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.deleteRole(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                namespace: namespace
                            })];
                        case 1:
                            data = (_a.sent()).deleteRole;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name deleteMany
         * @name_zh 批量删除角色
         * @description 批量删除角色
         *
         * @param {string[]} codeList 角色唯一标志符列表
         * @param {string} [namespace] 角色所属的 Namespace，默认值为 'default'
         *
         * @example
         * managementClient.roles.delete(['rolea'])
         *
         * @returns {Promise<CommonMessage>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.deleteMany = function (codeList, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.deleteRoles(this.graphqlClient, this.tokenProvider, {
                                codeList: codeList,
                                namespace: namespace
                            })];
                        case 1:
                            data = (_a.sent()).deleteRoles;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name update
         * @name_zh 修改角色
         * @description 修改角色
         *
         * @param {string} code 角色唯一标志符
         * @param {Object} options
         * @param {string} options.description 描述信息
         * @param {string} options.newCode 新的唯一标志符
         * @param {string} options.namespace 角色所属的 Namespace，默认值为 'default'
         *
         * @example
         * managementClient.roles.update('rolea', {newCode: 'newcode'})
         *
         *
         * @returns {Promise<DeepPartial<Role>>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.update = function (code, options) {
            return __awaiter(this, void 0, void 0, function () {
                var description, newCode, namespace, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            description = options.description, newCode = options.newCode, namespace = options.namespace;
                            return [4 /*yield*/, graphqlapi_1.updateRole(this.graphqlClient, this.tokenProvider, {
                                    code: code,
                                    description: description,
                                    newCode: newCode,
                                    namespace: namespace
                                })];
                        case 1:
                            data = (_a.sent()).updateRole;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @deprecated  已过时, 不建议使用
         */
        RolesManagementClient.prototype.detail = function (code, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.role(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                namespace: namespace
                            })];
                        case 1:
                            data = (_a.sent()).role;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         *
         * @name findByCode
         * @name_zh 获取角色详情
         * @description 获取角色详情
         *
         * @param {string} code 角色唯一标志符
         * @param {string} [namespace] 角色所属的 Namespace，默认值为 'default'
         *
         * @example`
         * managementClient.roles.detail('manager')
         *
         * @returns {Promise<DeepPartial<Role>>} 角色详情
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.findByCode = function (code, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.detail(code, namespace)];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name list
         * @name_zh 获取角色列表
         * @description 获取角色列表
         *
         * @param {Object} [options]
         * @param {number} [options.page=1] 页码数
         * @param {number} [options.limit=10] 每页个数
         * @param {string} [options.namespace] 角色所属的 Namespace，默认值为 'default'
         *
         * @example
         * managementClient.roles.list(2, 10)
         *
         * @returns {Promise<DeepPartial<PaginatedRoles>>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.list = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, page, _c, limit, namespace, data;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = options || {}, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, namespace = _a.namespace;
                            return [4 /*yield*/, graphqlapi_1.roles(this.graphqlClient, this.tokenProvider, {
                                    page: page,
                                    limit: limit,
                                    namespace: namespace
                                })];
                        case 1:
                            data = (_d.sent()).roles;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name listUsers
         * @name_zh 获取角色用户列表
         * @description 获取角色用户列表
         *
         * @param {string} code 角色唯一标志符
         * * @param {string} [namespace] 角色所属的 Namespace，默认值为 'default'
         *
         * @example
         * managementClient.roles.listUsers(code)
         *
         * @returns {Promise<DeepPartial<PaginatedUsers>>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.listUsers = function (code, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, namespace, _b, withCustomData, _c, page, _d, limit, data, data, _e, totalCount, list;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _a = options || {}, namespace = _a.namespace, _b = _a.withCustomData, withCustomData = _b === void 0 ? false : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.limit, limit = _d === void 0 ? 10 : _d;
                            if (!!withCustomData) return [3 /*break*/, 2];
                            return [4 /*yield*/, graphqlapi_1.roleWithUsers(this.graphqlClient, this.tokenProvider, {
                                    code: code,
                                    namespace: namespace,
                                    page: page,
                                    limit: limit
                                })];
                        case 1:
                            data = (_f.sent()).role;
                            if (!data) {
                                return [2 /*return*/, {
                                        totalCount: 0,
                                        list: []
                                    }];
                            }
                            return [2 /*return*/, data.users];
                        case 2: return [4 /*yield*/, graphqlapi_1.roleWithUsersWithCustomData(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                namespace: namespace,
                                page: page,
                                limit: limit
                            })];
                        case 3:
                            data = (_f.sent()).role;
                            if (!data) {
                                return [2 /*return*/, {
                                        totalCount: 0,
                                        list: []
                                    }];
                            }
                            _e = data.users, totalCount = _e.totalCount, list = _e.list;
                            list = list.map(function (user) {
                                // @ts-ignore
                                user.customData = utils_1.convertUdvToKeyValuePair(user.customData);
                                return user;
                            });
                            return [2 /*return*/, {
                                    totalCount: totalCount,
                                    // @ts-ignore
                                    list: list
                                }];
                    }
                });
            });
        };
        /**
         * @name findUsers
         * @name_zh 查找角色特定用户
         * @description 查找角色特定用户
         *
         * @param {string} code 角色唯一标志符
         * * @param {string} [namespace] 角色所属的 Namespace，默认值为 'default'
         * * @param {string} [search] 匹配用户、手机、组织模糊搜索，默认值为 ''
         *
         * @example
         * managementClient.roles.findUsers(code)
         *
         * @returns {Promise<DeepPartial<PaginatedUsers>>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.findUsers = function (code, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, namespace, _c, search, _d, page, _e, limit, data;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _a = options || {}, _b = _a.namespace, namespace = _b === void 0 ? 'default' : _b, _c = _a.search, search = _c === void 0 ? '' : _c, _d = _a.page, page = _d === void 0 ? 1 : _d, _e = _a.limit, limit = _e === void 0 ? 10 : _e;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/roles/roleUsers",
                                    data: {
                                        namespace: namespace,
                                        code: code,
                                        limit: limit,
                                        page: page,
                                        search: search,
                                    }
                                })];
                        case 1:
                            data = _f.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name addUsers
         * @name_zh 添加用户
         * @description 添加用户
         *
         * @param {string} code 角色唯一标志符
         * @param {string[]} userIds 用户 ID 列表
         * @param {string} [namespace] 角色所属的 Namespace，默认值为 'default'
         *
         * @example
         * managementClient.roles.addUsers(code, ['USERID1', 'USERID2'])
         *
         * @returns {Promise<CommonMessage>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.addUsers = function (code, userIds, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.assignRole(this.graphqlClient, this.tokenProvider, {
                                roleCode: code,
                                userIds: userIds,
                                namespace: namespace
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.assignRole];
                    }
                });
            });
        };
        /**
         * @name removeUsers
         * @name_zh 移除用户
         *
         * @description 移除用户
         *
         * @param {string} code 角色唯一标志符
         * @param {string[]} userIds 用户 ID 列表
         * @param {string} [namespace] 角色所属的 Namespace，默认值为 'default'
         *
         * @example
         * managementClient.roles.removeUsers(code, ['USERID1', 'USERID2'])
         *
         * @returns {Promise<CommonMessage>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.removeUsers = function (code, userIds, namespace) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.revokeRole(this.graphqlClient, this.tokenProvider, {
                                roleCode: code,
                                userIds: userIds,
                                namespace: namespace
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.revokeRole];
                    }
                });
            });
        };
        /**
         * @name listPolicies
         * @name_zh 获取角色策略列表
         *
         * @description 获取角色策略列表
         *
         * @param {string} code 角色唯一标志符
         * @param {number} [page=1] 页码数
         * @param {number} [limit=10] 页码个数
         * @example
         *  managementClient.roles.listPolicies('codea', 1, 10)
         *
         * @returns {Promise<PaginatedPolicyAssignments>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.listPolicies = function (code, page, limit) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 10; }
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.policyAssignments(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.PolicyAssignmentTargetType.Role,
                                targetIdentifier: code,
                                page: page,
                                limit: limit
                            })];
                        case 1:
                            data = (_a.sent()).policyAssignments;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name addPolicies
         * @name_zh 授权策略
         *
         * @description 给角色授权策略策略
         *
         * @param {string} code 角色唯一标志符
         * @param {string[]} policies 策略列表
         * @example
         * managementClient.roles.addPolicies('rolea', ['PolicyA', 'PolicyB'])
         *
         * @returns {Promise<CommonMessage>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.addPolicies = function (code, policies) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.addPolicyAssignments(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.PolicyAssignmentTargetType.User,
                                targetIdentifiers: [code],
                                policies: policies
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.addPolicyAssignments];
                    }
                });
            });
        };
        /**
         * @name removePolicies
         * @name_zh 角色移除策略
         *
         * @description 角色移除策略
         *
         * @param {string} code 角色唯一标志符
         * @param {string[]} policies 策略列表
         * @example
         * managementClient.roles.removePolicies('rolea', ['PolicyA', 'PolicyB'])
         *
         * @returns {Promise<CommonMessage>}
         * @memberof RolesManagementClient
         */
        RolesManagementClient.prototype.removePolicies = function (code, policies) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.removePolicyAssignments(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.PolicyAssignmentTargetType.User,
                                targetIdentifiers: [code],
                                policies: policies
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.removePolicyAssignments];
                    }
                });
            });
        };
        /**
         * @description 获取角色被授权的所有资源
         *
         * @param code: 角色 code
         * @param namespace: 角色权限组 namespace code
         * @param options.resourceType 资源类型
         */
        RolesManagementClient.prototype.listAuthorizedResources = function (code, namespace, options) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceType, role, _a, list, totalCount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resourceType = (options || {}).resourceType;
                            return [4 /*yield*/, graphqlapi_1.listRoleAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                    code: code,
                                    namespace: namespace,
                                    resourceType: resourceType
                                })];
                        case 1:
                            role = (_b.sent()).role;
                            if (!role) {
                                throw new Error('角色不存在');
                            }
                            _a = role.authorizedResources, list = _a.list, totalCount = _a.totalCount;
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
         * 获取某个角色扩展字段列表
         * @param roleId 角色 ID
         * @returns Promise<{ [key: string]: any }>
         */
        RolesManagementClient.prototype.getUdfValue = function (roleId) {
            return __awaiter(this, void 0, void 0, function () {
                var list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.Role,
                                targetId: roleId
                            })];
                        case 1:
                            list = (_a.sent()).udv;
                            return [2 /*return*/, utils_1.convertUdvToKeyValuePair(list)];
                    }
                });
            });
        };
        /**
         * 获取某个角色某个扩展字段
         * @param roleId 角色 ID
         * @param udfKey 扩展字段 Key
         * @returns Promise<{ [key: string]: any }>
         */
        RolesManagementClient.prototype.getSpecificUdfValue = function (roleId, udfKey) {
            return __awaiter(this, void 0, void 0, function () {
                var list, udfMap, udfValue, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.udv(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.Role,
                                targetId: roleId
                            })];
                        case 1:
                            list = (_a.sent()).udv;
                            udfMap = utils_1.convertUdvToKeyValuePair(list);
                            udfValue = {};
                            for (key in udfMap) {
                                if (udfKey === key) {
                                    udfValue[key] = udfMap[key];
                                }
                            }
                            return [2 /*return*/, udfValue];
                    }
                });
            });
        };
        /**
         * 获取多个角色扩展字段列表
         * @param roleId 角色 ID 列表
         * @returns Promise<{ [x: string]: KeyValuePair }>
         */
        RolesManagementClient.prototype.getUdfValueBatch = function (roleIds) {
            return __awaiter(this, void 0, void 0, function () {
                var result, ret, _i, result_1, _a, targetId, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (roleIds.length === 0) {
                                throw new Error('empty user id list');
                            }
                            return [4 /*yield*/, graphqlapi_1.udfValueBatch(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.Role,
                                    targetIds: roleIds
                                })];
                        case 1:
                            result = (_b.sent()).udfValueBatch;
                            ret = {};
                            for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                                _a = result_1[_i], targetId = _a.targetId, data = _a.data;
                                ret[targetId] = utils_1.convertUdvToKeyValuePair(data);
                            }
                            return [2 /*return*/, ret];
                    }
                });
            });
        };
        /**
         * 设置某个角色扩展字段列表
         * @param roleId 角色 ID 列表
         * @param data 扩展字段
         */
        RolesManagementClient.prototype.setUdfValue = function (roleId, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (Object.keys(data).length === 0) {
                                throw new Error('empty udf value list');
                            }
                            return [4 /*yield*/, graphqlapi_1.setUdvBatch(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.Role,
                                    targetId: roleId,
                                    udvList: Object.keys(data).map(function (key) { return ({
                                        key: key,
                                        value: JSON.stringify(data[key])
                                    }); })
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 设置多个角色扩展字段列表
         * @param input.roleId 角色 ID 列表
         * @param input.data 扩展字段
         */
        RolesManagementClient.prototype.setUdfValueBatch = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var params;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (input.length === 0) {
                                throw new Error('empty input list');
                            }
                            params = [];
                            input.forEach(function (_a) {
                                var userId = _a.roleId, data = _a.data;
                                for (var _i = 0, _b = Object.keys(data); _i < _b.length; _i++) {
                                    var key = _b[_i];
                                    params.push({
                                        targetId: userId,
                                        key: key,
                                        value: JSON.stringify(data[key])
                                    });
                                }
                            });
                            return [4 /*yield*/, graphqlapi_1.setUdfValueBatch(this.graphqlClient, this.tokenProvider, {
                                    targetType: graphql_v2_1.UdfTargetType.Role,
                                    input: params
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 删除用户的扩展字段
         * @param input.roleId 角色 ID 列表
         * @param input.key 扩展字段名
         */
        RolesManagementClient.prototype.removeUdfValue = function (roleId, key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.removeUdv(this.graphqlClient, this.tokenProvider, {
                                targetType: graphql_v2_1.UdfTargetType.Role,
                                targetId: roleId,
                                key: key
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return RolesManagementClient;
    }());
    exports.RolesManagementClient = RolesManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZXNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1JvbGVzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHQSxxREFVZ0M7SUFDaEMsNENBb0J1QjtJQUV2QixrQ0FBK0U7SUFHL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSDtRQU1FLCtCQUNFLE9BQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFVBQXNCLEVBQ3RCLGFBQXNDO1lBRXRDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNHLHNDQUFNLEdBQVosVUFDRSxJQUFZLEVBQ1osV0FBb0IsRUFDcEIsU0FBa0I7Ozs7O2dDQUVOLHFCQUFNLG9CQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUNoRSxJQUFJLE1BQUE7Z0NBQ0osV0FBVyxhQUFBO2dDQUNYLFNBQVMsV0FBQTs2QkFDVixDQUFDLEVBQUE7OzRCQUpJLEdBQUcsR0FBRyxTQUlWOzRCQUNGLHNCQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUM7Ozs7U0FDdkI7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csc0NBQU0sR0FBWixVQUFhLElBQVksRUFBRSxTQUFrQjs7Ozs7Z0NBQ2QscUJBQU0sdUJBQVUsQ0FDM0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsSUFBSSxNQUFBO2dD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