import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';
import { AuthenticationClientOptions } from './types';
import { HttpClient } from '../common/HttpClient';
import { User } from '../../types/index';
import { BaseAuthenticationClient } from './BaseAuthenticationClient';
/**
 * @class SocialAuthenticationClient 社会化登录模块
 * @description 此模块封装了社会化登录的功能，可以通过简洁的 API 快速使用社会化登录获取用户信息。
 *
 * 发起社会化登录授权请求：
 *
 * \`\`\`javascript
 * import { AuthenticationClient } from "authing-js-sdk"
 * const authenticationClient = new AuthenticationClient({
 *    appId: "YOUR_APP_ID",
 * })
 * await authenticationClient.social.authorize("github", {
 *    onSuccess: (user) => { console.log(user) },
 *    onError: (code, message) => {  }
 * })
 * \`\`\`
 *
 *
 * @name SocialAuthenticationClient
 */
export declare class SocialAuthenticationClient {
    options: AuthenticationClientOptions;
    tokenProvider: AuthenticationTokenProvider;
    httpClient: HttpClient;
    baseClient: BaseAuthenticationClient;
    constructor(options: AuthenticationClientOptions, tokenProvider: AuthenticationTokenProvider, httpClient: HttpClient);
    /**
     * @name authorize
     * @name_zh 发送授权登录请求
     * @description 发送授权登录请求，该方法会直接打开一个新窗口，跳转到第三方社会化登录服务商（如 GitHub、微信、钉钉等）的登录授权页面，用户
     * 完成授权之后，会自动关闭此窗口，并触发 onSuccess 回调函数，通过此函数，你可以获取到用户信息。
     *
     * @param {string} provider 社会化登录服务商的标志。
     * @param {object} [options]
     * @param {boolean} [options.popup=true] 是否通过弹窗的方式打开社会化登录窗口，如果设置为 false，将会以 window.open 的方式打开一个新的浏览器  tab 。
     * @param {Function} [options.onSuccess] 用户同意授权事件回调函数，第一个参数为用户信息。
     * @param {Function} [options.onError] 社会化登录失败事件回调函数，第一个参数 code 为错误码，第二个参数 message 为错误提示。详细的错误码列表请见：详细说明请见：[Authing 错误代码列表](https://docs.authing.co/advanced/error-code.html)
     * @param {object} [options.position] 只有当 options.popup 为 ture 的时候有效，弹出窗口的位置，默认为 { w: 585, h: 649 } 。
     * @param {object} [options.authorizationParams] 请求时的额外参数
     *
     * @example
     *
     * // 使用 GitHub 登录
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.social.authorize("github", {
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     *    // 自定义弹出窗口的位置
     *    position: {
     *      w: 100,
     *      h: 100
     *    }
     * })
     *
     * @example
     *
     * // 使用新建浏览器 tab 的形式打开社会化登录页面
     *
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     *
     * await authenticationClient.social.authorize("github", {
     *    popup: false,
     *    onSuccess: (user) => { console.log(user) },
     *    onError: (code, message) => {  },
     * })
     *
     * @memberof SocialAuthenticationClient
     */
    authorize(provider: string, options?: {
        popup?: boolean;
        onSuccess?: (user: User) => void;
        onError?: (code: number, message: string) => void;
        position?: {
            w: number;
            h: number;
        };
        authorization_params?: Record<string, any>;
        authorizationParams?: Record<string, any>;
        context?: {
            [x: string]: any;
        };
        /**
         * @description 将会写入配置的用户自定义字段
         */
        customData?: {
            [x: string]: any;
        };
        /**
         * @description 获取的用户信息中是否包含 identities
         */
        withIdentities?: boolean;
        /**
         * @description 是否获取用户自定义数据
         */
        withCustomData?: boolean;
        /**
         * @description 协议类型
         */
        protocol?: string;
        uuid?: string;
    }): Promise<void>;
}
