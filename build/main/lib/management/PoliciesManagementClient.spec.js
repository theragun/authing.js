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
var utils_1 = require("../utils");
var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
var statements = [
    {
        resource: 'books:123',
        effect: graphql_v2_1.PolicyEffect.Allow,
        actions: ['books:edit']
    }
];
ava_1.default('create policy', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
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
ava_1.default('update policy # statements', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, newStatements;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                newStatements = [
                    {
                        resource: 'books:123',
                        effect: graphql_v2_1.PolicyEffect.Allow,
                        actions: ['books:*']
                    }
                ];
                return [4 /*yield*/, managementClient.policies.update(code, {
                        statements: newStatements
                    })];
            case 2:
                policy = _a.sent();
                t.assert(policy.code === code);
                t.assert(utils_1.deepEqual(newStatements, policy.statements));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('update policy # new code', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, newCode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                newCode = testing_helper_1.generateRandomString(10);
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
ava_1.default('update policy # description', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, description;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                description = testing_helper_1.generateRandomString(10);
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
ava_1.default('update policy # 系统内置策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var description, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                description = testing_helper_1.generateRandomString(10);
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
ava_1.default('detail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
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
                t.assert(utils_1.deepEqual(policy.statements, statements));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
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
ava_1.default('deleteMany', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
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
ava_1.default('addAssignments', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, user, _a, totalCount, list, targetIdentifier;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _b.sent();
                return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(10),
                        password: '123456!'
                    })];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], graphql_v2_1.PolicyAssignmentTargetType.User, [user.id])];
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
ava_1.default('addAssignments # 非本用户池的用户 ID', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
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
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], graphql_v2_1.PolicyAssignmentTargetType.User, [testing_helper_1.generateRandomString(10)])];
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
ava_1.default('addAssignments # 非本用户池的角色', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, failed, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
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
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], graphql_v2_1.PolicyAssignmentTargetType.Role, [testing_helper_1.generateRandomString(10)])];
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
ava_1.default('addAssignments # 多个策略', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code1, policy1, code2, policy2, user, totalCount1, totalCount2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code1 = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code1,
                        statements: statements
                    })];
            case 1:
                policy1 = _a.sent();
                code2 = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code2,
                        statements: statements
                    })];
            case 2:
                policy2 = _a.sent();
                return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(10),
                        password: '123456!'
                    })];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, managementClient.policies.addAssignments([policy1.code, policy2.code], graphql_v2_1.PolicyAssignmentTargetType.User, [user.id])];
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
ava_1.default('removeAssignments', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var code, policy, user, totalCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                code = testing_helper_1.generateRandomString(5);
                return [4 /*yield*/, managementClient.policies.create({
                        code: code,
                        statements: statements
                    })];
            case 1:
                policy = _a.sent();
                return [4 /*yield*/, managementClient.users.create({
                        username: testing_helper_1.generateRandomString(10),
                        password: '123456!'
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, managementClient.policies.addAssignments([policy.code], graphql_v2_1.PolicyAssignmentTargetType.User, [user.id])];
            case 3:
                _a.sent();
                return [4 /*yield*/, managementClient.policies.removeAssignments([policy.code], graphql_v2_1.PolicyAssignmentTargetType.User, [user.id])];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFDdEQsb0RBQTRFO0FBQzVFLDRDQUF1QjtBQUN2QixxREFHZ0M7QUFFaEMsa0NBQXFDO0FBRXJDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7QUFFbkUsSUFBTSxVQUFVLEdBQUc7SUFDakI7UUFDRSxRQUFRLEVBQUUsV0FBVztRQUNyQixNQUFNLEVBQUUseUJBQVksQ0FBQyxLQUFLO1FBQzFCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztLQUN4QjtDQUNGLENBQUM7QUFFRixhQUFJLENBQUMsZUFBZSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ3JCLElBQUksR0FBRyxxQ0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIscUJBQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzt3QkFDcEQsSUFBSSxNQUFBO3dCQUNKLFVBQVUsWUFBQTtxQkFDWCxDQUFDLEVBQUE7O2dCQUhJLE1BQU0sR0FBRyxTQUdiO2dCQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQzs7OztLQUNoQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsNEJBQTRCLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDbEMsSUFBSSxHQUFHLHFDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixxQkFBTSxnQkFBZ0IsQ0FBQyxRQUFR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