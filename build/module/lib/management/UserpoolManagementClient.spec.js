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
import _ from 'lodash';
var managementClient = new ManagementClient(getOptionsFromEnv());
test('获取环境变量列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, managementClient.userpool.listEnv()];
            case 1:
                data = _a.sent();
                t.assert(data);
                return [2 /*return*/];
        }
    });
}); });
test('添加环境变量', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = generateRandomString();
                return [4 /*yield*/, managementClient.userpool.addEnv(key, generateRandomString())];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.listEnv()];
            case 2:
                list = _a.sent();
                t.assert(_.some(list, function (item) { return item.key === key; }));
                return [2 /*return*/];
        }
    });
}); });
test('删除环境变量', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = generateRandomString();
                return [4 /*yield*/, managementClient.userpool.addEnv(key, generateRandomString())];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.removeEnv(key)];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.listEnv()];
            case 3:
                list = _a.sent();
                t.assert(!_.some(list, function (item) { return item.key === key; }));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnBvb2xNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvVXNlcnBvb2xNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUUsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUV2QixJQUFNLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0FBRW5FLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBTSxDQUFDOzs7O29CQUNULHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7Z0JBQWhELElBQUksR0FBRyxTQUF5QztnQkFDdEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztLQUNoQixDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2QsR0FBRyxHQUFHLG9CQUFvQixFQUFFLENBQUM7Z0JBQ25DLHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFBQTs7Z0JBQW5FLFNBQW1FLENBQUM7Z0JBQ3ZELHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7Z0JBQWhELElBQUksR0FBRyxTQUF5QztnQkFDdEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQzs7OztLQUNsRCxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQU0sQ0FBQzs7Ozs7Z0JBQ2QsR0FBRyxHQUFHLG9CQUFvQixFQUFFLENBQUM7Z0JBQ25DLHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsRUFBQTs7Z0JBQW5FLFNBQW1FLENBQUM7Z0JBQ3BFLHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUE7O2dCQUE5QyxTQUE4QyxDQUFDO2dCQUNsQyxxQkFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUE7O2dCQUFoRCxJQUFJLEdBQUcsU0FBeUM7Z0JBQ3RELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQzs7OztLQUNuRCxDQUFDLENBQUMifQ==