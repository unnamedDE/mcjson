
const fs = require('fs');

const consoleStyles = require('../lib/consoleStyles.js')
const index = require('../lib/index.js')

let args = process.argv.splice(2);
const subcommand = args[0];
args.splice(0, 1);

switch (subcommand) {
  case "compile":
    index.compile(args);
    break;
  default:
    console.log(consoleStyles.FgRed + 'Please select a sub command' + consoleStyles.Reset);
    break;
}
