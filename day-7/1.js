let fileSystem = {};

let mode = 0; // 0: command, 1: data
let cursor = fileSystem;
let prevDirStack = [];

let result = 0;

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  // console.log("-- line", line);

  if (line.startsWith("$")) {
    mode = 0;

    // handle command
    let [command, input] = line.replace("$ ", "").split(" ");
    switch (command) {
      case "cd":
        // console.log("run cd", input);

        if (input === "..") {
          // console.log("calculate child folder size", cursor);
          Object.keys(cursor).forEach((key) => {
            if (key.startsWith("_")) {
              return true;
            }

            cursor._totalFileSize =
              (cursor._totalFileSize || 0) + cursor[key]._totalFileSize;
          });

          if (cursor._totalFileSize <= 100000) {
            console.log("found", cursor._totalFileSize);
            result += cursor._totalFileSize;
          }

          cursor = prevDirStack.pop();
          break;
        }

        prevDirStack.push(cursor);

        if (cursor[input]) {
          cursor = cursor[input];
        } else {
          cursor[input] = {
            _files: [],
          };
          cursor = cursor[input];
        }

        break;
      case "ls":
        mode = 1;
        break;
    }
    return true;
  }

  if (mode === 1) {
    // handle data
    if (!line.startsWith("dir")) {
      const [size, name] = line.split(" ");
      cursor._files.push({
        [name]: size,
      });

      cursor._totalFileSize = (cursor._totalFileSize || 0) + Number(size);
    }
  }
});

// Read all lines
lineReader.on("close", function () {
  console.log("result", result);
});
