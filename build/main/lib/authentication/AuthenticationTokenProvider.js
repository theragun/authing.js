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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25Ub2tlblByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9BdXRoZW50aWNhdGlvblRva2VuUHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsSUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7QUFDbEMsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDO0FBRWhDO0lBTUUscUNBQVksT0FBb0M7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCw4Q0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNwQixJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsRUFBRTtZQUN2QyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsOENBQVEsR0FBUjtRQUNFLE9BQU8sT0FBTyxZQUFZLEtBQUssV0FBVztZQUN4QyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw2Q0FBTyxHQUFQO1FBQ0UsT0FBTyxPQUFPLFlBQVksS0FBSyxXQUFXO1lBQ3hDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLElBQUk7WUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsNkNBQU8sR0FBUCxVQUFRLElBQVU7UUFDaEIsSUFBSSxPQUFPLFlBQVksS0FBSyxXQUFXLEVBQUU7WUFDdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BELFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELCtDQUFTLEdBQVQ7UUFDRSxJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsRUFBRTtZQUN2QyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUNILGtDQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQXZEWSxrRUFBMkIifQ==