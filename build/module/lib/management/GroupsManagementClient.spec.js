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
test('create group', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, group;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
            case 1:
                group = _a.sent();
                t.assert(group);
                t.assert(group.code === code);
                return [2 /*return*/];
        }
    });
}); });
test('update group', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, group, name;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
            case 1:
                group = _a.sent();
                name = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.update(code, { name: name })];
            case 2:
                group = _a.sent();
                t.assert(group.name === name);
                return [2 /*return*/];
        }
    });
}); });
test('update group # new code', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, group, newCode, groupNotExist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
            case 1:
                group = _a.sent();
                newCode = generateRandomString(5);
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
test('list', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, _a, totalCount, list;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
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
test('detail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, group;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
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
test('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, group;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
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
test('delete group not exists', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                failed = false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, managementClient.groups.delete(generateRandomString())];
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
test('deleteMany', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, group;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
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
test('addUsers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, code, statusCode, _a, list, totalCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString()
                })];
            case 1:
                user = _b.sent();
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
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
test('addUsers # not exists', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
            case 1:
                _b.sent();
                failed = false;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, managementClient.groups.addUsers(code, [generateRandomString()])];
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
test('removeUsers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var user, code, _a, list, totalCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, managementClient.users.create({
                    username: generateRandomString()
                })];
            case 1:
                user = _b.sent();
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.groups.create(code, generateRandomString(10))];
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
test.skip('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.groups.listAuthorizedResources('group', '6018bab016c246d458ef0ad2', {
                    resourceType: ResourceType.Menu
                })];
            case 1:
                data = _a.sent();
                console.log(JSON.stringify(data, null, 4));
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBzTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L0dyb3Vwc01hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RSxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7QUFFbkUsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNwQixJQUFJLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLHFCQUFNLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ2hELElBQUksRUFDSixvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FDekIsRUFBQTs7Z0JBSEssS0FBSyxHQUFHLFNBR2I7Z0JBQ0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDOzs7O0tBQy9CLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDcEIsSUFBSSxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixxQkFBTSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUM5QyxJQUFJLEVBQ0osb0JB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