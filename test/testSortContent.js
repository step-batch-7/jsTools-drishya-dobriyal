const { sortContent } = require('../src/sortContent.js');
const assert = require('chai').assert;

describe('sortContent', function() {
  it('should give last 10 line of file of more than 10 lines with - and num  ', function() {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      sortContent(content, '-10'),
      '11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
  it('should give the total line of file if the content of file is less than the line num from which the sorting should be started  with - and num  ', function() {
    const content = '1\n2\n3\n4\n5\n6';
    assert.strictEqual(sortContent(content, '-10'), '1\n2\n3\n4\n5\n6');
  });
  it('should give sorted line if +num is given such that lines start from num ', function() {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      sortContent(content, '+5'),
      '5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
  it('should give sorted line if num is given without prefix such that it works similar with - prefix', function() {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(sortContent(content, '5'), '16\n17\n18\n19\n20');
  });
  it('should give whole file for +1 ', function() {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      sortContent(content, '+1'),
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
  it('should give whole file for 0 ', function() {
    const content =
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
    assert.strictEqual(
      sortContent(content, '0'),
      '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20'
    );
  });
});
