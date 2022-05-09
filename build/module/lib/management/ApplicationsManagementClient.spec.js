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
import test from 'ava';
import { ResourceType } from '../../types/graphql.v2';
import { generateRandomString } from '../testing-helper';
import { ApplicationType } from './types';
require('dotenv').config({
    path: '.env'
});
var APP_ID = '607543c1ec30828efb065adb';
var managementClient = new ManagementClient({
    userPoolId: process.env.AUTHING_USERPOOL_ID,
    secret: process.env.AUTHING_USERPOOL_SECRET,
    host: process.env.AUTHING_HOST
});
var applications = managementClient.applications;
test('list applications', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('applications findById', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('创建资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, applications.createResource(APP_ID, {
                        code: code,
                        type: ResourceType.Data,
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
test('修改资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, applications.createResource(APP_ID, {
                        code: code,
                        type: ResourceType.Data,
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
                        type: ResourceType.Api,
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
test('删除资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, applications.createResource(APP_ID, {
                        code: code,
                        type: ResourceType.Data,
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
test('获取应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('启用应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('创建角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role, roleInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
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
test('更新角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, description, role, newCode, roleUpdatedCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 1:
                _a.sent();
                description = generateRandomString(10);
                return [4 /*yield*/, applications.updateRole(APP_ID, {
                        code: code,
                        description: description
                    })];
            case 2:
                role = _a.sent();
                t.assert(role.description === description);
                newCode = generateRandomString();
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
test('查询角色详情', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
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
test('删除角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
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
test('批量删除角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var index, codes, code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                codes = [];
                _a.label = 1;
            case 1:
                if (!(index < 3)) return [3 /*break*/, 3];
                code = generateRandomString(5);
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
test('查询空 Code 的角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, applications.findRole(APP_ID, code)];
            case 1:
                role = _a.sent();
                t.assert(!role);
                return [2 /*return*/];
        }
    });
}); });
test('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, applications.createRole(APP_ID, { code: code })];
            case 1:
                _a.sent();
                return [4 /*yield*/, applications.listAuthorizedResourcesByRole(APP_ID, code, ResourceType.Data)];
            case 2:
                data = _a.sent();
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
test('创建注册协议', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('修改注册协议', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('注册协议排序', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test.serial('删除注册协议和注册协议列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
test('changeTenantConfig', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, applications.changeApplicationType('6194a3c595908f00ff698d3a', ApplicationType.BOTH)];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result.appType === ApplicationType.BOTH);
                return [2 /*return*/];
        }
    });
}); });
test('applicationTenants', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0FwcGxpY2F0aW9uc01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLEVBQUUsTUFBTTtDQUNiLENBQUMsQ0FBQztBQUVILElBQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0FBRTFDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQztJQUM1QyxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7SUFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCO0lBQzNDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7Q0FDL0IsQ0FBQyxDQUFDO0FBRUgsSUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0FBRW5ELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ0YscUJBQU0sZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFBOztnQkFBakUsS0FBdUIsU0FBMEMsRUFBL0QsSUFBSSxVQUFBLEVBQUUsVUFBVSxnQkFBQTtnQkFD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