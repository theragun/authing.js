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
var types_1 = require("./types");
var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
ava_1.default('查看用户操作日志', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var userActions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.statistics.listUserActions()];
            case 1:
                userActions = _a.sent();
                console.log(userActions);
                t.assert(userActions.totalCount !== 0);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('查看管理员操作日志', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var auditLogs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.statistics.listAuditLogs({
                    operationNames: [types_1.SupportedAdminActionEnum.CREATE_USER]
                })];
            case 1:
                auditLogs = _a.sent();
                console.log(auditLogs);
                t.assert(auditLogs.totalCount !== 0);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGlzdGljc01hbmFnZW1lbnRDbGllbnQuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9TdGF0aXN0aWNzTWFuYWdlbWVudENsaWVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXNEO0FBQ3RELG9EQUFzRDtBQUN0RCw0Q0FBdUI7QUFDdkIsaUNBQW1EO0FBRW5ELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7QUFFbkUsYUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ0YscUJBQU0sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxFQUFBOztnQkFBakUsV0FBVyxHQUFHLFNBQW1EO2dCQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2dCQUN4QixDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7S0FDeEMsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFNLENBQUM7Ozs7b0JBQ0wscUJBQU0sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztvQkFDaEUsY0FBYyxFQUFFLENBQUMsZ0NBQXdCLENBQUMsV0FBVyxDQUFDO2lCQUN2RCxDQUFDLEVBQUE7O2dCQUZJLFNBQVMsR0FBRyxTQUVoQjtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7S0FDdEMsQ0FBQyxDQUFDIn0=