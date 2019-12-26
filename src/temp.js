const { readFile } = require("fs");
loadFile = function() {
  readFile(
    "./tailLib.js",
    "utf8",
    function(err, content) {
      console.log(a.err, err, content);
      a.err = err;
      a.content = content;
    }.bind(a)
  );
};
tail = function() {
  a = {};
  loadFile.bind(a);
  return a;
};

main = function() {
  console.log(tail());
};

main();
