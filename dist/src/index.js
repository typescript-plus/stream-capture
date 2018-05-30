"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function captureSync(writable, callback) {
    var write = writable.write;
    try {
        var buffer_1 = [];
        writable.write = function (chunk) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // tslint:disable-next-line:no-unused-variable
            var encoding;
            var cb;
            if (typeof args[0] === 'string') {
                encoding = args.shift();
            }
            if (typeof args[0] === 'function') {
                cb = args.shift();
            }
            buffer_1.push(chunk.toString());
            if (cb !== undefined) {
                cb();
            }
            return true;
        };
        callback();
        return buffer_1.join('');
    }
    finally {
        writable.write = write;
    }
}
exports.captureSync = captureSync;
//# sourceMappingURL=index.js.map