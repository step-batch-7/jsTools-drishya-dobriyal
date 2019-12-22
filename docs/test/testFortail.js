const assert = require("chai").assert;
const { parseUserArgs, readContent } = require("../src/tail.js");

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
});
