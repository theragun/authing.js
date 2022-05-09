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
import jwtDecode from 'jwt-decode';
import { getAccessToken, refreshAccessToken } from '../graphqlapi';
var ManagementTokenProvider = /** @class */ (function () {
    function ManagementTokenProvider(options, graphqlClient) {
        this.options = options;
        this.graphqlClient = graphqlClient;
        var accessToken = this.options.accessToken;
        if (accessToken) {
            this._accessToken = accessToken;
            var decoded = jwtDecode(accessToken);
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
                    case 0: return [4 /*yield*/, getAccessToken(this.graphqlClient, {
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
                    case 0: return [4 /*yield*/, refreshAccessToken(this.graphqlClient, {
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
                        decoded = jwtDecode(this._accessToken);
                        exp = decoded.exp;
                        this._accessTokenExpriredAt = exp * 1000;
                        return [2 /*return*/, this._accessToken];
                }
            });
        });
    };
    return ManagementTokenProvider;
}());
export { ManagementTokenProvider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlbWVudFRva2VuUHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21hbmFnZW1lbnQvTWFuYWdlbWVudFRva2VuUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsT0FBTyxTQUFTLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkU7SUFVRSxpQ0FBWSxPQUFnQyxFQUFFLGFBQTRCO1FBQ3hFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBRTNCLElBQUEsV0FBVyxHQUFLLElBQUksQ0FBQyxPQUFPLFlBQWpCLENBQWtCO1FBQ3JDLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDaEMsSUFBTSxPQUFPLEdBQXVCLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFBLEdBQUcsR0FBSyxPQUFPLElBQVosQ0FBYTtZQUN4QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHNEQUFvQixHQUFsQzs7Ozs7NEJBQ2MscUJBQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ25ELFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7NEJBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07eUJBQzVCLENBQUMsRUFBQTs7d0JBSEksR0FBRyxHQUFHLFNBR1Y7d0JBQ0Ysc0JBQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUM7Ozs7S0FDcEM7SUFFRDs7OztPQUlHO0lBQ1csOENBQVksR0FBMUI7Ozs7OzRCQUNjLHFCQUFNLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ3ZELFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7eUJBQ3RDLENBQUMsRUFBQTs7d0JBRkksR0FBRyxHQUFHLFNBRVY7d0JBQ0Ysc0JBQU8sR0FBRyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBQzs7OztLQUMzQztJQUVEOzs7OztPQUtHO0lBQ0csMENBQVEsR0FBZDs7Ozs7d0JBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTs0QkFDNUIsc0JBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUM7eUJBQ2pDO3dCQUVELDZCQUE2Qjt3QkFDN0IsSUFDRSxJQUFJLENBQUMsWUFBWTs0QkFDakIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksRUFDaEU7NEJBQ0Esc0JBQU8sSUFBSSxDQUFDLFlBQVksRUFBQzt5QkFDMUI7d0JBQ00scUJBQU0sSUFBSSxDQUFDLHdCQUF3QixFQUFFLEVBQUE7NEJBQTVDLHNCQUFPLFNBQXFDLEVBQUM7Ozs7S0FDOUM7SUFFRDs7Ozs7T0FLRztJQUNXLDBEQUF3QixHQUF0Qzs7Ozs7O3dCQUVNLFdBQVcsR0FBRyxJQUFJLENBQUM7NkJBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFuQix3QkFBbUI7d0JBQ1AscUJBQU0sSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUE7O3dCQUEvQyxXQUFXLEdBQUcsU0FBaUMsQ0FBQzs7NEJBRWxDLHFCQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQTs7d0JBQXZDLFdBQVcsR0FBRyxTQUF5QixDQUFDOzs7d0JBRzFDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO3dCQUMxQixPQUFPLEdBQXVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3pELEdBQUcsR0FBSyxPQUFPLElBQVosQ0FBYTt3QkFDeEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7d0JBQ3pDLHNCQUFPLElBQUksQ0FBQyxZQUFZLEVBQUM7Ozs7S0FDMUI7SUFDSCw4QkFBQztBQUFELENBQUMsQUEzRkQsSUEyRkMifQ==