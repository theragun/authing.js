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
import { addUserToGroup, createGroup, deleteGroups, getGroups, group, groupWithUsers, groupWithUsersWithCustomData, listGroupAuthorizedResources, removeUserFromGroup, updateGroup } from '../graphqlapi';
import { convertUdvToKeyValuePair, formatAuthorizedResources } from '../utils';
/**
 * @class GroupsManagementClient 管理分组
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
 * managementClient.groups.list // 获取分组列表
 * managementClient.groups.create // 创建分组
 * managementClient.groups.listUsers // 获取分组用户列表
 * \`\`\`
 *
 * @name GroupsManagementClient
 */
var GroupsManagementClient = /** @class */ (function () {
    function GroupsManagementClient(options, graphqlClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name create
     * @name_zh 创建分组
     * @description 创建分组
     *
     * @param {string} code 分组唯一标志符
     * @param {string} name 分组名称
     * @param {string} [description] 描述
     *
     * @example
     * managementClient.groups.create('group', '分组 xxx')
     *
     * @returns {Promise<DeepPartial<Group>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.create = function (code, name, description) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createGroup(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            name: name,
                            description: description
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.createGroup];
                }
            });
        });
    };
    /**
     * @name delete
     * @name_zh 删除分组
     * @description 删除分组
     *
     * @param {string} code 分组唯一标志符
     *
     * @example
     * managementClient.groups.delete('rolea')
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.delete = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deleteGroups(this.graphqlClient, this.tokenProvider, {
                            codeList: [code]
                        })];
                    case 1:
                        data = (_a.sent()).deleteGroups;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name update
     * @name_zh 修改分组
     * @description 修改分组
     *
     * @param {string} code 分组唯一标志符
     * @param {Object} input
     * @param {string} [input.name] 新的名称
     * @param {string} [input.description] 新的描述信息
     * @param {string} [input.newCode] 新的唯一标志符
     *
     * @example
     * managementClient.groups.update('group', {newCode: 'newcode'})
     *
     *
     * @returns {Promise<DeepPartial<Group>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.update = function (code, input) {
        return __awaiter(this, void 0, void 0, function () {
            var description, newCode, name, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = input.description, newCode = input.newCode, name = input.name;
                        return [4 /*yield*/, updateGroup(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                name: name,
                                description: description,
                                newCode: newCode
                            })];
                    case 1:
                        data = (_a.sent()).updateGroup;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name detail
     * @name_zh 获取分组详情
     * @description 获取分组详情
     *
     * @param {string} code 分组唯一标志符
     *
     * @example
     * managementClient.groups.detail('manager')
     *
     * @returns {Promise<DeepPartial<Group>>} 分组详情
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.detail = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, group(this.graphqlClient, this.tokenProvider, {
                            code: code
                        })];
                    case 1:
                        data = (_a.sent()).group;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name list
     * @name_zh 获取分组列表
     * @description 获取分组列表
     *
     * @param {number} [page=1] 页码数
     * @param {number} [limit=10] 每页个数
     *
     * @example
     *
     * managementClient.groups.list(1, 10)
     *
     * @returns {Promise<DeepPartial<PaginatedGroups>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.list = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getGroups(this.graphqlClient, this.tokenProvider, {
                            page: page,
                            limit: limit
                        })];
                    case 1:
                        data = (_a.sent()).groups;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name deleteMany
     * @name_zh 批量删除分组
     * @description 批量删除分组
     *
     * @param {string[]} codeList 分组唯一标志符列表
     *
     * @example
     * managementClient.groups.deleteMany(['groupa', 'groupb'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.deleteMany = function (codeList) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, deleteGroups(this.graphqlClient, this.tokenProvider, {
                            codeList: codeList
                        })];
                    case 1:
                        data = (_a.sent()).deleteGroups;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name listUsers
     * @name_zh 获取分组用户列表
     * @description 获取分组用户列表
     * @param {string} code 分组唯一标志符
     * @param {number} [page=1] 页码数
     * @param {number} [limit=10] 每页个数
     *
     * @example
     *
     * managementClient.groups.listUsers(code)
     *
     * @returns {Promise<DeepPartial<PaginatedUsers>>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.listUsers = function (code, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, withCustomData, _c, page, _d, limit, data, data, _e, totalCount, list;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = options || {}, _b = _a.withCustomData, withCustomData = _b === void 0 ? false : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.limit, limit = _d === void 0 ? 10 : _d;
                        if (!!withCustomData) return [3 /*break*/, 2];
                        return [4 /*yield*/, groupWithUsers(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                page: page,
                                limit: limit
                            })];
                    case 1:
                        data = (_f.sent()).group;
                        return [2 /*return*/, data.users];
                    case 2: return [4 /*yield*/, groupWithUsersWithCustomData(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            page: page,
                            limit: limit
                        })];
                    case 3:
                        data = (_f.sent()).group;
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
     * @name addUsers
     * @name_zh 添加用户
     * @description 添加用户
     *
     * @param {string} code 分组唯一标志符
     * @param {string[]} userIds 用户 ID 列表
     *
     * @example
     * managementClient.groups.addUsers(code, ['USERID1', 'USERID2'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.addUsers = function (code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, addUserToGroup(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            userIds: userIds
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.addUserToGroup];
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
     * @param {string} code 分组唯一标志符
     * @param {string[]} userIds 用户 ID 列表
     * @example
     * managementClient.groups.removeUsers(code, ['USERID1', 'USERID2'])
     *
     * @returns {Promise<CommonMessage>}
     * @memberof GroupsManagementClient
     */
    GroupsManagementClient.prototype.removeUsers = function (code, userIds) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, removeUserFromGroup(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            userIds: userIds
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.removeUserFromGroup];
                }
            });
        });
    };
    /**
     * @description 获取分组被授权的所有资源
     *
     * @param code: 分组 code
     * @param namespace: 权限组 namespace code
     * @param options.resourceType 资源类型
     */
    GroupsManagementClient.prototype.listAuthorizedResources = function (code, namespace, options) {
        return __awaiter(this, void 0, void 0, function () {
            var resourceType, group, _a, list, totalCount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resourceType = (options || {}).resourceType;
                        return [4 /*yield*/, listGroupAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                namespace: namespace,
                                resourceType: resourceType
                            })];
                    case 1:
                        group = (_b.sent()).group;
                        if (!group) {
                            throw new Error('分组不存在');
                        }
                        _a = group.authorizedResources, list = _a.list, totalCount = _a.totalCount;
                        list = formatAuthorizedResources(list);
                        return [2 /*return*/, {
                                list: list,
                                totalCount: totalCount
                            }];
                }
            });
        });
    };
    return GroupsManagementClient;
}());
export { GroupsManagementClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBzTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9Hcm91cHNNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLE9BQU8sRUFDTCxjQUFjLEVBQ2QsV0FBVyxFQUNYLFlBQVksRUFDWixTQUFTLEVBQ1QsS0FBSyxFQUNMLGNBQWMsRUFDZCw0QkFBNEIsRUFDNUIsNEJBQTRCLEVBQzVCLG1CQUFtQixFQUNuQixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRS9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0g7SUFLRSxnQ0FDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixhQUFzQztRQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDRyx1Q0FBTSxHQUFaLFVBQ0UsSUFBWSxFQUNaLElBQVksRUFDWixXQUFvQjs7Ozs7NEJBRVIscUJBQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTs0QkFDcEUsSUFBSSxNQUFBOzRCQUNKLElBQUksTUFBQTs0QkFDSixXQUFXLGFBQUE7eUJBQ1osQ0FBQyxFQUFBOzt3QkFKSSxHQUFHLEdBQUcsU0FJVjt3QkFDRixzQkFBTyxHQUFHLENBQUMsV0FBVyxFQUFDOzs7O0tBQ3hCO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0csdUNBQU0sR0FBWixVQUFhLElBQVk7Ozs7OzRCQUNRLHFCQUFNLFlBQVksQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDO3lCQUNqQixDQUNGLEVBQUE7O3dCQU5xQixJQUFJLEdBQUssQ0FBQSxTQU05QixDQUFBLGFBTnlCO3dCQU8xQixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNHLHVDQUFNLEdBQVosVUFDRSxJQUFZLEVBQ1osS0FJQzs7Ozs7O3dCQUVPLFdBQVcsR0FBb0IsS0FBSyxZQUF6QixFQUFFLE9BQU8sR0FBVyxLQUFLLFFBQWhCLEVBQUUsSUFBSSxHQUFLLEtBQUssS0FBVixDQUFXO3dCQUNmLHFCQUFNLFdBQVcsQ0FDN0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsSUFBSSxNQUFBO2dDQUNKLElBQUksTUFBQTtnQ0FDSixXQUFXLGFBQUE7Z0NBQ1gsT0FBTyxTQUFBOzZCQUNSLENBQ0YsRUFBQTs7d0JBVG9CLElBQUksR0FBSyxDQUFBLFNBUzdCLENBQUEsWUFUd0I7d0JBVXpCLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0csdUNBQU0sR0FBWixVQUFhLElBQVk7Ozs7OzRCQUNDLHFCQUFNLEtBQUssQ0FDakMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsSUFBSSxNQUFBO3lCQUNMLENBQ0YsRUFBQTs7d0JBTmMsSUFBSSxHQUFLLENBQUEsU0FNdkIsQ0FBQSxNQU5rQjt3QkFPbkIsc0JBQU8sSUFBSSxFQUFDOzs7O0tBQ2I7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNHLHFDQUFJLEdBQVYsVUFDRSxJQUFnQixFQUNoQixLQUFrQjtRQURsQixxQkFBQSxFQUFBLFFBQWdCO1FBQ2hCLHNCQUFBLEVBQUEsVUFBa0I7Ozs7OzRCQUVPLHFCQUFNLFNBQVMsQ0FDdEMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsSUFBSSxNQUFBOzRCQUNKLEtBQUssT0FBQTt5QkFDTixDQUNGLEVBQUE7O3dCQVBlLElBQUksR0FBSyxDQUFBLFNBT3hCLENBQUEsT0FQbUI7d0JBUXBCLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0csMkNBQVUsR0FBaEIsVUFBaUIsUUFBa0I7Ozs7OzRCQUNGLHFCQUFNLFlBQVksQ0FDL0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsUUFBUSxVQUFBO3lCQUNULENBQ0YsRUFBQTs7d0JBTnFCLElBQUksR0FBSyxDQUFBLFNBTTlCLENBQUEsYUFOeUI7d0JBTzFCLHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDRywwQ0FBUyxHQUFmLFVBQ0UsSUFBWSxFQUNaLE9BSUM7Ozs7Ozt3QkFFSyxLQUFtRCxPQUFPLElBQUksRUFBRSxFQUE5RCxzQkFBc0IsRUFBdEIsY0FBYyxtQkFBRyxLQUFLLEtBQUEsRUFBRSxZQUFRLEVBQVIsSUFBSSxtQkFBRyxDQUFDLEtBQUEsRUFBRSxhQUFVLEVBQVYsS0FBSyxtQkFBRyxFQUFFLEtBQUEsQ0FBbUI7NkJBQ25FLENBQUMsY0FBYyxFQUFmLHdCQUFlO3dCQUNPLHFCQUFNLGNBQWMsQ0FDMUMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsSUFBSSxNQUFBO2dDQUNKLElBQUksTUFBQTtnQ0FDSixLQUFLLE9BQUE7NkJBQ04sQ0FDRixFQUFBOzt3QkFSYyxJQUFJLEdBQUssQ0FBQSxTQVF2QixDQUFBLE1BUmtCO3dCQVNuQixzQkFBTyxJQUFJLENBQUMsS0FBSyxFQUFDOzRCQUVNLHFCQUFNLDRCQUE0QixDQUN4RCxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjs0QkFDRSxJQUFJLE1BQUE7NEJBQ0osSUFBSSxNQUFBOzRCQUNKLEtBQUssT0FBQTt5QkFDTixDQUNGLEVBQUE7O3dCQVJjLElBQUksR0FBSyxDQUFBLFNBUXZCLENBQUEsTUFSa0I7d0JBU2YsS0FBdUIsSUFBSSxDQUFDLEtBQUssRUFBL0IsVUFBVSxnQkFBQSxFQUFFLElBQUksVUFBQSxDQUFnQjt3QkFDdEMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJOzRCQUNsQixhQUFhOzRCQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUM1RCxPQUFPLElBQUksQ0FBQzt3QkFDZCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxzQkFBTztnQ0FDTCxVQUFVLFlBQUE7Z0NBQ1YsYUFBYTtnQ0FDYixJQUFJLE1BQUE7NkJBQ0wsRUFBQzs7OztLQUVMO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNHLHlDQUFRLEdBQWQsVUFBZSxJQUFZLEVBQUUsT0FBaUI7Ozs7OzRCQUNoQyxxQkFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFOzRCQUN2RSxJQUFJLE1BQUE7NEJBQ0osT0FBTyxTQUFBO3lCQUNSLENBQUMsRUFBQTs7d0JBSEksR0FBRyxHQUFHLFNBR1Y7d0JBQ0Ysc0JBQU8sR0FBRyxDQUFDLGNBQWMsRUFBQzs7OztLQUMzQjtJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDRyw0Q0FBVyxHQUFqQixVQUFrQixJQUFZLEVBQUUsT0FBaUI7Ozs7OzRCQUNuQyxxQkFBTSxtQkFBbUIsQ0FDbkMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7NEJBQ0UsSUFBSSxNQUFBOzRCQUNKLE9BQU8sU0FBQTt5QkFDUixDQUNGLEVBQUE7O3dCQVBLLEdBQUcsR0FBRyxTQU9YO3dCQUNELHNCQUFPLEdBQUcsQ0FBQyxtQkFBbUIsRUFBQzs7OztLQUNoQztJQUVEOzs7Ozs7T0FNRztJQUNVLHdEQUF1QixHQUFwQyxVQUNFLElBQVksRUFDWixTQUFpQixFQUNqQixPQUVDOzs7Ozs7d0JBRU8sWUFBWSxHQUFLLENBQUEsT0FBTyxJQUFJLEVBQUUsQ0FBQSxhQUFsQixDQUFtQjt3QkFDckIscUJBQU0sNEJBQTRCLENBQ2xELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLElBQUksTUFBQTtnQ0FDSixTQUFTLFdBQUE7Z0NBQ1QsWUFBWSxjQUFBOzZCQUNiLENBQ0YsRUFBQTs7d0JBUk8sS0FBSyxHQUFLLENBQUEsU0FRakIsQ0FBQSxNQVJZO3dCQVNiLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDMUI7d0JBRUMsS0FDRSxLQUFLLG9CQURrQyxFQUFsQixJQUFJLFVBQUEsRUFBRSxVQUFVLGdCQUFBLENBQy9CO3dCQUNWLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdkMsc0JBQU87Z0NBQ0wsSUFBSSxNQUFBO2dDQUNKLFVBQVUsWUFBQTs2QkFDWCxFQUFDOzs7O0tBQ0g7SUFDSCw2QkFBQztBQUFELENBQUMsQUF4VUQsSUF3VUMifQ==