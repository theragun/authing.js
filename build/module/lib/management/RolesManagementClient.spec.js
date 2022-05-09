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
test('create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.roles.create(code, '测试')];
            case 1:
                role = _a.sent();
                t.assert(role);
                t.assert(role.code === code);
                return [2 /*return*/];
        }
    });
}); });
test('update', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role, description;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.roles.create(code)];
            case 1:
                role = _a.sent();
                description = generateRandomString();
                return [4 /*yield*/, managementClient.roles.update(code, { description: description })];
            case 2:
                role = _a.sent();
                t.assert(role.description === description);
                return [2 /*return*/];
        }
    });
}); });
test('update # node code', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role, description, newCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.roles.create(code)];
            case 1:
                role = _a.sent();
                description = generateRandomString();
                newCode = generateRandomString();
                return [4 /*yield*/, managementClient.roles.update(code, { description: description, newCode: newCode })];
            case 2:
                role = _a.sent();
                t.assert(role.description === description);
                t.assert(role.code === newCode);
                return [2 /*return*/];
        }
    });
}); });
test('detail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.roles.create(code)];
            case 1:
                role = _a.sent();
                return [4 /*yield*/, managementClient.roles.detail(code)];
            case 2:
                role = _a.sent();
                t.assert(role);
                t.assert(role.code === code);
                return [2 /*return*/];
        }
    });
}); });
test('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.roles.create(code, '')];
            case 1:
                role = _a.sent();
                return [4 /*yield*/, managementClient.roles.delete(code)];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.roles.detail(code)];
            case 3:
                role = _a.sent();
                t.assert(!role);
                return [2 /*return*/];
        }
    });
}); });
test('deleteMany', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.roles.create(code)];
            case 1:
                role = _a.sent();
                return [4 /*yield*/, managementClient.roles.deleteMany([code])];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.roles.detail(code)];
            case 3:
                role = _a.sent();
                t.assert(!role);
                return [2 /*return*/];
        }
    });
}); });
test('findUsers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, options, role;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = "teacher";
                options = {
                    namespace: '611c7ca421dbe5e3505aa609',
                    search: '',
                    page: 1,
                    limit: 10,
                };
                return [4 /*yield*/, managementClient.roles.findUsers(code, options)];
            case 1:
                role = _a.sent();
                t.assert(Array.isArray(role.list));
                return [2 /*return*/];
        }
    });
}); });
test.skip('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.roles.listAuthorizedResources('test', '6018bab016c246d458ef0ad2', {
                    resourceType: ResourceType.Data
                })];
            case 1:
                data = _a.sent();
                console.log(JSON.stringify(data, null, 4));
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvUm9sZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RCxJQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDZCxJQUFJLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFBOztnQkFBdEQsSUFBSSxHQUFHLFNBQStDO2dCQUM1RCxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQzs7OztLQUM5QixDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2QsSUFBSSxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFBaEQsSUFBSSxHQUFHLFNB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