const organizing = require("./organizing");

const inputFolder = process.argv[2] || "";
const outputFolder = process.argv[3] || "";
const flag = process.argv[4] || "";

organizing(inputFolder, outputFolder, flag);