const assert = require('chai').assert;
const { performTail } = require('../src/tailLib.js');
const sinon = require('sinon');
const fs = require('fs');

describe('performTail', function() {
  it('should give illegal count error if -n does not have num after it', () => {
    const userArguments = ['tail.js', '-n', '-$', 'filePath'];
    const displayTailOutput = function(error, content) {
      assert.strictEqual(error, 'tail: illegal offset -- -$');
      assert.strictEqual(content, '');
    };
    performTail(userArguments, fs, displayTailOutput);
  });
  it('should give last 10 lines of a file that exist ', function() {
    const fakeReadFile = sinon.fake.yields(
      null,
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    );
    sinon.replace(fs, 'readFile', fakeReadFile);
    const userArguments = ['tail.js', 'filePath'];
    const displayTailOutput = function(error, content) {
      assert.deepStrictEqual(error, '');
      assert.deepStrictEqual(content, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    };
    performTail(userArguments, fs, displayTailOutput);
    sinon.restore();
  });
  it('should give no such directory error if file does not exist ', function() {
    const userArguments = ['tail.js', '-n', '-4', 'nonExistingFilePath'];
    const fakeReadFile = sinon.fake.yields('error', undefined);
    sinon.replace(fs, 'readFile', fakeReadFile);
    const displayTailOutput = function(error, content) {
      assert.deepStrictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.deepStrictEqual(content, '');
    };
    performTail(userArguments, fs, displayTailOutput);
    sinon.restore();
  });
});
