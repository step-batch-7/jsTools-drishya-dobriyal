const assert = require('chai').assert;

const { parseUserArgs } = require('../src/parseUserArgs.js');

describe('parseUserArgs', function() {
  it('give filePath and default value for -n is not specified ', () => {
    const userArguments = ['filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '-10',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('give filePath and num of lines (without prefix)', () => {
    const userArguments = ['-n', '3', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '3',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('give filePath and num of lines (with - as prefix)', () => {
    const userArguments = ['-n', '-3', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '-3',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('give filePath and num of lines (with +  as prefix)', () => {
    const userArguments = ['-n', '+3', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '+3',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('give illegal offset if userArguments after -n is not a number', () => {
    const userArguments = ['-n', '-$', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: '-$',
      numOfLines: '-$',
      errorOccurred: 'tail: illegal offset -- -$'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('give line count as joined with -n option', () => {
    const userArguments = ['-n2', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '2',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('give illegal offset if suffix immediately after -n is not a num', () => {
    const userArguments = ['-na', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: 'a',
      errorOccurred: 'tail: illegal offset -- a'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
