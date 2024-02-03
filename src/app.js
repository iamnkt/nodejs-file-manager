import { resolve } from 'node:path';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';
import exitHandler from './utils/exitHandler.js';
import showDirectory from './utils/showDirectoryHandler.js';
import parseInput from './utils/parseInput.js';
import validateInput from './utils/validateInput.js';
import { nwd } from './services/nwd.js';

export class App {
  constructor(homeDir, name) {
    this.currentPath = homeDir;
    this.username = name;
  }

  async up() {
    const newPath = resolve(this.currentPath, '..');
    this.currentPath = newPath;
  }

  async cd(path) {
    const newPath = resolve(this.currentPath, path.join(''));
    if (await nwd.checkPath(newPath)) {
      this.currentPath = newPath;
    } else {
      throw new Error();
    }
  }

  async ls() {
    const folderContents = await nwd.ls(this.currentPath);
    console.table(folderContents);
  }

  async run() {
    const rl = readline.createInterface({ input, output });

    rl.on('SIGINT', () => {
      exitHandler(this.username);
    });

    rl.on('line', async (line) => {
      if (line === '.exit') {
        console.log();
        exitHandler(this.username);
      }

      const input = parseInput(line);
      const instruction = input.instruction;
      const args = input.args;

      if (validateInput(instruction, args)) {
        try {
          await this[instruction](args);
        } catch {
          console.log('\nOperation failed');
        } finally {
          showDirectory(this.currentPath);
        }
      } else {
        console.log('\nInvalid input\n');
      }
    });
  }
}
