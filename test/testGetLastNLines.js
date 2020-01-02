const assert = require('chai').assert;

const { getLastNLines } = require('../src/getLastNLines.js');

describe('getLastNLines', () => {
  it('give sorted line if num is given with - prefix', () => {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n';
    assert.strictEqual(
      getLastNLines(content, '-10'),
      '11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
  it('give whole file for file less than asked num of line', () => {
    const content = '1\n2\n3\n4\n5\n6\n';
    assert.strictEqual(getLastNLines(content, '-10'), '1\n2\n3\n4\n5\n6');
  });
  it('should give sorted line if num is given with + prefix', () => {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      getLastNLines(content, '+5'),
      '5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
  it('should give sorted line if num is given without prefix', () => {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n';
    assert.strictEqual(getLastNLines(content, '5'), '16\n17\n18\n19\n20');
  });
  it('should give whole file for +1 ', () => {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      getLastNLines(content, '+1'),
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
  it('should give whole file for 0 ', () => {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      getLastNLines(content, '+0'),
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
});
