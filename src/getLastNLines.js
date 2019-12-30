const getStartingLineWithPlus = function(totalLength, givenLength) {
  if (givenLength === '+1' || givenLength === '+0') {
    return totalLength;
  }
  const toAddUpperMostLine = 1;
  return totalLength + toAddUpperMostLine - givenLength;
};

const parseStartingLine = function(totalLength, givenLength) {
  let startingLine = givenLength;

  if (givenLength.includes('+')) {
    startingLine = getStartingLineWithPlus(totalLength, givenLength);
  }
  if (givenLength.includes('-')) {
    startingLine = -givenLength;
  }

  return startingLine;
};

const getLastNLines = function(content, numOfLines) {
  const arrayOfContent = content.split('\n');
  const numOfLinesFromEnd = parseStartingLine(
    arrayOfContent.length,
    numOfLines
  );
  return arrayOfContent.slice(-numOfLinesFromEnd).join('\n');
};

module.exports = { getLastNLines };