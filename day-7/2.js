let fileSystem = {};

let mode = 0; // 0: command, 1: data
let cursor = fileSystem;
let prevDirStack = [];

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
          cursor = prevDirStack.pop();
          break;
        }

        prevDirStack.push(cursor);

        if (cursor[input]) {
          cursor = cursor[input];
        } else {
          cursor[input] = {};
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
      cursor[name] = Number(size);
    }
  }
});

// Read all lines
lineReader.on("close", function () {
  const sumOfDirs = sumdirs(fileSystem, []).flat(Infinity);

  console.log("Total used space", sumOfDirs[0]);
  const freeSpace = 70000000 - sumOfDirs[0];
  console.log("Current free space", freeSpace);
  const spaceNeeded = 30000000 - freeSpace;
  console.log("Free space needed", spaceNeeded);

  const smallestDir = sumOfDirs
    .filter((dir) => dir >= spaceNeeded)
    .sort((a, b) => a - b);

  console.log("Smallest dir", smallestDir[0]);
});

const sumdirs = (dir, dirs = []) =>
  Object.values(dir).reduce(
    ([sum, dirs], v) => {
      if (typeof v === "object") {
        const [acc, d] = sumdirs(v);
        return [sum + acc, dirs.concat([acc, d])];
      }
      return [sum + v, dirs];
    },
    [0, dirs]
  );
