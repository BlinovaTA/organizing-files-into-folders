const fs = require("fs");
const path = require("path");

class Organizing {
  startOrganizing(inputFolder, outputFolder, flag) {
    try {
      this.#start(inputFolder, outputFolder);
      console.log("Organizing done!");

      this.#deletInputFolder(inputFolder, flag);
    } catch (error) {
      throw new Error(error);
    }
  }

  #start(inputFolder, outputFolder) {
    const files = fs.readdirSync(inputFolder);

    files.forEach((item) => {
      const localPath = path.join(inputFolder, item);
      const state = fs.statSync(localPath);

      if (state.isDirectory()) {
        this.#start(localPath, outputFolder);
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

  #deletInputFolder(inputFolder, flag) {
    if (flag !== "-d") {
      return;
    }

    this.#delete(inputFolder);
    console.log("Delete done!");
  }

  #delete(inputFolder) {
    if (!fs.existsSync(inputFolder)) {
      return;
    }

    fs.readdirSync(inputFolder).forEach((item) => {
      const localPath = path.join(inputFolder, item);
      const state = fs.statSync(localPath);

      if (state.isDirectory()) {
        this.#delete(localPath);
      } else {
        fs.unlinkSync(localPath);
      }
    });

    fs.rmdirSync(inputFolder);
  }
}

module.exports = Organizing;
