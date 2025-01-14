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
        define(["require", "exports", "jwt-decode", "../graphqlapi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManagementTokenProvider = void 0;
    var jwt_decode_1 = __importDefault(require("jwt-decode"));
    var graphqlapi_1 = require("../graphqlapi");
    var ManagementTokenProvider = /** @class */ (function () {
        function ManagementTokenProvider(options, graphqlClient) {
            this.options = options;
            this.graphqlClient = graphqlClient;
            var accessToken = this.options.accessToken;
            if (accessToken) {
                this._accessToken = accessToken;
                var decoded = jwt_decode_1.default(accessToken);
                var exp = decoded.exp;
                this._accessTokenExpriredAt = exp * 1000;
            }
        }
        /**
         * 发送 GraphQL 接口请求获取 accessToken
         *
         * @returns
         * @memberof ManagementTokenProvider
         */
        ManagementTokenProvider.prototype.getClientWhenSdkInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.getAccessToken(this.graphqlClient, {
                                userPoolId: this.options.userPoolId,
                                secret: this.options.secret
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.accessToken.accessToken];
                    }
                });
            });
        };
        /**
         * 刷新 accessToken
         *
         * @memberof ManagementTokenProvider
         */
        ManagementTokenProvider.prototype.refreshToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, graphqlapi_1.refreshAccessToken(this.graphqlClient, {
                                accessToken: this.options.accessToken
                            })];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res.refreshAccessToken.accessToken];
                    }
                });
            });
        };
        /**
         * 获取用户池 accessToken
         *
         * @returns {Promise<string>}
         * @memberof ManagementTokenProvider
         */
        ManagementTokenProvider.prototype.getToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.options.accessToken) {
                                return [2 /*return*/, this.options.accessToken];
                            }
                            // 缓存到 accessToken 过期前 3600 s
                            if (this._accessToken &&
                                this._accessTokenExpriredAt > new Date().getTime() + 3600 * 1000) {
                                return [2 /*return*/, this._accessToken];
                            }
                            return [4 /*yield*/, this.getAccessTokenFromServer()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * 刷新用户池 accessToken
         *
         * @returns
         * @memberof ManagementTokenProvider
         */
        ManagementTokenProvider.prototype.getAccessTokenFromServer = function () {
            return __awaiter(this, void 0, void 0, function () {
                var accessToken, decoded, exp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            accessToken = null;
                            if (!this.options.secret) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getClientWhenSdkInit()];
                        case 1:
                            accessToken = _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.refreshToken()];
                        case 3:
                            accessToken = _a.sent();
                            _a.label = 4;
                        case 4:
                            this._accessToken = accessToken;
                            decoded = jwt_decode_1.default(this._accessToken);
                            exp = decoded.exp;
                            this._accessTokenExpriredAt = exp * 1000;
                            return [2 /*return*/, this._accessToken];
                    }
                });
            });
        };
        return ManagementTokenProvider;
    }());
    exports.ManagementTokenProvider = ManagementTokenProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlbWVudFRva2VuUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvTWFuYWdlbWVudFRva2VuUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUEsMERBQW1DO0lBQ25DLDRDQUFtRTtJQUVuRTtRQVVFLGlDQUFZLE9BQWdDLEVBQUUsYUFBNEI7WUFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7WUFFM0IsSUFBQSxXQUFXLEdBQUssSUFBSSxDQUFDLE9BQU8sWUFBakIsQ0FBa0I7WUFDckMsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7Z0JBQ2hDLElBQU0sT0FBTyxHQUF1QixvQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNuRCxJQUFBLEdBQUcsR0FBSyxPQUFPLElBQVosQ0FBYTtnQkFDeEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDMUM7UUFDSCxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDVyxzREFBb0IsR0FBbEM7Ozs7O2dDQUNjLHFCQUFNLDJCQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDbkQsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTtnQ0FDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTs2QkFDNUIsQ0FBQyxFQUFBOzs0QkFISSxHQUFHLEdBQUcsU0FHVjs0QkFDRixzQkFBTyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBQzs7OztTQUNwQztRQUVEOzs7O1dBSUc7UUFDVyw4Q0FBWSxHQUExQjs7Ozs7Z0NBQ2MscUJBQU0sK0JBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQ0FDdkQsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVzs2QkFDdEMsQ0FBQyxFQUFBOzs0QkFGSSxHQUFHLEdBQUcsU0FFVjs0QkFDRixzQkFBTyxHQUFHLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFDOzs7O1NBQzNDO1FBRUQ7Ozs7O1dBS0c7UUFDRywwQ0FBUSxHQUFkOzs7Ozs0QkFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dDQUM1QixzQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQzs2QkFDakM7NEJBRUQsNkJBQTZCOzRCQUM3QixJQUNFLElBQUksQ0FBQyxZQUFZO2dDQUNqQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUNoRTtnQ0FDQSxzQkFBTyxJQUFJLENBQUMsWUFBWSxFQUFDOzZCQUMxQjs0QkFDTSxxQkFBTSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsRUFBQTtnQ0FBNUMsc0JBQU8sU0FBcUMsRUFBQzs7OztTQUM5QztRQUVEOzs7OztXQUtHO1FBQ1csMERBQXdCLEdBQXRDOzs7Ozs7NEJBRU0sV0FBVyxHQUFHLElBQUksQ0FBQztpQ0FDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQW5CLHdCQUFtQjs0QkFDUCxxQkFBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBQTs7NEJBQS9DLFdBQVcsR0FBRyxTQUFpQyxDQUFDOztnQ0FFbEMscUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFBOzs0QkFBdkMsV0FBVyxHQUFHLFNBQXlCLENBQUM7Ozs0QkFHMUMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7NEJBQzFCLE9BQU8sR0FBdUIsb0JBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3pELEdBQUcsR0FBSyxPQUFPLElBQVosQ0FBYTs0QkFDeEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7NEJBQ3pDLHNCQUFPLElBQUksQ0FBQyxZQUFZLEVBQUM7Ozs7U0FDMUI7UUFDSCw4QkFBQztJQUFELENBQUMsQUEzRkQsSUEyRkM7SUEzRlksMERBQXVCIn0=