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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZXNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1JvbGVzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxxREFVZ0M7QUFDaEMsNENBb0J1QjtBQUV2QixrQ0FBK0U7QUFHL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSDtJQU1FLCtCQUNFLE9BQWdDLEVBQ2hDLGFBQTRCLEVBQzVCLFVBQXNCLEVBQ3RCLGFBQXNDO1FBRXRDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNHLHNDQUFNLEdBQVosVUFDRSxJQUFZLEVBQ1osV0FBb0IsRUFDcEIsU0FBa0I7Ozs7OzRCQUVOLHFCQUFNLG9CQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFOzRCQUNoRSxJQUFJLE1BQUE7NEJBQ0osV0FBVyxhQUFBOzRCQUNYLFNBQVMsV0FBQTt5QkFDVixDQUFDLEVBQUE7O3dCQUpJLEdBQUcsR0FBRyxTQUlWO3dCQUNGLHNCQUFPLEdBQUcsQ0FBQyxVQUFVLEVBQUM7Ozs7S0FDdkI7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0csc0NBQU0sR0FBWixVQUFhLElBQVksRUFBRSxTQUFrQjs7Ozs7NEJBQ2QscUJBQU0sdUJBQVUsQ0FDM0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsSUFBSSxNQUFBOzRCQUNKLFNBQVMs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