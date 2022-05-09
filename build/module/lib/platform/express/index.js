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
export var loginRequired = function (authingClient, options) {
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
export var checkPermission = function (authingClient, resource, action, options) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbGliL3BsYXRmb3JtL2V4cHJlc3MvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxRQUFRLEdBQUcsVUFBQyxHQUFZLEVBQUUsU0FBaUI7O0lBQy9DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1FBQzdCLEtBQUssR0FBRyxNQUFBLE1BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLDBDQUM3QixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQywwQ0FDdEIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM1QjtJQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0tBQ3JEO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLEtBQUssR0FBRyxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLGNBQWMsQ0FBQztLQUNuQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLElBQU0sYUFBYSxHQUFHLFVBQzNCLGFBQStCLEVBQy9CLE9Ba0JDO0lBRUQsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFFdEIsSUFBQSxLQVFFLE9BQU8sVUFSbUIsRUFBNUIsU0FBUyxtQkFBRyxnQkFBZ0IsS0FBQSxFQUM1QixLQU9FLE9BQU8sZ0JBUGMsRUFBdkIsZUFBZSxtQkFBRyxLQUFLLEtBQUEsRUFDdkIsS0FNRSxPQUFPLG9CQU5nQixFQUF6QixtQkFBbUIsbUJB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