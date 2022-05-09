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
    ava_1.default('create group', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, group;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    group = _a.sent();
                    t.assert(group);
                    t.assert(group.code === code);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('update group', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, group, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    group = _a.sent();
                    name = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.update(code, { name: name })];
                case 2:
                    group = _a.sent();
                    t.assert(group.name === name);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('update group # new code', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, group, newCode, groupNotExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    group = _a.sent();
                    newCode = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.update(code, { newCode: newCode })];
                case 2:
                    group = _a.sent();
                    t.assert(group.code === newCode);
                    return [4 /*yield*/, managementClient.groups.detail(code)];
                case 3:
                    groupNotExist = _a.sent();
                    t.assert(!groupNotExist);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('list', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, _a, totalCount, list;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, managementClient.groups.list()];
                case 2:
                    _a = _b.sent(), totalCount = _a.totalCount, list = _a.list;
                    t.assert(totalCount >= 1);
                    t.assert(list.length >= 1);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('detail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, group;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.groups.detail(code)];
                case 2:
                    group = _a.sent();
                    t.assert(group.code === code);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, group;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.groups.delete(code)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.groups.detail(code)];
                case 3:
                    group = _a.sent();
                    t.assert(!group);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('delete group not exists', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var failed, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    failed = false;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, managementClient.groups.delete(testing_helper_1.generateRandomString())];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    failed = true;
                    return [3 /*break*/, 4];
                case 4:
                    t.assert(failed);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('deleteMany', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, group;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, managementClient.groups.deleteMany([code])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.groups.detail(code)];
                case 3:
                    group = _a.sent();
                    t.assert(!group);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('addUsers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, code, statusCode, _a, list, totalCount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString()
                    })];
                case 1:
                    user = _b.sent();
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, managementClient.groups.addUsers(code, [
                            user.id
                        ])];
                case 3:
                    statusCode = (_b.sent()).code;
                    t.assert(statusCode === 200);
                    return [4 /*yield*/, managementClient.groups.listUsers(code)];
                case 4:
                    _a = _b.sent(), list = _a.list, totalCount = _a.totalCount;
                    t.assert(totalCount === 1);
                    t.assert(list.length === 1);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('addUsers # not exists', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, failed, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 1:
                    _b.sent();
                    failed = false;
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, managementClient.groups.addUsers(code, [testing_helper_1.generateRandomString()])];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    failed = true;
                    return [3 /*break*/, 5];
                case 5:
                    t.assert(failed);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('removeUsers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var user, code, _a, list, totalCount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString()
                    })];
                case 1:
                    user = _b.sent();
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.groups.create(code, testing_helper_1.generateRandomString(10))];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, managementClient.groups.addUsers(code, [user.id])];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, managementClient.groups.removeUsers(code, [user.id])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, managementClient.groups.listUsers(code)];
                case 5:
                    _a = _b.sent(), list = _a.list, totalCount = _a.totalCount;
                    t.assert(totalCount === 0);
                    t.assert(list.length === 0);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default.skip('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.groups.listAuthorizedResources('group', '6018bab016c246d458ef0ad2', {
                        resourceType: graphql_v2_1.ResourceType.Menu
                    })];
                case 1:
                    data = _a.sent();
                    console.log(JSON.stringify(data, null, 4));
                    t.assert(data);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBzTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0dyb3Vwc01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVEQUFzRDtJQUN0RCxvREFBNEU7SUFDNUUsNENBQXVCO0lBQ3ZCLHFEQUFzRDtJQUV0RCxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBRW5FLGFBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDOzs7OztvQkFDcEIsSUFBSSxHQUFHLHFDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixxQkFBTSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUNoRCxJQUFJLEVBQ0oscUNBQW9CLENBQUMsRUFBRSxDQUFDLENBQ3pCLEVBQUE7O29CQUhLLEtBQUssR0FBRyxTQUdiO29CQUNELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQzs7OztTQUMvQixDQUFDLENBQUM7SUFFSCxhQUFJLENBQUMsY0FBYyxFQUFFLFVBQU0sQ0FBQzs7Ozs7b0JBQ3BCLElBQUksR0FBRyxxQ0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIscUJBQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDOUMsSUFBSSxFQUNKLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUN6QixFQUFBOztvQkFIRyxLQUFLLEdBQUcsU0FHWDtvQkFDSyxJQUFJLEdBQUcscUNBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLHFCQUFNLGdC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