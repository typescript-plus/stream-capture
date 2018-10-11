"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function capture(writable, callback) {
    var original = writable.write;
    try {
        var buffer_1 = [];
        writable.write = function (chunk) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return write.apply(void 0, [buffer_1, chunk].concat(args));
        };
        var result_1 = callback(buffer_1);
        if (typeof result_1.then === 'function') {
            return new Promise(function (resolve, reject) {
                result_1
                    .then(function (value) {
                    writable.write = original;
                    resolve(value);
                })
                    .catch(function (reason) {
                    writable.write = original;
                    reject(reason);
                });
            });
        }
        writable.write = original;
        return result_1;
    }
    catch (e) {
        writable.write = original;
        throw e;
    }
}
exports.capture = capture;
function write(buffer, chunk) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var callback;
    if (typeof args[0] === 'string') {
        args.shift();
    }
    if (typeof args[0] === 'function') {
        callback = args.shift();
    }
    buffer.push(chunk.toString());
    if (callback !== undefined) {
        callback();
    }
    return true;
}
//# sourceMappingURL=index.js.map