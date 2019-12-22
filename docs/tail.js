const main = function() {
  const userArguments = process.argv.splice(1);
  const displayedMessage = tail(userArguments);
  console.log(displayedMessage);
};

main();
