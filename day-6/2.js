let input = "";

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  input = line;
});

// Read all lines
lineReader.on("close", function () {
  let cursor = 0;

  const numDistinctCharsRequired = 14;

  while (true) {
    // get 4 chars that starts from cursor
    let group = input.substr(cursor, numDistinctCharsRequired);
    console.log(group);
    // check if there are duplicate chars in group
    let isDuplicate = group.split("").some((char, index, arr) => {
      return arr.indexOf(char) !== index;
    });

    if (isDuplicate) {
      cursor++;
      continue;
    }

    console.log("cursor", cursor + numDistinctCharsRequired);
    break;
  }
});
