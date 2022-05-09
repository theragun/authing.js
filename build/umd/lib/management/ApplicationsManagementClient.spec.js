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
        define(["require", "exports", "./ManagementClient", "ava", "../../types/graphql.v2", "../testing-helper", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0FwcGxpY2F0aW9uc01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVEQUFzRDtJQUN0RCw0Q0FBdUI7SUFDdkIscURBQXNEO0lBQ3RELG9EQUF5RDtJQUN6RCxpQ0FBMEM7SUFFMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN2QixJQUFJLEVBQUUsTUFBTTtLQUNiLENBQUMsQ0FBQztJQUVILElBQU0sTUFBTSxHQUFHLDBCQUEwQixDQUFDO0lBRTFDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQztRQUM1QyxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7UUFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCO1FBQzNDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7S0FDL0IsQ0FBQyxDQUFDO0lBRUgsSUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBRW5ELGFBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFNLENBQUM7Ozs7d0JBQ0YscUJBQU0sZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFBOztvQkFBakUsS0FBdUIsU0FBMEMsRUFBL0QsSUFBSSxVQUFBLEVBQUUsVUFBVSxnQkFBQTtvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDakIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFD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