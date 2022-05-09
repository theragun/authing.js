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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ManagementClient_1 = require("./ManagementClient");
var ava_1 = __importDefault(require("ava"));
var graphql_v2_1 = require("../../types/graphql.v2");
var testing_helper_1 = require("../testing-helper");
var types_1 = require("./types");
require('dotenv').config({
    path: '.env'
});
var APP_ID = '607543c1ec30828efb065adb';
var managementClient = new ManagementClient_1.ManagementClient({
    userPoolId: process.env.AUTHING_USERPOOL_ID,
    secret: process.env.AUTHING_USERPOOL_SECRET,
    host: process.env.AUTHING_HOST
});
var applications = managementClient.applications;
ava_1.default('list applications', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, list, totalCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, managementClient.applications.list()];
            case 1:
                _a = _b.sent(), list = _a.list, totalCount = _a.totalCount;
                console.log(list);
                t.assert(totalCount);
                t.assert(list.length);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('applications findById', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var list, application;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.applications.list()];
            case 1:
                list = (_a.sent()).list;
                return [4 /*yield*/, managementClient.applications.findById(list[0].id)];
            case 2:
                application = _a.sent();
                t.assert(application);
                t.assert(application.id);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.listResources(APP_ID)];
            case 1:
                res = _a.sent();
                t.assert(Array.isArray(res.list));
                t.assert(Reflect.has(res, 'totalCount'));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('创建资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, applications.createResource(APP_ID, {
                        code: code,
                        type: graphql_v2_1.ResourceType.Data,
                        description: 'chair',
                        actions: [
                            {
                                name: 'book:write',
                                description: '图书写入操作'
                            }
                        ]
                    })];
            case 1:
                res = _a.sent();
                t.assert(Reflect.has(res, 'id'));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, applications.createResource(APP_ID, {
                        code: code,
                        type: graphql_v2_1.ResourceType.Data,
                        description: 'chair',
                        actions: [
                            {
                                name: 'book:write',
                                description: '图书写入操作'
                            }
                        ]
                    })];
            case 1:
                res = _a.sent();
                t.assert(Reflect.has(res, 'id'));
                return [4 /*yield*/, applications.updateResource(APP_ID, {
                        code: code,
                        description: '新的描述',
                        type: graphql_v2_1.ResourceType.Api,
                        actions: [
                            { name: 'cardiovascular', description: '心血管的' },
                            { name: 'surge', description: '激增' }
                        ]
                    })];
            case 2:
                updated = _a.sent();
                t.assert(updated.id);
                t.assert(updated.actions[0].name === 'cardiovascular');
                t.assert(updated.actions[0].description === '心血管的');
                t.assert(updated.actions[1].name === 'surge');
                t.assert(updated.actions[1].description === '激增');
                t.assert(updated.description === '新的描述');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('删除资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, applications.createResource(APP_ID, {
                        code: code,
                        type: graphql_v2_1.ResourceType.Data,
                        description: 'chair',
                        actions: [
                            {
                                name: 'book:write',
                                description: '图书写入操作'
                            }
                        ]
                    })];
            case 1:
                res = _a.sent();
                t.assert(Reflect.has(res, 'id'));
                return [4 /*yield*/, applications.deleteResource(APP_ID, code)];
            case 2:
                deleted = _a.sent();
                t.assert(deleted);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('获取应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.getAccessPolicies(APP_ID)];
            case 1:
                list = _a.sent();
                t.assert(Array.isArray(list.list));
                t.assert(typeof list.totalCount === 'number');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, pwd, user, res, res2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = Math.random()
                    .toString(26)
                    .slice(2);
                pwd = '123456';
                return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, applications.allowAccess(APP_ID, {
                        targetType: 'USER',
                        targetIdentifiers: [user.id]
                    })];
            case 2:
                res = _a.sent();
                t.assert(res.code === 200);
                return [4 /*yield*/, applications.getAccessPolicies(APP_ID)];
            case 3:
                res2 = _a.sent();
                t.truthy(res2.list.find(function (v) { return v.targetIdentifier === user.id; }));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('启用应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, pwd, user, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = Math.random()
                    .toString(26)
                    .slice(2);
                pwd = '123456';
                return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, applications.allowAccess(APP_ID, {
                        targetType: 'USER',
                        targetIdentifiers: [user.id]
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, applications.enableAccessPolicy(APP_ID, {
                        targetType: 'USER',
                        targetIdentifiers: [user.id]
                    })];
            case 3:
                res = _a.sent();
                t.assert(res.code === 200);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, pwd, user, res, res2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = Math.random()
                    .toString(26)
                    .slice(2);
                pwd = '123456';
                return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, applications.denyAccess(APP_ID, {
                        targetType: 'USER',
                        targetIdentifiers: [user.id]
                    })];
            case 2:
                res = _a.sent();
                t.assert(res.code === 200);
                return [4 /*yield*/, applications.getAccessPolicies(APP_ID)];
            case 3:
                res2 = _a.sent();
                t.truthy(res2.list.find(function (v) { return v.targetIdentifier === user.id; }));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var res2, res3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.updateDefaultAccessPolicy(APP_ID, 'DENY_ALL')];
            case 1:
                res2 = _a.sent();
                t.assert(res2.permissionStrategy.defaultStrategy === 'DENY_ALL');
                return [4 /*yield*/, applications.updateDefaultAccessPolicy(APP_ID, 'ALLOW_ALL')];
            case 2:
                res3 = _a.sent();
                t.assert(res3.permissionStrategy.defaultStrategy === 'ALLOW_ALL');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('创建角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role, roleInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, {
                        code: code
                    })];
            case 1:
                role = _a.sent();
                return [4 /*yield*/, applications.findRole(APP_ID, code)];
            case 2:
                roleInfo = _a.sent();
                t.assert(role.code === roleInfo.code);
                t.assert(role.code === code);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('更新角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, description, role, newCode, roleUpdatedCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 1:
                _a.sent();
                description = testing_helper_1.generateRandomString(10);
                return [4 /*yield*/, applications.updateRole(APP_ID, {
                        code: code,
                        description: description
                    })];
            case 2:
                role = _a.sent();
                t.assert(role.description === description);
                newCode = testing_helper_1.generateRandomString();
                return [4 /*yield*/, applications.updateRole(APP_ID, {
                        code: code,
                        newCode: newCode,
                        description: description
                    })];
            case 3:
                roleUpdatedCode = _a.sent();
                t.assert(roleUpdatedCode.code === newCode);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('查询角色详情', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 1:
                _a.sent();
                return [4 /*yield*/, applications.findRole(APP_ID, code)];
            case 2:
                role = _a.sent();
                t.assert(role);
                t.assert(role.code === code);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('删除角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 1:
                _a.sent();
                return [4 /*yield*/, applications.deleteRole(APP_ID, code)];
            case 2:
                _a.sent();
                return [4 /*yield*/, applications.findRole(APP_ID, code)];
            case 3:
                role = _a.sent();
                t.assert(!role);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('批量删除角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var index, codes, code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                codes = [];
                _a.label = 1;
            case 1:
                if (!(index < 3)) return [3 /*break*/, 3];
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 2:
                _a.sent();
                codes.push();
                index++;
                return [3 /*break*/, 1];
            case 3: return [4 /*yield*/, applications.deleteRoles(APP_ID, codes)];
            case 4:
                role = _a.sent();
                t.assert(role.code === 200);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('查询空 Code 的角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.findRole(APP_ID, code)];
            case 1:
                role = _a.sent();
                t.assert(!role);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 1:
                _a.sent();
                return [4 /*yield*/, applications.listAuthorizedResourcesByRole(APP_ID, code, graphql_v2_1.ResourceType.Data)];
            case 2:
                data = _a.sent();
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('创建注册协议', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var title;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.createAgreement(APP_ID, {
                    title: 'A test agreement',
                    required: true
                })];
            case 1:
                title = (_a.sent()).title;
                t.assert(title === 'A test agreement');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('修改注册协议', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var id, title;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.createAgreement(APP_ID, {
                    title: 'test',
                    required: true
                })];
            case 1:
                id = (_a.sent()).id;
                return [4 /*yield*/, applications.modifyAgreement(APP_ID, id, {
                        title: 'new test'
                    })];
            case 2:
                title = (_a.sent()).title;
                t.assert(title === 'new test');
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('注册协议排序', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var prevOrder, newOrder, ordered;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(['name1', 'name2', 'name3', 'name4'].map(function (name) {
                    return applications.createAgreement(APP_ID, {
                        title: name,
                        required: true
                    });
                }))];
            case 1:
                _a.sent();
                return [4 /*yield*/, applications.listAgreement(APP_ID)];
            case 2:
                prevOrder = (_a.sent()).list.map(function (item) { return item.id; });
                newOrder = prevOrder.sort(function () { return (Math.random() > 0.5 ? 1 : -1); });
                return [4 /*yield*/, applications.sortAgreement(APP_ID, newOrder)];
            case 3:
                _a.sent();
                return [4 /*yield*/, applications.listAgreement(APP_ID)];
            case 4:
                ordered = (_a.sent()).list.map(function (item) { return item.id; });
                t.assert(newOrder.join('') === ordered.join(''));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial('删除注册协议和注册协议列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var id, oldLength, newLength;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.createAgreement(APP_ID, {
                    title: '要删除的',
                    required: true
                })];
            case 1:
                id = (_a.sent()).id;
                return [4 /*yield*/, applications.listAgreement(APP_ID)];
            case 2:
                oldLength = (_a.sent()).totalCount;
                return [4 /*yield*/, applications.deleteAgreement(APP_ID, id)];
            case 3:
                _a.sent();
                return [4 /*yield*/, applications.listAgreement(APP_ID)];
            case 4:
                newLength = (_a.sent()).totalCount;
                t.assert(oldLength - 1 === newLength);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('changeTenantConfig', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.changeApplicationType('6194a3c595908f00ff698d3a', types_1.ApplicationType.BOTH)];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result.appType === types_1.ApplicationType.BOTH);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('applicationTenants', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.applicationTenants('6194a3c595908f00ff698d3a')];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result.tenants);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0FwcGxpY2F0aW9uc01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUN0RCw0Q0FBdUI7QUFDdkIscURBQXNEO0FBQ3RELG9EQUF5RDtBQUN6RCxpQ0FBMEM7QUFFMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLEVBQUUsTUFBTTtDQUNiLENBQUMsQ0FBQztBQUVILElBQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0FBRTFDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQztJQUM1QyxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7SUFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCO0lBQzNDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0FBRW5ELGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ0YscUJBQU0sZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFBOztnQkFBakUsS0FBdUIsU0FBMEMsRUFBL0QsSUFBSSxVQUFBLEVBQUUsVUFBVSxnQkFBQTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDakIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7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