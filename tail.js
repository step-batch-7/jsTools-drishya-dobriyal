const { tailFunction } = require("./src/tailLib.js");

const fileOperation = function() {
  const fs = require("fs");
  const reader = fs.readFileSync;
  const isFilePresent = fs.existsSync;
  return { reader, isFilePresent };
};

const main = function() {
  const userArguments = process.argv.slice(1);
  const displayerStream = { forError: console.error, forOutput: console.log };
  const { displayer, content } = tailFunction(userArguments, fileOperation());
  displayerStream[displayer](content);
};

main();
