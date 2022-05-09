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
import { UdfDataType } from '../types/graphql.v2';
var JSEncrypt = require('./jsencrypt').JSEncrypt;
export var encrypt = function (plainText, publicKey, encryption) { return __awaiter(void 0, void 0, void 0, function () {
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
export default function buildTree(nodes) {
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
export var deepEqual = function (x, y) {
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
                if (!deepEqual(x[prop], y[prop]))
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
export var popupCenter = function (url, _a) {
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
export var createCssClassStyleSheet = function (className, styleSheet) {
    var styleTag = document.createElement('style');
    var styleText = "\n    ." + className + " {\n      " + styleSheet + "\n    }\n  ";
    var textNode = document.createTextNode(styleText);
    styleTag.appendChild(textNode);
    document.head.appendChild(styleTag);
};
export var serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            if (obj[p] !== undefined) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
    return str.join('&');
};
export var convertUdv = function (data) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        var dataType = item.dataType, value = item.value;
        if (dataType === UdfDataType.Number) {
            item.value = JSON.parse(value);
        }
        else if (dataType === UdfDataType.Boolean) {
            item.value = JSON.parse(value);
        }
        else if (dataType === UdfDataType.Datetime) {
            item.value = new Date(parseInt(value));
        }
        else if (dataType === UdfDataType.Object) {
            item.value = JSON.parse(value);
        }
    }
    return data;
};
var isNumeric = function (str) {
    if (typeof str != 'string')
        return false; // we only process strings!
    return (
    // @ts-ignore
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    ); // ...and ensure strings of whitespace fail
};
export var convertUdvToKeyValuePair = function (data) {
    data = data || [];
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var item = data_2[_i];
        var dataType = item.dataType, value = item.value;
        if (dataType === UdfDataType.Number) {
            item.value = JSON.parse(value);
        }
        else if (dataType === UdfDataType.Boolean) {
            item.value = JSON.parse(value);
        }
        else if (dataType === UdfDataType.Datetime) {
            item.value = isNumeric(value)
                ? new Date(parseInt(value))
                : new Date(value);
        }
        else if (dataType === UdfDataType.Object) {
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
export var isWechatBrowser = function () {
    return typeof navigator !== 'undefined' &&
        /MicroMessenger/i.test(navigator === null || navigator === void 0 ? void 0 : navigator.userAgent);
};
export var isLarkBrowser = function () {
    return typeof navigator !== 'undefined' && /Lark/i.test(navigator.userAgent);
};
export var isMobileBrowser = function () {
    return isWechatBrowser() || isLarkBrowser();
};
export var formatAuthorizedResources = function (resources) {
    return resources.map(function (resource) {
        for (var key in resource) {
            if (!resource[key]) {
                delete resource[key];
            }
        }
        return resource;
    });
};
export function generateUidKey(number) {
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
export var xhrUpload = function (file, url) {
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
export function uploadFile(opts) {
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
                xhrUpload(file, url)
                    .then(function (res) { return resolve(res); })
                    .catch(function (error) { return reject(error); });
            }
            else {
                var promises = [];
                var i = 0;
                while (i < files.length) {
                    promises.push(xhrUpload(files[i], url));
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
export var convertKeyValueListToObject = function (data) {
    var ret = {};
    for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
        var _a = data_4[_i], key = _a.key, value = _a.value;
        ret[key] = value;
    }
    return ret;
};
export var convertObjectToKeyValueList = function (data) {
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
export var pickBy = function (obj, predicate) {
    var ret = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (predicate(obj[key], key)) {
            ret[key] = obj[key];
        }
    }
    return ret;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxQyxJQUFBLFNBQVMsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQTNCLENBQTRCO0FBRTdDLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRyxVQUFPLFNBQWlCLEVBQUUsU0FBaUIsRUFBRSxVQUF1Qjs7UUFDekYsc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQkFDekMsWUFBWTtnQkFDWixJQUFJLFVBQVUsSUFBSyxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJLE1BQUssS0FBSyxFQUFFO29CQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTt3QkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO3FCQUM5QztvQkFDRCxJQUFJO3dCQUNNLElBQUEsR0FBRyxHQUFLLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBekIsQ0FBeUI7d0JBQ3BDLElBQU0sV0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDakUsT0FBTyxPQUFPLENBQUMsU0FBTyxXQUFXLENBQUMsQ0FBQztxQkFDcEM7b0JBQUMsT0FBTyxHQUFHLEVBQUU7d0JBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUNyQztpQkFDRjtnQkFFRCxJQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU87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