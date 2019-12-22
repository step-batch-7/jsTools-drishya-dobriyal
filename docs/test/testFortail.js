const assert = require("chai").assert;
const { parseUserArgs, readContent, sortContent } = require("../src/tail.js");

describe("tail", function() {
  describe("parseUserArgs", function() {
    it("should give filePath stated ", function() {
      const userArguments = ["tail.js", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = { filePath: "filePath" };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
  });

  describe("readContent", function() {
    it("should give the content of the file if file exist ", function() {
      const reader = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        const content = "file content's in string ";
        return content;
      };
      const filePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return true;
      };
      const filePath = "filePath";
      const actualValue = readContent(reader, filePresent, filePath);
      assert.deepStrictEqual(actualValue, {
        content: "file content's in string "
      });
    });

    it("should give the error for the file that doesn't exist ", function() {
      const filePath = "filePath";
      const filePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return false;
      };
      const reader = function() {
        return;
      };
      const actualValue = readContent(reader, filePresent, filePath);
      assert.deepStrictEqual(actualValue, {
        error: `tail: filePath: No such file or directory`
      });
    });
  });

  describe("sortContent", function() {
    it("should give last 10 line of file of more than 10 lines", function() {
      const content =
        "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n";
      assert.strictEqual(
        sortContent(content),
        "11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n"
      );
    });
    it("should give the total line of file if the content of file is less than 10 ", function() {
      const content = "1\n2\n3\n4\n5\n6\n";
      assert.strictEqual(sortContent(content), "1\n2\n3\n4\n5\n6\n");
    });
  });
});
