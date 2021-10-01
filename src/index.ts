export type SyncCallback<T> = (buffer: string[]) => T;
export type AsyncCallback<T> = (buffer: string[]) => Promise<T>;
export type Callback<T> = SyncCallback<T> | AsyncCallback<T>;

export interface Chunk {
  toString(...args: unknown[]): string;
}

export async function capture<T>(
  writable: NodeJS.WritableStream,
  callback: (buffer: string[]) => Promise<T>
): Promise<T>;
export function capture<T>(writable: NodeJS.WritableStream, callback: (buffer: string[]) => T): T;

export function capture<T>(writable: NodeJS.WritableStream, callback: Callback<T>): Promise<T> | T {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const original = writable.write;
  try {
    const buffer: string[] = [];
    writable.write = (chunk: Chunk, ...args: unknown[]) => write(buffer, chunk, ...args);
    const result = callback(buffer);
    if (typeof (result as { then?: unknown }).then === 'function') {
      return new Promise<T>((resolve, reject) => {
        (result as Promise<T>)
          .then(value => {
            writable.write = original;
            resolve(value);
          })
          .catch(reason => {
            writable.write = original;
            reject(reason);
          });
      });
    }
    writable.write = original;
    return result;
  } catch (e) {
    writable.write = original;
    throw e;
  }
}

function write(buffer: string[], chunk: Chunk, ...args: unknown[]) {
  let callback: (() => void) | undefined;
  if (typeof args[0] === 'string') {
    args.shift(); // encoding
  }
  if (typeof args[0] === 'function') {
    callback = args.shift() as () => void;
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
