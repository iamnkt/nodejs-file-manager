import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createWriteStream, createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { files } from "./files.js";
import { basename, join } from 'node:path';

export const cad = {};

cad.compress = async (pathToFile, pathToArchiveDir) => {
  if (!(await files.checkPathToFile(pathToFile))) {
    console.log('\nOperation failed');
    return;
  }

  const fileName = basename(pathToFile);

  if (await files.checkPathToFile(join(pathToArchiveDir, fileName+' archive'))) {
    console.log('\nOperation failed');
    return;
  }

  const zip = createBrotliCompress();
  const input = createReadStream(pathToFile);
  const output = createWriteStream(join(pathToArchiveDir, fileName+' archive'));

  await pipeline(
    input,
    zip,
    output
  );
};

cad.decompress = async (pathToArchive, pathToFile) => {
  if (!(await files.checkPathToFile(pathToArchive))) {
    console.log('\nOperation failed');
    return;
  }

  if (await files.checkPathToFile(pathToFile)) {
    console.log('\nOperation failed');
    return;
  }

  const unzip = createBrotliDecompress();
  const input = createReadStream(pathToArchive);
  const output = createWriteStream(pathToFile);

  await pipeline(
    input,
    unzip,
    output
  );
};
