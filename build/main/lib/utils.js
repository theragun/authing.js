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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUFrRDtBQUMxQyxJQUFBLFNBQVMsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQTNCLENBQTRCO0FBRXRDLElBQU0sT0FBTyxHQUFHLFVBQU8sU0FBaUIsRUFBRSxTQUFpQixFQUFFLFVBQXVCOztRQUN6RixzQkFBTyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUN6QyxZQUFZO2dCQUNaLElBQUksVUFBVSxJQUFLLENBQUEsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLElBQUksTUFBSyxLQUFLLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO3dCQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7cUJBQzlDO29CQUNELElBQUk7d0JBQ00sSUFBQSxHQUFHLEdBQUssT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUF6QixDQUF5Qjt3QkFDcEMsSUFBTSxXQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNqRSxPQUFPLE9BQU8sQ0FBQyxTQUFPLFdBQVcsQ0FBQyxDQUFDO3FCQUNwQztvQkFBQyxPQUFPLEdBQUcsRUFBRTt3QkFDWixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7cUJBQ3JDO2lCQUNGO2dCQUVELElBQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTztnQkFFMUMsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8s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