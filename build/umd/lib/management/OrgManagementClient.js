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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
        define(["require", "exports", "../utils", "../graphqlapi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrgManagementClient = void 0;
    var utils_1 = __importStar(require("../utils"));
    var graphqlapi_1 = require("../graphqlapi");
    /**
     * @class OrgManagementClient 管理组织机构
     * @description 一个 Authing 用户池可以创建多个组织机构。此模块用于管理 Authing 组织机构，可以进行组织机构的增删改查、添加删除移动节点、导入组织机构等操作。
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
     * managementClient.org.list // 获取用户池组织机构列表
     * managementClient.org.moveNode // 获取组织机构详情
     * managementClient.org.listMembers // 获取节点用户列表
     * \`\`\`
     *
     * @name OrgManagementClient
     */
    var OrgManagementClient = /** @class */ (function () {
        function OrgManagementClient(options, graphqlClient, httpClient, tokenProvider) {
            this.options = options;
            this.httpClient = httpClient;
            this.graphqlClient = graphqlClient;
            this.tokenProvider = tokenProvider;
        }
        OrgManagementClient.prototype.buildTree = function (org) {
            org.tree = utils_1.default(JSON.parse(JSON.stringify(org.nodes)));
            return org;
        };
        /**
         * @name create
         * @name_zh 创建组织机构
         * @description 创建组织机构，会创建一个只有一个节点的组织机构。
         * 如果你想将一个完整的组织树导入进来，请使用 importByJson 方法。
         *
         * @param {string} name 组织机构名称，该名称会作为该组织机构根节点的名称。
         * @param {string} [description] 根节点描述
         * @param {string} [code] 根节点唯一标志，必须为合法的英文字符。
         *
         * @example
         *
         * const org = await managementClient.org.create('北京非凡科技', '北京非凡科技有限公司', 'feifan');
         *
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.create = function (name, description, code) {
            return __awaiter(this, void 0, void 0, function () {
                var org;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.createOrg(this.graphqlClient, this.tokenProvider, {
                                name: name,
                                description: description,
                                code: code
                            })];
                        case 1:
                            org = (_a.sent()).createOrg;
                            return [2 /*return*/, org];
                    }
                });
            });
        };
        /**
         * @name deleteById
         * @name_zh 删除组织机构
         * @description 删除组织机构树
         * @param {string} id 组织机构 ID
         *
         * @returns {Promise<CommonMessage>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.deleteById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.deleteOrg(this.graphqlClient, this.tokenProvider, {
                                id: id
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.deleteOrg];
                    }
                });
            });
        };
        /**
         * @name list
         * @name_zh 获取用户池组织机构列表
         * @description 获取用户池组织机构列表
         *
         * @param {number} [page=1]
         * @param {number} [limit=10]
         *
         * @example
         *
         * const { totalCount, list } = await managementClient.org.list()
         *
         * @returns
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.list = function (page, limit) {
            if (page === void 0) { page = 1; }
            if (limit === void 0) { limit = 10; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, list, totalCount;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.orgs(this.graphqlClient, this.tokenProvider, {
                                page: page,
                                limit: limit
                            })];
                        case 1:
                            _a = (_b.sent()).orgs, list = _a.list, totalCount = _a.totalCount;
                            return [2 /*return*/, {
                                    totalCount: totalCount,
                                    list: list.map(function (org) { return _this.buildTree(org); })
                                }];
                    }
                });
            });
        };
        /**
         * @name addNode
         * @name_zh 添加节点
         * @description 在组织机构中添加一个节点
         *
         * @param {string} orgId 组织机构 ID
         * @param {string} parentNodeId 父节点 ID
         * @param {Object} data 节点数据
         * @param {string} data.name 节点名称
         * @param {string} [data.code] 节点唯一标志
         * @param {string} [data.description] 节点描述信息
         *
         * @example
         *
         * const org = await managementClient.org.create('北京非凡科技', '北京非凡科技有限公司', 'feifan');
         * const { id: orgId, rootNode } = org
         * const newOrg = await managementClient.org.addNode(orgId, rootNode.id, { name: '运营部门' })
         *
         * // newOrg.nodes.length 现在为 2
         *
         * @returns {Promise<Node>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.addNode = function (orgId, parentNodeId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var name, code, order, nameI18n, description, descriptionI18n, node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = data.name, code = data.code, order = data.order, nameI18n = data.nameI18n, description = data.description, descriptionI18n = data.descriptionI18n;
                            return [4 /*yield*/, graphqlapi_1.addNode(this.graphqlClient, this.tokenProvider, {
                                    orgId: orgId,
                                    parentNodeId: parentNodeId,
                                    name: name,
                                    code: code,
                                    order: order,
                                    nameI18n: nameI18n,
                                    description: description,
                                    descriptionI18n: descriptionI18n
                                })];
                        case 1:
                            node = (_a.sent()).addNodeV2;
                            return [2 /*return*/, node];
                    }
                });
            });
        };
        /**
         * @name getNodeById
         * @name_zh 获取某个节点详情
         * @description 获取某个节点详情
         *
         * @param {string} nodeId 节点 ID
         *
         * @example
         *
         * const node = await managementClient.org.getNodeById('NODE_ID');
         *
         * // newOrg.nodes.length 现在为 2
         *
         * @returns {Promise<Node>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.getNodeById = function (nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.nodeById(this.graphqlClient, this.tokenProvider, {
                                id: nodeId
                            })];
                        case 1:
                            node = (_a.sent()).nodeById;
                            return [2 /*return*/, node];
                    }
                });
            });
        };
        /**
         * @name updateNode
         * @name_zh 修改节点
         * @description 修改节点数据
         *
         * @param {string} id 节点 ID
         * @param {Object} updates 修改数据
         * @param {string} [updates.name] 节点名称
         * @param {string} [updates.code] 节点唯一标志
         * @param {string} [updates.description] 节点描述信息
         *
         * @example
         *
         * await managementClient.org.updateNode("NDOEID", {
         *    name: '新的节点名称'
         * })
         *
         * @returns {Promise<Org>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.updateNode = function (id, updates) {
            return __awaiter(this, void 0, void 0, function () {
                var name, code, description, node;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = updates.name, code = updates.code, description = updates.description;
                            return [4 /*yield*/, graphqlapi_1.updateNode(this.graphqlClient, this.tokenProvider, {
                                    id: id,
                                    name: name,
                                    code: code,
                                    description: description
                                })];
                        case 1:
                            node = (_a.sent()).updateNode;
                            return [2 /*return*/, node];
                    }
                });
            });
        };
        /**
         * @name findById
         * @name_zh 获取组织机构详情
         * @description 通过组织机构 ID 获取组织机构详情
         *
         * @param {string} id 组织机构 ID
         *
         * @returns {Promise<Org>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.org(this.graphqlClient, this.tokenProvider, {
                                id: id
                            })];
                        case 1:
                            data = (_a.sent()).org;
                            return [2 /*return*/, this.buildTree(data)];
                    }
                });
            });
        };
        /**
         * @name deleteNode
         * @name_zh 删除节点
         * @description 删除组织机构树中的某一个节点
         *
         * @param {string} orgId 组织机构 ID
         * @param {string} nodeId 节点 ID
         *
         * @returns {Promise<CommonMessage>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.deleteNode = function (orgId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.deleteNode(this.graphqlClient, this.tokenProvider, {
                                orgId: orgId,
                                nodeId: nodeId
                            })];
                        case 1:
                            data = (_a.sent()).deleteNode;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name moveNode 移动节点
         * @name_zh 移动节点
         * @description 移动组织机构节点，移动某节点时需要指定该节点新的父节点。注意不能将一个节点移动到自己的子节点下面。
         *
         * @param {string} orgId 组织机构 ID
         * @param {string} nodeId 需要移动的节点 ID
         * @param {string} targetParentId 目标父节点 ID
         *
         * @example
         *
         * await managementClient.org.moveNode("ORGID", "NODEID", "TRAGET_NODE_ID")
         *
         * @returns {Promise<Org>} 最新的树结构
         * @memberof OrgManagementClient
         *
         */
        OrgManagementClient.prototype.moveNode = function (orgId, nodeId, targetParentId) {
            return __awaiter(this, void 0, void 0, function () {
                var org;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.moveNode(this.graphqlClient, this.tokenProvider, {
                                orgId: orgId,
                                nodeId: nodeId,
                                targetParentId: targetParentId
                            })];
                        case 1:
                            org = (_a.sent()).moveNode;
                            return [2 /*return*/, this.buildTree(org)];
                    }
                });
            });
        };
        /**
         * @name isRootNode
         * @name_zh 判断是否为根节点
         * @description 判断一个节点是不是组织树的根节点
         *
         * @param {string} orgId 组织机构 ID
         * @param {string} nodeId 组织机构 ID
         *
         *
         * @returns {Promise<boolean>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.isRootNode = function (orgId, nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.isRootNode(this.graphqlClient, this.tokenProvider, {
                                orgId: orgId,
                                nodeId: nodeId
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.isRootNode];
                    }
                });
            });
        };
        /**
         * @name listChildren
         * @name_zh 获取子节点列表
         * @description 查询一个节点的子节点列表
         *
         * @param {string} orgId 组织机构 ID
         * @param {string} nodeId 组织机构 ID
         *
         * @example
         *
         * // 子节点列表
         * cosnt children = await managementClient.org.moveNode("ORGID", "NODEID")
         *
         *
         * @returns {Promise<Node[]>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.listChildren = function (nodeId) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.getChildrenNodes(this.graphqlClient, this.tokenProvider, {
                                nodeId: nodeId
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.childrenNodes];
                    }
                });
            });
        };
        /**
         * @name rootNode
         * @name_zh 获取根节点
         * @description 获取一个组织的根节点
         *
         * @param {string} orgId 组织机构 ID
         *
         * @example
         *
         * const rootNode = await managementClient.org.rootNode("ORGID")
         *
         * @returns {Promise<Node[]>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.rootNode = function (orgId) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.rootNode(this.graphqlClient, this.tokenProvider, {
                                orgId: orgId
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.rootNode];
                    }
                });
            });
        };
        /**
         * @name importByJson
         * @name_zh 通过 JSON 导入
         * @description 通过一个 JSON 树结构导入组织机构
         *
         * @param {Object} json JSON 格式的树结构，详细格式请见示例代码。
         *
         * @example
         *
         * const tree = {
         *   name: '北京非凡科技有限公司',
         *   code: 'feifan',
         *   children: [
         *      {
         *          code: 'operation',
         *          name: '运营',
         *          description: '商业化部门'
         *       },
         *       {
         *         code: 'dev',
         *         name: '研发',
         *         description: '研发部门',
         *         children: [
         *           {
         *             code: 'backend',
         *             name: '后端',
         *             description: '后端研发部门'
         *           }
         *         ]
         *       }
         *     ]
         *   };
         * const org = await managementClient.org.importByJson(tree);
         *
         * @returns {Promise<Node[]>}
         * @memberof OrgManagementClient
         */
        OrgManagementClient.prototype.importByJson = function (json) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: this.options.host + "/api/v2/orgs/import",
                                data: {
                                    filetype: 'json',
                                    file: json
                                }
                            })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name addMembers
         * @name_zh 添加成功
         * @description 节点添加成员
         *
         * @param {string} nodeId 节点 ID
         * @param {string[]} userIds 用户 ID 列表
         *
         * @returns {Promise<PaginatedUsers>}
         * @memberof OrgManagementClient
         *
         */
        OrgManagementClient.prototype.addMembers = function (nodeId, userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.addMember(this.graphqlClient, this.tokenProvider, {
                                nodeId: nodeId,
                                userIds: userIds
                            })];
                        case 1:
                            data = (_a.sent()).addMember;
                            return [2 /*return*/, data.users];
                    }
                });
            });
        };
        OrgManagementClient.prototype.moveMembers = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.moveMembers(this.graphqlClient, this.tokenProvider, options)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @name listMembers
         * @name_zh 获取节点成员
         * @description 获取节点成员，可以获取直接添加到该节点中的用户，也可以获取到该节点子节点的用户。
         *
         * @param {string} nodeId 节点 ID
         * @param {Object} options 查询参数
         * @param {number} [options.page=1]
         * @param {number} [options.limit=10]
         * @param {boolean} [options.includeChildrenNodes=false] 是否获取所有子节点的成员
         *
         *
         * @returns {Promise<PaginatedUsers>}
         * @memberof OrgManagementClient
         *
         */
        OrgManagementClient.prototype.listMembers = function (nodeId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var nodeById;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.getMembersById(this.graphqlClient, this.tokenProvider, __assign({ id: nodeId }, options))];
                        case 1:
                            nodeById = (_a.sent()).nodeById;
                            return [2 /*return*/, nodeById.users];
                    }
                });
            });
        };
        /**
         * @name removeMembers
         * @name_zh 删除成功
         * @description 删除节点成员
         *
         * @param {string} nodeId 节点 ID
         * @param {string[]} userIds 用户 ID 列表
         *
         * @returns {Promise<PaginatedUsers>}
         * @memberof OrgManagementClient
         *
         */
        OrgManagementClient.prototype.removeMembers = function (nodeId, userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.removeMembers(this.graphqlClient, this.tokenProvider, {
                                nodeId: nodeId,
                                userIds: userIds
                            })];
                        case 1:
                            data = (_a.sent()).removeMember;
                            return [2 /*return*/, data.users];
                    }
                });
            });
        };
        /**
         * @name setMainDepartment
         * @name_zh 设置用户主部门
         * @description 设置用户主部门
         *
         * @param {string} userId 用户 ID
         * @param {string} departmentId 部门 ID
         *
         * @returns {Promise<PaginatedUsers>}
         * @memberof OrgManagementClient
         *
         */
        OrgManagementClient.prototype.setMainDepartment = function (userId, departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.setMainDepartment(this.graphqlClient, this.tokenProvider, {
                                userId: userId,
                                departmentId: departmentId
                            })];
                        case 1:
                            data = (_a.sent()).setMainDepartment;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @description 导出所有组织机构
         */
        OrgManagementClient.prototype.exportAll = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/orgs/export"
                            })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @description 导出某个组织机构
         */
        OrgManagementClient.prototype.exportByOrgId = function (orgId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/orgs/export?org_id=" + orgId
                            })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @description 获取组织机构节点被授权的所有资源
         *
         * @param nodeId: 分组 ID
         * @param namespace: 权限组 namespace code
         * @param options.resourceType 资源类型
         */
        OrgManagementClient.prototype.listAuthorizedResourcesByNodeId = function (nodeId, namespace, options) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceType, node, _a, list, totalCount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resourceType = (options || {}).resourceType;
                            return [4 /*yield*/, graphqlapi_1.listNodeByIdAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                    id: nodeId,
                                    namespace: namespace,
                                    resourceType: resourceType
                                })];
                        case 1:
                            node = (_b.sent()).nodeById;
                            if (!node) {
                                throw new Error('组织机构节点不存在');
                            }
                            _a = node.authorizedResources, list = _a.list, totalCount = _a.totalCount;
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
         * @description 获取组织机构节点被授权的所有资源
         *
         * @param orgId: 组织机构 ID；
         * @param code: 节点 code
         * @param namespace: 权限组 namespace code
         * @param options.resourceType 资源类型
         */
        OrgManagementClient.prototype.listAuthorizedResourcesByNodeCode = function (orgId, code, namespace, options) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceType, node, _a, list, totalCount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resourceType = (options || {}).resourceType;
                            return [4 /*yield*/, graphqlapi_1.listNodeByCodeAuthorizedResources(this.graphqlClient, this.tokenProvider, {
                                    orgId: orgId,
                                    code: code,
                                    namespace: namespace,
                                    resourceType: resourceType
                                })];
                        case 1:
                            node = (_b.sent()).nodeByCode;
                            if (!node) {
                                throw new Error('组织机构节点不存在');
                            }
                            _a = node.authorizedResources, list = _a.list, totalCount = _a.totalCount;
                            list = utils_1.formatAuthorizedResources(list);
                            return [2 /*return*/, {
                                    list: list,
                                    totalCount: totalCount
                                }];
                    }
                });
            });
        };
        OrgManagementClient.prototype.startSync = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var providerType, adConnectorId, url, body;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            providerType = options.providerType, adConnectorId = options.adConnectorId;
                            url = '';
                            body = {};
                            if (providerType === 'wechatwork') {
                                url = this.options.host + "/connections/enterprise/wechatwork/start-sync";
                            }
                            else if (providerType === 'dingtalk') {
                                url = this.options.host + "/connections/enterprise/dingtalk/start-sync";
                            }
                            else if (providerType === 'ad') {
                                if (!adConnectorId) {
                                    throw new Error('must provider adConnectorId');
                                }
                                url = this.options.host + "/api/v2/ad/sync";
                                body = {
                                    connectionId: adConnectorId
                                };
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: url,
                                    data: body
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @description 搜索组织机构节点
         *
         * @param keyword 查询关键词
         * @returns
         */
        OrgManagementClient.prototype.searchNodes = function (keyword) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.searchNodes(this.graphqlClient, this.tokenProvider, {
                                keyword: keyword
                            })];
                        case 1:
                            data = (_a.sent()).searchNodes;
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        return OrgManagementClient;
    }());
    exports.OrgManagementClient = OrgManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9PcmdNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdBLGdEQUFnRTtJQUNoRSw0Q0FxQnVCO0lBVXZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0g7UUFNRSw2QkFDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixVQUFzQixFQUN0QixhQUFzQztZQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNyQyxDQUFDO1FBRU8sdUNBQVMsR0FBakIsVUFBa0IsR0FBcUI7WUFDcEMsR0FBVyxDQUFDLElBQUksR0FBRyxlQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBUSxDQUFDLENBQUM7WUFDNUUsT0FBTyxHQUFrQixDQUFDO1FBQzVCLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRyxvQ0FBTSxHQUFaLFVBQWEsSUFBWSxFQUFFLFdBQW9CLEVBQUUsSUFBYTs7Ozs7Z0NBQ2pDLHFCQUFNLHNCQUFTLENBQ3hDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLElBQUksTUFBQTtnQ0FDSixXQUFXLGFBQUE7Z0NBQ1gsSUFBSSxNQUFBOzZCQUNMLENBQ0YsRUFBQTs7NEJBUmtCLEdBQUcsR0FBSyxDQUFBLFNBUTFCLENBQUEsVUFScUI7NEJBU3RCLHNCQUFPLEdBQUcsRUFBQzs7OztTQUNaO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDRyx3Q0FBVSxHQUFoQixVQUFpQixFQUFVOzs7OztnQ0FDYixxQkFBTSxzQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDbEUsRUFBRSxJQUFBOzZCQUNILENBQUMsRUFBQTs7NEJBRkksR0FBRyxHQUFHLFNBRVY7NEJBQ0Ysc0JBQU8sR0FBRyxDQUFDLFNBQVMsRUFBQzs7OztTQUN0QjtRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0csa0NBQUksR0FBVixVQUFXLElBQWdCLEVBQUUsS0FBa0I7WUFBcEMscUJBQUEsRUFBQSxRQUFnQjtZQUFFLHNCQUFBLEVBQUEsVUFBa0I7Ozs7OztnQ0FHekMscUJBQU0saUJBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0NBQ3JELElBQUksTUFBQTtnQ0FDSixLQUFLLE9BQUE7NkJBQ04sQ0FBQyxFQUFBOzs0QkFKQSxLQUNFLENBQUEsU0FHRixDQUFBLEtBSjBCLEVBQWxCLElBQUksVUFBQSxFQUFFLFVBQVUsZ0JBQUE7NEJBSzFCLHNCQUFPO29DQUNMLFVBQVUsWUFBQTtvQ0FDVixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQW5CLENBQW1CLENBQUM7aUNBQzNDLEVBQUM7Ozs7U0FDSDtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBc0JHO1FBQ0cscUNBQU8sR0FBYixVQUNFLEtBQWEsRUFDYixZQUFvQixFQUNwQixJQU9DOzs7Ozs7NEJBRU8sSUFBSSxHQUEwRCxJQUFJLEtBQTlELEVBQUUsSUFBSSxHQUFvRCxJQUFJLEtBQXhELEVBQUUsS0FBSyxHQUE2QyxJQUFJLE1BQWpELEVBQUUsUUFBUSxHQUFtQyxJQUFJLFNBQXZDLEVBQUUsV0FBVyxHQUFzQixJQUFJLFlBQTFCLEVBQUUsZUFBZSxHQUFLLElBQUksZ0JBQVQsQ0FBVTs0QkFDL0MscUJBQU0sb0JBQU8sQ0FDdkMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsS0FBSyxPQUFBO29DQUNMLFlBQVksY0FBQTtvQ0FDWixJQUFJLE1BQUE7b0NBQ0osSUFBSSxNQUFBO29DQUNKLEtBQUssT0FBQTtvQ0FDTCxRQUFRLFVBQUE7b0NBQ1IsV0FBVyxhQUFBO29DQUNYLGVBQWUsaUJBQUE7aUNBQ2hCLENBQ0YsRUFBQTs7NEJBYmtCLElBQUksR0FBSyxDQUFBLFNBYTNCLENBQUEsVUFic0I7NEJBY3ZCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0cseUNBQVcsR0FBakIsVUFBa0IsTUFBYzs7Ozs7Z0NBQ0gscUJBQU0scUJBQVEsQ0FDdkMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsRUFBRSxFQUFFLE1BQU07NkJBQ1gsQ0FDRixFQUFBOzs0QkFOaUIsSUFBSSxHQUFLLENBQUEsU0FNMUIsQ0FBQSxTQU5xQjs0QkFPdEIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1CRztRQUNHLHdDQUFVLEdBQWhCLFVBQ0UsRUFBVSxFQUNWLE9BT0M7Ozs7Ozs0QkFFTyxJQUFJLEdBQXdCLE9BQU8sS0FBL0IsRUFBRSxJQUFJLEdBQWtCLE9BQU8sS0FBekIsRUFBRSxXQUFXLEdBQUssT0FBTyxZQUFaLENBQWE7NEJBQ2YscUJBQU0sdUJBQVUsQ0FDM0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7b0NBQ0UsRUFBRSxJQUFBO29DQUNGLElBQUksTUFBQTtvQ0FDSixJQUFJLE1BQUE7b0NBQ0osV0FBVyxhQUFBO2lDQUNaLENBQ0YsRUFBQTs7NEJBVG1CLElBQUksR0FBSyxDQUFBLFNBUzVCLENBQUEsV0FUdUI7NEJBVXhCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0csc0NBQVEsR0FBZCxVQUFlLEVBQVU7Ozs7O2dDQUNELHFCQUFNLGdCQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUN0RSxFQUFFLElBQUE7NkJBQ0gsQ0FBQyxFQUFBOzs0QkFGVyxJQUFJLEdBQUssQ0FBQSxTQUVwQixDQUFBLElBRmU7NEJBR2pCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUM7Ozs7U0FDN0I7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0csd0NBQVUsR0FBaEIsVUFBaUIsS0FBYSxFQUFFLE1BQWM7Ozs7O2dDQUNmLHFCQUFNLHVCQUFVLENBQzNDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLEtBQUssT0FBQTtnQ0FDTCxNQUFNLFFBQUE7NkJBQ1AsQ0FDRixFQUFBOzs0QkFQbUIsSUFBSSxHQUFLLENBQUEsU0FPNUIsQ0FBQSxXQVB1Qjs0QkFReEIsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRztRQUNHLHNDQUFRLEdBQWQsVUFBZSxLQUFhLEVBQUUsTUFBYyxFQUFFLGNBQXNCOzs7OztnQ0FDeEMscUJBQU0scUJBQVEsQ0FDdEMsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsS0FBSyxPQUFBO2dDQUNMLE1BQU0sUUFBQTtnQ0FDTixjQUFjLGdCQUFBOzZCQUNmLENBQ0YsRUFBQTs7NEJBUmlCLEdBQUcsR0FBSyxDQUFBLFNBUXpCLENBQUEsU0FSb0I7NEJBU3JCLHNCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUM7Ozs7U0FDNUI7UUFFRDs7Ozs7Ozs7Ozs7V0FXRztRQUNHLHdDQUFVLEdBQWhCLFVBQWlCLEtBQWEsRUFBRSxNQUFjOzs7OztnQ0FDaEMscUJBQU0sdUJBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0NBQ25FLEtBQUssT0FBQTtnQ0FDTCxNQUFNLFFBQUE7NkJBQ1AsQ0FBQyxFQUFBOzs0QkFISSxHQUFHLEdBQUcsU0FHVjs0QkFDRixzQkFBTyxHQUFHLENBQUMsVUFBVSxFQUFDOzs7O1NBQ3ZCO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDRywwQ0FBWSxHQUFsQixVQUFtQixNQUFjOzs7OztnQ0FDbkIscUJBQU0sNkJBQWdCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dDQUN6RSxNQUFNLFFBQUE7NkJBQ1AsQ0FBQyxFQUFBOzs0QkFGSSxHQUFHLEdBQUcsU0FFVjs0QkFDRixzQkFBTyxHQUFHLENBQUMsYUFBYSxFQUFDOzs7O1NBQzFCO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLHNDQUFRLEdBQWQsVUFBZSxLQUFhOzs7OztnQ0FDZCxxQkFBTSxxQkFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDakUsS0FBSyxPQUFBOzZCQUNOLENBQUMsRUFBQTs7NEJBRkksR0FBRyxHQUFHLFNBRVY7NEJBQ0Ysc0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQzs7OztTQUNyQjtRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FvQ0c7UUFDRywwQ0FBWSxHQUFsQixVQUFtQixJQUEwQjs7Ozs7Z0NBQzlCLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUN6QyxNQUFNLEVBQUUsTUFBTTtnQ0FDZCxHQUFHLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHdCQUFxQjtnQ0FDOUMsSUFBSSxFQUFFO29DQUNKLFFBQVEsRUFBRSxNQUFNO29DQUNoQixJQUFJLEVBQUUsSUFBSTtpQ0FDWDs2QkFDRixDQUFDLEVBQUE7OzRCQVBJLElBQUksR0FBRyxTQU9YOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7O1dBV0c7UUFDRyx3Q0FBVSxHQUFoQixVQUFpQixNQUFjLEVBQUUsT0FBaUI7Ozs7O2dDQUNwQixxQkFBTSxzQkFBUyxDQUN6QyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxNQUFNLFFBQUE7Z0NBQ04sT0FBTyxTQUFBOzZCQUNSLENBQ0YsRUFBQTs7NEJBUGtCLElBQUksR0FBSyxDQUFBLFNBTzNCLENBQUEsVUFQc0I7NEJBUXZCLHNCQUFPLElBQUksQ0FBQyxLQUFLLEVBQUM7Ozs7U0FDbkI7UUFFWSx5Q0FBVyxHQUF4QixVQUF5QixPQUl4Qjs7OztnQ0FDQyxxQkFBTSx3QkFBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBQTs7NEJBQWxFLFNBQWtFLENBQUM7NEJBQ25FLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0cseUNBQVcsR0FBakIsVUFDRSxNQUFjLEVBQ2QsT0FJQzs7Ozs7Z0NBRW9CLHFCQUFNLDJCQUFjLENBQ3ZDLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLGFBRWhCLEVBQUUsRUFBRSxNQUFNLElBQ1AsT0FBTyxFQUViLEVBQUE7OzRCQVBPLFFBQVEsR0FBSyxDQUFBLFNBT3BCLENBQUEsU0FQZTs0QkFRaEIsc0JBQU8sUUFBUSxDQUFDLEtBQUssRUFBQzs7OztTQUN2QjtRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0csMkNBQWEsR0FBbkIsVUFDRSxNQUFjLEVBQ2QsT0FBaUI7Ozs7O2dDQUVjLHFCQUFNLDBCQUFhLENBQ2hELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLE1BQU0sUUFBQTtnQ0FDTixPQUFPLFNBQUE7NkJBQ1IsQ0FDRixFQUFBOzs0QkFQcUIsSUFBSSxHQUFLLENBQUEsU0FPOUIsQ0FBQSxhQVB5Qjs0QkFRMUIsc0JBQU8sSUFBSSxDQUFDLEtBQUssRUFBQzs7OztTQUNuQjtRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0csK0NBQWlCLEdBQXZCLFVBQ0UsTUFBYyxFQUNkLFlBQW9COzs7OztnQ0FFZ0IscUJBQU0sOEJBQWlCLENBQ3pELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLE1BQU0sUUFBQTtnQ0FDTixZQUFZLGNBQUE7NkJBQ2IsQ0FDRixFQUFBOzs0QkFQMEIsSUFBSSxHQUFLLENBQUEsU0FPbkMsQ0FBQSxrQkFQOEI7NEJBUS9CLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7O1dBRUc7UUFDVSx1Q0FBUyxHQUF0Qjs7Ozs7Z0NBQ2UscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQ3pDLE1BQU0sRUFBRSxLQUFLO2dDQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksd0JBQXFCOzZCQUMvQyxDQUFDLEVBQUE7OzRCQUhJLElBQUksR0FBRyxTQUdYOzRCQUNGLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBRUQ7O1dBRUc7UUFDVSwyQ0FBYSxHQUExQixVQUEyQixLQUFhOzs7OztnQ0FDekIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQ3pDLE1BQU0sRUFBRSxLQUFLO2dDQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksbUNBQThCLEtBQU87NkJBQy9ELENBQUMsRUFBQTs7NEJBSEksSUFBSSxHQUFHLFNBR1g7NEJBQ0Ysc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7O1dBTUc7UUFDVSw2REFBK0IsR0FBNUMsVUFDRSxNQUFjLEVBQ2QsU0FBaUIsRUFDakIsT0FFQzs7Ozs7OzRCQUVPLFlBQVksR0FBSyxDQUFBLE9BQU8sSUFBSSxFQUFFLENBQUEsYUFBbEIsQ0FBbUI7NEJBQ1oscUJBQU0sNENBQStCLENBQzlELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO29DQUNFLEVBQUUsRUFBRSxNQUFNO29DQUNWLFNBQVMsV0FBQTtvQ0FDVCxZQUFZLGNBQUE7aUNBQ2IsQ0FDRixFQUFBOzs0QkFSaUIsSUFBSSxHQUFLLENBQUEsU0FRMUIsQ0FBQSxTQVJxQjs0QkFTdEIsSUFBSSxDQUFDLElBQUksRUFBRTtnQ0FDVCxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUM5Qjs0QkFFQyxLQUNFLElBQUksb0JBRG1DLEVBQWxCLElBQUksVUFBQSxFQUFFLFVBQVUsZ0JBQUEsQ0FDaEM7NEJBQ1QsSUFBSSxHQUFHLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN2QyxzQkFBTztvQ0FDTCxJQUFJLE1BQUE7b0NBQ0osVUFBVSxZQUFBO2lDQUNYLEVBQUM7Ozs7U0FDSDtRQUVEOzs7Ozs7O1dBT0c7UUFDVSwrREFBaUMsR0FBOUMsVUFDRSxLQUFhLEVBQ2IsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLE9BRUM7Ozs7Ozs0QkFFTyxZQUFZLEdBQUssQ0FBQSxPQUFPLElBQUksRUFBRSxDQUFBLGFBQWxCLENBQW1COzRCQUNWLHFCQUFNLDhDQUFpQyxDQUNsRSxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtvQ0FDRSxLQUFLLE9BQUE7b0NBQ0wsSUFBSSxNQUFBO29DQUNKLFNBQVMsV0FBQTtvQ0FDVCxZQUFZLGNBQUE7aUNBQ2IsQ0FDRixFQUFBOzs0QkFUbUIsSUFBSSxHQUFLLENBQUEsU0FTNUIsQ0FBQSxXQVR1Qjs0QkFVeEIsSUFBSSxDQUFDLElBQUksRUFBRTtnQ0FDVCxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZCQUM5Qjs0QkFFQyxLQUNFLElBQUksb0JBRG1DLEVBQWxCLElBQUksVUFBQSxFQUFFLFVBQVUsZ0JBQUEsQ0FDaEM7NEJBQ1QsSUFBSSxHQUFHLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN2QyxzQkFBTztvQ0FDTCxJQUFJLE1BQUE7b0NBQ0osVUFBVSxZQUFBO2lDQUNYLEVBQUM7Ozs7U0FDSDtRQUVZLHVDQUFTLEdBQXRCLFVBQXVCLE9BR3RCOzs7Ozs7NEJBQ1MsWUFBWSxHQUFvQixPQUFPLGFBQTNCLEVBQUUsYUFBYSxHQUFLLE9BQU8sY0FBWixDQUFhOzRCQUM1QyxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNULElBQUksR0FBRyxFQUFFLENBQUM7NEJBQ2QsSUFBSSxZQUFZLEtBQUssWUFBWSxFQUFFO2dDQUNqQyxHQUFHLEdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGtEQUErQyxDQUFDOzZCQUMzRTtpQ0FBTSxJQUFJLFlBQVksS0FBSyxVQUFVLEVBQUU7Z0NBQ3RDLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksZ0RBQTZDLENBQUM7NkJBQ3pFO2lDQUFNLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtnQ0FDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQ0FDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2lDQUNoRDtnQ0FDRCxHQUFHLEdBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLG9CQUFpQixDQUFDO2dDQUM1QyxJQUFJLEdBQUc7b0NBQ0wsWUFBWSxFQUFFLGFBQWE7aUNBQzVCLENBQUM7NkJBQ0g7NEJBRUQscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQzVCLE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsS0FBQTtvQ0FDSCxJQUFJLEVBQUUsSUFBSTtpQ0FDWCxDQUFDLEVBQUE7OzRCQUpGLFNBSUUsQ0FBQzs0QkFFSCxzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7OztXQUtHO1FBQ1UseUNBQVcsR0FBeEIsVUFBeUIsT0FBZTs7Ozs7Z0NBQ1IscUJBQU0sd0JBQVcsQ0FDN0MsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsT0FBTyxTQUFBOzZCQUNSLENBQ0YsRUFBQTs7NEJBTm9CLElBQUksR0FBSyxDQUFBLFNBTTdCLENBQUEsWUFOd0I7NEJBT3pCLHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBQ0gsMEJBQUM7SUFBRCxDQUFDLEFBaHFCRCxJQWdxQkM7SUFocUJZLGtEQUFtQiJ9