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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJvd3NlcktleUltcG9ydEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYXV0aGVudGljYXRpb24vQnJvd3NlcktleUltcG9ydEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFTLE1BQU0sQ0FBQyxHQUFXO0lBQ3ZCLElBQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxJQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsR0FBVztJQUM3Qiw2REFBNkQ7SUFDN0QsSUFBTSxTQUFTLEdBQUcsNkJBQTZCLENBQUM7SUFDaEQsSUFBTSxTQUFTLEdBQUcsMkJBQTJCLENBQUM7SUFDOUMsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25GLGtEQUFrRDtJQUNsRCxJQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pELGlEQUFpRDtJQUNqRCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFMUMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQ2pDLE9BQU8sRUFDUCxTQUFTLEVBQ1Q7UUFDSSxJQUFJLEVBQUUsTUFBTTtRQUNaLFVBQVUsRUFBRSxPQUFPO0tBQ3RCLEVBQ0QsSUFBSSxFQUNKLENBQUMsWUFBWSxDQUFDLENBQ2pCLENBQUM7QUFDTixDQUFDO0FBaURRLG9DQUFZO0FBL0NyQixTQUFTLGFBQWEsQ0FBQyxHQUFXO0lBQzlCLDZEQUE2RDtJQUM3RCxJQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQztJQUNoRCxJQUFNLFNBQVMsR0FBRywyQkFBMkIsQ0FBQztJQUM5QyxJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkYsa0RBQWtEO0lBQ2xELElBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsaURBQWlEO0lBQ2pELElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUUxQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDakMsT0FBTyxFQUNQLFNBQVMsRUFDVDtRQUNJLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSxPQUFPO0tBQ2hCLEVBQ0QsSUFBSSxFQUNKLENBQUMsU0FBUyxDQUFDLENBQ2QsQ0FBQztBQUNOLENBQUM7QUEyQnNCLHNDQUFhO0FBekJwQyxTQUFTLFdBQVcsQ0FBQyxHQUFXO0lBQzVCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDakMsS0FBSyxFQUNMLFNBQVMsRUFDVDtRQUNJLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLFNBQVM7S0FDbEIsRUFDRCxJQUFJLEVBQ0osQ0FBQyxRQUFRLENBQUMsQ0FDYixDQUFDO0FBQ04sQ0FBQztBQWFxQyxrQ0FBVztBQVhqRCxTQUFTLFdBQVcsQ0FBQyxHQUFXO0lBQzVCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDbkMsS0FBSyxFQUNMLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxFQUNKLENBQUMsV0FBVyxDQUFDLENBQ2QsQ0FBQztBQUNKLENBQUM7QUFFZ0Qsa0NBQVcifQ==