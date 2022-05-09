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
exports.PoliciesManagementClient = void 0;
var graphqlapi_1 = require("../graphqlapi");
/**
 * @class PoliciesManagementClient 管理策略
 * @name PoliciesManagementClient
 * @description Authing 的访问控制与权限管理模型核心围绕着两个点来设计：**资源（Resource）**和**策略（Policy）**。策略定义了对某个（类）资源的某个（些）操作权限，将策略授权给用户（或角色），就能知道用户（或角色）是否具备对某个资源的某个操作具备操作权限。
 *
 * 此模块可以用于对策略进行增删改查，以及管理策略授权，策略可以被授予用户或角色。详细介绍请见 https://docs.authing.co/docs/access-control/index.html
 *
 * @example
 *
 * 请使用以下方式使用该模块：
 * \`\`\`javascript
 * import { ManagementClient } from "authing-js-sdk"
 * const managementClient = new ManagementClient({
 *    userPoolId: "YOUR_USERPOOL_ID",
 *    secret: "YOUR_USERPOOL_SECRET",
 * })
 * managementClient.policies.list // 获取策略列表
 * managementClient.policies.create // 创建策略
 * managementClient.policies.listUsers // 获取策略授权记录
 * \`\`\`
 *
 */
var PoliciesManagementClient = /** @class */ (function () {
    function PoliciesManagementClient(options, graphqlClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name create
     * @name_zh 添加策略
     * @description 添加策略
     *
     * @param {string} code 策略唯一标志
     * @param {PolicyStatement[]} 策略语句，详细格式与说明请见 https://docs.authing.co/docs/access-control/index.html
     * @param {string} [description] 描述
     *
     * @example
     *
     * import { PolicyEffect } from "authing-js-sdk"
     *
     * const statements = [
     *   {
     *     resource: 'books:123',
     *     effect: PolicyEffect.Allow,
     *     actions: ['books:edit']
     *   }
     * ];
     *
     * const policy = await managementClient.policies.create(code, statements);
     *
     * @returns {Promise<DeepPartial<Policy>>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.create = function (_a) {
        var code = _a.code, statements = _a.statements, description = _a.description, namespace = _a.namespace;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.createPolicy(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            statements: statements,
                            description: description,
                            namespace: namespace
                        })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.createPolicy];
                }
            });
        });
    };
    /**
     * @name delete
     * @name_zh 删除策略
     * @description 删除策略，系统内置策略由 Authing 官方维护，不能修改和删除。
     *
     * @example
     *
     * const { code, message } = await managementClient.policies.delete("CODE"); // 通过 code 是否为 200 判断操作是否成功
     *
     *
     * @param {string} code 策略唯一标志
     * @returns {Promise<CommonMessage>}
     * @memberof PoliciesManagementClient
     *
     */
    PoliciesManagementClient.prototype.delete = function (code, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deletePolicy(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            namespace: namespace
                        })];
                    case 1:
                        data = (_a.sent()).deletePolicy;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name deleteMany
     * @name_zh 批量删除策略
     * @description 批量删除策略，系统内置策略由 Authing 官方维护，不能修改和删除。
     *
     * @example
     *
     * const { code, message } = await managementClient.policies.deleteMany(["CODE"]); // 通过 code 是否为 200 判断操作是否成功
     *
     *
     * @param {string} codeList 策略唯一标志列表
     * @returns {Promise<CommonMessage>}
     * @memberof PoliciesManagementClient
     *
     */
    PoliciesManagementClient.prototype.deleteMany = function (codeList, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.deletePolicies(this.graphqlClient, this.tokenProvider, {
                            codeList: codeList,
                            namespace: namespace
                        })];
                    case 1:
                        data = (_a.sent()).deletePolicies;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name update
     * @name_zh 修改策略
     * @description 修改策略，系统内置策略由 Authing 官方维护，不能修改和删除。
     *
     * @param {string} code 策略唯一标志
     * @param {Object} updates
     * @param {string} [updates.description] 描述
     * @param {PolicyStatement[]} [updates.statements] 策略语句，详细格式与说明请见 https://docs.authing.co/docs/access-control/index.html
     * @param {string} [updates.newCode] 新的唯一标志，如果传入，需要保证其在用户池内是唯一的。
     *
     * @example
     *
     * const policy = await managementClient.policies.update('CODE', { newCode: 'NEWCODE' });
     *
     * @returns {Promise<DeepPartial<Policy>>}
     * @memberof PoliciesManagementClient
     *
     */
    PoliciesManagementClient.prototype.update = function (code, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var description, statements, newCode, namespace, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        description = updates.description, statements = updates.statements, newCode = updates.newCode, namespace = updates.namespace;
                        return [4 /*yield*/, graphqlapi_1.updatePolicy(this.graphqlClient, this.tokenProvider, {
                                code: code,
                                description: description,
                                statements: statements,
                                newCode: newCode,
                                namespace: namespace
                            })];
                    case 1:
                        data = (_a.sent()).updatePolicy;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name detail
     * @name_zh 获取策略详情
     * @description 获取策略详情
     *
     * @param {string} code 策略唯一标志
     *
     * const policy = await managementClient.policies.detail('CODE');
     *
     * @returns {Promise<DeepPartial<Policy>>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.detail = function (code, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.policy(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            namespace: namespace
                        })];
                    case 1:
                        data = (_a.sent()).policy;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name list
     * @name_zh 获取策略列表
     * @description 获取策略列表
     *
     * @param {Object} options
     * @param {number} [options.page=1]
     * @param {number} [options.limit=10]
     * @param {number} [options.namespace='default'] 所属权限组
     * @param {boolean} [options.excludeDefault=true] 是否排除系统默认资源
     *
     * @example
     *
     * const { list, totalCount } = await managementClient.policies.list({
     *   excludeDefault: false // 包含系统默认的策略
     * });
     *
     * @returns {Promise<DeepPartial<PaginatedPolicies>>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.list = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, _b, limit, namespace, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        options = options || {};
                        _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.limit, limit = _b === void 0 ? 10 : _b, namespace = options.namespace;
                        return [4 /*yield*/, graphqlapi_1.policies(this.graphqlClient, this.tokenProvider, {
                                page: page,
                                limit: limit,
                                namespace: namespace
                            })];
                    case 1:
                        data = (_c.sent()).policies;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name listAssignments
     * @name_zh 获取策略授权记录
     * @description 获取策略授权记录
     *
     * @param {string} code 策略唯一标志
     * @param {number} [page=1]
     * @param {number} [limit=10]
     *
     * @example
     *
     * const { totalCount, list } = await managementClient.policies.listAssignments("CODE");
     *
     * // list 数据示例
     *
     *[
     *  {
     *    code: "PolicyCode", // 策略唯一标志
     *    targetType: 'USER', // 'USER' 表示用户, 'ROLE' 表示角色
     *    targetIdentifier: '5f8812866795cc0026352fc5' // 用户 ID 或者角色 code
     *  },
     *  {
     *    code: "PolicyCode", // 策略唯一标志
     *    targetType: 'ROLE', // 'USER' 表示用户, 'ROLE' 表示角色
     *    targetIdentifier: 'ROLE_CODE' // 用户 ID 或者角色 code
     *  }
     *]
     *
     * @returns {Promise<PaginatedPolicyAssignments>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.listAssignments = function (_a) {
        var code = _a.code, namespace = _a.namespace, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.policyAssignments(this.graphqlClient, this.tokenProvider, {
                            code: code,
                            page: page,
                            limit: limit,
                            namespace: namespace
                        })];
                    case 1:
                        data = (_d.sent()).policyAssignments;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name addAssignments
     * @name_zh 添加策略授权
     * @description 添加策略授权，可以将策略授权给用户和角色，授权给角色的策略会被该角色下的所有用户继承 。此接口可以进行批量操作。
     *
     * @param {string[]} policies 策略 code 列表
     * @param {PolicyAssignmentTargetType} targetType 可选值为 USER (用户) 和 ROLE (角色)
     * @param {string[]} targetIdentifiers 用户 id 列表和角色 code 列表
     *
     * @example
     *
     * import { PolicyAssignmentTargetType } from "authing-js-sdk"
     *
     * await managementClient.policies.addAssignments(
     *   ["code1", "code2"],
     *   PolicyAssignmentTargetType.User,
     *   ['USERID']
     * );
     *
     * await managementClient.policies.addAssignments(
     *   ["code1", "code2"],
     *   PolicyAssignmentTargetType.Role,
     *   ['ROLE_CODE']
     * );
     *
     * @returns {Promise<CommonMessage>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.addAssignments = function (policies, targetType, targetIdentifiers, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, inheritByChildren, namespace, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = options || {}, inheritByChildren = _a.inheritByChildren, namespace = _a.namespace;
                        return [4 /*yield*/, graphqlapi_1.addPolicyAssignments(this.graphqlClient, this.tokenProvider, {
                                policies: policies,
                                targetType: targetType,
                                targetIdentifiers: targetIdentifiers,
                                inheritByChildren: inheritByChildren,
                                namespace: namespace
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res.addPolicyAssignments];
                }
            });
        });
    };
    /**
     * @name removeAssignments
     * @name_zh 撤销策略授权
     * @description 撤销策略授权，此接口可以进行批量操作。
     *
     * @param {string[]} policies 策略 code 列表
     * @param {PolicyAssignmentTargetType} targetType 可选值为 USER (用户) 和 ROLE (角色)
     * @param {string[]} targetIdentifiers 用户 id 列表和角色 code 列表
     *
     * @example
     *
     * import { PolicyAssignmentTargetType } from "authing-js-sdk"
     *
     * await managementClient.policies.removeAssignments(
     *   ["code1", "code2"],
     *   PolicyAssignmentTargetType.User,
     *   ['USERID']
     * );
     *
     * await managementClient.policies.removeAssignments(
     *   ["code1", "code2"],
     *   PolicyAssignmentTargetType.Role,
     *   ['ROLE_CODE']
     * );
     *
     * @returns {Promise<CommonMessage>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.removeAssignments = function (policies, targetType, targetIdentifiers, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.removePolicyAssignments(this.graphqlClient, this.tokenProvider, {
                            policies: policies,
                            targetType: targetType,
                            targetIdentifiers: targetIdentifiers,
                            namespace: namespace
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.removePolicyAssignments];
                }
            });
        });
    };
    /**
     * @name enableAssignment
     * @name_zh 设置策略授权状态为开启
     * @description 开启授权，处于未开启状态的策略授权不会生效
     *
     * @param {string} policy 策略 code
     * @param {PolicyAssignmentTargetType} targetType 可选值为 USER (用户), ROLE (角色), GROUP（分组）, ORG（组织机构）
     * @param {string} targetIdentifier 用户 id 、角色 code、分组 code、组织机构节点 ID
     *
     * @example
     *
     * import { PolicyAssignmentTargetType } from "authing-js-sdk"
     *
     * await managementClient.policies.enableAssignment(
     *   "code1",
     *   PolicyAssignmentTargetType.User,
     *   'USERID'
     * );
     *
     * @returns {Promise<CommonMessage>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.enableAssignment = function (policy, targetType, targetIdentifier, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.enablePolicyAssignment(this.graphqlClient, this.tokenProvider, {
                            policy: policy,
                            targetType: targetType,
                            targetIdentifier: targetIdentifier,
                            namespace: namespace
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.enablePolicyAssignment];
                }
            });
        });
    };
    /**
     * @name disableAssignment
     * @name_zh 设置策略授权状态为关闭
     * @description 关闭策略授权，处于未开启状态的策略授权不会生效
     *
     * @param {string} policy 策略 code
     * @param {PolicyAssignmentTargetType} targetType 可选值为 USER (用户), ROLE (角色), GROUP（分组）, ORG（组织机构）
     * @param {string} targetIdentifier 用户 id 、角色 code、分组 code、组织机构节点 ID
     *
     * @example
     *
     * import { PolicyAssignmentTargetType } from "authing-js-sdk"
     *
     * await managementClient.policies.disableAssignment(
     *   "code1",
     *   PolicyAssignmentTargetType.User,
     *   'USERID'
     * );
     *
     * @returns {Promise<CommonMessage>}
     * @memberof PoliciesManagementClient
     */
    PoliciesManagementClient.prototype.disableAssignment = function (policy, targetType, targetIdentifier, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, graphqlapi_1.disablePolicyAssignment(this.graphqlClient, this.tokenProvider, {
                            policy: policy,
                            targetType: targetType,
                            targetIdentifier: targetIdentifier,
                            namespace: namespace
                        })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.disbalePolicyAssignment];
                }
            });
        });
    };
    return PoliciesManagementClient;
}());
exports.PoliciesManagementClient = PoliciesManagementClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1BvbGljaWVzTWFuYWdlbWVudENsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSw0Q0FZdUI7QUFHdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNIO0lBS0Usa0NBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsYUFBc0M7UUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0cseUNBQU0sR0FBWixVQUFhLEVBVVo7WUFUQyxJQUFJLFVBQUEsRUFDSixVQUFVLGdCQUFBLEVBQ1YsV0FBVyxpQkFBQSxFQUNYLFNBQVMsZUFBQTs7Ozs7NEJBT0cscUJBQU0seUJBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ3JFLElBQUksTUFBQTs0QkFDSixVQUFVLFlBQUE7NEJBQ1YsV0FBVyxhQUFBOzRCQUNYLFNBQVMsV0FBQTt5QkFDVixDQUFDLEVBQUE7O3dCQUxJLEdBQUcsR0FBRyxTQUtWO3dCQUNGLHNCQUFPLEdBQUcsQ0FBQyxZQUFZLEVBQUM7Ozs7S0FDekI7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNHLHlDQUFNLEdBQVosVUFBYSxJQUFZLEVBQUUsU0FBa0I7Ozs7OzRCQUNaLHFCQUFNLHlCQUFZLENBQy9DLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCOzRCQUNFLElBQUksTUFBQTs0QkFDSixTQUFT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