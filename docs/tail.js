const { tail } = require("./src/tailFuntion.js");
const fs = function() {
  const fs = require("fs");
  const reader = fs.readFileSync;
  const isFilePresent = fs.existsSync;
  return { reader, isFilePresent };
};

const main = function() {
  const userArguments = process.argv.splice(1);
  const displayedMessage = tail(userArguments, fs);
  console.log(displayedMessage);
};

main();
