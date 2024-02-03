import { resolve } from 'node:path';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import exitHandler from './utils/exitHandler.js';
import showDirectory from './utils/showDirectoryHandler.js';
import { Console } from 'node:console';

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
    const newPath = resolve(this.currentPath, path);
    this.currentPath = newPath;
  }

  async run() {
    const rl = readline.createInterface({ input, output });

    rl.on('SIGINT', () => {
      exitHandler(this.username);
    });

    rl.on('line', async (line) => {
      const instruction = line;

      try {
        await this[instruction]();
      } catch {
        console.log('\nOperation failed');
      } finally {
        showDirectory(this.currentPath);
      }
    });
  }
}