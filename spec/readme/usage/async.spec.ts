import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';

import { capture } from '../../../src';

tmp.setGracefulCleanup();
const tmpdir = tmp.dirSync().name;
const FILE = path.join(tmpdir, 'file');

// eslint-disable-next-line @typescript-eslint/require-await
async function write(stream: fs.WriteStream) {
  stream.write(':D');
}

it('README - Usage - Async (Promise)', async () => {
  const stream = fs.createWriteStream(FILE);
  const captured = await capture(stream, async (buffer) => {
    await write(stream);
    return buffer.join('');
  });
  expect(captured).toEqual(':D'); // true
  stream.end(':P', () => {
    expect(fs.readFileSync(FILE).toString()).toEqual(':P');
  });
});
