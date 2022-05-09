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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserActionManagementClient = void 0;
    var utils_1 = require("../utils");
    /**
     * @class UserActionManagementClient 审计管理
     * @name UserActionManagementClient
     * @description 应用管理
     *
     * @example
     *
     * 请使用以下方式使用该模块：
     * \`\`\`javascript
     * import { UserActionManagementClient } from "authing-js-sdk"
     * const managementClient = new ManagementClient({
     *    userPoolId: "YOUR_USERPOOL_ID",
     *    secret: "YOUR_USERPOOL_SECRET",
     * })
     * managementClient.userAction.list    // 列表查询
     * managementClient.userAction.export // 日志导出
     * \`\`\`
     *
     */
    var UserActionManagementClient = /** @class */ (function () {
        function UserActionManagementClient(options, httpClient, tokenProvider) {
            this.options = options;
            this.httpClient = httpClient;
            this.tokenProvider = tokenProvider;
        }
        /**
         * 审计日志列表
         * @param options.page 当前页数
         * @param options.limit 每页显示条数
         * @param options.clientIp 客户端 IP 地址
         * @param options.operationName 操作类型
         * @param options.operatoArn 用户 Arn 通过 searchUser 方法获得
         * @returns Promise<UserActions>
         */
        UserActionManagementClient.prototype.list = function (options) {
            var _a, _b;
            if (options === void 0) { options = {
                page: 1,
                limit: 10
            }; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/analysis/user-action?" +
                                    utils_1.serialize({
                                        page: (_a = options.page) === null || _a === void 0 ? void 0 : _a.toString(),
                                        limit: (_b = options.limit) === null || _b === void 0 ? void 0 : _b.toString(),
                                        clientip: options.clientIp,
                                        operation_name: options.operationName,
                                        operator_arn: options.operatoArn
                                    })
                            })];
                        case 1:
                            result = _c.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        return UserActionManagementClient;
    }());
    exports.UserActionManagementClient = UserActionManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckFjdGlvbk1hbmFnZW1lbnRDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvVXNlckFjdGlvbk1hbmFnZW1lbnRDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0Esa0NBQXFDO0lBRXJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSDtRQUtFLG9DQUNFLE9BQWdDLEVBQ2hDLFVBQXNCLEVBQ3RCLGFBQXNDO1lBRXRDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLENBQUM7UUFFRDs7Ozs7Ozs7V0FRRztRQUNVLHlDQUFJLEdBQWpCLFVBQ0UsT0FTQzs7WUFURCx3QkFBQSxFQUFBO2dCQU9FLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxFQUFFO2FBQ1Y7Ozs7O2dDQUVjLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUMzQyxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGtDQUErQjtvQ0FDbkQsaUJBQVMsQ0FBQzt3Q0FDUixJQUFJLEVBQUUsTUFBQSxPQUFPLENBQUMsSUFBSSwwQ0FBRSxRQUFRLEVBQUU7d0NBQzlCLEtBQUssRUFBRSxNQUFBLE9BQU8sQ0FBQyxLQUFLLDBDQUFFLFFBQVEsRUFBRTt3Q0FDaEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO3dDQUMxQixjQUFjLEVBQUUsT0FBTyxDQUFDLGFBQWE7d0NBQ3JDLFlBQVksRUFBRSxPQUFPLENBQUMsVUFBVTtxQ0FDakMsQ0FBQzs2QkFDTCxDQUFDLEVBQUE7OzRCQVhJLE1BQU0sR0FBRyxTQVdiOzRCQUNGLHNCQUFPLE1BQU0sRUFBQzs7OztTQUNmO1FBQ0gsaUNBQUM7SUFBRCxDQUFDLEFBbERELElBa0RDO0lBbERZLGdFQUEwQiJ9