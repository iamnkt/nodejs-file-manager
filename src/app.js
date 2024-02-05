import { resolve } from 'node:path';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output, exit } from 'node:process';
import exitHandler from './utils/exitHandler.js';
import showDirectory from './utils/showDirectoryHandler.js';
import parseInput from './utils/parseInput.js';
import validateInput from './utils/validateInput.js';
import { nwd } from './services/nwd.js';
import { files } from './services/files.js';
import { osi } from './services/osi.js';
import { hash } from './services/hash.js';
import { cad } from './services/cad.js';

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

  async cat(path) {
    const pathToFile = resolve(this.currentPath, path);
    await files.checkPathToFile(pathToFile);
    await files.cat(pathToFile);
    console.log();
  }

  async add(name) {
    await files.add(this.currentPath, name);
  }

  async rn(path, name) {
    const pathToFile = resolve(this.currentPath, path);

    if (await files.checkPathToFile(pathToFile)) {
      await files.rn(pathToFile, name);
    } else {
      throw new Error();
    }
  }

  async cp(path, newPath) {
    const pathToFile = resolve(this.currentPath, path);
    const pathToNewDir = resolve(this.currentPath, newPath);
    await files.cp(pathToFile, pathToNewDir);
  }

  async mv(path, newPath) {
    const pathToFile = resolve(this.currentPath, path);
    const pathToNewDir = resolve(this.currentPath, newPath);
    await files.mv(pathToFile, pathToNewDir);
  }

  async rm(path) {
    const pathToFile = resolve(this.currentPath, path);
    await files.rm(pathToFile);
  }

  os(arg) {
    osi.os(arg);
  }

  async hash(path) {
    const pathToFile = resolve(this.currentPath, path);
    await hash.hash(pathToFile);
    console.log();
  }

  async compress(path, pathTo) {
    const pathToFile = resolve(this.currentPath, path);
    const pathToArchiveDir = resolve(this.currentPath, pathTo);
    await cad.compress(pathToFile, pathToArchiveDir);
  }

  async decompress(path, pathTo) {
    const pathToArchive = resolve(this.currentPath, path);
    const pathToFile = resolve(this.currentPath, pathTo);
    await cad.decompress(pathToArchive, pathToFile);
  }

  async run() {
    const rl = readline.createInterface({ input, output });
    rl.prompt('>');

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
          if (args) {
            await this[instruction](...args);
          } else {
            await this[instruction]();
          }
        } catch (err) {
          console.log('\nOperation failed');
        } finally {
          showDirectory(this.currentPath);
        }
      } else {
        console.log('\nInvalid input');
        showDirectory(this.currentPath);
      }

      rl.prompt('>');
    });
  }
}
