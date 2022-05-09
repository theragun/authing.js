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
        define(["require", "exports", "./ManagementClient", "../testing-helper", "ava"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ManagementClient_1 = require("./ManagementClient");
    var testing_helper_1 = require("../testing-helper");
    var ava_1 = __importDefault(require("ava"));
    var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
    ava_1.default('list', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('details', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('update', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('config', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('members', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('addMembers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('removeMembers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('listExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('extIdpDetail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('createExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('updateExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('deleteExtIdp', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('createExtIdpConnection', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('updateExtIdpConnection', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('deleteExtIdpConnection', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('checkExtIdpConnectionIdentifierUnique', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('changeExtIdpConnectionState', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default('batchChangeExtIdpConnectionState', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVuYW50TWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1RlbmFudE1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVEQUFzRDtJQUN0RCxvREFHMkI7SUFDM0IsNENBQXVCO0lBR3ZCLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7SUFFbkUsYUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFNLENBQUM7Ozs7d0JBRUYscUJBQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUE7O29CQUEvRCxPQUFPLEdBQUcsU0FBcUQ7b0JBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBQ3BCLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7U0FDbkIsQ0FBQyxDQUFDO0lBRUgsYUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFNLENBQUM7Ozs7d0JBRU4scUJBQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxFQUFBOztvQkFBMUUsTUFBTSxHQUFHLFNBQWlFO29CQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO29CQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O1NBQ2xCLENBQUMsQ0FBQztJQUVILGFBQUksQ0FBQyxRQUFRLEVBQUUsVUFBTSxDQUFDOzs7O3dCQUVMLHFCQUFNLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ2xELElB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