require('dotenv').config({
    path: '.env'
});
/** 随机字符串 **/
export var randomString = function () {
    return Math.random()
        .toString(36)
        .slice(2);
};
/**
 * 睡眠函数
 * @param ms 毫秒
 */
export var sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
/**
 * 从环境变量中读取配置
 *
 */
export var getOptionsFromEnv = function () {
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
/**
 * 从环境变量中读取初始化 AuthenticationClient 的配置
 *
 */
export var getAuthenticationClientOptionsFromEnv = function () {
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
/**
 * @description 生成随机字符串
 *
 */
export function generateRandomString(length) {
    if (length === void 0) { length = 30; }
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function generateRandomEmail() {
    return generateRandomString(14) + '@example.com';
}
/**
 * @description 生成随机手机号
 *
 */
export var generateRandomPhone = function () {
    var headerNums = new Array('139', '138', '137', '136', '135', '134', '159', '158', '157', '150', '151', '152', '188', '187', '182', '183', '184', '178', '130', '131', '132', '156', '155', '186', '185', '176', '133', '153', '189', '180', '181', '177');
    var headerNum = headerNums[Math.floor(Math.random() * 10)];
    var bodyNum = Math.random()
        .toString()
        .replace('0.', '')
        .slice(0, 8);
    return headerNum + bodyNum;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy1oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3Rlc3RpbmctaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDdkIsSUFBSSxFQUFFLE1BQU07Q0FDYixDQUFDLENBQUM7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLElBQU0sWUFBWSxHQUFHO0lBQzFCLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBRTtTQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixLQUFLLENBQUMsQ0FBQyxDQUFDO0FBRlgsQ0FFVyxDQUFDO0FBRWQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHLFVBQUMsRUFBVTtJQUM5QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0FBQ3pELENBQUMsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHO0lBQy9CLE9BQU87UUFDTCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7UUFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCO1FBQzNDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7UUFDakMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO1FBQ3JDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDOUIsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsc1JBS1U7S0FDdEIsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLHFDQUFxQyxHQUFHO0lBQ25ELE9BQU87UUFDTCxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO1FBQ2pDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtRQUN0QyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7UUFDckMsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsc1JBS1U7UUFDckIsV0FBVyxFQUFFO1lBQ1g7Z0JBQ0UsUUFBUSxFQUFFLHNQQUlRO2dCQUNsQixHQUFHLEVBQUUsU0FBUztnQkFDZCxzREFBc0Q7YUFDdkQ7WUFDRDtnQkFDRSxRQUFRLEVBQUUsb3NEQTJCUTtnQkFDbEIsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsR0FBRyxFQUFFLDZDQUE2QzthQUNuRDtTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxNQUFtQjtJQUFuQix1QkFBQSxFQUFBLFdBQW1CO0lBQ3RELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixJQUFNLFVBQVUsR0FDZCxnRUFBZ0UsQ0FBQztJQUNuRSxJQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQixNQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7S0FDM0U7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQjtJQUNqQyxPQUFPLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztBQUNuRCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQUc7SUFDakMsSUFBTSxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQzFCLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLENBQ04sQ0FBQztJQUNGLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7U0FDMUIsUUFBUSxFQUFFO1NBQ1YsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7U0FDakIsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNmLE9BQU8sU0FBUyxHQUFHLE9BQU8sQ0FBQztBQUM3QixDQUFDLENBQUMifQ==