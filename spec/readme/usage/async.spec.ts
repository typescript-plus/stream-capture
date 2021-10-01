import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';

import { capture } from '../../../src';

tmp.setGracefulCleanup();
const tmpdir = tmp.dirSync().name;
const FILE = path.join(tmpdir, 'file');

async function asyncFunc() {
  await Promise.resolve(true);
}

it('README - Usage - Async (Promise)', async () => {
  const stream = fs.createWriteStream(FILE);
  const captured = await capture(stream, async (buffer) => {
    await asyncFunc();
    stream.write(':D');
    return buffer.join('');
  });
  expect(captured).toEqual(':D'); // true
  stream.end(':P', () => {
    expect(fs.readFileSync(FILE).toString()).toEqual(':P');
  });
});
