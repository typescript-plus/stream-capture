import { Writable } from 'stream';

export function captureSync(writable: Writable, callback: () => void) {
  const write = writable.write;
  try {
    const buffer: string[] = [];
    writable.write = (chunk: {toString(...args: any[]): string}, ...args: any[]) => {
      // tslint:disable-next-line:no-unused-variable
      let encoding: string | undefined;
      let cb: (() => void) | undefined;
      if (typeof args[0] === 'string') {
        encoding = args.shift() as string;
      }
      if (typeof args[0] === 'function') {
        cb = args.shift() as () => void;
      }
      buffer.push(chunk.toString());
      if (cb !== undefined) {
        cb();
      }
      return true;
    };
    callback();
    return buffer.join('');
  } finally {
    writable.write = write;
  }
}
