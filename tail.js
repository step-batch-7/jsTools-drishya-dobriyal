const { tailFunction } = require("./src/tailLib.js");

const fileOperation = function() {
  const fs = require("fs");
  const reader = fs.readFileSync;
  const isFilePresent = fs.existsSync;
  return { reader, isFilePresent };
};

const main = function() {
  const userArguments = process.argv.splice(1);
  const displayMessage = tailFunction(userArguments, fileOperation());
  displayMessage.displayer(displayMessage.content);
};

main();
