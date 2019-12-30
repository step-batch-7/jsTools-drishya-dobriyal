const assert = require('chai').assert;
const { parseUserArgs } = require('../src/parseUserArgs.js');

describe('parseUserArgs', function() {
  it('should give filePath stated and default value if -n is not specified ', () => {
    const userArguments = ['filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '-10',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should give filePath and num of lines as stated if - does not follow number ', () => {
    const userArguments = ['-n', '3', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '3',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should give filePath and num of lines as stated and - is there with number', () => {
    const userArguments = ['-n', '-3', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '-3',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should give filePath and num of lines as stated and + is there with number', () => {
    const userArguments = ['-n', '+3', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '+3',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should give illegal offset if userArguments after -n is not a number', () => {
    const userArguments = ['-n', '-$', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '-$',
      errorOccurred: 'tail: illegal offset -- -$'
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should give line count as joined with -n option', () => {
    const userArguments = ['-n2', 'filePath'];
    const actualValue = parseUserArgs(userArguments);
    const expectedValue = {
      filePath: 'filePath',
      numOfLines: '2',
      errorOccurred: null
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it('should give illegal if  count as joined with -n option is not an integer', () => {
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
