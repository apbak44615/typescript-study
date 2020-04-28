// bigIntを使えるようにimportする
// https://www.npmjs.com/package/big-integer
importScripts("BigInteger.js");

onmessage = function (e) {
    const workerIndex = e.data[0];
    let target = bigInt(e.data[1]);
    if (target === 1) {
        return [1];
    }

    let primeNumbers = [];
    for (let number = 2; number <= target; number++) {
        if (target % number === 0) {
            while (target % number === 0) {
                target /= number;
            }
            primeNumbers.push(number);
        }
    }

    postMessage([workerIndex, primeNumbers]);
}
