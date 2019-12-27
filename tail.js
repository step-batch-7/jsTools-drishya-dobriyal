const { performTail } = require("./src/tailLib.js");

const main = function() {
  const userArguments = process.argv.slice(1);
  const fs = require("fs");
  const getStream = {
    errorStream: console.error,
    outputStream: console.log
  };
  const { stream, content } = performTail(
    userArguments,
    fs.readFileSync,
    fs.existsSync
  );
  getStream[stream](content);
};

main();
