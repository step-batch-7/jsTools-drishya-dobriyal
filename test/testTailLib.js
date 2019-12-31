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
    performTail(userArguments, fakeReader, null, onCompletion);
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
    performTail(userArguments, fakeReader, null, onCompletion);
    assert.equal(fakeReader.firstCall.args[0], 'nonExistingFilePath');
    assert.equal(fakeReader.firstCall.args[1], 'utf8');
    sinon.restore();
  });
  it('should give illegal count error if -n does not have num after it', done => {
    const userArguments = ['-n', '-$', 'filePath'];
    const reader = () => {};
    const onCompletion = function(error, content) {
      assert.strictEqual(error, 'tail: illegal offset -- -$');
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, reader, null, onCompletion);
  });
  it('should give the asked num of lines from end of a file that exist ', done => {
    const userArguments = ['-n', '-4', 'filePath'];
    const reader = sinon.fake.yieldsAsync(
      null,
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n'
    );
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '7\n8\n9\n10');
      done();
    };
    performTail(userArguments, reader, null, onCompletion);
    assert.equal(reader.firstCall.args[0], 'filePath');
    assert.equal(reader.firstCall.args[1], 'utf8');
    sinon.restore();
  });
  it('give error if file does not exist with num of lines stated in cmd line args', done => {
    const userArguments = ['-n', '-5', 'nonExistingFilePath'];
    const reader = sinon.fake.yieldsAsync('error', undefined);
    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, reader, null, onCompletion);
    assert.equal(reader.firstCall.args[0], 'nonExistingFilePath');
    assert.equal(reader.firstCall.args[1], 'utf8');
    sinon.restore();
  });
  it('should give default(last 10 lines) from the standard input', done => {
    const stdin = {
      setEncoding: sinon.fake(),
      on: sinon.fake.yieldsAsync(
        '1\n2\n3\n4\n5\n6\n7\n8\n9\n1\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
      )
    };
    const userArguments = [];
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
      done();
    };
    performTail(userArguments, null, stdin, onCompletion);
    assert.ok(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    assert.strictEqual(stdin.on.secondCall.args[0], 'end');
    assert.strictEqual(stdin.on.callCount, 2);
    sinon.restore();
  });
  it('should give specified num of lines from last the standard input', done => {
    const stdin = {
      on: sinon.fake.yieldsAsync(
        '1\n2\n3\n4\n5\n6\n7\n8\n9\n1\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n'
      ),
      setEncoding: sinon.fake()
    };
    const userArguments = ['-n', '-5'];
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '6\n7\n8\n9\n10');
      done();
    };
    performTail(userArguments, null, stdin, onCompletion);
    assert.ok(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[0], 'data');
    assert.strictEqual(stdin.on.secondCall.args[0], 'end');
    assert.strictEqual(stdin.on.callCount, 2);
    sinon.restore();
  });
});
