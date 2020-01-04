const assert = require('chai').assert;
const sinon = require('sinon');

const { performTail } = require('../src/performTail.js');

describe('performTail', function() {
  const zero = 0;
  let on, setEncoding;
  beforeEach(function() {
    on = sinon.fake();
    setEncoding = sinon.fake();
  });
  afterEach(function() {
    sinon.restore();
  });
  it('give last 10 lines of a file that exist ', done => {
    const userArguments = ['filePath'];

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, 'filePath');
      return { on, setEncoding };
    };

    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
      done();
    };

    performTail(userArguments, { createReadStream }, onCompletion);

    assert.ok(setEncoding.calledWith('utf8'));
    assert.strictEqual(on.firstCall.args[zero], 'data');
    on.firstCall.args[1](
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n1\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    );
    assert.strictEqual(on.secondCall.args[zero], 'end');
    on.secondCall.args[1]();
    assert.strictEqual(on.callCount, 2);
  });
  it('give no such directory error if file does not exist ', done => {
    const userArguments = ['nonExistingFilePath'];
    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, 'nonExistingFilePath');
      return { on, setEncoding };
    };
    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, { createReadStream }, onCompletion);
    assert.ok(setEncoding.calledWith('utf8'));
    assert.strictEqual(on.firstCall.args[zero], 'data');
    assert.strictEqual(on.secondCall.args[zero], 'end');
    assert.strictEqual(on.thirdCall.args[zero], 'error');
    on.thirdCall.args[1]();
  });
  it('give illegal count error if -n does not have num after it', done => {
    const userArguments = ['-n', '-$', 'filePath'];
    const onCompletion = function(error, content) {
      assert.strictEqual(error, 'tail: illegal offset -- -$');
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, {}, onCompletion);
  });
  it('give the asked num of lines from end of a file that exist', done => {
    const userArguments = ['-n', '-4', 'filePath'];

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, 'filePath');
      return { on, setEncoding };
    };

    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '7\n8\n9\n10');
      done();
    };
    performTail(userArguments, { createReadStream }, onCompletion);
    assert.ok(setEncoding.calledWith('utf8'));
    assert.strictEqual(on.firstCall.args[zero], 'data');
    on.firstCall.args[1](
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n1\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    );
    assert.strictEqual(on.secondCall.args[zero], 'end');
    on.secondCall.args[1]();
    assert.strictEqual(on.callCount, 2);
  });
  it('give error if file does not exist ( num of lines provided)', done => {
    const userArguments = ['-n', '-5', 'nonExistingFilePath'];

    const createReadStream = function(filePath) {
      assert.strictEqual(filePath, 'nonExistingFilePath');
      return { on, setEncoding };
    };

    const onCompletion = (error, content) => {
      assert.strictEqual(
        error,
        'tail: nonExistingFilePath: No such file or directory'
      );
      assert.strictEqual(content, '');
      done();
    };
    performTail(userArguments, { createReadStream }, onCompletion);
    assert.ok(setEncoding.calledWith('utf8'));
    assert.strictEqual(on.firstCall.args[zero], 'data');
    assert.strictEqual(on.secondCall.args[zero], 'end');
    assert.strictEqual(on.thirdCall.args[zero], 'error');
    on.thirdCall.args[1]();
  });
  it('give default(last 10 lines) from the standard input', done => {
    const stdin = { setEncoding, on };
    const userArguments = [];

    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
      done();
    };

    performTail(userArguments, { stdin }, onCompletion);

    assert.ok(setEncoding.calledWith('utf8'));
    assert.strictEqual(on.firstCall.args[zero], 'data');
    on.firstCall.args[1](
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n1\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    );
    assert.strictEqual(on.secondCall.args[zero], 'end');
    on.secondCall.args[1]();
    assert.strictEqual(on.callCount, 2);
  });
  it('give specified num of lines from last the standard input', done => {
    const stdin = { setEncoding, on };
    const userArguments = ['-n', '-5'];

    const onCompletion = (error, content) => {
      assert.strictEqual(error, '');
      assert.strictEqual(content, '6\n7\n8\n9\n10');
      done();
    };

    performTail(userArguments, { stdin }, onCompletion);

    assert.ok(setEncoding.calledWith('utf8'));
    assert.strictEqual(on.firstCall.args[zero], 'data');
    on.firstCall.args[1](
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n1\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
    );
    assert.strictEqual(on.secondCall.args[zero], 'end');
    on.secondCall.args[1]();
    assert.strictEqual(on.callCount, 2);
  });
});
