import aesjs from 'aes-js';

function Generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if (n > max) {
        return Generate(max) + Generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

export default function GenerateOTP() {
    var key = import.meta.env.VITE_API_KEY;
    key = key.split(", ")
    key = key.map(function (x) {
        return parseInt(x, 10);
    });

    var text = Generate(6);
    var textBytes = aesjs.utils.utf8.toBytes(text);

    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex
}