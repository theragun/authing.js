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
        define(["require", "exports", "./ManagementClient", "../testing-helper", "ava", "../../types/graphql.v2", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvUG9saWNpZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx1REFBc0Q7SUFDdEQsb0RBQTRFO0lBQzVFLDRDQUF1QjtJQUN2QixxREFHZ0M7SUFFaEMsa0NBQXFDO0lBRXJDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7SUFFbkUsSUFBTSxVQUFVLEdBQUc7UUFDakI7WUFDRSxRQUFRLEVBQUUsV0FBVztZQUNyQixNQUFNLEVBQUUseUJBQVksQ0FBQyxLQUFLO1lBQzFCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztTQUN4QjtLQUNGLENBQUM7SUFFRixhQUFJLENBQUMsZUFBZSxFQUFFLFVBQU0sQ0FBQzs7Ozs7b0JBQ3JCLElBQUksR0FBRyxxQ0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIscUJBQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzs0QkFDcEQsSUFBSSxNQUFBOzRCQUNKLFVBQVUsWUFBQTt5QkFDWCxDQUFDLEVBQUE7O29CQUhJLE1BQU0sR0FBRyxTQUdiO29CQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQzs7OztTQUNoQyxDQUFDLENBQUM7SUFFSCxhQUFJLENBQUMsNEJBQTRCLEVBQUUsVUFBTSxDQUFDOzs7OztvQkFDbEMsSUFBSSxHQUFHLHFDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixxQkFBTSxnQkFBZ0Is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