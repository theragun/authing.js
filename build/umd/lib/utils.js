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
        define(["require", "exports", "../types/graphql.v2"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pickBy = exports.generateRandomString = exports.convertObjectToKeyValueList = exports.convertKeyValueListToObject = exports.uploadFile = exports.xhrUpload = exports.generateUidKey = exports.formatAuthorizedResources = exports.isMobileBrowser = exports.isLarkBrowser = exports.isWechatBrowser = exports.convertUdvToKeyValuePair = exports.convertUdv = exports.serialize = exports.createCssClassStyleSheet = exports.popupCenter = exports.deepEqual = exports.encrypt = void 0;
    var graphql_v2_1 = require("../types/graphql.v2");
    var JSEncrypt = require('./jsencrypt').JSEncrypt;
    var encrypt = function (plainText, publicKey, encryption) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // 国密支持，动态引入
                    if (encryption && (encryption === null || encryption === void 0 ? void 0 : encryption.type) === 'sm2') {
                        if (!encryption.publicKey) {
                            throw new Error('未配置: encryption.publicKey');
                        }
                        try {
                            var sm2 = require('sm-crypto').sm2;
                            var encrypted_1 = sm2.doEncrypt(plainText, encryption.publicKey);
                            return resolve("sm2:" + encrypted_1);
                        }
                        catch (err) {
                            throw new Error('未安装模块: sm-crypto');
                        }
                    }
                    var jsencrypt = new JSEncrypt({});
                    jsencrypt.setPublicKey(publicKey); // 设置公钥
                    var encrypted = jsencrypt.encrypt(plainText);
                    if (encrypted) {
                        resolve(encrypted);
                    }
                    else {
                        reject(encrypted);
                    }
                })];
        });
    }); };
    exports.encrypt = encrypt;
    function buildTree(nodes) {
        /* nodes structure
        [
          {"id": "1", "children": ["2"], "root": true},
          {"id": "2", "children": ["3", "4"], "root": false},
          {"id": "3", "children": [], "root": false},
          {"id": "4", "children": [], "root": false},
        ]
      
        转换成 ->
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: []
                },
                {
                  id: 4,
                  children: []
                }
              ]
            }
          ]
        }
        */
        var rootNodes = [nodes.find(function (x) { return x.root === true; })];
        var mapChildren = function (childId) {
            var node = nodes.find(function (x) { return x.id === childId; }) || null;
            if (Array.isArray(node.children) && node.children.length > 0) {
                node.children = node.children
                    .map(mapChildren)
                    .filter(function (node) { return node !== null; });
            }
            return node;
        };
        var tree = rootNodes.map(function (node) {
            node.children = node.children
                .map(mapChildren)
                .filter(function (node) { return node !== null; });
            return node;
        });
        return tree[0];
    }
    exports.default = buildTree;
    var deepEqual = function (x, y) {
        if (x === y) {
            return true;
        }
        else if (typeof x == 'object' &&
            x != null &&
            typeof y == 'object' &&
            y != null) {
            if (Object.keys(x).length != Object.keys(y).length)
                return false;
            for (var prop in x) {
                if (y.hasOwnProperty(prop)) {
                    if (!exports.deepEqual(x[prop], y[prop]))
                        return false;
                }
                else
                    return false;
            }
            return true;
        }
        else
            return false;
    };
    exports.deepEqual = deepEqual;
    var popupCenter = function (url, _a) {
        var _b = _a === void 0 ? { w: 585, h: 649 } : _a, w = _b.w, h = _b.h;
        // Fixes dual-screen position                             Most browsers      Firefox
        var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        var dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
        var width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
                ? document.documentElement.clientWidth
                : window.screen.width;
        var height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
                ? document.documentElement.clientHeight
                : window.screen.height;
        var systemZoom = width / window.screen.availWidth;
        var left = (width - w) / 2 / systemZoom + dualScreenLeft;
        var top = (height - h) / 2 / systemZoom + dualScreenTop;
        var newWindow = window.open(url, '_blank', "\n      toolbar=no,\n      menubar=no,\n      scrollbars=no,\n      resizable=no,\n      location=no,\n      status=no\n      width=" + w / systemZoom + ",\n      height=" + h / systemZoom + ",\n      top=" + top + ",\n      left=" + left + "\n      ");
        newWindow === null || newWindow === void 0 ? void 0 : newWindow.focus();
    };
    exports.popupCenter = popupCenter;
    var createCssClassStyleSheet = function (className, styleSheet) {
        var styleTag = document.createElement('style');
        var styleText = "\n    ." + className + " {\n      " + styleSheet + "\n    }\n  ";
        var textNode = document.createTextNode(styleText);
        styleTag.appendChild(textNode);
        document.head.appendChild(styleTag);
    };
    exports.createCssClassStyleSheet = createCssClassStyleSheet;
    var serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                if (obj[p] !== undefined) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
            }
        return str.join('&');
    };
    exports.serialize = serialize;
    var convertUdv = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var dataType = item.dataType, value = item.value;
            if (dataType === graphql_v2_1.UdfDataType.Number) {
                item.value = JSON.parse(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Boolean) {
                item.value = JSON.parse(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Datetime) {
                item.value = new Date(parseInt(value));
            }
            else if (dataType === graphql_v2_1.UdfDataType.Object) {
                item.value = JSON.parse(value);
            }
        }
        return data;
    };
    exports.convertUdv = convertUdv;
    var isNumeric = function (str) {
        if (typeof str != 'string')
            return false; // we only process strings!
        return (
        // @ts-ignore
        !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        ); // ...and ensure strings of whitespace fail
    };
    var convertUdvToKeyValuePair = function (data) {
        data = data || [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var item = data_2[_i];
            var dataType = item.dataType, value = item.value;
            if (dataType === graphql_v2_1.UdfDataType.Number) {
                item.value = JSON.parse(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Boolean) {
                item.value = JSON.parse(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Datetime) {
                item.value = isNumeric(value)
                    ? new Date(parseInt(value))
                    : new Date(value);
            }
            else if (dataType === graphql_v2_1.UdfDataType.Object) {
                item.value = JSON.parse(value);
            }
        }
        var ret = {};
        for (var _a = 0, data_3 = data; _a < data_3.length; _a++) {
            var item = data_3[_a];
            ret[item.key] = item.value;
        }
        return ret;
    };
    exports.convertUdvToKeyValuePair = convertUdvToKeyValuePair;
    var isWechatBrowser = function () {
        return typeof navigator !== 'undefined' &&
            /MicroMessenger/i.test(navigator === null || navigator === void 0 ? void 0 : navigator.userAgent);
    };
    exports.isWechatBrowser = isWechatBrowser;
    var isLarkBrowser = function () {
        return typeof navigator !== 'undefined' && /Lark/i.test(navigator.userAgent);
    };
    exports.isLarkBrowser = isLarkBrowser;
    var isMobileBrowser = function () {
        return exports.isWechatBrowser() || exports.isLarkBrowser();
    };
    exports.isMobileBrowser = isMobileBrowser;
    var formatAuthorizedResources = function (resources) {
        return resources.map(function (resource) {
            for (var key in resource) {
                if (!resource[key]) {
                    delete resource[key];
                }
            }
            return resource;
        });
    };
    exports.formatAuthorizedResources = formatAuthorizedResources;
    function generateUidKey(number) {
        var map = [];
        for (var i = 97; i < 123; i++) {
            map.push(String.fromCharCode(i));
        }
        var arr = [];
        while (number--) {
            var rand = Math.floor(Math.random() * 16);
            arr.push(map[rand]);
        }
        return arr.join('');
    }
    exports.generateUidKey = generateUidKey;
    var xhrUpload = function (file, url) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append('file', file, file instanceof Blob ? 'personal.jpeg' : undefined);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                // 上传成功
                if (this.readyState === 4) {
                    try {
                        var res = JSON.parse(this.responseText);
                        var code = res.code, message = res.message, data = res.data;
                        if (code !== 200) {
                            reject({
                                code: code,
                                message: message
                            });
                        }
                        resolve(data);
                    }
                    catch (error) {
                        var code = 500;
                        var message = "\u4E0A\u4F20\u56FE\u7247\u5931\u8D25, error = " + error.message;
                        reject({
                            code: code,
                            message: message
                        });
                    }
                }
            };
            xhr.open('POST', url);
            xhr.send(formData);
        });
    };
    exports.xhrUpload = xhrUpload;
    function uploadFile(opts) {
        var url = opts.url, accept = opts.accept, multiple = opts.multiple;
        return new Promise(function (resolve, reject) {
            var inputElem = document.createElement('input');
            inputElem.type = 'file';
            inputElem.accept = accept;
            inputElem.multiple = multiple;
            inputElem.onchange = function () {
                var files = inputElem.files;
                if (!multiple) {
                    var file = files[0];
                    exports.xhrUpload(file, url)
                        .then(function (res) { return resolve(res); })
                        .catch(function (error) { return reject(error); });
                }
                else {
                    var promises = [];
                    var i = 0;
                    while (i < files.length) {
                        promises.push(exports.xhrUpload(files[i], url));
                        i++;
                    }
                    Promise.all(promises)
                        .then(function (res) { return resolve(res); })
                        .catch(function (error) { return reject(error); });
                }
            };
            inputElem.click();
        });
    }
    exports.uploadFile = uploadFile;
    var convertKeyValueListToObject = function (data) {
        var ret = {};
        for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
            var _a = data_4[_i], key = _a.key, value = _a.value;
            ret[key] = value;
        }
        return ret;
    };
    exports.convertKeyValueListToObject = convertKeyValueListToObject;
    var convertObjectToKeyValueList = function (data) {
        var ret = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            ret.push({
                key: key,
                value: data[key]
            });
        }
        return ret;
    };
    exports.convertObjectToKeyValueList = convertObjectToKeyValueList;
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
    var pickBy = function (obj, predicate) {
        var ret = {};
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (predicate(obj[key], key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    };
    exports.pickBy = pickBy;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLGtEQUFrRDtJQUMxQyxJQUFBLFNBQVMsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQTNCLENBQTRCO0lBRXRDLElBQU0sT0FBTyxHQUFHLFVBQU8sU0FBaUIsRUFBRSxTQUFpQixFQUFFLFVBQXVCOztZQUN6RixzQkFBTyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO29CQUN6QyxZQUFZO29CQUNaLElBQUksVUFBVSxJQUFLLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksTUFBSyxLQUFLLEVBQUU7d0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFOzRCQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7eUJBQzlDO3dCQUNELElBQUk7NEJBQ00sSUFBQSxHQUFHLEdBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUF6QixDQUF5Qjs0QkFDcEMsSUFBTSxXQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNqRSxPQUFPLE9BQU8sQ0FBQyxTQUFPLFdBQVcsQ0FBQyxDQUFDO3lCQUNwQzt3QkFBQyxPQUFPLEdBQUcsRUFBRTs0QkFDWixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7eUJBQ3JDO3FCQUNGO29CQUVELElBQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTztvQkFFMUMsSUFBTSxTQUFTLEdBQUcsU0FBUyxD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