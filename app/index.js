const organizing = require("./organizing");

const inputFolder = process.argv[2] || "./input";
const outputFolder = process.argv[3] || "./output";
const flag = process.argv[4] || "";

organizing(inputFolder, outputFolder, flag);