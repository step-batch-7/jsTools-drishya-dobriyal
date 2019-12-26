const assert = require("chai").assert;
const {
  parseUserArgs,
  readContent,
  sortContent,
  tailFunction,
  getCountValue
} = require("../src/tailLib.js");

describe("tail", function() {
  describe("getCountValue", function() {
    it("should return value such that  - is removed from value", function() {
      assert.strictEqual(getCountValue("-2"), "2");
    });
    it("should return value if no - sign in starting", function() {
      assert.strictEqual(getCountValue("2"), "2");
    });
  });

  describe("parseUserArgs", function() {
    it("should give filePath stated and default value if -n is not specified ", function() {
      const userArguments = ["tail.js", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = { filePath: "filePath", upto: -10 };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give filePath and num of lines as stated if - doesnot follow number ", function() {
      const userArguments = ["tail.js", "-n", "3", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = { filePath: "filePath", upto: -3 };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give filePath and num of lines as stated and - is there with number", function() {
      const userArguments = ["tail.js", "-n", "-3", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = { filePath: "filePath", upto: -3 };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
  });

  describe("readContent", function() {
    it("should give the content of the file if file exist ", function() {
      const reader = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        const fileContent = "file content's in string ";
        return fileContent;
      };
      const filePath = "filePath";
      const isFilePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return true;
      };
      const actualValue = readContent(reader, isFilePresent, filePath);
      assert.deepStrictEqual(actualValue, {
        content: "file content's in string "
      });
    });
  });

  describe("sortContent", function() {
    it("should give last 10 line of file of more than 10 lines ", function() {
      const content =
        "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
      assert.strictEqual(
        sortContent(content, -10),
        "11\n12\n13\n14\n15\n16\n17\n18\n19\n20"
      );
    });
    it("should give the total line of file if the content of file is less than the line num from which the sorting should be started ", function() {
      const content = "1\n2\n3\n4\n5\n6";
      assert.strictEqual(sortContent(content, -10), "1\n2\n3\n4\n5\n6");
    });
  });

  describe("tailFunction", function() {
    it("should give last 10 lines of a file that exist ", function() {
      const fileOperation = function() {
        const reader = function(filePath) {
          assert.strictEqual(filePath, "filePath");
          return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
        };
        const isFilePresent = function(filePath) {
          assert.strictEqual(filePath, "filePath");
          return true;
        };
        return { reader, isFilePresent };
      };
      const userArguments = ["tail.js", "filePath"];
      const actualValue = tailFunction(userArguments, fileOperation());
      assert.deepStrictEqual(actualValue, {
        content: "11\n12\n13\n14\n15\n16\n17\n18\n19\n20",
        displayer: "forOutput"
      });
    });
    it("should give illegal count error if -n does not have num after it", function() {
      const fileOperation = function() {
        const reader = () => {};
        const isFilePresent = function(filePath) {
          assert.strictEqual(filePath, "filePath");
          return false;
        };
        return { reader, isFilePresent };
      };
      const userArguments = ["tail.js", "-n", "-$", "filePath"];
      assert.deepStrictEqual(tailFunction(userArguments, fileOperation()), {
        content: `tail: illegal offset -- $`,
        displayer: "forError"
      });
    });
    it("should give no such directory error if file does not exist ", function() {
      const fileOperation = function() {
        const reader = () => {};
        const isFilePresent = function(filePath) {
          assert.strictEqual(filePath, "nonExistingFilePath");
          return false;
        };
        return { reader, isFilePresent };
      };
      const userArguments = ["tail.js", "-n", "-3", "nonExistingFilePath"];
      assert.deepStrictEqual(tailFunction(userArguments, fileOperation()), {
        content: `tail: nonExistingFilePath: No such file or directory`,
        displayer: "forError"
      });
    });
  });
});
