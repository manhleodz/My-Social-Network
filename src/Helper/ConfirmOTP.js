import aesjs from 'aes-js';

export default function ConfirmOTP(OTP) {
    var key = import.meta.env.VITE_API_KEY;
    key = key.split(", ")
    key = key.map(function (x) {
        return parseInt(x, 10);
    });

    var text = OTP;
    var textBytes = aesjs.utils.utf8.toBytes(text);

    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex
}