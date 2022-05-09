/**
 * 密码安全等级
 */
export var PasswordSecurityLevel;
(function (PasswordSecurityLevel) {
    PasswordSecurityLevel[PasswordSecurityLevel["LOW"] = 1] = "LOW";
    PasswordSecurityLevel[PasswordSecurityLevel["MIDDLE"] = 2] = "MIDDLE";
    PasswordSecurityLevel[PasswordSecurityLevel["HIGH"] = 3] = "HIGH";
})(PasswordSecurityLevel || (PasswordSecurityLevel = {}));
export var SocialConnectionProvider;
(function (SocialConnectionProvider) {
    SocialConnectionProvider["ALIPAY"] = "alipay";
    SocialConnectionProvider["GOOGLE"] = "google";
    SocialConnectionProvider["WECHATPC"] = "wechat:pc";
    SocialConnectionProvider["WECHATMP"] = "wechat:webpage-authorization";
    SocialConnectionProvider["WECHAT_MINIPROGRAM"] = "wechat:miniprogram:default";
    SocialConnectionProvider["WECHAT_MINIPROGRAM_QRCODE"] = "wechat:miniprogram:qrconnect";
    SocialConnectionProvider["WECHAT_MINIPROGRAM_APPLAUNCH"] = "wechat:miniprogram:app-launch";
    SocialConnectionProvider["WECHATMOBILE"] = "wechat:mobile";
    SocialConnectionProvider["GITHUB"] = "github";
    SocialConnectionProvider["QQ"] = "qq";
    SocialConnectionProvider["WECHATWORK_ADDRESS_BOOK"] = "wechatwork:addressbook";
    SocialConnectionProvider["WECHATWORK_CORP_QRCONNECT"] = "wechatwork:corp:qrconnect";
    SocialConnectionProvider["WECHATWORK_SERVICEPROVIDER_QRCONNECT"] = "wechatwork:service-provider:qrconnect";
    SocialConnectionProvider["DINGTALK"] = "dingtalk";
    SocialConnectionProvider["WEIBO"] = "weibo";
    SocialConnectionProvider["APPLE"] = "apple";
    SocialConnectionProvider["APPLE_WEB"] = "apple:web";
    SocialConnectionProvider["OAUTH"] = "oauth";
    SocialConnectionProvider["BAIDU"] = "baidu";
})(SocialConnectionProvider || (SocialConnectionProvider = {}));
export var Protocol;
(function (Protocol) {
    Protocol["OIDC"] = "oidc";
    Protocol["OAUTH"] = "oauth";
    Protocol["SAML"] = "saml";
    Protocol["CAS"] = "cas";
    Protocol["AZURE_AD"] = "azure-ad";
})(Protocol || (Protocol = {}));
export var AppPasswordStrengthLimit;
(function (AppPasswordStrengthLimit) {
    AppPasswordStrengthLimit[AppPasswordStrengthLimit["NoCheck"] = 0] = "NoCheck";
    AppPasswordStrengthLimit[AppPasswordStrengthLimit["Low"] = 1] = "Low";
    AppPasswordStrengthLimit[AppPasswordStrengthLimit["Middle"] = 2] = "Middle";
    AppPasswordStrengthLimit[AppPasswordStrengthLimit["High"] = 3] = "High";
})(AppPasswordStrengthLimit || (AppPasswordStrengthLimit = {}));
export var RegisterMethods;
(function (RegisterMethods) {
    RegisterMethods["Email"] = "email";
    RegisterMethods["Phone"] = "phone";
})(RegisterMethods || (RegisterMethods = {}));
export var LoginMethods;
(function (LoginMethods) {
    LoginMethods["LDAP"] = "ldap";
    LoginMethods["AppQr"] = "app-qrcode";
    LoginMethods["Password"] = "password";
    LoginMethods["PhoneCode"] = "phone-code";
    LoginMethods["WxMinQr"] = "wechat-miniprogram-qrcode";
    LoginMethods["AD"] = "ad"; // 对应企业身份源的 Windows AD 登录
})(LoginMethods || (LoginMethods = {}));
export var OIDCConnectionMode;
(function (OIDCConnectionMode) {
    OIDCConnectionMode["FRONT_CHANNEL"] = "FRONT_CHANNEL";
    OIDCConnectionMode["BACK_CHANNEL"] = "BACK_CHANNEL";
})(OIDCConnectionMode || (OIDCConnectionMode = {}));
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNKQTs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLHFCQUlYO0FBSkQsV0FBWSxxQkFBcUI7SUFDL0IsK0RBQU8sQ0FBQTtJQUNQLHFFQUFVLENBQUE7SUFDVixpRUFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUpXLHFCQUFxQixLQUFyQixxQkFBcUIsUUFJaEM7QUFnQkQsTUFBTSxDQUFOLElBQVksd0JBb0JYO0FBcEJELFdBQVksd0JBQXdCO0lBQ2xDLDZDQUFpQixDQUFBO0lBQ2pCLDZDQUFpQixDQUFBO0lBQ2pCLGtEQUFzQixDQUFBO0lBQ3RCLHFFQUF5QyxDQUFBO0lBQ3pDLDZFQUFpRCxDQUFBO0lBQ2pELHNGQUEwRCxDQUFBO0lBQzFELDBGQUE4RCxDQUFBO0lBQzlELDBEQUE4QixDQUFBO0lBQzlCLDZDQUFpQixDQUFBO0lBQ2pCLHFDQUFTLENBQUE7SUFDVCw4RUFBa0QsQ0FBQTtJQUNsRCxtRkFBdUQsQ0FBQTtJQUN2RCwwR0FBOEUsQ0FBQTtJQUM5RSxpREFBcUIsQ0FBQTtJQUNyQiwyQ0FBZSxDQUFBO0lBQ2YsMkNBQWUsQ0FBQTtJQUNmLG1EQUF1QixDQUFBO0lBQ3ZCLDJDQUFlLENBQUE7SUFDZiwyQ0FBZSxDQUFBO0FBQ2pCLENBQUMsRUFwQlcsd0JBQXdCLEtBQXhCLHdCQUF3QixRQW9CbkM7QUFFRCxNQUFNLENBQU4sSUFBWSxRQU1YO0FBTkQsV0FBWSxRQUFRO0lBQ2xCLHlCQUFhLENBQUE7SUFDYiwyQkFBZSxDQUFBO0lBQ2YseUJBQWEsQ0FBQTtJQUNiLHVCQUFXLENBQUE7SUFDWCxpQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBTlcsUUFBUSxLQUFSLFFBQVEsUUFNbkI7QUFFRCxNQUFNLENBQU4sSUFBWSx3QkFLWDtBQUxELFdBQVksd0JBQXdCO0lBQ2xDLDZFQUFPLENBQUE7SUFDUCxxRUFBRyxDQUFBO0lBQ0gsMkVBQU0sQ0FBQTtJQUNOLHVFQUFJLENBQUE7QUFDTixDQUFDLEVBTFcsd0JBQXdCLEtBQXhCLHdCQUF3QixRQUtuQztBQUVELE1BQU0sQ0FBTixJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDekIsa0NBQWUsQ0FBQTtJQUNmLGtDQUFlLENBQUE7QUFDakIsQ0FBQyxFQUhXLGVBQWUsS0FBZixlQUFlLFFBRzFCO0FBRUQsTUFBTSxDQUFOLElBQVksWUFPWDtBQVBELFdBQVksWUFBWTtJQUN0Qiw2QkFBYSxDQUFBO0lBQ2Isb0NBQW9CLENBQUE7SUFDcEIscUNBQXFCLENBQUE7SUFDckIsd0NBQXdCLENBQUE7SUFDeEIscURBQXFDLENBQUE7SUFDckMseUJBQVMsQ0FBQSxDQUFDLHlCQUF5QjtBQUNyQyxDQUFDLEVBUFcsWUFBWSxLQUFaLFlBQVksUUFPdkI7QUE4Q0QsTUFBTSxDQUFOLElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUM1QixxREFBK0IsQ0FBQTtJQUMvQixtREFBNkIsQ0FBQTtBQUMvQixDQUFDLEVBSFcsa0JBQWtCLEtBQWxCLGtCQUFrQixRQUc3QjtBQW9SQSxDQUFDIn0=