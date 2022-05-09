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
    exports.checkPermission = exports.loginRequired = void 0;
    var getToken = function (req, cookieKey) {
        var _a, _b, _c;
        var token = null;
        if (req.headers.authorization) {
            token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '')) === null || _b === void 0 ? void 0 : _b.replace('bearer ', '');
        }
        if (!token) {
            token = req.cookies ? req.cookies[cookieKey] : null;
        }
        if (!token) {
            token = (_c = req.query) === null || _c === void 0 ? void 0 : _c._authing_token;
        }
        return token;
    };
    var loginRequired = function (authingClient, options) {
        options = options || {};
        var _a = options.cookieKey, cookieKey = _a === void 0 ? '_authing_token' : _a, _b = options.fetchUserDetail, fetchUserDetail = _b === void 0 ? false : _b, _c = options.statusCodeOnFailure, statusCodeOnFailure = _c === void 0 ? 403 : _c, _d = options.responseBodyOnFailure, responseBodyOnFailure = _d === void 0 ? {
            code: 403,
            message: 'Permission Denied'
        } : _d, redirectUrlOnFailure = options.redirectUrlOnFailure;
        return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            var token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = getToken(req, cookieKey);
                        return [4 /*yield*/, authingClient.checkLoginStatus(token, {
                                fetchUserDetail: fetchUserDetail
                            })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            // @ts-ignore
                            req.user = user;
                            return [2 /*return*/, next()];
                        }
                        if (redirectUrlOnFailure) {
                            return [2 /*return*/, res.redirect(redirectUrlOnFailure)];
                        }
                        else {
                            return [2 /*return*/, res.status(statusCodeOnFailure).send(responseBodyOnFailure)];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    };
    exports.loginRequired = loginRequired;
    var checkPermission = function (authingClient, resource, action, options) {
        options = options || {};
        var _a = options.cookieKey, cookieKey = _a === void 0 ? '_authing_token' : _a, _b = options.fetchUserDetail, fetchUserDetail = _b === void 0 ? false : _b, _c = options.statusCodeOnFailure, statusCodeOnFailure = _c === void 0 ? 403 : _c, _d = options.responseBodyOnFailure, responseBodyOnFailure = _d === void 0 ? {
            code: 403,
            message: 'Permission Denied'
        } : _d, redirectUrlOnFailure = options.redirectUrlOnFailure;
        return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
            var token, user, isAllowed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = getToken(req, cookieKey);
                        return [4 /*yield*/, authingClient.checkLoginStatus(token, {
                                fetchUserDetail: fetchUserDetail
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, authingClient.acl.isAllowed(user.id, action, resource)];
                    case 2:
                        isAllowed = _a.sent();
                        if (isAllowed) {
                            // @ts-ignore
                            req.user = user;
                            return [2 /*return*/, next()];
                        }
                        _a.label = 3;
                    case 3:
                        if (redirectUrlOnFailure) {
                            return [2 /*return*/, res.redirect(redirectUrlOnFailure)];
                        }
                        else {
                            return [2 /*return*/, res.status(statusCodeOnFailure).send(responseBodyOnFailure)];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    };
    exports.checkPermission = checkPermission;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3BsYXRmb3JtL2V4cHJlc3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR0EsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFZLEVBQUUsU0FBaUI7O1FBQy9DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQzdCLEtBQUssR0FBRyxNQUFBLE1BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLDBDQUM3QixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQywwQ0FDdEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssR0FBRyxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLGNBQWMsQ0FBQztTQUNuQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBRUssSUFBTSxhQUFhLEdBQUcsVUFDM0IsYUFBK0IsRUFDL0IsT0FrQkM7UUFFRCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUV0QixJQUFBLEtBUUUsT0FBTyxVQVJtQixFQUE1QixTQUFTLG1CQUFHLGdCQUFnQixLQUFBLEVBQzVCLEtBT0UsT0FBTyxnQkFQYyxFQUF2QixlQUFlLG1CQUFHLEtBQUssS0FBQSxFQUN2QixLQU1FLE9BQU8sb0JBTmdCLEVBQXpCLG1CQUFtQixtQkFBRyxHQUFHLEtBQUEsRUFDekIsS0FLRSxPQUFPLHNCQUZSLEVBSEQscUJBQXFCLG1CQUFHO1lBQ3RCLElBQUksRUFBRSxHQUFHO1lBQ1QsT0FBTyxFQUFFLG1CQUFtQjtTQUM3QixLQUFBLEVBQ0Qsb0JBQW9CLEdBQ2xCLE9BQU8scUJBRFcsQ0FDVjtRQUNaLE9BQU8sVUFBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCOzs7Ozt3QkFDckQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQzFCLHFCQUFNLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7Z0NBQ3ZELGVBQWUsaUJBQUE7NkJBQ2hCLENBQUMsRUFBQTs7d0JBRkksSUFBSSxHQUFHLFNBRVg7d0JBQ0YsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsYUFBYTs0QkFDYixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs0QkFDaEIsc0JBQU8sSUFBSSxFQUFFLEVBQUM7eUJBQ2Y7d0JBRUQsSUFBSSxvQkFBb0IsRUFBRTs0QkFDeEIsc0JBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFDO3lCQUMzQzs2QkFBTTs0QkFDTCxzQkFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUM7eUJBQ3BFOzs7O2FBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQztJQWxEVyxRQUFBLGFBQWEsaUJBa0R4QjtJQUVLLElBQU0sZUFBZSxHQUFHLFVBQzdCLGFBQStCLEVBQy9CLFFBQWdCLEVBQ2hCLE1BQWMsRUFDZCxPQWtCQztRQUVELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRXRCLElBQUEsS0FRRSxPQUFPLFVBUm1CLEVBQTVCLFNBQVMsbUJBQUcsZ0JBQWdCLEtBQUEsRUFDNUIsS0FPRSxPQUFPLGdCQVBjLEVBQXZCLGVBQWUsbUJBQUcsS0FBSyxLQUFBLEVBQ3ZCLEtBTUUsT0FBTyxvQkFOZ0IsRUFBekIsbUJBQW1CLG1CQUFHLEdBQUcsS0FBQSxFQUN6QixLQUtFLE9BQU8sc0JBRlIsRUFIRCxxQkFBcUIsbUJBQUc7WUFDdEIsSUFBSSxFQUFFLEdBQUc7WUFDVCxPQUFPLEVBQUUsbUJBQW1CO1NBQzdCLEtBQUEsRUFDRCxvQkFBb0IsR0FDbEIsT0FBTyxxQkFEVyxDQUNWO1FBRVosT0FBTyxVQUFPLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7Ozs7O3dCQUNyRCxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQzt3QkFDMUIscUJBQU0sYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtnQ0FDdkQsZUFBZSxpQkFBQTs2QkFDaEIsQ0FBQyxFQUFBOzt3QkFGSSxJQUFJLEdBQUcsU0FFWDs2QkFDRSxJQUFJLEVBQUosd0JBQUk7d0JBQ1kscUJBQU0sYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQ2pELElBQUksQ0FBQyxFQUFFLEVBQ1AsTUFBTSxFQUNOLFFBQVEsQ0FDVCxFQUFBOzt3QkFKSyxTQUFTLEdBQUcsU0FJakI7d0JBQ0QsSUFBSSxTQUFTLEVBQUU7NEJBQ2IsYUFBYTs0QkFDYixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs0QkFDaEIsc0JBQU8sSUFBSSxFQUFFLEVBQUM7eUJBQ2Y7Ozt3QkFHSCxJQUFJLG9CQUFvQixFQUFFOzRCQUN4QixzQkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUM7eUJBQzNDOzZCQUFNOzRCQUNMLHNCQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBQzt5QkFDcEU7Ozs7YUFDRixDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBNURXLFFBQUEsZUFBZSxtQkE0RDFCIn0=