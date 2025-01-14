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
        define(["require", "exports", "./ManagementClient", "../testing-helper", "ava", "../../types/graphql.v2", "lodash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ManagementClient_1 = require("./ManagementClient");
    var testing_helper_1 = require("../testing-helper");
    var ava_1 = __importDefault(require("ava"));
    var graphql_v2_1 = require("../../types/graphql.v2");
    var lodash_1 = __importDefault(require("lodash"));
    var managementClient = new ManagementClient_1.ManagementClient(testing_helper_1.getOptionsFromEnv());
    ava_1.default('添加自定义字段', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var key, udf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, '学校')];
                case 1:
                    udf = _a.sent();
                    t.assert(udf.targetType === graphql_v2_1.UdfTargetType.User);
                    t.assert(udf.key === key);
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('获取自定义字段列表', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var key, udf, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, '学校')];
                case 1:
                    udf = _a.sent();
                    return [4 /*yield*/, managementClient.udf.list(graphql_v2_1.UdfTargetType.User)];
                case 2:
                    list = _a.sent();
                    t.assert(lodash_1.default.some(list, function (item) {
                        return item.key === udf.key;
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    ava_1.default('删除自定义字段', function (t) { return __awaiter(void 0, void 0, void 0, function () {
        var key, udf, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = testing_helper_1.generateRandomString();
                    return [4 /*yield*/, managementClient.udf.set(graphql_v2_1.UdfTargetType.User, key, graphql_v2_1.UdfDataType.String, '学校')];
                case 1:
                    udf = _a.sent();
                    return [4 /*yield*/, managementClient.udf.remove(graphql_v2_1.UdfTargetType.User, key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, managementClient.udf.list(graphql_v2_1.UdfTargetType.User)];
                case 3:
                    list = _a.sent();
                    t.assert(!lodash_1.default.some(list, function (item) {
                        return item.key === udf.key;
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVWRmTWFuYWdlbWVudENsaWVudC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9tYW5hZ2VtZW50L1VkZk1hbmFnZW1lbnRDbGllbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHVEQUFzRDtJQUN0RCxvREFBNEU7SUFDNUUsNENBQXVCO0lBQ3ZCLHFEQUFvRTtJQUNwRSxrREFBdUI7SUFFdkIsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLG1DQUFnQixDQUFDLGtDQUFpQixFQUFFLENBQUMsQ0FBQztJQUVuRSxhQUFJLENBQUMsU0FBUyxFQUFFLFVBQU0sQ0FBQzs7Ozs7b0JBQ2YsR0FBRyxHQUFHLHFDQUFvQixFQUFFLENBQUM7b0JBQ3ZCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3hDLDBCQUFhLENBQUMsSUFBSSxFQUNsQixHQUFHLEVBQ0gsd0JBQVcsQ0FBQyxNQUFNLEVBQ2xCLElBQUksQ0FDTCxFQUFBOztvQkFMSyxHQUFHLEdBQUcsU0FLWDtvQkFDRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssMEJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7O1NBQzNCLENBQUMsQ0FBQztJQUVILGFBQUksQ0FBQyxXQUFXLEVBQUUsVUFBTSxDQUFDOzs7OztvQkFDakIsR0FBRyxHQUFHLHFDQUFvQixFQUFFLENBQUM7b0JBQ3ZCLHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3hDLDBCQUFhLENBQUMsSUFBSSxFQUNsQixHQUFHLEVBQ0gsd0JBQVcsQ0FBQyxNQUFNLEVBQ2xCLElBQUksQ0FDTCxFQUFBOztvQkFMSyxHQUFHLEdBQUcsU0FLWDtvQkFDWSxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUFhLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUExRCxJQUFJLEdBQUcsU0FBbUQ7b0JBQ2hFLENBQUMsQ0FBQyxNQUFNLENBQ04sZ0JBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUEsSUFBSTt3QkFDZixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQzs7OztTQUNILENBQUMsQ0FBQztJQUVILGFBQUksQ0FBQyxTQUFTLEVBQUUsVUFBTSxDQUFDOzs7OztvQkFDZixHQUFHLEdBQUcscUNBQW9CLEVBQUUsQ0FBQztvQkFDdkIscUJBQU0sZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FDeEMsMEJBQWEsQ0FBQyxJQUFJLEVBQ2xCLEdBQUcsRUFDSCx3QkFBVyxDQUFDLE1BQU0sRUFDbEIsSUFBSSxDQUNMLEVBQUE7O29CQUxLLEdBQUcsR0FBRyxTQUtYO29CQUNELHFCQUFNLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsMEJBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUE7O29CQUExRCxTQUEwRCxDQUFDO29CQUM5QyxxQkFBTSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUFhLENBQUMsSUFBSSxDQUFDLEVBQUE7O29CQUExRCxJQUFJLEdBQUcsU0FBbUQ7b0JBQ2hFLENBQUMsQ0FBQyxNQUFNLENBQ04sQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxJQUFJO3dCQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDOUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQzs7OztTQUNILENBQUMsQ0FBQyJ9