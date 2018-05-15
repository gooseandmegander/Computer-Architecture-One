/**
 * LS-8 v2.0 emulator skeleton code
 */

const LDI = 0b10011001;
const PRN = 0b01000011;
const HLT = 0b00000001;

const MUL = 0b10101010; // ALU operation
const DIV = 0b10101011; // ALU operation
const ADD = 0;
const SUB = 0;

const POP = 0b01001100;
const PUSH = 0b01001101;

const INC = 0;
const DEC = 0;

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;
    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.PC = 0; // Program Counter
    this.SP = 243; // Stack Pointer
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }
  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    this.clock = setInterval(() => {
      this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case 'MUL':
        // !!! IMPLEMENT ME
        this.reg[regA] *= this.reg[regB];
        break;

      case 'DIV':
        // !!! IMPLEMENT ME
        this.reg[regA] /= this.reg[regB];
        break;

      case 'SUB':
        this.reg[regA] -= this.reg[regB];
        break;

      case 'ADD':
        this.reg[regA] += this.reg[regB];
        break;

      case 'INC':
        this.reg[regA]++;
        break;

      case 'DEC':
        this.reg[regA]--;
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the instruction that's about to be executed
    // right now.)

    // !!! IMPLEMENT ME
    const IR = this.ram.read(this.PC);
    // console.log('IR',IR);
    // console.log('IR format', IR.toString(2))

    // Debugging output
    // console.log(`${this.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    // !!! IMPLEMENT ME
    const operandA = this.ram.read(this.PC + 1);
    const operandB = this.ram.read(this.PC + 2);

    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.

    // !!! IMPLEMENT ME
    switch (IR) {
      case LDI:
        this.reg[operandA] = operandB;
        break;

      case PRN:
        console.log(this.reg[operandA]);
        break;

      case HLT:
        this.stopClock();
        break;

      case MUL:
        this.alu('MUL', operandA, operandB);
        break;

      case DIV:
        this.alu('DIV', operandA, operandB);
        break;

      case SUB:
        this.alu('SUB', operandA, operandB);
        break;

      case ADD:
        this.alu('ADD', operandA, operandB);
        break;

      case INC:
        this.alu('INC', operandA, null);
        break;

      case DEC:
        this.alu('DEC', operandA, null);
        break;

      case POP:
        // console.log('=== POP called ===');
        // console.log('opA', operandA);
        // console.log('opB', operandB);
        this.reg[operandA] = this.ram.read(this.SP);
        this.SP++;

        break;

      case PUSH:
        // console.log('=== PUSH called ===');
        this.SP--;
        // console.log(this.ram.read(this.SP + 1));
        this.ram.write(this.SP, this.reg[operandA]);
        // console.log('mem', this.ram.mem.slice(240, 250), 'end mem');
        break;

      default:
        console.log('Unable to execute, IR = ', IR, 'PC = ', this.PC);
        break;
      // this.stopClock();
    }

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
    this.PC += 1 + (IR >> 6);
  }
}

module.exports = CPU;
