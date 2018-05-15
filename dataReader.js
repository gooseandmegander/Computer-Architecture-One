const fs = require('fs');
const argv = process.argv.slice(2);

if (argv.length !== 1) {
  console.log('usage: node [file location] [filename]');
  process.exit(1);
}

const filename = argv[0];

const fileData = fs.readFileSync(filename, 'utf8');
const programLines = fileData.trim().split(/[\r\n]+/g);

const programLinesFormatted = [];
for (let line of programLines) {
  if (!isNaN(line.substr(0, 8))) {
    programLinesFormatted.push(line.substr(0, 8));
  }
}

module.exports = { programLinesFormatted };
