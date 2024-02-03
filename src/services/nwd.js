import { stat, readdir } from 'node:fs/promises';

export const nwd = {};

const sortDirectoriesAndFiles = (a, b) => {
  if (a.type === b.type) {
      return a.name.localeCompare(b.name);
  }

  return a.type === 'directory' ? -1 : 1;
}

nwd.checkPath = async (path) => {
  try {
    const stats = await stat(path);
    if (stats.isDirectory()) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
};

nwd.ls = async(path) => {
  const methods = ['isDirectory', 'isFile'];

  const folderContents = await readdir(path, { withFileTypes: true });

  const sortedContents = folderContents.map((item) => {
    const currentItem = { name: item.name};

    for (let method of methods) {
      if (item[method]()) {
        currentItem.type = method.slice(2).toLowerCase() 
      }
    }

    return currentItem;
  }).sort(sortDirectoriesAndFiles);

  return sortedContents;
};
