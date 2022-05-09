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
import { getOptionsFromEnv } from '../testing-helper';
import test from 'ava';
import { AuthenticationClient } from '../..';
var managementClient = new ManagementClient(getOptionsFromEnv());
var authenticationClient = new AuthenticationClient(getOptionsFromEnv());
test('管理员导入已有 totp secret 到 Authing', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var username, pwd, user, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = Math.random()
                    .toString(26)
                    .slice(2);
                pwd = '123456';
                return [4 /*yield*/, managementClient.users.create({ username: username, password: pwd })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, managementClient.mfa.importTotp(user.id, '123456', '654321')];
            case 2:
                result = _a.sent();
                t.assert(result.userId === user.id);
                t.assert(result.recoveryCode === '654321');
                t.assert(result.secret === '123456');
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, authenticationClient.loginByUsername(username, pwd)];
            case 4:
                _a.sent();
                t.fail('未开启 totp');
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                t.assert(err_1.code === 1635);
                t.assert(err_1.data.mfaToken.length);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTUZBTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L01GQU1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRTdDLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7QUFDbkUsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztBQUUzRSxJQUFJLENBQUMsK0JBQStCLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDdkMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3pCLFFBQVEsQ0FBQyxFQUFFLENBQUM7cUJBQ1osS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNSLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0JBQ04scUJBQU0sZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFBOztnQkFBdkUsSUFBSSxHQUFHLFNBQWdFO2dCQUNoRSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUNoRCxJQUFJLENBQUMsRUFBRSxFQUNQLFFBQVEsRUFDUixRQUFRLENBQ1QsRUFBQTs7Z0JBSkcsTUFBTSxHQUFHLFNBSVo7Z0JBQ0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUM7Ozs7Z0JBRW5DLHFCQUFNLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUE7O2dCQUF6RCxTQUF5RCxDQUFDO2dCQUMxRCxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7O2dCQUVuQixDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0tBRXRDLENBQUMsQ0FBQyJ9