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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBzTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0dyb3Vwc01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUN0RCxvREFBNEU7QUFDNUUsNENBQXVCO0FBQ3ZCLHFEQUFzRDtBQUV0RCxJQUFNLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsa0NBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLGFBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDcEIsSUFBSSxHQUFHLHFDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixxQkFBTSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUNoRCxJQUFJLEVBQ0oscUNBQW9CLENBQUMsRUFBRSxDQUFDLENBQ3pCLEVBQUE7O2dCQUhLLEtBQUssR0FBRyxTQUdiO2dCQUNELENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQzs7OztLQUMvQixDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsY0FBYyxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ3BCLElBQUksR0FBRyxxQ0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIscUJBQU0sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDOUMsSUFBSSxFQUNKLHFDQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUN6QixFQUFBOztnQkFIRyxLQUFLLEdBQUcsU0FHWDtnQkFDSyxJQUFJLEdBQUcscUNBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLHFCQUFNLGdCQUFnQixDQUFD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