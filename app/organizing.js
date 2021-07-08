const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");

const organizing = (inputFolder, outputFolder, flag) => {
  return new Promise(async (resolve, reject) => {
    try {
      await start(inputFolder, outputFolder, flag);
      await deleteInputFolder(inputFolder, flag);

      console.log("Organizing done!");
      resolve();
    } catch {
      reject();
    }
  });
};

const start = async (inputFolder, outputFolder, flag) => {
  try {
    await fsPromises.access(inputFolder, fs.constants.R_OK);

    const files = await fsPromises.readdir(inputFolder);

    files.forEach(async (item) => {
      const localPath = path.normalize(path.join(inputFolder, item));
      const state = await fsPromises.stat(localPath);

      if (state.isDirectory()) {
        start(localPath, outputFolder, flag);
      } else {
        await fsPromises.mkdir(outputFolder, { recursive: true });

        await fsPromises.mkdir(
          path.normalize(path.join(outputFolder, item[0].toUpperCase())),
          {
            recursive: true,
          }
        );

        if (flag === "-d") {
          await fsPromises.rename(
            localPath,
            path.normalize(path.join(outputFolder, item[0].toUpperCase(), item))
          );
        } else {
          await fsPromises.copyFile(
            localPath,
            path.normalize(path.join(outputFolder, item[0].toUpperCase(), item))
          );
        }
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteInputFolder = async (inputFolder, flag) => {
  if (flag !== "-d") {
    return;
  }

  await fsPromises.rm(inputFolder, { recursive: true });
};

module.exports = organizing;
