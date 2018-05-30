# Stream Capture

A TypeScript library for capturing streams.

[![CircleCI](https://circleci.com/gh/typescript-plus/stream-capture.svg?style=svg)](https://circleci.com/gh/typescript-plus/stream-capture)

## Install

```bash
$ npm i @typescript-plus/stream-capture --save
```

## Usage

```ts
import { captureSync } from '@typescript-plus/stream-capture';
import * as fs from 'fs';

const stream = fs.createWriteStream('file');
const captured = captureSync(stream, () => {
  stream.write(':)');
});
stream.write(':(');
stream.end(() => {
  captured === ':)'; // true
  fs.readFileSync('file').toString() === ':('; // true
});
```