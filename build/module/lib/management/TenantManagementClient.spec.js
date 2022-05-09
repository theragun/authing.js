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
var managementClient = new ManagementClient(getOptionsFromEnv());
test('list', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenants;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.list({ page: 1, limit: 10 })];
            case 1:
                tenants = _a.sent();
                console.log(tenants);
                t.assert(tenants);
                return [2 /*return*/];
        }
    });
}); });
test('details', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.details('619b07312d6b99e1af7d8e4e')];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.create({
                    name: "搜索",
                    appIds: "619b64e4ccc0467dcba00920",
                })];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('update', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.update('619b64fd2cfccd07a8296839', {
                    name: "聚合搜索"
                })];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.delete('619b64fd2cfccd07a8296839')];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('config', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.config('619b64fd2cfccd07a8296839', { css: ".btnId {\n text-color: #FF00EE}" })];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('members', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.members('619b64fd2cfccd07a8296839', { page: 1, limit: 10 })];
            case 1:
                tenant = _a.sent();
                console.log(JSON.stringify(tenant));
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('addMembers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.addMembers('619b64fd2cfccd07a8296839', ['619b07ab229e3bfa98e94ee2'])];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('removeMembers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var tenant;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.removeMembers('619b64fd2cfccd07a8296839', '619b07ab229e3bfa98e94ee2')];
            case 1:
                tenant = _a.sent();
                console.log(tenant);
                t.assert(tenant);
                return [2 /*return*/];
        }
    });
}); });
test('listExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.listExtIdp('619b64fd2cfccd07a8296839')];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result));
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('extIdpDetail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.extIdpDetail('619b33a00412723ba777eabf')];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result));
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('createExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.createExtIdp({
                    tenantId: '619b64fd2cfccd07a8296839',
                    name: '微信身份源',
                    type: 'wechat',
                    connections: [{
                            type: 'wechat:pc',
                            identifier: 'wechatc1',
                            displayName: '微信身份源连接',
                            fields: { 'clientSecret': 'd1cuu12MdgGKrcItRyD6TeJLNqoWjRW0', 'clientID': 'cli_a1118cb96bf95013', 'displayName': '飞书身份源连接' },
                            userMatchFields: ['ss']
                        }]
                })];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('updateExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.updateExtIdp('619c84ce946e9c1913247af1', { 'name': '飞书身份源' })];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('deleteExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.deleteExtIdp('619c84ce946e9c1913247af1')];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('createExtIdpConnection', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.createExtIdpConnection({
                    extIdpId: '619c917f534a3b8ad988a209',
                    type: 'wechatmp-qrcode',
                    identifier: 'wechatc3',
                    displayName: '微信身份源连接1',
                    fields: { 'clientSecret': 'd1cuu12KrcItRyD6T', 'clientID': 'cli_a196bf9013', 'displayName': '飞书身份源连接1' },
                    userMatchFields: ['ss']
                })];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('updateExtIdpConnection', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.updateExtIdpConnection('619c9490d7b1cec02bf982f6', {
                    displayName: '微信身份源连接2',
                    fields: { 'clientSecret': 'd1cuu12KrcItRyD6T', 'clientID': 'cli_a196bf9013', 'displayName': '飞书身份源连接1' },
                    userMatchFields: ['ss']
                })];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('deleteExtIdpConnection', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.deleteExtIdpConnection('619cc337075fdb26f5fdbfa2')];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('checkExtIdpConnectionIdentifierUnique', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.checkExtIdpConnectionIdentifierUnique('wechatc4')];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('changeExtIdpConnectionState', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.changeExtIdpConnectionState('619cc337075fdb26f5fdbfa2', {
                    tenantId: '619b64fd2cfccd07a8296839',
                    enabled: true
                })];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
test('batchChangeExtIdpConnectionState', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.tenant.batchChangeExtIdpConnectionState('619c917f534a3b8ad988a209', {
                    tenantId: '619b64fd2cfccd07a8296839',
                    enabled: true
                })];
            case 1:
                result = _a.sent();
                console.log(result);
                t.assert(result);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVuYW50TWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1RlbmFudE1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBR3ZCLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7QUFFbkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLENBQUM7Ozs7b0JBRUYscUJBQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUE7O2dCQUEvRCxPQUFPLEdBQUcsU0FBcUQ7Z0JBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7S0FDbkIsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFNLENBQUM7Ozs7b0JBRU4scUJBQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxFQUFBOztnQkFBMUUsTUFBTSxHQUFHLFNBQWlFO2dCQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O0tBQ2xCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxRQUFRLEVB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