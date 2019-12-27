const { performTail } = require("./src/tailLib.js");

const getStream = function(stream) {
  const totalStreams = {
    errorStream: console.error,
    outputStream: console.log
  };
  return totalStreams[stream];
};

const main = function() {
  const userArguments = process.argv.slice(1);
  const fs = require("fs");
  const { stream, content } = performTail(
    userArguments,
    fs.readFileSync,
    fs.existsSync
  );
  getStream(stream)(content);
};

main();
