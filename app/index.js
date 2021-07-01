var Organizing = require("./organizing");

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];
const flag = process.argv[4];

var org = new Organizing();

org.startOrganizing(inputFolder, outputFolder, flag);