const assert = require('chai').assert;
const sinon = require('sinon');

const { performTail } = require('../src/tailLib.js');

describe('performTail', function() {
  it('should give last 10 lines of a file that exist ', done => {
    const userArguments = ['filePath'];
    const fakeReader = sinon.fake.yieldsAsync(null, 'fileContent');
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, 'fileContent');
      done();
    };
    performTail(userArguments, fakeReader, onCompletion);
    assert.equal(fakeReader.firstCall.args[0], 'filePath');
    assert.equal(fakeReader.firstCall.args[1], 'utf8');
    sinon.restore();
  });
  it('should give no such directory error if file does not exist ', done => {
    const userArguments = ['nonExistingFilePath'];
    const fakeReader = sinon.fake.yieldsAsync('error', '');
    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, fakeReader, onCompletion);
    assert.equal(fakeReader.firstCall.args[0], 'nonExistingFilePath');
    assert.equal(fakeReader.firstCall.args[1], 'utf8');
  });
  it('should give illegal count error if -n does not have num after it', done => {
    const userArguments = ['-n', '-$', 'filePath'];
    const reader = () => {};
    const onCompletion = function(error, content) {
      assert.strictEqual(error, 'tail: illegal offset -- -$');
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, reader, onCompletion);
  });
  it('should give the asked num of lines from end of a file that exist ', done => {
    const userArguments = ['-n', '-4', 'filePath'];
    const reader = sinon.fake();
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '7\n8\n9\n10');
      done();
    };
    performTail(userArguments, reader, onCompletion);
    assert.equal(reader.firstCall.args[0], 'filePath');
    assert.equal(reader.firstCall.args[1], 'utf8');
    reader.firstCall.args[2](null, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n');
    sinon.restore();
  });
  it('give error if file does not exist with num of lines stated in cmd line args', done => {
    const userArguments = ['-n', '-5', 'nonExistingFilePath'];
    const reader = sinon.fake();
    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, reader, onCompletion);
    assert.equal(reader.firstCall.args[0], 'nonExistingFilePath');
    assert.equal(reader.firstCall.args[1], 'utf8');
    reader.firstCall.args[2]('error', undefined);
    sinon.restore();
  });
});
