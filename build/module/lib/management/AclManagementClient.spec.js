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
import { getOptionsFromEnv } from '../testing-helper';
import test from 'ava';
import { PolicyAssignmentTargetType, ResourceType } from '../../types/graphql.v2';
var managementClient = new ManagementClient(getOptionsFromEnv());
test('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.listAuthorizedResources(PolicyAssignmentTargetType.Role, 'test', '6018bab016c246d458ef0ad2', {
                    resourceType: ResourceType.Data
                })];
            case 1:
                data = _a.sent();
                console.log(data);
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
test('资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.getResources()];
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
                return [4 /*yield*/, managementClient.acl.createResource({
                        code: code,
                        type: ResourceType.Data,
                        description: 'chair',
                        actions: [
                            {
                                name: 'book:write',
                                description: '图书写入操作'
                            }
                        ],
                        namespace: '600a8f4e37708b363024a3ca'
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
                return [4 /*yield*/, managementClient.acl.createResource({
                        code: code,
                        type: ResourceType.Data,
                        description: 'chair',
                        actions: [
                            {
                                name: 'book:write',
                                description: '图书写入操作'
                            }
                        ],
                        namespace: '600a8f4e37708b363024a3ca'
                    })];
            case 1:
                res = _a.sent();
                t.assert(Reflect.has(res, 'id'));
                return [4 /*yield*/, managementClient.acl.updateResource(code, {
                        description: '新的描述',
                        type: ResourceType.Api,
                        actions: [
                            { name: 'cardiovascular', description: '心血管的' },
                            { name: 'surge', description: '激增' }
                        ],
                        namespace: '600a8f4e37708b363024a3ca'
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
                return [4 /*yield*/, managementClient.acl.createResource({
                        code: code,
                        type: ResourceType.Data,
                        description: 'chair',
                        actions: [
                            {
                                name: 'book:write',
                                description: '图书写入操作'
                            }
                        ],
                        namespace: '600a8f4e37708b363024a3ca'
                    })];
            case 1:
                res = _a.sent();
                t.assert(Reflect.has(res, 'id'));
                return [4 /*yield*/, managementClient.acl.deleteResource(code, '600a8f4e37708b363024a3ca')];
            case 2:
                deleted = _a.sent();
                t.assert(deleted === true);
                return [2 /*return*/];
        }
    });
}); });
test('获取应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.getApplicationAccessPolicies({
                    appId: process.env.AUTHING_APP_ID
                })];
            case 1:
                res = _a.sent();
                t.assert(Array.isArray(res.list));
                t.assert(typeof res.totalCount === 'number');
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
                return [4 /*yield*/, managementClient.acl.allowAccessApplication({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id],
                        namespace: 'default'
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.acl.enableApplicationAccessPolicy({
                        appId: process.env.AUTHING_APP_ID,
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
test('停用应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [4 /*yield*/, managementClient.acl.allowAccessApplication({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id],
                        namespace: 'default'
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.acl.enableApplicationAccessPolicy({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id]
                    })];
            case 3:
                res = _a.sent();
                t.assert(res.code === 200);
                return [4 /*yield*/, managementClient.acl.disableApplicationAccessPolicy({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id]
                    })];
            case 4:
                res2 = _a.sent();
                t.assert(res2.code === 200);
                return [2 /*return*/];
        }
    });
}); });
test('删除应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [4 /*yield*/, managementClient.acl.allowAccessApplication({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id],
                        namespace: 'default'
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.acl.deleteApplicationAccessPolicy({
                        appId: process.env.AUTHING_APP_ID,
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
                return [4 /*yield*/, managementClient.acl.allowAccessApplication({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id],
                        namespace: 'default'
                    })];
            case 2:
                res = _a.sent();
                t.assert(res.code === 200);
                return [4 /*yield*/, managementClient.acl.getApplicationAccessPolicies({
                        appId: process.env.AUTHING_APP_ID
                    })];
            case 3:
                res2 = _a.sent();
                t.truthy(res2.list.find(function (v) { return v.targetIdentifier === user.id; }));
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
                return [4 /*yield*/, managementClient.acl.denyAccessApplication({
                        appId: process.env.AUTHING_APP_ID,
                        targetType: 'USER',
                        targetIdentifiers: [user.id],
                        namespace: 'default'
                    })];
            case 2:
                res = _a.sent();
                t.assert(res.code === 200);
                return [4 /*yield*/, managementClient.acl.getApplicationAccessPolicies({
                        appId: process.env.AUTHING_APP_ID
                    })];
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
            case 0: return [4 /*yield*/, managementClient.acl.updateDefaultApplicationAccessPolicy({
                    defaultStrategy: 'DENY_ALL',
                    appId: process.env.AUTHING_APP_ID
                })];
            case 1:
                res2 = _a.sent();
                t.assert(res2.permissionStrategy.defaultStrategy === 'DENY_ALL');
                return [4 /*yield*/, managementClient.acl.updateDefaultApplicationAccessPolicy({
                        defaultStrategy: 'ALLOW_ALL',
                        appId: process.env.AUTHING_APP_ID
                    })];
            case 2:
                res3 = _a.sent();
                t.assert(res3.permissionStrategy.defaultStrategy === 'ALLOW_ALL');
                return [2 /*return*/];
        }
    });
}); });
test.skip('获取具备某个（类）资源操作权限的用户、分组、角色、组织机构。', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.getAuthorizedTargets({
                    namespace: '6063f88dabb536e9a23a6c80',
                    resource: 'book',
                    resourceType: 'DATA',
                    actions: {
                        op: 'OR',
                        list: ['write']
                    },
                    targetType: 'USER'
                })];
            case 1:
                res = _a.sent();
                console.log(JSON.stringify(res));
                t.assert(res);
                return [2 /*return*/];
        }
    });
}); });
test.only('getResourceById', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.getResourceById('xxx')];
            case 1:
                data = _a.sent();
                console.log(data);
                t.assert(data === null);
                return [2 /*return*/];
        }
    });
}); });
test.only('getResourceByCode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.getResourceByCode({
                    namespace: '60b701d08470e2ffee1d3d32',
                    code: 'sss'
                })];
            case 1:
                data = _a.sent();
                console.log(data);
                t.assert(data === null);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNsTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0FjbE1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUNMLDBCQUEwQixFQUMxQixZQUFZLEVBQ2IsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxJQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ3hCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FDN0QsMEJBQTBCLENBQUMsSUFBSSxFQUMvQixNQUFNLEVBQ04sMEJBQTBCLEVBQzFCO29CQUNFLFlBQVksRUFBRSxZQUFZLENBQUMsSUFBSTtpQkFDaEMsQ0FDRixFQUFBOztnQkFQSyxJQUFJLEdBQUcsU0FPWjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O0tBQ2hCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNKLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBQTs7Z0JBQS9DLEdBQUcsR0FBRyxTQUF5QztnQkFDckQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7S0FDMUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNkLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO3FCQUNyQixRQUFRLENBQUMsRUFBRSxDQUFDO3FCQUNaLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDQSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO3dCQUNwRCxJQUFJLEVBQUUsSUFBSTt3QkFDVixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7d0JBQ3ZCLFdBQVcsRUFBRSxPQUFPO3dCQUNwQixPQUFPLEVBQUU7NEJBQ1A7Z0NBQ0UsSUFBSSxFQUFFLFlBQVk7Z0NBQ2xCLFdBQVcsRUFBRSxRQUFROzZCQUN0Qjt5QkFDRjt3QkFDRCxTQUFTLEVBQUUsMEJBQTBCO3FCQUN0QyxDQUFDLEVBQUE7O2dCQVhJLEdBQUcsR0FBRyxTQVdWO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs7OztLQUNsQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3JCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVBLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7d0JBQ3BELElBQUksRUFBRSxJQUFJO3dCQUNWLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTt3QkFDdkIsV0FBVyxFQUFFLE9BQU87d0JBQ3BCLE9BQU8sRUFBRTs0QkFDUDtnQ0FDRSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsV0FBVyxFQUFFLFFBQVE7NkJBQ3RCO3lCQUNGO3dCQUNELFNBQVMsRUFBRSwwQkFBMEI7cUJBQ3RDLENBQUMsRUFBQTs7Z0JBWEksR0FBRyxHQUFHLFNBV1Y7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTt3QkFDOUQsV0FBVyxFQUFFLE1BQU07d0JBQ25CLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRzt3QkFDdEIsT0FBTyxFQUFFOzRCQUNQLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7NEJBQy9DLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFO3lCQUNyQzt3QkFDRCxTQUFTLEVBQUUsMEJBQTBCO3FCQUN0QyxDQUFDLEVBQUE7O2dCQVJJLE9BQU8sR0FBRyxTQVFkO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxNQUFNLENBQUMsQ0FBQzs7OztLQUMxQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3JCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVBLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7d0JBQ3BELElBQUksRUFBRSxJQUFJO3dCQUNWLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTt3QkFDdkIsV0FBVyxFQUFFLE9BQU87d0JBQ3BCLE9BQU8sRUFBRTs0QkFDUDtnQ0FDRSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsV0FBVyxFQUFFLFFBQVE7NkJBQ3RCO3lCQUNGO3dCQUNELFNBQVMsRUFBRSwwQkFBMEI7cUJBQ3RDLENBQUMsRUFBQTs7Z0JBWEksR0FBRyxHQUFHLFNBV1Y7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUNyRCxJQUFJLEVBQ0osMEJBQTBCLENBQzNCLEVBQUE7O2dCQUhHLE9BQU8sR0FBRyxTQUdiO2dCQUNELENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDOzs7O0tBQzVCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNkLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztvQkFDaEUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztpQkFDbEMsQ0FBQyxFQUFBOztnQkFGRSxHQUFHLEdBQUcsU0FFUjtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDOzs7O0tBQzlDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3pCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ1IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFBOztnQkFBdkUsSUFBSSxHQUFHLFNBQWdFO2dCQUMzRSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7d0JBQ2hELEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVCLFNBQVMsRUFBRSxTQUFTO3FCQUNyQixDQUFDLEVBQUE7O2dCQUxGLFNBS0UsQ0FBQztnQkFDTyxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUM7d0JBQ2pFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQzdCLENBQUMsRUFBQTs7Z0JBSkUsR0FBRyxHQUFHLFNBSVI7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O0tBQzVCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3pCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ1IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFBOztnQkFBdkUsSUFBSSxHQUFHLFNBQWdFO2dCQUMzRSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7d0JBQ2hELEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVCLFNBQVMsRUFBRSxTQUFTO3FCQUNyQixDQUFDLEVBQUE7O2dCQUxGLFNBS0UsQ0FBQztnQkFDTyxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUM7d0JBQ2pFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQzdCLENBQUMsRUFBQTs7Z0JBSkUsR0FBRyxHQUFHLFNBSVI7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7d0JBQ25FLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQzdCLENBQUMsRUFBQTs7Z0JBSkUsSUFBSSxHQUFHLFNBSVQ7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O0tBQzdCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDcEIsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3pCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ1IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFBOztnQkFBdkUsSUFBSSxHQUFHLFNBQWdFO2dCQUMzRSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7d0JBQ2hELEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVCLFNBQVMsRUFBRSxTQUFTO3FCQUNyQixDQUFDLEVBQUE7O2dCQUxGLFNBS0UsQ0FBQztnQkFDTyxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUM7d0JBQ2pFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQzdCLENBQUMsRUFBQTs7Z0JBSkUsR0FBRyxHQUFHLFNBSVI7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O0tBQzVCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUM1QyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDekIsUUFBUSxDQUFDLEVBQUUsQ0FBQztxQkFDWixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsR0FBRyxHQUFHLFFBQVEsQ0FBQztnQkFDUixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUE7O2dCQUF2RSxJQUFJLEdBQUcsU0FBZ0U7Z0JBQ2pFLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDMUQsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYzt3QkFDakMsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDNUIsU0FBUyxFQUFFLFNBQVM7cUJBQ3JCLENBQUMsRUFBQTs7Z0JBTEUsR0FBRyxHQUFHLFNBS1I7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7d0JBQ2pFLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7cUJBQ2xDLENBQUMsRUFBQTs7Z0JBRkUsSUFBSSxHQUFHLFNBRVQ7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUE5QixDQUE4QixDQUFDLENBQUMsQ0FBQzs7OztLQUN0RSxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsb0NBQW9DLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3pCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ1IscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFBOztnQkFBdkUsSUFBSSxHQUFHLFNBQWdFO2dCQUNqRSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7d0JBQ3pELEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2pDLFVBQVUsRUFBRSxNQUFNO3dCQUNsQixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVCLFNBQVMsRUFBRSxTQUFTO3FCQUNyQixDQUFDLEVBQUE7O2dCQUxFLEdBQUcsR0FBRyxTQUtSO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDaEIscUJBQU0sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO3dCQUNqRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO3FCQUNsQyxDQUFDLEVBQUE7O2dCQUZFLElBQUksR0FBRyxTQUVUO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLEVBQUUsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDLENBQUM7Ozs7S0FDdEUsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLFVBQU0sQ0FBQzs7OztvQkFDeEMscUJBQU0sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDO29CQUN6RSxlQUFlLEVBQUUsVUFBVTtvQkFDM0IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYztpQkFDbEMsQ0FBQyxFQUFBOztnQkFIRSxJQUFJLEdBQUcsU0FHVDtnQkFDRixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEtBQUssVUFBVSxDQUFDLENBQUM7Z0JBQ3RELHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQzt3QkFDekUsZUFBZSxFQUFFLFdBQVc7d0JBQzVCLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7cUJBQ2xDLENBQUMsRUFBQTs7Z0JBSEUsSUFBSSxHQUFHLFNBR1Q7Z0JBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxLQUFLLFdBQVcsQ0FBQyxDQUFDOzs7O0tBQ25FLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsVUFBTSxDQUFDOzs7O29CQUN2QyxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7b0JBQ3hELFNBQVMsRUFBRSwwQkFBMEI7b0JBQ3JDLFFBQVEsRUFBRSxNQUFNO29CQUNoQixZQUFZLEVBQUUsTUFBTTtvQkFDcEIsT0FBTyxFQUFFO3dCQUNQLEVBQUUsRUFBRSxJQUFJO3dCQUNSLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztxQkFDaEI7b0JBQ0QsVUFBVSxFQUFFLE1BQU07aUJBQ25CLENBQUMsRUFBQTs7Z0JBVEUsR0FBRyxHQUFHLFNBU1I7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Ozs7S0FDZCxDQUFDLENBQUE7QUFHRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQU0sQ0FBQzs7OztvQkFDckIscUJBQU0sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQXhELElBQUksR0FBRyxTQUFpRDtnQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDakIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUE7Ozs7S0FDeEIsQ0FBQyxDQUFBO0FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ3ZCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDeEQsU0FBUyxFQUFFLDBCQUEwQjtvQkFDckMsSUFBSSxFQUFFLEtBQUs7aUJBQ1osQ0FBQyxFQUFBOztnQkFISSxJQUFJLEdBQUcsU0FHWDtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNqQixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQTs7OztLQUN4QixDQUFDLENBQUEifQ==