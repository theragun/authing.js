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
    exports.BaseAuthenticationClient = void 0;
    var BaseAuthenticationClient = /** @class */ (function () {
        function BaseAuthenticationClient(options) {
            this.options = options;
        }
        Object.defineProperty(BaseAuthenticationClient.prototype, "appHost", {
            get: function () {
                var _a = this.options, appHost = _a.appHost, domain = _a.domain, host = _a.host;
                // 最新版本，传入 appHost
                if (appHost) {
                    return appHost.replace(/\/$/, '');
                }
                // 兼容协议认证 API 中传入的 domain
                else if (domain) {
                    var hostUrl = new URL(this.options.host);
                    return hostUrl.protocol + "//" + this.options.domain;
                }
                // 最后使用服务器统一域名 host
                else {
                    return host;
                }
            },
            enumerable: false,
            configurable: true
        });
        return BaseAuthenticationClient;
    }());
    exports.BaseAuthenticationClient = BaseAuthenticationClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUF1dGhlbnRpY2F0aW9uQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9CYXNlQXV0aGVudGljYXRpb25DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBRUE7UUFxQkUsa0NBQVksT0FBb0M7WUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDekIsQ0FBQztRQXBCRCxzQkFBSSw2Q0FBTztpQkFBWDtnQkFDUSxJQUFBLEtBQTRCLElBQUksQ0FBQyxPQUFPLEVBQXRDLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQSxFQUFFLElBQUksVUFBaUIsQ0FBQztnQkFDL0Msa0JBQWtCO2dCQUNsQixJQUFJLE9BQU8sRUFBRTtvQkFDWCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNuQztnQkFDRCx5QkFBeUI7cUJBQ3BCLElBQUksTUFBTSxFQUFFO29CQUNmLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLE9BQVUsT0FBTyxDQUFDLFFBQVEsVUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQVEsQ0FBQztpQkFDdEQ7Z0JBRUQsbUJBQW1CO3FCQUNkO29CQUNILE9BQU8sSUFBSSxDQUFDO2lCQUNiO1lBQ0gsQ0FBQzs7O1dBQUE7UUFLSCwrQkFBQztJQUFELENBQUMsQUF4QkQsSUF3QkM7SUF4QlksNERBQXdCIn0=