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
import { PolicyAssignmentTargetType, PolicyEffect } from '../../types/graphql.v2';
import { deepEqual } from '../utils';
var managementClient = new ManagementClient(getOptionsFromEnv());
var statements = [
    {
        resource: 'books:123',
        effect: PolicyEffect.Allow,
        actions: ['books:edit']
    }
];
test('create policy', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                t.assert(policy);
                t.assert(policy.code === code);
                return [2 /*return*/];
        }
    });
}); });
test('update policy # statements', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, newStatements;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                newStatements = [
                    {
                        resource: 'books:123',
                        effect: PolicyEffect.Allow,
                        actions: ['books:*']
                    }
                ];
                return [4 /*yield*/, managementClient.policies.update(code, {
                        statements: newStatements
                    })];
            case 2:
                policy = _a.sent();
                t.assert(policy.code === code);
                t.assert(deepEqual(newStatements, policy.statements));
                return [2 /*return*/];
        }
    });
}); });
test('update policy # new code', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, newCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                newCode = generateRandomString(10);
                return [4 /*yield*/, managementClient.policies.update(code, {
                        newCode: newCode
                    })];
            case 2:
                policy = _a.sent();
                t.assert(policy.code === newCode);
                return [2 /*return*/];
        }
    });
}); });
test('update policy # description', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, description;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                description = generateRandomString(10);
                return [4 /*yield*/, managementClient.policies.update(code, {
                        description: description
                    })];
            case 2:
                policy = _a.sent();
                t.assert(policy.description === description);
                return [2 /*return*/];
        }
    });
}); });
test('update policy # 系统内置策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var description, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                description = generateRandomString(10);
                failed = false;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, managementClient.policies.update('AdministratorAccess', {
                        description: description
                    })];
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
test('detail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                return [4 /*yield*/, managementClient.policies.detail(code)];
            case 2:
                policy = _a.sent();
                t.assert(policy);
                t.assert(deepEqual(policy.statements, statements));
                return [2 /*return*/];
        }
    });
}); });
test('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                return [4 /*yield*/, managementClient.policies.delete(code)];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.policies.detail(code)];
            case 3:
                policy = _a.sent();
                t.assert(policy === null);
                return [2 /*return*/];
        }
    });
}); });
test('deleteMany', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                return [4 /*yield*/, managementClient.policies.deleteMany([code])];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.policies.detail(code)];
            case 3:
                policy = _a.sent();
                t.assert(policy === null);
                return [2 /*return*/];
        }
    });
}); });
test('addAssignments', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, user, _a, totalCount, list, targetIdentifier;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _b.sent();
                return [4 /*yield*/, managementClient.users.create({
                        username: generateRandomString(10),
                        password: '123456!'
                    })];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], PolicyAssignmentTargetType.User, [user.id])];
            case 3:
                _b.sent();
                return [4 /*yield*/, managementClient.policies.listAssignments({
                        code: code
                    })];
            case 4:
                _a = _b.sent(), totalCount = _a.totalCount, list = _a.list;
                t.assert(totalCount === 1);
                t.assert(list.length === 1);
                targetIdentifier = list[0].targetIdentifier;
                t.assert(user.id === targetIdentifier);
                return [2 /*return*/];
        }
    });
}); });
test('addAssignments # 非本用户池的用户 ID', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _b.sent();
                failed = false;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], PolicyAssignmentTargetType.User, [generateRandomString(10)])];
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
test('addAssignments # 非本用户池的角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _b.sent();
                failed = false;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], PolicyAssignmentTargetType.Role, [generateRandomString(10)])];
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
test('addAssignments # 多个策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code1, policy1, code2, policy2, user, totalCount1, totalCount2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code1 = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code1,
                        statements: statements
                    })];
            case 1:
                policy1 = _a.sent();
                code2 = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code2,
                        statements: statements
                    })];
            case 2:
                policy2 = _a.sent();
                return [4 /*yield*/, managementClient.users.create({
                        username: generateRandomString(10),
                        password: '123456!'
                    })];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, managementClient.policies.addAssignments([policy1.code, policy2.code], PolicyAssignmentTargetType.User, [user.id])];
            case 4:
                _a.sent();
                return [4 /*yield*/, managementClient.policies.listAssignments({ code: code1 })];
            case 5:
                totalCount1 = (_a.sent()).totalCount;
                return [4 /*yield*/, managementClient.policies.listAssignments({ code: code2 })];
            case 6:
                totalCount2 = (_a.sent()).totalCount;
                t.assert(totalCount1 === 1);
                t.assert(totalCount2 === 1);
                return [2 /*return*/];
        }
    });
}); });
test('removeAssignments', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, user, totalCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                return [4 /*yield*/, managementClient.users.create({
                        username: generateRandomString(10),
                        password: '123456!'
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], PolicyAssignmentTargetType.User, [user.id])];
            case 3:
                _a.sent();
                return [4 /*yield*/, managementClient.policies.removeAssignments([policy.code], PolicyAssignmentTargetType.User, [user.id])];
            case 4:
                _a.sent();
                return [4 /*yield*/, managementClient.policies.listAssignments({
                        code: code
                    })];
            case 5:
                totalCount = (_a.sent()).totalCount;
                t.assert(totalCount === 0);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsWUFBWSxFQUNiLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVyQyxJQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLElBQU0sVUFBVSxHQUFHO0lBQ2pCO1FBQ0UsUUFBUSxFQUFFLFdBQVc7UUFDckIsTUFBTSxFQUFFLFlBQVksQ0FBQyxLQUFLO1FBQzFCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztLQUN4QjtDQUNGLENBQUM7QUFFRixJQUFJLENBQUMsZUFBZSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ3JCLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIscUJBQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDcEQsSUFBSSxNQUFBO3dCQUNKLFVBQVUsWUFBQTtxQkFDWCxDQUFDLEVBQUE7O2dCQUhJLE1BQU0sR0FBRyxTQUdiO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFD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