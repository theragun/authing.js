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
    exports.generateRandomPhone = exports.generateRandomEmail = exports.generateRandomString = exports.getAuthenticationClientOptionsFromEnv = exports.getOptionsFromEnv = exports.sleep = exports.randomString = void 0;
    require('dotenv').config({
        path: '.env'
    });
    /** 随机字符串 **/
    var randomString = function () {
        return Math.random()
            .toString(36)
            .slice(2);
    };
    exports.randomString = randomString;
    /**
     * 睡眠函数
     * @param ms 毫秒
     */
    var sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    exports.sleep = sleep;
    /**
     * 从环境变量中读取配置
     *
     */
    var getOptionsFromEnv = function () {
        return {
            userPoolId: process.env.AUTHING_USERPOOL_ID,
            secret: process.env.AUTHING_USERPOOL_SECRET,
            appId: process.env.AUTHING_APP_ID,
            appHost: process.env.AUTHING_APP_HOST,
            host: process.env.AUTHING_HOST,
            timeout: 10000,
            publicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb\n5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae\n+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM\nGKl64GDcIq3au+aqJQIDAQAB\n-----END PUBLIC KEY-----"
        };
    };
    exports.getOptionsFromEnv = getOptionsFromEnv;
    /**
     * 从环境变量中读取初始化 AuthenticationClient 的配置
     *
     */
    var getAuthenticationClientOptionsFromEnv = function () {
        return {
            appId: process.env.AUTHING_APP_ID,
            secret: process.env.AUTHING_APP_SECRET,
            appHost: process.env.AUTHING_APP_HOST,
            timeout: 10000,
            publicKey: "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4xKeUgQ+Aoz7TLfAfs9+paePb\n5KIofVthEopwrXFkp8OCeocaTHt9ICjTT2QeJh6cZaDaArfZ873GPUn00eOIZ7Ae\n+TiA2BKHbCvloW3w5Lnqm70iSsUi5Fmu9/2+68GZRH9L7Mlh8cFksCicW2Y2W2uM\nGKl64GDcIq3au+aqJQIDAQAB\n-----END PUBLIC KEY-----",
            privateKeys: [
                {
                    pkcs8Key: "-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg7Q4beu7/xHDfjBpU\n8PaB7HgE5QwrRfC5U8Mg/Q1xsfWhRANCAASZfUYKKXRay8XRdnxe/uRFw84O8nHu\nMVJy77bQcNHNpLt0Ed2Rguc+f9Oj1FwsaZjYtkL16kb+i5xiN8dF7vhR\n-----END PRIVATE KEY-----",
                    alg: 'ECDH-ES',
                    // kid: 'VoDy8rNxx1FN_xXlMYUfhUAXo6J5hTI3cgpUQ8qEB5s',
                },
                {
                    pkcs8Key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAnGLJX76fpkai\n5OFgrfPonw9kFYTQqS65pEtSQVxk3ttt7L1yGon5RupF+0tVk9VGg4IqOgTlB+LB\njs7gyfzr8Tv5TClD5/J8mfdTmNlZ6mEmOGKkdxUQlBjrIcCYuBfTllMS6COKnXgg\nVLA9sNrt+RUQfrJBpcCY1uG6QY2WfwewZuepBUzhBRmPcAIUX8/DH1w0+V5xw5n6\nBgtLfimRbAH/uY2ocgI6b01F8m1x0TxH8OkLAvlW+NCqv71E/UTBZdsX4wR7Nyo+\nSxL9Ute5y4YiK5oVRYODA5F33Exb46AZ0ac9mB+NBpfVXXvvb1ZqLzdIVloz1LkF\nnPwT4qPlAgMBAAECggEAIpv3JDgQCJ/YEW0PElAvg50RJuq28sdznefnoOAdugJR\na28em2IpaKFVdz2wS7BEomb+/JdwSbchB6ahhcLFr5+pJyKIR6tl5v3Dc0IDzCRR\nUIzRLLw5DMGPuLBX6xkpLtvUEZGk0UN6UlTlVjBxJlGbd1tMrH8cHFqANPeSeXgK\nHAkBgMe6uInhQ//AwOSzx818f19cPLeaVYUPIgHYPvhn59z976kP2vuELiXR164V\n7GF3KhS4bbcHOxA2lDafcCicHv3wz5zsjm4UMWlFZ4/3jvQ7hrrYmpLAQYexBVo2\nhQdfQQMkkKSeNTfoUFpllu8PidLFNm30m6WNZdCoAQKBgQDfuGPzCRVO1a2nxFDI\ndH3U3CSioWEzSN9sTZeBtGfhRXG8ljxRTOwne19NPqFBviF9hN0YVxtWkbFoFjS5\ndpXXP5XttaMBwQC5DOE+8Xy1W5ur/lVAVkOivcE4CSGdYWhkY14MWAxfhuXfKeBQ\n8CBze/g8IgU5OIFcCTl2TKxpnwKBgQDcZuZ8woT1sM6JJNbGIdng5CtTu1YtVPtU\nWEVkkScaXbPcXNxp/tlX4DTjS/ggoDW11r4sRx/t2R3o4fJIlGC9XBJxZHdRvLJZ\n/Vspn16uhhH1SzuwHdNIpxlrFB8mWNiKVn9Wil0FKLX2t4eoCP0EpAbXIWWr6YSD\nu9HvRSrL+wKBgFOxQkrYGg2M6FL7oRDsa2pnFJl2b8tktphoioYuPDJM7ViUh2oO\nscWvZJ6cEG1suFChlKiXZZXEGS8MJ5s+Hp4QnoD300xDrIaNp/IJGxMpexojojbY\nTqMiA5d36whaOVhcyAEsKyzNZU9P9iexPSKWvO2Z+IRIfDQ3CzUTR+iXAoGBAJ7k\ndD/3QEGcEJngfBHk751pAS9hPDR8MqDQ7l4dIxKoAPXZ4HFt8CShF5/R8fUbav1H\n7lwffo5LW3u8AJ6AkemSCh3Dbx33KqEjvOgZ4/lv4Fx1u3cxWVPkW7fNjtNnc9zv\nlOe/4mXIvr45+8uRh08kLWZExnaUaBtMeYHE3KCnAoGBALWN8fJdwusA+BXu8K5P\nzXVMiOI9EkDR940A3mvRNuI48SezoakFh5CSQA+krfWiPv9K/DRmEyGuwRJjzi/I\nydUWFelLxpjoyJBNR2DlmvKnbgDg4OGUHFvRrNGaHa3sR6oHrVI2fuJQN9D8G+vR\n4rQ230YU31uAZi0n/E/3Iesw\n-----END PRIVATE KEY-----",
                    alg: 'RSA-OAEP',
                    kid: '-1OfMjIESJvQyEcOsapn-m2Iwvu9D6B3M76_uU9_3wA',
                },
            ],
        };
    };
    exports.getAuthenticationClientOptionsFromEnv = getAuthenticationClientOptionsFromEnv;
    /**
     * @description 生成随机字符串
     *
     */
    function generateRandomString(length) {
        if (length === void 0) { length = 30; }
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    exports.generateRandomString = generateRandomString;
    function generateRandomEmail() {
        return generateRandomString(14) + '@example.com';
    }
    exports.generateRandomEmail = generateRandomEmail;
    /**
     * @description 生成随机手机号
     *
     */
    var generateRandomPhone = function () {
        var headerNums = new Array('139', '138', '137', '136', '135', '134', '159', '158', '157', '150', '151', '152', '188', '187', '182', '183', '184', '178', '130', '131', '132', '156', '155', '186', '185', '176', '133', '153', '189', '180', '181', '177');
        var headerNum = headerNums[Math.floor(Math.random() * 10)];
        var bodyNum = Math.random()
            .toString()
            .replace('0.', '')
            .slice(0, 8);
        return headerNum + bodyNum;
    };
    exports.generateRandomPhone = generateRandomPhone;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Rlc3RpbmctaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUVBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdkIsSUFBSSxFQUFFLE1BQU07S0FDYixDQUFDLENBQUM7SUFFSCxhQUFhO0lBQ04sSUFBTSxZQUFZLEdBQUc7UUFDMUIsT0FBQSxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQzthQUNaLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFGWCxDQUVXLENBQUM7SUFIRCxRQUFBLFlBQVksZ0JBR1g7SUFFZDs7O09BR0c7SUFDSSxJQUFNLEtBQUssR0FBRyxVQUFDLEVBQVU7UUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUN6RCxDQUFDLENBQUM7SUFGVyxRQUFBLEtBQUssU0FFaEI7SUFFRjs7O09BR0c7SUFDSSxJQUFNLGlCQUFpQixHQUFHO1FBQy9CLE9BQU87WUFDTCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7WUFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCO1lBQzNDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7WUFDakMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO1lBQ3JDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7WUFDOUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsc1JBS1U7U0FDdEIsQ0FBQztJQUNKLENBQUMsQ0FBQztJQWZXLFFBQUEsaUJBQWlCLHFCQWU1QjtJQUVGOzs7T0FHRztJ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