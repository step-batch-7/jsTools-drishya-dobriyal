const assert = require('chai').assert;
const sinon = require('sinon');

const { performTail } = require('../src/tailLib.js');

describe('performTail', function() {
  const zero = 0;
  const one = 1;
  const two = 2;
  it('give last 10 lines of a file that exist ', done => {
    const userArguments = ['filePath'];
    const readFile = sinon.fake.yieldsAsync(null, 'fileContent');
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, 'fileContent');
      done();
    };
    performTail(userArguments, { readFile }, onCompletion);
    assert.equal(readFile.firstCall.args[zero], 'filePath');
    assert.equal(readFile.firstCall.args[one], 'utf8');
    sinon.restore();
  });
  it('give no such directory error if file does not exist ', done => {
    const userArguments = ['nonExistingFilePath'];
    const readFile = sinon.fake.yieldsAsync('error', '');
    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, { readFile }, onCompletion);
    assert.equal(readFile.firstCall.args[zero], 'nonExistingFilePath');
    assert.equal(readFile.firstCall.args[one], 'utf8');
    sinon.restore();
  });
  it('give illegal count error if -n does not have num after it', done => {
    const userArguments = ['-n', '-$', 'filePath'];
    const readFile = () => {};
    const onCompletion = function(error, content) {
      assert.strictEqual(error, 'tail: illegal offset -- -$');
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, { readFile }, onCompletion);
  });
  it('give the asked num of lines from end of a file that exist ', done => {
    const userArguments = ['-n', '-4', 'filePath'];
    const readFile = sinon.fake.yieldsAsync(
      null,
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n'
    );
    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '7\n8\n9\n10');
      done();
    };
    performTail(userArguments, { readFile }, onCompletion);
    assert.equal(readFile.firstCall.args[zero], 'filePath');
    assert.equal(readFile.firstCall.args[one], 'utf8');
    sinon.restore();
  });
  it('give error if file does not exist ( num of lines provided)', done => {
    const userArguments = ['-n', '-5', 'nonExistingFilePath'];
    const readFile = sinon.fake.yieldsAsync('error', undefined);
    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, { readFile }, onCompletion);
    assert.equal(readFile.firstCall.args[zero], 'nonExistingFilePath');
    assert.equal(readFile.firstCall.args[one], 'utf8');
    sinon.restore();
  });
  it('give default(last 10 lines) from the standard input', done => {
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
    performTail(userArguments, { stdin }, onCompletion);
    assert.ok(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[zero], 'data');
    assert.strictEqual(stdin.on.secondCall.args[zero], 'end');
    assert.strictEqual(stdin.on.callCount, two);
    sinon.restore();
  });
  it('give specified num of lines from last the standard input', done => {
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
    performTail(userArguments, { stdin }, onCompletion);
    assert.ok(stdin.setEncoding.calledWith('utf8'));
    assert.strictEqual(stdin.on.firstCall.args[zero], 'data');
    assert.strictEqual(stdin.on.secondCall.args[zero], 'end');
    assert.strictEqual(stdin.on.callCount, two);
    sinon.restore();
  });
});
