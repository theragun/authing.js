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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ManagementClient", "../testing-helper", "ava", "../../types/graphql.v2"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ManagementClient_1 = require("./ManagementClient");
    var testing_helper_1 = require("../testing-helper");
    var ava_1 = __importDefault(require("ava"));
    var graphql_v2_1 = require("../../types/graphql.v2");
    var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
    ava_1.default('通过 json 导入组织机构', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var tree, org, orgTree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tree = {
                        name: '北京非凡科技有限公司2',
                        code: 'feifan',
                        nameI18n: {
                            en: 'Beijing Feifan Technology Co., Ltd.',
                            ja: '北京フェイファンテクノロジー株式会社'
                        },
                        description: '我们打造以身份为中心的云原生操作系统，服务全球创意工作者。我们让用户控制自己的身份和数据，同时数据可以被重复利用。的应用程序数据泄漏变成过去式，并显着降低企业和开发者进入市场的成本。',
                        descriptionI18n: {
                            en: 'We build an identity-centric cloud-native operating system to serve global creative workers. We let users control their identity and data, and data can be reused. Of application data leakage becomes a thing of the past and significantly reduces the cost of entering the market for businesses and developers.',
                            ja: 'ID中心のクラウドネイティブオペレーティングシステムを構築して、グローバルなクリエイティブワーカーにサービスを提供しています。ユーザーが自分のIDとデータを制御できるようにし、データを再利用できます。アプリケーションのデータ漏洩は過去のものとなり、企業や開発者が市場に参入するコストを大幅に削減します。'
                        },
                        order: 10,
                        children: [
                            {
                                code: 'dev',
                                name: '研发',
                                description: '研发部门',
                                order: 40,
                                children: [
                                    {
                                        code: 'backend',
                                        name: '后端工程师',
                                        order: 30
                                    },
                                    {
                                        code: 'frontend',
                                        name: '前端工程师',
                                        order: 20
                                    },
                                    {
                                        code: 'devops',
                                        name: '运维工程师',
                                        order: 10
                                    }
                                ]
                            },
                            {
                                code: 'business',
                                name: '商业化',
                                description: '商业化部门',
                                order: 30
                            },
                            {
                                code: 'operation',
                                name: '运营',
                                description: '商业化部门',
                                order: 20
                            },
                            {
                                code: 'hr',
                                name: '人事',
                                description: '人事部门',
                                order: 10
                            }
                        ]
                    };
                    return [4 /*yield*/, managementClient.org.importByJson(tree)];
                case 1:
                    org = _a.sent();
                    t.assert(org);
                    return [4 /*yield*/, managementClient.org.findById(org.id)];
                case 2:
                    orgTree = _a.sent();
                    t.assert(orgTree.id);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('添加成员', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var tree, org, orgTree, user, rootNode, _a, totalCount, list;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tree = {
                        name: '北京非凡科技有限公司',
                        code: 'feifan',
                        order: 10,
                        children: [
                            {
                                code: 'operation',
                                name: '运营',
                                description: '商业化部门'
                            },
                            {
                                code: 'dev',
                                name: '研发',
                                description: '研发部门',
                                children: [
                                    {
                                        code: 'backend',
                                        name: '后端',
                                        description: '后端研发部门'
                                    }
                                ]
                            }
                        ]
                    };
                    return [4 /*yield*/, managementClient.org.importByJson(tree)];
                case 1:
                    org = _b.sent();
                    t.assert(org);
                    return [4 /*yield*/, managementClient.org.findById(org.id)];
                case 2:
                    orgTree = _b.sent();
                    t.assert(orgTree.id);
                    return [4 /*yield*/, managementClient.users.create({
                            username: testing_helper_1.generateRandomString(),
                            password: '123456'
                        })];
                case 3:
                    user = _b.sent();
                    rootNode = orgTree.rootNode;
                    return [4 /*yield*/, managementClient.org.addMembers(rootNode.id, [user.id])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, managementClient.org.listMembers(rootNode.id)];
                case 5:
                    _a = _b.sent(), totalCount = _a.totalCount, list = _a.list;
                    t.assert(totalCount === 1);
                    t.assert(list.length === 1);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, name, org;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString();
                    name = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.org.create(name, testing_helper_1.generateRandomString(), code)];
                case 1:
                    org = _a.sent();
                    t.assert(org.rootNode.code === code);
                    t.assert(org.rootNode.name === name);
                    t.assert(org.nodes.length === 1);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('addNode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var org, rootNode, name, newNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.org.create(testing_helper_1.generateRandomString(), testing_helper_1.generateRandomString(), testing_helper_1.generateRandomString())];
                case 1:
                    org = _a.sent();
                    rootNode = org.rootNode;
                    name = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.org.addNode(org.id, rootNode.id, {
                            name: name
                        })];
                case 2:
                    newNode = _a.sent();
                    t.assert(newNode.name === name);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('updateNode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var org, name, rootNode, newOrg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.org.create(testing_helper_1.generateRandomString(), testing_helper_1.generateRandomString(), testing_helper_1.generateRandomString())];
                case 1:
                    org = _a.sent();
                    name = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.org.updateNode(org.rootNode.id, {
                            name: name
                        })];
                case 2:
                    rootNode = _a.sent();
                    t.assert(rootNode.name === name);
                    return [4 /*yield*/, managementClient.org.findById(org.id)];
                case 3:
                    newOrg = _a.sent();
                    t.assert(newOrg.rootNode.name == name);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('findById', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var org;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.org.create(testing_helper_1.generateRandomString(), testing_helper_1.generateRandomString(), testing_helper_1.generateRandomString())];
                case 1:
                    org = _a.sent();
                    return [4 /*yield*/, managementClient.org.findById(org.id)];
                case 2:
                    org = _a.sent();
                    t.assert(org);
                    t.assert(org.rootNode);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('listAuthorizedResourcesByNodeId', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.org.listAuthorizedResourcesByNodeId('603f4add1655b8d33f91a848', '6018bab016c246d458ef0ad2', {
                        resourceType: graphql_v2_1.ResourceType.Data
                    })];
                case 1:
                    data = _a.sent();
                    console.log(JSON.stringify(data, null, 4));
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('listAuthorizedResourcesByNodeCode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.org.listAuthorizedResourcesByNodeCode('603f4add8d7971d877feaa94', 'ou=devops,dc=example,dc=org', '6018bab016c246d458ef0ad2', {
                        resourceType: graphql_v2_1.ResourceType.Data
                    })];
                case 1:
                    data = _a.sent();
                    console.log(JSON.stringify(data, null, 4));
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('startSync', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.org.startSync({
                        providerType: 'ad',
                        adConnectorId: '609650fca1069b3f9908a82e'
                    })];
                case 1:
                    data = _a.sent();
                    console.log(data);
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L09yZ01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVEQUFzRDtJQUN0RCxvREFBNEU7SUFDNUUsNENBQXVCO0lBQ3ZCLHFEQUFzRDtJQUV0RCxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBRW5FLGFBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFNLENBQUM7Ozs7O29CQUN0QixJQUFJLEdBQUc7d0JBQ1gsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLElBQUksRUFBRSxRQUFRO3dCQUNkLFFBQVEsRUFBRTs0QkFDUixFQUFFLEVBQUUscUNBQXFDOzRCQUN6QyxFQUFFLEVBQUUsb0JBQW9CO3lCQUN6Qjt3QkFDRCxXQUFXLEVBQ1QsNkZBQTZGO3dCQUMvRixlQUFlLEVBQUU7NEJBQ2YsRUFBRSxFQUNBLHFUQUFxVDs0QkFDdlQsRUFBRSxFQUNBLHlKQUF5Sjt5QkFDNUo7d0JBQ0QsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsUUFBUSxFQUFFOzRCQUNSO2dDQUNFLElBQUksRUFBRSxLQUFLO2dDQUNYLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxNQUFNO2dDQUNuQixLQUFLLEVBQUUsRUFBRTtnQ0FDVCxRQUFRLEVBQUU7b0NBQ1I7d0NBQ0UsSUFBSSxFQUFFLFNBQVM7d0NBQ2YsSUFBSSxFQUFFLE9BQU87d0NBQ2IsS0FBSyxFQUFFLEVBQUU7cUNBQ1Y7b0NBQ0Q7d0NBQ0UsSUFBSSxFQUFFLFVBQVU7d0NBQ2hCLElBQUksRUFBRSxPQUFPO3dDQUNiLEtBQUssRUFBRSxFQUFFO3FDQUNWO29DQUNEO3dDQUNFLElB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