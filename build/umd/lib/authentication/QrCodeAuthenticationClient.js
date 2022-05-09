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
        define(["require", "exports", "../utils", "./BaseAuthenticationClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.QrCodeAuthenticationClient = void 0;
    var utils_1 = require("../utils");
    var BaseAuthenticationClient_1 = require("./BaseAuthenticationClient");
    /**
     * @class QrCodeAuthenticationClient 扫码登录模块
     * @description 此模块用于进行扫码登录，扫码登录分为两种小程序扫码登录（wxqrcode）和 APP 扫码登录（qrcode）。两种扫码登录方式 API 完全一致。
     *
     * 使用小程序扫码登录：
     *
     * \`\`\`javascript
     * import { AuthenticationClient } from "authing-js-sdk"
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * authenticationClient.wxqrcode.startScanning() # 开始扫码登录
     * \`\`\`
     *
     * 使用 APP 扫码登录
     *
     * \`\`\`javascript
     * import { AuthenticationClient } from "authing-js-sdk"
     * const authenticationClient = new AuthenticationClient({
     *    appId: "YOUR_APP_ID",
     * })
     * authenticationClient.qrcode.startScanning() # 开始扫码登录
     * \`\`\`
     *
     * @name QrCodeAuthenticationClient
     */
    var roundedImage = function (context2D, x, y, width, height, radius) {
        context2D.beginPath();
        context2D.moveTo(x + radius, y);
        context2D.lineTo(x + width - radius, y);
        context2D.quadraticCurveTo(x + width, y, x + width, y + radius);
        context2D.lineTo(x + width, y + height - radius);
        context2D.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context2D.lineTo(x + radius, y + height);
        context2D.quadraticCurveTo(x, y + height, x, y + height - radius);
        context2D.lineTo(x, y + radius);
        context2D.quadraticCurveTo(x, y, x + radius, y);
        context2D.closePath();
    };
    var getOffset = function (size) {
        var containerHalfWidth = size.width / 2;
        var containerHalfHeight = size.height / 2;
        var ww = size.width / 2.4;
        var hh = size.height / 2.4;
        var logoHalfWidth = ww / 2;
        var logoHalfHeight = hh / 2;
        return {
            x: containerHalfWidth - logoHalfWidth,
            y: containerHalfHeight - logoHalfHeight,
            ww: ww,
            hh: hh
        };
    };
    var QrCodeAuthenticationClient = /** @class */ (function () {
        function QrCodeAuthenticationClient(options, tokenProvider, httpClient, scene) {
            this.options = options;
            this.tokenProvider = tokenProvider;
            this.httpClient = httpClient;
            this.scene = scene;
            this.baseClient = new BaseAuthenticationClient_1.BaseAuthenticationClient(options);
        }
        /**
         * @name startScanning
         * @name_zh 一键开始扫码
         * @description 一键开始扫码
         *
         * @param {string} domId DOM 元素的 ID。
         * @param {Object} options
         * @param {boolean} options.autoExchangeUserInfo 是否自定义使用 ticket 换取用户信息
         * @param {number} options.interval 间隔时间，单位为毫秒，默认为 800 毫秒
         * @param {Function} options.onStart 开始轮询的事件回调函数, 第一个参数为 setInterval 返回的计时器，可以用 clearInterval 取消此计时器
         * @param {Function} options.onResult 获取到二维码最新状态事件回调函数，第一个参数为的类型为 QRCodeStatus。
         * @param {Function} options.onScanned 用户首次扫码事件回调函数。此时用户还没有授权，回调的用户信息中通仅包含昵称和头像，用作展示目的。
         * 出于安全性考虑，默认情况下，userInfo 只会包含昵称（nickname）和头像（photo）两个字段，开发者也可以在后台配置使其返回完整用户信息，
         * @param {Function} options.onSuccess 用户同意授权事件回调函数。该函数只会回调一次，之后轮询结束。第一个参数为 userInfo 用户信息，第二个参数为 ticket，用于换取用户的详情。
         * 详情见 https://docs.authing.co/scan-qrcode/app-qrcode/customize.html。
         * ticket 可以用来换取完整的用户信息，相关接口见 https://docs.authing.co/scan-qrcode/app-qrcode/full-api-list.html。
         * @param {Function} options.onCancel 用户取消授权事件回调函数。该事件只会回调一次，之后轮询结束。
         * @param {Function} options.onError 获取二维码状态失败事件回调函数。常见原因为网络失败等，每次查询失败时都会回调。回调参数 data 示例如 {"code": 2241,"message": "二维码不存在" }
         * @param {Function} options.onExpired 二维码失效时被回调，只回调一次，之后轮询结束。
         * @param {Function} options.onCodeShow 二维码首次成功显示的事件。
         * @param {Function} options.onCodeLoaded 二维码首次成功 Load 的事件。
         * @param {Function} options.onCodeLoadFailed 二维码加载失败的事件。
         * @param {Function} options.onCodeDestroyed 二维码被销毁的事件。
         * @param {string} options.extIdpConnId 多租户用的额外的 Idp Id。
         * @param {Function} options.onRetry 二维码重试事件。
         * @param {Object} options.size 二维码图片大小，默认为 240 * 240，单位为 px 。
         * @param {number} options.size.height 高度
         * @param {number} options.size.width 宽度
         * @param {Object} options.containerSize DOM 容器大小，默认为 300 * 300，单位为 px 。
         * @param {number} options.containerSize.height 高度
         * @param {number} options.containerSize.width 宽度
         * @param {Object} options.tips 自定义提示信息
         * @param {number} options.tips.title
         * @param {number} options.tips.scanned
         * @param {Object} options.tips.succeed
         * @param {number} options.tips.canceled
         * @param {number} options.tips.expired
         * @param {number} options.tips.retry
         * @param {number} options.tips.failed
         *
         * @example
         *
         * authenticationClient.wxqrcode.startScanning("qrcode", {
         *  onSuccess: (userInfo, ticket) => {
         *    console.log(userInfo, ticket)
         *  },
         *  onError: (message) => onFail && onFail(`${message}`),
         * });
         *
         * @returns {null}
         * @memberof QrCodeAuthenticationClient
         *
         */
        QrCodeAuthenticationClient.prototype.startScanning = function (domId, options) {
            return __awaiter(this, void 0, void 0, function () {
                function genRetry(qrcodeElm, tipText, retryId) {
                    return __awaiter(this, void 0, void 0, function () {
                        var tip, qrcodeImage, shadow;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    tip = genTip(tipText);
                                    nodeWrapper = document.createElement('div');
                                    nodeWrapper.id = 'authing__qrcode-wrapper';
                                    nodeWrapper.style.textAlign = 'center';
                                    nodeWrapper.style.position = 'relative';
                                    return [4 /*yield*/, genImage('https://usercontents.authing.cn/0ab3a1bf19c0d7106673e494d532f91a.png')];
                                case 1:
                                    qrcodeImage = _a.sent();
                                    if (!needGenerate) {
                                        qrcodeImage.style.marginTop = '12px';
                                    }
                                    else {
                                        qrcodeImage.style.marginTop = '16px';
                                    }
                                    qrcodeImage.onload = function () {
                                        unloading();
                                    };
                                    shadow = genShadow(retry, function () {
                                        if (onRetry) {
                                            onRetry();
                                        }
                                        start();
                                    }, retryId || '__authing_retry_btn');
                                    nodeWrapper.appendChild(qrcodeImage);
                                    nodeWrapper.appendChild(shadow);
                                    nodeWrapper.appendChild(tip);
                                    qrcodeElm.appendChild(nodeWrapper);
                                    return [2 /*return*/];
                            }
                        });
                    });
                }
                var _a, autoExchangeUserInfo, _b, size, _c, containerSize, _d, interval, onStart, onResult, onScanned, onExpired, onSuccess, onCancel, onError, onCodeShow, onCodeLoaded, onCodeLoadFailed, onRetry, _e, 
                // onCodeDestroyed,
                tips, context, customData, extIdpConnId, withCustomData, lang, nowLang, _f, title, _g, 
                // scanned = '用户已扫码，等待确认',
                canceled, _h, expired, _j, succeed, _k, retry, node, nodeWrapper, needGenerate, styleNode, style, loading, unloading, genTip, genImage, genLogoInCenter, genShadow, displayScannedUser, start;
                var _this = this;
                return __generator(this, function (_l) {
                    options = options || {};
                    _a = options.autoExchangeUserInfo, autoExchangeUserInfo = _a === void 0 ? false : _a, _b = options.size, size = _b === void 0 ? {
                        height: 240,
                        width: 240
                    } : _b, _c = options.containerSize, containerSize = _c === void 0 ? {
                        height: 300,
                        width: 300
                    } : _c, _d = options.interval, interval = _d === void 0 ? 800 : _d, onStart = options.onStart, onResult = options.onResult, onScanned = options.onScanned, onExpired = options.onExpired, onSuccess = options.onSuccess, onCancel = options.onCancel, onError = options.onError, onCodeShow = options.onCodeShow, onCodeLoaded = options.onCodeLoaded, onCodeLoadFailed = options.onCodeLoadFailed, onRetry = options.onRetry, _e = options.tips, tips = _e === void 0 ? {} : _e, context = options.context, customData = options.customData, extIdpConnId = options.extIdpConnId, withCustomData = options.withCustomData;
                    lang = this.options.lang;
                    nowLang = lang === 'zh-CN';
                    _f = tips.title, title = _f === void 0 ? nowLang
                        ? "\u4F7F\u7528 <strong> " + (this.scene === 'APP_AUTH' ? 'APP' : '微信') + " </strong> \u626B\u7801\u767B\u5F55"
                        : "use <strong> " + (this.scene === 'APP_AUTH' ? 'APP' : 'Wechat') + " </strong> scan code login" : _f, _g = tips.canceled, canceled = _g === void 0 ? nowLang ? '用户取消授权' : 'User cancel authorization' : _g, _h = tips.expired, expired = _h === void 0 ? nowLang ? '二维码已过期' : 'QR code has expired' : _h, _j = tips.succeed, succeed = _j === void 0 ? nowLang ? '扫码成功' : 'Scan code successfully' : _j, _k = tips.retry, retry = _k === void 0 ? nowLang ? '重试' : 'Retry' : _k;
                    node = document.getElementById(domId);
                    needGenerate = false;
                    if (!node) {
                        node = document.createElement('div');
                        node.id = domId;
                        utils_1.createCssClassStyleSheet('__authing-qrcode-node-mount', "z-index: 65535;position: fixed;background: #fff;width: " + containerSize.width + "px;height: " + containerSize.height + "px;left: 50%;margin-left: -" + containerSize.width /
                            2 + "px;display: flex;justify-content: center;align-items: center;top: 50%;margin-top: -" + containerSize.height /
                            2 + "px;border: 1px solid #ccc;");
                        node.classList.add('__authing-qrcode-node-mount');
                        document.getElementsByTagName('body')[0].appendChild(node);
                        needGenerate = true;
                    }
                    else {
                        node.style.position = 'relative';
                    }
                    styleNode = document.createElement('style');
                    style = '#authing__retry a:hover{outline:0px;text-decoration:none;}#authing__spinner{position:absolute;left:50%;margin-left:-6px;}.spinner{margin:100px auto;width:20px;height:20px;position:relative}.container1>div,.container2>div,.container3>div{width:6px;height:6px;background-color:#00a1ea;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.spinner .spinner-container{position:absolute;width:100%;height:100%}.container2{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.container3{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.circle1{top:0;left:0}.circle2{top:0;right:0}.circle3{right:0;bottom:0}.circle4{left:0;bottom:0}.container2 .circle1{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.container3 .circle1{-webkit-animation-delay:-1.0s;animation-delay:-1.0s}.container1 .circle2{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.container2 .circle2{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.container3 .circle2{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.container1 .circle3{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.container2 .circle3{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.container3 .circle3{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.container1 .circle4{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.container2 .circle4{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.container3 .circle4{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@-webkit-keyframes bouncedelay{0%,80%,100%{-webkit-transform:scale(0.0)}40%{-webkit-transform:scale(1.0)}}@keyframes bouncedelay{0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}';
                    styleNode.type = 'text/css';
                    if (styleNode.style) {
                        styleNode.style.cssText = style;
                    }
                    else {
                        styleNode.innerHTML = style;
                    }
                    document.getElementsByTagName('head')[0].appendChild(styleNode);
                    loading = function () {
                        node.innerHTML =
                            '<div id="authing__spinner" class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
                    };
                    unloading = function () {
                        var child = document.getElementById('authing__spinner');
                        if (child)
                            node.removeChild(child);
                    };
                    genTip = function (text) {
                        var formattedText;
                        try {
                            formattedText = JSON.parse(text).message || text;
                        }
                        catch (e) {
                            formattedText = text;
                        }
                        var tip = document.createElement('span');
                        tip.className = 'authing__heading-subtitle';
                        if (!needGenerate) {
                            utils_1.createCssClassStyleSheet('__authing__heading-subtitle-style', 'display: block;font-weight: 400;font-size: 15px;color: #888;line-height: 48px;');
                            tip.classList.add('__authing__heading-subtitle-style');
                        }
                        else {
                            utils_1.createCssClassStyleSheet('__authing__heading-subtitle-style', 'display: block;font-weight: 400;font-size: 12px;color: #888;');
                            tip.classList.add('__authing__heading-subtitle-style');
                        }
                        tip.innerHTML = formattedText;
                        return tip;
                    };
                    genImage = function (src) {
                        return new Promise(function (resolve) {
                            var qrcodeImage = document.createElement('img');
                            // qrcodeImage.className = 'authing__qrcode';
                            qrcodeImage.src = src;
                            qrcodeImage.width = size.width;
                            qrcodeImage.height = size.height;
                            qrcodeImage.setAttribute('crossOrigin', 'Anonymous');
                            // qrcodeImage.draggable = false;
                            qrcodeImage.onload = function () {
                                resolve(qrcodeImage);
                            };
                        });
                    };
                    genLogoInCenter = function (logo) {
                        // logo 有可能是 undefined，走 onerror 不解除 display:none 即可
                        // 因此，即便是空的 src 地址，为了保证类型一致，同样要返回 HTMLImageElement
                        return new Promise(function (resolve) {
                            var qrcodeLogo = document.createElement('img');
                            qrcodeLogo.src = logo;
                            qrcodeLogo.setAttribute('crossOrigin', 'Anonymous');
                            // qrcodeLogo.className = 'authing__qrcode__logo';
                            // qrcodeLogo.draggable = false;
                            // qrcodeLogo.style.display = 'none';
                            // qrcodeLogo.style.borderRadius = '50%';
                            // 这里设置宽高没啥意义，不设置可能会导致 safari 报错
                            qrcodeLogo.width = size.width / 2.4;
                            qrcodeLogo.height = size.height / 2.4;
                            // // 计算得到 offset 数值
                            // let containerHalfWidth = size.width / 2;
                            // let containerHalfHeight = size.height / 2;
                            // let logoHalfWidth = qrcodeLogo.width / 2;
                            // let logoHalfHeight = qrcodeLogo.height / 2;
                            // let offset = {
                            //   x: containerHalfWidth - logoHalfWidth,
                            //   y: containerHalfHeight - logoHalfHeight
                            // };
                            // createCssClassStyleSheet(
                            //   'authing__qrcode__logo',
                            //   `
                            //     border-radius: 50%;
                            //     position: absolute;
                            //     left: ${offset.y}px;
                            //     top: ${offset.x}px;
                            //   `
                            // );
                            qrcodeLogo.onload = function () {
                                qrcodeLogo.style.display = 'inline';
                                resolve(qrcodeLogo);
                            };
                            qrcodeLogo.onerror = function () {
                                resolve(qrcodeLogo);
                            };
                        });
                    };
                    genShadow = function (text, aOnClick, shadowAId) {
                        var shadowId = 'authing__retry';
                        if (document.getElementById(shadowId)) {
                            document.getElementById(shadowId).remove();
                        }
                        var shadow = document.createElement('div');
                        shadow.id = shadowId;
                        utils_1.createCssClassStyleSheet('__authing-shadow-style', "text-align:center;width: " + size.width + "px;height: " + size.height + "px;position: absolute;left: 50%;top: 0px;margin-left: -" + size.width /
                            2 + "px;background-color: rgba(0,0,0, 0.5);line-height:" + size.height + "px;color:#fff;font-weight:600;");
                        shadow.classList.add('__authing-shadow-style');
                        var shadowA = document.createElement('a');
                        shadowA.innerHTML = text;
                        shadowA.style.color = '#fff';
                        shadowA.style.borderBottom = '1px solid #fff';
                        shadowA.style.cursor = 'pointer';
                        if (aOnClick) {
                            shadowA.addEventListener('click', aOnClick);
                        }
                        shadowA.id = shadowAId;
                        shadow.appendChild(shadowA);
                        return shadow;
                    };
                    displayScannedUser = function (_, photo) {
                        var shadowId = 'authing__retry';
                        if (document.getElementById(shadowId)) {
                            document.getElementById(shadowId).remove();
                        }
                        var shadow = document.createElement('div');
                        utils_1.createCssClassStyleSheet('__authing-shadow-style-position', "text-align:center;width: " + size.width + "px;height: " + size.height + "px;position: absolute;left: 50%;top: 0px;margin-left: -" + size.width /
                            2 + "px;line-height:" + size.height + "px;color:#fff;font-weight:600;display: flex;\n      align-items: center; /*\u5782\u76F4\u5C45\u4E2D*/\n      justify-content: center; /*\u6C34\u5E73\u5C45\u4E2D*/");
                        shadow.classList.add('__authing-shadow-style-position');
                        shadow.id = shadowId;
                        var img = document.createElement('img');
                        img.id = 'authing__scanned-user';
                        img.src = photo;
                        img.style.width = '100px';
                        img.style.height = '100px';
                        shadow.appendChild(img);
                        return shadow;
                    };
                    start = function () { return __awaiter(_this, void 0, void 0, function () {
                        var random, url, logo, data, error_1, qrcodeImage, qrcodeLogo, canvas, context2D, _a, x, y, ww, hh, base64, img, decoratedOnSuccess, decoratedOnScanned, decoratedOnCancel, decoratedOnExpired, decoratedOnError, tip;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    loading();
                                    random = null;
                                    url = null;
                                    logo = null;
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.geneCode({
                                            context: context,
                                            customData: customData,
                                            extIdpConnId: extIdpConnId,
                                            withCustomData: withCustomData
                                        })];
                                case 2:
                                    data = _b.sent();
                                    random = data.random;
                                    url = data.url;
                                    logo = data.customLogo;
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _b.sent();
                                    error_1 = error_1;
                                    genRetry(node, error_1.message);
                                    if (onCodeLoadFailed) {
                                        onCodeLoadFailed(error_1);
                                    }
                                    return [2 /*return*/];
                                case 4:
                                    if (onCodeLoaded) {
                                        onCodeLoaded(random, url);
                                    }
                                    nodeWrapper = document.createElement('div');
                                    nodeWrapper.id = 'authing__qrcode-wrapper';
                                    nodeWrapper.style.textAlign = 'center';
                                    nodeWrapper.style.position = 'relative';
                                    nodeWrapper.style.margin = 'auto';
                                    return [4 /*yield*/, genImage(url)];
                                case 5:
                                    qrcodeImage = _b.sent();
                                    if (!logo) return [3 /*break*/, 7];
                                    return [4 /*yield*/, genLogoInCenter(logo)];
                                case 6:
                                    qrcodeLogo = _b.sent();
                                    _b.label = 7;
                                case 7:
                                    canvas = document.createElement('canvas');
                                    canvas.width = size.width;
                                    canvas.height = size.height;
                                    context2D = canvas.getContext('2d');
                                    url && context2D.drawImage(qrcodeImage, 0, 0, size.width, size.height);
                                    _a = getOffset(size), x = _a.x, y = _a.y, ww = _a.ww, hh = _a.hh;
                                    context2D.save();
                                    roundedImage(context2D, x, y, ww, hh, ww / 2);
                                    context2D.clip();
                                    try {
                                        qrcodeLogo && context2D.drawImage(qrcodeLogo, x, y, ww, hh);
                                    }
                                    catch (_c) {
                                        console.log('Draw stop, check qrcodeLogo', qrcodeLogo);
                                    }
                                    context2D.restore();
                                    try {
                                        base64 = canvas.toDataURL();
                                        img = document.createElement('img');
                                        img.src = base64;
                                        nodeWrapper.appendChild(img);
                                    }
                                    catch (_d) {
                                        // base64 不可行，可能被浏览器拦截（同源策略）
                                        // 直接绘制 canvas 并渲染，确保基本功能可用
                                        nodeWrapper.appendChild(canvas);
                                    }
                                    unloading();
                                    if (onCodeShow) {
                                        onCodeShow(random, url);
                                    }
                                    decoratedOnSuccess = function (userInfo, ticket) {
                                        var shadow = genShadow(succeed, null, '__authing_success_tip');
                                        nodeWrapper.appendChild(shadow);
                                        if (onSuccess) {
                                            if (autoExchangeUserInfo) {
                                                var token = userInfo.token;
                                                if (!token) {
                                                    // 轮询接口不会返回完整用户信息，需要使用 ticket 换取
                                                    _this.exchangeUserInfo(ticket).then(function (userInfo) {
                                                        // @ts-ignore
                                                        _this.tokenProvider.setUser(userInfo);
                                                        // @ts-ignore
                                                        onSuccess(userInfo, ticket);
                                                    });
                                                }
                                            }
                                            else {
                                                onSuccess(userInfo, ticket);
                                            }
                                        }
                                    };
                                    decoratedOnScanned = function (userInfo) {
                                        var shadow = displayScannedUser(userInfo.nickname, userInfo.photo);
                                        nodeWrapper.appendChild(shadow);
                                        if (onScanned) {
                                            onScanned(userInfo);
                                        }
                                    };
                                    decoratedOnCancel = function () {
                                        var shadow = genShadow(canceled, null, '__authing_success_tip');
                                        nodeWrapper.appendChild(shadow);
                                        if (onCancel) {
                                            onCancel();
                                        }
                                    };
                                    decoratedOnExpired = function () {
                                        var shadow = genShadow(expired, function () {
                                            nodeWrapper.innerHTML = '';
                                            start();
                                        }, '__authing_success_tip');
                                        nodeWrapper.appendChild(shadow);
                                        if (onExpired) {
                                            onExpired();
                                        }
                                    };
                                    decoratedOnError = function (data) {
                                        var message = data.message;
                                        if (onError) {
                                            onError(message);
                                        }
                                    };
                                    // 开始轮询
                                    this.startPolling(random, {
                                        interval: interval,
                                        onStart: onStart,
                                        onResult: onResult,
                                        onScanned: decoratedOnScanned,
                                        onExpired: decoratedOnExpired,
                                        onSuccess: decoratedOnSuccess,
                                        onCancel: decoratedOnCancel,
                                        onError: decoratedOnError
                                    });
                                    tip = genTip(title);
                                    nodeWrapper.appendChild(tip);
                                    node.appendChild(nodeWrapper);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    start();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * @name geneCode
         * @name_zh 生成二维码
         * @description 生成二维码
         *
         * @example
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const { url, random } = await authenticationClient.wxqrcode.geneCode()
         *
         * # random 二维码唯一 ID
         * # url 二维码链接
         *
         * @returns {Promise<QRCodeGenarateResult>}
         * @memberof QrCodeAuthenticationClient
         */
        QrCodeAuthenticationClient.prototype.geneCode = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, context, customData, extIdpConnId, withCustomData, api, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = options || {}, context = _a.context, customData = _a.customData, extIdpConnId = _a.extIdpConnId, withCustomData = _a.withCustomData;
                            api = this.baseClient.appHost + "/api/v2/qrcode/gene";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        autoMergeQrCode: false,
                                        scene: this.scene,
                                        context: context,
                                        params: customData,
                                        extIdpConnId: extIdpConnId,
                                        withCustomData: withCustomData
                                    }
                                })];
                        case 1:
                            data = _b.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name checkStatus
         * @name_zh 检测扫码状态
         * @description 检测扫码状态
         *
         * @param {string} random
         *
         * @example
         *
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const { random, status, ticket, userInfo } = await authenticationClient.wxqrcode.checkStatus('RANDOM')
         * # status: 二维码状态: 0 - 未使用, 1 - 已扫码, 2 - 已授权, 3 - 取消授权, -1 - 已过期
         * # ticket: 用于换取用户信息的一个随机字符串
         * # userInfo: 用户信息
         *
         * @returns {Promise<QRCodeStatus>}
         * @memberof QrCodeAuthenticationClient
         */
        QrCodeAuthenticationClient.prototype.checkStatus = function (random) {
            return __awaiter(this, void 0, void 0, function () {
                var api, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/qrcode/check?random=" + random;
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'GET',
                                    url: api
                                })];
                        case 1:
                            data = _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        };
        /**
         * @name exchangeUserInfo
         * @name_zh 使用 ticket 交换用户信息
         * @description 使用 ticket 交换用户信息
         *
         * @example
         *
         * const authenticationClient = new AuthenticationClient({
         *    appId: "YOUR_APP_ID",
         * })
         * const user = await authenticationClient.wxqrcode.exchangeUserInfo('TICKET')
         * # user: 完整的用户信息，其中 user.token 为用户的登录凭证。
         *
         * @param {string} ticket ticket
         * @returns {Promise<Partial<User>>}
         * @memberof QrCodeAuthenticationClient
         */
        QrCodeAuthenticationClient.prototype.exchangeUserInfo = function (ticket) {
            return __awaiter(this, void 0, void 0, function () {
                var api, userInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            api = this.baseClient.appHost + "/api/v2/qrcode/userinfo";
                            return [4 /*yield*/, this.httpClient.request({
                                    method: 'POST',
                                    url: api,
                                    data: {
                                        ticket: ticket
                                    }
                                })];
                        case 1:
                            userInfo = _a.sent();
                            return [2 /*return*/, userInfo];
                    }
                });
            });
        };
        /**
         * @name startPolling
         * @name_zh 开始轮询二维码状态
         * @description 开始轮询二维码状态
         *
         * @param {string} random 二维码唯一 ID
         * @param {Object} options
         * @param {number} options.interval 间隔时间，单位为毫秒，默认为 800 毫秒
         * @param {Function} options.onStart 开始轮询的事件回调函数, 第一个参数为 setInterval 返回的计时器，可以用 clearInterval 取消此计时器
         * @param {Function} options.onResult 获取到二维码最新状态事件回调函数，第一个参数为的类型为 QRCodeStatus。
         * @param {Function} options.onScanned 用户首次扫码事件回调函数。此时用户还没有授权，回调的用户信息中通仅包含昵称和头像，用作展示目的。
         * 出于安全性考虑，默认情况下，userInfo 只会包含昵称（nickname）和头像（photo）两个字段，开发者也可以在后台配置使其返回完整用户信息，
         * @param {Function} options.onSuccess 用户同意授权事件回调函数。该函数只会回调一次，之后轮询结束。第一个参数为 userInfo 用户信息，第二个参数为 ticket，用于换取用户的详情。
         * 详情见 https://docs.authing.co/scan-qrcode/app-qrcode/customize.html。
         * ticket 可以用来换取完整的用户信息，相关接口见 https://docs.authing.co/scan-qrcode/app-qrcode/full-api-list.html。
         * @param {Function} options.onCancel 用户取消授权事件回调函数。该事件只会回调一次，之后轮询结束。
         * @param {Function} options.onError 获取二维码状态失败事件回调函数。常见原因为网络失败等，每次查询失败时都会回调。回调参数 data 示例如 {"code": 2241,"message": "二维码不存在" }
         * @param {Function} options.onExpired 二维码失效时被回调，只回调一次，之后轮询结束。
         *
         * @returns {null}
         * @memberof QrCodeAuthenticationClient
         */
        QrCodeAuthenticationClient.prototype.startPolling = function (random, options) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, interval, onStart, onResult, onScanned, onExpired, onSuccess, onCancel, onError, calledOnScanned, callOnPoolingStart, timer;
                var _this = this;
                return __generator(this, function (_b) {
                    options = options || {};
                    _a = options.interval, interval = _a === void 0 ? 800 : _a, onStart = options.onStart, onResult = options.onResult, onScanned = options.onScanned, onExpired = options.onExpired, onSuccess = options.onSuccess, onCancel = options.onCancel, onError = options.onError;
                    calledOnScanned = false;
                    callOnPoolingStart = false;
                    timer = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var data, status_1, ticket, userInfo, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // 开始轮询时回调 onPollingStart
                                    if (onStart && !callOnPoolingStart) {
                                        onStart(timer);
                                        callOnPoolingStart = true;
                                    }
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.checkStatus(random)];
                                case 2:
                                    data = _a.sent();
                                    status_1 = data.status, ticket = data.ticket, userInfo = data.userInfo;
                                    // 每次获取到数据都回调 onResult 函数
                                    if (onResult) {
                                        onResult(data);
                                    }
                                    // 过期
                                    if (status_1 === -1) {
                                        clearInterval(timer);
                                        if (onExpired) {
                                            onExpired();
                                        }
                                    }
                                    // 未扫码
                                    if (status_1 === 0) {
                                    }
                                    // 已扫码
                                    if (status_1 === 1) {
                                        if (onScanned && !calledOnScanned) {
                                            onScanned(userInfo);
                                            calledOnScanned = true;
                                        }
                                    }
                                    // 已授权
                                    if (status_1 === 2) {
                                        clearInterval(timer);
                                        if (onSuccess) {
                                            onSuccess(userInfo, ticket);
                                        }
                                    }
                                    // 已取消
                                    if (status_1 === 3) {
                                        clearInterval(timer);
                                        if (onCancel) {
                                            onCancel();
                                        }
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _a.sent();
                                    if (onError) {
                                        onError(error_2);
                                    }
                                    clearInterval(timer);
                                    return [2 /*return*/];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, interval);
                    return [2 /*return*/, timer];
                });
            });
        };
        QrCodeAuthenticationClient.prototype.stopPolling = function (timer) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    clearInterval(timer);
                    return [2 /*return*/];
                });
            });
        };
        return QrCodeAuthenticationClient;
    }());
    exports.QrCodeAuthenticationClient = QrCodeAuthenticationClient;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXJDb2RlQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL1FyQ29kZUF1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQU9BLGtDQUFvRDtJQUdwRCx1RUFBc0U7SUFFdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFFSCxJQUFJLFlBQVksR0FBRyxVQUNqQixTQUFtQyxFQUNuQyxDQUFTLEVBQ1QsQ0FBUyxFQUNULEtBQWEsRUFDYixNQUFjLEVBQ2QsTUFBYztRQUVkLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDaEUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDakQsU0FBUyxDQUFDLGdCQUFnQixDQUN4QixDQUFDLEdBQUcsS0FBSyxFQUNULENBQUMsR0FBRyxNQUFNLEVBQ1YsQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLEVBQ2xCLENBQUMsR0FBRyxNQUFNLENBQ1gsQ0FBQztRQUNGLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENB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