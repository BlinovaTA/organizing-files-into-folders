const fs = require("fs");
const path = require("path");

organizing = (inputFolder, outputFolder, flag) => {
  start(inputFolder, outputFolder, flag);
  console.log("Organizing done!");
};

start = (inputFolder, outputFolder, flag) => {
  fs.access(inputFolder, fs.constants.R_OK, (error) => {
    if (error) {
      throw new Error(`${inputFolder} is not readable`);
    }

    fs.readdir(inputFolder, (error, files) => {
      if (error) {
        throw new Error(error);
      }

      files.forEach((item) => {
        const localPath = path.join(inputFolder, item);
        fs.stat(localPath, (error, state) => {
          if (error) {
            throw new Error(error);
          }

          if (state.isDirectory()) {
            start(localPath, outputFolder, flag);
          } else {
            fs.mkdir(outputFolder, { recursive: true }, (error) => {
              if (error) {
                throw new Error(error);
              }

              fs.mkdir(
                path.join(outputFolder, item[0].toUpperCase()),
                { recursive: true },
                (error) => {
                  if (error) {
                    throw new Error(error);
                  }

                  if (flag === "-d") {
                    fs.rename(
                      localPath,
                      path.join(outputFolder, item[0].toUpperCase(), item),
                      (error) => {
                        if (error) {
                          throw new Error(error);
                        } else {
                          fs.readdir(inputFolder, function (error, files) {
                            if (error) {
                              throw new Error(error);
                            } else {
                              if (!files.length) {
                                deleteInputFolder(inputFolder, flag);
                              }
                            }
                          });
                        }
                      }
                    );
                  } else {
                    fs.copyFile(
                      localPath,
                      path.join(outputFolder, item[0].toUpperCase(), item),
                      (error) => {
                        if (error) {
                          throw new Error(error);
                        }
                      }
                    );
                  }
                }
              );
            });
          }
        });
      });
    });
  });
};

deleteInputFolder = (inputFolder) => {

  fs.rm(inputFolder, { recursive: true }, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = organizing;
