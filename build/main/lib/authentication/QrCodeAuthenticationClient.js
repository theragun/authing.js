"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXJDb2RlQXV0aGVudGljYXRpb25DbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2F1dGhlbnRpY2F0aW9uL1FyQ29kZUF1dGhlbnRpY2F0aW9uQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLGtDQUFvRDtBQUdwRCx1RUFBc0U7QUFFdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFFSCxJQUFJLFlBQVksR0FBRyxVQUNqQixTQUFtQyxFQUNuQyxDQUFTLEVBQ1QsQ0FBUyxFQUNULEtBQWEsRUFDYixNQUFjLEVBQ2QsTUFBYztJQUVkLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDaEUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDakQsU0FBUyxDQUFDLGdCQUFnQixDQUN4QixDQUFDLEdBQUcsS0FBSyxFQUNULENBQUMsR0FBRyxNQUFNLEVBQ1YsQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLEVBQ2xCLENBQUMsR0FBRyxNQUFNLENBQ1gsQ0FBQztJQUNGLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDekMs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