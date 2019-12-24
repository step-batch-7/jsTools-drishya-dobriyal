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
  if (displayMessage.sortedContent)
    return console.log(displayMessage.sortedContent);
  return console.error(displayMessage.errorOccured);
};

main();
