const organizing = require("./organizing");
const yargs = require("yargs");
const { version } = require("../package.json");
const path = require("path");

const argv = yargs
  .usage("Usage: node $0 [options...]")
  .version(version)
  .alias("version", "v")
  .help("help")
  .alias("help", "h")
  .example("yarn start")
  .option("input", {
    alias: "i",
    describe: "Path to input folder",
    require: true,
  })
  .option("output", {
    alias: "o",
    describe: "Path to output folder",
    default: "./output",
  })
  .option("delete", {
    alias: "d",
    describe: "Should be source folder deleted?",
    type: "boolean",
    default: false
  })
  .argv;

const config = {
  path: {
    input: path.normalize(path.join(argv.input)),
    output: path.normalize(path.join(argv.output))
  },
  shouldDelete: argv.delete
}

organizing(config);
