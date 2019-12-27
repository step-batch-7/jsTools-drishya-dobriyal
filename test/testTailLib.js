const assert = require("chai").assert;
const {
  parseUserArgs,
  readContent,
  sortContent,
  performTail
} = require("../src/tailLib.js");

describe("tail", function() {
  describe("parseUserArgs", function() {
    it("should give filePath stated and default value if -n is not specified ", function() {
      const userArguments = ["tail.js", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "-10",
        errorOccurred: null
      };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give filePath and num of lines as stated if - doesn't follow number ", function() {
      const userArguments = ["tail.js", "-n", "3", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "3",
        errorOccurred: null
      };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give filePath and num of lines as stated and - is there with number", function() {
      const userArguments = ["tail.js", "-n", "-3", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "-3",
        errorOccurred: null
      };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give filePath and num of lines as stated and + is there with number", function() {
      const userArguments = ["tail.js", "-n", "+3", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "+3",
        errorOccurred: null
      };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give illegal offset if userArguments after -n is not a number", function() {
      const userArguments = ["tail.js", "-n", "-$", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "-$",
        errorOccurred: "tail: illegal offset -- -$"
      };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give line count as joined with -n option", function() {
      const userArguments = ["tail.js", "-n2", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "2",
        errorOccurred: null
      };
      assert.deepStrictEqual(actualValue, expectedValue);
    });
    it("should give illegal if  count as joined with -n option is not an integer", function() {
      const userArguments = ["tail.js", "-na", "filePath"];
      const actualValue = parseUserArgs(userArguments);
      const expectedValue = {
        filePath: "filePath",
        numOfLines: "a",
        errorOccurred: "tail: illegal offset -- a"
      };
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
    it("should give error if file doesn't exist  ", function() {
      const reader = function(filePath) {
        return;
      };
      const filePath = "filePath";
      const isFilePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return false;
      };
      const actualValue = readContent(reader, isFilePresent, filePath);
      assert.deepStrictEqual(actualValue, {
        errorOccurred: `tail: filePath: No such file or directory`
      });
    });
  });

  describe("sortContent", function() {
    it("should give last 10 line of file of more than 10 lines with - and num  ", function() {
      const content =
        "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
      assert.strictEqual(
        sortContent(content, "-10"),
        "11\n12\n13\n14\n15\n16\n17\n18\n19\n20"
      );
    });
    it("should give the total line of file if the content of file is less than the line num from which the sorting should be started  with - and num  ", function() {
      const content = "1\n2\n3\n4\n5\n6";
      assert.strictEqual(sortContent(content, "-10"), "1\n2\n3\n4\n5\n6");
    });
    it("should give sorted line if +num is given such that lines start from num ", function() {
      const content =
        "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
      assert.strictEqual(
        sortContent(content, "+5"),
        "6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20"
      );
    });
    it("should give sorted line if num is given without prefix such that it works similar with - prefix", function() {
      const content =
        "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
      assert.strictEqual(sortContent(content, "5"), "16\n17\n18\n19\n20");
    });
  });

  describe("performTail", function() {
    it("should give last 10 lines of a file that exist ", function() {
      const reader = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
      };
      const isFilePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return true;
      };
      const userArguments = ["tail.js", "filePath"];
      const actualValue = performTail(userArguments, reader, isFilePresent);
      assert.deepStrictEqual(actualValue, {
        content: "11\n12\n13\n14\n15\n16\n17\n18\n19\n20",
        outputStreamName: "outputStream"
      });
    });
    it("should give illegal count error if -n does not have num after it", function() {
      const reader = () => {};
      const isFilePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return false;
      };
      const userArguments = ["tail.js", "-n", "-$", "filePath"];
      assert.deepStrictEqual(
        performTail(userArguments, reader, isFilePresent),
        {
          content: `tail: illegal offset -- -$`,
          outputStreamName: "errorStream"
        }
      );
    });
    it("should give no such directory error if file does not exist ", function() {
      const userArguments = ["tail.js", "-n", "-4", "nonExistingFilePath"];
      const reader = () => {
        return;
      };
      const isFilePresent = filePath => {
        assert.strictEqual(filePath, "nonExistingFilePath");
        return false;
      };
      assert.deepStrictEqual(
        performTail(userArguments, reader, isFilePresent),
        {
          content: `tail: nonExistingFilePath: No such file or directory`,
          outputStreamName: "errorStream"
        }
      );
    });
  });
});
