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
        define(["require", "exports", "./BaseAuthenticationClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PrincipalAuthenticationClient = void 0;
    var BaseAuthenticationClient_1 = require("./BaseAuthenticationClient");
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
            this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(options);
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
    exports.PrincipalAuthenticationClient = PrincipalAuthenticationClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbmNpcGFsQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL1ByaW5jaXBhbEF1dGhlbnRpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFBLHVFQUFzRTtJQUV0RTs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNIO1FBTUUsdUNBQ0UsT0FBb0MsRUFDcEMsYUFBMEMsRUFDMUMsVUFBc0I7WUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1EQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csOENBQU0sR0FBWjs7Ozs7OzRCQUNRLEdBQUcsR0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sMkNBQXdDLENBQUM7NEJBRWpELHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29DQUMxRCxNQUFNLEVBQUUsS0FBSztvQ0FDYixHQUFHLEVBQUUsR0FBRztpQ0FDVCxDQUFDLEVBQUE7OzRCQUhJLElBQUksR0FBb0IsU0FHNUI7NEJBQ0Ysc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFFRDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0csb0RBQVksR0FBbEIsVUFBbUIsSUFBb0I7Ozs7Ozs0QkFDL0IsR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTywyQ0FBd0MsQ0FBQzs0QkFTL0UsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtnQ0FDckIsTUFBTSxHQUFHO29DQUNQLElBQUksRUFBRSxHQUFHO29DQUNULElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQ0FDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0NBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUTtpQ0FDbkIsQ0FBQzs2QkFDSDtpQ0FBTTtnQ0FDTCxNQUFNLEdBQUc7b0NBQ1AsSUFBSSxFQUFFLEdBQUc7b0NBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjO29DQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWM7b0NBQzNCLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZTtpQ0FDMUIsQ0FBQzs2QkFDSDs0QkFFRCxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztvQ0FDNUIsTUFBTSxFQUFFLE1BQU07b0NBQ2QsR0FBRyxFQUFFLEdBQUc7b0NBQ1IsSUFBSSxFQUFFLE1BQU07aUNBQ2IsQ0FBQyxFQUFBOzs0QkFKRixTQUlFLENBQUM7NEJBRUgsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFDSCxvQ0FBQztJQUFELENBQUMsQUF6RkQsSUF5RkM7SUF6Rlksc0VBQTZCIn0=