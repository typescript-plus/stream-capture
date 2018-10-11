import * as fs from 'fs';
import * as path from 'path';
// tslint:disable-next-line:no-implicit-dependencies
import * as tmp from 'tmp';

import { capture } from '../../../src';

tmp.setGracefulCleanup();
const tmpdir = tmp.dirSync().name;
const FILE = path.join(tmpdir, "file");

it("README - Usage - Sync", done => {
  const stream = fs.createWriteStream(FILE);
  const captured = capture(stream, buffer => {
    stream.write(":)");
    return buffer.join("");
  });
  expect(captured).toEqual(":)"); // true
  stream.end(":(", () => {
    expect(fs.readFileSync(FILE).toString()).toEqual(":("); // true
    done();
  });
});
