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
var lodash_1 = __importDefault(require("lodash"));
var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
ava_1.default('获取环境变量列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
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
ava_1.default('添加环境变量', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = testing_helper_1.generateRandomString();
                return [4 /*yield*/, managementClient.userpool.addEnv(key, testing_helper_1.generateRandomString())];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.listEnv()];
            case 2:
                list = _a.sent();
                t.assert(lodash_1.default.some(list, function (item) { return item.key === key; }));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('删除环境变量', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var key, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = testing_helper_1.generateRandomString();
                return [4 /*yield*/, managementClient.userpool.addEnv(key, testing_helper_1.generateRandomString())];
            case 1:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.removeEnv(key)];
            case 2:
                _a.sent();
                return [4 /*yield*/, managementClient.userpool.listEnv()];
            case 3:
                list = _a.sent();
                t.assert(!lodash_1.default.some(list, function (item) { return item.key === key; }));
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnBvb2xNYW5hZ2VtZW50Q2xpZW50LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvVXNlcnBvb2xNYW5hZ2VtZW50Q2xpZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBc0Q7QUFDdEQsb0RBQTRFO0FBQzVFLDRDQUF1QjtBQUN2QixrREFBdUI7QUFFdkIsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLG1DQUFnQixDQUFDLGtDQUFpQixFQUFFLENBQUMsQ0FBQztBQUVuRSxhQUFJLENBQUMsVUFBVSxFQUFFLFVBQU0sQ0FBQzs7OztvQkFDVCxxQkFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUE7O2dCQUFoRCxJQUFJLEdBQUcsU0FBeUM7Z0JBQ3RELENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7S0FDaEIsQ0FBQyxDQUFDO0FBRUgsYUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFNLENBQUM7Ozs7O2dCQUNkLEdBQUcsR0FBRyxxQ0FBb0IsRUFBRSxDQUFDO2dCQUNuQyxxQkFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxxQ0FBb0IsRUFBRSxDQUFDLEVBQUE7O2dCQUFuRSxTQUFtRSxDQUFDO2dCQUN2RCxxQkFBTSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUE7O2dCQUFoRCxJQUFJLEdBQUcsU0FBeUM7Z0JBQ3RELENBQUMsQ0FBQyxNQUFNLENBQUMsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDOzs7O0tBQ2xELENBQUMsQ0FBQztBQUVILGFBQUksQ0FBQyxRQUFRLEVBQUUsVUFBTSxDQUFDOzs7OztnQkFDZCxHQUFHLEdBQUcscUNBQW9CLEVBQUUsQ0FBQztnQkFDbkMscUJBQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUscUNBQW9CLEVBQUUsQ0FBQyxFQUFBOztnQkFBbkUsU0FBbUUsQ0FBQztnQkFDcEUscUJBQU0sZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBQTs7Z0JBQTlDLFNBQThDLENBQUM7Z0JBQ2xDLHFCQUFNLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBQTs7Z0JBQWhELElBQUksR0FBRyxTQUF5QztnQkFDdEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQzs7OztLQUNuRCxDQUFDLENBQUMifQ==