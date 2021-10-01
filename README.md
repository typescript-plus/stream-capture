# Stream Capture

A TypeScript library for capturing streams.

[![CircleCI](https://circleci.com/gh/typescript-plus/stream-capture.svg?style=svg)](https://circleci.com/gh/typescript-plus/stream-capture)

## Install

```bash
$ npm i @typescript-plus/stream-capture --save
```

## Usage

### Sync

```ts
import { capture } from '@typescript-plus/stream-capture';
import * as fs from 'fs';

const stream = fs.createWriteStream('file');
const captured = capture(stream, (buffer) => {
  stream.write(':)');
  return buffer.join('');
});
captured === ':)'; // true
stream.end(':(', () => {
  fs.readFileSync('file').toString() === ':('; // true
});
```

### Async

```ts
import { capture } from '@typescript-plus/stream-capture';
import * as fs from 'fs';

async function asyncFunc() {
  /* ... */
}

(async () => {
  const stream = fs.createWriteStream('file');
  const captured = await capture(stream, async (buffer) => {
    await asyncFunc();
    stream.write(':D');
    return buffer.join('');
  });
  captured === ':D'; // true
  stream.end(':P', () => {
    fs.readFileSync('file').toString() === ':P'; // true
  });
})();
```

### Capturing stdout

Stream Capture accepts `stream.Writable` objects. So you can capture stdout. It's useful for CLI testing, for example:

```ts
import { capture } from '@typescript-plus/stream-capture';

function hello() {
  console.log('Hello :) World');
}

it('works', () => {
  const captured = capture(process.stdout, (buffer) => {
    hello();
    return buffer.join('');
  });
  expect(captured).toEqual('Hello :) World\n'); // success
});
```
