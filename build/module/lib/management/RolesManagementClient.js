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
import { PolicyAssignmentTargetType, UdfTargetType } from '../../types/graphql.v2';
import { assignRole, addRole, roles, role, roleWithUsers, updateRole, revokeRole, deleteRole, deleteRoles, policyAssignments, addPolicyAssignments, removePolicyAssignments, listRoleAuthorizedResources, udv, udfValueBatch, setUdvBatch, setUdfValueBatch, removeUdv, roleWithUsersWithCustomData } from '../graphqlapi';
import { convertUdvToKeyValuePair, formatAuthorizedResources } from '../utils';
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
                    case 0: return [4 /*yield*/, addRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, deleteRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, deleteRoles(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, updateRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, role(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, roles(this.graphqlClient, this.tokenProvider, {
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
                        return [4 /*yield*/, roleWithUsers(this.graphqlClient, this.tokenProvider, {
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
                    case 2: return [4 /*yield*/, roleWithUsersWithCustomData(this.graphqlClient, this.tokenProvider, {
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
                            user.customData = convertUdvToKeyValuePair(user.customData);
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
                    case 0: return [4 /*yield*/, assignRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, revokeRole(this.graphqlClient, this.tokenProvider, {
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
                    case 0: return [4 /*yield*/, policyAssignments(this.graphqlClient, this.tokenProvider, {
                            targetType: PolicyAssignmentTargetType.Role,
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
                    case 0: return [4 /*yield*/, addPolicyAssignments(this.graphqlClient, this.tokenProvider, {
                            targetType: PolicyAssignmentTargetType.User,
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
                    case 0: return [4 /*yield*/, removePolicyAssignments(this.graphqlClient, this.tokenProvider, {
                            targetType: PolicyAssignmentTargetType.User,
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
                        return [4 /*yield*/, listRoleAuthorizedResources(this.graphqlClient, this.tokenProvider, {
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
     * 获取某个角色扩展字段列表
     * @param roleId 角色 ID
     * @returns Promise<{ [key: string]: any }>
     */
    RolesManagementClient.prototype.getUdfValue = function (roleId) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, udv(this.graphqlClient, this.tokenProvider, {
                            targetType: UdfTargetType.Role,
                            targetId: roleId
                        })];
                    case 1:
                        list = (_a.sent()).udv;
                        return [2 /*return*/, convertUdvToKeyValuePair(list)];
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
                    case 0: return [4 /*yield*/, udv(this.graphqlClient, this.tokenProvider, {
                            targetType: UdfTargetType.Role,
                            targetId: roleId
                        })];
                    case 1:
                        list = (_a.sent()).udv;
                        udfMap = convertUdvToKeyValuePair(list);
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
                        return [4 /*yield*/, udfValueBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.Role,
                                targetIds: roleIds
                            })];
                    case 1:
                        result = (_b.sent()).udfValueBatch;
                        ret = {};
                        for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                            _a = result_1[_i], targetId = _a.targetId, data = _a.data;
                            ret[targetId] = convertUdvToKeyValuePair(data);
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
                        return [4 /*yield*/, setUdvBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.Role,
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
                        return [4 /*yield*/, setUdfValueBatch(this.graphqlClient, this.tokenProvider, {
                                targetType: UdfTargetType.Role,
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
                    case 0: return [4 /*yield*/, removeUdv(this.graphqlClient, this.tokenProvider, {
                            targetType: UdfTargetType.Role,
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
export { RolesManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZXNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1JvbGVzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxPQUFPLEVBS0wsMEJBQTBCLEVBSTFCLGFBQWEsRUFDZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLEtBQUssRUFDTCxJQUFJLEVBQ0osYUFBYSxFQUNiLFVBQVUsRUFDVixVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QiwyQkFBMkIsRUFDM0IsR0FBRyxFQUNILGFBQWEsRUFDYixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCwyQkFBMkIsRUFDNUIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRy9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0g7SUFNRSwrQkFDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixVQUFzQixFQUN0QixhQUFzQztRQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDRyxzQ0FBTSxHQUFaLFVBQ0UsSUFBWSxFQUNaLFdBQW9CLEVBQ3BCLFNBQWtCOzs7Ozs0QkFFTixxQkFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFB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