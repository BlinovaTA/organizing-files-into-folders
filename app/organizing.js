const fs = require("fs");
const path = require("path");

class Organizing {
  startOrganizing(inputFolder, outputFolder, flag) {
    try {
      this.#start(inputFolder, outputFolder, flag);
      console.log("Organizing done!");
    } catch (error) {
      throw new Error(error);
    }
  }

  #start(inputFolder, outputFolder, flag) {
    const files = fs.readdirSync(inputFolder);

    files.forEach((item) => {
      const localPath = path.join(inputFolder, item);
      const state = fs.statSync(localPath);

      if (state.isDirectory()) {
        this.#start(localPath, outputFolder, flag);
      } else {
        if (!fs.existsSync(outputFolder)) {
          fs.mkdirSync(outputFolder);
        }

        if (!fs.existsSync(path.join(outputFolder, item[0].toUpperCase()))) {
          fs.mkdirSync(path.join(outputFolder, item[0].toUpperCase()));
        }

        fs.link(
          localPath,
          path.join(outputFolder, item[0].toUpperCase(), item),
          (error) => {
            if (error) {
              throw new Error(error);
            }
          }
        );
      }
    });
  }
}

module.exports = Organizing;
