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
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbmNpcGFsTWFuYWdlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9QcmluY2lwYWxNYW5hZ2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVVBOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0g7UUFNRSxtQ0FDRSxPQUFnQyxFQUNoQyxhQUE0QixFQUM1QixVQUFzQixFQUN0QixhQUFzQztZQUV0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNyQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNHLDBDQUFNLEdBQVosVUFBYSxNQUFjOzs7Ozs7NEJBQ25CLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksc0JBQWlCLE1BQU0seUNBQXNDLENBQUM7NEJBRWhFLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29DQUMxRCxNQUFNLEVBQUUsS0FBSztvQ0FDYixHQUFHLEVBQUUsR0FBRztpQ0FDVCxDQUFDLEVBQUE7OzRCQUhJLElBQUksR0FBb0IsU0FHNUI7NEJBQ0Ysc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csZ0RBQVksR0FBbEIsVUFBbUIsTUFBYyxFQUFFLElBQW9COzs7Ozs7NEJBQy9DLEdBQUcsR0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksc0JBQWlCLE1BQU0seUNBQXNDLENBQUM7NEJBUzlGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7Z0NBQ3JCLE1BQU0sR0FBRztvQ0FDUCxJQUFJLEVBQUUsR0FBRztvQ0FDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0NBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29DQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVE7aUNBQ25CLENBQUM7NkJBQ0g7aUNBQU07Z0NBQ0wsTUFBTSxHQUFHO29DQUNQLElBQUksRUFBRSxHQUFHO29DQUNULElBQUksRUFBRSxJQUFJLENBQUMsY0FBYztvQ0FDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO29DQUMzQixHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWU7aUNBQzFCLENBQUM7NkJBQ0g7NEJBRUQscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQzVCLE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBRSxHQUFHO29DQUNSLElBQUksRUFBRSxNQUFNO2lDQUNiLENBQUMsRUFBQTs7NEJBSkYsU0FJRSxDQUFDOzRCQUVILHNCQUFPLElBQUksRUFBQzs7OztTQUNiO1FBQ0gsZ0NBQUM7SUFBRCxDQUFDLEFBMUZELElBMEZDO0lBMUZZLDhEQUF5QiJ9