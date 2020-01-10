const assert = require('chai').assert;
const StreamPicker = require('../src/streamPicker');

describe('StreamPicker', function () {
  describe('pick', function () {
    const stdin = { stdin: '' };
    const createReadStream = function (filePath) {
      assert.strictEqual(filePath, 'abc');
      return { on: {} };
    };
    const stream = new StreamPicker(stdin, createReadStream);
    it('should give stdin stream if fileName is absent', function () {
      assert.deepStrictEqual(stream.pick(undefined), { stdin: '' });
    });
    it('should give create read stream if fileName is present', function () {
      assert.deepStrictEqual(stream.pick('abc'), { on: {} });
    });
  });
});
