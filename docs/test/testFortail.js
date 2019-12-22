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
      const filePath = "filePath";
      const actualValue = readContent(reader, filePath);
      const expectedValue = "file content's in string ";
      assert.strictEqual(actualValue, expectedValue);
    });
  });
});
