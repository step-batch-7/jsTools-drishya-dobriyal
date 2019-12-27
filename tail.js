const { performTail } = require("./src/tailLib.js");

const getOutputStream = function(outputStreamName) {
  if (outputStreamName === "errorStream") return console.error;
  return console.log;
};

const main = function() {
  const userArguments = process.argv.slice(1);
  const fs = require("fs");
  const { outputStreamName, content } = performTail(
    userArguments,
    fs.readFileSync,
    fs.existsSync
  );
  outputStream = getOutputStream(outputStreamName);
  outputStream(content);
};

main();
