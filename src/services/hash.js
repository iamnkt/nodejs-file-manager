import { files } from "./files.js";
import { createReadStream, createWriteStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'node:process';

export const hash = {};

hash.hash = async (path) => {
  if (files.checkPathToFile(path)) {
    const _hash = createHash('sha256');

    const readable = createReadStream(path);
    readable.pipe(_hash.setEncoding('hex')).pipe(stdout);

    await new Promise((resolve, reject) => {
      readable.on('end', () => resolve());
      readable.on('error', () => reject());
    });
  } else {
    console.log('\nOperation failed');
    return;
  }
};
