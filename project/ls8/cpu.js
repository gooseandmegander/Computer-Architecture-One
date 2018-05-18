/**
 * LS-8 v2.0 emulator skeleton code
 */
// Todos marked by `!! implement`

const opcodes = require('./opcodes');

const IM = 5; // Interrupt Mask
const IS = 6; // Interrupt Status
const SP = 7; // Stack Pointer

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

    this.FL_EQ = 0;
    this.FL_GT = 0;
    this.FL_LT = 0;

    // Special-purpose registers
    this.PC = 0; // Program Counter
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
      case 'CMP':
        if (this.reg[regA] === this.reg[regB]) {
          this.FL_EQ = 1;
        } else if (this.reg[regA] < this.reg[regB]) {
          this.FL_LT = 4;
        } else {
          this.FL_GT = 2;
        }
        break;

      case 'MUL':
        this.reg[regA] *= this.reg[regB];
        break;

      case 'DIV':
        if (this.reg[regB] === 0) {
          console.log('Dividing by 0 is illegal!');
          break;
        } else {
          this.reg[regA] /= this.reg[regB];
          break;
        }

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
      case opcodes.AND:
        // !! implement
        // add registers and store in regA
        break;

      case opcodes.LD:
        // !! implement
        // load regA with value in address regB
        // reads from memory
        // diff btwn LD and LDI?
        break;

      case opcodes.LDI:
        this.reg[operandA] = operandB;
        break;

      case opcodes.MOD:
        // !! implement
        // modulo: store result in regA
        // divide regA by regB, store remainder
        // if regB value is 0, print err and halt
        // alu?
        break;

      case opcodes.NOP:
        // !! implement
        // do nothing
        break;

      case opcodes.NOT:
        // !! implement
        // bitwise-NOT on value in given reg
        break;

      case opcodes.OR:
        // !! implement
        // bitwise-OR btwn regA and regB
        // store result in regA
        break;

      case opcodes.PRA:
        // !! implement
        // print alpha character (ASCII) stored in given regA
        break;

      case opcodes.PRN:
        console.log(this.reg[operandA]);
        break;

      case opcodes.HLT:
        this.stopClock();
        break;

      case opcodes.MUL:
        this.alu('MUL', operandA, operandB);
        break;

      case opcodes.DIV:
        this.alu('DIV', operandA, operandB);
        break;

      case opcodes.SUB:
        this.alu('SUB', operandA, operandB);
        break;

      case opcodes.ADD:
        this.alu('ADD', operandA, operandB);
        break;

      case opcodes.INC:
        this.alu('INC', operandA, null);
        break;

      case opcodes.DEC:
        this.alu('DEC', operandA, null);
        break;

      case opcodes.POP:
        this.reg[operandA] = this.ram.read(this.reg[SP]);
        this.reg[SP]++;
        break;

      case opcodes.PUSH:
        this.reg[SP]--;
        this.poke(this.reg[SP], this.reg[operandA]);
        break;

      case opcodes.CALL:
        this.reg[SP]--;
        this.ram.write(this.reg[SP], this.PC + 2);
        this.PC = this.reg[operandA];
        break;

      case opcodes.RET:
        this.PC = this.ram.read(this.reg[SP]);
        this.reg[SP]++;
        break;

      case opcodes.ST:
        this.ram.write(this.reg[operandA], this.reg[operandB]);
        break;

      case opcodes.CMP:
        this.alu('CMP', operandA, operandB);
        break;

      case opcodes.JGT:
        // !! implement
        // if FL_GT is true, jump to address in given reg
        // opA is only arg
        break;

      case opcodes.JLT:
        // !! implement
        // if FL_LT is true, jump to address in given reg
        // opA is only arg
        break;

      case opcodes.JEQ:
        if (this.FL_EQ === 1) {
          this.PC = this.reg[operandA];
        } else {
          this.PC += 2;
        }
        break;

      case opcodes.JNE:
        if (this.FL_EQ === 0) {
          this.PC = this.reg[operandA];
        } else {
          this.PC += 2;
        }
        break;

      case opcodes.JMP:
        this.PC = this.reg[operandA];
        break;

      case opcodes.INT:
        // !! implement
        // issue interrupt number stored in given register
        // sets nth bit in IS reg to val in given register
        break;

      case opcodes.IRET:
        // !! implement
        // return from interrupt handler, does not have any args
        // 1. reg r6-r0 popped off stack in that order
        // 2. FL reg popped off stack
        // 3. PC set to return address after popped off stack
        // 4. interrupts re-enabled
        break;

      case opcodes.XOR:
        // !! implement
        // bitwise-XOR btwn regA and regB
        // store result in regA
        break;

      default:
        console.log('Unable to execute, IR = ', IR, 'PC = ', this.PC);
        this.stopClock();
        break;
    }

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
    if (
      IR !== opcodes.CALL &&
      IR !== opcodes.RET &&
      IR !== opcodes.JMP &&
      IR !== opcodes.JNE &&
      IR !== opcodes.JEQ
    ) {
      this.PC += 1 + (IR >> 6);
    }
  }
}

module.exports = CPU;
