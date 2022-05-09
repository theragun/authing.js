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
export { BaseAuthenticationClient };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUF1dGhlbnRpY2F0aW9uQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9hdXRoZW50aWNhdGlvbi9CYXNlQXV0aGVudGljYXRpb25DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7SUFxQkUsa0NBQVksT0FBb0M7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQXBCRCxzQkFBSSw2Q0FBTzthQUFYO1lBQ1EsSUFBQSxLQUE0QixJQUFJLENBQUMsT0FBTyxFQUF0QyxPQUFPLGFBQUEsRUFBRSxNQUFNLFlBQUEsRUFBRSxJQUFJLFVBQWlCLENBQUM7WUFDL0Msa0JBQWtCO1lBQ2xCLElBQUksT0FBTyxFQUFFO2dCQUNYLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDbkM7WUFDRCx5QkFBeUI7aUJBQ3BCLElBQUksTUFBTSxFQUFFO2dCQUNmLElBQUksT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLE9BQVUsT0FBTyxDQUFDLFFBQVEsVUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQVEsQ0FBQzthQUN0RDtZQUVELG1CQUFtQjtpQkFDZDtnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQzs7O09BQUE7SUFLSCwrQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkMifQ==