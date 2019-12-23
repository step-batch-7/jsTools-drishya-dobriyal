const assert = require("chai").assert;
const expect = require("chai").expect;
const {
  parseUserArgs,
  readContent,
  sortContent,
  tail
} = require("../src/tailFuntion.js");

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
        const fileContent = "file content's in string ";
        return fileContent;
      };
      const isFilePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return true;
      };
      const filePath = "filePath";
      const actualValue = readContent(reader, isFilePresent, filePath);
      assert.deepStrictEqual(actualValue, {
        fileContent: "file content's in string "
      });
    });

    it("should give the error for the file that doesn't exist ", function() {
      const filePath = "filePath";
      const filePresent = function(filePath) {
        assert.strictEqual(filePath, "filePath");
        return false;
      };
      const errorExpected = new Error(
        `tail: ${filePath}: No such file or directory`
      );
      const reader = function() {
        return;
      };
      try {
        readContent(reader, filePresent, filePath);
      } catch (err) {
        expect(err.message).to.be.equal(errorExpected.message);
      }
    });
  });

  describe("sortContent", function() {
    it("should give last 10 line of file of more than 10 lines", function() {
      const content =
        "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20";
      assert.strictEqual(
        sortContent(content),
        "11\n12\n13\n14\n15\n16\n17\n18\n19\n20"
      );
    });
    it("should give the total line of file if the content of file is less than 10 ", function() {
      const content = "1\n2\n3\n4\n5\n6";
      assert.strictEqual(sortContent(content), "1\n2\n3\n4\n5\n6");
    });
  });

  describe("tail", function() {
    it("should give last 10 lines of a file that exist ", function() {
      fs = function() {
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
      const actualValue = tail(userArguments, fs);
      assert.deepStrictEqual(actualValue, {
        sortedContent: "11\n12\n13\n14\n15\n16\n17\n18\n19\n20"
      });
    });
    it("should give error for file that does not exist", function() {
      fs = function() {
        const reader = () => {};
        const isFilePresent = function(filePath) {
          assert.strictEqual(filePath, "filePath");
          return false;
        };
        return { reader, isFilePresent };
      };
      const userArguments = ["tail.js", "filePath"];
      const errorExpected = new Error(
        `tail: filePath: No such file or directory`
      );
      try {
        tail(userArguments, fs);
      } catch (err) {
        expect(err.message).to.be.equal(errorExpected.message);
      }
    });
  });
});
