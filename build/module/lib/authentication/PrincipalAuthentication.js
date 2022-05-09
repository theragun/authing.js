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
import { BaseAuthenticationClient } from './BaseAuthenticationClient';
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
var PrincipalAuthenticationClient = /** @class */ (function () {
    function PrincipalAuthenticationClient(options, tokenProvider, httpClient) {
        this.options = options;
        this.tokenProvider = tokenProvider;
        this.httpClient = httpClient;
        this.baseClient = new BaseAuthenticationClient(options);
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
    PrincipalAuthenticationClient.prototype.detail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.baseClient.appHost + "/api/v2/users/principal_authentication";
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
    PrincipalAuthenticationClient.prototype.authenticate = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var api, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        api = this.baseClient.appHost + "/api/v2/users/principal_authentication";
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
    return PrincipalAuthenticationClient;
}());
export { PrincipalAuthenticationClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbmNpcGFsQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL1ByaW5jaXBhbEF1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0g7SUFNRSx1Q0FDRSxPQUFvQyxFQUNwQyxhQUEwQyxFQUMxQyxVQUFzQjtRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDRyw4Q0FBTSxHQUFaOzs7Ozs7d0JBQ1EsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTywyQ0FBd0MsQ0FBQzt3QkFFakQscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQzFELE1BQU0sRUFBRSxLQUFLO2dDQUNiLEdBQUcsRUFBRSxHQUFHOzZCQUNULENBQUMsRUFBQTs7d0JBSEksSUFBSSxHQUFvQixTQUc1Qjt3QkFDRixzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDRyxvREFBWSxHQUFsQixVQUFtQixJQUFvQjs7Ozs7O3dCQUMvQixHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLDJDQUF3QyxDQUFDO3dCQVMvRSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFOzRCQUNyQixNQUFNLEdBQUc7Z0NBQ1AsSUFBSSxFQUFFLEdBQUc7Z0NBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dDQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFROzZCQUNuQixDQUFDO3lCQUNIOzZCQUFNOzRCQUNMLE1BQU0sR0FBRztnQ0FDUCxJQUFJLEVBQUUsR0FBRztnQ0FDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWM7Z0NBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYztnQ0FDM0IsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlOzZCQUMxQixDQUFDO3lCQUNIO3dCQUVELHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUM1QixNQUFNLEVBQUUsTUFBTTtnQ0FDZCxHQUFHLEVBQUUsR0FBRztnQ0FDUixJQUFJLEVBQUUsTUFBTTs2QkFDYixDQUFDLEVBQUE7O3dCQUpGLFNBSUUsQ0FBQzt3QkFFSCxzQkFBTyxJQUFJLEVBQUM7Ozs7S0FDYjtJQUNILG9DQUFDO0FBQUQsQ0FBQyxBQXpGRCxJQXlGQyJ9