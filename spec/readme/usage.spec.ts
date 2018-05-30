import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';
import { captureSync } from '../../src';

tmp.setGracefulCleanup();
const tmpdir = tmp.dirSync().name;
const FILE = path.join(tmpdir, 'file');

it('README - Usage', done => {
  const stream = fs.createWriteStream(FILE);
  const captured = captureSync(stream, () => {
    stream.write(':)');
  });
  stream.write(':(');
  stream.end(() => {
    expect(captured).toEqual(':)');
    expect(fs.readFileSync(FILE).toString()).toEqual(':(');
    done();
  });
});
