import { capture } from '../../../src';

function hello() {
  // tslint:disable-next-line:no-console
  console.log('Hello :) World');
}

it('README - Usage - Capturing stdout', () => {
  const captured = capture(process.stdout, (buffer) => {
    hello();
    return buffer.join('');
  });
  expect(captured).toEqual('Hello :) World\n');
});
