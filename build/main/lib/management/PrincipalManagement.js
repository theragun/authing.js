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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrincipalManagementClient = void 0;
/**
 * @class PrincipalAuthenticationClient 主体认证模块
 * @description 此模块用于进行主体认证。
 *
 * 请求主体认证信息：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.principal.detail()
 * \`\`\`
 *
 *
 * @name PrincipalAuthenticationClient
 */
var PrincipalManagementClient = /** @class */ (function () {
    function PrincipalManagementClient(options, graphqlClient, httpClient, tokenProvider) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        this.httpClient = httpClient;
        this.tokenProvider = tokenProvider;
    }
    /**
     * @name detail
     * @name_zh 获取主体认证详情
     * @description 获取主体认证详情，未认证时返回 null
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.principal.detail()
     *
     * @returns {Promise<PrincipalDetail | null>}
     * @memberof PrincipalAuthenticationClient
     */
    PrincipalManagementClient.prototype.detail = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/users/" + userId + "/management/principal_authentication";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: api
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * @name authentication
     * @name_zh 进行主体认证
     * @description 获取主体认证详情，未认证时返回 null
     *
     * @example
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * const authenticators = await authenticationClient.principal.authenticate()
     *
     * @returns {Promise<boolean>}
     * @memberof PrincipalAuthenticationClient
     */
    PrincipalManagementClient.prototype.authenticate = function (userId, info) {
        return __awaiter(this, void 0, void 0, function () {
            var api, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.options.host + "/api/v2/users/" + userId + "/management/principal_authentication";
                        if (info.type === 'P') {
                            params = {
                                type: 'P',
                                name: info.name,
                                idCard: info.idCard,
                                ext: info.bankCard
                            };
                        }
                        else {
                            params = {
                                type: 'E',
                                name: info.enterpriseName,
                                idCard: info.enterpriseCode,
                                ext: info.legalPersonName
                            };
                        }
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'POST',
                                url: api,
                                data: params
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return PrincipalManagementClient;
}());
exports.PrincipalManagementClient = PrincipalManagementClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbmNpcGFsTWFuYWdlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9QcmluY2lwYWxNYW5hZ2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0g7SUFNRSxtQ0FDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixVQUFzQixFQUN0QixhQUFzQztRQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNHLDBDQUFNLEdBQVosVUFBYSxNQUFjOzs7Ozs7d0JBQ25CLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksc0JBQWlCLE1BQU0seUNBQXNDLENBQUM7d0JBRWhFLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUMxRCxNQUFNLEVBQUUsS0FBSztnQ0FDYixHQUFHLEVBQUUsR0FBRzs2QkFDVCxDQUFDLEVBQUE7O3dCQUhJLElBQUksR0FBb0IsU0FHNUI7d0JBQ0Ysc0JBQU8sSUFBSSxFQUFDOzs7O0tBQ2I7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0csZ0RBQVksR0FBbEIsVUFBbUIsTUFBYyxFQUFFLElBQW9COzs7Ozs7d0JBQy9DLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksc0JBQWlCLE1BQU0seUNBQXNDLENBQUM7d0JBUzlGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7NEJBQ3JCLE1BQU0sR0FBRztnQ0FDUCxJQUFJLEVBQUUsR0FBRztnQ0FDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0NBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dDQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7NkJBQ25CLENBQUM7eUJBQ0g7NkJBQU07NEJBQ0wsTUFBTSxHQUFHO2dDQUNQLElBQUksRUFBRSxHQUFHO2dDQUNULElBQUksRUFBRSxJQUFJLENBQUMsY0FBYztnQ0FDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO2dDQUMzQixHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWU7NkJBQzFCLENBQUM7eUJBQ0g7d0JBRUQscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQzVCLE1BQU0sRUFBRSxNQUFNO2dDQUNkLEdBQUcsRUFBRSxHQUFHO2dDQUNSLElBQUksRUFBRSxNQUFNOzZCQUNiLENBQUMsRUFBQTs7d0JBSkYsU0FJRSxDQUFDO3dCQUVILHNCQUFPLElBQUksRUFBQzs7OztLQUNiO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBMUZELElBMEZDO0FBMUZZLDhEQUF5QiJ9