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
        define(["require", "exports", "../../types/graphql.v2", "../graphqlapi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhitelistManagementClient = void 0;
    var graphql_v2_1 = require("../../types/graphql.v2");
    var graphqlapi_1 = require("../graphqlapi");
    /**
     * @name WhitelistManagementClient
     * @description 为你的用户池配置一个注册白名单，类似于邀请注册规则，开启后，只有白名单里的用户才能进行注册。 Authing 目前支持的白名单方式有手机号、邮箱、用户名。
     *
     * 此模块可以用于对注册白名单进行管理。
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
     * managementClient.whitelist.list // 获取注册白名单记录
     * managementClient.whitelist.add // 添加白名单记录
     * managementClient.whitelist.remove // 移除白名单记录
     * \`\`\`
     *
     * @class WhitelistManagementClient 管理注册白名单
     */
    var WhitelistManagementClient = /** @class */ (function () {
        function WhitelistManagementClient(options, graphqlClient, tokenProvider) {
            this.options = options;
            this.graphqlClient = graphqlClient;
            this.tokenProvider = tokenProvider;
        }
        /**
         * @name list
         * @name_zh 获取白名单记录
         * @description 获取白名单记录
         *
         * @param {WhitelistType} type 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
         *
         * @example
         *
         * import { WhitelistType } from "authing-js-sdk"
         * const list = await managementClient.whitelist.list(WhitelistType.Email);
         *
         * @returns {Promise<WhiteList[]>}
         * @memberof WhitelistManagementClient
         */
        WhitelistManagementClient.prototype.list = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var whitelist;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.getWhiteList(this.graphqlClient, this.tokenProvider, {
                                type: type
                            })];
                        case 1:
                            whitelist = (_a.sent()).whitelist;
                            return [2 /*return*/, whitelist];
                    }
                });
            });
        };
        /**
         * @name add
         * @name_zh 添加白名单
         * @description 添加白名单
         *
         * @param {WhitelistType} type 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
         * @param {string[]} list 白名单列表，请注意邮箱不区分大小写。
         *
         * @example
         *
         * await managementClient.whitelist.add(WhitelistType.Email, 'a@example.com');
         *
         * @returns {Promise<WhiteList[]>}
         * @memberof WhitelistManagementClient
         */
        WhitelistManagementClient.prototype.add = function (type, list) {
            return __awaiter(this, void 0, void 0, function () {
                var whiteList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.addWhiteList(this.graphqlClient, this.tokenProvider, {
                                type: type,
                                list: list
                            })];
                        case 1:
                            whiteList = (_a.sent()).addWhitelist;
                            return [2 /*return*/, whiteList];
                    }
                });
            });
        };
        /**
         * @name remove
         * @name_zh 移除白名单
         * @description 移除白名单
         *
         * @param {WhitelistType} type 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
         * @param {string[]} list 白名单列表，请注意邮箱不区分大小写。
         *
         * @example
         *
         * await managementClient.whitelist.remove(WhitelistType.Email, 'a@example.com');
         *
         *
         * @returns {Promise<WhiteList[]>}
         * @memberof WhitelistManagementClient
         */
        WhitelistManagementClient.prototype.remove = function (type, list) {
            return __awaiter(this, void 0, void 0, function () {
                var whiteList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.removeWhiteList(this.graphqlClient, this.tokenProvider, {
                                type: type,
                                list: list
                            })];
                        case 1:
                            whiteList = (_a.sent()).removeWhitelist;
                            return [2 /*return*/, whiteList];
                    }
                });
            });
        };
        /**
         * @name enable
         * @name_zh 开启白名单
         * @description 开启白名单
         *
         * @param {WhitelistType} type 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
         *
         * @example
         *
         *
         * // 添加白名单
         *
         * import { WhitelistType } from "authing-js-sdk"
         * await managementClient.whitelist.enable(WhitelistType.Email);
         * await managementClient.whitelist.add(WhitelistType.Email, [‘a@wxample.com’]);
         *
         * // 使用不在白名单内的账号注册，不提示无法注册。
         *
         * await authing.registerByEmail(email, 'b@example.com');
         *
         * @memberof WhitelistManagementClient
         */
        WhitelistManagementClient.prototype.enable = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var updates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            updates = {};
                            if (type === graphql_v2_1.WhitelistType.Email) {
                                updates.emailEnabled = true;
                            }
                            else if (type === graphql_v2_1.WhitelistType.Phone) {
                                updates.phoneEnabled = true;
                            }
                            else if (type === graphql_v2_1.WhitelistType.Username) {
                                updates.usernameEnabled = true;
                            }
                            else {
                                this.options.onError(500, '不支持的白名单类型');
                            }
                            return [4 /*yield*/, graphqlapi_1.updateUserpool(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        whitelist: updates
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @name disable
         * @name_zh 关闭白名单
         * @description 关闭白名单
         *
         * @param {WhitelistType} type 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
         *
         * @memberof WhitelistManagementClient
         */
        WhitelistManagementClient.prototype.disable = function (type) {
            return __awaiter(this, void 0, void 0, function () {
                var updates;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            updates = {};
                            if (type === graphql_v2_1.WhitelistType.Email) {
                                updates.emailEnabled = false;
                            }
                            else if (type === graphql_v2_1.WhitelistType.Phone) {
                                updates.phoneEnabled = false;
                            }
                            else if (type === graphql_v2_1.WhitelistType.Username) {
                                updates.usernameEnabled = false;
                            }
                            else {
                                this.options.onError(500, '不支持的白名单类型');
                            }
                            return [4 /*yield*/, graphqlapi_1.updateUserpool(this.graphqlClient, this.tokenProvider, {
                                    input: {
                                        whitelist: updates
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return WhitelistManagementClient;
    }());
    exports.WhitelistManagementClient = WhitelistManagementClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2hpdGVsaXN0TWFuYWdlbWVudENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbWFuYWdlbWVudC9XaGl0ZWxpc3RNYW5hZ2VtZW50Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHFEQUlnQztJQUNoQyw0Q0FLdUI7SUFLdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNIO1FBS0UsbUNBQ0UsT0FBZ0MsRUFDaEMsYUFBNEIsRUFDNUIsYUFBc0M7WUFFdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0csd0NBQUksR0FBVixVQUFXLElBQW1COzs7OztnQ0FDTixxQkFBTSx5QkFBWSxDQUN0QyxJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsYUFBYSxFQUNsQjtnQ0FDRSxJQUFJLE1BQUE7NkJBQ0wsQ0FDRixFQUFBOzs0QkFOTyxTQUFTLEdBQUssQ0FBQSxTQU1yQixDQUFBLFVBTmdCOzRCQVFqQixzQkFBTyxTQUFTLEVBQUM7Ozs7U0FDbEI7UUFFRDs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNHLHVDQUFHLEdBQVQsVUFBVSxJQUFtQixFQUFFLElBQWM7Ozs7O2dDQUNQLHFCQUFNLHlCQUFZLENBQ3BELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQ2xCO2dDQUNFLElBQUksTUFBQTtnQ0FDSixJQUFJLE1BQUE7NkJBQ0wsQ0FDRixFQUFBOzs0QkFQcUIsU0FBUyxHQUFLLENBQUEsU0FPbkMsQ0FBQSxhQVA4Qjs0QkFTL0Isc0JBQU8sU0FBUyxFQUFDOzs7O1NBQ2xCO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0csMENBQU0sR0FBWixVQUFhLElBQW1CLEVBQUUsSUFBYzs7Ozs7Z0NBQ1AscUJBQU0sNEJBQWUsQ0FDMUQsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFDbEI7Z0NBQ0UsSUFBSSxNQUFBO2dDQUNKLElBQUksTUFBQTs2QkFDTCxDQUNGLEVBQUE7OzRCQVB3QixTQUFTLEdBQUssQ0FBQSxTQU90QyxDQUFBLGdCQVBpQzs0QkFTbEMsc0JBQU8sU0FBUyxFQUFDOzs7O1NBQ2xCO1FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXFCRztRQUNHLDBDQUFNLEdBQVosVUFBYSxJQUFtQjs7Ozs7OzRCQUN4QixPQUFPLEdBQWlDLEVBQUUsQ0FBQzs0QkFDakQsSUFBSSxJQUFJLEtBQUssMEJBQWEsQ0FBQyxLQUFLLEVBQUU7Z0NBQ2hDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzZCQUM3QjtpQ0FBTSxJQUFJLElBQUksS0FBSywwQkFBYSxDQUFDLEtBQUssRUFBRTtnQ0FDdkMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7NkJBQzdCO2lDQUFNLElBQUksSUFBSSxLQUFLLDBCQUFhLENBQUMsUUFBUSxFQUFFO2dDQUMxQyxPQUFPLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs2QkFDaEM7aUNBQU07Z0NBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDOzZCQUN4Qzs0QkFDRCxxQkFBTSwyQkFBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQ0FDM0QsS0FBSyxFQUFFO3dDQUNMLFNBQVMsRUFBRSxPQUFPO3FDQUNuQjtpQ0FDRixDQUFDLEVBQUE7OzRCQUpGLFNBSUUsQ0FBQzs7Ozs7U0FDSjtRQUVEOzs7Ozs7OztXQVFHO1FBQ0csMkNBQU8sR0FBYixVQUFjLElBQW1COzs7Ozs7NEJBQ3pCLE9BQU8sR0FBaUMsRUFBRSxDQUFDOzRCQUNqRCxJQUFJLElBQUksS0FBSywwQkFBYSxDQUFDLEtBQUssRUFBRTtnQ0FDaEMsT0FBTyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7NkJBQzlCO2lDQUFNLElBQUksSUFBSSxLQUFLLDBCQUFhLENBQUMsS0FBSyxFQUFFO2dDQUN2QyxPQUFPLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs2QkFDOUI7aUNBQU0sSUFBSSxJQUFJLEtBQUssMEJBQWEsQ0FBQyxRQUFRLEVBQUU7Z0NBQzFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDOzZCQUNqQztpQ0FBTTtnQ0FDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7NkJBQ3hDOzRCQUNELHFCQUFNLDJCQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO29DQUMzRCxLQUFLLEVBQUU7d0NBQ0wsU0FBUyxFQUFFLE9BQU87cUNBQ25CO2lDQUNGLENBQUMsRUFBQTs7NEJBSkYsU0FJRSxDQUFDOzs7OztTQUNKO1FBQ0gsZ0NBQUM7SUFBRCxDQUFDLEFBcktELElBcUtDO0lBcktZLDhEQUF5QiJ9