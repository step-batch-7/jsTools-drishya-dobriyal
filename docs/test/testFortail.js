const assert = require("chai").assert;
const tail = require("../src/tail.js");
const parseUserArgs = tail.parseUserArgs;
const readContent = tail.readContent;

describe("tail", function() {
  describe("parseUserArgs", function() {
    it("should give filePath stated ", function() {
      const userArguments = ["tail.js", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = { filePath: "filePath" };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
  });
});
