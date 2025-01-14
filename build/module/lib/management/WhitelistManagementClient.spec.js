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
import { generateRandomEmail, generateRandomString, getOptionsFromEnv } from '../testing-helper';
import test from 'ava';
import { WhitelistType } from '../../types/graphql.v2';
import _ from 'lodash';
import { AuthenticationClient } from '../authentication/AuthenticationClient';
var managementClient = new ManagementClient(getOptionsFromEnv());
test('添加白名单', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var email, authing, failed, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = generateRandomEmail();
                return [4 /*yield*/, managementClient.whitelist.enable(WhitelistType.Email)];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.whitelist.add(WhitelistType.Email, [email])];
            case 2:
                _a.sent();
                authing = new AuthenticationClient(getOptionsFromEnv());
                failed = false;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, authing.registerByEmail(generateRandomEmail(), generateRandomString())];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                failed = true;
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, authing.registerByEmail(email, generateRandomEmail())];
            case 7:
                _a.sent();
                // 管理员
                return [4 /*yield*/, managementClient.users.create({ email: generateRandomEmail() })];
            case 8:
                // 管理员
                _a.sent();
                t.assert(failed);
                return [2 /*return*/];
        }
    });
}); });
test('获取白名单', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var email, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = generateRandomEmail();
                return [4 /*yield*/, managementClient.whitelist.add(WhitelistType.Email, [email])];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.whitelist.list(WhitelistType.Email)];
            case 2:
                list = _a.sent();
                t.assert(_.some(list, function (item) {
                    return item.value === email.toLowerCase();
                }));
                return [2 /*return*/];
        }
    });
}); });
test('关闭白名单', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var userpool;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.whitelist.disable(WhitelistType.Phone)];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2hpdGVsaXN0TWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1doaXRlbGlzdE1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDbEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUU5RSxJQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDYixLQUFLLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztnQkFDcEMscUJBQU0sZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dCQUE1RCxTQUE0RCxDQUFDO2dCQUM3RCxxQkFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFBOztnQkFBbEUsU0FBa0UsQ0FBQztnQkFDN0QsT0FBTyxHQUFHLElBQUksb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7O2dCQUVqQixxQkFBTSxPQUFPLENBQUMsZUFBZSxDQUMzQixtQkFBbUIsRUFBRSxFQUNyQixvQkFBb0IsRUFBRSxDQUN2QixFQUFBOztnQkFIRCxTQUdDLENBQUM7Ozs7Z0JBRUYsTUFBTSxHQUFHLElBQUksQ0FBQzs7b0JBR2hCLHFCQUFNLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLG1CQUFtQixFQUFFLENBQUMsRUFBQTs7Z0JBQTNELFNBQTJELENBQUM7Z0JBRTVELE1BQU07Z0JBQ04scUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxFQUFFLENBQUMsRUFBQTs7Z0JBRHJFLE1BQU07Z0JBQ04sU0FBcUUsQ0FBQztnQkFDdEUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7OztLQUNsQixDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2IsS0FBSyxHQUFHLG1CQUFtQixFQUFFLENBQUM7Z0JBQ3BDLHFCQUFNLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUE7O2dCQUFsRSxTQUFrRSxDQUFDO2dCQUN0RCxxQkFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQWpFLElBQUksR0FBRyxTQUEwRDtnQkFDdkUsQ0FBQyxDQUFDLE1BQU0sQ0FDTixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLElBQUk7b0JBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQ0gsQ0FBQzs7OztLQUNILENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNuQixxQkFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0JBQTdELFNBQTZELENBQUM7Z0JBQzdDLHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBQTs7Z0JBQW5ELFFBQVEsR0FBRyxTQUF3QztnQkFDekQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQzs7OztLQUNyRCxDQUFDLENBQUMifQ==