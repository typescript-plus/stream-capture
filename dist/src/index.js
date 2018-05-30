"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:promise-function-async
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
        if ((typeof result_1 === 'object' || typeof result_1 === 'function') && typeof result_1.then === 'function') {
            return new Promise(function (resolve, reject) {
                result_1.then(function (value) {
                    writable.write = original;
                    resolve(value);
                }).catch(function (reason) {
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
    // tslint:disable-next-line:no-unused-variable
    var encoding;
    var callback;
    if (typeof args[0] === 'string') {
        encoding = args.shift();
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
// export async function captureAsync(writable: Writable, callback: () => Promise<void>): Promise<string> {
//   const original = writable.write;
//   try {
//     const buffer: string[] = [];
//     writable.write = (chunk: {toString(...args: any[]): string}, ...args: any[]) => {
//       // tslint:disable-next-line:no-unused-variable
//       let encoding: string | undefined;
//       let cb: (() => void) | undefined;
//       if (typeof args[0] === 'string') {
//         encoding = args.shift() as string;
//       }
//       if (typeof args[0] === 'function') {
//         cb = args.shift() as () => void;
//       }
//       buffer.push(chunk.toString());
//       if (cb !== undefined) {
//         cb();
//       }
//       return true;
//     };
//     await callback();
//     return buffer.join('');
//   } finally {
//     writable.write = original;
//   }
// }
//# sourceMappingURL=index.js.map