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
import { BaseAuthenticationClient } from '../authentication/BaseAuthenticationClient';
var PublicKeyManager = /** @class */ (function () {
    function PublicKeyManager(options, httpClient) {
        this.options = options;
        this.baseClient = new BaseAuthenticationClient(this.options);
        this.httpClient = httpClient;
    }
    /**
     * @description 获取密码加密公钥
     */
    PublicKeyManager.prototype.getPublicKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, data, publicKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 直接使用 options 传入的 publicKey
                        if (this.options.publicKey) {
                            return [2 /*return*/, this.options.publicKey];
                        }
                        // 使用缓存过的 publicKey
                        if (this.publicKey) {
                            return [2 /*return*/, this.publicKey];
                        }
                        api = this.baseClient.appHost + "/api/v2/.well-known";
                        return [4 /*yield*/, this.httpClient.request({
                                method: 'GET',
                                url: api
                            })];
                    case 1:
                        data = _a.sent();
                        publicKey = data.publicKey;
                        this.publicKey = publicKey;
                        return [2 /*return*/, this.publicKey];
                }
            });
        });
    };
    return PublicKeyManager;
}());
export { PublicKeyManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVibGljS2V5TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tbW9uL1B1YmxpY0tleU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFLdEY7SUFVRSwwQkFDRSxPQUE4RCxFQUM5RCxVQUFzQjtRQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQXNDLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDVSx1Q0FBWSxHQUF6Qjs7Ozs7O3dCQUNFLDZCQUE2Qjt3QkFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTs0QkFDMUIsc0JBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUM7eUJBQy9CO3dCQUVELG1CQUFtQjt3QkFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUNsQixzQkFBTyxJQUFJLENBQUMsU0FBUyxFQUFDO3lCQUN2Qjt3QkFFSyxHQUFHLEdBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLHdCQUFxQixDQUFDO3dCQUMvQyxxQkFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztnQ0FDekMsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsR0FBRyxFQUFFLEdBQUc7NkJBQ1QsQ0FBQyxFQUFBOzt3QkFISSxJQUFJLEdBQUcsU0FHWDt3QkFDTSxTQUFTLEdBQUssSUFBSSxVQUFULENBQVU7d0JBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO3dCQUMzQixzQkFBTyxJQUFJLENBQUMsU0FBUyxFQUFDOzs7O0tBQ3ZCO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDIn0=