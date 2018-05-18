const RAM = require('./ram');
const CPU = require('./cpu');
const { programLinesFormatted } = require('../../dataReader');

/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {
  // Load the program into the CPU's memory a byte at a time
  for (let i = 0; i < programLinesFormatted.length; i++) {
    cpu.poke(i, parseInt(programLinesFormatted[i], 2));
    // console.log('program:', i, program[i]);
  }
}
/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);
// console.log('cpu', cpu)

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);

cpu.startClock();
