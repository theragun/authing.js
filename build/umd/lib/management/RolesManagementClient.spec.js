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
    ava_1.default('create', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.roles.create(code, '测试')];
                case 1:
                    role = _a.sent();
                    t.assert(role);
                    t.assert(role.code === code);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('update', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, role, description;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.roles.create(code)];
                case 1:
                    role = _a.sent();
                    description = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.roles.update(code, { description: description })];
                case 2:
                    role = _a.sent();
                    t.assert(role.description === description);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('update # node code', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, role, description, newCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
                    return [4 /*yield*/, managementClient.roles.create(code)];
                case 1:
                    role = _a.sent();
                    description = testing_helper_1.generateRandomString();
                    newCode = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.roles.update(code, { description: description, newCode: newCode })];
                case 2:
                    role = _a.sent();
                    t.assert(role.description === description);
                    t.assert(role.code === newCode);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('detail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
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
    ava_1.default('delete', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
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
    ava_1.default('deleteMany', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var code, role;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    code = testing_helper_1.generateRandomString(5);
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
    ava_1.default('findUsers', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
    ava_1.default.skip('listAuthorizedResources', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, managementClient.roles.listAuthorizedResources('test', '6018bab016c246d458ef0ad2', {
                        resourceType: graphql_v2_1.ResourceType.Data
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9sZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvUm9sZXNNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSx1REFBc0Q7SUFDdEQsb0RBQTRFO0lBQzVFLDRDQUF1QjtJQUV2QixxREFBc0Q7SUFFdEQsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLG1DQUFnQixDQUFDLGtDQUFpQixFQUFFLENBQUMsQ0FBQztJQUVuRSxhQUFJLENBQUMsUUFBUSxFQUFFLFVBQU0sQ0FBQzs7Ozs7b0JBQ2QsSUFBSSxHQUFHLHFDQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixxQkFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7b0JBQXRELElBQUksR0FBRyxTQUErQztvQkFDNUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7Ozs7U0FDOUIsQ0FBQyxDQUFDO0lBRUgsYUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFNLENBQUM7Ozs7O29CQUNkLElBQUksR0FBRyxxQ0FBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIscUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0JBQWhELElBQUksR0FBRyxTQUF5QztvQkFDOUMsV0FBVyxHQUFHLHFDQUFvQixFQUFFLENBQUM7b0JBQ3BDLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxhQUFBLEVB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