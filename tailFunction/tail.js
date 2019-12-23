const { tail } = require("./src/tailFuntion.js");

const fs = function() {
  const fs = require("fs");
  const reader = fs.readFileSync;
  const isFilePresent = fs.existsSync;
  return { reader, isFilePresent };
};

const main = function() {
  const userArguments = process.argv.splice(1);
  try {
    console.log(tail(userArguments, fs));
  } catch (err) {
    console.error(err.message);
  }
};

main();
