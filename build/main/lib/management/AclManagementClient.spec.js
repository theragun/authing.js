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
var testing_helper_1 = require("../testing-helper");
var ava_1 = __importDefault(require("ava"));
var graphql_v2_1 = require("../../types/graphql.v2");
var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
ava_1.default('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.acl.listAuthorizedResources(graphql_v2_1.PolicyAssignmentTargetType.Role, 'test', '6018bab016c246d458ef0ad2', {
                    resourceType: graphql_v2_1.ResourceType.Data
                })];
            case 1:
                data = _a.sent();
                console.log(data);
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default('创建资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, managementClient.acl.createResource({
                        code: code,
                        type: graphql_v2_1.ResourceType.Data,
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
ava_1.default('修改资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res, updated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, managementClient.acl.createResource({
                        code: code,
                        type: graphql_v2_1.ResourceType.Data,
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
                        type: graphql_v2_1.ResourceType.Api,
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
ava_1.default('删除资源', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, res, deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = Math.random()
                    .toString(26)
                    .slice(2);
                return [4 /*yield*/, managementClient.acl.createResource({
                        code: code,
                        type: graphql_v2_1.ResourceType.Data,
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
ava_1.default('获取应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default('停用应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default('删除应用访问控制策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default('更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default.skip('获取具备某个（类）资源操作权限的用户、分组、角色、组织机构。', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default.only('getResourceById', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default.only('getResourceByCode', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWNsTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0FjbE1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUN0RCxvREFBc0Q7QUFDdEQsNENBQXVCO0FBQ3ZCLHFEQUdnQztBQUVoQyxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLGFBQUksQ0FBQyx5QkFBeUIsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ3hCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FDN0QsdUNBQTBCLENBQUMsSUFBSSxFQUMvQixNQUFNLEVBQ04sMEJBQTBCLEVBQzFCO29CQUNFLFlBQVksRUFBRSx5QkFBWSxDQUFDLElBQUk7aUJBQ2hDLENBQ0YsRUFBQTs7Z0JBUEssSUFBSSxHQUFHLFNBT1o7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztLQUNoQixDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsSUFBSSxFQUFFLFVBQU0sQ0FBQzs7OztvQkFDSixxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLEVBQUE7O2dCQUEvQyxHQUFHLEdBQUcsU0FBeUM7Z0JBQ3JELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDOzs7O0tBQzFDLENB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