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
        define(["require", "exports", "../authentication/BaseAuthenticationClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PublicKeyManager = void 0;
    var BaseAuthenticationClient_1 = require("../authentication/BaseAuthenticationClient");
    var PublicKeyManager = /** @class */ (function () {
        function PublicKeyManager(options, httpClient) {
            this.options = options;
            this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(this.options);
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
    exports.PublicKeyManager = PublicKeyManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHVibGljS2V5TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tbW9uL1B1YmxpY0tleU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsdUZBQXNGO0lBS3RGO1FBVUUsMEJBQ0UsT0FBOEQsRUFDOUQsVUFBc0I7WUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1EQUF3QixDQUFDLElBQUksQ0FBQyxPQUFzQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDL0IsQ0FBQztRQUVEOztXQUVHO1FBQ1UsdUNBQVksR0FBekI7Ozs7Ozs0QkFDRSw2QkFBNkI7NEJBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0NBQzFCLHNCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDOzZCQUMvQjs0QkFFRCxtQkFBbUI7NEJBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQ0FDbEIsc0JBQU8sSUFBSSxDQUFDLFNBQVMsRUFBQzs2QkFDdkI7NEJBRUssR0FBRyxHQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyx3QkFBcUIsQ0FBQzs0QkFDL0MscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0NBQ3pDLE1BQU0sRUFBRSxLQUFLO29DQUNiLEdBQUcsRUFBRSxHQUFHO2lDQUNULENBQUMsRUFBQTs7NEJBSEksSUFBSSxHQUFHLFNBR1g7NEJBQ00sU0FBUyxHQUFLLElBQUksVUFBVCxDQUFVOzRCQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs0QkFDM0Isc0JBQU8sSUFBSSxDQUFDLFNBQVMsRUFBQzs7OztTQUN2QjtRQUNILHVCQUFDO0lBQUQsQ0FBQyxBQTFDRCxJQTBDQztJQTFDWSw0Q0FBZ0IifQ==