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
    exports.importAESKW = exports.importHS256 = exports.importRSAOAEP = exports.importECDHES = void 0;
    function str2ab(str) {
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
    function importECDHES(pem) {
        // fetch the part of the PEM string between header and footer
        var pemHeader = '-----BEGIN PRIVATE KEY-----';
        var pemFooter = '-----END PRIVATE KEY-----';
        var pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
        // base64 decode the string to get the binary data
        var binaryDerString = window.atob(pemContents);
        // convert from a binary string to an ArrayBuffer
        var binaryDer = str2ab(binaryDerString);
        return window.crypto.subtle.importKey('pkcs8', binaryDer, {
            name: 'ECDH',
            namedCurve: 'P-256',
        }, true, ['deriveBits']);
    }
    exports.importECDHES = importECDHES;
    function importRSAOAEP(pem) {
        // fetch the part of the PEM string between header and footer
        var pemHeader = '-----BEGIN PRIVATE KEY-----';
        var pemFooter = '-----END PRIVATE KEY-----';
        var pemContents = pem.substring(pemHeader.length, pem.length - pemFooter.length);
        // base64 decode the string to get the binary data
        var binaryDerString = window.atob(pemContents);
        // convert from a binary string to an ArrayBuffer
        var binaryDer = str2ab(binaryDerString);
        return window.crypto.subtle.importKey('pkcs8', binaryDer, {
            name: 'RSA-OAEP',
            hash: 'SHA-1',
        }, true, ['decrypt']);
    }
    exports.importRSAOAEP = importRSAOAEP;
    function importHS256(key) {
        var binaryDer = str2ab(key);
        return window.crypto.subtle.importKey('raw', binaryDer, {
            name: 'HMAC',
            hash: 'SHA-256',
        }, true, ['verify']);
    }
    exports.importHS256 = importHS256;
    function importAESKW(key) {
        var buf = str2ab(key);
        return window.crypto.subtle.importKey('raw', buf, 'AES-KW', true, ['unwrapKey']);
    }
    exports.importAESKW = importAESKW;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJvd3NlcktleUltcG9ydEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYXV0aGVudGljYXRpb24vQnJvd3NlcktleUltcG9ydEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxTQUFTLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLElBQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxJQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsU0FBUyxZQUFZLENBQUMsR0FBVztRQUM3Qiw2REFBNkQ7UUFDN0QsSUFBTSxTQUFTLEdBQUcsNkJBQTZCLENBQUM7UUFDaEQsSUFBTSxTQUFTLEdBQUcsMkJBQTJCLENBQUM7UUFDOUMsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLGtEQUFrRDtRQUNsRCxJQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELGlEQUFpRDtRQUNqRCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFMUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2pDLE9BQU8sRUFDUCxTQUFTLEVBQ1Q7WUFDSSxJQUFJLEVBQUUsTUFBTTtZQUNaLFVBQVUsRUFBRSxPQUFPO1NBQ3RCLEVBQ0QsSUFBSSxFQUNKLENBQUMsWUFBWSxDQUFDLENBQ2pCLENBQUM7SUFDTixDQUFDO0lBaURRLG9DQUFZO0lBL0NyQixTQUFTLGFBQWEsQ0FBQyxHQUFXO1FBQzlCLDZEQUE2RDtRQUM3RCxJQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQztRQUNoRCxJQUFNLFNBQVMsR0FBRywyQkFBMkIsQ0FBQztRQUM5QyxJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkYsa0RBQWtEO1FBQ2xELElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsaURBQWlEO1FBQ2pELElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUxQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDakMsT0FBTyxFQUNQLFNBQVMsRUFDVDtZQUNJLElBQUksRUFBRSxVQUFVO1lBQ2hCLElBQUksRUFBRSxPQUFPO1NBQ2hCLEVBQ0QsSUFBSSxFQUNKLENBQUMsU0FBUyxDQUFDLENBQ2QsQ0FBQztJQUNOLENBQUM7SUEyQnNCLHNDQUFhO0lBekJwQyxTQUFTLFdBQVcsQ0FBQyxHQUFXO1FBQzVCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDakMsS0FBSyxFQUNMLFNBQVMsRUFDVDtZQUNJLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLFNBQVM7U0FDbEIsRUFDRCxJQUFJLEVBQ0osQ0FBQyxRQUFRLENBQUMsQ0FDYixDQUFDO0lBQ04sQ0FBQztJQWFxQyxrQ0FBVztJQVhqRCxTQUFTLFdBQVcsQ0FBQyxHQUFXO1FBQzVCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDbkMsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxFQUNKLENBQUMsV0FBVyxDQUFDLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFZ0Qsa0NBQVcifQ==