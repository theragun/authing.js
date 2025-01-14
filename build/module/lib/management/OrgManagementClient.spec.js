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
import { ManagementClient } from './ManagementClient';
import { generateRandomString, getOptionsFromEnv } from '../testing-helper';
import test from 'ava';
import { ResourceType } from '../../types/graphql.v2';
var managementClient = new ManagementClient(getOptionsFromEnv());
test('通过 json 导入组织机构', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('添加成员', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
                        username: generateRandomString(),
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
test('create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, name, org;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString();
                name = generateRandomString();
                return [4 /*yield*/, managementClient.org.create(name, generateRandomString(), code)];
            case 1:
                org = _a.sent();
                t.assert(org.rootNode.code === code);
                t.assert(org.rootNode.name === name);
                t.assert(org.nodes.length === 1);
                return [2 /*return*/];
        }
    });
}); });
test('addNode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var org, rootNode, name, newNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.org.create(generateRandomString(), generateRandomString(), generateRandomString())];
            case 1:
                org = _a.sent();
                rootNode = org.rootNode;
                name = generateRandomString();
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
test('updateNode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var org, name, rootNode, newOrg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.org.create(generateRandomString(), generateRandomString(), generateRandomString())];
            case 1:
                org = _a.sent();
                name = generateRandomString();
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
test('findById', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var org;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.org.create(generateRandomString(), generateRandomString(), generateRandomString())];
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
test('listAuthorizedResourcesByNodeId', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.org.listAuthorizedResourcesByNodeId('603f4add1655b8d33f91a848', '6018bab016c246d458ef0ad2', {
                    resourceType: ResourceType.Data
                })];
            case 1:
                data = _a.sent();
                console.log(JSON.stringify(data, null, 4));
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
test('listAuthorizedResourcesByNodeCode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.org.listAuthorizedResourcesByNodeCode('603f4add8d7971d877feaa94', 'ou=devops,dc=example,dc=org', '6018bab016c246d458ef0ad2', {
                    resourceType: ResourceType.Data
                })];
            case 1:
                data = _a.sent();
                console.log(JSON.stringify(data, null, 4));
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
test.skip('startSync', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L09yZ01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RSxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7QUFFbkUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ3RCLElBQUksR0FBRztvQkFDWCxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFO3dCQUNSLEVBQUUsRUFBRSxxQ0FBcUM7d0JBQ3pDLEVBQUUsRUFBRSxvQkFBb0I7cUJBQ3pCO29CQUNELFdBQVcsRUFDVCw2RkFBNkY7b0JBQy9GLGVBQWUsRUFBRTt3QkFDZixFQUFFLEVBQ0EscVRBQXFUO3dCQUN2VCxFQUFFLEVBQ0EseUpBQXlKO3FCQUM1SjtvQkFDRCxLQUFLLEVBQUUsRUFBRTtvQkFDVCxRQUFRLEVBQUU7d0JBQ1I7NEJBQ0UsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsSUFBSSxFQUFFLElBQUk7NEJBQ1YsV0FBVyxFQUFFLE1BQU07NEJBQ25CLEtBQUssRUFBRSxFQUFFOzRCQUNULFFBQVEsRUFBRTtnQ0FDUjtvQ0FDRSxJQUFJLEVBQUUsU0FBUztvQ0FDZixJQUFJLEVBQUUsT0FBTztvQ0FDYixL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