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
    exports.AuthenticationTokenProvider = void 0;
    var tokenKey = '_authing_token';
    var userKey = '_authing_user';
    var AuthenticationTokenProvider = /** @class */ (function () {
        function AuthenticationTokenProvider(options) {
            this.options = options;
            // 为了兼容服务端不支持 localStorage 的情况
            this.token = null;
            this.user = null;
        }
        AuthenticationTokenProvider.prototype.setToken = function (token) {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(tokenKey, token);
            }
            else {
                this.token = token;
            }
        };
        AuthenticationTokenProvider.prototype.getToken = function () {
            return typeof localStorage !== 'undefined'
                ? localStorage.getItem(tokenKey) || ''
                : this.token;
        };
        AuthenticationTokenProvider.prototype.getUser = function () {
            return typeof localStorage !== 'undefined'
                ? localStorage.getItem(userKey)
                    ? JSON.parse(localStorage.getItem(userKey))
                    : null
                : this.user;
        };
        AuthenticationTokenProvider.prototype.setUser = function (user) {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(userKey, JSON.stringify(user));
                localStorage.setItem(tokenKey, user.token);
            }
            else {
                this.user = user;
                this.token = user.token;
            }
        };
        AuthenticationTokenProvider.prototype.clearUser = function () {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(userKey);
                localStorage.removeItem(tokenKey);
            }
            else {
                this.user = null;
                this.token = null;
            }
        };
        return AuthenticationTokenProvider;
    }());
    exports.AuthenticationTokenProvider = AuthenticationTokenProvider;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25Ub2tlblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9BdXRoZW50aWNhdGlvblRva2VuUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBR0EsSUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7SUFDbEMsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO0lBRWhDO1FBTUUscUNBQVksT0FBb0M7WUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFFdkIsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUM7UUFFRCw4Q0FBUSxHQUFSLFVBQVMsS0FBYTtZQUNwQixJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsRUFBRTtnQkFDdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDcEI7UUFDSCxDQUFDO1FBRUQsOENBQVEsR0FBUjtZQUNFLE9BQU8sT0FBTyxZQUFZLEtBQUssV0FBVztnQkFDeEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELDZDQUFPLEdBQVA7WUFDRSxPQUFPLE9BQU8sWUFBWSxLQUFLLFdBQVc7Z0JBQ3hDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0MsQ0FBQyxDQUFDLElBQUk7Z0JBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELDZDQUFPLEdBQVAsVUFBUSxJQUFVO1lBQ2hCLElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxFQUFFO2dCQUN2QyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQztRQUVELCtDQUFTLEdBQVQ7WUFDRSxJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsRUFBRTtnQkFDdkMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDbkI7UUFDSCxDQUFDO1FBQ0gsa0NBQUM7SUFBRCxDQUFDLEFBdkRELElBdURDO0lBdkRZLGtFQUEyQiJ9