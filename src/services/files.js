import { stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { rm, rename, writeFile } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { stdout } from 'node:process';
import { nwd } from './nwd.js';

export const files = {};

files.checkPathToFile = async (path) => {
  try {
    return ((await stat(path)).isFile()) ? true : false;
  } catch (err) {
    return false;
  }
};

files.cat = async (path) => {
  const readable = createReadStream(path, 'utf-8');
  readable.pipe(stdout);

  await new Promise((resolve, reject) => {
    readable.on('end', () => resolve());
    readable.on('error', () => reject());
  });
};

files.add = async (path, name) => {
  await writeFile(join(path, name), '', { flag: 'wx'});
};

files.rn = async (path, name) => {
  const newPath = join(dirname(path), name);

  if (await files.checkPathToFile(newPath)) {
    console.log('\nOperation failed');
    return;
  }

  await rename(path, newPath);
};

files.cp = async (path, pathToNewDir) => {
  const fileName = basename(path);

  if (!(await files.checkPathToFile(path))) {
    console.log('\nOperation failed');
    return;
  }

  if (!(await nwd.checkPath(pathToNewDir))) {
    console.log('\nOperation failed');
    return;
  }

  if (await files.checkPathToFile(join(pathToNewDir, fileName))) {
    console.log('\nOperation failed');
    return;
  }

  await pipeline(createReadStream(path), createWriteStream(join(pathToNewDir, fileName)));
};

files.rm = async (path) => {
  if (await files.checkPathToFile(path)) {
    await rm(path);
  } else {
    console.log('\nOperation failed');
    return;
  }
};

files.mv = async (path, pathToNewDir) => {
  const fileName = basename(path);

  if (!(await files.checkPathToFile(path))) {
    console.log('\nOperation failed');
    return;
  }

  if (!(await nwd.checkPath(pathToNewDir))) {
    console.log('\nOperation failed');
    return;
  }

  if (await files.checkPathToFile(join(pathToNewDir, fileName))) {
    console.log('\nOperation failed');
    return;
  }

  await pipeline(createReadStream(path), createWriteStream(join(pathToNewDir, fileName)));

  await rm(path);
};
