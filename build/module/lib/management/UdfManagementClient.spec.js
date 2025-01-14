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
import { UdfDataType, UdfTargetType } from '../../types/graphql.v2';
import _ from 'lodash';
var managementClient = new ManagementClient(getOptionsFromEnv());
test('添加自定义字段', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, udf;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = generateRandomString();
                return [4 /*yield*/, managementClient.udf.set(UdfTargetType.User, key, UdfDataType.String, '学校')];
            case 1:
                udf = _a.sent();
                t.assert(udf.targetType === UdfTargetType.User);
                t.assert(udf.key === key);
                return [2 /*return*/];
        }
    });
}); });
test('获取自定义字段列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, udf, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = generateRandomString();
                return [4 /*yield*/, managementClient.udf.set(UdfTargetType.User, key, UdfDataType.String, '学校')];
            case 1:
                udf = _a.sent();
                return [4 /*yield*/, managementClient.udf.list(UdfTargetType.User)];
            case 2:
                list = _a.sent();
                t.assert(_.some(list, function (item) {
                    return item.key === udf.key;
                }));
                return [2 /*return*/];
        }
    });
}); });
test('删除自定义字段', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, udf, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = generateRandomString();
                return [4 /*yield*/, managementClient.udf.set(UdfTargetType.User, key, UdfDataType.String, '学校')];
            case 1:
                udf = _a.sent();
                return [4 /*yield*/, managementClient.udf.remove(UdfTargetType.User, key)];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.udf.list(UdfTargetType.User)];
            case 3:
                list = _a.sent();
                t.assert(!_.some(list, function (item) {
                    return item.key === udf.key;
                }));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVWRmTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1VkZk1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RSxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRSxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztBQUVuRSxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2YsR0FBRyxHQUFHLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3hDLGFBQWEsQ0FBQyxJQUFJLEVBQ2xCLEdBQUcsRUFDSCxXQUFXLENBQUMsTUFBTSxFQUNsQixJQUFJLENBQ0wsRUFBQTs7Z0JBTEssR0FBRyxHQUFHLFNBS1g7Z0JBQ0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O0tBQzNCLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDakIsR0FBRyxHQUFHLG9CQUFvQixFQUFFLENBQUM7Z0JBQ3ZCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3hDLGFBQWEsQ0FBQyxJQUFJLEVBQ2xCLEdBQUcsRUFDSCxXQUFXLENBQUMsTUFBTSxFQUNsQixJQUFJLENBQ0wsRUFBQTs7Z0JBTEssR0FBRyxHQUFHLFNBS1g7Z0JBQ1kscUJBQU0sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUE7O2dCQUExRCxJQUFJLEdBQUcsU0FBbUQ7Z0JBQ2hFLENBQUMsQ0FBQyxNQUFNLENBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxJQUFJO29CQUNmLE9BQU8sSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDOzs7O0tBQ0gsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNmLEdBQUcsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO2dCQUN2QixxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUN4QyxhQUFhLENBQUMsSUFBSSxFQUNsQixHQUFHLEVBQ0gsV0FBVyxDQUFDLE1BQU0sRUFDbEIsSUFBSSxDQUNMLEVBQUE7O2dCQUxLLEdBQUcsR0FBRyxTQUtYO2dCQUNELHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBQTs7Z0JBQTFELFNBQTBELENBQUM7Z0JBQzlDLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFBOztnQkFBMUQsSUFBSSxHQUFHLFNBQW1EO2dCQUNoRSxDQUFDLENBQUMsTUFBTSxDQUNOLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxJQUFJO29CQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQzs7OztLQUNILENBQUMsQ0FBQyJ9