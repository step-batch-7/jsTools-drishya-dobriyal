const assert = require('chai').assert;
const { performTail } = require('../src/tailLib.js');
const sinon = require('sinon');
const fs = require('fs');

describe('performTail', function() {
  it('should give last 10 lines of a file that exist ', function() {
    const fakeCallback = sinon.fake.yields(
      '',
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    );
    sinon.replace(fs, 'readFile', fakeCallback);
    const userArguments = ['tail.js', 'filePath'];
    const displayTailOutput = function(error, content) {
      assert.deepStrictEqual(error, '');
      assert.deepStrictEqual(content, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    };
    performTail(userArguments, displayTailOutput);
    sinon.restore();
  });
  it('should give illegal count error if -n does not have num after it', function() {
    const userArguments = ['tail.js', '-n', '-$', 'filePath'];
    const displayTailOutput = function(error, content) {
      assert.strictEqual(error, 'tail: illegal offset -- -$');
      assert.strictEqual(content, '');
    };
    performTail(userArguments, displayTailOutput);
  });
  it('should give no such directory error if file does not exist ', function() {
    const userArguments = ['tail.js', '-n', '-4', 'nonExistingFilePath'];
    const fakeCallback = sinon.fake.yields('error', '');
    sinon.replace(fs, 'readFile', fakeCallback);
    const displayTailOutput = function(error, content) {
      assert.deepStrictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.deepStrictEqual(content, '');
    };
    performTail(userArguments, displayTailOutput);
    sinon.restore();
  });
});
