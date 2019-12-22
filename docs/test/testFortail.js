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
    it("should give the content of the file ", function() {
      const reader = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return "file content's in string ";
      };
      const filePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return true;
      };
      const filePath = "filePath";
      const actualValue = readContent(reader, filePresent, filePath);
      const expectedValue = "file content's in string ";
      assert.strictEqual(actualValue, expectedValue);
    });
    it("should give the error for the file that doesn't exist ", function() {
      const reader = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return `tail: filePath: No such file or directory`;
      };
      const filePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return false;
      };
      const filePath = "filePath";
      const actualValue = readContent(reader, filePresent, filePath);
      const expectedValue = `tail: filePath: No such file or directory`;
      assert.strictEqual(actualValue, expectedValue);
    });
  });
});
