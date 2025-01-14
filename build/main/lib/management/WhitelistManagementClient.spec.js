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
var lodash_1 = __importDefault(require("lodash"));
var AuthenticationClient_1 = require("../authentication/AuthenticationClient");
var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
ava_1.default('添加白名单', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var email, authing, failed, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = testing_helper_1.generateRandomEmail();
                return [4 /*yield*/, managementClient.whitelist.enable(graphql_v2_1.WhitelistType.Email)];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.whitelist.add(graphql_v2_1.WhitelistType.Email, [email])];
            case 2:
                _a.sent();
                authing = new AuthenticationClient_1.AuthenticationClient(testing_helper_1.getOptionsFromEnv());
                failed = false;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, authing.registerByEmail(testing_helper_1.generateRandomEmail(), testing_helper_1.generateRandomString())];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                failed = true;
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, authing.registerByEmail(email, testing_helper_1.generateRandomEmail())];
            case 7:
                _a.sent();
                // 管理员
                return [4 /*yield*/, managementClient.users.create({ email: testing_helper_1.generateRandomEmail() })];
            case 8:
                // 管理员
                _a.sent();
                t.assert(failed);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('获取白名单', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var email, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = testing_helper_1.generateRandomEmail();
                return [4 /*yield*/, managementClient.whitelist.add(graphql_v2_1.WhitelistType.Email, [email])];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.whitelist.list(graphql_v2_1.WhitelistType.Email)];
            case 2:
                list = _a.sent();
                t.assert(lodash_1.default.some(list, function (item) {
                    return item.value === email.toLowerCase();
                }));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('关闭白名单', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var userpool;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.whitelist.disable(graphql_v2_1.WhitelistType.Phone)];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.detail()];
            case 2:
                userpool = _a.sent();
                t.assert(userpool.whitelist.phoneEnabled === false);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2hpdGVsaXN0TWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1doaXRlbGlzdE1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFzRDtBQUN0RCxvREFJMkI7QUFDM0IsNENBQXVCO0FBQ3ZCLHFEQUF1RDtBQUN2RCxrREFBdUI7QUFDdkIsK0VBQThFO0FBRTlFLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxrQ0FBaUIsRUFBRSxDQUFDLENBQUM7QUFFbkUsYUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNiLEtBQUssR0FBRyxvQ0FBbUIsRUFBRSxDQUFDO2dCQUNwQyxxQkFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDBCQUFhLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUE1RCxTQUE0RCxDQUFDO2dCQUM3RCxxQkFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQTs7Z0JBQWxFLFNBQWtFLENBQUM7Z0JBQzdELE9BQU8sR0FBRyxJQUFJLDJDQUFvQixDQUFDLGtDQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDMUQsTUFBTSxHQUFHLEtBQUssQ0FBQzs7OztnQkFFakIscUJBQU0sT0FBTyxDQUFDLGVBQWUsQ0FDM0Isb0NBQW1CLEVBQUUsRUFDckIscUNBQW9CLEVBQUUsQ0FDdkIsRUFBQTs7Z0JBSEQsU0FHQyxDQUFDOzs7O2dCQUVGLE1BQU0sR0FBRyxJQUFJLENBQUM7O29CQUdoQixxQkFBTSxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxvQ0FBbUIsRUFBRSxDQUFDLEVBQUE7O2dCQUEzRCxTQUEyRCxDQUFDO2dCQUU1RCxNQUFNO2dCQUNOLHFCQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsb0NBQW1CLEVBQUUsRUFBRSxDQUFDLEVBQUE7O2dCQURyRSxNQUFNO2dCQUNOLFNBQXFFLENBQUM7Z0JBQ3RFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7S0FDbEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNiLEtBQUssR0FBRyxvQ0FBbUIsRUFBRSxDQUFDO2dCQUNwQyxxQkFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQTs7Z0JBQWxFLFNBQWtFLENBQUM7Z0JBQ3RELHFCQUFNLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMEJBQWEsQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQWpFLElBQUksR0FBRyxTQUEwRDtnQkFDdkUsQ0FBQyxDQUFDLE1BQU0sQ0FDTixnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxJQUFJO29CQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVDLENBQUMsQ0FBQyxDQUNILENBQUM7Ozs7S0FDSCxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsT0FBTyxFQUFFLFVBQU0sQ0FBQzs7OztvQkFDbkIscUJBQU0sZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQywwQkFBYSxDQUFDLEtBQUssQ0FBQyxFQUFBOztnQkFBN0QsU0FBNkQsQ0FBQztnQkFDN0MscUJBQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFBOztnQkFBbkQsUUFBUSxHQUFHLFNBQXdDO2dCQUN6RCxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDOzs7O0tBQ3JELENBQUMsQ0FBQyJ9