const RAM = require('./ram');
const CPU = require('./cpu');
const { programLinesFormatted } = require('../../dataReader');

/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {
  // Hardcoded program to print the number 8 on the console

  // const program = [ // print8.ls8
  //     "10011001", // LDI R0,8  Store 8 into R0
  //     "00000000",
  //     "00001000",
  //     "01000011", // PRN R0    Print the value in R0
  //     "00000000",
  //     "00000001"  // HLT       Halt and quit
  // ];

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
