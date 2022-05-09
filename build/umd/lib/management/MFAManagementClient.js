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
    exports.MFAManagementClient = void 0;
    /**
     * @class MFAManagementClient 管理多因素认证
     * @description 用于管理用户的 TOTP、人脸等 MFA信息
     *
     * @example
     *
     * 请使用以下方式使用该模块：
     * \`\`\`javascript
     * import { ManagementClient } from "authing-js-sdk"
     * const managementClient = new ManagementClient({
     *    userPoolId: "YOUR_USERPOOL_ID",
     *    secret: "YOUR_USERPOOL_SECRET",
     * })
     * managementClient.mfa.getStatus("USER_ID") // 获取用户 MFA 绑定状态
     * \`\`\`
     *
     * @name MFAManagementClient
     */
    var MFAManagementClient = /** @class */ (function () {
        function MFAManagementClient(options, graphqlClient, httpClient, tokenProvider) {
            this.options = options;
            this.httpClient = httpClient;
            this.graphqlClient = graphqlClient;
            this.tokenProvider = tokenProvider;
        }
        /**
         * @name getStatus
         * @name_zh 获取用户 MFA 绑定状态
         * @description 获取用户 MFA 绑定状态。
         *
         * @param {string} userId 用户 ID
         *
         * @example
         *
         * const mfaStatus = await managementClient.mfa.getStatus('USER_ID');
         *
         * @memberof MFAManagementClient
         */
        MFAManagementClient.prototype.getStatus = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: this.options.host + "/api/v2/users/" + userId + "/mfa-bound"
                            })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name unAssociateMfa
         * @name_zh 解绑用户 MFA
         * @description 解绑用户 MFA。
         *
         * @param {string} userId 用户 ID
         * @param {string} type 解绑类型，可选值有 'FACE', 'OTP'
         *
         * @example
         *
         * const mfaStatus = await managementClient.mfa.unAssociateMfa('USER_ID', 'FACE');
         *
         * @memberof MFAManagementClient
         */
        MFAManagementClient.prototype.unAssociateMfa = function (userId, type) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.httpClient.request({
                                method: 'DELETE',
                                url: this.options.host + "/api/v2/users/" + userId + "/mfa-bound?type=" + type
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * @name importTotp
         * @name_zh 将已有的 TOTP 的 secret 和恢复代码导入到 Authing，并为用户开启 TOTP 多因素认证
         * @description 设置用户 TOTP 的 secret 和恢复代码，并自动启用 MFA
         *
         * @param {string} userId 用户 ID
         * @param {string} secret TOTP 密钥
         * @param {string} recoveryCode 恢复代码
         *
         * @example
         *
         * const result = await managementClient.mfa.setTotp('USER_ID', 'SECRET', 'RECOVERY_CODE');
         *
         * @memberof MFAManagementClient
         */
        MFAManagementClient.prototype.importTotp = function (userId, secret, recoveryCode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!userId || !secret) {
                                throw new Error('请传入用户 ID、TOTP 密钥');
                            }
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: this.options.host + "/api/v2/mfa/totp/import",
                                    data: { userId: userId, secret: secret, recoveryCode: recoveryCode }
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return MFAManagementClient;
    }());
    exports.MFAManagementClient = MFAManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTUZBTWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9NRkFNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUtBOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNIO1FBTUUsNkJBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsVUFBc0IsRUFDdEIsYUFBc0M7WUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNHLHVDQUFTLEdBQWYsVUFBZ0IsTUFBYzs7Ozs7Z0NBQ2YscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Z0NBQ3pDLE1BQU0sRUFBRSxLQUFLO2dDQUNiLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksc0JBQWlCLE1BQU0sZUFBWTs2QkFDN0QsQ0FBQyxFQUFBOzs0QkFISSxJQUFJLEdBQUcsU0FHWDs0QkFDRixzQkFBTyxJQUFJLEVBQUM7Ozs7U0FDYjtRQUVEOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDRyw0Q0FBYyxHQUFwQixVQUFxQixNQUFjLEVBQUUsSUFBaUI7Ozs7Z0NBQ3BELHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2dDQUM1QixNQUFNLEVBQUUsUUFBUTtnQ0FDaEIsR0FBRyxFQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxzQkFBaUIsTUFBTSx3QkFBbUIsSUFBTTs2QkFDMUUsQ0FBQyxFQUFBOzs0QkFIRixTQUdFLENBQUM7NEJBQ0gsc0JBQU8sSUFBSSxFQUFDOzs7O1NBQ2I7UUFDRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNHLHdDQUFVLEdBQWhCLFVBQ0UsTUFBYyxFQUNkLE1BQWMsRUFDZCxZQUFxQjs7Ozs7NEJBRXJCLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0NBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs2QkFDckM7NEJBQ00scUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQ25DLE1BQU0sRUFBRSxNQUFNO29DQUNkLEdBQUcsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksNEJBQXlCO29DQUNsRCxJQUFJLEVBQUUsRUFBRSxNQUFNLFFBQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRTtpQ0FDdkMsQ0FBQyxFQUFBO2dDQUpGLHNCQUFPLFNBSUwsRUFBQzs7OztTQUNKO1FBQ0gsMEJBQUM7SUFBRCxDQUFDLEFBekZELElBeUZDO0lBekZZLGtEQUFtQiJ9