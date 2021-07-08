const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");

const organizing = (config) => {
  const { path, shouldDelete } = config;
  const { input, output } = path;

  return new Promise(async (resolve, reject) => {
    try {
      await start(input, output, shouldDelete);
      await deleteInputFolder(input, shouldDelete);

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

        const outPath = path.normalize(
          path.join(outputFolder, item[0].toUpperCase(), item)
        );

        if (flag) {
          await fsPromises.rename(localPath, outPath);
        } else {
          await fsPromises.copyFile(localPath, outPath);
        }
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteInputFolder = async (inputFolder, flag) => {
  if (!flag) {
    return;
  }

  await fsPromises.rm(inputFolder, { recursive: true });
};

module.exports = organizing;
